document.addEventListener('DOMContentLoaded', () => {
    const navHTML = `
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

    const navs = document.getElementsByTagName('nav');
    const len = navs.length;
    for (let i = 0; i < len; i++) {
        if (navs[i].getAttribute('role') === 'navigation' && navs[i].getAttribute('aria-label') === 'Main navigation') {
            navs[i].innerHTML = navHTML;
        }
    }
});
