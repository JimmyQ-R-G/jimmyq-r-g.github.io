/* jqrg-auth-ui.js
 * Adds a profile/sign-in button to the top bar and a login/signup/account modal. Depends on
 * jqrg-cloud.js (loaded first) which exposes window.JqrgCloud. Safe to include once per page.
 *
 * The site is auth-gated: on every same-origin page load we check whether the user has a
 * valid session. If not we pop up the sign-in modal in "required" mode (no close button,
 * escape key disabled, background click disabled) until the user signs in or signs up.
 *
 * The account modal also exposes:
 *   - Export data    – downloads a JSON snapshot of every cloud save (localStorage + idb kinds)
 *   - Import data    – accepts a JSON file (or raw JSON string) and bulk-uploads it
 *   - Delete all data – asks the user to type DELETE before wiping server + local storage
 */
(function () {
  'use strict';
  if (window.__JqrgAuthUiLoaded) return;
  window.__JqrgAuthUiLoaded = true;

  var Cloud = window.JqrgCloud;
  if (!Cloud) {
    console.warn('[jqrg-auth-ui] JqrgCloud not found; is jqrg-cloud.js included first?');
    return;
  }

  /** Pages that should never be gated behind login (error pages, unsubscribes, etc.). */
  var GATE_SKIP_PATHS = [
    '/403.html', '/404.html', '/404-safe.html', '/404-building.html',
  ];

  /** Hosts where the auth gate is disabled (test/staging deployments). */
  var GATE_SKIP_HOSTS = [
    'jimmyq-r-g.github.io',
    '127.0.0.1',
    'localhost',
  ];

  function shouldGate() {
    if (window.__JqrgAuthGateDisabled) return false;
    if (window.top !== window.self) return false; // don't gate inside iframes
    var host = (location.hostname || '').toLowerCase();
    for (var i = 0; i < GATE_SKIP_HOSTS.length; i++) {
      if (host === GATE_SKIP_HOSTS[i] || host.endsWith('.' + GATE_SKIP_HOSTS[i])) return false;
    }
    var path = (location.pathname || '').toLowerCase();
    for (var i = 0; i < GATE_SKIP_PATHS.length; i++) {
      if (path === GATE_SKIP_PATHS[i] || path.endsWith(GATE_SKIP_PATHS[i])) return false;
    }
    return true;
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  }

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (k === 'class') el.className = v;
        else if (k === 'html') el.innerHTML = v;
        else if (k.indexOf('on') === 0 && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (v != null) el.setAttribute(k, v);
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return el;
  }

  function injectStyles() {
    if (document.getElementById('jqrg-auth-ui-css')) return;
    var style = h('style', { id: 'jqrg-auth-ui-css' });
    style.textContent = [
      '.jqrg-auth-btn{',
      '  position:relative;display:inline-flex;align-items:center;gap:8px;',
      '  height:36px;padding:0 12px;border:0;background:transparent;color:inherit;',
      '  border-radius:10px;cursor:pointer;font-family:inherit;font-size:13px;',
      '  transition:background .25s ease,transform .25s ease;',
      '}',
      '.jqrg-auth-btn:hover{background:rgba(255,255,255,.08)}',
      '.jqrg-auth-btn .jqrg-avatar{',
      '  width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#8841d6,#4f46e5);',
      '  display:flex;align-items:center;justify-content:center;font-weight:600;font-size:12px;',
      '  color:#fff;flex-shrink:0;',
      '}',
      '.jqrg-auth-btn .jqrg-label{max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.jqrg-auth-btn.logged-out .jqrg-avatar{background:rgba(255,255,255,.08);color:rgba(255,255,255,.7)}',
      '.jqrg-auth-overlay{',
      '  position:fixed;inset:0;background:rgba(5,0,15,.85);backdrop-filter:blur(6px);',
      '  display:flex;align-items:center;justify-content:center;z-index:2147483000;',
      '  opacity:0;pointer-events:none;transition:opacity .25s ease;padding:16px;',
      '}',
      '.jqrg-auth-overlay.open{opacity:1;pointer-events:auto}',
      '.jqrg-auth-overlay.required::before{',
      '  content:"";position:fixed;inset:0;pointer-events:none;',
      '  box-shadow:inset 0 0 0 9999px rgba(0,0,0,.55);',
      '}',
      '.jqrg-auth-modal{',
      '  background:#17102a;border:1px solid rgba(255,255,255,.08);border-radius:16px;',
      '  padding:22px;max-width:440px;width:100%;color:#fff;box-shadow:0 24px 70px rgba(0,0,0,.55);',
      '  max-height:90vh;overflow:auto;',
      '}',
      '.jqrg-auth-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}',
      '.jqrg-auth-title{font-size:18px;font-weight:700}',
      '.jqrg-auth-close{background:transparent;border:0;color:#fff;font-size:22px;cursor:pointer;line-height:1}',
      '.jqrg-auth-close[disabled]{display:none}',
      '.jqrg-auth-form{display:flex;flex-direction:column;gap:12px}',
      '.jqrg-auth-tabs{display:flex;gap:4px;padding:4px;background:rgba(255,255,255,.05);border-radius:10px;margin-bottom:6px}',
      '.jqrg-auth-tab{flex:1;padding:8px;border:0;background:transparent;color:rgba(255,255,255,.65);border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;transition:all .25s ease}',
      '.jqrg-auth-tab.active{background:linear-gradient(135deg,rgba(136,65,214,.6),rgba(79,70,229,.6));color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.25)}',
      '.jqrg-auth-form label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:rgba(255,255,255,.75)}',
      '.jqrg-auth-form input{',
      '  padding:10px 12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);',
      '  color:#fff;border-radius:10px;font-family:inherit;font-size:14px;outline:none;',
      '  transition:border-color .25s ease,background .25s ease;',
      '}',
      '.jqrg-auth-form input:focus{border-color:rgba(136,65,214,.7);background:rgba(255,255,255,.12)}',
      '.jqrg-auth-submit{',
      '  padding:10px 16px;background:linear-gradient(135deg,#8841d6,#6d28d9);',
      '  border:0;color:#fff;border-radius:10px;font-family:inherit;font-size:14px;',
      '  cursor:pointer;font-weight:600;transition:transform .2s ease,box-shadow .25s ease;',
      '}',
      '.jqrg-auth-submit:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(136,65,214,.35)}',
      '.jqrg-auth-submit:disabled{opacity:.6;cursor:wait;transform:none;box-shadow:none}',
      '.jqrg-auth-error{color:#ff7a7a;font-size:13px;min-height:18px;margin:-4px 0 4px}',
      '.jqrg-auth-success{color:#7affa0;font-size:13px;min-height:18px;margin:-4px 0 4px}',
      '.jqrg-auth-hint{color:rgba(255,255,255,.6);font-size:12px;line-height:1.4}',
      '.jqrg-gate-intro{',
      '  background:rgba(136,65,214,.15);border:1px solid rgba(136,65,214,.35);border-radius:12px;',
      '  padding:12px 14px;margin-bottom:6px;color:rgba(255,255,255,.85);font-size:13px;line-height:1.45;',
      '}',
      '.jqrg-profile-row{',
      '  display:flex;align-items:center;gap:12px;padding:12px;border:1px solid rgba(255,255,255,.1);',
      '  border-radius:12px;background:rgba(255,255,255,.04);',
      '}',
      '.jqrg-profile-row .jqrg-big-avatar{',
      '  width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#8841d6,#4f46e5);',
      '  display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:20px;',
      '}',
      '.jqrg-profile-info{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}',
      '.jqrg-profile-name{font-size:15px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.jqrg-profile-user{font-size:12px;color:rgba(255,255,255,.55)}',
      '.jqrg-profile-actions{display:flex;flex-direction:column;gap:8px;margin-top:8px}',
      '.jqrg-profile-action{',
      '  padding:10px 14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);',
      '  color:#fff;border-radius:10px;font-family:inherit;font-size:13px;cursor:pointer;',
      '  text-align:left;display:flex;align-items:center;gap:10px;text-decoration:none;',
      '  transition:background .2s ease,border-color .2s ease,transform .2s ease;',
      '}',
      '.jqrg-profile-action:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2);transform:translateY(-1px)}',
      '.jqrg-profile-action.danger{color:#ff7a7a;border-color:rgba(255,122,122,.25)}',
      '.jqrg-profile-action.danger:hover{background:rgba(255,122,122,.08)}',
      '.jqrg-profile-action .icon{width:18px;display:inline-flex;justify-content:center}',
      '.jqrg-sync-status{font-size:11px;color:rgba(255,255,255,.45);margin-top:4px;text-align:center}',
      '.jqrg-sync-status.active{color:#7affa0}',
      '.jqrg-forgot-hint{font-size:12px;color:rgba(255,255,255,.55);text-align:center;margin-top:4px}',
      '.jqrg-confirm-msg{font-size:14px;color:#fff;line-height:1.45}',
      '.jqrg-confirm-danger{color:#ff9a9a;font-weight:600}',
      '.jqrg-confirm-note{font-size:12px;color:rgba(255,255,255,.6);margin-top:6px}',
      '.jqrg-confirm-input{',
      '  padding:12px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,122,122,.35);',
      '  color:#fff;border-radius:10px;font-family:"SF Mono","Consolas",monospace;font-size:15px;',
      '  letter-spacing:2px;text-align:center;outline:none;',
      '}',
      '.jqrg-confirm-input:focus{border-color:rgba(255,122,122,.7);background:rgba(255,255,255,.08)}',
      '.jqrg-confirm-actions{display:flex;gap:8px;margin-top:10px}',
      '.jqrg-confirm-actions button{flex:1}',
      '.jqrg-btn-ghost{',
      '  padding:10px 14px;background:transparent;border:1px solid rgba(255,255,255,.18);color:#fff;',
      '  border-radius:10px;font-family:inherit;font-size:13px;cursor:pointer;',
      '}',
      '.jqrg-btn-ghost:hover{background:rgba(255,255,255,.06)}',
      '.jqrg-btn-danger{',
      '  padding:10px 14px;background:linear-gradient(135deg,#d4365a,#b01e40);border:0;color:#fff;',
      '  border-radius:10px;font-family:inherit;font-size:13px;cursor:pointer;font-weight:600;',
      '}',
      '.jqrg-btn-danger:disabled{opacity:.4;cursor:not-allowed}',
      '.jqrg-btn-danger:hover:not(:disabled){box-shadow:0 6px 18px rgba(212,54,90,.35)}',
    ].join('');
    document.head.appendChild(style);
  }

  function initials(user) {
    var name = (user && (user.display_name || user.username)) || '';
    if (!name) return '?';
    var parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function downloadBlob(filename, mime, contents) {
    try {
      var blob = new Blob([contents], { type: mime || 'application/octet-stream' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        try { URL.revokeObjectURL(a.href); a.remove(); } catch (_) {}
      }, 1000);
      return true;
    } catch (err) { return false; }
  }

  function pickFile(accept) {
    return new Promise(function (resolve) {
      var input = document.createElement('input');
      input.type = 'file';
      if (accept) input.accept = accept;
      input.onchange = function () {
        var f = input.files && input.files[0];
        resolve(f || null);
      };
      document.body.appendChild(input);
      input.click();
      setTimeout(function () { try { input.remove(); } catch (_) {} }, 5000);
    });
  }

  var topBarBtn = null;
  var modalEl = null;
  var modalRequired = false;
  var currentTab = 'login';

  function buildButton() {
    var btn = h('button', {
      class: 'settings-top jqrg-auth-btn logged-out',
      title: 'Account',
      onclick: function () { openModal(); },
    });
    btn.appendChild(h('span', { class: 'jqrg-avatar' }, '?'));
    btn.appendChild(h('span', { class: 'jqrg-label' }, 'Sign in'));
    return btn;
  }

  function refreshButton() {
    if (!topBarBtn) return;
    var user = Cloud.getUser();
    var avatar = topBarBtn.querySelector('.jqrg-avatar');
    var label = topBarBtn.querySelector('.jqrg-label');
    if (user) {
      topBarBtn.classList.remove('logged-out');
      if (avatar) avatar.textContent = initials(user);
      if (label) label.textContent = user.display_name || user.username;
      topBarBtn.title = 'Signed in as ' + (user.username || '');
    } else {
      topBarBtn.classList.add('logged-out');
      if (avatar) avatar.textContent = '?';
      if (label) label.textContent = 'Sign in';
      topBarBtn.title = 'Sign in';
    }
  }

  function ensureTopBarButton() {
    var bar = document.querySelector('.top-bar');
    if (!bar) return;
    if (!topBarBtn) {
      topBarBtn = buildButton();
      var anchor = bar.querySelector('.settings-top');
      if (anchor) bar.insertBefore(topBarBtn, anchor);
      else bar.appendChild(topBarBtn);
    }
    refreshButton();
  }

  function closeModal(force) {
    if (!modalEl) return;
    if (modalRequired && !force) return; // can't close required modal without signing in
    modalEl.classList.remove('open');
    var el = modalEl;
    setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); if (modalEl === el) modalEl = null; }, 300);
    document.removeEventListener('keydown', escHandler);
  }

  function setTab(tab) {
    currentTab = tab;
    if (!modalEl) return;
    var tabs = modalEl.querySelectorAll('.jqrg-auth-tab');
    tabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-tab') === tab); });
    var body = modalEl.querySelector('.jqrg-auth-body');
    body.innerHTML = '';
    if (Cloud.isLoggedIn()) {
      body.appendChild(buildProfileForm());
    } else if (tab === 'signup') {
      body.appendChild(buildSignupForm());
    } else {
      body.appendChild(buildLoginForm());
    }
  }

  function buildLoginForm() {
    var err = h('div', { class: 'jqrg-auth-error' });
    var form = h('form', { class: 'jqrg-auth-form', onsubmit: function (ev) {
      ev.preventDefault();
      err.textContent = '';
      var id = form.elements['id'].value.trim();
      var pw = form.elements['pw'].value;
      if (!id || !pw) { err.textContent = 'Enter a username/email and password.'; return; }
      var submit = form.querySelector('.jqrg-auth-submit');
      submit.disabled = true; submit.textContent = 'Signing in…';
      Cloud.login(id, pw).then(function () {
        setTab('profile');
        onSignedIn();
      }).catch(function (e) {
        err.textContent = (e && e.message) || 'Login failed.';
        submit.disabled = false; submit.textContent = 'Sign in';
      });
    }});
    if (modalRequired) {
      form.appendChild(h('div', { class: 'jqrg-gate-intro' },
        'JimmyQrg games sync progress to the cloud. Sign in to play, or sign up to create a free account — your existing saves will be uploaded automatically.'));
    }
    form.appendChild(h('label', null, [
      'Username or email',
      h('input', { type: 'text', name: 'id', autocomplete: 'username', required: 'required', autofocus: 'autofocus' }),
    ]));
    form.appendChild(h('label', null, [
      'Password',
      h('input', { type: 'password', name: 'pw', autocomplete: 'current-password', required: 'required' }),
    ]));
    form.appendChild(err);
    form.appendChild(h('button', { type: 'submit', class: 'jqrg-auth-submit' }, 'Sign in'));
    form.appendChild(h('div', { class: 'jqrg-auth-hint' }, 'Your chat account works here too. After signing in, game save data will sync to the cloud.'));
    return form;
  }

  function buildSignupForm() {
    var err = h('div', { class: 'jqrg-auth-error' });
    var form = h('form', { class: 'jqrg-auth-form', onsubmit: function (ev) {
      ev.preventDefault();
      err.textContent = '';
      var username = form.elements['username'].value.trim().toLowerCase();
      var email = form.elements['email'].value.trim();
      var displayName = form.elements['display_name'].value.trim();
      var pw = form.elements['pw'].value;
      var pw2 = form.elements['pw2'].value;
      if (!/^[a-z0-9]{1,32}$/.test(username)) { err.textContent = 'Username must be 1-32 lowercase letters or numbers.'; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Please enter a valid email address.'; return; }
      if (pw.length < 6) { err.textContent = 'Password must be at least 6 characters.'; return; }
      if (pw !== pw2) { err.textContent = 'Passwords do not match.'; return; }
      var submit = form.querySelector('.jqrg-auth-submit');
      submit.disabled = true; submit.textContent = 'Creating account…';
      Cloud.register({ username: username, email: email, password: pw, display_name: displayName || username }).then(function () {
        setTab('profile');
        onSignedIn();
      }).catch(function (e) {
        err.textContent = (e && e.message) || 'Sign-up failed.';
        submit.disabled = false; submit.textContent = 'Create account';
      });
    }});
    if (modalRequired) {
      form.appendChild(h('div', { class: 'jqrg-gate-intro' },
        'Create a free account. Any saves already in your browser will become the starting point for your cloud account.'));
    }
    form.appendChild(h('label', null, [
      'Username (lowercase, letters + numbers)',
      h('input', { type: 'text', name: 'username', autocomplete: 'username', required: 'required', maxlength: '32', pattern: '[a-z0-9]+', autofocus: 'autofocus' }),
    ]));
    form.appendChild(h('label', null, [
      'Email',
      h('input', { type: 'email', name: 'email', autocomplete: 'email', required: 'required', maxlength: '255' }),
    ]));
    form.appendChild(h('label', null, [
      'Display name (optional)',
      h('input', { type: 'text', name: 'display_name', maxlength: '64' }),
    ]));
    form.appendChild(h('label', null, [
      'Password (6+ characters)',
      h('input', { type: 'password', name: 'pw', autocomplete: 'new-password', required: 'required', minlength: '6' }),
    ]));
    form.appendChild(h('label', null, [
      'Confirm password',
      h('input', { type: 'password', name: 'pw2', autocomplete: 'new-password', required: 'required', minlength: '6' }),
    ]));
    form.appendChild(err);
    form.appendChild(h('button', { type: 'submit', class: 'jqrg-auth-submit' }, 'Create account'));
    form.appendChild(h('div', { class: 'jqrg-auth-hint' }, 'One account signs you in here and on the JimmyQrg chat.'));
    return form;
  }

  function buildProfileForm() {
    var user = Cloud.getUser();
    var wrap = h('div', { class: 'jqrg-auth-form' });
    var row = h('div', { class: 'jqrg-profile-row' });
    row.appendChild(h('div', { class: 'jqrg-big-avatar' }, initials(user)));
    var info = h('div', { class: 'jqrg-profile-info' });
    info.appendChild(h('div', { class: 'jqrg-profile-name' }, (user && (user.display_name || user.username)) || 'Signed in'));
    info.appendChild(h('div', { class: 'jqrg-profile-user' }, '@' + (user && user.username || '')));
    row.appendChild(info);
    wrap.appendChild(row);

    var syncStatus = h('div', { class: 'jqrg-sync-status' }, 'Game saves are syncing to the cloud');
    wrap.appendChild(syncStatus);

    var actions = h('div', { class: 'jqrg-profile-actions' });

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action',
      type: 'button',
      onclick: function () {
        syncStatus.textContent = 'Syncing…';
        Cloud.forceSync().then(function () {
          syncStatus.textContent = 'Up to date';
          syncStatus.classList.add('active');
          setTimeout(function () { syncStatus.classList.remove('active'); syncStatus.textContent = 'Game saves are syncing to the cloud'; }, 2000);
        }).catch(function (e) {
          syncStatus.textContent = 'Sync failed: ' + ((e && e.message) || 'unknown');
        });
      },
    }, [h('span', { class: 'icon' }, '\u21BB'), 'Sync now']));

    actions.appendChild(h('a', {
      class: 'jqrg-profile-action',
      href: Cloud.openSsoChatUrl(),
      target: '_blank',
      rel: 'noopener',
    }, [h('span', { class: 'icon' }, '\u2709'), 'Open chat (already signed in)']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action',
      type: 'button',
      onclick: function () { doExport(syncStatus); },
    }, [h('span', { class: 'icon' }, '\u21E9'), 'Export data']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action',
      type: 'button',
      onclick: function () { doImport(syncStatus); },
    }, [h('span', { class: 'icon' }, '\u21E7'), 'Import data']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action danger',
      type: 'button',
      onclick: function () { doDeleteAll(); },
    }, [h('span', { class: 'icon' }, '\u2717'), 'Delete all data']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action danger',
      type: 'button',
      onclick: function () {
        Cloud.logout().then(function () {
          onSignedOut();
        });
      },
    }, [h('span', { class: 'icon' }, '\u21AA'), 'Sign out']));

    wrap.appendChild(actions);
    return wrap;
  }

  function doExport(statusEl) {
    if (!Cloud.isLoggedIn()) return;
    if (statusEl) statusEl.textContent = 'Preparing export…';
    Cloud.forceSync().catch(function () {}).then(function () {
      return Cloud.exportAll();
    }).then(function (snapshot) {
      var json = JSON.stringify(snapshot, null, 2);
      var user = Cloud.getUser();
      var name = (user && user.username ? user.username : 'jqrg') + '-saves-' + new Date().toISOString().slice(0, 10) + '.json';
      downloadBlob(name, 'application/json', json);
      if (statusEl) {
        statusEl.textContent = 'Exported ' + (snapshot.items ? snapshot.items.length : 0) + ' saves';
        statusEl.classList.add('active');
        setTimeout(function () { statusEl.classList.remove('active'); statusEl.textContent = 'Game saves are syncing to the cloud'; }, 2500);
      }
    }).catch(function (err) {
      if (statusEl) statusEl.textContent = 'Export failed: ' + ((err && err.message) || 'unknown');
    });
  }

  function doImport(statusEl) {
    if (!Cloud.isLoggedIn()) return;
    pickFile('application/json,.json').then(function (file) {
      if (!file) return;
      if (statusEl) statusEl.textContent = 'Reading ' + file.name + '…';
      return file.text().then(function (text) {
        var data;
        try { data = JSON.parse(text); } catch (_) { throw new Error('File is not valid JSON.'); }
        return Cloud.importAll(data).then(function (result) {
          if (statusEl) {
            statusEl.textContent = 'Imported ' + (result.accepted || 0) + ' saves' + (result.rejected ? ' (' + result.rejected + ' rejected)' : '');
            statusEl.classList.add('active');
            setTimeout(function () { statusEl.classList.remove('active'); statusEl.textContent = 'Game saves are syncing to the cloud'; }, 3000);
          }
          return Cloud.forceSync().catch(function () {});
        });
      });
    }).catch(function (err) {
      if (statusEl) statusEl.textContent = 'Import failed: ' + ((err && err.message) || 'unknown');
    });
  }

  function doDeleteAll() {
    var previousTab = currentTab;
    var body = modalEl && modalEl.querySelector('.jqrg-auth-body');
    if (!body) return;
    body.innerHTML = '';
    var wrap = h('div', { class: 'jqrg-auth-form' });
    wrap.appendChild(h('div', { class: 'jqrg-confirm-msg' }, [
      'This will permanently remove ',
      h('span', { class: 'jqrg-confirm-danger' }, 'all of your saved game data'),
      ' from the cloud and from this browser. Progress cannot be recovered after confirmation.',
    ]));
    wrap.appendChild(h('div', { class: 'jqrg-confirm-note' }, 'Your account itself will not be deleted — only the saves.'));

    var cancel = h('button', { type: 'button', class: 'jqrg-btn-ghost' }, 'Cancel');
    var proceed = h('button', { type: 'button', class: 'jqrg-btn-danger' }, 'I understand, continue');

    var actions = h('div', { class: 'jqrg-confirm-actions' }, [cancel, proceed]);
    wrap.appendChild(actions);
    body.appendChild(wrap);

    cancel.onclick = function () { setTab(Cloud.isLoggedIn() ? 'profile' : previousTab); };

    proceed.onclick = function () {
      body.innerHTML = '';
      var step2 = h('div', { class: 'jqrg-auth-form' });
      step2.appendChild(h('div', { class: 'jqrg-confirm-msg' }, [
        'Type ',
        h('span', { class: 'jqrg-confirm-danger' }, 'DELETE'),
        ' (all caps) to confirm. This cannot be undone.',
      ]));
      var input = h('input', {
        type: 'text',
        class: 'jqrg-confirm-input',
        maxlength: '6',
        autocomplete: 'off',
        autocorrect: 'off',
        spellcheck: 'false',
        autocapitalize: 'characters',
        autofocus: 'autofocus',
        placeholder: 'DELETE',
      });
      step2.appendChild(input);
      var err = h('div', { class: 'jqrg-auth-error' });
      step2.appendChild(err);
      var cancel2 = h('button', { type: 'button', class: 'jqrg-btn-ghost' }, 'Cancel');
      var finalBtn = h('button', { type: 'button', class: 'jqrg-btn-danger', disabled: 'disabled' }, 'Delete everything');
      step2.appendChild(h('div', { class: 'jqrg-confirm-actions' }, [cancel2, finalBtn]));
      body.appendChild(step2);

      input.addEventListener('input', function () {
        var v = (input.value || '').trim().toUpperCase();
        input.value = v;
        finalBtn.disabled = v !== 'DELETE';
      });

      cancel2.onclick = function () { setTab(Cloud.isLoggedIn() ? 'profile' : previousTab); };

      finalBtn.onclick = function () {
        if ((input.value || '').trim().toUpperCase() !== 'DELETE') return;
        finalBtn.disabled = true; cancel2.disabled = true; input.disabled = true;
        finalBtn.textContent = 'Deleting…';
        Cloud.deleteAll().then(function () {
          body.innerHTML = '';
          var done = h('div', { class: 'jqrg-auth-form' }, [
            h('div', { class: 'jqrg-confirm-msg' }, 'All saves deleted.'),
            h('div', { class: 'jqrg-auth-hint' }, 'Your local storage has been wiped and the server now shows zero saved games for this account.'),
            h('button', { type: 'button', class: 'jqrg-btn-ghost', onclick: function () { setTab('profile'); } }, 'Back to account'),
          ]);
          body.appendChild(done);
        }).catch(function (e) {
          err.textContent = 'Delete failed: ' + ((e && e.message) || 'unknown');
          finalBtn.disabled = false; cancel2.disabled = false; input.disabled = false;
          finalBtn.textContent = 'Delete everything';
        });
      };
    };
  }

  function openModal(opts) {
    opts = opts || {};
    var wantRequired = !!opts.required;
    if (modalEl) {
      if (wantRequired) modalRequired = true;
      syncModalRequired();
      return;
    }
    modalRequired = wantRequired;
    injectStyles();
    var overlay = h('div', { class: 'jqrg-auth-overlay', onclick: function (e) { if (e.target === overlay) closeModal(); } });
    var modal = h('div', { class: 'jqrg-auth-modal' });
    var head = h('div', { class: 'jqrg-auth-head' });
    head.appendChild(h('div', { class: 'jqrg-auth-title' }, Cloud.isLoggedIn() ? 'Your account' : (wantRequired ? 'Sign in to continue' : 'Sign in')));
    var closeBtn = h('button', { class: 'jqrg-auth-close', type: 'button', 'aria-label': 'Close', onclick: function () { closeModal(); } }, '\u00D7');
    if (wantRequired) closeBtn.setAttribute('disabled', 'disabled');
    head.appendChild(closeBtn);
    modal.appendChild(head);

    var body = h('div', { class: 'jqrg-auth-body' });
    if (!Cloud.isLoggedIn()) {
      var tabs = h('div', { class: 'jqrg-auth-tabs' });
      tabs.appendChild(h('button', { type: 'button', class: 'jqrg-auth-tab active', 'data-tab': 'login', onclick: function () { setTab('login'); } }, 'Sign in'));
      tabs.appendChild(h('button', { type: 'button', class: 'jqrg-auth-tab', 'data-tab': 'signup', onclick: function () { setTab('signup'); } }, 'Sign up'));
      body.appendChild(tabs);
      body.appendChild(buildLoginForm());
    } else {
      body.appendChild(buildProfileForm());
    }
    modal.appendChild(body);
    overlay.appendChild(modal);
    modalEl = overlay;
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('open'); });
    syncModalRequired();
    document.addEventListener('keydown', escHandler);
  }

  function syncModalRequired() {
    if (!modalEl) return;
    modalEl.classList.toggle('required', modalRequired);
    var close = modalEl.querySelector('.jqrg-auth-close');
    if (close) {
      if (modalRequired) close.setAttribute('disabled', 'disabled');
      else close.removeAttribute('disabled');
    }
  }

  function escHandler(e) {
    if (e.key !== 'Escape') return;
    if (modalRequired) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    closeModal();
  }

  function onSignedIn() {
    // Unblock the page once signed in.
    if (modalRequired) {
      modalRequired = false;
      syncModalRequired();
    }
  }
  function onSignedOut() {
    if (shouldGate() && !Cloud.isLoggedIn()) {
      setTab('login');
      modalRequired = true;
      syncModalRequired();
      if (!modalEl) openModal({ required: true });
    } else {
      setTab('login');
    }
  }

  Cloud.onAuthChange(function () {
    refreshButton();
    if (modalEl) {
      var head = modalEl.querySelector('.jqrg-auth-title');
      if (head) head.textContent = Cloud.isLoggedIn() ? 'Your account' : (modalRequired ? 'Sign in to continue' : 'Sign in');
      setTab(Cloud.isLoggedIn() ? 'profile' : currentTab);
    }
  });

  function maybeGate() {
    if (!shouldGate()) return;
    if (Cloud.isLoggedIn()) return;
    // give jqrg-cloud a moment to validate the cached token (or pick up an SSO token from URL)
    setTimeout(function () {
      if (Cloud.isLoggedIn()) return;
      openModal({ required: true });
    }, 250);
  }

  ready(function () {
    injectStyles();
    ensureTopBarButton();
    // In case the top bar renders later (e.g. if the index.html rewrites it),
    // poll briefly rather than using a MutationObserver on the whole body (which
    // fires on every DOM mutation and created feedback loops on heavy pages).
    if (!topBarBtn) {
      var attempts = 0;
      var retryTimer = setInterval(function () {
        attempts++;
        ensureTopBarButton();
        if (topBarBtn || attempts > 20) clearInterval(retryTimer);
      }, 500);
    }

    // Expose a way for page code to open the dialog programmatically.
    window.openJqrgAuth = openModal;
    window.closeJqrgAuth = function () { closeModal(true); };
    window.JqrgAuthUI = {
      openModal: openModal,
      closeModal: function () { closeModal(true); },
      export: function () { return Cloud.exportAll(); },
      import: function (data) { return Cloud.importAll(data); },
      deleteAll: function () { return Cloud.deleteAll(); },
    };

    maybeGate();
  });
})();
