const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

// Cursor hover effects
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
  });
});
