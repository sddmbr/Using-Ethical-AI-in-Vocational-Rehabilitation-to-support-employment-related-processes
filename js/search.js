let searchOptionsMap = null;

function openPage() {
  if (!searchOptionsMap) {
    searchOptionsMap = new Map();
    const opts = document.getElementById('search-options').options;
    for (const opt of opts) {
      searchOptionsMap.set(opt.value.toLowerCase(), opt.getAttribute('data-href'));
    }
  }

  const input = document.getElementById('site-search').value.toLowerCase();
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
    globalActions // Exported so it can be mocked
  };
}
