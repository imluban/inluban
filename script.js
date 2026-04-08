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

// Tiny trailing dots (optional for luxury feel)
const dots = [];
for (let i=0; i<5; i++) {
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
    }, i*40);
  });
});
