
// small helper
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
const ready = (fn) => { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); };

ready(() => {
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

  // Nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  if (navToggle) navToggle.addEventListener('click', () => document.querySelector('.nav-links')?.classList.toggle('active'));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
        document.querySelector('.nav-links')?.classList.remove('active');
      }
    });
  });

  // Reveal animations
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-float');
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('active'); ro.unobserve(en.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => ro.observe(r));

  // Typing effect
  const typing = document.querySelector('.typing');
  if (typing) {
    const txt = typing.textContent.trim(); typing.textContent = '';
    let i = 0; const t = setInterval(() => { typing.textContent += txt[i++]||''; if (i>=txt.length) clearInterval(t); }, 30);
  }

  // Counters (stats)
  const counters = document.querySelectorAll('.count');
  const co = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting && !ent.target.dataset.started) {
        const el = ent.target; const target = parseInt(el.dataset.count||'0',10);
        let cur = 0; const step = Math.max(1, Math.floor(target/40));
        const it = setInterval(() => { cur+=step; if (cur>=target) { el.textContent = target; clearInterval(it);} else el.textContent = cur; }, 20);
        el.dataset.started = '1'; co.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => co.observe(c));

  // Skills progress
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.progress span');
  const skillPercents = document.querySelectorAll('.skill-percent');
  if (skillsSection && skillBars.length) {
    const pObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillBars.forEach((bar, idx) => {
          const pct = parseInt(bar.dataset.percent||'0',10);
          bar.style.width = pct + '%';
          if (skillPercents[idx]) {
            let count=0; const target=parseInt(skillPercents[idx].dataset.count||pct,10);
            const step=Math.max(1,Math.floor(target/40));
            const inter=setInterval(()=>{ count+=step; if(count>=target){ skillPercents[idx].textContent = target+'%'; clearInterval(inter);} else skillPercents[idx].textContent = count+'%'; },30);
          }
        });
        pObs.unobserve(skillsSection);
      }
    }, { threshold: 0.35 });
    pObs.observe(skillsSection);
  }

  // Portfolio filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      card.style.display = (f==='all' || card.dataset.category===f) ? 'block' : 'none';
    });
  }));

  // Ripple effect
  document.querySelectorAll('.ripple').forEach(btn=>btn.addEventListener('click', function(e){
    const circle = document.createElement('span'); circle.className='ripple-circle';
    const rect = this.getBoundingClientRect(); const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size+'px';
    circle.style.left = (e.clientX - rect.left - size/2)+'px';
    circle.style.top = (e.clientY - rect.top - size/2)+'px';
    this.appendChild(circle); setTimeout(()=>circle.remove(),600);
  }));

  // Set year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
});
