// CURSOR
const cursor = document.getElementById('cursor');
if (cursor) {
  const interactiveEls = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost');

  let mouseX = 0, mouseY = 0;

  // Cursor position
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

  // Hover effects
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.backgroundColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'transparent';
    });
  });

  // Tiny trailing dots
  const dots = [];
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    dots.push(dot);
  }

  const animateDots = () => {
    dots.forEach((dot, i) => {
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });
    requestAnimationFrame(animateDots);
  };
  requestAnimationFrame(animateDots);
}

// SMOOTH SCROLL FOR ANCHORS
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// SCROLL ANIMATION
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
