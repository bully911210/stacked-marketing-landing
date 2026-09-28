/* Stacked · shared runtime. One rAF loop, one pointer, one reveal observer.
   Sections use window.Stacked instead of starting their own loops.

   Stacked.reduce            true under prefers-reduced-motion
   Stacked.fine              true for a mouse/trackpad (hover + fine pointer)
   Stacked.pointer           { x, y } in -0.5..0.5, eased; 0,0 on touch
   Stacked.onFrame(fn, el)   fn(time) every frame while the page is visible. Returns an unsubscribe.
                             A subscriber added while a section script runs (js/<name>.js) only runs
                             while that section is within one viewport of the screen; pass el to gate
                             it on a different element. Off-screen it would draw nothing anyway, and
                             skipping it saves a forced layout read per frame.
   Stacked.progress(el)      0..1 progress of a tall (pinned/sticky) element: 0 when its top
                             reaches the viewport top, 1 when its bottom reaches the viewport bottom
   Stacked.through(el)       0..1 as el travels from entering the bottom to leaving the top
   Stacked.onceInView(el, fn, threshold)   fn() once, the first time el is ~threshold visible
   Stacked.config            window.STACKED (config.js)
   Stacked.rand(n)           "R10,000"
   Stacked.waLink(text)      https://wa.me/<number>?text=...

   The nav (ground colour, active link, tucking away in the form section) runs on
   IntersectionObservers, so the frame loop itself never reads layout.
*/
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasIO = "IntersectionObserver" in window;
  var pointer = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  var subs = [];   // [{ fn, gate }] where gate is null (always run) or { on: bool }

  if (fine && !reduce) {
    addEventListener("pointermove", function (e) {
      target.x = e.clientX / innerWidth - 0.5;
      target.y = e.clientY / innerHeight - 0.5;
    }, { passive: true });
  }

  function ease(axis) {
    var d = target[axis] - pointer[axis];
    if (d === 0) return;
    pointer[axis] = Math.abs(d) < 0.0005 ? target[axis] : pointer[axis] + d * 0.08;
  }

  function loop(t) {
    ease("x");
    ease("y");
    var list = subs.slice();
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      if (s.gate && !s.gate.on) continue;
      try { s.fn(t); } catch (err) { console.error("[stacked] frame subscriber failed", err); }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---- frame gates: a subscriber runs only while its element is near the screen ---- */
  var gates = typeof Map === "function" ? new Map() : null;
  var gateIO = hasIO && gates ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var g = gates.get(en.target);
      if (g) g.on = en.isIntersecting;
    });
  }, { rootMargin: "100% 0px 100% 0px" }) : null;

  function gateFor(el) {
    if (!el || !gateIO || !(el instanceof Element)) return null;
    var g = gates.get(el);
    if (!g) { g = { on: true }; gates.set(el, g); gateIO.observe(el); }  // on until the first report
    return g;
  }
  /* the section that owns the script running right now: js/<name>.js -> <section class="<name>"> */
  function ownerSection() {
    var s = document.currentScript;
    var m = s && s.src ? s.src.match(/\/js\/([a-z0-9-]+)\.js(?:[?#]|$)/) : null;
    if (!m || m[1] === "base") return null;
    return document.querySelector("section." + m[1]);
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function progress(el) {
    var r = el.getBoundingClientRect();
    return clamp01(-r.top / Math.max(1, r.height - innerHeight));
  }
  function through(el) {
    var r = el.getBoundingClientRect();
    return clamp01((innerHeight - r.top) / Math.max(1, r.height + innerHeight));
  }
  function onceInView(el, fn, threshold) {
    if (!el) return;
    if (!hasIO) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.disconnect(); fn(); }
      });
    }, { threshold: threshold == null ? 0.25 : threshold, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
  }

  /* reveal: [data-reveal] gets .is-in once. data-reveal-delay="120" staggers (ms). */
  function scanReveals(root) {
    var els = (root || document).querySelectorAll("[data-reveal]:not(.is-in)");
    if (!hasIO || reduce) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        en.target.classList.add("is-in");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) {
      var d = el.getAttribute("data-reveal-delay");
      if (d) el.style.setProperty("--d", d);
      io.observe(el);
    });
  }

  /* Watch which of els cross a band of the viewport. band() returns { top, bottom }
     (and optionally { left, right }) insets in px; accept(entry), when given, decides
     whether an intersecting element counts. The observer is rebuilt on resize. */
  function watchBand(els, band, onChange, accept) {
    if (!hasIO || !els.length) return;
    var io = null, inside = [], timer = 0;
    function px(v) { return -Math.max(0, Math.round(v || 0)) + "px"; }
    function build() {
      if (io) io.disconnect();
      inside = [];
      var b = band();
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var i = inside.indexOf(en.target);
          var on = en.isIntersecting && (!accept || accept(en));
          if (on && i < 0) inside.push(en.target);
          else if (!on && i > -1) inside.splice(i, 1);
        });
        onChange(inside);
      }, { rootMargin: [px(b.top), px(b.right), px(b.bottom), px(b.left)].join(" ") });
      els.forEach(function (el) { io.observe(el); });
    }
    build();
    addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(build, 150); }, { passive: true });
  }

  var nav = document.querySelector(".nav");

  /* nav ground: the pill takes its dark variant while a dark plane runs under its
     middle line across most of its width. A dark card under only part of the pill
     (the pricing card on desktop) leaves it light: the 90% white ground reads as a
     faint tint there, where a dark pill would turn grey over the white half. */
  var GROUND_COVER = 0.75;
  function navGround() {
    var darks = Array.prototype.slice.call(document.querySelectorAll('[data-ground="dark"]'));
    if (!nav || !darks.length) return;
    var state = "", navW = 1;
    watchBand(darks, function () {
      var r = nav.getBoundingClientRect();
      var y = (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight / 2;
      navW = Math.max(1, r.width);
      return { top: y, bottom: innerHeight - y - 1, left: r.left, right: document.documentElement.clientWidth - r.right };
    }, function (inside) {
      var next = inside.length ? "dark" : "";
      if (next === state) return;
      state = next;
      if (next) nav.setAttribute("data-ground", "dark"); else nav.removeAttribute("data-ground");
    }, function (en) { return en.intersectionRect.width >= navW * GROUND_COVER; });
  }

  /* nav: mark the link for the section at 40% of the viewport. A link lights for
     its own target plus any sections listed in data-spy="#a,#b" (sections without
     a link of their own), so the highlight does not blink off between targets. */
  function navSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
    var owner = [], els = [];
    links.forEach(function (a) {
      var sel = (a.getAttribute("data-spy") || a.getAttribute("href")).split(",");
      sel.forEach(function (q) {
        var el = null;
        try { el = document.querySelector(q.trim()); } catch (err) { console.error("[stacked] bad data-spy selector", q, err); }
        if (el && els.indexOf(el) < 0) { els.push(el); owner.push(a); }
      });
    });
    if (!els.length) return;
    var current = null;
    watchBand(els, function () {
      var y = innerHeight * 0.4;
      return { top: y, bottom: innerHeight - y - 1 };
    }, function (inside) {
      var next = null;
      /* at an exact boundary two sections touch the band: the later one wins */
      els.forEach(function (el, i) { if (inside.indexOf(el) > -1) next = owner[i]; });
      if (next === current) return;
      if (current) current.removeAttribute("aria-current");
      if (next) next.setAttribute("aria-current", "true");
      current = next;
    });
  }

  /* nav: in the form section the pill only repeats the form's own button, so it
     tucks away while a field in the section has focus, and once the section's top
     rises above 60% of the view on a phone (where the keyboard needs the room) or
     above 15% on desktop (so the nav stays while the FAQ is still on screen). */
  var narrow = matchMedia("(max-width: 960px)");
  function navTuck() {
    var start = document.getElementById("start");
    if (!nav || !start || !hasIO) return;
    var seen = false, focused = false;
    function apply() { nav.classList.toggle("nav--tucked", seen || focused); }
    watchBand([start], function () {
      return { top: 0, bottom: innerHeight * (narrow.matches ? 0.4 : 0.85) };
    }, function (inside) {
      seen = inside.length > 0;
      apply();
    });
    start.addEventListener("focusin", function () { focused = true; apply(); });
    start.addEventListener("focusout", function (e) {
      if (e.relatedTarget && start.contains(e.relatedTarget)) return;
      focused = false;
      apply();
    });
  }

  var cfg = window.STACKED || null;
  if (!cfg) console.error("[stacked] config.js did not load before base.js");

  window.Stacked = {
    reduce: reduce,
    fine: fine,
    pointer: pointer,
    config: cfg,
    onFrame: function (fn, el) {
      var entry = { fn: fn, gate: gateFor(el || ownerSection()) };
      subs.push(entry);
      return function () { subs = subs.filter(function (s) { return s !== entry; }); };
    },
    progress: progress,
    through: through,
    onceInView: onceInView,
    scanReveals: scanReveals,
    rand: function (n) { return "R" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
    waLink: function (text) {
      var num = cfg && cfg.whatsapp ? cfg.whatsapp.e164 : "";
      return "https://wa.me/" + num + (text ? "?text=" + encodeURIComponent(text) : "");
    }
  };

  scanReveals(document);
  navSpy();
  navGround();
  navTuck();
})();
