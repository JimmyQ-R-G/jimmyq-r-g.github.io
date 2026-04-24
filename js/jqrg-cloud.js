/* jqrg-cloud.js
 * Client for jchat.fly.dev auth + per-user save sync. Dropped into every same-origin page on
 * jimmyqrg.github.io so games inherit cloud saves automatically. The file is idempotent and
 * safe to include multiple times.
 *
 * It exposes `window.JqrgCloud` with:
 *   - login(username, password), register({...}), logout()
 *   - getUser() / isLoggedIn() / onAuthChange(handler)
 *   - forceSync()  – flush any pending writes and pull the latest server data
 *   - skipKey(prefix) / skipKeys([...])  – keys matching these prefixes are never synced
 *   - pushSave(key, value)  – opt-in manual push for IndexedDB/Unity snapshots
 *   - snapshotIdb(names?)  – snapshot one or more IndexedDB databases to the server (Unity saves)
 *   - restoreIdb(names?)   – restore IndexedDB snapshots from the server before the game starts
 *   - autoSyncIdb(names?)  – automatically snapshot on visibility-hidden and beforeunload
 *
 * localStorage is intercepted by wrapping the global Storage prototype. Writes are batched and
 * sent to /api/saves; reads are unaffected. On sign-in the script bulk-uploads everything that
 * exists locally (one-time migration) and then bulk-downloads the server snapshot, preferring
 * the newer side per key (last-writer-wins by timestamp).
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  if (window.__JqrgCloudLoaded) return;
  window.__JqrgCloudLoaded = true;

  // Allow override via <meta name="jqrg-cloud-server" content="..."> or window.__JqrgCloudServer
  // so local/staging copies of the chat server can be tested without editing this file.
  var SERVER = (function () {
    try {
      if (typeof window !== 'undefined' && typeof window.__JqrgCloudServer === 'string' && window.__JqrgCloudServer) {
        return window.__JqrgCloudServer.replace(/\/+$/, '');
      }
      var meta = document.querySelector && document.querySelector('meta[name="jqrg-cloud-server"]');
      if (meta && meta.content) return meta.content.replace(/\/+$/, '');
    } catch (_) {}
    return 'https://jchat.fly.dev';
  })();
  var STORAGE_NAMESPACE = 'jimmyqrg';
  var AUTH_KEY = '__jqrg_auth_v1';
  var LAST_SYNC_KEY = '__jqrg_cloud_last_sync';
  var MIGRATION_KEY = '__jqrg_cloud_migrated_v1';
  var PENDING_KEY = '__jqrg_cloud_pending_v1';
  var DEBOUNCE_MS = 800;
  var FETCH_INTERVAL_MS = 45 * 1000;
  var MAX_VALUE_BYTES = 512 * 1024;
  var SYNC_SKIP_PREFIXES = [
    '__jqrg_auth_',
    '__jqrg_cloud_',
    '__JqrgCloud',
    '__autoclick_', // the existing auto-clicker runtime state is noisy and per-tab
  ];
  var SYNC_SKIP_KEYS = new Set([
    'jqrg_redirect_after_login',
    'jqrg_redirect_after_signup',
  ]);
  var userSkipPrefixes = [];

  var LS = (function () { try { return window.localStorage; } catch (_) { return null; } })();

  /** Internal fetch that wires Authorization header + credentials. */
  var REQUEST_TIMEOUT_MS = 12000;

  function request(path, opts) {
    opts = opts || {};
    var headers = Object.assign({}, opts.headers || {});
    if (authState && authState.token) headers['Authorization'] = 'Bearer ' + authState.token;
    if (opts.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS) : null;
    return fetch(SERVER + path, {
      method: opts.method || 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: headers,
      body: opts.body,
      signal: controller ? controller.signal : undefined,
    }).then(function (res) {
      if (timer) clearTimeout(timer);
      var ct = res.headers.get('Content-Type') || '';
      var parse = ct.indexOf('application/json') !== -1 ? res.json() : res.text();
      return parse.then(function (data) {
        if (!res.ok) {
          var err = new Error((data && data.error) || res.statusText || 'Request failed');
          err.status = res.status;
          err.data = data;
          if (res.status === 401) {
            clearAuth();
          }
          throw err;
        }
        return data;
      });
    });
  }

  // Keep references to the native Storage methods so our own bookkeeping writes
  // bypass the interceptor and never trigger re-entrant enqueue() calls.
  var _storageProto = LS ? (Object.getPrototypeOf(LS) || Storage.prototype) : null;
  var _origSetItem = _storageProto ? _storageProto.setItem : null;
  var _origGetItem = _storageProto ? _storageProto.getItem : null;
  var _origRemoveItem = _storageProto ? _storageProto.removeItem : null;

  function readJSON(key, fallback) {
    if (!LS) return fallback;
    try {
      var raw = _origGetItem ? _origGetItem.call(LS, key) : LS.getItem(key);
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (_) { return fallback; }
  }
  function writeJSON(key, value) {
    if (!LS || !_origSetItem) return;
    try { _origSetItem.call(LS, key, JSON.stringify(value)); } catch (_) {}
  }
  function removeKey(key) {
    if (!LS || !_origRemoveItem) return;
    try { _origRemoveItem.call(LS, key); } catch (_) {}
  }

  var authState = readJSON(AUTH_KEY, null);
  if (authState && typeof authState === 'object' && authState.token && authState.user) {
    /* ok */
  } else {
    authState = null;
  }

  var authChangeHandlers = [];
  function fireAuthChange() {
    for (var i = 0; i < authChangeHandlers.length; i++) {
      try { authChangeHandlers[i](authState ? authState.user : null); } catch (_) {}
    }
  }

  function setAuth(user, token) {
    authState = { user: user, token: token, savedAt: Date.now() };
    writeJSON(AUTH_KEY, authState);
    fireAuthChange();
  }
  function clearAuth() {
    authState = null;
    removeKey(AUTH_KEY);
    fireAuthChange();
  }

  function shouldSyncKey(key) {
    if (typeof key !== 'string') return false;
    if (SYNC_SKIP_KEYS.has(key)) return false;
    for (var i = 0; i < SYNC_SKIP_PREFIXES.length; i++) {
      if (key.indexOf(SYNC_SKIP_PREFIXES[i]) === 0) return false;
    }
    for (var j = 0; j < userSkipPrefixes.length; j++) {
      if (key.indexOf(userSkipPrefixes[j]) === 0) return false;
    }
    return true;
  }

  var pendingQueue = readJSON(PENDING_KEY, {}) || {};
  var debounceTimer = null;
  var flushInFlight = false;

  /** Enqueue a change for syncing (value === null means delete). Debounces writes. */
  function enqueue(key, value) {
    if (!shouldSyncKey(key)) return;
    pendingQueue[key] = { value: value, time: Date.now(), deleted: value === null };
    writeJSON(PENDING_KEY, pendingQueue);
    scheduleFlush();
  }

  function scheduleFlush() {
    if (debounceTimer) return;
    debounceTimer = setTimeout(function () {
      debounceTimer = null;
      flushPending();
    }, DEBOUNCE_MS);
  }

  function flushPending() {
    if (flushInFlight) { scheduleFlush(); return; }
    if (!authState) return; // nothing to send; stay queued for after login
    var entries = Object.keys(pendingQueue);
    if (!entries.length) return;
    flushInFlight = true;
    var items = [];
    for (var i = 0; i < entries.length; i++) {
      var k = entries[i];
      var op = pendingQueue[k];
      if (op.deleted) {
        items.push({ key: k, value: '', updated_at: op.time, _delete: true });
      } else {
        var raw = op.value == null ? '' : String(op.value);
        if (raw.length > MAX_VALUE_BYTES) continue; // too big, skip silently
        items.push({ key: k, value: raw, updated_at: op.time });
      }
    }
    // Split deletes and upserts. Bulk upsert handles inserts/updates in one roundtrip; deletes are per-key.
    var deletes = items.filter(function (it) { return it._delete; });
    var upserts = items.filter(function (it) { return !it._delete; });
    var chain = Promise.resolve();
    if (upserts.length) {
      chain = chain.then(function () {
        return request('/api/saves/bulk', {
          method: 'POST',
          body: JSON.stringify({ origin: STORAGE_NAMESPACE, items: upserts }),
        });
      });
    }
    for (var d = 0; d < deletes.length; d++) {
      (function (item) {
        chain = chain.then(function () {
          var q = '?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&key=' + encodeURIComponent(item.key);
          return request('/api/saves' + q, { method: 'DELETE' });
        });
      })(deletes[d]);
    }
    chain.then(function () {
      pendingQueue = {};
      writeJSON(PENDING_KEY, pendingQueue);
      writeJSON(LAST_SYNC_KEY, { at: Date.now() });
    }).catch(function (err) {
      // On failure leave pending in place; we'll retry next tick.
      if (err && err.status === 401) { /* not logged in */ }
    }).then(function () {
      flushInFlight = false;
    });
  }

  /** Patch localStorage so every write and removal is observed. We replace setItem / removeItem /
   *  clear on Storage.prototype so all tabs/iframes on our origin are covered. */
  function installInterceptor() {
    if (!LS || !_storageProto) return;
    if (window.__jqrg_ls_patched) return;
    window.__jqrg_ls_patched = true;
    var origSet = _origSetItem;
    var origRemove = _origRemoveItem;
    var origClear = _storageProto.clear;
    _storageProto.setItem = function (k, v) {
      var ret = origSet.apply(this, arguments);
      try { if (this === LS) enqueue(String(k), v == null ? '' : String(v)); } catch (_) {}
      return ret;
    };
    _storageProto.removeItem = function (k) {
      var ret = origRemove.apply(this, arguments);
      try { if (this === LS) enqueue(String(k), null); } catch (_) {}
      return ret;
    };
    _storageProto.clear = function () {
      var keys = [];
      try { for (var i = 0; i < LS.length; i++) keys.push(LS.key(i)); } catch (_) {}
      var ret = origClear.apply(this, arguments);
      try {
        if (this === LS) for (var j = 0; j < keys.length; j++) if (keys[j]) enqueue(keys[j], null);
      } catch (_) {}
      return ret;
    };
  }

  /** Listen for storage events so writes from other same-origin tabs/iframes also sync. */
  function installStorageListener() {
    try {
      window.addEventListener('storage', function (e) {
        if (!e || !e.key) return;
        if (!shouldSyncKey(e.key)) return;
        // e.newValue === null means removeItem/clear; anything else is the new string value.
        enqueue(e.key, e.newValue);
      });
    } catch (_) {}
  }

  /** On first login, push every local key to the server (one-shot migration) then pull the server's
   *  snapshot and merge. Subsequent logins do incremental sync only. */
  function migrateAndPull() {
    if (!authState) return Promise.resolve();
    var already = readJSON(MIGRATION_KEY, null);
    var chain = Promise.resolve();
    if (!already) {
      chain = chain.then(function () {
        var items = [];
        try {
          for (var i = 0; i < LS.length; i++) {
            var k = LS.key(i);
            if (!k || !shouldSyncKey(k)) continue;
            var v = LS.getItem(k);
            if (v == null) continue;
            if (v.length > MAX_VALUE_BYTES) continue;
            items.push({ key: k, value: v, updated_at: 1 }); // priority 1 = very old so server wins if present
          }
        } catch (_) {}
        if (!items.length) return null;
        return request('/api/saves/bulk', {
          method: 'POST',
          body: JSON.stringify({ origin: STORAGE_NAMESPACE, items: items }),
        });
      }).then(function () {
        writeJSON(MIGRATION_KEY, { at: Date.now(), user: authState.user && authState.user.id });
      });
    }
    return chain.then(function () { return pullFromServer(0); });
  }

  /** Fetch everything from the server newer than `since` (0 means full snapshot) and apply to localStorage. */
  function pullFromServer(since) {
    if (!authState) return Promise.resolve({ items: [] });
    var url = '/api/saves?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&since=' + (since || 0);
    return request(url).then(function (data) {
      if (!data || !Array.isArray(data.items)) return data;
      var origSet = _origSetItem;
      for (var i = 0; i < data.items.length; i++) {
        var it = data.items[i];
        if (!it || typeof it.key !== 'string') continue;
        if (!shouldSyncKey(it.key)) continue;
        try {
          // Write bypassing our interceptor so we don't echo back to the server.
          if (origSet) origSet.call(LS, it.key, it.value == null ? '' : String(it.value));
          else LS.setItem(it.key, it.value == null ? '' : String(it.value));
        } catch (_) {}
      }
      writeJSON(LAST_SYNC_KEY, { at: data.server_time || Date.now() });
      return data;
    });
  }

  var periodicTimer = null;
  function startPeriodicSync() {
    if (periodicTimer) return;
    periodicTimer = setInterval(function () {
      if (!authState) return;
      var last = readJSON(LAST_SYNC_KEY, null);
      var since = (last && last.at) ? last.at - 1000 : 0;
      // Flush first so our changes go up before we pull theirs.
      flushPending();
      pullFromServer(since).catch(function () {});
    }, FETCH_INTERVAL_MS);
  }
  function stopPeriodicSync() {
    if (periodicTimer) { clearInterval(periodicTimer); periodicTimer = null; }
  }

  function whoAmI() {
    return request('/api/auth/me').then(function (data) {
      if (!data || !data.user) {
        // Our token is dead; invalidate.
        if (authState) clearAuth();
        return null;
      }
      if (!authState) {
        // We have a cookie-based session but no stored token. Ask for one so games work too.
        return request('/api/auth/token', { method: 'POST', body: JSON.stringify({ label: 'main' }) })
          .then(function (t) { setAuth(data.user, t.token); return data.user; })
          .catch(function () { return data.user; });
      }
      // Refresh cached user info in case display_name/avatar changed.
      authState.user = data.user;
      writeJSON(AUTH_KEY, authState);
      return data.user;
    });
  }

  /** Try to exchange a cookie session for a bearer token if we somehow don't have one. */
  function bootstrapToken() {
    if (authState && authState.token) return Promise.resolve(authState.user);
    return whoAmI().catch(function () { return null; });
  }

  function login(usernameOrEmail, password) {
    return request('/api/auth/login?want_token=1', {
      method: 'POST',
      body: JSON.stringify({ username: usernameOrEmail, password: password }),
    }).then(function (data) {
      if (data.error) throw new Error(data.error);
      if (!data.user || !data.token) throw new Error('Invalid login response');
      setAuth(data.user, data.token);
      return migrateAndPull().then(function () { startPeriodicSync(); return data.user; });
    });
  }

  function register(fields) {
    var body = {
      username: (fields.username || '').trim().toLowerCase(),
      email: (fields.email || '').trim(),
      password: fields.password || '',
      display_name: fields.display_name || fields.username || '',
    };
    return request('/api/auth/register?want_token=1', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(function (data) {
      if (data.error) throw new Error(data.error);
      if (!data.user || !data.token) throw new Error('Invalid register response');
      setAuth(data.user, data.token);
      return migrateAndPull().then(function () { startPeriodicSync(); return data.user; });
    });
  }

  function logout() {
    var had = !!authState;
    var req = request('/api/auth/logout', { method: 'POST' }).catch(function () {});
    stopPeriodicSync();
    clearAuth();
    pendingQueue = {};
    writeJSON(PENDING_KEY, pendingQueue);
    return req.then(function () { return had; });
  }

  function forceSync() {
    if (!authState) return Promise.resolve(null);
    var last = readJSON(LAST_SYNC_KEY, null);
    var since = (last && last.at) ? last.at - 1000 : 0;
    flushPending();
    return pullFromServer(since);
  }

  function pushSave(key, value, kind) {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    if (typeof key !== 'string' || !key) return Promise.reject(new Error('key required'));
    var body = { origin: STORAGE_NAMESPACE, key: key, value: value == null ? '' : String(value), kind: kind || 'blob', updated_at: Date.now() };
    return request('/api/saves', { method: 'PUT', body: JSON.stringify(body) });
  }

  function fetchSave(key, kind) {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    var q = '?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&key=' + encodeURIComponent(key) + '&kind=' + encodeURIComponent(kind || 'blob');
    return request('/api/saves/one' + q);
  }

  /** Pull the entire save set for the user across every kind (localStorage + idb snapshots). */
  function exportAll() {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    var kinds = ['localStorage', 'blob', IDB_KIND_PREFIX + 'default'];
    return Promise.all(kinds.map(function (kind) {
      return request('/api/saves?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&kind=' + encodeURIComponent(kind))
        .then(function (data) { return { kind: kind, items: (data && data.items) || [] }; })
        .catch(function () { return { kind: kind, items: [] }; });
    })).then(function (buckets) {
      var items = [];
      for (var b = 0; b < buckets.length; b++) {
        for (var i = 0; i < buckets[b].items.length; i++) {
          var it = buckets[b].items[i];
          items.push({
            origin: STORAGE_NAMESPACE,
            key: it.key,
            value: it.value,
            kind: buckets[b].kind,
            updated_at: it.updated_at,
          });
        }
      }
      return {
        format: 'jqrg-cloud-export',
        version: 1,
        exported_at: Date.now(),
        user: authState && authState.user ? { id: authState.user.id, username: authState.user.username } : null,
        items: items,
      };
    });
  }

  /** Accept an export file (as produced by `exportAll`) or a flat array/object of key/value
   *  pairs and upload them to the server. Returns a summary { accepted, rejected, total }. */
  function importAll(data) {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    if (!data) return Promise.reject(new Error('Empty import payload'));
    var items = [];
    // Official export format
    if (Array.isArray(data.items)) {
      for (var i = 0; i < data.items.length; i++) {
        var it = data.items[i];
        if (!it || typeof it.key !== 'string') continue;
        items.push({ key: it.key, value: it.value == null ? '' : String(it.value), updated_at: Number(it.updated_at) || Date.now(), kind: it.kind || 'localStorage' });
      }
    } else if (Array.isArray(data)) {
      for (var j = 0; j < data.length; j++) {
        var row = data[j];
        if (!row || typeof row.key !== 'string') continue;
        items.push({ key: row.key, value: row.value == null ? '' : String(row.value), updated_at: Number(row.updated_at) || Date.now(), kind: row.kind || 'localStorage' });
      }
    } else if (typeof data === 'object') {
      // Plain key/value object – treat as a localStorage blob.
      for (var k in data) {
        if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
        items.push({ key: k, value: String(data[k] == null ? '' : data[k]), updated_at: Date.now(), kind: 'localStorage' });
      }
    }
    if (!items.length) return Promise.reject(new Error('No valid save entries found'));

    // Server's /bulk route reads kind from each item, so we just chunk items directly.
    var accepted = 0, rejected = 0, total = items.length;
    var chain = Promise.resolve();
    for (var idx = 0; idx < items.length; idx += 500) {
      (function (slice) {
        chain = chain.then(function () {
          return request('/api/saves/bulk', {
            method: 'POST',
            body: JSON.stringify({ origin: STORAGE_NAMESPACE, items: slice }),
          }).then(function (r) {
            accepted += Number(r && r.accepted) || 0;
            rejected += Number(r && r.rejected) || 0;
          });
        });
      })(items.slice(idx, idx + 500));
    }
    return chain.then(function () {
      // Mirror localStorage kind items into the live localStorage so the user sees them immediately.
      try {
        items.forEach(function (it) { if (it.kind === 'localStorage' && _origSetItem) _origSetItem.call(LS, it.key, it.value); });
      } catch (_) {}
      return { accepted: accepted, rejected: rejected, total: total };
    });
  }

  /** Wipe every save for this user (all kinds) on the server and clear synced localStorage
   *  keys locally. Does not delete the account itself. */
  function deleteAll() {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    var kinds = ['localStorage', 'blob', IDB_KIND_PREFIX + 'default'];
    var chain = Promise.resolve();
    kinds.forEach(function (kind) {
      chain = chain.then(function () {
        return request('/api/saves?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&kind=' + encodeURIComponent(kind) + '&all=1', { method: 'DELETE' })
          .catch(function () { /* ignore individual kind failures */ });
      });
    });
    return chain.then(function () {
      // Clear same-origin localStorage except our own internal bookkeeping.
      try {
        if (LS) {
          var keys = [];
          for (var i = 0; i < LS.length; i++) keys.push(LS.key(i));
          keys.forEach(function (k) { if (shouldSyncKey(k) && _origRemoveItem) _origRemoveItem.call(LS, k); });
        }
      } catch (_) {}
      pendingQueue = {};
      writeJSON(PENDING_KEY, pendingQueue);
      writeJSON(LAST_SYNC_KEY, { at: Date.now() });
      return { ok: true };
    });
  }

  /* ============================================================================
   * IndexedDB helpers – used by Unity WebGL / Construct / Godot / etc.
   * Unity's IDBFS writes to a database named `/idbfs/<hash>` and Godot uses
   * `/userfs`. Rather than require every game to know about us, we expose a
   * generic snapshot/restore API that serialises every object store in a DB as
   * JSON (base64 for non-JSON blobs) and uploads it under kind="idb:<name>".
   * ==========================================================================*/

  var IDB_KIND_PREFIX = 'idb:';
  var IDB_SNAPSHOT_BYTES = 4 * 1024 * 1024; // hard cap per DB snapshot

  function encodeValue(v) {
    if (v == null) return { t: 'null' };
    if (v instanceof Uint8Array) return { t: 'u8', d: bufToB64(v) };
    if (v instanceof ArrayBuffer) return { t: 'ab', d: bufToB64(new Uint8Array(v)) };
    if (typeof Blob !== 'undefined' && v instanceof Blob) {
      // Blobs need async read; caller converts ahead of time.
      return { t: 'blob', d: null };
    }
    try {
      return { t: 'j', d: JSON.parse(JSON.stringify(v)) };
    } catch (_) {
      return { t: 'skip' };
    }
  }
  function decodeValue(enc) {
    if (!enc || typeof enc !== 'object') return null;
    if (enc.t === 'u8') return b64ToBuf(enc.d);
    if (enc.t === 'ab') return b64ToBuf(enc.d).buffer;
    if (enc.t === 'j') return enc.d;
    if (enc.t === 'null') return null;
    return null;
  }
  function bufToB64(u8) {
    try {
      var s = '';
      var len = u8.length;
      for (var i = 0; i < len; i += 0x8000) {
        s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
      }
      return btoa(s);
    } catch (_) { return ''; }
  }
  function b64ToBuf(str) {
    try {
      var bin = atob(str || '');
      var u8 = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      return u8;
    } catch (_) { return new Uint8Array(); }
  }

  function openDb(name) {
    return new Promise(function (resolve, reject) {
      try {
        var req = indexedDB.open(name);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error || new Error('open failed')); };
        req.onblocked = function () { reject(new Error('blocked')); };
      } catch (err) { reject(err); }
    });
  }

  function listIdbDatabases() {
    try {
      if (indexedDB && typeof indexedDB.databases === 'function') {
        return indexedDB.databases().then(function (list) {
          return (list || []).map(function (d) { return d && d.name ? d.name : null; }).filter(Boolean);
        });
      }
    } catch (_) {}
    return Promise.resolve([]);
  }

  function snapshotOne(name) {
    return openDb(name).then(function (db) {
      return new Promise(function (resolve, reject) {
        var stores = Array.from(db.objectStoreNames || []);
        if (!stores.length) { db.close(); return resolve({ name: name, version: db.version, stores: {} }); }
        var tx;
        try { tx = db.transaction(stores, 'readonly'); }
        catch (err) { db.close(); return reject(err); }
        var out = { name: name, version: db.version, stores: {} };
        var pending = stores.length;
        stores.forEach(function (s) {
          out.stores[s] = { keyPath: null, autoInc: false, entries: [] };
          var store;
          try { store = tx.objectStore(s); } catch (_) { if (!--pending) done(); return; }
          out.stores[s].keyPath = store.keyPath;
          out.stores[s].autoInc = !!store.autoIncrement;
          var cursorReq = store.openCursor();
          cursorReq.onerror = function () { if (!--pending) done(); };
          cursorReq.onsuccess = function () {
            var c = cursorReq.result;
            if (!c) { if (!--pending) done(); return; }
            try {
              var entry = { k: (store.keyPath ? null : c.key), v: encodeValue(c.value) };
              if (entry.v && entry.v.t !== 'skip' && entry.v.t !== 'blob') out.stores[s].entries.push(entry);
            } catch (_) {}
            try { c.continue(); } catch (_) { if (!--pending) done(); }
          };
        });
        function done() { try { db.close(); } catch (_) {} resolve(out); }
      });
    });
  }

  function restoreOne(snapshot) {
    var name = snapshot && snapshot.name;
    if (!name || !snapshot.stores) return Promise.resolve(false);
    return new Promise(function (resolve, reject) {
      try {
        var req = indexedDB.open(name, snapshot.version || 1);
        req.onupgradeneeded = function () {
          var db = req.result;
          Object.keys(snapshot.stores).forEach(function (s) {
            if (!db.objectStoreNames.contains(s)) {
              var opts = {};
              if (snapshot.stores[s].keyPath) opts.keyPath = snapshot.stores[s].keyPath;
              if (snapshot.stores[s].autoInc) opts.autoIncrement = true;
              try { db.createObjectStore(s, opts); } catch (_) {}
            }
          });
        };
        req.onsuccess = function () {
          var db = req.result;
          var stores = Object.keys(snapshot.stores).filter(function (s) { return db.objectStoreNames.contains(s); });
          if (!stores.length) { db.close(); return resolve(true); }
          var tx;
          try { tx = db.transaction(stores, 'readwrite'); }
          catch (err) { db.close(); return reject(err); }
          tx.oncomplete = function () { try { db.close(); } catch (_) {} resolve(true); };
          tx.onerror = function () { try { db.close(); } catch (_) {} reject(tx.error || new Error('tx failed')); };
          stores.forEach(function (s) {
            var store = tx.objectStore(s);
            try { store.clear(); } catch (_) {}
            var entries = snapshot.stores[s].entries || [];
            for (var i = 0; i < entries.length; i++) {
              var e = entries[i];
              var value = decodeValue(e.v);
              try {
                if (store.keyPath) store.put(value);
                else store.put(value, e.k);
              } catch (_) {}
            }
          });
        };
        req.onerror = function () { reject(req.error || new Error('open failed')); };
        req.onblocked = function () { reject(new Error('blocked')); };
      } catch (err) { reject(err); }
    });
  }

  function resolveIdbNames(names) {
    if (Array.isArray(names)) return Promise.resolve(names.filter(Boolean));
    if (typeof names === 'string') return Promise.resolve([names]);
    return listIdbDatabases();
  }

  function snapshotIdb(names) {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    return resolveIdbNames(names).then(function (list) {
      if (!list.length) return [];
      var results = [];
      return list.reduce(function (chain, name) {
        return chain.then(function () {
          return snapshotOne(name).then(function (snap) {
            var json = JSON.stringify(snap);
            if (json.length > IDB_SNAPSHOT_BYTES) return { name: name, skipped: 'too_large', size: json.length };
            return request('/api/saves', {
              method: 'PUT',
              body: JSON.stringify({
                origin: STORAGE_NAMESPACE,
                key: name,
                value: json,
                kind: IDB_KIND_PREFIX + 'default',
                updated_at: Date.now(),
              }),
            }).then(function () { return { name: name, ok: true, size: json.length }; });
          }).catch(function (err) { return { name: name, error: err && err.message || String(err) }; });
        }).then(function (r) { results.push(r); return results; });
      }, Promise.resolve()).then(function () { return results; });
    });
  }

  function restoreIdb(names) {
    if (!authState) return Promise.reject(new Error('Not signed in'));
    return resolveIdbNames(names).then(function (list) {
      // If nothing specified we try to restore whatever the server has for this user.
      var fetchServer = list.length
        ? Promise.all(list.map(function (n) {
            var q = '?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&key=' + encodeURIComponent(n) + '&kind=' + encodeURIComponent(IDB_KIND_PREFIX + 'default');
            return request('/api/saves/one' + q).then(function (d) { return d && d.value ? { name: n, value: d.value, updated_at: d.updated_at } : null; }).catch(function () { return null; });
          }))
        : request('/api/saves?origin=' + encodeURIComponent(STORAGE_NAMESPACE) + '&kind=' + encodeURIComponent(IDB_KIND_PREFIX + 'default'))
            .then(function (data) {
              return (data && data.items || []).map(function (it) { return { name: it.key, value: it.value, updated_at: it.updated_at }; });
            });
      return fetchServer.then(function (rows) {
        var valid = (rows || []).filter(Boolean);
        var results = [];
        return valid.reduce(function (chain, row) {
          return chain.then(function () {
            var snap;
            try { snap = JSON.parse(row.value); } catch (_) { results.push({ name: row.name, skipped: 'parse' }); return results; }
            return restoreOne(snap).then(function () { results.push({ name: row.name, ok: true }); }).catch(function (err) { results.push({ name: row.name, error: err && err.message || String(err) }); });
          });
        }, Promise.resolve()).then(function () { return results; });
      });
    });
  }

  var idbAutoNames = null;
  function autoSyncIdb(names) {
    idbAutoNames = names || null;
    if (window.__jqrg_idb_auto_bound) return;
    window.__jqrg_idb_auto_bound = true;
    var sync = function () {
      if (!authState) return;
      try { snapshotIdb(idbAutoNames).catch(function () {}); } catch (_) {}
    };
    try {
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') sync();
      });
      window.addEventListener('pagehide', sync);
      window.addEventListener('beforeunload', sync);
    } catch (_) {}
  }

  /** Detect Unity WebGL and Construct engines and auto-enable IDB sync once per page load. */
  function autoWireCommonEngines() {
    if (window.__jqrg_idb_auto_wired) return;
    window.__jqrg_idb_auto_wired = true;
    var triggered = false;
    var trigger = function () {
      if (triggered || !authState) return;
      triggered = true;
      // Restore before the game has a chance to persist anything new, then auto-snapshot on unload.
      restoreIdb().catch(function () {}).then(function () { autoSyncIdb(); });
    };
    try {
      var desc = Object.getOwnPropertyDescriptor(window, 'createUnityInstance');
      if (!desc) {
        var currentValue;
        Object.defineProperty(window, 'createUnityInstance', {
          configurable: true,
          get: function () { return currentValue; },
          set: function (v) { currentValue = v; trigger(); },
        });
      } else {
        // Something already defined it; just trigger now.
        trigger();
      }
    } catch (_) {}
    // Also watch for Construct runtimes which set window.cr_getC2Runtime or window.C3Runtime.
    var poll = 0;
    var poller = setInterval(function () {
      poll++;
      if (triggered) { clearInterval(poller); return; }
      if (window.cr_getC2Runtime || window.C3Runtime || window.Module) trigger();
      if (poll > 60) clearInterval(poller); // stop after ~60s
    }, 1000);
  }

  var api = {
    SERVER: SERVER,
    namespace: STORAGE_NAMESPACE,
    isLoggedIn: function () { return !!authState; },
    getUser: function () { return authState ? authState.user : null; },
    getToken: function () { return authState ? authState.token : null; },
    onAuthChange: function (fn) {
      if (typeof fn === 'function') authChangeHandlers.push(fn);
      return function () {
        var idx = authChangeHandlers.indexOf(fn);
        if (idx !== -1) authChangeHandlers.splice(idx, 1);
      };
    },
    skipKey: function (prefix) { if (typeof prefix === 'string') userSkipPrefixes.push(prefix); },
    skipKeys: function (list) { if (Array.isArray(list)) list.forEach(function (p) { api.skipKey(p); }); },
    login: login,
    register: register,
    logout: logout,
    forceSync: forceSync,
    pushSave: pushSave,
    fetchSave: fetchSave,
    exportAll: exportAll,
    importAll: importAll,
    deleteAll: deleteAll,
    snapshotIdb: snapshotIdb,
    restoreIdb: restoreIdb,
    autoSyncIdb: autoSyncIdb,
    whoAmI: whoAmI,
    openSsoChatUrl: function (next) {
      if (!authState) return SERVER + '/';
      var tail = next && typeof next === 'string' && next.charAt(0) === '/' ? next : '/';
      return SERVER + '/api/auth/sso?sso=' + encodeURIComponent(authState.token) + '&next=' + encodeURIComponent(tail);
    },
    _internals: { request: request, flushPending: flushPending, enqueue: enqueue },
  };
  window.JqrgCloud = api;

  try { installInterceptor(); } catch (e) { console.warn('[jqrg-cloud] interceptor failed', e); }
  try { installStorageListener(); } catch (e) { console.warn('[jqrg-cloud] storage listener failed', e); }
  try { autoWireCommonEngines(); } catch (e) { console.warn('[jqrg-cloud] engine auto-wire failed', e); }
  if (authState) {
    bootstrapToken().then(function () {
      flushPending();
      forceSync().catch(function () {});
      startPeriodicSync();
    }).catch(function () {});
  }

  // If the page was loaded via an SSO hand-off (?sso=TOKEN), pick it up, stash it, and clean the URL.
  try {
    var params = new URLSearchParams(window.location.search);
    var sso = params.get('sso');
    if (sso) {
      request('/api/auth/me', { headers: { Authorization: 'Bearer ' + sso } })
        .then(function (data) {
          if (data && data.user) {
            setAuth(data.user, sso);
            migrateAndPull().then(function () { startPeriodicSync(); }).catch(function () {});
          }
        })
        .catch(function () {})
        .then(function () {
          try {
            params.delete('sso');
            var q = params.toString();
            var url = window.location.pathname + (q ? '?' + q : '') + window.location.hash;
            window.history.replaceState({}, '', url);
          } catch (_) {}
        });
    }
  } catch (_) {}
})();
