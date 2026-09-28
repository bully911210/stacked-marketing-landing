/* Run: the Managed Meta Ads showcase. Four accessible tabs over one canvas.
   Auto-advances once through all four tabs while the scene is in view, pauses
   on hover or focus, and stops for good once someone picks a tab or taps the
   showcase. On touch screens it only advances while the scene itself is on
   screen, so copy never changes under someone reading it. Rides
   Stacked.onFrame, no own loop. Depth writes `translate` on the active panel's
   planes only: no inherited custom properties per frame (they force a style
   recalc of the whole stage). */
(function () {
  "use strict";
  var S = window.Stacked;
  var root = document.getElementById("run");
  if (!root || !S) return;

  var show = root.querySelector("[data-run]");
  var list = root.querySelector('[role="tablist"]');
  var scroller = root.querySelector(".run__tabscroll");
  var stage = root.querySelector(".run__stage");
  var canvas = root.querySelector(".run__canvas");
  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
  if (!show || !list || !scroller || !stage || !canvas || !tabs.length || panels.indexOf(null) > -1) {
    console.error("[run] showcase markup is incomplete, tabs not initialised");
    return;
  }
  var bars = tabs.map(function (t) { return t.querySelector(".run__timer i"); });

  var DWELL = 7000;          /* ms each tab stays up while auto-advancing */
  var LEAVE = 480;           /* ms the outgoing scene holds its final state while it fades */
  var cur = 0, elapsed = 0, last = 0;
  var auto = !S.reduce, started = false, hovered = false, focused = false;
  var leaving = [], cache = {};

  /* Depth planes per panel, with their depth factor, read once. */
  var planes = panels.map(function (p) {
    return Array.prototype.slice.call(p.querySelectorAll(".run__pl, .run__k-deck")).map(function (el) {
      var z = parseFloat(el.style.getPropertyValue("--z"));
      return { el: el, z: isNaN(z) ? 0 : z, v: "" };
    }).filter(function (o) { return o.z > 0; });
  });
  var depthKey = "";

  root.classList.add("is-armed");
  if (auto) root.classList.add("is-auto");
  if (S.reduce) panels.forEach(function (p) { p.classList.add("is-play"); });

  function setVar(el, name, value) {
    if (cache[name] === value) return;
    cache[name] = value;
    el.style.setProperty(name, value);
  }

  /* The white thumb is one layer clipped to the selected tab, so it slides. */
  function placeThumb() {
    var t = tabs[cur];
    var inner = list.clientWidth - 10;
    var left = t.offsetLeft - 5;
    setVar(list, "--tl", left + "px");
    setVar(list, "--tr", Math.max(0, inner - left - t.offsetWidth) + "px");
  }

  /* On narrow screens the tabs scroll sideways: keep the active one centred. */
  function centerTab(t) {
    if (scroller.scrollWidth <= scroller.clientWidth + 2) return;
    var sr = scroller.getBoundingClientRect(), tr = t.getBoundingClientRect();
    var left = scroller.scrollLeft + (tr.left + tr.width / 2) - (sr.left + sr.width / 2);
    scroller.scrollTo({ left: Math.max(0, left), behavior: S.reduce ? "auto" : "smooth" });
  }

  function play(panel) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (panel.classList.contains("is-active")) panel.classList.add("is-play");
      });
    });
  }

  function stopAuto() {
    if (!auto) return;
    auto = false;
    root.classList.remove("is-auto");
  }

  function select(n, byUser) {
    if (byUser) stopAuto();
    if (n === cur) return;
    var prev = cur, oldPanel = panels[prev], nextPanel = panels[n];
    tabs[prev].setAttribute("aria-selected", "false");
    tabs[prev].tabIndex = -1;
    tabs[n].setAttribute("aria-selected", "true");
    tabs[n].tabIndex = 0;
    bars[prev].style.transform = "scaleX(0)";
    oldPanel.classList.remove("is-active");
    nextPanel.classList.add("is-active");
    if (!S.reduce) {
      clearTimeout(leaving[prev]);
      leaving[prev] = setTimeout(function () { if (cur !== prev) oldPanel.classList.remove("is-play"); }, LEAVE);
      clearTimeout(leaving[n]);
      nextPanel.classList.remove("is-play");
      if (started) play(nextPanel);
    }
    cur = n;
    elapsed = 0;
    root.setAttribute("data-tab", String(n));
    placeThumb();
    centerTab(tabs[n]);
  }

  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(i, true); });
  });
  list.addEventListener("keydown", function (e) {
    var n = null;
    if (e.key === "ArrowRight") n = (cur + 1) % tabs.length;
    else if (e.key === "ArrowLeft") n = (cur - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    if (n === null) return;
    e.preventDefault();
    select(n, true);
    tabs[n].focus({ preventScroll: true });
  });

  /* Pause while someone is reading or using the showcase. */
  show.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hovered = true; });
  show.addEventListener("pointerleave", function () { hovered = false; });
  show.addEventListener("focusin", function () { focused = true; });
  show.addEventListener("focusout", function (e) { if (!show.contains(e.relatedTarget)) focused = false; });
  /* A tap or click anywhere in the showcase means someone is looking: stop for good. */
  show.addEventListener("click", stopAuto);

  /* Scale each scene to its canvas. */
  function fit() {
    var cs = getComputedStyle(stage);
    var dw = parseFloat(cs.getPropertyValue("--dw")) || 640;
    var dh = parseFloat(cs.getPropertyValue("--dh")) || 500;
    var m = canvas.clientWidth < 520 ? 10 : 32;
    var k = Math.min(1, (canvas.clientWidth - m) / dw, (canvas.clientHeight - m) / dh);
    setVar(stage, "--k", Math.max(0.5, k).toFixed(3));
    placeThumb();
  }
  fit();
  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(fit);
    ro.observe(canvas);
    ro.observe(list);
  } else {
    addEventListener("resize", fit);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(placeThumb, function (err) { console.error("[run] font loading check failed", err); });
  }

  S.onceInView(stage, function () {
    started = true;
    if (!S.reduce) play(panels[cur]);
  }, 0.08);

  /* Depth: planes drift with the pointer and separate slightly with scroll.
     Only the active panel moves, in whole pixels, and a plane is only rewritten
     when it actually moves a pixel. Each write restyles that plane, so during a
     scroll most frames touch one or two planes, not all of them. */
  function depth(r) {
    var px = S.fine ? S.pointer.x : 0, py = S.fine ? S.pointer.y : 0;
    var through = Math.min(1, Math.max(0, (innerHeight - r.top) / Math.max(1, r.height + innerHeight)));
    var sy = (0.5 - through) * 30;
    var key = cur + "|" + Math.round(px * 200) + "|" + Math.round(py * 200) + "|" + Math.round(sy * 4);
    if (key === depthKey) return;
    depthKey = key;
    planes[cur].forEach(function (o) {
      var v = Math.round(px * o.z * 18) + "px " + Math.round((py * 14 + sy) * o.z) + "px";
      if (v === o.v) return;
      o.v = v;
      o.el.style.translate = v;
    });
  }

  S.onFrame(function (now) {
    var dt = last ? Math.min(64, now - last) : 0;
    last = now;
    var r = stage.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    if (auto && started) {
      /* Measure the scene, not the stage: on narrow screens the copy sits under it. */
      var c = canvas.getBoundingClientRect(), slack = c.height * 0.15;
      var inView = S.fine
        ? c.top < innerHeight * 0.7 && c.bottom > innerHeight * 0.3
        : c.top > -slack && c.bottom < innerHeight + slack;
      if (inView && !hovered && !focused) elapsed += dt;
      if (elapsed >= DWELL) {
        /* One full lap, then rest on the first tab: nothing cycles forever. */
        var next = (cur + 1) % tabs.length;
        select(next, false);
        if (next === 0) stopAuto();
      } else {
        bars[cur].style.transform = "scaleX(" + (elapsed / DWELL).toFixed(4) + ")";
      }
    }
    if (!S.reduce) depth(r);
  });
})();
