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
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;

  const hero = document.querySelector('.hero-name');
  hero.style.transform = `scale(${1 + scroll * 0.0003})`;
  hero.style.opacity = `${1 - scroll * 0.0015}`;
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

// magnetic button system
const magnets = document.querySelectorAll('.btn-ghost');

magnets.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0,0) scale(1)';
  });
});

// particle system
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(128,128,128,0.1)';
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// depth blur on scroll
window.addEventListener('scroll', () => {
  const blur = Math.min(window.scrollY / 200, 8);

  document.querySelectorAll('.bg-layer').forEach(layer => {
    layer.style.filter = `blur(${blur}px)`;
  });
});
