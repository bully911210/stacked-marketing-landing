/* Stacked logo: the client's "stacked." animation, rebuilt as live SVG.
   The letterforms are the client's own, traced from the logo video (js/logo-path.js).
   Timing was matched frame by frame against that video (24 fps, cut at 3.15s):

     0.00         the solid wordmark
     0.04 - 0.74  dissolve: an ink edge sweeps left to right; behind it the letters turn into
                  hairline outlines, construction guides draw in, the dot drains to a ring
     0.74 - 1.85  blueprint hold
     1.85 - 3.05  rebuild: ink refills left to right, a green wash runs just ahead of it over "ed"
     2.60 - 3.10  green pulse: the dot fills, swells once and sends out a ring
     3.15         settled, identical to the first frame

   Every [data-logo] element gets one instance. The nav instance plays once on load, the
   footer instance plays the first time it scrolls into view, and both replay on hover
   with a mouse. Reduced motion shows the solid logo only. Without JavaScript the static
   <img> fallback inside [data-logo] stays in place.

   Test hook: ?logo_t=1.5 freezes every instance at that time (for screenshots). */
(function () {
  "use strict";
  var DATA = window.STACKED_LOGO;
  if (!DATA) { console.error("[stacked] js/logo-path.js must load before js/logo.js"); return; }

  var NS = "http://www.w3.org/2000/svg";
  var END = 3.15;
  var S = window.Stacked || null;
  var reduce = S ? S.reduce : matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = S ? S.fine : matchMedia("(hover: hover) and (pointer: fine)").matches;
  var DOT = DATA.dot;
  var GREEN_FROM = 587;          /* the wash only touches "ed": the gap after the k */
  var uid = 0;

  /* Construction guides in logo units, measured from the traced outline.
     [x1, y1, x2, y2, full] where full lines span the whole word. */
  var GUIDES = [
    [-10, 67, 950, 67, true],            /* x-height */
    [-10, 196, 950, 196, true],          /* baseline */
    [20.8, -8, 20.8, 228, true],         /* s, left edge */
    [466, -8, 466, 228, true],           /* k stem */
    [505.8, -8, 505.8, 228, true],
    [813.8, -8, 813.8, 228, true],       /* d stem */
    [853.8, -8, 853.8, 228, true],
    [118, 40.3, 218, 40.3],              /* t, top of stem */
    [118, 100.8, 218, 100.8],            /* t, under the crossbar */
    [128.5, 56, 128.5, 112],             /* t, crossbar ends */
    [206.5, 56, 206.5, 112],
    [262, 116, 340, 116],                /* a, top of the bowl */
    [604.7, 15, 476.3, 190],             /* k, arm */
    [501.9, 95, 585.5, 225],             /* k, leg */
    [580, 143.3, 716, 143.3],            /* e, bar */
    [846, 147.9, 946, 147.9],            /* dot, top */
    [866, DOT.cy, 922, DOT.cy],          /* dot, crosshair */
    [DOT.cx, 145, DOT.cx, 201]
  ];

  /* ---- maths ------------------------------------------------------------ */
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function smooth(a, b, t) { var p = clamp01((t - a) / (b - a)); return p * p * (3 - 2 * p); }
  function easeIn(p) { p = clamp01(p); return Math.pow(p, 1.5); }
  function easeOut(p) { p = clamp01(p); return 1 - Math.pow(1 - p, 3); }
  /* the rebuild travels at a near-constant speed with soft ends, like the source */
  function sweep(p) { p = clamp01(p); return 0.85 * p + 0.15 * p * p * (3 - 2 * p); }

  /* ---- DOM ---------------------------------------------------------------- */
  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function gradient(defs, id) {
    var g = el("linearGradient", { id: id, gradientUnits: "userSpaceOnUse", x1: -1e4, y1: 0, x2: -9e3, y2: 0 }, defs);
    return { g: g, a: el("stop", { offset: 0 }, g), b: el("stop", { offset: 1 }, g) };
  }
  function maskFor(defs, id, gradId) {
    var m = el("mask", { id: id, maskUnits: "userSpaceOnUse", x: -40, y: -30, width: 1030, height: 280 }, defs);
    el("rect", { x: -40, y: -30, width: 1030, height: 280, fill: "url(#" + gradId + ")" }, m);
  }

  function build(host) {
    var p = "sl" + (++uid) + "-";
    var svg = el("svg", { viewBox: DATA.viewBox, class: "logo", "aria-hidden": "true", focusable: "false", overflow: "visible" });
    var defs = el("defs", {}, svg);
    var gf = gradient(defs, p + "gf");       /* where the ink is */
    var gl = gradient(defs, p + "gl");       /* where the outline shows: the inverse */
    maskFor(defs, p + "mf", p + "gf");
    maskFor(defs, p + "ml", p + "gl");
    var clip = el("clipPath", { id: p + "cg" }, defs);
    el("rect", { x: GREEN_FROM, y: -30, width: 420, height: 280 }, clip);

    var guides = el("g", { class: "logo__guides" }, svg);
    var lines = GUIDES.map(function (g) {
      var line = el("line", { x1: g[0], y1: g[1], x2: g[0], y2: g[1], "vector-effect": "non-scaling-stroke", opacity: 0 }, guides);
      var minX = Math.min(g[0], g[2]);
      var isDot = minX > 840;
      return {
        el: line, g: g, full: !!g[4], cx: (g[0] + g[2]) / 2,
        start: isDot ? 0.62 : 0.26 + 0.4 * clamp01(minX / 940)
      };
    });

    var greenWrap = el("g", { "clip-path": "url(#" + p + "cg)" }, svg);
    var green = el("path", { d: DATA.d, class: "logo__green", "fill-rule": "evenodd", mask: "url(#" + p + "ml)", opacity: 0 }, greenWrap);
    var inkWrap = el("g", { mask: "url(#" + p + "mf)" }, svg);
    el("path", { d: DATA.d, class: "logo__ink", "fill-rule": "evenodd" }, inkWrap);
    el("path", { d: DATA.d, class: "logo__line", "fill-rule": "evenodd", "vector-effect": "non-scaling-stroke", mask: "url(#" + p + "ml)" }, svg);

    var dot = el("g", { class: "logo__dot" }, svg);
    var ring = el("circle", { cx: DOT.cx, cy: DOT.cy, r: DOT.r, class: "logo__ring", "vector-effect": "non-scaling-stroke", opacity: 0 }, dot);
    var dotFill = el("circle", { cx: DOT.cx, cy: DOT.cy, r: DOT.r, class: "logo__dotfill" }, dot);
    var dotLine = el("circle", { cx: DOT.cx, cy: DOT.cy, r: DOT.r, class: "logo__dotline", "vector-effect": "non-scaling-stroke", opacity: 0 }, dot);

    var fallback = host.querySelector("img");
    if (fallback) fallback.remove();
    host.appendChild(svg);
    return { host: host, svg: svg, gf: gf, gl: gl, lines: lines, green: green, dot: dot, ring: ring, dotFill: dotFill, dotLine: dotLine, playing: false, last: 0 };
  }

  /* ---- one frame, as a pure function of time ------------------------------ */
  function edgeAt(t) {
    if (t <= 0.04) return { mode: "D", e: -1e4 };
    if (t < 0.74) return { mode: "D", e: lerp(-40, 1010, easeIn((t - 0.04) / 0.7)) };
    if (t < 1.85) return { mode: "D", e: 1e4 };
    if (t < 3.05) return { mode: "F", e: lerp(-40, 1000, sweep((t - 1.85) / 1.2)) };
    return { mode: "F", e: 1e4 };
  }

  function setGradient(gr, e, soft, leftOn) {
    gr.g.setAttribute("x1", (e - soft / 2).toFixed(1));
    gr.g.setAttribute("x2", (e + soft / 2).toFixed(1));
    gr.a.setAttribute("stop-color", leftOn ? "#fff" : "#000");
    gr.b.setAttribute("stop-color", leftOn ? "#000" : "#fff");
  }

  function render(inst, t) {
    var s = edgeAt(t), e = s.e, rebuild = s.mode === "F";
    var soft = rebuild ? 150 : 120;
    /* dissolve: ink stays right of the edge; rebuild: ink grows left of it. Outline is the inverse. */
    setGradient(inst.gf, e, soft, rebuild);
    setGradient(inst.gl, e, soft, !rebuild);

    /* guides draw in behind the dissolve, then clear as the ink passes them */
    inst.lines.forEach(function (L) {
      var g = L.g, o, p;
      if (!rebuild) {
        p = easeOut((t - L.start) / 0.34);
        o = p > 0 ? 1 : 0;
      } else {
        p = 1;
        o = L.full ? 1 - smooth(2.55, 2.95, t) : clamp01((L.cx - e) / 110 + 0.5);
      }
      L.el.setAttribute("x2", lerp(g[0], g[2], p).toFixed(1));
      L.el.setAttribute("y2", lerp(g[1], g[3], p).toFixed(1));
      L.el.setAttribute("opacity", o.toFixed(3));
    });

    /* green wash over "ed", ahead of the ink */
    var wash = rebuild ? (0.62 * smooth(2.4, 2.6, t) + 0.38 * smooth(2.6, 2.8, t)) * (1 - smooth(2.98, 3.08, t)) : 0;
    inst.green.setAttribute("opacity", wash.toFixed(3));

    /* the dot: drains with the dissolve, then the pulse */
    var fill, ring = 0, scale = 1, lineO;
    if (!rebuild) {
      fill = clamp01((DOT.cx - e) / 70 + 0.5);
      lineO = 1 - fill;
    } else {
      fill = 0.45 * smooth(2.6, 2.69, t) + 0.55 * smooth(2.69, 2.76, t);
      lineO = 1 - smooth(2.64, 2.76, t);
      var bp = clamp01((t - 2.7) / 0.34);
      scale = 1 + 0.2 * Math.sin(Math.PI * easeOut(bp));
      var rp = (t - 2.72) / 0.42;
      if (rp > 0 && rp < 1) {
        ring = 0.4 * (1 - rp);
        inst.ring.setAttribute("r", (DOT.r * (1 + 1.3 * easeOut(rp))).toFixed(2));
      }
    }
    inst.dotFill.setAttribute("opacity", fill.toFixed(3));
    inst.dotLine.setAttribute("opacity", lineO.toFixed(3));
    inst.ring.setAttribute("opacity", ring.toFixed(3));
    inst.dot.setAttribute("transform", scale === 1 ? "" :
      "translate(" + DOT.cx + " " + DOT.cy + ") scale(" + scale.toFixed(4) + ") translate(" + (-DOT.cx) + " " + (-DOT.cy) + ")");
    inst.t = t;
  }

  /* ---- playback ------------------------------------------------------------ */
  function play(inst) {
    if (reduce || inst.playing || frozen !== null) return;
    inst.playing = true;
    var t0 = performance.now(), off = null;
    function step() {
      var t = (performance.now() - t0) / 1000;
      if (t >= END) {
        render(inst, END);
        inst.playing = false;
        inst.last = performance.now();
        if (off) off();
        return false;
      }
      render(inst, t);
      return true;
    }
    if (S && S.onFrame) off = S.onFrame(step, inst.host);
    else requestAnimationFrame(function tick() { if (step()) requestAnimationFrame(tick); });
  }

  var q = new URLSearchParams(location.search).get("logo_t");
  var frozen = q !== null && isFinite(+q) ? Math.max(0, Math.min(END, +q)) : null;

  var hosts = Array.prototype.slice.call(document.querySelectorAll("[data-logo]"));
  var instances = hosts.map(function (host) {
    var inst = build(host);
    render(inst, frozen !== null ? frozen : END);
    if (fine && !reduce) {
      host.addEventListener("pointerenter", function () {
        if (performance.now() - inst.last > 1200) play(inst);
      });
    }
    return inst;
  });

  instances.forEach(function (inst) {
    var mode = inst.host.getAttribute("data-logo");
    if (mode === "load") setTimeout(function () { play(inst); }, 350);
    else if (mode === "view") {
      if (S && S.onceInView) S.onceInView(inst.host, function () { play(inst); }, 0.6);
      else play(inst);
    }
  });

  window.StackedLogo = { instances: instances, render: render, play: play, END: END };
})();
