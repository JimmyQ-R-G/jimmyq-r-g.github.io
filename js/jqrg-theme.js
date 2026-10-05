/* ============================================================================
 * JQRG theme switching
 * ----------------------------------------------------------------------------
 * Themes: "jimmyqrg" (default look) and "study". Stored in
 * localStorage["jqrgTheme"] and applied as <html data-theme="study"> —
 * css/jqrg-theme.css does the actual restyling.
 *
 * The page's <head> carries a 1-line snippet that sets the attribute before
 * first paint. It treats *any* value other than "jimmyqrg" as study, so a
 * device that has never chosen is Study until it answers the first-run
 * chooser below — nobody sees a flash of the dark theme on the way in.
 *
 * A first-run chooser is required: a new device cannot dismiss it, it sits
 * above the sign-in modal (z-index above the auth overlay), and the site stays
 * in Study until an answer is given. The answer is stored like any other
 * theme choice, so it only ever appears once per device.
 *
 * The Settings row is injected at runtime rather than edited into the settings
 * markup, so this stays a self-contained feature: one stylesheet + one script.
 * ==========================================================================*/
(function () {
  if (window.JqrgTheme) return;

  var KEY = 'jqrgTheme';
  var THEMES = [
    { value: 'jimmyqrg', label: 'JimmyQrg' },
    { value: 'study',    label: 'Study' }
  ];
  var VALID = { jimmyqrg: 1, study: 1 };
  var CHOOSER_ID = 'jqrg-theme-chooser';
  var escapeGuard = null;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }

  function read() {
    var v = stored();
    return VALID[v] ? v : 'study';   // unchosen devices behave as Study
  }

  function isChosen() {
    return !!VALID[stored()];
  }

  function apply(name) {
    var v = VALID[name] ? name : 'study';
    try {
      if (v === 'study') document.documentElement.setAttribute('data-theme', 'study');
      else document.documentElement.removeAttribute('data-theme');
    } catch (_) {}
    return v;
  }

  function set(name) {
    var before = stored();
    var v = apply(name);
    try { localStorage.setItem(KEY, v); } catch (_) {}
    paint();
    try { window.dispatchEvent(new CustomEvent('jqrg:themechange', { detail: { theme: v } })); } catch (_) {}
    applyCopy();
    /* A live swap cannot be made reliable. The wording pass rewrites text nodes
       in place, but the shell caches and re-renders that same DOM, so switching
       back to JimmyQrg left Study wording behind on pages rebuilt afterwards
       (measured: home still read "All Items" / "Open now" with theme cleared).
       The theme is applied before first paint anyway, so persist and reload —
       the page then renders exactly once, with the right theme from the start. */
    if (before !== v) {
      try { location.reload(); } catch (_) {}
    }
    return v;
  }

  function toggle() { return set(read() === 'study' ? 'jimmyqrg' : 'study'); }

  /* ---------------------------------------------------------------- picker */

  var STYLE_ID = 'jqrg-theme-style';
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      '.jqrg-theme-pick{display:inline-flex;gap:6px}' +
      '.jqrg-theme-pick .setting-btn{min-width:86px;text-align:center}' +
      '.jqrg-theme-pick .setting-btn[aria-pressed="true"]{border-color:#1a73e8;background:#e8f0fe;color:#1a73e8;font-weight:600}' +
      'html[data-theme="study"] .jqrg-theme-pick .setting-btn[aria-pressed="true"]{background:#e8f0fe;border-color:#1a73e8;color:#1a73e8}';
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

    var pick = document.createElement('span');
    pick.className = 'jqrg-theme-pick';
    THEMES.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'setting-btn';
      b.setAttribute('data-jqrg-theme-pick', t.value);
      b.textContent = t.label;
      b.onclick = function () { set(t.value); };
      pick.appendChild(b);
    });
    row.appendChild(pick);

    var hint = document.createElement('div');
    hint.className = 'setting-hint';
    hint.textContent = 'Study hides game artwork and turns tiles into plain name buttons.';
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

    var row = document.createElement('div');
    row.className = 'jqrg-theme-choose-row';

    [{ v: 'study',    t: 'Study',    d: 'Plain and light, like a normal school page. No game artwork.' },
     { v: 'jimmyqrg', t: 'JimmyQrg', d: 'The original look: dark, colourful, full game artwork.' }]
    .forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'jqrg-theme-choose-btn';
      b.setAttribute('data-pick', o.v);
      var strong = document.createElement('strong');
      strong.textContent = o.t;
      var span = document.createElement('span');
      span.textContent = o.d;
      b.appendChild(strong);
      b.appendChild(span);
      b.onclick = function () { choose(o.v); };
      row.appendChild(b);
    });

    card.appendChild(row);
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
    if (read() !== 'study' || !document.body) return;
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

  function applyCopy() {
    var study = read() === 'study';
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
    if (study) applyWording(); else restoreWording();
  }

  /* renderHomeGreeting() rewrites the hero on every home render, so wrap it
     instead of racing it. */
  function hookGreeting() {
    if (typeof window.renderHomeGreeting !== 'function' || window.renderHomeGreeting.__jqrgStudy) return;
    origGreeting = window.renderHomeGreeting;
    window.renderHomeGreeting = function () {
      var r = origGreeting.apply(this, arguments);
      if (read() === 'study') applyStudyGreeting();
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
    showChooser: showChooser,
    themes: THEMES.slice(),
    _ensureRow: watchSettings
  };

  // Unchosen devices must look Study immediately (the head snippet already
  // applied it) and must answer the chooser before anything else is usable.
  apply(read());

  function boot() {
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
        if (read() !== 'study') return;
        if (pending) clearTimeout(pending);
        pending = setTimeout(function () { applyWording(); }, 300);
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
