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
    var v = apply(name);
    try { localStorage.setItem(KEY, v); } catch (_) {}
    paint();
    try { window.dispatchEvent(new CustomEvent('jqrg:themechange', { detail: { theme: v } })); } catch (_) {}
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
    if (!isChosen()) showChooser();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
