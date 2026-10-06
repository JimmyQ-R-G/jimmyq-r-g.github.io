/* Apply the saved theme family and variant before each first-party page paints. */
(function () {
  var root = document.documentElement;
  var themes = [
    'study', 'study-library', 'study-campus', 'study-lab', 'study-notebook', 'study-graphite',
    'jimmyqrg', 'jimmyqrg-solar', 'jimmyqrg-verdant'
  ];
  var theme = 'study';
  try {
    var params = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    var device = params.get('jqrg-theme-device');
    var incoming = params.get('jqrg-theme');
    if (incoming === 'simple') incoming = 'study-lab';
    if (incoming === 'comic') incoming = 'jimmyqrg-solar';
    if (/^[a-f0-9]{48}$/i.test(device || '')) {
      localStorage.setItem('jqrgThemeDeviceV1', device);
      localStorage.setItem('jqrgThemeDevicePairedV1', '1');
      if (themes.indexOf(incoming) >= 0) {
        localStorage.setItem('jqrgTheme', incoming);
        localStorage.setItem('jqrgThemeUpdatedV1', String(Date.now()));
      }
    }
    if (params.has('jqrg-theme-device') || params.has('jqrg-theme')) {
      params.delete('jqrg-theme-device');
      params.delete('jqrg-theme');
      history.replaceState(null, '', location.pathname + location.search + (params.toString() ? '#' + params.toString() : ''));
    }
    theme = localStorage.getItem('jqrgTheme') || 'study';
    if (theme === 'simple') theme = 'study-lab';
    if (theme === 'comic') theme = 'jimmyqrg-solar';
    if (themes.indexOf(theme) < 0) theme = 'study';
  } catch (_) {}
  root.setAttribute('data-theme', theme.indexOf('study') === 0 ? 'study' : 'jimmyqrg');
  root.setAttribute('data-theme-variant', theme);
  try {
    if (document.currentScript && document.currentScript.hasAttribute('data-jqrg-shell')) {
      root.setAttribute('data-jqrg-shell', '1');
    }
  } catch (_) {}
})();
