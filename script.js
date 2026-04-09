const dot = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Track mouse instantly
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

// Smooth lag for ring (luxury feel)
function animate() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';

  requestAnimationFrame(animate);
}
animate();

// Hover interaction
const hoverEls = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost');

hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// TRAIL SYSTEM
const trails = [];
for (let i = 0; i < 6; i++) {
  const t = document.createElement('div');
  t.className = 'cursor-trail';
  document.body.appendChild(t);
  trails.push(t);
}

document.addEventListener('mousemove', e => {
  trails.forEach((trail, i) => {
    setTimeout(() => {
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.opacity = 1;

      setTimeout(() => {
        trail.style.opacity = 0;
      }, 200);
    }, i * 30);
  });
});

// Hide on leave
document.addEventListener('mouseleave', () => {
  dot.style.opacity = 0;
  ring.style.opacity = 0;
});

document.addEventListener('mouseenter', () => {
  dot.style.opacity = 1;
  ring.style.opacity = 1;
});
