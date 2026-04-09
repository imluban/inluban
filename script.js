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

// Scroll parallax motion
window.addEventListener('scroll', () => {
  const y = window.scrollY;

  document.querySelector('.layer-1').style.transform = `translateY(${y * 0.2}px)`;
  document.querySelector('.layer-2').style.transform = `translateY(${y * 0.1}px)`;
});
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  document.querySelector('.scroll-bar').style.width = progress + '%';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    } else {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(40px)';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16,1,0.3,1)';
  observer.observe(el);
});

