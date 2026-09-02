document.addEventListener('DOMContentLoaded',()=>{
  // Scroll reveal
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -48px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Back to top
  const btt=document.getElementById('backToTop');
  if(btt){
    window.addEventListener('scroll',()=>{btt.style.opacity=window.scrollY>600?'1':'0';btt.style.pointerEvents=window.scrollY>600?'auto':'none';},{passive:true});
    btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  // Cookie
  const banner=document.getElementById('cookieBanner');
  if(banner){
    if(!localStorage.getItem('pp_cookies'))banner.style.display='flex';
    ['cookieAccept','cookieDecline'].forEach(id=>{const b=document.getElementById(id);if(b)b.addEventListener('click',()=>{localStorage.setItem('pp_cookies','1');banner.style.display='none';});});
  }

  // Form validation
  const form=document.querySelector('[data-validate]');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();let valid=true;
      form.querySelectorAll('[required]').forEach(field=>{
        const g=field.closest('.form-group');
        const ok=field.type==='checkbox'?field.checked:field.value.trim()!=='';
        if(!ok){g?.classList.add('error');valid=false;}else{g?.classList.remove('error');}
      });
      if(valid){const s=form.querySelector('.form-success');if(s){form.querySelectorAll('.form-group,button[type=submit]').forEach(el=>el.style.display='none');s.style.display='block';}}
    });
    form.querySelectorAll('[required]').forEach(f=>f.addEventListener('input',()=>f.closest('.form-group')?.classList.remove('error')));
  }

  // Project filter
  const filterBtns=document.querySelectorAll('.filter-tab');
  const cards=document.querySelectorAll('[data-sector]');
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const f=btn.dataset.filter;
    cards.forEach(c=>c.toggleAttribute('hidden',f!=='all'&&c.dataset.sector!==f));
  }));
});
