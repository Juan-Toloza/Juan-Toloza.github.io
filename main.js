/* ============================================
   JUAN TOLOZA PORTFOLIO — main.js v2.0
   ============================================ */

// ---- DARK MODE ----
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cargar preferencia guardada
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
    '.section, .skill-card, .project-card, .deco-card, .about-text, .contact-block'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Delay escalonado por elemento
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 60);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ---- NAVBAR: ocultar al hacer scroll rápido hacia abajo ----
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > lastScroll + 5 && current > 80) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
    } else if (current < lastScroll - 5 || current < 80) {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = current;
});

// ---- PROJECT FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Activar botón
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const type = card.dataset.type;
            if (filter === 'all' || type === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}`
                        ? 'var(--text)'
                        : '';
                });
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));