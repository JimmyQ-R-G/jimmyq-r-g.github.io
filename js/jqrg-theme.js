/* ============================================================================
 * JQRG theme switching
 * ----------------------------------------------------------------------------
 * Theme choices are stored on this device and mirrored to jchat with an
 * anonymous device key. They are never attached to an account.
 *
 * The page's <head> bootstrap maps a saved theme ID to its family and variant
 * before first paint. A device that has never chosen starts in Study until it
 * answers the first-run chooser below, so no dark-theme flash appears.
 *
 * A first-run chooser is required: a new device cannot dismiss it, it sits
 * above the sign-in modal (z-index above the auth overlay), and the site stays
 * in Study until an answer is given. The answer is stored like any other
 * theme choice, so it only ever appears once per device.
 *
 * The Settings row is injected at runtime rather than edited into the settings
 * markup. Shared presets are loaded on every first-party page by this script.
 * ==========================================================================*/
(function () {
  if (window.JqrgTheme) return;

  var KEY = 'jqrgTheme';
  var DEVICE_KEY = 'jqrgThemeDeviceV1';
  var PAIRED_KEY = 'jqrgThemeDevicePairedV1';
  var UPDATED_KEY = 'jqrgThemeUpdatedV1';
  var SYNC_URL = 'https://discord.jimmyqrg.com/api/theme-sync';
  var GROUPS = [
    { label: 'Study', themes: [
      { value: 'study', label: 'Classroom', desc: 'Warm paper, calm green accents, and a clear school-desk layout.' },
      { value: 'study-library', label: 'Reading Room', desc: 'Parchment, bookish headings, and quiet burgundy details.' },
      { value: 'study-campus', label: 'Field Notes', desc: 'Sage and evergreen with an open, editorial feel.' },
      { value: 'study-lab', label: 'Lab Bench', desc: 'Cool blue-grey, precise lines, and a technical reference feel.' },
      { value: 'study-notebook', label: 'Notebook', desc: 'Cream paper, ruled accents, and friendly index-card rows.' },
      { value: 'study-graphite', label: 'Graphite', desc: 'Soft stone, charcoal ink, and restrained copper highlights.' }
    ]},
    { label: 'JimmyQrg', themes: [
      { value: 'jimmyqrg', label: 'Violet Arcade', desc: 'The original dark, purple-lit game lounge.' },
      { value: 'jimmyqrg-solar', label: 'Solar Cabinet', desc: 'Amber and ink, styled like a warm retro arcade cabinet.' },
      { value: 'jimmyqrg-verdant', label: 'Emerald Circuit', desc: 'Deep green and bright jade with a crisp game-library layout.' }
    ]}
  ];
  var THEMES = GROUPS.reduce(function (all, group) { return all.concat(group.themes); }, []);
  var VALID = THEMES.reduce(function (map, theme) { map[theme.value] = theme; return map; }, {});
  var CHOOSER_ID = 'jqrg-theme-chooser';
  var escapeGuard = null;
  var initialHandoff = consumeHandoff();

  function normalize(value) {
    if (VALID[value]) return value;
    if (value === 'simple') return 'study-lab';
    if (value === 'comic') return 'jimmyqrg-solar';
    return null;
  }

  function stored() {
    try { return normalize(localStorage.getItem(KEY)); } catch (_) { return null; }
  }

  function read() {
    var v = stored();
    return normalize(v) || 'study';
  }

  function isStudy(value) { return (normalize(value) || read()).indexOf('study') === 0; }

  function isChosen() {
    try { return !!normalize(localStorage.getItem(KEY)); } catch (_) { return false; }
  }

  function apply(name) {
    var v = normalize(name) || 'study';
    try {
      document.documentElement.setAttribute('data-theme', isStudy(v) ? 'study' : 'jimmyqrg');
      document.documentElement.setAttribute('data-theme-variant', v);
    } catch (_) {}
    return v;
  }

  function ensurePresetStylesheet() {
    if (document.querySelector('link[href*="/css/jqrg-theme-presets.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/jqrg-theme-presets.css?v=1';
    (document.head || document.documentElement).appendChild(link);
  }

  function set(name) {
    var before = stored();
    var v = null;
    try {
      v = apply(name);
      try { localStorage.setItem(KEY, v); } catch (_) {}
      stampLocal();
      paint();
      try { window.dispatchEvent(new CustomEvent('jqrg:themechange', { detail: { theme: v, family: isStudy(v) ? 'study' : 'jimmyqrg' } })); } catch (_) {}
      applyCopy();
      publishTheme(v);
    } catch (_) {
      /* Nothing in the swap may stop the reload below: a half-swapped DOM is
         exactly the "some UIs stay broken until I refresh" state. */
    }
    /* A live swap cannot be made reliable. The wording pass rewrites text nodes
       in place, but the shell caches and re-renders that same DOM, so switching
       back to JimmyQrg left Study wording behind on pages rebuilt afterwards
       (measured: home still read "All Items" / "Open now" with theme cleared).
       The theme is applied before first paint anyway, so persist and reload —
       the page then renders exactly once, with the right theme from the start.
       The reload runs whenever the value actually changed, even if a step
       above threw; skipping it leaves the broken page on screen. */
    if (before !== v) {
      try { location.reload(); } catch (_) { try { location.href = location.href; } catch (e) {} }
    }
    return v;
  }

  function toggle() { return set(isStudy(read()) ? 'jimmyqrg' : 'study'); }

  /* ---------------------------------------------------------------- picker */

  var STYLE_ID = 'jqrg-theme-style';
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      '.jqrg-theme-groups{display:grid;gap:16px;margin-top:8px}' +
      '.jqrg-theme-group-title{font-size:13px;font-weight:700;margin:0 0 7px}' +
      '.jqrg-theme-pick{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}' +
      '.jqrg-theme-pick .setting-btn{min-height:54px;text-align:left;white-space:normal}' +
      '.jqrg-theme-pick .setting-btn[aria-pressed="true"]{outline:2px solid var(--accent-purple);outline-offset:1px;font-weight:700}' +
      '.jqrg-theme-swatch{display:block;height:8px;border-radius:5px;margin-bottom:5px;background:var(--swatch,#315f52)}' +
      '.jqrg-theme-description{display:block;font-size:11px;opacity:.75;line-height:1.3;margin-top:3px}' +
      '#jqrg-theme-chooser{overflow:auto}#jqrg-theme-chooser .jqrg-theme-choose-card{max-height:calc(100vh - 32px);overflow:auto;width:min(920px,94vw)}' +
      '.jqrg-theme-choose-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:8px}' +
      '.jqrg-theme-choose-btn{text-align:left;min-height:86px}' +
      '@media(max-width:520px){.jqrg-theme-choose-row{grid-template-columns:1fr}.jqrg-theme-pick{grid-template-columns:repeat(2,minmax(0,1fr))}}';
    (document.head || document.documentElement).appendChild(s);
  }

  function buildRow() {
    var row = document.createElement('div');
    row.className = 'setting-row';
    row.setAttribute('data-jqrg-theme-row', '1');

    var label = document.createElement('span');
    label.className = 'setting-label';
    label.textContent = 'Theme';
    row.appendChild(label);

    var groups = document.createElement('div');
    groups.className = 'jqrg-theme-groups';
    GROUPS.forEach(function (group) {
      var section = document.createElement('section');
      var heading = document.createElement('div');
      heading.className = 'jqrg-theme-group-title';
      heading.textContent = group.label;
      section.appendChild(heading);
      var pick = document.createElement('div');
      pick.className = 'jqrg-theme-pick';
      group.themes.forEach(function (t) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'setting-btn';
        b.style.setProperty('--swatch', themeSwatch(t.value));
        b.setAttribute('data-jqrg-theme-pick', t.value);
        b.setAttribute('aria-pressed', read() === t.value ? 'true' : 'false');
        b.appendChild(document.createTextNode(t.label));
        var desc = document.createElement('small');
        desc.className = 'jqrg-theme-description';
        desc.textContent = t.desc;
        b.appendChild(desc);
        b.onclick = function () { set(t.value); };
        pick.appendChild(b);
      });
      section.appendChild(pick);
      groups.appendChild(section);
    });
    row.appendChild(groups);

    var hint = document.createElement('div');
    hint.className = 'setting-hint';
    hint.textContent = 'Your choice is saved on this device. Theme changes sync with JimmyQrg Chat after you open one site from the other.';
    hint.style.cssText = 'font-size:12.5px;color:var(--text-dim);margin-top:6px';
    row.appendChild(hint);

    return row;
  }

  function paint() {
    var current = read();
    var btns = document.querySelectorAll('[data-jqrg-theme-pick]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-jqrg-theme-pick') === current ? 'true' : 'false');
    }
  }

  function themeSwatch(id) {
    var swatches = {
      study: 'linear-gradient(90deg,#f4f2e9,#416b5d)',
      'study-library': 'linear-gradient(90deg,#f2e8d4,#713d43)',
      'study-campus': 'linear-gradient(90deg,#eff4e9,#467052)',
      'study-lab': 'linear-gradient(90deg,#edf4f8,#386786)',
      'study-notebook': 'linear-gradient(90deg,#fffaf0,#5974a3)',
      'study-graphite': 'linear-gradient(90deg,#ecebe7,#986744)',
      jimmyqrg: 'linear-gradient(90deg,#120c1a,#a78bfa)',
      'jimmyqrg-solar': 'linear-gradient(90deg,#1b130b,#f4a62a)',
      'jimmyqrg-verdant': 'linear-gradient(90deg,#0a1712,#3cda9b)'
    };
    return swatches[id] || swatches.study;
  }

  function validDeviceId(value) { return /^[A-Za-z0-9_-]{32,64}$/.test(String(value || '')); }
  function consumeHandoff() {
    try {
      var params = new URLSearchParams((location.hash || '').replace(/^#/, ''));
      var device = params.get('jqrg-theme-device');
      var theme = normalize(params.get('jqrg-theme'));
      if (validDeviceId(device)) { localStorage.setItem(DEVICE_KEY, device); localStorage.setItem(PAIRED_KEY, '1'); }
      if (validDeviceId(device) && theme) {
        localStorage.setItem(KEY, theme);
        localStorage.setItem(UPDATED_KEY, String(Date.now()));
      }
      if (params.has('jqrg-theme-device') || params.has('jqrg-theme')) {
        params.delete('jqrg-theme-device'); params.delete('jqrg-theme');
        history.replaceState(null, '', location.pathname + location.search + (params.toString() ? '#' + params.toString() : ''));
      }
      return validDeviceId(device) ? device : '';
    } catch (_) { return ''; }
  }

  function deviceId() {
    try {
      var value = localStorage.getItem(DEVICE_KEY);
      if (validDeviceId(value)) return value;
      var bytes = new Uint8Array(24);
      if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
      else for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
      value = Array.prototype.map.call(bytes, function (n) { return n.toString(16).padStart(2, '0'); }).join('');
      localStorage.setItem(DEVICE_KEY, value);
      return value;
    } catch (_) { return ''; }
  }

  function stampLocal(value) {
    try { localStorage.setItem(UPDATED_KEY, String(value || Date.now())); } catch (_) {}
  }

  function syncRequest(action, theme) {
    var id = deviceId();
    if (!id) return Promise.resolve(null);
    return fetch(SYNC_URL + '/' + action, {
      method: 'POST', mode: 'cors', credentials: 'omit', keepalive: action === 'write',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: id, theme: theme || '' })
    }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }

  function publishTheme(theme) {
    try { if (localStorage.getItem(PAIRED_KEY) !== '1') return Promise.resolve(null); } catch (_) { return Promise.resolve(null); }
    return syncRequest('write', normalize(theme) || read()).then(function (remote) {
      if (remote && Number(remote.updated_at || 0)) stampLocal(Number(remote.updated_at));
      return remote;
    });
  }

  function installDeviceSync() {
    deviceId();
    function decorateChatLinks() {
      var id = deviceId();
      document.querySelectorAll('a[href*="discord.jimmyqrg.com"]').forEach(function (link) {
        try {
          var url = new URL(link.href, location.href);
          if (url.hostname !== 'discord.jimmyqrg.com') return;
          url.hash = new URLSearchParams({ 'jqrg-theme-device': id, 'jqrg-theme': read() }).toString();
          link.href = url.href;
        } catch (_) {}
      });
    }
    document.addEventListener('click', function (event) {
      var link = event.target && event.target.closest ? event.target.closest('a[href*="discord.jimmyqrg.com"]') : null;
      if (link) {
        try { localStorage.setItem(PAIRED_KEY, '1'); } catch (_) {}
        decorateChatLinks();
      }
    }, true);
    decorateChatLinks();
    try { new MutationObserver(decorateChatLinks).observe(document.body, { childList: true, subtree: true }); } catch (_) {}
    function readShared() {
      try { if (localStorage.getItem(PAIRED_KEY) !== '1') return; } catch (_) { return; }
      if (document.visibilityState === 'hidden' || !isChosen()) return;
      var localUpdated = 0;
      try { localUpdated = Number(localStorage.getItem(UPDATED_KEY) || 0); } catch (_) {}
      syncRequest('read').then(function (remote) {
        if (!remote || !normalize(remote.theme)) {
          if (stored()) publishTheme(read());
          return;
        }
        if (Number(remote.updated_at || 0) > localUpdated) {
          var next = normalize(remote.theme);
          stampLocal(Number(remote.updated_at));
          if (stored() !== next) {
            localStorage.setItem(KEY, next);
            apply(next);
            location.reload();
          }
        } else if (stored() && localUpdated > Number(remote.updated_at || 0)) publishTheme(read());
      });
    }
    if (initialHandoff && stored()) publishTheme(read());
    readShared();
    window.setInterval(readShared, 4000);
    window.addEventListener('focus', readShared);
    document.addEventListener('visibilitychange', readShared);
    window.addEventListener('storage', function (event) {
      if (event.key === KEY && normalize(event.newValue)) {
        apply(normalize(event.newValue));
        location.reload();
      }
    });
  }

  /* The settings body is re-rendered every time the panel opens, so watch it
     instead of trying to hook the builder. */
  function watchSettings() {
    var body = document.getElementById('settings-body');
    if (!body) return;
    var ensure = function () {
      if (!body.children.length) return;
      if (body.querySelector('[data-jqrg-theme-row]')) { paint(); return; }
      ensureStyle();
      var head = body.firstElementChild;
      // Put Appearance at the top of the panel, above the existing first section.
      body.insertBefore(buildRow(), head ? head.nextSibling : null);
      paint();
    };
    ensure();
    try {
      new MutationObserver(ensure).observe(body, { childList: true, subtree: false });
    } catch (_) {}
  }

  /* ------------------------------------------------------------- first run */

  function removeChooser() {
    var el = document.getElementById(CHOOSER_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
    if (escapeGuard) {
      document.removeEventListener('keydown', escapeGuard, true);
      escapeGuard = null;
    }
  }

  function choose(value) {
    set(value);          // persists, applies, repaints the settings row
    removeChooser();
  }

  function showChooser() {
    if (!document.body) { document.addEventListener('DOMContentLoaded', showChooser); return; }
    if (document.getElementById(CHOOSER_ID)) return;
    if (isChosen()) return;

    var ov = document.createElement('div');
    ov.id = CHOOSER_ID;
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Choose your theme');

    var card = document.createElement('div');
    card.className = 'jqrg-theme-choose-card';

    var title = document.createElement('h2');
    title.textContent = 'Choose your look';
    card.appendChild(title);

    var sub = document.createElement('p');
    sub.textContent = 'Pick how the site looks. You can change this any time in Settings \u2192 Theme.';
    card.appendChild(sub);

    GROUPS.forEach(function (group) {
      var section = document.createElement('section');
      section.className = 'jqrg-theme-choose-group';
      var heading = document.createElement('h3');
      heading.textContent = group.label;
      section.appendChild(heading);
      var row = document.createElement('div');
      row.className = 'jqrg-theme-choose-row';
      group.themes.forEach(function (theme) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'jqrg-theme-choose-btn';
        b.setAttribute('data-pick', theme.value);
        b.style.setProperty('--swatch', themeSwatch(theme.value));
        var swatch = document.createElement('i');
        swatch.className = 'jqrg-theme-swatch';
        swatch.setAttribute('aria-hidden', 'true');
        var strong = document.createElement('strong');
        strong.textContent = theme.label;
        var span = document.createElement('span');
        span.textContent = theme.desc;
        b.appendChild(swatch); b.appendChild(strong); b.appendChild(span);
        b.onclick = function () { choose(theme.value); };
        row.appendChild(b);
      });
      section.appendChild(row);
      card.appendChild(section);
    });
    ov.appendChild(card);

    /* Required: the only way out is a deliberate choice. Clicks are NOT
       swallowed on the overlay — a capture-phase stopPropagation there would
       stop the choice buttons from ever receiving the click. We only block
       Escape, at the document level, while the chooser is up. */
    if (!escapeGuard) {
      escapeGuard = function (e) {
        if (e.key === 'Escape' && document.getElementById(CHOOSER_ID)) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      document.addEventListener('keydown', escapeGuard, true);
    }

    document.body.appendChild(ov);
  }

  /* ------------------------------------------------- study copy (home page)
   * The home page is written in game-site language. In Study it should read
   * like a school page, so a small set of strings is swapped for a neutral
   * equivalent. Each original is stashed on the element the first time it is
   * replaced, so switching back to JimmyQrg restores the exact wording.
   */
  var STUDY_SUBS = [
    'Everything you need for today, in one place.',
    'Pick up where you left off.',
    'Your tools and resources, in one place.',
    'Stay organised and keep going.'
  ];

  var STUDY_COPY = [
    { sel: '[aria-label="Open a random demo"] .home-quick-title', text: 'Random' },
    { sel: '[aria-label="Open a random demo"] .home-quick-desc',  text: 'Open a random pick.' },
    { sel: '[aria-label="Open starred items"] .home-quick-desc',  text: 'Items you starred earlier.' },
    { sel: '[aria-label="Open apps"] .home-quick-desc',           text: 'Study tools and resources.' },
    { sel: '.home-chat-banner-desc',                              text: 'Group chat for questions and study help.' }
  ];

  var ORIG_ATTR = 'data-jqrg-orig';
  var origGreeting = null;

  function studyGreeting() {
    var h = new Date().getHours();
    if (h < 5) return 'Welcome back';   // never "Still up" — that is a game-night greeting
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function subtitleIsStudy() {
    var sub = document.getElementById('home-subtitle');
    return !!(sub && STUDY_SUBS.indexOf(sub.textContent) !== -1);
  }

  function applyStudyGreeting() {
    var el = document.getElementById('home-greeting');
    if (!el) return;
    var name = '';
    try {
      var u = window.JqrgCloud && window.JqrgCloud.getUser && window.JqrgCloud.getUser();
      if (u) name = String(u.display_name || '').trim();
    } catch (_) {}
    var greet = studyGreeting();
    el.textContent = name ? (greet + ', ' + name) : (greet + '!');
    var sub = document.getElementById('home-subtitle');
    if (sub) sub.textContent = STUDY_SUBS[Math.floor(Math.random() * STUDY_SUBS.length)];
  }

  /* ------------------------------------------------- study wording (site-wide)
   * The palette was only half the problem: the copy reads as a game site. In
   * Study the visible text is rewritten in place, keeping the original meaning
   * as close as possible.
   *
   * Game and app names are never touched. Two guards make that safe:
   *   1. replacements are whole phrases ("Play Now", "All Demos") or the bare
   *      words game/games/demo — never partial-word substitutions that could
   *      land inside a proper noun;
   *   2. text inside tiles, tool titles and the assistant card is skipped
   *      outright, and so are script/style/code/pre/textarea.
   *
   * Originals are remembered per node so switching back to JimmyQrg restores
   * the exact game-theme wording.
   */
  var KEEP_SELECTOR = '.tile-label,.item-title,#home-quick-aichat-title,[data-jqrg-keep]';
  var PHRASES = [
    [/\bAll Demos\b/g, 'All Items'],
    [/\bPlay Now\b/g, 'Open now'],
    [/\bPlay\b/g, 'Open'],
    [/\bShuffle\b/g, 'Randomise'],
    [/\bStarred\b/g, 'Saved'],
    [/\bRandom Demo\b/g, 'Random'],
    [/\bDemos\b/g, 'Items'],
    [/\bDemo\b/g, 'Item'],
    [/\bWishlist\b/g, 'Reading list'],
    [/\bgames\b/g, 'activities'],
    [/\bGames\b/g, 'Activities'],
    [/\bgame\b/g, 'activity'],
    [/\bGame\b/g, 'Activity']
  ];

  var textOriginals = new WeakMap();
  var attrOriginals = new WeakMap();
  var savedTextNodes = [];
  var savedAttrNodes = [];

  function rewriteString(s) {
    var out = s;
    for (var i = 0; i < PHRASES.length; i++) out = out.replace(PHRASES[i][0], PHRASES[i][1]);
    return out;
  }

  function inKept(el) {
    try { return !!(el && el.closest && el.closest(KEEP_SELECTOR)); } catch (_) { return false; }
  }

  function skipParent(el) {
    if (!el) return true;
    var t = el.tagName;
    return t === 'SCRIPT' || t === 'STYLE' || t === 'TEXTAREA' ||
           t === 'CODE' || t === 'PRE' || t === 'NOSCRIPT' || t === 'TITLE';
  }

  function applyWording() {
    if (!isStudy(read()) || !document.body) return;
    try {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      var n;
      while ((n = walker.nextNode())) {
        var p = n.parentNode;
        if (!p || skipParent(p) || inKept(p)) continue;
        var t = n.nodeValue;
        if (!t || !t.trim()) continue;
        var out = rewriteString(t);
        if (out === t) continue;
        if (!textOriginals.has(n)) { textOriginals.set(n, t); savedTextNodes.push(n); }
        n.nodeValue = out;
      }
      var els = document.body.querySelectorAll('[placeholder],[title],[aria-label]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (inKept(el)) continue;
        for (var a = 0; a < 3; a++) {
          var attr = ['placeholder', 'title', 'aria-label'][a];
          if (!el.hasAttribute(attr)) continue;
          var v = el.getAttribute(attr);
          var nv = rewriteString(v);
          if (nv === v) continue;
          var rec = attrOriginals.get(el) || {};
          if (!(attr in rec)) { rec[attr] = v; attrOriginals.set(el, rec); if (savedAttrNodes.indexOf(el) === -1) savedAttrNodes.push(el); }
          el.setAttribute(attr, nv);
        }
      }
    } catch (_) {}
  }

  function restoreWording() {
    var i;
    for (i = 0; i < savedTextNodes.length; i++) {
      var n = savedTextNodes[i];
      if (n && textOriginals.has(n)) { try { n.nodeValue = textOriginals.get(n); } catch (_) {} }
    }
    for (i = 0; i < savedAttrNodes.length; i++) {
      var el = savedAttrNodes[i], rec = attrOriginals.get(el);
      if (!el || !rec) continue;
      for (var k in rec) { try { el.setAttribute(k, rec[k]); } catch (_) {} }
    }
    savedTextNodes = [];
    savedAttrNodes = [];
  }

  /* ---------------------------------------------------- anniversary (Study)
   * The anniversary experience is not part of Study. The stylesheet hides the
   * modal unconditionally; this disables the entry points too, so the
   * announcement list link, the auto-open on sign-in, or any other caller
   * cannot bring up the modal or the full-screen experience. */
  function blockAnniversary() {
    if (!isStudy(read())) return;
    try {
      var modal = document.getElementById('anniversary-modal');
      if (modal) modal.classList.remove('open');
      if (typeof window.openAnniversary === 'function' && !window.openAnniversary.__jqrgStudyBlocked) {
        var origOpen = window.openAnniversary;
        window.openAnniversary = function () {
          if (isStudy(read())) return;
          return origOpen.apply(this, arguments);
        };
        window.openAnniversary.__jqrgStudyBlocked = true;
      }
      var ann = window.JqrgAnniversary;
      if (ann && typeof ann.launch === 'function' && !ann.launch.__jqrgStudyBlocked) {
        var origLaunch = ann.launch;
        ann.launch = function () {
          if (isStudy(read())) return;
          return origLaunch.apply(this, arguments);
        };
        ann.launch.__jqrgStudyBlocked = true;
      }
    } catch (_) {}
  }

  function applyCopy() {
    var study = isStudy(read());
    for (var i = 0; i < STUDY_COPY.length; i++) {
      var el = document.querySelector(STUDY_COPY[i].sel);
      if (!el) continue;
      if (el.getAttribute(ORIG_ATTR) === null) el.setAttribute(ORIG_ATTR, el.textContent);
      el.textContent = study ? STUDY_COPY[i].text : el.getAttribute(ORIG_ATTR);
      if (!study) el.removeAttribute(ORIG_ATTR);
    }
    // Only touch the hero when it is not already ours, so a retry loop cannot
    // re-randomise the subtitle and make it flicker.
    if (study) { if (!subtitleIsStudy()) applyStudyGreeting(); }
    else if (origGreeting) origGreeting();
    if (study) { applyWording(); blockAnniversary(); } else restoreWording();
  }

  /* renderHomeGreeting() rewrites the hero on every home render, so wrap it
     instead of racing it. */
  function hookGreeting() {
    if (typeof window.renderHomeGreeting !== 'function' || window.renderHomeGreeting.__jqrgStudy) return;
    origGreeting = window.renderHomeGreeting;
    window.renderHomeGreeting = function () {
      var r = origGreeting.apply(this, arguments);
      if (isStudy(read())) applyStudyGreeting();
      return r;
    };
    window.renderHomeGreeting.__jqrgStudy = true;
  }

  /* The home page is rebuilt on navigation, so re-apply once it lands. */
  function hookNavigate() {
    if (typeof window.navigate !== 'function' || window.navigate.__jqrgStudy) return;
    var orig = window.navigate;
    window.navigate = function () {
      var r = orig.apply(this, arguments);
      setTimeout(applyCopy, 0);
      setTimeout(applyCopy, 400);
      return r;
    };
    window.navigate.__jqrgStudy = true;
  }

  window.JqrgTheme = {
    get: read,
    set: set,
    toggle: toggle,
    apply: apply,
    isChosen: isChosen,
    isStudy: function () { return isStudy(read()); },
    showChooser: showChooser,
    themes: THEMES.slice(),
    groups: GROUPS.slice(),
    _ensureRow: watchSettings
  };

  // Unchosen devices must look Study immediately (the head snippet already
  // applied it) and must answer the chooser before anything else is usable.
  apply(read());

  function boot() {
    ensurePresetStylesheet();
    installDeviceSync();
    watchSettings();
    hookGreeting();
    hookNavigate();
    applyCopy();
    // The shell defines renderHomeGreeting()/navigate() in an inline script and
    // rebuilds home asynchronously, so retry briefly rather than assume order.
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      hookGreeting(); hookNavigate(); applyCopy();
      if (tries > 12) clearInterval(t);
    }, 500);
    // Grids, filters and modals render later; keep the wording in step without
    // re-walking the whole document on every keystroke.
    try {
      var pending = null;
      new MutationObserver(function () {
        if (!isStudy(read())) return;
        if (pending) clearTimeout(pending);
        pending = setTimeout(function () { applyWording(); blockAnniversary(); }, 300);
      }).observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (_) {}
    if (!isChosen()) showChooser();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
