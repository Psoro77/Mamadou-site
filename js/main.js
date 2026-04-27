// ============================
// MS Prestige Auto — Main JS
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // ---- Mobile menu toggle ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuIcon.setAttribute('d', isOpen
            ? 'M4 6h16M4 12h16M4 18h16'
            : 'M6 18L18 6M6 6l12 12'
        );
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });

    // ---- Counter animation ----
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + '+';
                }
            };
            update();
        });
    }

    // ---- Scroll reveal ----
    const revealElements = document.querySelectorAll(
        '#flotte, #services, #apropos, #temoignages, #contact, .car-card, [id="services"] > div > div > div'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counters when stats bar is visible
                if (!countersAnimated && entry.target.closest('.counter')) {
                    countersAnimated = true;
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // Counter observer (separate for stats section)
    const statsSection = document.querySelector('.counter');
    if (statsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(statsSection);
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Contact form (simple feedback) ----
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Message Envoye !';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        form.reset();
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });

});
