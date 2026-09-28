/* Motor copiado literal del prompt "Hero de partículas D&A Lab". No editar. */
/* ============ D&A HERO — JS (copiar tal cual) ============ */
(function (global) {
  'use strict';

  var T_SCATTER = 900;
  var T_WORD = 1900;
  var STORAGE_KEY = 'dya-hero-played';
  var SAGE = '#8FB3A0';
  var GRAY = '#A8A49B';
  var GRAY_LIGHT = '#CBC6BB';

  var ICONS = {
    search: '<circle cx="10" cy="10" r="7"/><path d="M21 21l-6-6"/>',
    layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
    chat: '<path d="M3 20l1.3-3.9A9 8 0 1 1 7.7 19L3 20"/>',
    palette: '<path d="M12 21a9 9 0 0 1 0-18c4.97 0 9 3.6 9 8a4 4 0 0 1-4 4h-2.5a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21"/><path d="M7.5 10.5h.01M12 7.5h.01M16.5 10.5h.01"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18"/>',
    eye: '<path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6"/>',
    repeat: '<path d="M4 12V9a3 3 0 0 1 3-3h13l-3-3m3 3l-3 3"/><path d="M20 12v3a3 3 0 0 1-3 3H4l3 3m-3-3l3-3"/>',
    receipt: '<path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2"/><path d="M9 7h6M9 11h6M13 15h2"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"/>',
    pin: '<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/><path d="M17.66 16.66L13.41 20.9a2 2 0 0 1-2.83 0l-4.24-4.24a8 8 0 1 1 11.32 0z"/>',
    invoice: '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 13h6M9 17h4"/>',
    plane: '<path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7H9l2-7H7l-2 2H2l2-4-2-4h3l2 2h4L9 3h3z"/>'
  };

  var STORIES = {
    sueno: {
      words: [
        { text: '¿solo\nInstagram?', style: 'gray', burst: true },
        { text: 'la web que\nsoñaste.', style: 'accent' }
      ],
      line: 'Instagram te da seguidores. Una web te da clientes.',
      cta: 'Quiero mi web',
      counter: 'clientes nuevos',
      notes: [
        ['search', 'Te encontraron en Google', 'Búsqueda: “cerca de mí”'],
        ['layout', 'Tu web está en línea', 'Diseñada a tu medida'],
        ['chat', 'Nuevo pedido', 'Llegó armado a tu WhatsApp']
      ]
    },
    plantilla: {
      words: [
        { text: 'plantilla', style: 'gray', burst: true },
        { text: 'a tu medida.', style: 'accent' }
      ],
      line: 'No partimos de una plantilla. Partimos de cómo vendes tú.',
      cta: 'Cuéntanos qué vendes',
      counter: 'proyectos',
      notes: [
        ['palette', 'Dirección visual aprobada', 'Colores y tipografías'],
        ['check', 'Logo entregado', '3 versiones listas'],
        ['globe', 'Sitio publicado', 'En tu dominio, a tu nombre']
      ]
    },
    viaje: {
      words: [
        { text: 'te ven', style: 'green' },
        { text: 'te recuerdan', style: 'green' },
        { text: 'te compran.', style: 'accent' }
      ],
      line: 'Una marca para que te recuerden. Una web para que te compren.',
      cta: 'Hablemos',
      counter: 'ventas hoy',
      notes: [
        ['eye', 'Nueva visita', 'Desde Google Maps'],
        ['repeat', 'Volvió a entrar', 'Tercera visita'],
        ['receipt', 'Compra confirmada', '$48 · Pago Móvil']
      ]
    },
    chat: {
      words: [
        { text: '¿precio?', style: 'green' },
        { text: '¿delivery?', style: 'green' },
        { text: '¡pedido!', style: 'accent' }
      ],
      line: 'Tu web responde lo que preguntan, antes de que escriban.',
      cta: 'Quiero vender así',
      counter: 'pedidos hoy',
      notes: [
        ['list', 'Catálogo con precios', 'Sin “precio al DM”'],
        ['pin', 'Zona de delivery', 'Confirmada al instante'],
        ['chat', 'Pedido armado', 'Llegó listo a tu WhatsApp']
      ]
    },
    mundo: {
      words: [
        { text: 'Venezuela', style: 'green' },
        { text: 'el mundo.', style: 'accent' }
      ],
      line: 'Webs que venden desde Venezuela, a quien sea y donde sea.',
      cta: 'Hablemos',
      counter: 'mercados',
      notes: [
        ['invoice', 'Cotización recibida', 'Distribuidor · España'],
        ['globe', 'Sitio bilingüe', 'Español e inglés'],
        ['plane', 'Pedido internacional', 'Miami · 2 contenedores']
      ]
    }
  };

  var UTM_MAP = { instagram: 'sueno', ig: 'sueno', facebook: 'sueno', fb: 'sueno', meta: 'sueno', google: 'viaje' };

  function pickStory(explicit) {
    var key = explicit && explicit !== 'auto' ? explicit : null;
    try {
      var q = new URLSearchParams(global.location.search);
      var forced = q.get('historia');
      if (forced && STORIES[forced]) return STORIES[forced];
      var utm = (q.get('utm_source') || '').toLowerCase();
      if (!key && UTM_MAP[utm]) key = UTM_MAP[utm];
    } catch (e) {}
    return STORIES[key] || STORIES.sueno;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function sampleText(text, W, H, family, step, cap) {
    var lines = text.split('\n');
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var c = off.getContext('2d');
    var size = Math.min(128, (H * 0.42) / (lines.length * 1.02));
    c.font = '800 ' + size + 'px ' + family;
    var maxW = 0;
    for (var i = 0; i < lines.length; i++) maxW = Math.max(maxW, c.measureText(lines[i]).width);
    if (maxW > W * 0.86) {
      size = size * (W * 0.86) / maxW;
      c.font = '800 ' + size + 'px ' + family;
    }
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = '#000';
    var lh = size * 1.02;
    var y0 = H * 0.5 - ((lines.length - 1) * lh) / 2;
    for (var k = 0; k < lines.length; k++) c.fillText(lines[k], W / 2, y0 + k * lh);
    var data = c.getImageData(0, 0, W, H).data;
    var pts = [];
    for (var y = 0; y < H; y += step) {
      for (var x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
      }
    }
    if (!pts.length) pts.push([W / 2, H / 2]);
    shuffle(pts);
    if (pts.length > cap) pts.length = cap;
    return pts;
  }

  function initDyaHero(root, options) {
    if (!root) return function () {};
    if (root.__dyaHero) return root.__dyaHero;
    options = options || {};

    var canvas = root.querySelector('[data-dya-canvas]');
    var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    if (!ctx) return function () {};

    var story = pickStory(options.story || root.getAttribute('data-story'));
    var words = story.words;
    var N = words.length;
    var tLast = T_SCATTER + (N - 1) * T_WORD;
    var tEnd = tLast + 3200;

    var reduce = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var played = false;
    try { played = global.sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
    var skip = reduce || played || options.skipIntro === true;

    var elLine = root.querySelector('[data-dya-line]');
    var elCta = root.querySelector('[data-dya-cta]');
    var elCtaWrap = root.querySelector('[data-dya-cta-wrap]');
    var elCount = root.querySelector('[data-dya-count]');
    var elCountLabel = root.querySelector('[data-dya-count-label]');
    var elCountNum = root.querySelector('[data-dya-count-num]');
    var elFallback = root.querySelector('[data-dya-fallback]');
    var notes = root.querySelectorAll('[data-dya-note]');

    if (elLine) elLine.textContent = story.line;
    if (elCta) elCta.textContent = story.cta;
    if (elCountLabel) elCountLabel.textContent = story.counter;
    if (elCountNum) elCountNum.textContent = '0';
    if (elFallback) elFallback.textContent = words[N - 1].text;
    for (var n = 0; n < notes.length; n++) {
      var data = story.notes[n];
      if (!data) continue;
      notes[n].innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[data[0]] || '') + '</svg><div><strong></strong><span></span></div>';
      notes[n].querySelector('strong').textContent = data[1];
      notes[n].querySelector('span').textContent = data[2];
    }

    var cs = global.getComputedStyle(root);
    var GREEN = (cs.getPropertyValue('--dya-green') || '').trim() || '#1F4D38';
    var ACCENT = (cs.getPropertyValue('--dya-accent') || '').trim() || '#B34A2E';
    var family = elFallback ? global.getComputedStyle(elFallback).fontFamily : 'Montserrat, system-ui, sans-serif';

    root.classList.add('dya-hero--js');

    var events = [
      { at: tLast + 300, el: elLine },
      { at: tLast + 700, el: elCtaWrap },
      { at: tLast + 1200, el: elCount },
      { at: tLast + 1500, el: notes[0], count: 1 },
      { at: tLast + 2200, el: notes[1], count: 2 },
      { at: tLast + 2900, el: notes[2], count: 3 }
    ];

    var W = 0, H = 0, P = [], start = 0, raf = 0;
    var running = false, visible = true, pausedAt = 0, ready = false, destroyed = false, markedPlayed = false;
    var mx = -9999, my = -9999, resizeTimer = 0, touchTimer = 0;

    function fire(ev) {
      ev.done = true;
      if (ev.el) ev.el.classList.add('is-on');
      if (ev.count && elCountNum) elCountNum.textContent = String(ev.count);
    }

    function colorFor(p, style) {
      if (style === 'gray') return p.sh < 0.3 ? GRAY_LIGHT : GRAY;
      if (style === 'accent') return p.sh < 0.85 ? ACCENT : GREEN;
      return p.sh < 0.18 ? SAGE : GREEN;
    }

    function build() {
      var rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var mobile = W < 720;
      var step = mobile ? 3 : 5;
      var cap = mobile ? 1400 : 2000;
      var targets = [];
      var count = 0;
      for (var w = 0; w < N; w++) {
        targets.push(sampleText(words[w].text, W, H, family, step, cap));
        count = Math.max(count, targets[w].length);
      }
      var old = P;
      P = new Array(count);
      for (var i = 0; i < count; i++) {
        var prev = old[i];
        var hx = Math.random() * W, hy = Math.random() * H;
        var tg = [];
        for (var t = 0; t < N; t++) tg.push(targets[t][i % targets[t].length]);
        P[i] = {
          x: prev ? prev.x : hx, y: prev ? prev.y : hy, vx: 0, vy: 0, hx: hx, hy: hy,
          tg: tg, d: Math.random() * 600,
          g: Math.random() < 0.07 ? (Math.random() < 0.5 ? '‹' : '›') : null,
          sh: Math.random(), lk: prev ? prev.lk : -1, bt: -1e9, i: i
        };
      }
    }

    function snapToFinal() {
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        p.x = p.tg[N - 1][0]; p.y = p.tg[N - 1][1];
        p.vx = 0; p.vy = 0; p.lk = N - 1;
      }
    }

    function draw(now) {
      var t = now - start;
      for (var e = 0; e < events.length; e++) if (!events[e].done && t >= events[e].at) fire(events[e]);
      if (!markedPlayed && t >= tLast) {
        markedPlayed = true;
        try { global.sessionStorage.setItem(STORAGE_KEY, '1'); } catch (err) {}
      }

      ctx.clearRect(0, 0, W, H);
      ctx.font = '500 11px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      var k = t < T_SCATTER ? -1 : Math.min(Math.floor((t - T_SCATTER) / T_WORD), N - 1);
      var ps = k < 0 ? 0 : T_SCATTER + k * T_WORD;
      var l = t - ps;

      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        var kk = (k >= 0 && l < p.d * (k === 0 ? 1 : 0.5)) ? k - 1 : k;

        if (kk !== p.lk) {
          if (p.lk >= 0 && kk > p.lk && words[p.lk].burst) {
            var ang = Math.random() * Math.PI * 2;
            var force = 10 + Math.random() * 16;
            p.vx += Math.cos(ang) * force;
            p.vy += Math.sin(ang) * force;
            p.bt = t;
          }
          p.lk = kk;
        }

        var tx, ty, col;
        if (kk < 0) {
          tx = p.hx + Math.sin(t / 700 + p.i) * 10;
          ty = p.hy + Math.cos(t / 800 + p.i) * 10;
          col = p.sh < 0.18 ? SAGE : GREEN;
        } else {
          tx = p.tg[kk][0];
          ty = p.tg[kk][1];
          col = colorFor(p, words[kk].style);
          if (kk === N - 1 && t > tLast + 1300 && !reduce) {
            tx += Math.sin(t / 650 + p.i) * 0.9;
            ty += Math.cos(t / 720 + p.i) * 0.9;
          }
          if (words[kk].style === 'gray' && kk === k && kk < N - 1 && l > 900) {
            var j = l > 1500 ? 5 : 1.5;
            tx += (Math.random() - 0.5) * j;
            ty += (Math.random() - 0.5) * j * 0.4;
          }
        }

        var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 4200) {
          var dist = Math.sqrt(d2) || 1;
          var f = ((4200 - d2) / 4200) * 5;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        var bursting = t - p.bt < 420;
        var spring = bursting ? 0.012 : 0.065;
        var friction = bursting ? 0.9 : 0.8;
        p.vx = (p.vx + (tx - p.x) * spring) * friction;
        p.vy = (p.vy + (ty - p.y) * spring) * friction;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = col;
        if (p.g) {
          ctx.fillText(p.g, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function loop(now) {
      raf = 0;
      if (!running) return;
      draw(now);
      if (running) raf = global.requestAnimationFrame(loop);
    }

    function update() {
      if (!ready || destroyed) return;
      if (reduce) return;
      var shouldRun = visible && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        if (pausedAt) { start += global.performance.now() - pausedAt; pausedAt = 0; }
        raf = global.requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        if (raf) global.cancelAnimationFrame(raf);
        raf = 0;
        pausedAt = global.performance.now();
      }
    }

    function onResize() {
      global.clearTimeout(resizeTimer);
      resizeTimer = global.setTimeout(function () {
        if (!ready || destroyed) return;
        var rect = canvas.getBoundingClientRect();
        if (Math.round(rect.width) === W && Math.round(rect.height) === H) return;
        build();
        if (reduce) { snapToFinal(); draw(global.performance.now()); }
      }, 150);
    }

    function onPointerMove(e) {
      var rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      if (e.pointerType && e.pointerType !== 'mouse') {
        global.clearTimeout(touchTimer);
        touchTimer = global.setTimeout(function () { mx = -9999; my = -9999; }, 350);
      }
    }
    function onPointerLeave() { mx = -9999; my = -9999; }
    function onVisibility() { update(); }

    var io = null, ro = null;

    function begin() {
      if (destroyed) return;
      build();
      start = global.performance.now();
      if (skip) {
        start -= tEnd + 1000;
        snapToFinal();
        for (var e = 0; e < events.length; e++) fire(events[e]);
        markedPlayed = true;
      }
      ready = true;

      if (reduce) {
        draw(global.performance.now());
      } else {
        root.addEventListener('pointermove', onPointerMove, { passive: true });
        root.addEventListener('pointerdown', onPointerMove, { passive: true });
        root.addEventListener('pointerleave', onPointerLeave);
        document.addEventListener('visibilitychange', onVisibility);
        if ('IntersectionObserver' in global) {
          io = new IntersectionObserver(function (entries) {
            visible = entries[0] ? entries[0].isIntersecting : true;
            update();
          }, { threshold: 0.01 });
          io.observe(root);
        }
      }

      if ('ResizeObserver' in global) {
        ro = new ResizeObserver(onResize);
        ro.observe(canvas);
      } else {
        global.addEventListener('resize', onResize);
      }
      update();
    }

    var fontReady = Promise.resolve();
    if (document.fonts && document.fonts.load) {
      fontReady = Promise.all([
        document.fonts.load('800 100px ' + family),
        document.fonts.load('500 11px "JetBrains Mono"')
      ]).catch(function () {});
    }
    Promise.race([fontReady, new Promise(function (r) { global.setTimeout(r, 2500); })]).then(begin);

    function destroy() {
      destroyed = true;
      running = false;
      if (raf) global.cancelAnimationFrame(raf);
      global.clearTimeout(resizeTimer);
      global.clearTimeout(touchTimer);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerdown', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      global.removeEventListener('resize', onResize);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      root.__dyaHero = null;
    }

    root.__dyaHero = destroy;
    return destroy;
  }

  global.initDyaHero = initDyaHero;
  global.DYA_HERO_STORIES = STORIES;

  function autoInit() {
    var roots = document.querySelectorAll('[data-dya-hero]:not([data-dya-manual])');
    for (var i = 0; i < roots.length; i++) initDyaHero(roots[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
})(window);
/* ============ FIN JS ============ */
