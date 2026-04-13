const navLogo = document.getElementById('nav-logo');
const loaderLogo = document.getElementById('loader-logo');

if (navLogo) {
  navLogo.addEventListener('error', () => handleImgError(navLogo, 'LN'));
}

//loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  setTimeout(() => {
    loader.style.opacity = '0';

    //show the page as loader fades out
    document.body.style.opacity = '1';

    setTimeout(() => {
      loader.style.display = 'none';
    }, 1000);

  }, 5600);
});


//scroll progress bar
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollBar.style.width = pct + '%';
}, { passive: true });


//scroll blur
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const blur = Math.min(window.scrollY / 200, 8);
      document.querySelectorAll('.bg-layer').forEach(layer => {
        layer.style.filter = `blur(${blur}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });


//cursor system
const dot = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

//only run cursor system on non-touch devices
if (window.matchMedia('(pointer: fine)').matches && dot && ring) {

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  //hover expand state
  document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  //cursor trials
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
        trail.style.opacity = '0.6';
        //css transition handles the fade out
        setTimeout(() => { trail.style.opacity = '0'; }, 80);
      }, i * 30);
    });
  });
}


//magnetic btn
document.querySelectorAll('.btn-ghost').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0) scale(1)';
  });
});


//scroll reveal
//uses css .reveal / .reveal.visible classes
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


//canvas bg
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let mouse = { x: w / 2, y: h / 2 };
  let smooth = { x: w / 2, y: h / 2 };

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  //60 nodes — O(n²) connection check is ~3500 ops/frame, fine at this count
  const NODE_COUNT = 60;
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));

  function animateBG() {
    ctx.clearRect(0, 0, w, h);

    smooth.x += (mouse.x - smooth.x) * 0.08;
    smooth.y += (mouse.y - smooth.y) * 0.08;

    //update and draw nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      const dx = n.x - smooth.x;
      const dy = n.y - smooth.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        n.x += dx * 0.002;
        n.y += dy * 0.002;
      }

      const alpha = 1 - Math.min(dist / 250, 1);
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.5 + alpha * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,255,71,${0.15 + alpha * 0.4})`;
      ctx.fill();
    });

    //connect nearby nodes
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

    //mouse proximity glow
    const gradient = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 250);
    gradient.addColorStop(0, 'rgba(232,255,71,0.12)');
    gradient.addColorStop(1, 'rgba(232,255,71,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(animateBG);
  }

  animateBG();
}


//smooth nav scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
