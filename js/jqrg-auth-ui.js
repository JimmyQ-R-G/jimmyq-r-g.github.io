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

  /** Returns 'block' if the current page should be redirected to home (sub-pages),
   *  'gate' if we should show the modal on the current page (home page),
   *  or false if no gating applies. To bypass the gate during local development set
   *  `window.__JqrgAuthGateDisabled = true` before this script runs. */
  function shouldGate() {
    if (window.__JqrgAuthGateDisabled) return false;
    if (window.top !== window.self) return false; // don't gate inside iframes
    var path = (location.pathname || '').toLowerCase();
    for (var i = 0; i < GATE_SKIP_PATHS.length; i++) {
      if (path === GATE_SKIP_PATHS[i] || path.endsWith(GATE_SKIP_PATHS[i])) return false;
    }
    return true;
  }

  /** Check if the URL hash points to a non-home tab. */
  function isSubPage() {
    var hash = (location.hash || '').slice(1).toLowerCase();
    return hash === 'g' || hash === 'a' || hash === 'u' || hash === 'c';
  }

  /** True if the current path is NOT the main index.html page. */
  function isOffHomePath() {
    var path = (location.pathname || '').replace(/\/+$/, '').toLowerCase();
    return path !== '' && path !== '/index.html';
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

  // Inline SVG icons used in the account modal action buttons. They use currentColor so the
  // danger variant (red text) tints the stroke automatically.
  var ICON_EXPORT_SVG =
    '<svg viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M9.34688 17.8643L14.2531 22.75M14.2531 22.75L19.1593 17.8643M14.2531 22.75V11.7571M25.1449 19.1956C26.2113 18.4489 27.0109 17.3832 27.4279 16.1532C27.8448 14.9232 27.8573 13.5929 27.4636 12.3554C27.0698 11.1179 26.2903 10.0375 25.2382 9.27097C24.1861 8.50448 22.916 8.09181 21.6124 8.09282H20.067C19.6981 6.66115 19.0078 5.33147 18.0482 4.20388C17.0886 3.0763 15.8846 2.18019 14.5269 1.58302C13.1692 0.985857 11.6931 0.703194 10.2098 0.756313C8.7265 0.809432 7.27463 1.19695 5.9635 1.88969C4.65236 2.58243 3.51612 3.56235 2.64031 4.75566C1.7645 5.94898 1.17196 7.3246 0.907278 8.77896C0.642598 10.2333 0.712684 11.7285 1.11226 13.152C1.51183 14.5755 2.23048 15.8902 3.21411 16.9971" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_IMPORT_SVG =
    '<svg viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M9.34688 16.6428L14.2531 11.7571M14.2531 11.7571L19.1593 16.6428M14.2531 11.7571V22.75M25.1449 19.1956C26.2113 18.4489 27.0109 17.3832 27.4279 16.1532C27.8448 14.9232 27.8573 13.593 27.4636 12.3554C27.0698 11.1179 26.2903 10.0375 25.2382 9.27097C24.1861 8.50448 22.916 8.09181 21.6124 8.09282H20.067C19.6981 6.66115 19.0078 5.33147 18.0482 4.20388C17.0886 3.0763 15.8846 2.18019 14.5269 1.58302C13.1692 0.985857 11.6931 0.703194 10.2098 0.756313C8.7265 0.809432 7.27463 1.19695 5.96349 1.88969C4.65236 2.58243 3.51612 3.56235 2.64031 4.75566C1.7645 5.94898 1.17196 7.3246 0.907278 8.77896C0.642598 10.2333 0.712684 11.7285 1.11226 13.152C1.51183 14.5755 2.23048 15.8902 3.21411 16.9971" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_TRASH_SVG =
    '<svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M0.75 5.15H2.97222M2.97222 5.15H20.75M2.97222 5.15V20.55C2.97222 21.1335 3.20635 21.6931 3.6231 22.1056C4.03984 22.5182 4.60507 22.75 5.19444 22.75H16.3056C16.8949 22.75 17.4602 22.5182 17.8769 22.1056C18.2937 21.6931 18.5278 21.1335 18.5278 20.55V5.15M6.30556 5.15V2.95C6.30556 2.36652 6.53968 1.80695 6.95643 1.39437C7.37318 0.981785 7.93841 0.75 8.52778 0.75H12.9722C13.5616 0.75 14.1268 0.981785 14.5436 1.39437C14.9603 1.80695 15.1944 2.36652 15.1944 2.95V5.15M8.52778 10.65V17.25M12.9722 10.65V17.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  var ICON_SIGNOUT_SVG =
    '<svg viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M9.71447 5.75V3.25C9.71447 1.86929 10.8338 0.75 12.2145 0.75H23.2145C24.5952 0.75 25.7145 1.86929 25.7145 3.25V20.25C25.7145 21.6307 24.5952 22.75 23.2145 22.75H12.2145C10.8338 22.75 9.71447 21.6307 9.71447 20.25V17.75M6.71447 9.75H17.7145C18.819 9.75 19.7145 10.6454 19.7145 11.75C19.7145 12.8546 18.819 13.75 17.7145 13.75H6.71447M5.71447 5.75L1.48223 9.98223C0.505923 10.9585 0.505922 12.5415 1.48223 13.5178L5.71447 17.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    '</svg>';

  function actionIcon(svgMarkup) {
    return h('span', { class: 'icon', html: svgMarkup });
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
      '  color:#fff;flex-shrink:0;overflow:hidden;',
      '}',
      '.jqrg-auth-btn .jqrg-avatar.has-img{background:transparent}',
      '.jqrg-auth-btn .jqrg-avatar img{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%}',
      '.jqrg-auth-btn .jqrg-label{max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.jqrg-auth-btn.logged-out .jqrg-avatar{background:rgba(255,255,255,.08);color:rgba(255,255,255,.7)}',
      // The overlay's BACKGROUND is the only darken layer. We intentionally do NOT
      // use a ::before pseudo-element here — earlier attempts stacked the pseudo
      // (position:fixed, z-index:0) above the modal in some browsers because each
      // creates its own stacking context and Safari/Chromium occasionally paint the
      // fixed-position child on top of relative siblings inside the same parent.
      // Using only `background` avoids the issue entirely: the overlay's background
      // is always painted underneath any child element.
      '.jqrg-auth-overlay{',
      '  position:fixed;inset:0;background:rgba(5,0,15,.85);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
      '  display:flex;align-items:center;justify-content:center;z-index:2147483000;',
      '  opacity:0;pointer-events:none;transition:opacity .25s ease,background-color .25s ease;padding:16px;',
      '  isolation:isolate;', // self-contained stacking context, just to be safe
      '}',
      '.jqrg-auth-overlay.open{opacity:1;pointer-events:auto}',
      // Required mode just darkens the overlay further. No pseudo-element involved.
      '.jqrg-auth-overlay.required{background:rgba(2,0,8,.94)}',
      '.jqrg-auth-modal{',
      '  position:relative;z-index:1;',
      '  background:#1d1635;border:1px solid rgba(255,255,255,.12);border-radius:16px;',
      '  padding:22px;max-width:440px;width:100%;color:#fff;',
      '  box-shadow:0 24px 70px rgba(0,0,0,.6),0 0 0 1px rgba(136,65,214,.18);',
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
      '  overflow:hidden;flex-shrink:0;',
      '}',
      '.jqrg-profile-row .jqrg-big-avatar.has-img{background:transparent}',
      '.jqrg-profile-row .jqrg-big-avatar img{width:100%;height:100%;object-fit:cover;display:block;border-radius:50%}',
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
      '.jqrg-profile-action .icon{width:22px;height:18px;display:inline-flex;justify-content:center;align-items:center;color:inherit}',
      '.jqrg-profile-action .icon svg{display:block;width:auto;height:18px;color:inherit}',
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

  var USER_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>';

  // ---------- Avatar logic ported from jchat (chat/public/assets/js/api.js) ----------
  // Same hash + palette + silhouette SVG, so a user has the same default avatar across
  // the chat site and the games site.
  var AVATAR_COLOR_COUNT = 108;

  function avatarSimpleHash(str) {
    if (!str) return 0;
    var h = 0;
    var s = String(str).trim();
    for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return h >>> 0;
  }

  function pad2(s) { return s.length < 2 ? '0' + s : s; }

  function hslToHex(hh, ss, ll) {
    var s = ss / 100;
    var l = ll / 100;
    var a = s * Math.min(l, 1 - l);
    function f(n) {
      var k = (n + hh / 30) % 12;
      return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    }
    function toHex(x) { return pad2(Math.round(x * 255).toString(16)); }
    return '#' + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
  }

  var avatarColors = (function () {
    var colors = [];
    var golden = 0.618033988749895;
    for (var i = 0; i < AVATAR_COLOR_COUNT; i++) {
      var hue = (i * golden * 360) % 360;
      var sat = 52 + (avatarSimpleHash(String(i)) % 28);
      var light = 42 + (avatarSimpleHash(String(i + AVATAR_COLOR_COUNT)) % 26);
      colors.push(hslToHex(hue, sat, light));
    }
    return colors;
  })();

  function darkenHex(hex, factor) {
    if (factor == null) factor = 0.35;
    var n = parseInt(hex.slice(1), 16);
    function clip(v) { return pad2(Math.round(v * factor).toString(16)); }
    return '#' + clip((n >> 16) & 255) + clip((n >> 8) & 255) + clip(n & 255);
  }

  function getDefaultAvatarUrl(userIdOrUsername) {
    var key = userIdOrUsername != null ? String(userIdOrUsername).trim() : '';
    var i = key ? avatarSimpleHash(key) % AVATAR_COLOR_COUNT : 0;
    var fill = avatarColors[i];
    var bg = darkenHex(fill);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">' +
      '<circle cx="32" cy="32" r="32" fill="' + bg + '"/>' +
      '<circle cx="32" cy="26" r="12" fill="' + fill + '"/>' +
      '<ellipse cx="32" cy="58" rx="20" ry="14" fill="' + fill + '"/>' +
      '</svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /** Resolve the avatar URL for a user object, mirroring jchat's resolution.
   *  - Uploaded avatars are stored as relative `/uploads/...` paths on the chat
   *    server, so prefix them with `Cloud.SERVER` (e.g. https://chat.jimmyqrg.com).
   *  - Absolute URLs and `data:` URIs are returned untouched.
   *  - Falls back to the deterministic colored silhouette if no avatar is set. */
  function avatarUrlFor(user) {
    if (!user) return getDefaultAvatarUrl(null);
    var raw = user.avatar_url;
    if (raw != null) {
      raw = String(raw).trim();
      if (raw) {
        if (/^(https?:|data:)/i.test(raw)) return raw;
        if (raw.charAt(0) === '/' && Cloud && Cloud.SERVER) return Cloud.SERVER + raw;
        return raw;
      }
    }
    return getDefaultAvatarUrl(user.id || user.username);
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
    btn.appendChild(h('span', { class: 'jqrg-avatar', html: USER_ICON_SVG }));
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
      if (avatar) renderAvatarImg(avatar, user);
      if (label) label.textContent = user.display_name || user.username;
      topBarBtn.title = 'Signed in as ' + (user.username || '');
    } else {
      topBarBtn.classList.add('logged-out');
      if (avatar) {
        avatar.classList.remove('has-img');
        avatar.innerHTML = USER_ICON_SVG;
      }
      if (label) label.textContent = 'Sign in';
      topBarBtn.title = 'Sign in';
    }
  }

  /** Replace the contents of an avatar container (`.jqrg-avatar` or `.jqrg-big-avatar`)
   *  with an <img> showing this user's jchat avatar (uploaded URL or default silhouette).
   *  Falls back to the default silhouette URL on load error. */
  function renderAvatarImg(container, user) {
    container.classList.add('has-img');
    container.innerHTML = '';
    var src = avatarUrlFor(user);
    var fallback = getDefaultAvatarUrl(user && (user.id || user.username));
    var img = h('img', { src: src, alt: '' });
    img.addEventListener('error', function () {
      if (img.src !== fallback) img.src = fallback;
    });
    container.appendChild(img);
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
    var tabsEl = modalEl.querySelector('.jqrg-auth-tabs');
    var content = modalEl.querySelector('.jqrg-auth-content');
    if (!content) return;

    if (Cloud.isLoggedIn()) {
      if (tabsEl) tabsEl.style.display = 'none';
      content.innerHTML = '';
      content.appendChild(buildProfileForm());
    } else {
      if (tabsEl) {
        tabsEl.style.display = '';
        tabsEl.querySelectorAll('.jqrg-auth-tab').forEach(function (t) {
          t.classList.toggle('active', t.getAttribute('data-tab') === tab);
        });
      }
      content.innerHTML = '';
      if (tab === 'signup') {
        content.appendChild(buildSignupForm());
      } else {
        content.appendChild(buildLoginForm());
      }
    }
  }

  function buildLoginForm() {
    var err = h('div', { class: 'jqrg-auth-error' });
    var form = h('form', { class: 'jqrg-auth-form', onsubmit: function (ev) {
      ev.preventDefault();
      err.textContent = '';
      var id = form.elements['login_id'].value.trim();
      var pw = form.elements['pw'].value;
      if (!id || !pw) { err.textContent = 'Enter a username/email and password.'; return; }
      var submit = form.querySelector('.jqrg-auth-submit');
      submit.disabled = true; submit.textContent = 'Signing in…';
      // Lock onAuthChange's auto-navigation so the profile view doesn't flicker before we
      // decide whether to show the sync prompt. Cleared by maybeOfferLocalSync / finish().
      syncPromptInFlight = true;
      Cloud.login(id, pw).then(function () {
        onSignedIn();
        maybeOfferLocalSync(function () {
          syncPromptInFlight = false;
          setTab('profile');
        });
      }).catch(function (e) {
        syncPromptInFlight = false;
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
      h('input', { type: 'text', name: 'login_id', autocomplete: 'username', required: 'required', autofocus: 'autofocus' }),
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
      syncPromptInFlight = true;
      Cloud.register({ username: username, email: email, password: pw, display_name: displayName || username }).then(function () {
        onSignedIn();
        maybeOfferLocalSync(function () {
          syncPromptInFlight = false;
          setTab('profile');
        });
      }).catch(function (e) {
        syncPromptInFlight = false;
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
    var bigAvatar = h('div', { class: 'jqrg-big-avatar' });
    if (user) renderAvatarImg(bigAvatar, user);
    else bigAvatar.innerHTML = USER_ICON_SVG;
    row.appendChild(bigAvatar);
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
      onclick: function () { doExport(syncStatus); },
    }, [actionIcon(ICON_EXPORT_SVG), 'Export data']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action',
      type: 'button',
      onclick: function () { doImport(syncStatus); },
    }, [actionIcon(ICON_IMPORT_SVG), 'Import data']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action danger',
      type: 'button',
      onclick: function () { doDeleteAll(); },
    }, [actionIcon(ICON_TRASH_SVG), 'Delete all data']));

    actions.appendChild(h('button', {
      class: 'jqrg-profile-action danger',
      type: 'button',
      onclick: function () {
        Cloud.logout().then(function () {
          onSignedOut();
        });
      },
    }, [actionIcon(ICON_SIGNOUT_SVG), 'Sign out']));

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

  // Track sync-prompt state for this session so we don't re-prompt mid-flow or nest prompts.
  var syncPromptInFlight = false;

  /** Show the "you have local data not synced" prompt inside the open modal's content area.
   *  `onDone(result)` runs after the user has either completed the sync (result === 'pushed'
   *  or 'overwritten'), dismissed it ('skipped'), or cancelled the overwrite warning
   *  ('cancelled'). Must be called with the modal already open. */
  function showSyncPrompt(onDone) {
    if (!modalEl) { if (onDone) onDone('no-modal'); return; }
    var tabsEl = modalEl.querySelector('.jqrg-auth-tabs');
    var content = modalEl.querySelector('.jqrg-auth-content');
    var titleEl = modalEl.querySelector('.jqrg-auth-title');
    if (!content) { if (onDone) onDone('no-content'); return; }
    if (tabsEl) tabsEl.style.display = 'none';
    if (titleEl) titleEl.textContent = 'Sync local data?';
    content.innerHTML = '';

    syncPromptInFlight = true;

    var wrap = h('div', { class: 'jqrg-auth-form' });
    wrap.appendChild(h('div', { class: 'jqrg-confirm-msg' }, [
      'We found ',
      h('span', { class: 'jqrg-confirm-danger' }, 'game save data on this device'),
      ' that hasn\'t been uploaded to your account yet.',
    ]));
    wrap.appendChild(h('div', { class: 'jqrg-confirm-note' }, 'Upload it so your progress follows you to every device you sign in on?'));
    var errBox = h('div', { class: 'jqrg-auth-error' });
    wrap.appendChild(errBox);
    var notNow = h('button', { type: 'button', class: 'jqrg-btn-ghost' }, 'Not now');
    var sync = h('button', { type: 'button', class: 'jqrg-auth-submit' }, 'Sync to my account');
    wrap.appendChild(h('div', { class: 'jqrg-confirm-actions' }, [notNow, sync]));
    content.appendChild(wrap);

    var finish = function (result, summary) {
      syncPromptInFlight = false;
      if (onDone) onDone(result, summary);
    };

    notNow.onclick = function () {
      try { Cloud.skipLocalMigration(); } catch (_) {}
      finish('skipped');
    };

    sync.onclick = function () {
      sync.disabled = true; notNow.disabled = true;
      sync.textContent = 'Checking your account…';
      errBox.textContent = '';
      Cloud.isAccountEmpty().then(function (empty) {
        if (empty) {
          sync.textContent = 'Uploading…';
          return Cloud.pushAllLocal().then(function (summary) { finish('pushed', summary); });
        }
        showOverwriteWarning(finish);
      }).catch(function (err) {
        errBox.textContent = (err && err.message) || 'Sync failed.';
        sync.disabled = false; notNow.disabled = false;
        sync.textContent = 'Sync to my account';
      });
    };
  }

  /** Second-step confirmation shown when the server already has saved data. Replaces the
   *  content pane of the same modal. `onDone('overwritten'|'cancelled')` fires when the user
   *  completes or cancels. */
  function showOverwriteWarning(onDone) {
    if (!modalEl) { if (onDone) onDone('no-modal'); return; }
    var content = modalEl.querySelector('.jqrg-auth-content');
    var titleEl = modalEl.querySelector('.jqrg-auth-title');
    if (!content) { if (onDone) onDone('no-content'); return; }
    if (titleEl) titleEl.textContent = 'Overwrite account data?';
    content.innerHTML = '';

    var wrap = h('div', { class: 'jqrg-auth-form' });
    wrap.appendChild(h('div', { class: 'jqrg-confirm-msg' }, [
      'Your account already has saved data. Continuing will ',
      h('span', { class: 'jqrg-confirm-danger' }, 'overwrite everything currently stored on the account'),
      ' with the data from this device.',
    ]));
    wrap.appendChild(h('div', { class: 'jqrg-confirm-note' }, 'This cannot be undone. Export your account data first from the account page if you want to keep it.'));
    var errBox = h('div', { class: 'jqrg-auth-error' });
    wrap.appendChild(errBox);
    var cancel = h('button', { type: 'button', class: 'jqrg-btn-ghost' }, 'Cancel');
    var proceed = h('button', { type: 'button', class: 'jqrg-btn-danger' }, 'Upload & overwrite');
    wrap.appendChild(h('div', { class: 'jqrg-confirm-actions' }, [cancel, proceed]));
    content.appendChild(wrap);

    cancel.onclick = function () { if (onDone) onDone('cancelled'); };

    proceed.onclick = function () {
      cancel.disabled = true; proceed.disabled = true;
      proceed.textContent = 'Uploading…';
      errBox.textContent = '';
      Cloud.pushAllLocal().then(function (summary) {
        if (onDone) onDone('overwritten', summary);
      }).catch(function (err) {
        errBox.textContent = (err && err.message) || 'Upload failed.';
        cancel.disabled = false; proceed.disabled = false;
        proceed.textContent = 'Upload & overwrite';
      });
    };
  }

  /** Entry point: check whether the signed-in user has unsynced local data and, if so, open
   *  the sync prompt. When finished it restores the profile view. Safe to call whether or
   *  not a modal is already visible. `afterFn` is invoked after the prompt resolves (or
   *  immediately if no prompt is shown). */
  function maybeOfferLocalSync(afterFn) {
    var done = function () { if (afterFn) try { afterFn(); } catch (_) {} };
    if (!Cloud.isLoggedIn()) { done(); return; }
    if (syncPromptInFlight) { done(); return; }
    Cloud.hasUnsyncedLocalData().then(function (has) {
      if (!has) { done(); return; }
      var openedHere = false;
      if (!modalEl) {
        openModal({ skipSyncCheck: true });
        openedHere = true;
      }
      // Defer to the next tick so the modal DOM is present.
      setTimeout(function () {
        showSyncPrompt(function () {
          // After the user is done with the prompt, show the profile view. If we opened
          // the modal ourselves purely for the prompt, leave it open so the user can
          // see the result of their action — they can dismiss with the close button.
          setTab('profile');
          done();
        });
      }, openedHere ? 50 : 0);
    }).catch(function () { done(); });
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
    var tabs = h('div', { class: 'jqrg-auth-tabs' });
    tabs.appendChild(h('button', { type: 'button', class: 'jqrg-auth-tab active', 'data-tab': 'login', onclick: function () { setTab('login'); } }, 'Sign in'));
    tabs.appendChild(h('button', { type: 'button', class: 'jqrg-auth-tab', 'data-tab': 'signup', onclick: function () { setTab('signup'); } }, 'Sign up'));
    body.appendChild(tabs);
    var content = h('div', { class: 'jqrg-auth-content' });
    body.appendChild(content);
    modal.appendChild(body);
    // Now populate the content area via setTab (which uses .jqrg-auth-content).
    // We need the DOM structure in place first.
    overlay.appendChild(modal);
    modalEl = overlay;
    document.body.appendChild(overlay);
    setTab(Cloud.isLoggedIn() ? 'profile' : currentTab);
    requestAnimationFrame(function () { overlay.classList.add('open'); });
    syncModalRequired();
    document.addEventListener('keydown', escHandler);
    // If the user is already signed in and has local data that hasn't been pushed yet,
    // offer to sync it the first time they open the account modal this session.
    if (Cloud.isLoggedIn() && !opts.skipSyncCheck) {
      setTimeout(function () { maybeOfferLocalSync(function () { setTab('profile'); }); }, 50);
    }
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
      // Don't auto-navigate if a sync prompt is (about to be) shown — the caller handles it.
      if (!syncPromptInFlight) {
        setTab(Cloud.isLoggedIn() ? 'profile' : currentTab);
      }
    }
  });

  function maybeGate() {
    if (!shouldGate()) return;
    if (Cloud.isLoggedIn()) return;
    setTimeout(function () {
      if (Cloud.isLoggedIn()) return;
      // If on a sub-page (games/apps/unblocks/contacts hash or a non-index path),
      // redirect to the home page first, then show the required sign-in modal.
      if (isSubPage()) {
        location.hash = '#h';
      }
      if (isOffHomePath()) {
        location.href = '/#h';
        return;
      }
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

    // Intercept the page's navigate() so non-home tabs require sign-in.
    if (typeof window.navigate === 'function') {
      var _origNavigate = window.navigate;
      window.navigate = function (page) {
        if (page !== 'home' && !Cloud.isLoggedIn() && shouldGate()) {
          openModal({ required: true });
          return;
        }
        return _origNavigate.apply(this, arguments);
      };
    }
    // Also intercept openGame so launching games requires sign-in.
    if (typeof window.openGame === 'function') {
      var _origOpenGame = window.openGame;
      window.openGame = function () {
        if (!Cloud.isLoggedIn() && shouldGate()) {
          openModal({ required: true });
          return;
        }
        return _origOpenGame.apply(this, arguments);
      };
    }
    // Intercept proxyNavigate (unblocks URL bar).
    if (typeof window.proxyNavigate === 'function') {
      var _origProxyNavigate = window.proxyNavigate;
      window.proxyNavigate = function () {
        if (!Cloud.isLoggedIn() && shouldGate()) {
          openModal({ required: true });
          return;
        }
        return _origProxyNavigate.apply(this, arguments);
      };
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
