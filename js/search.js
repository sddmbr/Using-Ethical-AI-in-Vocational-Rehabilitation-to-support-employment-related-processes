let searchOptionsMap = null;

function openPage() {
  if (!searchOptionsMap) {
    searchOptionsMap = new Map();
    const opts = document.getElementById('search-options').options;
    const len = opts.length;
    for (let i = 0; i < len; i++) {
      const opt = opts[i];
      searchOptionsMap.set(opt.value.toLowerCase(), opt.getAttribute('data-href'));
    }
  }

  const input = document.getElementById('site-search').value.toLowerCase();
  const targetHref = searchOptionsMap.get(input);

  const errorEl = document.getElementById('search-error');

  if (targetHref) {
    if (errorEl) errorEl.hidden = true;
    // Navigate (indirected for easier testing)
    globalActions.navigate(targetHref);
  } else {
    if (errorEl) errorEl.hidden = false;
  }
}

// Separate navigation logic to easily mock it in tests
const globalActions = {
  navigate: (url) => {
    window.location.href = url;
  }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    openPage,
    __resetSearchOptionsMap: () => searchOptionsMap = null,
    globalActions // Exported so it can be mocked
  };
}
