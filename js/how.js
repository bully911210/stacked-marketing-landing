/* How it works: one stage travels through four states (ad, page, WhatsApp, the hand-off).
   Desktop: the stage is pinned and scrubbed by scroll progress on the track.
   Tablet and mobile: each step gets its own copy of the stage, framed to what that step
   needs, which plays its part once on enter.
   Reduced motion: each copy is frozen on the frame that tells its step. */
(function () {
  "use strict";
  var S = window.Stacked;
  var root = document.getElementById("how");
  if (!root || !S) return;
  var stageEl = root.querySelector("[data-how-stage]");
  var track = root.querySelector("[data-how-track]");
  var view = root.querySelector(".how__view");
  var steps = Array.prototype.slice.call(root.querySelectorAll(".how__step"));
  if (!stageEl || !track || !view || steps.length !== 4) { console.error("[how] section markup is incomplete"); return; }

  var W = 620, H = 680;
  var B = [0, 0.2, 0.49, 0.745, 1];              // step boundaries on the pinned track
  var STILL = [0.105, 0.485, 0.745, 1];          // reduced motion: the frame that tells each step
  var FROM = [0, 0.18, 0.49, 0.86];              // list: where each step's copy starts playing
  var TO = [0.18, 0.485, 0.745, 1];              // and where it comes to rest (taps are gone by then)
  var PLAY = [2400, 3400, 3000, 1500];           // list: ms each step takes to play
  var CROP = [                                    // list: the part of the stage each step shows
    { x: 70, y: 26, w: 480, h: 628 }, { x: 70, y: 26, w: 480, h: 628 },
    { x: 60, y: 26, w: 500, h: 628 }, { x: 282, y: 222, w: 330, h: 212 }
  ];
  var FULL = { x: 0, y: 10, w: 620, h: 660 };    // wide list (reduced motion): the whole stage
  var SHOT_H = 440;                               // narrow list: no phone taller than this
  /* phone poses: ad, page, chat, then set back so the hot lead can come to the front */
  var POSE = [{ x: 8, y: 4, s: 1, r: -3 }, { x: 0, y: -4, s: 1, r: 1.5 }, { x: 6, y: 0, s: 1, r: -1.5 }, { x: -58, y: 12, s: 0.9, r: -4 }];
  var BORN = { x: 194, y: 506, s: 0.8, r: -1.5 }; // the hot-lead card lifts off the hand-off message
  var FRONT = { x: 312, y: 268, s: 1, r: -2 };   // and comes to rest in front of the phone

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function seg(p, a, b) { return clamp((p - a) / (b - a)); }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  function eio(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function mix(a, b, t) { return a + (b - a) * t; }
  function pose(a, b, t) { return { x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), s: mix(a.s, b.s, t), r: mix(a.r, b.r, t) }; }
  function tf(el, x, y, s, r) { el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) scale(" + s.toFixed(4) + ") rotate(" + r.toFixed(2) + "deg)"; }
  function op(el, o) { el.style.opacity = o.toFixed(3); }
  function offsetIn(el, anc) {
    var x = 0, y = 0, n = el;
    while (n && n !== anc) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x: x, y: y };
  }

  /* One stage instance: finds its parts, measures once, renders any progress p. */
  function Stage(el) {
    function q(k) { return el.querySelector('[data-k="' + k + '"]'); }
    var n = {
      glowB: q("glowB"), glowG: q("glowG"), phone: q("phone"),
      feed: q("feed"), feedIn: q("feedIn"), ad: q("ad"), vA: q("vA"), vB: q("vB"), tap1: q("tap1"), press1: q("press1"),
      land: q("land"), landIn: q("landIn"), hero: q("hero"), submit: q("submit"), press2: q("press2"), tap2: q("tap2"),
      chat: q("chat"), pixel: q("pixel"), card: q("card"), lab0: q("lab0"), lab1: q("lab1"), cring: q("cring"), tick: q("tick")
    };
    var missing = Object.keys(n).filter(function (k) { return !n[k]; });
    if (missing.length) { console.error("[how] stage parts missing: " + missing.join(", ")); return null; }
    n.load = n.landIn.querySelector(".how__load");
    n.fields = [0, 1, 2].map(function (i) {
      var f = q("f" + i);
      return { fill: f.querySelector(".how__fill"), ring: f.querySelector(".how__ring"), ok: f.querySelector(".how__ok") };
    });
    n.msgs = [0, 1, 2, 3].map(function (i) { return el.querySelector('[data-m="' + i + '"]'); });
    var m = null;

    function measure() {
      if (!n.ad.offsetHeight) return false;
      var sw = n.feed.offsetWidth, sh = n.feed.offsetHeight;
      var adTop = n.ad.offsetTop, adH = n.ad.offsetHeight, adL = n.ad.offsetLeft, adW = n.ad.offsetWidth;
      var shift = Math.round(adTop + adH / 2 - sh / 2);
      var top = adTop - shift, img = n.ad.querySelector(".ad__img");
      var sub = offsetIn(n.submit, n.landIn);
      m = {
        shift: shift,
        ad: { t: top, r: sw - adL - adW, b: sh - top - adH, l: adL },
        dy0: top + (img ? img.offsetTop : 54) - n.hero.offsetTop,
        sub: { x: sub.x + n.submit.offsetWidth / 2, y: sub.y + n.submit.offsetHeight / 2 }
      };
      return true;
    }

    function tap(el, p, a, b) {
      var o = seg(p, a, a + 0.015) * (1 - seg(p, b - 0.02, b));
      var press = Math.sin(Math.PI * seg(p, a + 0.02, a + 0.05));
      var r = seg(p, a + 0.03, b);
      el.style.opacity = o.toFixed(3);
      el.style.transform = "scale(" + (1 - 0.18 * press).toFixed(3) + ")";
      var ring = el.firstElementChild;
      ring.style.opacity = (r > 0 ? 0.8 * (1 - r) : 0).toFixed(3);
      ring.style.transform = "scale(" + mix(0.8, 2.6, eo(r)).toFixed(3) + ")";
    }
    function msg(el, on) {
      var shown = el.classList.contains("is-shown");
      if (on && !shown) { el.classList.add("is-shown"); void el.offsetWidth; el.classList.add("is-on"); }
      else if (!on && shown) el.classList.remove("is-shown", "is-on");
    }
    /* a test version is flicked out of the ad slot, off the side of the screen */
    function flick(el, t) {
      var e = eio(t);
      el.style.transform = "translate3d(" + (-300 * e).toFixed(1) + "px," + (-14 * e).toFixed(1) + "px,0) rotate(" + (-9 * e).toFixed(2) + "deg)";
      op(el, 1 - seg(t, 0.55, 1));
    }

    function render(p, ptr) {
      if (!m && !measure()) return;
      var px = ptr ? ptr.x : 0, py = ptr ? ptr.y : 0;
      function dx(d) { return px * 16 * d; }
      function dy(d) { return py * 12 * d; }

      op(n.glowB, 1 - 0.65 * seg(p, 0.5, 0.62));
      op(n.glowG, seg(p, 0.5, 0.62));

      /* 1. the ad: the feed scrolls, two test versions are flicked away, the winner gets tapped */
      flick(n.vA, seg(p, 0.03, 0.068));
      flick(n.vB, seg(p, 0.07, 0.108));
      var a = eio(seg(p, 0.19, 0.3)), b = eio(seg(p, 0.495, 0.565)), c = eio(seg(p, 0.755, 0.855));
      var ph = pose(pose(pose(POSE[0], POSE[1], a), POSE[2], b), POSE[3], c);
      tf(n.phone, ph.x + dx(0.7), ph.y + dy(0.7), ph.s, ph.r);
      n.feedIn.style.transform = "translate3d(0," + (-m.shift * eo(seg(p, 0, 0.11))).toFixed(1) + "px,0)";
      /* the feed sinks back as the page opens over it; it only disappears once it is covered */
      tf(n.feed, 0, 0, 1 - 0.06 * a, 0); op(n.feed, 1 - seg(p, 0.28, 0.295));
      tap(n.tap1, p, 0.11, 0.18);
      op(n.press1, Math.sin(Math.PI * seg(p, 0.135, 0.175)));

      /* 2. the ad opens into the page, the form fills, the enquiry is sent */
      var lm = eio(seg(p, 0.19, 0.29)), ad = m.ad;
      op(n.land, seg(p, 0.185, 0.2));
      n.land.style.clipPath = "inset(" + mix(ad.t, 0, lm).toFixed(1) + "px " + mix(ad.r, 0, lm).toFixed(1) + "px " +
        mix(ad.b, 0, lm).toFixed(1) + "px " + mix(ad.l, 0, lm).toFixed(1) + "px round " + mix(18, 40, lm).toFixed(1) + "px)";
      tf(n.landIn, 0, mix(m.dy0, 0, lm), 1 - 0.04 * b, 0);
      n.load.style.transform = "scaleX(" + eo(seg(p, 0.2, 0.3)).toFixed(3) + ")";
      op(n.load, 1 - seg(p, 0.3, 0.33));
      n.fields.forEach(function (f, i) {
        var s0 = 0.305 + i * 0.045, s1 = s0 + 0.035, t = seg(p, s0, s1);
        f.fill.style.transform = "scaleX(" + (Math.round(t * 9) / 9).toFixed(3) + ")";
        op(f.ring, seg(p, s0 - 0.008, s0) * (1 - seg(p, s1, s1 + 0.008)));
        op(f.ok, seg(p, s1, s1 + 0.008));
      });
      tap(n.tap2, p, 0.435, 0.48);
      op(n.press2, Math.sin(Math.PI * seg(p, 0.455, 0.48)));
      var ti = eo(seg(p, 0.455, 0.48)), to = seg(p, 0.54, 0.58);
      tf(n.pixel, dx(1.1), mix(18, 0, ti) - 14 * to + dy(1.1), mix(0.96, 1, ti), 0); op(n.pixel, ti * (1 - to));

      /* 3. the enquiry opens WhatsApp: the reply is already there, a qualifying question, a hand-off */
      op(n.chat, p >= 0.495 ? 1 : 0);
      n.chat.style.clipPath = "circle(" + mix(0, 720, b).toFixed(1) + "px at " + m.sub.x.toFixed(1) + "px " + m.sub.y.toFixed(1) + "px)";
      msg(n.msgs[0], p >= 0.54);
      msg(n.msgs[1], p >= 0.58 && p < 0.62);
      msg(n.msgs[2], p >= 0.62);
      msg(n.msgs[3], p >= 0.655);

      /* 4. the hot lead leaves the chat, comes to the front as the phone steps back, and becomes a customer */
      var cm = eio(seg(p, 0.755, 0.855));
      var cur = pose(BORN, FRONT, cm), cp = 0.4 + 0.7 * cm;
      tf(n.card, cur.x + dx(cp), cur.y + dy(cp), cur.s, cur.r); op(n.card, seg(p, 0.755, 0.77));
      var sw0 = seg(p, 0.88, 0.895), sw1 = seg(p, 0.897, 0.915);   /* one label leaves before the other arrives */
      op(n.lab0, 1 - sw0); n.lab0.style.transform = "translate3d(0," + (-8 * eo(sw0)).toFixed(1) + "px,0)";
      op(n.lab1, sw1); n.lab1.style.transform = "translate3d(0," + (8 * (1 - eo(sw1))).toFixed(1) + "px,0)";
      op(n.cring, eo(seg(p, 0.875, 0.905)));
      var tk = eo(seg(p, 0.9, 0.935));
      op(n.tick, tk); n.tick.style.transform = "scale(" + mix(0.3, 1, tk).toFixed(3) + ")";
    }
    return { render: render };
  }

  var main = Stage(stageEl);
  if (!main) return;
  var mq = matchMedia("(min-width: 961px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)");
  var wideMq = matchMedia("(min-width: 961px)");
  var shots = null;

  function fitMain() {
    var k = Math.min(1, view.clientHeight / H, (view.clientWidth + 60) / W);
    if (k > 0) stageEl.style.transform = "scale(" + k.toFixed(4) + ")";
  }

  /* Pinned: progress on the track drives the stage and the step list. */
  var lastIdx = -1;
  function setSteps(p) {
    var idx = p < B[1] ? 0 : p < B[2] ? 1 : p < B[3] ? 2 : 3;
    steps.forEach(function (li, i) {
      var fill = li.querySelector(".how__line i");
      if (fill) fill.style.transform = "scaleY(" + seg(p, B[i], B[i + 1]).toFixed(3) + ")";
      if (idx === lastIdx) return;
      li.classList.toggle("is-active", i === idx);
      li.classList.toggle("is-done", i < idx);
    });
    lastIdx = idx;
  }
  var lastKey = "";
  S.onFrame(function () {
    if (!mq.matches) return;
    var r = track.getBoundingClientRect();
    if (r.bottom < -80 || r.top > innerHeight + 80) return;
    var p = S.progress(track), ptr = S.fine ? S.pointer : null;
    var key = p.toFixed(4) + (ptr ? "," + ptr.x.toFixed(3) + "," + ptr.y.toFixed(3) : "");
    if (key === lastKey) return;
    lastKey = key;
    main.render(p, ptr);
    setSteps(p);
  });

  /* List: one copy of the stage per step, framed to what that step needs. */
  function play(shot) {
    shot.li.classList.add("is-lit");
    var a = FROM[shot.i], b = TO[shot.i], dur = PLAY[shot.i], t0 = performance.now() + 250;
    var off = S.onFrame(function (t) {
      var k = clamp((t - t0) / dur);
      shot.st.render(mix(a, b, k), null);
      if (k >= 1) off();
    });
  }
  function cropFor(i, wide) { return i === 3 ? CROP[3] : wide ? FULL : CROP[i]; }
  /* Scale each copy to its column, but never past its own size, never taller than the
     screen allows, and on narrow screens never a phone taller than SHOT_H. */
  function fitShots() {
    if (!shots) return;
    var wide = wideMq.matches;
    /* narrow: 80% of the height, so a phone held sideways still fits below the fixed nav */
    var capH = wide ? innerHeight * 0.86 : Math.min(SHOT_H, innerHeight * 0.8);
    shots.forEach(function (s) {
      var c = cropFor(s.i, wide), avail = s.box.clientWidth;
      if (!avail) return;
      var k = Math.min(avail / c.w, capH / c.h, s.i === 3 ? 1.1 : 1);
      s.frame.style.width = Math.round(c.w * k) + "px";
      s.frame.style.height = Math.round(c.h * k) + "px";
      s.el.style.transform = "scale(" + k.toFixed(4) + ") translate(" + (-c.x) + "px," + (-c.y) + "px)";
    });
  }
  function buildShots() {
    if (shots) return;
    shots = [];
    steps.forEach(function (li, i) {
      var box = li.querySelector(".how__shot");
      if (!box) return;
      var frame = document.createElement("div");
      frame.className = "how__frame";
      var el = stageEl.cloneNode(true);
      el.removeAttribute("data-how-stage");
      el.classList.add("how__stage--shot");
      if (i === 3) el.classList.add("how__stage--solo");       // step 3 already shows the chat phone
      if (S.reduce) el.classList.add("how__stage--still");     // a frozen frame never shows a tap mid-press
      el.style.transform = "";
      frame.appendChild(el);
      box.appendChild(frame);
      var st = Stage(el);
      if (!st) return;
      shots.push({ i: i, li: li, box: box, frame: frame, el: el, st: st });
    });
    shots.forEach(function (shot) {
      if (S.reduce) { shot.st.render(STILL[shot.i], null); shot.li.classList.add("is-lit"); return; }
      shot.st.render(FROM[shot.i], null);
      S.onceInView(shot.box, function () { play(shot); }, 0.45);
    });
  }

  /* Refit the copies only when the width changes: a mobile address bar that slides away
     changes the height mid-scroll, and the list must not jump when it does. */
  var fitW = -1;
  function layout() {
    fitMain();
    lastKey = "";
    if (mq.matches) { main.render(S.progress(track), null); setSteps(S.progress(track)); return; }
    buildShots();
    if (innerWidth !== fitW) { fitW = innerWidth; fitShots(); }
  }
  layout();
  addEventListener("resize", layout, { passive: true });
  if (mq.addEventListener) mq.addEventListener("change", function () { fitW = -1; layout(); });
  else if (mq.addListener) mq.addListener(function () { fitW = -1; layout(); });
})();
