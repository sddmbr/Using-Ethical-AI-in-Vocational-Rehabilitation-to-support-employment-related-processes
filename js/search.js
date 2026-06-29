let searchOptionsMap = null;

const ALLOWED_PAGES = [
  'intro.html',
  'ethics.html',
  'accessibility.html',
  'case-studies.html',
  'policy.html',
  'technical.html',
  'community.html',
  'ethical-ai-documentation.html',
  'chatgpt.html'
];

window.openPage = function() {
  if (!searchOptionsMap) {
    searchOptionsMap = new Map();
    const opts = document.getElementById('search-options').options;
    const len = opts.length;
    for (let i = 0; i < len; i++) {
      const opt = opts[i];
      // Use getAttribute per performance coding conventions
      searchOptionsMap.set(opt.value.toLowerCase(), opt.getAttribute('data-href'));
    }
  }

  const input = document.getElementById('site-search').value.toLowerCase();
  const targetHref = searchOptionsMap.get(input);

  if (targetHref && ALLOWED_PAGES.includes(targetHref)) {
    window.location.href = targetHref;
  } else {
    alert('Page not found');
  }
};
