(function() {
  try {
    var savedTheme = localStorage.getItem('eclavin-theme');
    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var initialTheme = savedTheme || systemTheme;
    document.documentElement.setAttribute('data-theme', initialTheme);
  } catch (e) {
    console.warn('Theme init error', e);
  }
})();
