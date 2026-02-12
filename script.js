// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Counter animation
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number[data-target]');
            counters.forEach(counter => {
                if (!counter.dataset.animated) {
                    counter.dataset.animated = 'true';
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Sticky CTA visibility
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.querySelector('.hero');

if (stickyCta && heroSection) {
    const stickyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyCta.classList.remove('visible');
            } else {
                stickyCta.classList.add('visible');
            }
        });
    }, { threshold: 0 });

    stickyObserver.observe(heroSection);
}

// Track CTA button clicks
document.querySelectorAll('.cta-button, .sticky-cta-button').forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        console.log('CTA clicked:', buttonText);
    });
});

// Touch feedback on mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.channel-card, .content-card, .social-card').forEach(card => {
        card.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });
        card.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    });
}
