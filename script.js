const cursor = document.getElementById('cursor');

// Move cursor
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Show / hide when leaving window
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

// Hover effects
const interactiveEls = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost');

interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.backgroundColor = 'var(--accent)';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = 'transparent';
  });
});

// Trailing dots
const dots = [];
for (let i = 0; i < 5; i++) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  dots.push(dot);
}

document.addEventListener('mousemove', e => {
  let x = e.clientX, y = e.clientY;

  dots.forEach((dot, i) => {
    setTimeout(() => {
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
    }, i * 40);
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// Reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .exp-item, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
