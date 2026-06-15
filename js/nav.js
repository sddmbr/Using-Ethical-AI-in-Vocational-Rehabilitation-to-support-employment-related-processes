document.addEventListener('DOMContentLoaded', () => {
  const navContent = `
        <a href="index.html">Home</a>
        <a href="intro.html">Introduction</a>
        <a href="ethics.html">Ethical Principles</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="case-studies.html">Case Studies</a>
        <a href="policy.html">Policy & Legal</a>
        <a href="technical.html">Technical Guidance</a>
        <a href="community.html">Community</a>
        <a href="ethical-ai-documentation.html">AI Documentation</a>
        <a href="chatgpt.html">ChatGPT Guide</a>
  `;

  const navElement = document.querySelector('nav[role="navigation"]');
  if (navElement) {
    navElement.innerHTML = navContent;

    // Highlight the active page
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') {
      currentPath = 'index.html';
    }

    const links = navElement.getElementsByTagName('a');
    const linksLength = links.length;
    for (let i = 0; i < linksLength; i++) {
      const link = links[i];
      if (link.getAttribute('href') === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      }
    }
  }
});
