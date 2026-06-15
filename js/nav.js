document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav[role="navigation"]');
    if (!nav) return;

    nav.innerHTML = `
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
});
