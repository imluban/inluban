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

// ELITE INTERACTIVE BACKGROUND
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// mouse tracking (with inertia)
let mouse = { x: w / 2, y: h / 2 };
let smooth = { x: w / 2, y: h / 2 };

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// energy nodes
const nodes = [];
const NODE_COUNT = 60;

for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

function animateBG() {
  ctx.clearRect(0, 0, w, h);

  // smooth mouse follow (luxury feel)
  smooth.x += (mouse.x - smooth.x) * 0.08;
  smooth.y += (mouse.y - smooth.y) * 0.08;

  // draw nodes
  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;

    // bounce edges
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;

    // distance to mouse
    const dx = n.x - smooth.x;
    const dy = n.y - smooth.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // attraction field
    if (dist < 200) {
      n.x += dx * 0.002;
      n.y += dy * 0.002;
    }

    // glow intensity based on proximity
    const alpha = 1 - Math.min(dist / 250, 1);

    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.5 + alpha * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,255,71,${0.15 + alpha * 0.4})`;
    ctx.fill();
  });

  // connect nearby nodes (premium web look)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(232,255,71,${0.05 - dist / 3000})`;
        ctx.stroke();
      }
    }
  }

  // central glow (energy core)
  const gradient = ctx.createRadialGradient(
    smooth.x, smooth.y, 0,
    smooth.x, smooth.y, 250
  );

  gradient.addColorStop(0, "rgba(232,255,71,0.15)");
  gradient.addColorStop(1, "rgba(232,255,71,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  requestAnimationFrame(animateBG);
}

animateBG();


// ================= SCROLL BLUR =================
window.addEventListener('scroll', () => {
  const blur = Math.min(window.scrollY / 200, 8);

  document.querySelectorAll('.bg-layer').forEach(layer => {
    layer.style.filter = `blur(${blur}px)`;
  });
});
