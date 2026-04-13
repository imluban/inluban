// ================= LOADER (CLEAN + SYNCED) =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // match your CSS animation timing
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 1s ease";

    document.body.style.opacity = "1";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);

  }, 5200); // matches logo fade-out timing
});


// ================= HOVER SOUND =================
const sound = document.getElementById('hover-sound');

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.volume = 0.2;
    sound.play();
  });
});


// ================= CURSOR SYSTEM =================
const dot = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animate() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';

  requestAnimationFrame(animate);
}
animate();


// hover states
const hoverEls = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost');

hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});


// ================= TRAIL =================
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


// ================= MAGNETIC BUTTON =================
const magnets = document.querySelectorAll('.btn-ghost');

magnets.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x > 0 ? x * 0.6 : x * 0.15;
    const moveY = y > 0 ? y * 0.6 : y * 0.2;

    el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0,0) scale(1)';
  });
});


// ================= NEXT-LEVEL INTERACTIVE BG =================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const spacing = 60;

for (let x = 0; x < canvas.width; x += spacing) {
  for (let y = 0; y < canvas.height; y += spacing) {
    points.push({ x, y });
  }
}

let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(p => {
    const dx = mx - p.x;
    const dy = my - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const force = Math.max(0, 120 - dist);
    const angle = Math.atan2(dy, dx);

    const offsetX = Math.cos(angle) * force * 0.2;
    const offsetY = Math.sin(angle) * force * 0.2;

    ctx.beginPath();
    ctx.arc(p.x - offsetX, p.y - offsetY, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(232,255,71,0.25)";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();


// ================= SCROLL BLUR =================
window.addEventListener('scroll', () => {
  const blur = Math.min(window.scrollY / 200, 8);

  document.querySelectorAll('.bg-layer').forEach(layer => {
    layer.style.filter = `blur(${blur}px)`;
  });
});
