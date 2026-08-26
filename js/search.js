let searchOptionsMap = null;

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      openPage();
    });
  }
});

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
