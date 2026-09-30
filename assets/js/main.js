/* ═══════════════════════════════════════════════════════════════════════
   THE CHURCH OF THE ANALYSED · rites and mechanisms
   Plain script, no modules: the whole site works from file:// as well
   as from a server.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────────
     1 · THE RED CROWN: its eye follows the cursor
     ───────────────────────────────────────────────────────────── */
  (function crownEye() {
    var pupil = $('#pupil');
    var crown = $('.crown');
    if (!pupil || !crown || reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    var MAX = 8.5;

    function frame() {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      pupil.setAttribute('transform', 'translate(' + cx.toFixed(2) + ' ' + cy.toFixed(2) + ')');
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

    window.addEventListener('pointermove', function (e) {
      var r = crown.getBoundingClientRect();
      if (!r.width) return;
      var ox = (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9);
      var oy = (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9);
      tx = Math.max(-1, Math.min(1, ox)) * MAX;
      ty = Math.max(-1, Math.min(1, oy)) * MAX;
      kick();
    }, { passive: true });

    // It also glances at whatever you focus. The Lamb is watching.
    window.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
    window.addEventListener('blur', function () { tx = 0; ty = 0; kick(); });
  })();

  /* ─────────────────────────────────────────────────────────────
     2 · EMBERS: drifting up the hero
     ───────────────────────────────────────────────────────────── */
  (function embers() {
    var host = $('#embers');
    if (!host || reduced) return;
    var n = window.innerWidth < 700 ? 12 : 26;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var s = document.createElement('span');
      s.className = 'ember' + (i % 4 === 0 ? ' ember--gold' : '');
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (9 + Math.random() * 13) + 's';
      s.style.animationDelay = (-Math.random() * 20) + 's';
      var sc = 0.5 + Math.random() * 1.1;
      s.style.width = s.style.height = (5 * sc).toFixed(1) + 'px';
      frag.appendChild(s);
    }
    host.appendChild(frag);
  })();

  /* ─────────────────────────────────────────────────────────────
     3 · THE RITUAL SOUND (off by default, opt-in)
     ───────────────────────────────────────────────────────────── */
  var sound = (function () {
    var on = false, ctx = null;

    function ac() {
      if (!ctx) {
        var C = window.AudioContext || window.webkitAudioContext;
        if (!C) return null;
        ctx = new C();
      }
      if (ctx.state === 'suspended') {
        // resume() rejects when the browser won't allow audio yet; swallow it
        // rather than leaving an unhandled rejection in the console.
        var p = ctx.resume();
        if (p && p.catch) p.catch(function () {});
      }
      return ctx;
    }

    function tone(freq, dur, type, vol, delay) {
      var a = ac(); if (!a) return;
      // A suspended context has a frozen clock, so scheduling against it would
      // bank every tone and dump them all at once on the first resume.
      if (a.state !== 'running') return;
      var t = a.currentTime + (delay || 0);
      var o = a.createOscillator();
      var g = a.createGain();
      o.type = type || 'triangle';
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.05, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(a.destination);
      o.start(t); o.stop(t + dur + 0.03);
    }

    return {
      isOn: function () { return on; },
      toggle: function () { on = !on; if (on) ac(); return on; },
      // a low ceremonial knock
      knock: function () { if (!on) return; tone(150, 0.16, 'triangle', 0.07); tone(96, 0.26, 'sine', 0.05, 0.012); },
      // flipping a card
      turn:  function () { if (!on) return; tone(392, 0.13, 'triangle', 0.045); tone(587, 0.2, 'sine', 0.035, 0.06); },
      // a small bell
      chime: function () { if (!on) return; tone(784, 0.5, 'sine', 0.06); tone(1175, 0.7, 'sine', 0.03, 0.05); tone(523, 0.9, 'sine', 0.035, 0.1); },
      hop:   function () { if (!on) return; tone(660 + Math.random() * 240, 0.1, 'sine', 0.035); }
    };
  })();

  var soundTog = $('#soundTog');
  if (soundTog) {
    soundTog.addEventListener('click', function () {
      var on = sound.toggle();
      soundTog.setAttribute('aria-pressed', String(on));
      soundTog.title = on ? 'Ritual sound: on' : 'Ritual sound: off';
      if (on) sound.chime();
    });
  }

  /* ─────────────────────────────────────────────────────────────
     4 · INK BURST: a small spray of blood and gold on click
     ───────────────────────────────────────────────────────────── */
  function burst(x, y) {
    if (reduced) return;
    var n = 12;
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span');
      p.className = 'burst' + (i % 3 === 0 ? ' burst--gold' : '');
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.opacity = '1';
      document.body.appendChild(p);

      var ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      var dist = 34 + Math.random() * 74;
      var dx = Math.cos(ang) * dist;
      var dy = Math.sin(ang) * dist;

      p.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: 'translate(' + (dx - 50) + '% , ' + (dy + 40) + '%) scale(.2)', opacity: 0 }
        ],
        { duration: 460 + Math.random() * 380, easing: 'cubic-bezier(.2,.7,.3,1)' }
      ).onfinish = (function (el) { return function () { el.remove(); }; })(p);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     5 · SCROLL REVEALS
     ───────────────────────────────────────────────────────────── */
  (function reveals() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ─────────────────────────────────────────────────────────────
     6 · STAT PLATES: count up
     ───────────────────────────────────────────────────────────── */
  (function counters() {
    var nums = $$('.plate__n');
    if (!nums.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reduced) { el.textContent = String(target).padStart(2, '0'); return; }
      var start = null, dur = 1500;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased)).padStart(2, '0');
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ─────────────────────────────────────────────────────────────
     7 · TONGUES: fill the bars when they scroll into view
     ───────────────────────────────────────────────────────────── */
  (function tongues() {
    var box = $('.tongues');
    if (!box) return;
    if (reduced || !('IntersectionObserver' in window)) { box.classList.add('is-lit'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { box.classList.add('is-lit'); io.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    io.observe(box);
  })();

  /* ─────────────────────────────────────────────────────────────
     8 · NAV: progress, stuck state, active chapter
     ───────────────────────────────────────────────────────────── */
  var nav = $('#nav');
  var navProgress = $('#navProgress');
  var railFill = $('#railFill');

  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? Math.min(h.scrollTop / max, 1) : 0;
    if (navProgress) navProgress.style.width = (p * 100) + '%';
    if (railFill) railFill.style.height = (p * 100) + '%';
    if (nav) nav.classList.toggle('is-stuck', h.scrollTop > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  (function chapters() {
    var sections = $$('[data-chapter]');
    var navLinks = $$('.nav__links a');
    var railLinks = $$('.rail a');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    function activate(id) {
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
      railLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-rail') === id);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) activate(en.target.getAttribute('data-chapter'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* ─────────────────────────────────────────────────────────────
     9 · THE DECK: deal, turn, read
     ───────────────────────────────────────────────────────────── */
  var deckGrid = $('#deckGrid');
  var flipCountEl = $('#flipCount');
  var readCards = new Set();

  // The face turned away is painted on the far side of the card, so its
  // controls are invisible but would still be reachable by Tab. Take them
  // out of the tab order (and the a11y tree) whenever that face is away.
  var hasInert = 'inert' in HTMLElement.prototype;

  function applyFaceState(card, flipped) {
    [[$('.card__face--front', card), flipped],
     [$('.card__face--back', card), !flipped]].forEach(function (pair) {
      var face = pair[0];
      if (!face) return;
      if (hasInert) { face.inert = pair[1]; return; }
      // Fallback for browsers without inert: hide from AT, drop from tab order.
      face.setAttribute('aria-hidden', pair[1] ? 'true' : 'false');
      $$('a,button', face).forEach(function (el) {
        if (pair[1]) { el.setAttribute('tabindex', '-1'); }
        else { el.removeAttribute('tabindex'); }
      });
    });
  }

  function setFlipped(card, state) {
    card.classList.toggle('is-flipped', state);
    applyFaceState(card, state);
    var idx = card.getAttribute('data-idx');
    if (state) { readCards.add(idx); } else { readCards.delete(idx); }
    if (flipCountEl) flipCountEl.textContent = String(readCards.size);
  }

  (function deck() {
    if (!deckGrid) return;
    var cards = $$('.card', deckGrid);

    cards.forEach(function (card, i) {
      card.setAttribute('data-idx', String(i));

      // Each face carries its own real button, so nothing focusable is nested
      // inside anything else and the source links stay reachable.
      var turn = $('.card__turn', card);
      var back = $('.card__turn-back', card);
      var arcana = $('.card__arcana', card);
      var nameEl = $('.card__name', card);
      // "The Magician, Hermes" reads as one phrase in a screen reader. The
      // article's own label uses a colon for the arcana-to-work relationship.
      var label = (arcana ? arcana.textContent.trim() + ', ' : '') +
                  (nameEl ? nameEl.textContent.trim() : 'card');

      if (turn) {
        turn.setAttribute('aria-label', 'Turn the card: ' + label);
        turn.addEventListener('click', function () { sound.turn(); setFlipped(card, true); });
      }
      if (back) {
        back.setAttribute('aria-label', 'Turn back: ' + label);
        back.addEventListener('click', function () { sound.turn(); setFlipped(card, false); });
      }

      applyFaceState(card, false);
    });

    // shuffle
    var shuffleBtn = $('#shuffleBtn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', function () {
        var order = cards.slice();
        for (var i = order.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var t = order[i]; order[i] = order[j]; order[j] = t;
        }
        sound.knock();
        readCards.clear();
        if (flipCountEl) flipCountEl.textContent = '0';

        order.forEach(function (card, i) {
          setFlipped(card, false);
          card.style.animation = 'none';
          deckGrid.appendChild(card);
          // force reflow so the deal animation replays
          void card.offsetWidth;
          card.style.animation = '';
          card.style.animationDelay = (i * 65) + 'ms';
          card.classList.add('is-dealing');
          setTimeout((function (c) {
            return function () { c.classList.remove('is-dealing'); c.style.animationDelay = ''; };
          })(card), 700 + i * 65);
        });
      });
    }

    // draw at random
    var randomBtn = $('#randomBtn');
    if (randomBtn) {
      randomBtn.addEventListener('click', function () {
        var card = cards[Math.floor(Math.random() * cards.length)];
        sound.turn();
        setFlipped(card, true);
        card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        // Focus the control on the face now showing, not the turned-away one.
        var turnBtn = $('.card__turn-back', card);
        if (turnBtn) turnBtn.focus({ preventScroll: true });
        setTimeout(function () {
          card.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.045)' }, { transform: 'scale(1)' }],
            { duration: 480, easing: 'cubic-bezier(.34,1.56,.64,1)' }
          );
        }, reduced ? 0 : 260);
      });
    }
  })();

  /* ─────────────────────────────────────────────────────────────
     10 · BURSTS on every marked control
     ───────────────────────────────────────────────────────────── */
  $$('[data-burst]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var r = el.getBoundingClientRect();
      burst(e.clientX || (r.left + r.width / 2), e.clientY || (r.top + r.height / 2));
      sound.knock();
    });
  });

  /* ─────────────────────────────────────────────────────────────
     11 · THE FOLLOWERS: they wander the cult grounds
     ───────────────────────────────────────────────────────────── */
  (function followers() {
    var grounds = $('#grounds');
    var section = $('.grounds');
    if (!grounds || reduced) return;

    var FACTS = [
      'The reports I automated run the business. No pressure.',
      'I taught Grade 1s and Grade 12s. Same energy, different volume.',
      'The VLM reads VINs off photographs. It is better at it than I am.',
      'POPIA shaped my dissertation more than any model did.',
      'Grafana at 2am is a personality trait.',
      'The trading agent has never once asked me for a day off.',
      'I speak Afrikaans, English, and enough Dutch to be polite.',
      'Python, SQL, and stubbornness.',
      'Ask me about market regimes. Please. Nobody else does.',
      'The deck reshuffles. Go on, press it.'
    ];
    var TINTS = ['#D0402C', '#E3A93C', '#5C6B3F', '#5E4280', '#EFE7D3'];
    var NAMES = ['Leshy', 'Heket', 'Kallamar', 'Shamura', 'Narinder', 'Aym', 'Baal', 'Forneus'];

    var walkers = [];
    var W = 0;

    function measure() { W = grounds.clientWidth || window.innerWidth; }

    function build() {
      grounds.innerHTML = '';
      walkers = [];
      measure();

      var count = W < 640 ? 4 : (W < 1000 ? 6 : 8);
      for (var i = 0; i < count; i++) {
        var el = document.createElement('div');
        el.className = 'walker';
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', NAMES[i % NAMES.length] + ', a follower. Activate to hear something.');

        var fact = FACTS[i % FACTS.length];
        el.innerHTML =
          '<span class="walker__bubble">' + fact + '</span>' +
          '<svg viewBox="0 0 100 110" aria-hidden="true" style="color:' + TINTS[i % TINTS.length] + '">' +
          '<use href="#i-follower"/></svg>';

        var dir = Math.random() < 0.5 ? -1 : 1;
        var size = 34 + Math.random() * 24;
        el.style.width = size.toFixed(0) + 'px';
        // the flip rides on --flip so the drawing turns but the bubble does not
        el.style.setProperty('--flip', String(dir));

        // dealt into even slots with jitter, so they walk in a loose line
        // rather than piling up on top of each other
        var span = Math.max(W - size - 8, 40);
        var slot = ((i + 0.5) / count) * span + (Math.random() - 0.5) * (span / count) * 0.55;

        var w = {
          el: el,
          x: Math.max(4, Math.min(span, slot - size / 2)),
          dir: dir,
          speed: (reduced ? 0 : (14 + Math.random() * 20)) / 60, // px per frame
          size: size,
          pause: Math.random() * 220
        };
        walkers.push(w);
        grounds.appendChild(el);
        paint(w);

        (function (ww) {
          function speak() {
            sound.hop();
            ww._show = true;
            room(ww);
            ww.el.classList.add('is-hopping', 'is-talking');
            setTimeout(function () { ww.el.classList.remove('is-hopping'); }, 460);
            clearTimeout(ww._t);
            ww._t = setTimeout(function () {
              ww.el.classList.remove('is-talking');
              // still under the pointer, so the bubble is still up
              ww._show = ww.el.matches(':hover');
            }, 3600);
          }
          ww.el.addEventListener('click', speak);
          ww.el.addEventListener('mouseenter', function () { ww._show = true; room(ww); });
          ww.el.addEventListener('mouseleave', function () { ww._show = false; });
          ww.el.addEventListener('focus', function () { ww._show = true; room(ww); });
          ww.el.addEventListener('blur', function () { ww._show = false; });
          ww.el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); speak(); }
          });
        })(w);
      }
    }

    function paint(w) {
      w.el.style.transform = 'translateX(' + w.x.toFixed(1) + 'px)';
    }

    // The rail is a fixed column over the left edge of the walk on wide
    // screens and it is drawn above it, so a bubble fitted to the walk alone
    // still slides under the rail and loses its first word.
    function railInset(host) {
      var rail = document.querySelector('.rail');
      if (!rail) return 0;
      var r = rail.getBoundingClientRect();
      if (!r.width || r.right >= host.right - 120) return 0;
      return Math.max(0, r.right + 8 - host.left);
    }

    // Keep a bubble inside the walk. A follower at either edge has a 260px
    // bubble hanging off it, and the walk clips rather than scrolls, so the
    // bubble is slid back in and the tail is pulled to follow the follower.
    function room(w) {
      var b = w.el.querySelector('.walker__bubble');
      if (!b) return;
      w._roomX = w.x;
      b.style.setProperty('--shift', '0px');
      b.style.setProperty('--arrow', '0px');
      var r = b.getBoundingClientRect();
      if (!r.width) return;
      var host = grounds.getBoundingClientRect();
      var pad = 12;
      var left = host.left + railInset(host) + pad;
      var dx = 0;
      if (r.left < left) dx = left - r.left;
      else if (r.right > host.right - pad) dx = (host.right - pad) - r.right;
      if (!dx) return;
      var tail = Math.max(r.width / 2 - 12, 0);
      b.style.setProperty('--shift', dx.toFixed(1) + 'px');
      b.style.setProperty('--arrow', Math.max(-tail, Math.min(tail, -dx)).toFixed(1) + 'px');
    }

    var running = true;
    function tick() {
      if (running && !document.hidden) {
        for (var i = 0; i < walkers.length; i++) {
          var w = walkers[i];
          if (w.pause > 0) { w.pause -= 1; continue; }
          w.x += w.speed * w.dir;
          if (w.x < 4) { w.x = 4; w.dir = 1; w.pause = 40 + Math.random() * 180; }
          if (w.x > W - w.size - 4) { w.x = W - w.size - 4; w.dir = -1; w.pause = 40 + Math.random() * 180; }
          paint(w);
          // a follower carrying an open bubble keeps walking, so the bubble
          // has to be re-fitted as it goes rather than only when it is hovered
          if (w._show && Math.abs(w.x - w._roomX) > 3) room(w);
        }
      }
      requestAnimationFrame(tick);
    }

    build();
    requestAnimationFrame(tick);

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { build(); }, 260);
    });

    // the followers retire when the tab is hidden
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
    });
  })();

  /* ─────────────────────────────────────────────────────────────
     12 · TRIAL I · THE SIGIL
     Reads the VIN off six rendered plates. The plate rail, the step
     cascade and the live validator. The validation half is a port of
     the notebook's own helpers, checked against it case for case; the
     reading half is recorded output from the pipeline's real OCR.
     ───────────────────────────────────────────────────────────── */
  (function sigil() {
    var host = $('#trialSigil');
    var demo = window.CULT_DEMO && window.CULT_DEMO.vin;
    if (!host || !demo) return;

    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    /* ── the rules, ported from the notebook ───────────────────────
       Seventeen characters, A-Z0-9 only, and no I, O or Q, which are
       excluded from real VINs precisely because OCR misreads them as
       1 and 0. A candidate that fails on nothing but a banned letter
       is repaired rather than rejected. */
    var CONFUSABLE = { I: ['1'], O: ['0'], Q: ['0', '9'] };

    function cleanVin(raw) {
      return String(raw == null ? '' : raw).toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    function validateVinZa(vin) {
      var v = String(vin == null ? '' : vin).toUpperCase().trim();
      if (v.length !== 17) return [false, 'Wrong length: ' + v.length + ' chars (must be 17)'];
      if (!/^[A-Z0-9]{17}$/.test(v)) return [false, 'Contains characters outside A-Z, 0-9'];
      if (/[IOQ]/.test(v)) return [false, 'Contains banned letter I, O, or Q'];
      return [true, 'Valid'];
    }

    function vinCandidateScore(text) {
      var cleaned = cleanVin(text);
      if (!cleaned) return 0;
      if (validateVinZa(cleaned)[0]) return 1;
      var score = Math.max(0, 1 - Math.abs(cleaned.length - 17) / 17) * 0.5;
      var allowed = 0;
      for (var i = 0; i < cleaned.length; i++) {
        if (/[A-HJ-NPR-Z0-9]/.test(cleaned[i])) allowed++;
      }
      return score + (allowed / cleaned.length) * 0.5;
    }

    function extractPossibleVins(text) {
      var cleaned = cleanVin(text);
      if (cleaned.length < 17) return [];
      var seen = {}, out = [];
      for (var i = 0; i <= cleaned.length - 17; i++) {
        var w = cleaned.substr(i, 17);
        if (!seen[w]) { seen[w] = 1; out.push(w); }
      }
      return out;
    }

    function correctBannedLetters(vin) {
      var positions = [];
      for (var i = 0; i < vin.length; i++) {
        if (CONFUSABLE[vin[i]]) positions.push(i);
      }
      if (!positions.length || positions.length > 4) return [];
      var candidates = [vin];
      positions.forEach(function (pos) {
        var ch = vin[pos], next = [];
        candidates.forEach(function (cand) {
          CONFUSABLE[ch].forEach(function (sub) {
            next.push(cand.slice(0, pos) + sub + cand.slice(pos + 1));
          });
        });
        candidates = next;
      });
      return candidates.filter(function (c) { return c !== vin; });
    }

    function validateWithCorrection(vin) {
      var r = validateVinZa(vin);
      if (r[0]) return [vin, true, r[1]];
      var up = String(vin).toUpperCase();
      if (up.length === 17 && /^[A-Z0-9]{17}$/.test(up)) {
        var cands = correctBannedLetters(up).sort(function (a, b) {
          return vinCandidateScore(b) - vinCandidateScore(a);
        });
        for (var i = 0; i < cands.length; i++) {
          var c = validateVinZa(cands[i]);
          if (c[0]) return [cands[i], true, c[1] + ' (auto-corrected from ' + vin + ')'];
        }
      }
      return [vin, false, r[1]];
    }

    /* best_valid_candidate: score every window, validate best first */
    function bestOf(text) {
      var cands = extractPossibleVins(text);
      if (!cands.length) return { final: null, ok: false, reason: 'no text recognised', cands: cands };
      var ranked = cands.slice().sort(function (a, b) {
        return vinCandidateScore(b) - vinCandidateScore(a);
      });
      for (var i = 0; i < ranked.length; i++) {
        var r = validateWithCorrection(ranked[i]);
        if (r[1]) return { final: r[0], ok: true, reason: r[2], cands: cands };
      }
      var last = validateWithCorrection(ranked[0]);
      return { final: last[0], ok: false, reason: last[2], cands: cands };
    }

    /* ── the plate rail ──────────────────────────────────────────── */
    var platesEl = $('#sigilPlates');
    var imgEl = $('#sigilImg');
    var boxEl = $('#sigilBox');
    var capEl = $('#sigilCap');
    var stepsEl = $('#sigilSteps');
    var readBtn = $('#sigilRead');
    var verdictEl = $('#sigilVerdict');
    var tallyEl = $('#sigilTally');
    var current = 0;

    if (platesEl) {
      platesEl.innerHTML = demo.plates.map(function (p, i) {
        return '<button class="plate" type="button" data-plate="' + i + '" aria-pressed="false">' +
          '<img src="' + esc(p.img) + '" alt="">' +
          '<span><span class="plate__id">' + esc(p.id) + '</span>' +
          '<span class="plate__pose">' + esc(p.pose) + '</span></span>' +
          '</button>';
      }).join('');
    }

    function drawBox(p) {
      if (!boxEl) return;
      var x = p.boxPct[0] * 100, y = p.boxPct[1] * 100;
      var w = (p.boxPct[2] - p.boxPct[0]) * 100;
      var h = (p.boxPct[3] - p.boxPct[1]) * 100;
      // preserveAspectRatio="none" stretches the box to the plate, so the stroke
      // is pinned to a constant width or it would smear along the long axis.
      var ns = 'http://www.w3.org/2000/svg';
      var rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', x.toFixed(2));
      rect.setAttribute('y', y.toFixed(2));
      rect.setAttribute('width', w.toFixed(2));
      rect.setAttribute('height', h.toFixed(2));
      rect.setAttribute('fill', 'none');
      rect.setAttribute('stroke', '#E3A93C');
      rect.setAttribute('stroke-width', '2');
      rect.setAttribute('stroke-dasharray', '6 4');
      rect.setAttribute('vector-effect', 'non-scaling-stroke');
      boxEl.innerHTML = '';
      boxEl.appendChild(rect);
    }

    function selectPlate(i) {
      current = i;
      var p = demo.plates[i];
      $$('.plate', platesEl).forEach(function (b) {
        b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-plate')) === i));
      });
      if (imgEl) {
        imgEl.src = p.img;
        imgEl.alt = 'A rendered test plate reading ' + p.recorded + '.';
      }
      if (capEl) capEl.textContent = p.id + ' · ' + p.pose;
      drawBox(p);
      // an unread plate shows the stages, greyed, with nothing filled in
      if (stepsEl) stepsEl.innerHTML = '';
      if (verdictEl) verdictEl.textContent = '';
      if (readBtn) readBtn.textContent = 'Read the sigil';
    }

    /* ── the cascade ─────────────────────────────────────────────── */
    function qualityPill(q) {
      var cls = q === 'ok' ? 'pill--ok' : 'pill--warn';
      return '<span class="pill ' + cls + '">' + esc(q) + '</span>';
    }

    function stepsFor(p) {
      var imgLines = p.lines.map(function (l) {
        return esc(l.text) + ' <b>' + l.conf.toFixed(4) + '</b>';
      }).join('<br>');

      var labelConf = p.lines[0].conf;
      var lastConf = p.lines[p.lines.length - 1].conf;
      var tied = p.lines.length > 1 && labelConf === lastConf;

      var locateNote = p.boxMethod === 'otsu'
        ? 'The trained segmentation model is private, so this box comes from Otsu ' +
          'thresholding on the plate instead. The method is recorded per plate.'
        : 'Thresholding found nothing plate-shaped, so a fixed box was used. ' +
          'The method is recorded per plate.';

      var gateNote = p.crop.quality === 'ok'
        ? 'Passed at the crop gate on a brightness variance of ' + p.crop.blurVar +
          ', where the whole image did not: this plate is flagged blurry in full ' +
          'and sharp enough where it counts.'
        : 'Flagged at the crop gate, and read anyway, so you can see what a flagged ' +
          'crop does to the characters. Here, nothing: the characters still come ' +
          'back at ' + p.selectedConf.toFixed(4) + '. A gate is triage, not a ceiling.';

      var chooseNote = tied
        ? 'Both lines come back at exactly ' + labelConf.toFixed(4) + ', so confidence ' +
          'alone could not choose between them, and neither could a threshold. Layout ' +
          'did: the value line is the longer of the two, and it is the one that validates.'
        : 'Confidence would have agreed here, ' + lastConf.toFixed(4) + ' against the ' +
          'label line at ' + labelConf.toFixed(4) + '. The selector does not lean on ' +
          'that. It takes the longest line that validates, which is a rule that still ' +
          'holds when the two scores tie.';

      return [
        ['Locate the plate', 'box ' + p.boxPct.map(function (v) { return (v * 100).toFixed(1) + '%'; }).join(' '),
          locateNote],
        ['Crop to it', p.crop.w + ' × ' + p.crop.h + ' px',
          'An axis-aligned crop. The deskew stage needs the segmentation polygons, ' +
          'which are private, so the skewed plate below is read as it lies.'],
        ['Quality gate', 'brenner ' + p.crop.brenner + ' · stroke contrast ' + p.crop.strokeContrast +
          ' ' + qualityPill(p.crop.quality), gateNote],
        ['Read the characters', imgLines,
          'PaddleOCR, real inference, run over this crop.'],
        ['Choose the line', 'by ' + esc(p.selectionReason) + ' · ' + p.candidates + ' window' +
          (p.candidates === 1 ? '' : 's') + ' of 17 chars',
          chooseNote],
        ['Validate', esc(p.reason),
          'Seventeen characters, A to Z and 0 to 9, and no I, O or Q.'],
        ['Compare with the plate', esc(p.recorded),
          p.match
            ? 'Agrees with the value the plate was drawn with.'
            : 'Disagrees with the value the plate was drawn with.']
      ];
    }

    function read() {
      var p = demo.plates[current];
      if (!stepsEl) return;
      var steps = stepsFor(p);
      stepsEl.innerHTML = steps.map(function (s, i) {
        return '<li class="step" style="--i:' + i + '">' +
          '<span class="step__n">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span><span class="step__k">' + s[0] + '</span>' +
          '<span class="step__v">' + s[1] + '</span>' +
          (s[2] ? '<span class="step__d">' + s[2] + '</span>' : '') +
          '</span></li>';
      }).join('');
      // restart the stagger on a re-read: clear, reflow, then show
      void stepsEl.offsetWidth;
      $$('.step', stepsEl).forEach(function (el) { el.classList.add('is-on'); });

      if (verdictEl) {
        verdictEl.innerHTML = p.match
          ? 'This plate reads <b>' + esc(p.final) + '</b>. That is <span class="hit">exactly' +
            '</span> the value it was drawn with.'
          : 'This plate reads <b>' + esc(p.final) + '</b>, which is <span class="miss">not</span> ' +
            'the value it was drawn with.';
      }
      if (readBtn) readBtn.textContent = 'Read it again';
      sound.chime();
    }

    /* ── the live validator ──────────────────────────────────────── */
    var vinIn = $('#vinIn');
    var vinOut = $('#vinOut');

    function wmiFor(vin) {
      if (!vin || vin.length < 3) return null;
      return demo.wmi[vin.slice(0, 3).toUpperCase()] || null;
    }

    // The readout is a pure function of the text, so the same renderer serves
    // the field in the trial and the field in the panel that takes a visitor's
    // own file. Two copies of this would drift apart within a week.
    function renderValidation(raw, out) {
      if (!out) return;
      var upper = String(raw).toUpperCase().trim();
      var cleaned = cleanVin(raw);
      var direct = validateVinZa(raw);
      var best = bestOf(raw);
      var make = wmiFor(best.final || cleaned);
      var windows = best.cands.length;
      var prefix = cleaned.length >= 3 ? cleaned.slice(0, 3) : null;

      // The table is keyed on the first three characters, so the prefix is
      // worth showing on its own line: when it misses, it is the prefix that
      // missed, not the VIN.
      var facts = [
        ['As returned', raw || 'nothing typed', 0],
        ['Cleaned', cleaned ? cleaned + ' (' + cleaned.length + ' chars)' : 'nothing left', cleaned ? 0 : 1],
        ['Windows of 17', windows ? String(windows) : 'none', windows ? 0 : 1],
        ['Prefix', prefix || 'none', prefix ? 0 : 1],
        ['Manufacturer', make || (prefix ? 'no match' : 'nothing to look up'), make ? 0 : 1]
      ];

      var html = facts.map(function (f) {
        return '<div class="fact"><span class="fact__k">' + f[0] + '</span>' +
          '<span class="fact__v' + (f[2] ? ' is-dim' : '') + '">' + esc(f[1]) + '</span></div>';
      }).join('');

      html = '<div class="forge__facts">' + html + '</div>';

      var ok = best.ok;
      var msg = ok
        ? '<code>' + esc(best.final) + '</code> · ' + esc(best.reason)
        : esc(best.reason);
      html += '<div class="verdict verdict--' + (ok ? 'ok' : 'bad') + '" style="margin-top:1rem">' +
        '<span class="verdict__word">' + (ok ? 'Valid' : 'Rejected') + '</span>' +
        '<span class="verdict__msg">' + msg + '</span></div>';

      // the repair, itemised, so the substitution is visible rather than asserted
      var banned = upper.length === 17 && /^[A-Z0-9]{17}$/.test(upper)
        ? correctBannedLetters(upper) : [];
      var rows = [];
      rows.push([upper || '(empty)', direct[1], direct[0]]);
      if (upper.length === 17 && /^[A-Z0-9]{17}$/.test(upper) && !direct[0]) {
        rows.push([banned.length + ' repaired candidate' + (banned.length === 1 ? '' : 's')
          + ' tried (I to 1, O to 0, Q to 0 or 9)', banned.length ? 'first that validates wins' : 'over four banned letters, so it refuses to guess', null]);
      }
      if (!/^[A-Z0-9]*$/.test(upper)) {
        rows.push(['Characters outside A-Z and 0-9 are stripped before anything else',
          'cleaned to ' + (cleaned || '(nothing)'), null]);
      }

      html += '<ul class="repair__steps">' + rows.map(function (r) {
        var cls = r[2] === true ? ' is-ok' : (r[2] === false ? ' is-bad' : '');
        return '<li><span class="mono">' + esc(r[0]) + '</span>' +
          '<span class="repair__r' + cls + '">' + esc(r[1]) + '</span></li>';
      }).join('') + '</ul>';

      out.innerHTML = html;
    }

    function check() {
      if (vinOut && vinIn) renderValidation(vinIn.value, vinOut);
    }

    var plateBtns = $$('.plate', platesEl);
    plateBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        selectPlate(Number(b.getAttribute('data-plate')));
        sound.hop();
      });
    });

    if (readBtn) readBtn.addEventListener('click', read);
    if (vinIn) {
      vinIn.addEventListener('input', check);
      vinIn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); check(); }
      });
    }
    var vinGo = $('#vinGo');
    if (vinGo) vinGo.addEventListener('click', check);

    if (tallyEl) {
      var whole = demo.plates.filter(function (p) {
        return String(p.imageQuality).indexOf('blurry') !== -1;
      }).length;
      tallyEl.textContent = demo.matched + ' of ' + demo.plates.length + ' plates read exactly. ' +
        'The whole-image gate calls all ' + whole + ' of them blurry. The crop gate, which is ' +
        'what the characters are actually read from, passes ' + (demo.plates.length - demo.blurry) +
        ' of them, and the ones it flags still read.';
    }

    /* ── bring your own plate ──────────────────────────────────────
       The gate below is a port of assess_crop_quality from the notebook,
       and it is a port rather than a reimplementation on purpose: the
       recorded plates were measured by that code, so numbers produced
       here are only comparable with them if the same steps run in the
       same order. That means luma first, then the rescale (the project
       converts to grey and only then resizes), an INTER_AREA box average
       on the way down and an INTER_CUBIC cubic on the way up, and the
       same three thresholds in the same flag order.

       Why the rescale at all: a gradient measure scales with the pixel
       grid, which is why one physical plate measured a Brenner of 61 in
       a close-up and 14810 in a shot from across a car park. Measuring
       at one canonical scale is what makes two files comparable.

       What cannot run here is detection and reading. The segmentation
       weights are private and a browser tab has no Python, so those two
       stages are named as not run rather than quietly skipped. */
    var GATE = {
      longSide: 1024,       // QUALITY_MEASURE_LONG_SIDE
      blurMin: 0.04,        // BLUR_MIN_BRENNER_NORM, on the normalised Brenner
      darkMax: 55.0,        // DARK_MAX_MEAN, on luma
      brightMin: 200.0,     // BRIGHT_MIN_MEAN, on luma
      eps: 1e-6,            // CONTRAST_EPS
      order: ['blurry', 'dark', 'blown_out']
    };

    // Reading the pixels of a 50 megapixel file at its own size would mean a
    // 200MB buffer to throw away. Past this, the file is reduced by the
    // canvas first and the box average runs from there.
    var GATE_MAX_SOURCE_PX = 24000000;

    /* cv2.cvtColor(arr, COLOR_BGR2GRAY) on 8 bit input, which rounds to the
       nearest integer. Returns the 8 bit luma the project resizes. */
    function lumaOf(img) {
      var ow = img.naturalWidth || img.width || 0;
      var oh = img.naturalHeight || img.height || 0;
      if (!ow || !oh) throw new Error('the image carries no pixels');
      var sw = ow, sh = oh, src = img, pre = false;
      if (ow * oh > GATE_MAX_SOURCE_PX) {
        var k = Math.sqrt(GATE_MAX_SOURCE_PX / (ow * oh));
        sw = Math.max(1, Math.round(ow * k));
        sh = Math.max(1, Math.round(oh * k));
        pre = true;
      }
      var cv = document.createElement('canvas');
      cv.width = sw;
      cv.height = sh;
      var ctx = cv.getContext('2d', { willReadFrequently: true });
      if (pre) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      // Onto black rather than onto a transparent canvas, so a PNG that
      // carries an alpha channel composites to a definite value instead of
      // leaving whatever colour sits under a cleared pixel.
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, sw, sh);
      ctx.drawImage(img, 0, 0, sw, sh);
      var px = ctx.getImageData(0, 0, sw, sh).data;
      var g = new Uint8Array(sw * sh);
      for (var i = 0, p = 0; i < g.length; i++, p += 4) {
        g[i] = Math.round(0.299 * px[p] + 0.587 * px[p + 1] + 0.114 * px[p + 2]);
      }
      return { g: g, w: sw, h: sh, ow: ow, oh: oh, pre: pre };
    }

    /* cv2.resize(gray, ..., INTER_AREA): the exact area-weighted mean of the
       source rectangle each destination pixel covers, rounded to the nearest
       integer. The rounding is not a detail: the project resizes a uint8
       array, so cv2 hands back a uint8 copy and every later measurement reads
       whole numbers. Leaving these as floats was the whole of the gap
       between this port and the notebook, and it showed up worst in the
       second-derivative diagnostics, which have nothing to divide by. */
    function shrinkArea(g, w, h, dw, dh) {
      var out = new Float64Array(dw * dh);
      var sx = w / dw, sy = h / dh;
      for (var dy = 0; dy < dh; dy++) {
        var y0 = dy * sy, y1 = y0 + sy;
        var iy0 = Math.floor(y0), iy1 = Math.min(h, Math.ceil(y1));
        for (var dx = 0; dx < dw; dx++) {
          var x0 = dx * sx, x1 = x0 + sx;
          var ix0 = Math.floor(x0), ix1 = Math.min(w, Math.ceil(x1));
          var acc = 0, wt = 0;
          for (var y = iy0; y < iy1; y++) {
            var wy = Math.min(y1, y + 1) - Math.max(y0, y);
            if (wy <= 0) continue;
            var row = y * w;
            for (var x = ix0; x < ix1; x++) {
              var wx = Math.min(x1, x + 1) - Math.max(x0, x);
              if (wx <= 0) continue;
              var k = wx * wy;
              acc += g[row + x] * k;
              wt += k;
            }
          }
          out[dy * dw + dx] = wt ? Math.round(acc / wt) : 0;
        }
      }
      return out;
    }

    /* cv2.resize(gray, ..., INTER_CUBIC), a = -0.75, separable, source
       clamped at the edges the way BORDER_REPLICATE does, the horizontal
       pass kept in float and only the finished pixel rounded. Only a file
       smaller than the canonical scale reaches this. Both passes were
       checked against cv2.resize on random arrays before being written
       down: this reproduces it exactly, and rounding the intermediate to
       8 bit does not. */
    function cubicAt(t) {
      var a = -0.75, x = Math.abs(t);
      if (x < 1) return ((a + 2) * x - (a + 3)) * x * x + 1;
      if (x < 2) return ((a * x - 5 * a) * x + 8 * a) * x - 4 * a;
      return 0;
    }

    function growCubic(g, w, h, dw, dh) {
      var mid = new Float64Array(h * dw), out = new Float64Array(dw * dh);
      var sx = w / dw, sy = h / dh, i, j, k, t, base, s, v;
      for (j = 0; j < h; j++) {
        var row = j * w;
        for (i = 0; i < dw; i++) {
          var fx = (i + 0.5) * sx - 0.5;
          var ix = Math.floor(fx), c = fx - ix;
          s = 0;
          for (k = -1; k <= 2; k++) {
            v = g[row + Math.min(w - 1, Math.max(0, ix + k))];
            s += v * cubicAt(k - c);
          }
          mid[j * dw + i] = s;
        }
      }
      for (var y = 0; y < dh; y++) {
        var fy = (y + 0.5) * sy - 0.5;
        var iy = Math.floor(fy), d = fy - iy;
        for (i = 0; i < dw; i++) {
          s = 0;
          for (k = -1; k <= 2; k++) {
            base = Math.min(h - 1, Math.max(0, iy + k)) * dw + i;
            s += mid[base] * cubicAt(k - d);
          }
          out[y * dw + i] = Math.round(Math.min(255, Math.max(0, s)));
        }
      }
      return out;
    }

    /* _to_canonical_scale: one scale for every file, so a plate shot from
       across a car park and one from a metre away can be compared. */
    function canonical(L) {
      var cur = Math.max(L.w, L.h);
      if (cur === GATE.longSide) {
        var same = new Float64Array(L.g.length);
        for (var i = 0; i < L.g.length; i++) same[i] = L.g[i];
        return { g: same, w: L.w, h: L.h };
      }
      var s = GATE.longSide / cur;
      var dw = Math.max(1, Math.round(L.w * s));
      var dh = Math.max(1, Math.round(L.h * s));
      var g = s < 1 ? shrinkArea(L.g, L.w, L.h, dw, dh) : growCubic(L.g, L.w, L.h, dw, dh);
      return { g: g, w: dw, h: dh };
    }

    function meanStd(g) {
      var i, s = 0;
      for (i = 0; i < g.length; i++) s += g[i];
      var m = g.length ? s / g.length : 0;
      var acc = 0;
      for (i = 0; i < g.length; i++) { var d = g[i] - m; acc += d * d; }
      return [m, g.length ? Math.sqrt(acc / g.length) : 0];
    }

    // BORDER_REFLECT_101, which is what cv2 calls BORDER_DEFAULT: the edge
    // ring is measured against reflected neighbours rather than skipped, so
    // every pixel of the copy contributes.
    function reflect101(i, n) {
      if (n === 1) return 0;
      while (i < 0 || i >= n) {
        if (i < 0) i = -i;
        if (i >= n) i = 2 * (n - 1) - i;
      }
      return i;
    }

    /* cv2.Laplacian(g, CV_64F).var(): the default 3x3 kernel over every pixel,
       edges included. Kept as a diagnostic, exactly as the project keeps it.
       It is not contrast invariant, so a merely dark plate reads as a soft
       one, which is why it is the measure that does not vote. */
    function lapVar(g, w, h) {
      if (!w || !h) return 0;
      var n = w * h, s = 0, acc = 0, x, y, i, v;
      var xm = [], xp = [], ym = [], yp = [];
      for (x = 0; x < w; x++) { xm[x] = reflect101(x - 1, w); xp[x] = reflect101(x + 1, w); }
      for (y = 0; y < h; y++) { ym[y] = reflect101(y - 1, h) * w; yp[y] = reflect101(y + 1, h) * w; }
      for (y = 0; y < h; y++) {
        var row = y * w;
        for (x = 0; x < w; x++) {
          i = row + x;
          s += g[row + xm[x]] + g[row + xp[x]] + g[ym[y] + x] + g[yp[y] + x] - 4 * g[i];
        }
      }
      var m = s / n;
      for (y = 0; y < h; y++) {
        var r2 = y * w;
        for (x = 0; x < w; x++) {
          i = r2 + x;
          v = g[r2 + xm[x]] + g[r2 + xp[x]] + g[ym[y] + x] + g[yp[y] + x] - 4 * g[i] - m;
          acc += v * v;
        }
      }
      return acc / n;
    }

    /* getThreshVal_Otsu_8u: the cut that maximises the between-class
       variance of the 8 bit histogram. */
    function otsu(hist, total) {
      var sum = 0, i;
      for (i = 0; i < 256; i++) sum += i * hist[i];
      var sumB = 0, wB = 0, best = 0, th = 0;
      for (i = 0; i < 256; i++) {
        wB += hist[i];
        if (!wB) continue;
        var wF = total - wB;
        if (!wF) break;
        sumB += i * hist[i];
        var mB = sumB / wB, mF = (sum - sumB) / wF;
        var between = wB * wF * (mB - mF) * (mB - mF);
        if (between > best) { best = between; th = i; }
      }
      return th;
    }

    /* _otsu_stroke_contrast: the measurement a global luma spread cannot
       make on a stamped plate, since the whole crop can sit inside a narrow
       band of greys while the characters on it are perfectly legible. The
       threshold comes off the 8 bit copy; the two means come off the float
       one, which is the order the project computes them in. */
    function strokeContrast(g) {
      var hist = new Int32Array(256), i, v;
      for (i = 0; i < g.length; i++) {
        v = g[i] < 0 ? 0 : (g[i] > 255 ? 255 : g[i] | 0);
        hist[v]++;
      }
      var th = otsu(hist, g.length);
      var fgN = 0, bgN = 0, fgS = 0, bgS = 0;
      for (i = 0; i < g.length; i++) {
        if (g[i] > th) { fgN++; fgS += g[i]; } else { bgN++; bgS += g[i]; }
      }
      return {
        contrast: fgN < 20 || bgN < 20 ? 0 : Math.abs(fgS / fgN - bgS / bgN),
        frac: g.length ? fgN / g.length : 0
      };
    }

    function measurePlate(img) {
      var L = lumaOf(img);
      var c = canonical(L);
      var g = c.g;
      var ms = meanStd(g);
      var lumMean = ms[0], lumStd = ms[1];
      // Contrast normalised Brenner: mean((I[:, :-2] - I[:, 2:]) ** 2) over
      // (std ** 2 + eps), which is invariant under I -> aI + b, so neither
      // brightness nor contrast can move it. This is the one that decides
      // the blur flag, and it is compared unrounded.
      var brenner = 0;
      if (c.w >= 3) {
        var s = 0, y, x, d;
        for (y = 0; y < c.h; y++) {
          var row = y * c.w;
          for (x = 0; x + 2 < c.w; x++) {
            d = g[row + x] - g[row + x + 2];
            s += d * d;
          }
        }
        brenner = (s / (c.h * (c.w - 2))) / (lumStd * lumStd + GATE.eps);
      }
      var sc = strokeContrast(g);
      var flags = [];
      if (brenner < GATE.blurMin) flags.push('blurry');
      if (lumMean < GATE.darkMax) flags.push('dark');
      else if (lumMean > GATE.brightMin) flags.push('blown_out');
      flags = GATE.order.filter(function (f) { return flags.indexOf(f) >= 0; });
      return {
        w: c.w, h: c.h, ow: L.ow, oh: L.oh, reduced: L.pre,
        lumMean: lumMean, lumStd: lumStd, brenner: brenner,
        blurVar: lapVar(g, c.w, c.h),
        strokeContrast: sc.contrast, strokeFrac: sc.frac,
        flags: flags
      };
    }

    function renderGate(m) {
      var facts = [
        ['Focus, contrast normalised', m.brenner.toFixed(4)],
        ['Brightness', m.lumMean.toFixed(1)],
        ['Brightness spread', m.lumStd.toFixed(1)],
        ['Stroke contrast', m.strokeContrast.toFixed(1) + ' · ' +
          (m.strokeFrac * 100).toFixed(1) + '% of pixels'],
        ['Laplacian variance', m.blurVar.toFixed(1)],
        ['Measured at', m.w + ' × ' + m.h + ' px'],
        ['Your file', m.ow + ' × ' + m.oh + ' px' + (m.reduced ? ', reduced to measure' : '')]
      ];
      var html = '<div class="forge__facts">' + facts.map(function (f) {
        return '<div class="fact"><span class="fact__k">' + esc(f[0]) + '</span>' +
          '<span class="fact__v mono">' + esc(f[1]) + '</span></div>';
      }).join('') + '</div>';

      var ok = !m.flags.length;
      html += '<div class="verdict verdict--' + (ok ? 'ok' : 'bad') + '" style="margin-top:1rem">' +
        '<span class="verdict__word">' + (ok ? 'Clear' : 'Flagged') + '</span>' +
        '<span class="verdict__msg">' + (ok
          ? 'Nothing tripped a threshold. The whole-image gate calls every plate in the ' +
            'corpus blurry; this is the crop gate, which is what characters are read from.'
          : esc(m.flags.join(' and ')) + ' at the crop gate. Flagged crops still read in the ' +
            'corpus, so this is triage rather than a ceiling.') +
        '</span></div>';

      // Which of the seven stages the project runs actually happened to this
      // file. Two of them cannot, and saying so is the point of the panel.
      var stages = [
        ['Locate the plate', 'not run here',
          'the segmentation weights are private and are not in this page', null],
        ['Crop to it', 'your file, as given',
          'a crop is the box the detector would have handed over, and there is no detector here', null],
        ['Quality gate', 'measured above',
          'the same grey conversion, rescale, thresholds and flag order the corpus was measured with', true],
        ['Read the characters', 'not run here',
          'the reader is PaddleOCR in Python. A browser tab has no runtime for it', null],
        ['Choose the line', 'yours to supply, below',
          'paste what the reader would have returned and the selector does the rest', null],
        ['Validate', 'runs below',
          'the whole rule chain: strip, window, repair the banned letters, validate', true],
        ['Compare with the plate', 'nothing recorded',
          'this file was never drawn with a known value to compare against', null]
      ];
      html += '<ul class="repair__steps bring__stages">' + stages.map(function (s) {
        return '<li><span class="mono">' + esc(s[0]) + '</span>' +
          '<span class="repair__r' + (s[3] ? ' is-ok' : '') + '">' + esc(s[1]) +
          '<span class="bring__why">' + esc(s[2]) + '</span></span></li>';
      }).join('') + '</ul>';
      return html;
    }

    var ownDrop = $('#ownPlateDrop');
    var ownInput = $('#ownPlate');
    var ownBody = $('#ownPlateBody');
    var ownImg = $('#ownPlateImg');
    var ownCap = $('#ownPlateCap');
    var ownGate = $('#ownPlateGate');
    var ownVin = $('#ownVin');
    var ownVinOut = $('#ownVinOut');
    var ownUrl = null;

    function ownNote(msg, bad) {
      if (!ownGate) return;
      ownGate.innerHTML = '<p class="bring__gap' + (bad ? ' is-bad' : '') + '">' + esc(msg) + '</p>';
      if (ownBody) ownBody.hidden = false;
    }

    function takePlate(file) {
      if (!file || !ownGate) return;
      if (!/^image\//.test(file.type)) {
        ownNote('That is not an image. Give it a JPEG, a PNG or a WebP.', true);
        return;
      }
      var url = URL.createObjectURL(file);
      var im = new Image();
      im.onload = function () {
        if (ownUrl) URL.revokeObjectURL(ownUrl);
        ownUrl = url;
        if (ownImg) {
          ownImg.src = url;
          ownImg.alt = file.name + ', the photograph you supplied.';
        }
        if (ownCap) {
          ownCap.textContent = file.name + ' · ' + im.naturalWidth + ' × ' + im.naturalHeight + ' px';
        }
        if (ownBody) ownBody.hidden = false;
        try {
          ownGate.innerHTML = renderGate(measurePlate(im));
          sound.chime();
        } catch (e) {
          ownNote('The pixels could not be read: ' + (e && e.message ? e.message : e) +
            '. Some formats carry no frame a browser can decode.', true);
        }
      };
      im.onerror = function () {
        URL.revokeObjectURL(url);
        ownNote('That file did not decode as an image. A raw or HEIC file will do this.', true);
      };
      im.src = url;
    }

    if (ownInput) {
      ownInput.addEventListener('change', function () {
        if (ownInput.files && ownInput.files[0]) takePlate(ownInput.files[0]);
      });
    }
    if (ownDrop) {
      ['dragenter', 'dragover'].forEach(function (ev) {
        ownDrop.addEventListener(ev, function (e) {
          e.preventDefault();
          ownDrop.classList.add('is-over');
        });
      });
      ['dragleave', 'dragend'].forEach(function (ev) {
        ownDrop.addEventListener(ev, function () { ownDrop.classList.remove('is-over'); });
      });
      ownDrop.addEventListener('drop', function (e) {
        e.preventDefault();
        ownDrop.classList.remove('is-over');
        var dt = e.dataTransfer;
        if (dt && dt.files && dt.files[0]) takePlate(dt.files[0]);
      });
    }
    if (ownVin) {
      ownVin.addEventListener('input', function () {
        renderValidation(ownVin.value, ownVinOut);
      });
      ownVin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          renderValidation(ownVin.value, ownVinOut);
          sound.hop();
        }
      });
    }
    var ownGo = $('#ownVinGo');
    if (ownGo) {
      ownGo.addEventListener('click', function () {
        renderValidation(ownVin.value, ownVinOut);
        sound.hop();
      });
    }

    // The gate is a port, so it should be checkable against the notebook's own
    // output rather than taken on trust: open the console and call
    // CULT_GATE.measure(image) on any plate. Kept deliberately small.
    window.CULT_GATE = GATE;
    window.CULT_GATE.measure = measurePlate;
    window.CULT_GATE.canonical = canonical;
    window.CULT_GATE.lumaOf = lumaOf;
    window.CULT_GATE.render = renderGate;

    selectPlate(0);
    check();
  })();

  /* ─────────────────────────────────────────────────────────────
     13 · TRIAL II · THE CONFESSION
     The audit drawn over the project's published sample corpus: a
     conversation map built from real segment timestamps, the segment
     ledger, the planted hallucination artefact, and the corpus totals.
     ───────────────────────────────────────────────────────────── */
  (function confession() {
    var host = $('#trialConfession');
    var demo = window.CULT_DEMO && window.CULT_DEMO.retention;
    if (!host || !demo) return;

    var LANGS = { en: 'English', af: 'Afrikaans', zu: 'isiZulu', xh: 'isiXhosa' };
    var AGENT = '#E3A93C', CLIENT = '#EFE7D3', BLOOD = '#D0402C', RITUAL = '#5E4280';

    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
    function pct(v) { return v == null ? null : (v * 100).toFixed(2) + '%'; }
    function clock(t) {
      var m = Math.floor(t / 60), s = Math.round(t % 60);
      return m + ':' + String(s).padStart(2, '0');
    }

    var listEl = $('#confList');
    var metaEl = $('#confMeta');
    var mapEl = $('#confMap');
    var segsEl = $('#confSegs');
    var metEl = $('#confMetrics');
    var artEl = $('#confArtefact');
    var statEl = $('#confStats');
    var current = 0;

    /* ── the recording list ─────────────────────────────────────── */
    if (listEl) {
      listEl.innerHTML = demo.calls.map(function (c, i) {
        var bits = [c.totalSegments + ' segments'];
        if (c.flaggedSegments) {
          bits.push('<span class="is-flag">' + c.flaggedSegments + ' flagged</span>');
        }
        if (c.hallucinated) bits.push('<span class="is-flag">' + c.hallucinated + ' dropped</span>');
        return '<button class="call" type="button" data-call="' + i + '" aria-pressed="false">' +
          '<span class="call__top"><span class="call__id">' + esc(c.id) + '</span>' +
          '<span class="call__id">' + clock(c.durationSeconds) + '</span></span>' +
          '<span class="call__out">' + esc(c.outcome) + '</span>' +
          '<span class="call__meta">' + bits.join(' · ') + '</span>' +
          '</button>';
      }).join('');
    }

    /* ── the conversation map ───────────────────────────────────── */
    function buildMap(call) {
      var W = 760, H = 210, PL = 66, PR = 12;
      var segs = call.segments;
      var t1 = segs.length ? segs[segs.length - 1].end : 1;
      if (!t1) t1 = 1;
      var uw = W - PL - PR;
      function x(t) { return PL + (t / t1) * uw; }

      var out = [];
      // The map is rebuilt on every call, so the accessible name has to be
      // rebuilt with it: the outer aria-labelledby points at this title.
      var agentN = segs.filter(function (s) { return s.speaker === 'agent'; }).length;
      out.push('<title id="confMapT">' + esc(call.id + ', ' + segs.length + ' segments over ' +
        clock(call.durationSeconds) + ', ' + agentN + ' from the agent and ' +
        (segs.length - agentN) + ' from the caller') + '</title>');
      out.push('<defs><pattern id="cmapHatch" width="6" height="6" patternUnits="userSpaceOnUse" ' +
        'patternTransform="rotate(45)"><rect width="6" height="6" fill="' + BLOOD + '"/>' +
        '<line x1="0" y1="0" x2="0" y2="6" stroke="#8E2113" stroke-width="2.5"/></pattern></defs>');

      // time grid, drawn behind everything
      for (var g = 0; g <= 3; g++) {
        var gt = (t1 * g) / 3;
        out.push('<line x1="' + x(gt).toFixed(1) + '" y1="26" x2="' + x(gt).toFixed(1) +
          '" y2="170" stroke="rgba(239,231,211,.08)" stroke-width="1"/>');
        out.push('<text class="cmap__tick" x="' + x(gt).toFixed(1) + '" y="111" text-anchor="' +
          (g === 0 ? 'start' : (g === 3 ? 'end' : 'middle')) + '">' + clock(gt) + '</text>');
      }

      out.push('<text class="cmap__lane" x="8" y="54">AGENT</text>');
      out.push('<text class="cmap__lane" x="8" y="150">CALLER</text>');
      out.push('<line x1="' + PL + '" y1="98" x2="' + (W - PR) + '" y2="98" ' +
        'stroke="rgba(239,231,211,.28)" stroke-width="1"/>');

      segs.forEach(function (s, i) {
        var isAgent = s.speaker === 'agent';
        var bx = x(s.start), bw = Math.max(3, x(s.end) - bx);
        var y = isAgent ? 26 : 120;
        var fill = isAgent ? AGENT : CLIENT;
        var flag = s.flags && s.flags.length;
        var stroke = s.hallucination ? BLOOD : (flag ? BLOOD : 'none');
        var sw = s.hallucination ? 2.5 : (flag ? 2 : 0);
        if (s.hallucination) fill = 'url(#cmapHatch)';
        var title = (isAgent ? 'Agent' : 'Caller') + ' ' + s.start.toFixed(2) + 's to ' +
          s.end.toFixed(2) + 's' + (s.avgLogprob != null ? ' · logprob ' + s.avgLogprob : '') +
          (flag ? ' · ' + s.flags.join(', ') : '');
        out.push('<rect class="cmap__bar" data-seg="' + i + '" x="' + bx.toFixed(1) + '" y="' + y +
          '" width="' + bw.toFixed(1) + '" height="50" rx="2" fill="' + fill + '"' +
          (stroke === 'none' ? '' : ' stroke="' + stroke + '" stroke-width="' + sw + '"') +
          '><title>' + esc(title) + '</title></rect>');

        // language ribbon: the corpus marks the segments that are not English
        var isEn = s.lang === 'en' || !s.lang;
        out.push('<rect x="' + bx.toFixed(1) + '" y="84" width="' + bw.toFixed(1) + '" height="10" ' +
          'rx="1" fill="' + (isEn ? 'rgba(239,231,211,.07)' : RITUAL) + '"/>');
        if (!isEn && bw > 22) {
          out.push('<text class="cmap__lang" x="' + (bx + bw / 2).toFixed(1) + '" y="92" ' +
            'text-anchor="middle">' + esc(String(s.lang).toUpperCase()) + '</text>');
        }
      });

      return out.join('');
    }

    /* ── the segment ledger ─────────────────────────────────────── */
    function buildSegs(call) {
      return call.segments.map(function (s, i) {
        var cls = 'seg' + (s.speaker === 'client' ? ' seg--client' : '') +
          (s.hallucination ? ' is-dropped' : '');
        var meta = [];
        if (s.avgLogprob != null) meta.push('logprob ' + s.avgLogprob.toFixed(3));
        if (s.flags && s.flags.length) {
          meta.push('<span class="is-flag">' + esc(s.flags.join(' · ')) + '</span>');
        }
        if (s.hallucination) meta.push('<span class="is-flag">dropped</span>');
        if (s.lang && s.lang !== 'en') {
          meta.push('<span class="is-lang">' + esc(LANGS[s.lang] || s.lang) + '</span>');
        }
        if (s.hallucination || (s.flags && s.flags.length)) {
          meta.push('silence ' + s.noSpeechProb.toFixed(3));
          meta.push('compression ' + s.compressionRatio.toFixed(2));
        }
        if (s.lowConfWords && s.lowConfWords.length) {
          meta.push('low confidence: ' + esc(s.lowConfWords.join(', ')));
        }
        return '<li class="' + cls + '" data-seg="' + i + '">' +
          '<span class="seg__n">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="seg__spk">' + esc(s.speaker || 'unknown') + '</span>' +
          '<span class="seg__text">' + esc(s.text) +
          '<span class="seg__meta">' + s.start.toFixed(2) + 's to ' + s.end.toFixed(2) + 's' +
          (meta.length ? ' · ' + meta.join(' · ') : '') + '</span></span></li>';
      }).join('');
    }

    /* ── the metrics ────────────────────────────────────────────── */
    function metricsFor(call) {
      var out = [];
      function card(k, v, small, dim) {
        out.push('<div class="metric"><span class="metric__k">' + k + '</span>' +
          '<span class="metric__v' + (dim ? ' is-dim' : '') + '">' + v +
          (small ? '<small>' + small + '</small>' : '') + '</span></div>');
      }
      var wer = pct(call.wer), cer = pct(call.cer);
      card('Word error', wer || 'not scored', wer ? 'against the reference' : 'no reference held', !wer);
      card('Character error', cer || 'not scored', cer ? 'against the reference' : 'no reference held', !cer);
      card('Flagged', String(call.flaggedSegments),
        'of ' + call.totalSegments + ' segments', false);
      card('Dropped', String(call.hallucinated), call.hallucinated ? 'hallucinated' : 'none', false);
      card('Voice cluster', esc(call.agentVoice.voice_id),
        call.agentVoice.cluster_size + ' calls share it', false);
      var langs = Object.keys(call.languages).map(function (k) { return LANGS[k] || k; });
      card('Languages', String(langs.length), langs.join(', '), false);
      return out.join('');
    }

    function selectCall(i) {
      current = i;
      var call = demo.calls[i];
      $$('.call', listEl).forEach(function (b) {
        b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-call')) === i));
      });

      if (metaEl) {
        var tail = [];
        tail.push(call.totalSegments + ' segments over ' + clock(call.durationSeconds));
        tail.push(call.agentVoice.cluster_size + ' calls share voice cluster ' +
          call.agentVoice.voice_id);
        if (call.hasReference) tail.push('hand-checked reference held');
        metaEl.innerHTML = '<div class="conf__out"><h4>' + esc(call.outcome) + '</h4>' +
          '<span class="pill ' + (call.hallucinated ? 'pill--bad' : 'pill--ok') + '">' +
          (call.hallucinated ? 'tail found' : 'no tail') + '</span></div>' +
          '<p class="conf__sum">' + esc(call.summary) + '</p>' +
          '<p class="seg__meta" style="margin-top:.6rem">' + tail.join(' · ') + '</p>';
      }
      if (mapEl) mapEl.innerHTML = buildMap(call);
      if (segsEl) segsEl.innerHTML = buildSegs(call);
      if (metEl) metEl.innerHTML = metricsFor(call);
      wireHover();
    }

    /* hovering the ledger lifts the matching bar, and the rest recede */
    function wireHover() {
      if (!mapEl || !segsEl) return;
      var bars = $$('.cmap__bar', mapEl);
      $$('li', segsEl).forEach(function (li) {
        var idx = li.getAttribute('data-seg');
        function on() {
          bars.forEach(function (b) {
            var hit = b.getAttribute('data-seg') === idx;
            b.classList.toggle('is-hi', hit);
            b.classList.toggle('is-dim', !hit);
          });
        }
        function off() {
          bars.forEach(function (b) {
            b.classList.remove('is-hi', 'is-dim');
          });
        }
        li.addEventListener('pointerenter', on);
        li.addEventListener('pointerleave', off);
        li.addEventListener('focusin', on);
        li.addEventListener('focusout', off);
      });
    }

    /* ── the planted artefact ────────────────────────────────────
       The pipeline's rule is three conditions that must all hold:
       at least four words, an average logprob no worse than -0.50, and
       then repetition, by word share or by compression ratio. The
       numbers below are the segment's own, and the bars it clears are
       the project's thresholds, which live in its config. */
    if (artEl) {
      var rows = [], tails = [];
      demo.calls.forEach(function (c) {
        c.segments.forEach(function (s, i) {
          if (!s.hallucination) return;
          tails.push(s);
          var words = String(s.text).toLowerCase().match(/[a-z0-9']+/g) || [];
          var counts = {};
          words.forEach(function (w) { counts[w] = (counts[w] || 0) + 1; });
          var top = 0;
          Object.keys(counts).forEach(function (w) { top = Math.max(top, counts[w]); });
          var share = words.length ? top / words.length : 0;
          rows.push('<li class="artefact__row">' +
            '<span class="artefact__head">' +
            '<span class="is-id">call ' + esc(c.id) + '</span>' +
            '<span>segment ' + (i + 1) + '</span>' +
            '<span>' + s.start.toFixed(2) + 's to ' + s.end.toFixed(2) + 's</span>' +
            '<span>' + esc(s.speaker) + '</span></span>' +
            '<span class="artefact__quote">' + esc(s.text) + '</span>' +
            '<span class="artefact__nums">confidence ' + s.avgLogprob.toFixed(2) +
            ' · compression ratio ' + s.compressionRatio.toFixed(2) +
            ' · words ' + words.length + ', most common is ' + Math.round(share * 100) + '%' +
            ' · silence ' + s.noSpeechProb.toFixed(3) +
            ' · flagged ' + esc(s.flags.join(', ')) + '</span></li>');
        });
      });

      var close = '<p class="corpus__note artefact__close">A hallucination has to clear three ' +
        'bars at once: at least <b>four words</b>, a confidence no worse than <b>-0.50</b>, ' +
        'and repetition. Confidence is not what fails here. ';
      if (tails.length) {
        var t0 = tails[0];
        var w0 = String(t0.text).toLowerCase().match(/[a-z0-9']+/g) || [];
        var c0 = {};
        w0.forEach(function (w) { c0[w] = (c0[w] || 0) + 1; });
        var top0 = 0;
        Object.keys(c0).forEach(function (w) { top0 = Math.max(top0, c0[w]); });
        close += 'On these, the most common word is <b>' + Math.round((top0 / w0.length) * 100) +
          '%</b> of all of them, against a bar of <b>50%</b>: the repetition test met exactly, ' +
          'not comfortably. The compression ratio, <b>' + t0.compressionRatio.toFixed(2) +
          '</b> against <b>5.00</b> for a phrase-level loop, is the one with room to spare.';
      }
      close += ' The question the audit asks is not whether the model is confident. It is ' +
        'whether the model is repeating itself.</p>';

      artEl.innerHTML = '<ul class="artefact__rows">' + rows.join('') + '</ul>' + close;
    }

    /* ── the corpus totals ──────────────────────────────────────── */
    if (statEl) {
      var a = demo.aggregate;
      function stat(k, v, small) {
        return '<div><dt>' + k + '</dt><dd>' + v +
          (small ? '<small>' + small + '</small>' : '') + '</dd></div>';
      }
      var langs = a.languages.map(function (k) { return LANGS[k] || k; });
      statEl.innerHTML = [
        stat('Calls', String(a.calls), a.withReference + ' carry a reference'),
        stat('Segments', String(a.segments), 'fabricated end to end'),
        stat('Flagged', String(a.flagged),
          Math.round((a.flagged / a.segments) * 100) + '% of all segments'),
        stat('Dropped', String(a.hallucinated), 'all of them the same tail'),
        stat('Pooled word error', (a.pooled.wer * 100).toFixed(2) + '%',
          (a.pooled.werNoHal * 100).toFixed(2) + '% without the tail'),
        stat('Pooled character error', (a.pooled.cer * 100).toFixed(2) + '%',
          (a.pooled.cerNoHal * 100).toFixed(2) + '% without the tail'),
        stat('Languages', String(a.languages.length), langs.join(', ')),
        stat('Voice clusters', String(a.voiceClusters.length), 'anonymous, never names')
      ].join('');
    }

    $$('.call', listEl).forEach(function (b) {
      b.addEventListener('click', function () {
        selectCall(Number(b.getAttribute('data-call')));
        sound.knock();
      });
    });
    /* ── bring your own recording ──────────────────────────────────
       The scoring below is a port, not a reimplementation: _tokenize,
       _wer_parts, _cer_text and _cer_parts out of the project's
       data_store, and _is_hallucination out of hallucination_ops, with
       the thresholds read off its config. The error rates a visitor
       gets here are therefore the same numbers the project's own
       functions would return for the same two strings.

       Python's \\w is Unicode aware, so the character classes here have
       to be too: \\p{L} and \\p{N} with the u flag, not [a-z0-9]. */
    var WORD_RE = /[\p{L}\p{N}_]+/gu;
    var CHAR_RE = /[\p{L}\p{N}_]/gu;

    // config.py: HALLUCINATION_MIN_WORDS / _REPEAT_RATIO / _MIN_CONF /
    // _MIN_COMPRESSION
    var HAL = { minWords: 4, repeatRatio: 0.5, minConf: -0.5, minCompression: 5.0 };

    function tokenize(text) {
      var t = typeof text === 'string' ? text.toLowerCase() : '';
      return t.match(WORD_RE) || [];
    }

    function cerText(text) {
      var t = typeof text === 'string' ? text.toLowerCase() : '';
      return (t.match(CHAR_RE) || []).join('');
    }

    /* Levenshtein, one row at a time. Tokens for WER and code points for CER,
       because Python counts a string in code points and Array.from does the
       same here, where indexing the string would count surrogate halves. */
    function lev(a, b) {
      var n = a.length, m = b.length;
      if (!n) return m;
      if (!m) return n;
      var prev = new Int32Array(m + 1), cur = new Int32Array(m + 1), i, j, t;
      for (j = 0; j <= m; j++) prev[j] = j;
      for (i = 1; i <= n; i++) {
        cur[0] = i;
        var ai = a[i - 1];
        for (j = 1; j <= m; j++) {
          var del = prev[j] + 1;
          var ins = cur[j - 1] + 1;
          var sub = prev[j - 1] + (ai === b[j - 1] ? 0 : 1);
          cur[j] = del < ins ? (del < sub ? del : sub) : (ins < sub ? ins : sub);
        }
        t = prev; prev = cur; cur = t;
      }
      return prev[m];
    }

    // the DP is quadratic; past this it would lock the tab rather than answer
    var SCORE_CELL_LIMIT = 250000000;

    function werParts(hyp, ref) {
      var h = tokenize(hyp), r = tokenize(ref);
      if (!r.length) return null;
      if (h.length * r.length > SCORE_CELL_LIMIT) return { tooLong: true };
      return { edits: lev(h, r), refLen: r.length, hypLen: h.length };
    }

    function cerParts(hyp, ref) {
      var h = Array.from(cerText(hyp)), r = Array.from(cerText(ref));
      if (!r.length) return null;
      if (h.length * r.length > SCORE_CELL_LIMIT) return { tooLong: true };
      return { edits: lev(h, r), refLen: r.length, hypLen: h.length };
    }

    /* _is_hallucination, condition by condition, each returning why it did or
       did not fire so the panel can show its work instead of a verdict. */
    function halluFor(text, lp, cr) {
      var words = tokenize(text);
      var conds = [];
      if (words.length < HAL.minWords) {
        conds.push(['Enough words to judge', String(words.length) + ' of a required ' + HAL.minWords, false,
          'too short for the rule to say anything about it']);
        return { hit: false, conds: conds, words: words };
      }
      conds.push(['Enough words to judge', String(words.length) + ' of a required ' + HAL.minWords, true,
        'long enough to judge']);
      if (lp != null && lp < HAL.minConf) {
        conds.push(['The model was confident', 'logprob ' + lp.toFixed(2) + ', under the ' + HAL.minConf.toFixed(2) + ' bar', false,
          'a low confidence invention is not this signature, so the rule stops here']);
        return { hit: false, conds: conds, words: words };
      }
      conds.push(['The model was confident',
        lp == null ? 'no logprob given, so this is skipped'
          : 'logprob ' + lp.toFixed(2) + ', at or above the ' + HAL.minConf.toFixed(2) + ' bar',
        true, lp == null ? 'the project skips a condition whose value is missing, and so does this' : 'confident in what it wrote']);

      var counts = {}, top = 0, topWord = '';
      words.forEach(function (w) {
        counts[w] = (counts[w] || 0) + 1;
        if (counts[w] > top) { top = counts[w]; topWord = w; }
      });
      var share = top / words.length;
      var repeated = share >= HAL.repeatRatio;
      conds.push(['One word dominating', 'the most common is "' + topWord + '" at ' +
        Math.round(share * 100) + '% of ' + words.length + ' words, bar is ' +
        Math.round(HAL.repeatRatio * 100) + '%', repeated,
        repeated ? 'the repetition test is met' : 'not enough for a one-word loop']);
      if (repeated) return { hit: true, conds: conds, words: words, via: 'word share' };

      var byPhrase = cr != null && cr >= HAL.minCompression;
      conds.push(['A loop of phrases', cr == null ? 'no compression ratio given, so this is skipped'
        : 'compression ' + cr.toFixed(2) + ' against a ' + HAL.minCompression.toFixed(2) + ' bar',
        byPhrase, cr == null ? 'the project skips a condition whose value is missing, and so does this'
          : (byPhrase ? 'a phrase-level loop' : 'not repetitive enough to be a loop')]);
      return { hit: byPhrase, conds: conds, words: words, via: byPhrase ? 'compression ratio' : null };
    }

    /* ── the recording ───────────────────────────────────────────── */
    // project constants: TARGET_SR, min_speech_duration_ms,
    // min_silence_duration_ms, speech_pad_ms, and the 300 ms replacement gap
    var AUD = {
      sr: 16000,
      frameMs: 20,
      minSpeechMs: 250,
      minSilenceMs: 2000,
      padMs: 400,
      gapMs: 300,
      floorPct: 10,        // the noise floor is the tenth percentile frame
      floorFactor: 3       // speech is a frame at least 3x that floor, about 9.5 dB up
    };
    var AUD_MAX_BYTES = 64 * 1024 * 1024;

    function decodeAudio(file) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) throw new Error('this browser has no audio decoder');
      return decodeWith(new Ctx(), file);
    }

    /* A WAV header, read straight off the first 64 kB, so the panel can report
       the rate the file was recorded at rather than the rate the browser's
       decoder happened to hand back. decodeAudioData resamples to its own
       context rate, so without this a 44.1 kHz file is reported as 48 kHz, and
       a 16 kHz file is quietly resampled twice on its way to 16 kHz. */
    function probeWav(file) {
      return file.slice(0, 65536).arrayBuffer().then(function (buf) {
        var v = new DataView(buf), i;
        var tag = function (o, s) {
          for (var k = 0; k < s.length; k++) if (v.getUint8(o + k) !== s.charCodeAt(k)) return false;
          return true;
        };
        if (buf.byteLength < 44 || !tag(0, 'RIFF') || !tag(8, 'WAVE')) return null;
        var rate = 0, channels = 0, dataBytes = null;
        i = 12;
        while (i + 8 <= buf.byteLength) {
          var size = v.getUint32(i + 4, true);
          if (tag(i, 'fmt ')) {
            channels = v.getUint16(i + 10, true);
            rate = v.getUint32(i + 12, true);
          } else if (tag(i, 'data')) {
            dataBytes = size;
            break;
          }
          i += 8 + size + (size % 2);
        }
        if (!rate) return null;
        return { rate: rate, channels: channels, dataBytes: dataBytes };
      }).catch(function () { return null; });
    }

    // decode at a given rate where the browser will allow it, so a file that is
    // already at 16 kHz is not resampled on the way in
    function decodeAudioAt(file, rate) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return decodeAudio(file);
      if (rate) {
        try { return decodeWith(new Ctx({ sampleRate: rate }), file); }
        catch (e) { /* the browser refused that rate, fall through */ }
      }
      return decodeAudio(file);
    }

    function decodeWith(ctx, file) {
      return file.arrayBuffer().then(function (buf) {
        return new Promise(function (res, rej) {
          // the callback form is the one every browser still honours
          var p = ctx.decodeAudioData(buf, res, function () {
            rej(new Error('the audio could not be decoded'));
          });
          if (p && p.then) p.then(res, rej);
        });
      }).then(function (audio) {
        if (ctx.close) ctx.close();
        return audio;
      }, function (e) {
        if (ctx.close) ctx.close();
        throw e;
      });
    }

    // "convert to mono 16 kHz", done by the browser's own resampler
    function to16k(audio) {
      var frames = Math.max(1, Math.ceil(audio.duration * AUD.sr));
      var Off = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!Off) throw new Error('this browser cannot resample audio');
      var off = new Off(1, frames, AUD.sr);
      var src = off.createBufferSource();
      src.buffer = audio;
      src.connect(off.destination);
      src.start();
      return off.startRendering().then(function (rendered) {
        return rendered.getChannelData(0);
      });
    }

    function rmsFrames(samples) {
      var hop = Math.round(AUD.sr * AUD.frameMs / 1000);
      var n = Math.max(1, Math.floor(samples.length / hop));
      var out = new Float64Array(n), i, j, s;
      for (i = 0; i < n; i++) {
        s = 0;
        for (j = 0; j < hop; j++) {
          var v = samples[i * hop + j];
          s += v * v;
        }
        out[i] = Math.sqrt(s / hop);
      }
      return out;
    }

    function percentile(arr, p) {
      if (!arr.length) return 0;
      var sorted = Float64Array.from(arr).sort();
      var idx = Math.min(sorted.length - 1, Math.max(0, Math.round((p / 100) * (sorted.length - 1))));
      return sorted[idx];
    }

    function db(x) { return x > 0 ? 20 * Math.log10(x) : -100; }

    /* The energy gate. Silero is a trained network and this is not, so the
       panel names it an energy gate and reports the level it split on. The
       four thresholds around it are the project's own. */
    function gate(samples) {
      var rms = rmsFrames(samples);
      var frameS = AUD.frameMs / 1000;
      var total = samples.length / AUD.sr;
      var floor = percentile(rms, AUD.floorPct);
      var peak = percentile(rms, 99);
      var cut = floor * AUD.floorFactor;
      // a frame is speech when it clears the floor. If the recording is so
      // quiet that nothing clears it, say so rather than inventing a split.
      var isSpeech = [], any = false;
      for (var i = 0; i < rms.length; i++) {
        var v = rms[i] > cut;
        isSpeech.push(v);
        if (v) any = true;
      }
      var runs = [], start = -1;
      for (i = 0; i <= isSpeech.length; i++) {
        if (i < isSpeech.length && isSpeech[i]) { if (start < 0) start = i; }
        else if (start >= 0) { runs.push([start * frameS, i * frameS]); start = -1; }
      }
      // min_speech_duration_ms: a blip is not a word
      var minSpeech = AUD.minSpeechMs / 1000;
      runs = runs.filter(function (r) { return r[1] - r[0] >= minSpeech; });
      // speech_pad_ms: pad so a word is not cut at its own boundary
      var pad = AUD.padMs / 1000;
      runs = runs.map(function (r) {
        return [Math.max(0, r[0] - pad), Math.min(total, r[1] + pad)];
      }).sort(function (a, b) { return a[0] - b[0]; });
      // the pad can make neighbours overlap, so merge after padding
      var merged = [];
      runs.forEach(function (r) {
        var last = merged[merged.length - 1];
        if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
        else merged.push([r[0], r[1]]);
      });

      // the trim rule: only silences of min_silence_duration_ms or more are
      // cut, and each is cut to a 300 ms gap, so natural pauses survive
      var minSil = AUD.minSilenceMs / 1000;
      var gap = AUD.gapMs / 1000;
      var cuts = [], prevEnd = 0, kept = 0, keptCount = 0;
      var silences = [];
      merged.forEach(function (r) {
        var silent = r[0] - prevEnd;
        if (silent > 0) silences.push([prevEnd, r[0]]);
        prevEnd = Math.max(prevEnd, r[1]);
      });
      if (total - prevEnd > 0) silences.push([prevEnd, total]);
      silences.forEach(function (s) {
        var len = s[1] - s[0];
        if (len >= minSil) cuts.push([s[0], s[1]]);
        else { kept += len; keptCount++; }
      });
      // With no speech at all there is no boundary to trim against, and an
      // energy gate cannot tell a silent file from one it simply failed to
      // read. Proposing to cut the whole recording would be pretending to a
      // measurement that was never made, so it proposes nothing.
      if (!any) cuts = [];
      var speechTotal = merged.reduce(function (acc, r) { return acc + (r[1] - r[0]); }, 0);
      var removed = cuts.reduce(function (acc, c) { return acc + (c[1] - c[0]) - gap; }, 0);
      var longestSil = silences.reduce(function (m, s) { return Math.max(m, s[1] - s[0]); }, 0);
      return {
        rms: rms, floor: floor, cut: cut, peak: peak, frameS: frameS,
        speech: merged, silences: silences, cuts: cuts,
        speechTotal: speechTotal, removed: removed, longestSil: longestSil,
        kept: kept, keptCount: keptCount,
        found: any, total: total,
        trimmed: Math.max(0, total - removed),
        floorDb: db(floor), speechDb: db(percentile(rms, 90))
      };
    }

    function wavePath(samples, W, H) {
      var mid = H / 2;
      var amp = mid - 6;
      // normalise to the loud end rather than the absolute peak, so one click
      // does not flatten the rest of the recording
      var peak = 0, i;
      var step = Math.max(1, Math.floor(samples.length / 4000));
      for (i = 0; i < samples.length; i += step) {
        var a = Math.abs(samples[i]);
        if (a > peak) peak = a;
      }
      if (!peak) peak = 1;
      var d = [], cols = Math.min(W, 1000);
      var per = samples.length / cols;
      for (i = 0; i < cols; i++) {
        var from = Math.floor(i * per), to = Math.min(samples.length, Math.floor((i + 1) * per));
        if (to <= from) to = from + 1;
        var lo = 1, hi = -1;
        for (var j = from; j < to; j++) {
          var v = samples[j];
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        }
        if (hi < lo) { lo = 0; hi = 0; }
        var x = (i + 0.5) * (W / cols);
        var y1 = mid - (hi / peak) * amp;
        var y2 = mid - (lo / peak) * amp;
        if (y2 - y1 < 1) { y1 -= 0.5; y2 += 0.5; }
        d.push('M' + x.toFixed(1) + ' ' + y1.toFixed(1) + 'L' + x.toFixed(1) + ' ' + y2.toFixed(1));
      }
      return d.join('');
    }

    var audDrop = $('#ownAudioDrop');
    var audInput = $('#ownAudio');
    var audBody = $('#ownAudioBody');
    var audCap = $('#ownAudioCap');
    var audFacts = $('#ownAudioFacts');
    var waveEl = $('#ownWave');
    var hypEl = $('#ownHyp');
    var refEl = $('#ownRef');
    var lpEl = $('#ownLp');
    var crEl = $('#ownCr');
    var scoreBtn = $('#ownScore');
    var scoreOut = $('#ownScoreOut');

    function audNote(msg, bad) {
      if (!audFacts) return;
      audFacts.innerHTML = '<p class="bring__gap' + (bad ? ' is-bad' : '') + '">' + esc(msg) + '</p>';
      if (audBody) audBody.hidden = false;
      if (waveEl) waveEl.innerHTML = '';
    }

    function numOrNull(el) {
      if (!el) return null;
      var v = String(el.value).trim();
      if (!v) return null;
      var n = Number(v);
      return isFinite(n) ? n : null;
    }

    function kb(bytes) { return (bytes / 1024).toFixed(0) + ' KB'; }

    // the channel/rate line, labelled for what it actually is: a WAV header is
    // read, anything else is whatever rate the browser's decoder returned
    function formatOf(f) {
      var ch = f.channels === 1 ? 'mono' : f.channels + ' channels';
      if (f.known) return ['Source format', f.rate + ' Hz · ' + ch];
      return ['Decoded at', f.rate + ' Hz · ' + ch + ' (the browser decoder does not report the file\'s own rate)'];
    }

    function renderAudio(f, g) {
      var fmt = formatOf(f);
      var facts = [
        ['Your file', f.name],
        ['Duration', g.total.toFixed(1) + ' s'],
        fmt,
        ['Measured at', AUD.sr + ' Hz mono'],
        ['Noise floor', !g.found ? 'no measurable floor' : (g.floor === 0 ? 'digital silence' : g.floorDb.toFixed(1) + ' dBFS')],
        ['Speech level', g.found ? g.speechDb.toFixed(1) + ' dBFS' : 'not measured'],
        ['Speech', g.found ? (g.speechTotal / g.total * 100).toFixed(1) + '% · ' + g.speech.length + ' runs' : 'none found'],
        ['Longest silence', g.longestSil.toFixed(1) + ' s'],
        ['Silences 2 s or more', g.cuts.length ? String(g.cuts.length) + ' to cut' : 'none'],
        ['Pauses left standing', g.keptCount ? String(g.keptCount) + ' under 2 s, ' + g.kept.toFixed(1) + ' s kept' : 'none'],
        ['After the trim rule', g.total.toFixed(1) + ' s to ' + g.trimmed.toFixed(1) + ' s'],
        ['As a 16 kHz WAV', kb(f.size) + ' to about ' + kb(44 + g.trimmed * AUD.sr * 2)]
      ];
      var html = '<div class="forge__facts">' + facts.map(function (x) {
        return '<div class="fact"><span class="fact__k">' + esc(x[0]) + '</span>' +
          '<span class="fact__v mono">' + esc(x[1]) + '</span></div>';
      }).join('') + '</div>';

      var ok = g.found && !!g.cuts.length;
      html += '<div class="verdict verdict--' + (ok ? 'ok' : 'bad') + '" style="margin-top:1rem">' +
        '<span class="verdict__word">' + (!g.found ? 'No split' : (g.cuts.length ? 'Cuttable' : 'Already tight')) + '</span>' +
        '<span class="verdict__msg">' + (!g.found
          ? 'Nothing in this recording clears the noise floor by the margin this gate asks for, so there is no speech boundary to trim against. An energy gate cannot tell a silent recording from one it failed to read, and it says so rather than guessing at a split.'
          : (g.cuts.length
            ? g.cuts.length + ' silence' + (g.cuts.length === 1 ? '' : 's') + ' of two seconds or more would be cut down to a 300 ms gap, taking ' + g.removed.toFixed(1) + ' s out of ' + g.total.toFixed(1) + ' s.'
            : 'Every silence in this recording is shorter than the two second bar, so the trim rule leaves all of it standing. Natural pauses survive by design.')) +
        '</span></div>';

      var stages = [
        ['Convert to mono 16 kHz', 'done above',
          'the same target rate and the same downmix the project does with torchaudio', true],
        ['Voice activity detection', 'not Silero VAD',
          'Silero is a trained network this page does not carry. An energy gate stands in for it, and the numbers above say which gate ran', null],
        ['Trim long silences', 'runs above',
          'only silences of two seconds or more, each cut to a 300 ms gap, so natural pauses survive', true],
        ['Transcribe', 'not run here',
          'Whisper is a model, not a browser API. Paste what a recogniser returned into the boxes below', null],
        ['Score against the reference', 'runs below',
          'the project own tokeniser and edit distance, over whatever you paste', true],
        ['Audit for the repetition loop', 'runs below',
          'the three conditions from hallucination_ops, with each one shown', true]
      ];
      html += '<ul class="repair__steps bring__stages">' + stages.map(function (s) {
        return '<li><span class="mono">' + esc(s[0]) + '</span>' +
          '<span class="repair__r' + (s[3] ? ' is-ok' : '') + '">' + esc(s[1]) +
          '<span class="bring__why">' + esc(s[2]) + '</span></span></li>';
      }).join('') + '</ul>';
      return html;
    }

    function drawWave(samples, g, f) {
      if (!waveEl) return;
      var W = 1000, H = 116;
      var title = 'Waveform of ' + f.name + ', ' + g.total.toFixed(1) +
        ' seconds at ' + AUD.sr + ' Hz mono, with ' + g.cuts.length +
        ' silence' + (g.cuts.length === 1 ? '' : 's') + ' of two seconds or more marked';
      // the title is rebuilt with the rest: the svg is labelled by it, and
      // assigning innerHTML discards every child including that title
      var out = '<title id="ownWaveT">' + esc(title) + '</title>';
      // the silences the trim rule would cut, marked behind the waveform
      g.cuts.forEach(function (c) {
        var x = (c[0] / g.total) * W, w = Math.max(2, ((c[1] - c[0]) / g.total) * W);
        out += '<rect x="' + x.toFixed(1) + '" y="0" width="' + w.toFixed(1) +
          '" height="' + H + '" fill="rgba(208,64,44,.16)"/>';
      });
      out += '<line x1="0" y1="' + (H / 2) + '" x2="' + W + '" y2="' + (H / 2) +
        '" stroke="rgba(239,231,211,.18)" stroke-width="1"/>';
      out += '<path d="' + wavePath(samples, W, H) +
        '" stroke="#E3A93C" stroke-width="1.6" fill="none" vector-effect="non-scaling-stroke"/>';
      waveEl.innerHTML = out;
    }

    function renderScore() {
      if (!scoreOut) return;
      var hyp = hypEl ? hypEl.value : '';
      var ref = refEl ? refEl.value : '';
      if (!String(hyp).trim() && !String(ref).trim()) {
        scoreOut.innerHTML = '<p class="bring__gap">Nothing to score yet. Paste a transcript ' +
          'into the left box, and the reference into the right if you have one.</p>';
        return;
      }
      var w = werParts(hyp, ref), c = cerParts(hyp, ref);
      var facts = [];
      function row(k, v, dim) {
        facts.push('<div class="fact"><span class="fact__k">' + esc(k) + '</span>' +
          '<span class="fact__v mono' + (dim ? ' is-dim' : '') + '">' + esc(v) + '</span></div>');
      }
      var wv = w && !w.tooLong ? (w.edits / w.refLen) : null;
      var cv = c && !c.tooLong ? (c.edits / c.refLen) : null;
      row('Word error', wv == null ? 'not scored' : (wv * 100).toFixed(2) + '%', wv == null);
      row('Word edits', w && !w.tooLong ? w.edits + ' over ' + w.refLen + ' reference words' : 'nothing to compare', !w);
      row('Character error', cv == null ? 'not scored' : (cv * 100).toFixed(2) + '%', cv == null);
      row('Character edits', c && !c.tooLong ? c.edits + ' over ' + c.refLen + ' reference characters' : 'nothing to compare', !c);
      var html = '<div class="forge__facts" style="margin-top:1rem">' + facts.join('') + '</div>';

      if ((w && w.tooLong) || (c && c.tooLong)) {
        html += '<p class="bring__gap">The two texts are too long to align here. The project ' +
          'does this with a compiled library; this page does it in JavaScript and stops at ' +
          'roughly a quarter of a billion cell comparisons, which a transcript of this length ' +
          'would blow past.</p>';
      }

      var hall = halluFor(hyp, numOrNull(lpEl), numOrNull(crEl));
      html += '<ul class="repair__steps bring__stages">' + hall.conds.map(function (x) {
        return '<li><span class="mono">' + esc(x[0]) + '</span>' +
          '<span class="repair__r' + (x[2] ? ' is-ok' : '') + '">' + esc(x[1]) +
          '<span class="bring__why">' + esc(x[3]) + '</span></span></li>';
      }).join('') + '</ul>';

      var tail = '';
      if (hall.hit) {
        tail = 'This text clears every condition the rule asks for, by ' + esc(hall.via) +
          '. The rule exists because a confident, repetitive segment is the signature of a ' +
          'recogniser inventing words, and this is that signature.';
      } else if (hall.words.length < HAL.minWords) {
        tail = 'At ' + hall.words.length + ' word' + (hall.words.length === 1 ? '' : 's') +
          ' this is under the four the rule needs, so it is not judged either way.';
      } else {
        tail = 'Not a repetition loop by this rule. Something can be wrong with a transcript ' +
          'without being a hallucination, and the rule is deliberately narrow enough to tell ' +
          'those two apart.';
      }
      html += '<div class="verdict verdict--' + (hall.hit ? 'bad' : 'ok') + '" style="margin-top:1rem">' +
        '<span class="verdict__word">' + (hall.hit ? 'Repetitive' : 'Not a loop') + '</span>' +
        '<span class="verdict__msg">' + tail + '</span></div>';
      scoreOut.innerHTML = html;
      sound.chime();
    }

    function takeAudio(file) {
      if (!file || !audFacts) return;
      if (!/^audio\//.test(file.type) && !/\.(wav|mp3|m4a|aac|ogg|oga|opus|flac|webm|aiff?)$/i.test(file.name)) {
        audNote('That is not audio. Give it a WAV, an MP3, an M4A, an OGG or a FLAC.', true);
        return;
      }
      if (file.size > AUD_MAX_BYTES) {
        audNote('That file is ' + kb(file.size) + ', past the 64 MB this panel will decode in a ' +
          'tab. A recording that long is better off in the project itself.', true);
        return;
      }
      audNote('Decoding ' + file.name + ', ' + kb(file.size) + '.');
      probeWav(file).then(function (hdr) {
        return decodeAudioAt(file, hdr && hdr.rate).then(function (audio) {
          var f = {
            name: file.name, size: file.size,
            rate: audio.sampleRate, channels: audio.numberOfChannels,
            duration: audio.duration, known: !!(hdr && hdr.rate === audio.sampleRate)
          };
          return to16k(audio).then(function (samples) {
            if (!samples.length) throw new Error('the recording decoded to no samples at all');
            var g = gate(samples);
            if (audCap) {
              var ch = f.channels === 1 ? 'mono' : f.channels + ' channels';
              audCap.textContent = file.name + ' · ' + f.duration.toFixed(1) + ' s · ' +
                f.rate + ' Hz · ' + ch;
            }
            audFacts.innerHTML = renderAudio(f, g);
            drawWave(samples, g, f);
            if (audBody) audBody.hidden = false;
            sound.chime();
          });
        });
      }).catch(function (e) {
        audNote('That file did not decode: ' + (e && e.message ? e.message : e) +
          '. Some codecs, and most video containers, are not decodable in a browser tab.', true);
      });
    }

    if (audInput) {
      audInput.addEventListener('change', function () {
        if (audInput.files && audInput.files[0]) takeAudio(audInput.files[0]);
      });
    }
    if (audDrop) {
      ['dragenter', 'dragover'].forEach(function (ev) {
        audDrop.addEventListener(ev, function (e) {
          e.preventDefault();
          audDrop.classList.add('is-over');
        });
      });
      ['dragleave', 'dragend'].forEach(function (ev) {
        audDrop.addEventListener(ev, function () { audDrop.classList.remove('is-over'); });
      });
      audDrop.addEventListener('drop', function (e) {
        e.preventDefault();
        audDrop.classList.remove('is-over');
        var dt = e.dataTransfer;
        if (dt && dt.files && dt.files[0]) takeAudio(dt.files[0]);
      });
    }
    if (scoreBtn) scoreBtn.addEventListener('click', renderScore);
    [hypEl, refEl, lpEl, crEl].forEach(function (el) {
      if (!el) return;
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          renderScore();
        }
      });
    });

    // the scoring port is checkable from the console, the same way the gate is
    window.CULT_SCORE = {
      words: WORD_RE, chars: CHAR_RE, tokenize: tokenize, cerText: cerText,
      lev: lev, wer: werParts, cer: cerParts, hallucination: halluFor, thresholds: HAL
    };

    selectCall(0);
  })();

  /* ─────────────────────────────────────────────────────────────
     14 · TOGGLE THE FOLLOWERS
     ───────────────────────────────────────────────────────────── */
  (function cultToggle() {
    var btn = $('#cultTog');
    var section = $('.grounds');
    if (!btn || !section) return;
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
      section.classList.toggle('is-hidden', on);
      btn.title = on ? 'The followers are resting' : 'Toggle the followers';
    });
  })();

  /* ─────────────────────────────────────────────────────────────
     15 · THE REVELATION: click the crown five times, or type PRAISE
     ───────────────────────────────────────────────────────────── */
  (function revelation() {
    var egg = $('#egg');
    if (!egg) return;
    var closeBtn = $('#eggClose');
    var eggNum = $('#eggNum');
    var navBrand = $('.nav__brand');
    var groundsCrown = $('.grounds__crown');

    var presses = 0;
    var lastPress = 0;
    var open = false;
    var lastFocus = null;

    function show() {
      if (open) return;
      open = true;
      lastFocus = document.activeElement;
      if (eggNum) eggNum.textContent = String(Math.floor(100 + Math.random() * 899));
      egg.hidden = false;
      sound.chime();
      if (!reduced) {
        var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        burst(cx, cy);
        setTimeout(function () { burst(cx - 140, cy + 40); }, 130);
        setTimeout(function () { burst(cx + 140, cy + 40); }, 260);
      }
      if (closeBtn) closeBtn.focus();
    }

    function hide() {
      open = false;
      egg.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function press() {
      var now = Date.now();
      presses = now - lastPress > 1400 ? 1 : presses + 1;
      lastPress = now;
      if (navBrand) {
        navBrand.classList.remove('is-praised');
        void navBrand.offsetWidth;
        navBrand.classList.add('is-praised');
      }
      sound.hop();
      if (presses >= 5) { presses = 0; show(); }
    }

    if (navBrand) navBrand.addEventListener('click', press);
    if (groundsCrown) {
      groundsCrown.style.cursor = 'pointer';
      groundsCrown.addEventListener('click', press);
    }
    if (closeBtn) closeBtn.addEventListener('click', hide);

    egg.addEventListener('click', function (e) { if (e.target === egg) hide(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) hide();
    });

    // type PRAISE
    var typed = '';
    document.addEventListener('keydown', function (e) {
      if (open || e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (!e.key || e.key.length !== 1) return;
      typed = (typed + e.key.toUpperCase()).slice(-6);
      if (typed === 'PRAISE') { typed = ''; show(); }
    });
  })();

  /* ─────────────────────────────────────────────────────────────
     16 · HOUSEKEEPING
     ───────────────────────────────────────────────────────────── */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Anchor links: close the egg if it is open, and let CSS handle smoothing.
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var egg = $('#egg');
      if (egg && !egg.hidden) { egg.hidden = true; }
    });
  });

})();
