document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav[role="navigation"]');
    if (!nav) return;

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

    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '') {
        currentPath = 'index.html';
    }

    const fragment = document.createDocumentFragment();

    navLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;

        if (currentPath === link.href) {
            a.setAttribute('aria-current', 'page');
            a.classList.add('active');
        }

        fragment.appendChild(a);
    });

    nav.innerHTML = '';
    nav.appendChild(fragment);
});
