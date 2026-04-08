// ==================== CUSTOM CURSOR MASTER ====================

const cursor = document.getElementById('cursor');

// Hide default cursor
document.documentElement.style.cursor = 'none';
document.body.style.cursor = 'none';

// Make sure cursor doesn't block clicks
cursor.style.pointerEvents = 'none';
cursor.style.position = 'fixed';
cursor.style.zIndex = '999999';
cursor.style.willChange = 'transform, left, top, background-color'; // Better performance

// Main cursor movement (single listener)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Show/hide cursor when mouse enters/leaves window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// Hover effects on interactive elements
const interactiveEls = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost');

interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'var(--accent)';
        cursor.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
    });
});

// Tiny trailing dots (luxury feel) - optimized with requestAnimationFrame
const dots = [];
const DOT_DELAY = 35; // ms between dots

for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.position = 'fixed';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '999998';
    dot.style.willChange = 'left, top, opacity';
    document.body.appendChild(dot);
    dots.push(dot);
}

// Smooth trailing dots
document.addEventListener('mousemove', (e) => {
    dots.forEach((dot, i) => {
        setTimeout(() => {
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
        }, i * DOT_DELAY);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.skill-card, .exp-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
