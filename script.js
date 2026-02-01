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

// Add scroll animation for sections
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Track CTA button clicks (optional - for analytics)
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        console.log('CTA clicked:', buttonText);

        // You can add analytics tracking here
        // Example: gtag('event', 'cta_click', { button_name: buttonText });
    });
});

// Add active state to cards on mobile touch
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

// Lazy load background image
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundImage = "url('hero_background.png')";
    }
});
