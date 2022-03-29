// This code assumes a Light Mode default
if (
    /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
    localStorage.getItem('color-mode') === 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
     !localStorage.getItem('color-mode'))
  ) {
    // if true, set the site to Dark Mode
    document.documentElement.setAttribute('color-mode', 'dark')
  }