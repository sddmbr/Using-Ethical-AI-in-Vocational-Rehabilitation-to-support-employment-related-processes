let searchOptionsMap = null;
let searchInput = null;

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

  if (!searchInput) {
    searchInput = document.getElementById('site-search');
  }

  const input = searchInput.value.toLowerCase();
  const targetHref = searchOptionsMap.get(input);

  if (targetHref) {
    // Navigate (indirected for easier testing)
    globalActions.navigate(targetHref);
  } else {
    alert('Page not found');
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
    __resetSearchInput: () => searchInput = null,
    globalActions // Exported so it can be mocked
  };
}
