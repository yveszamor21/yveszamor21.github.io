
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  document.documentElement.classList.add('js');
  toggle.hidden = false;
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close menu' : 'Menu';
    links.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  const desktop = window.matchMedia('(min-width: 721px)');
  desktop.addEventListener('change', () => setOpen(false));
})();
