(function () {
  // Калкулатор
  var form = document.getElementById('calcForm');
  var ngr = document.getElementById('ngr'), rate = document.getElementById('rate');
  var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €'; };
  function update() {
    var m = ngr.value * rate.value / 100;
    document.getElementById('ngrOut').textContent = fmt(ngr.value);
    document.getElementById('rateOut').textContent = rate.value + '%';
    document.getElementById('monthly').textContent = fmt(m);
    document.getElementById('yearly').textContent = fmt(m * 12);
  }
  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    ngr.addEventListener('input', update);
    rate.addEventListener('input', update);
    update();
  }

  // само един отворен въпрос (за браузъри без поддръжка на <details name>)
  var qs = document.querySelectorAll('.qa');
  qs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) qs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  // Мобилно меню
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Затвори менюто' : 'Меню');
    nav.classList.toggle('is-open', open);
  }
  btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !e.target.closest('.header')) setOpen(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
})();
