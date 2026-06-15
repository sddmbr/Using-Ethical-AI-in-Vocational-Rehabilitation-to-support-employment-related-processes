document.addEventListener('DOMContentLoaded', () => {
    const navLinks = [
        { href: 'index.html', text: 'Home' },
        { href: 'intro.html', text: 'Introduction' },
        { href: 'ethics.html', text: 'Ethical Principles' },
        { href: 'accessibility.html', text: 'Accessibility' },
        { href: 'case-studies.html', text: 'Case Studies' },
        { href: 'policy.html', text: 'Policy & Legal' },
        { href: 'technical.html', text: 'Technical Guidance' },
        { href: 'community.html', text: 'Community' },
        { href: 'ethical-ai-documentation.html', text: 'AI Documentation' },
        { href: 'chatgpt.html', text: 'ChatGPT Guide' }
    ];

    const nav = document.querySelector('nav[role="navigation"]');
    if (nav) {
        nav.innerHTML = navLinks.map(link =>
            `<a href="${link.href}">${link.text}</a>`
        ).join('\n        ');
    }
});
