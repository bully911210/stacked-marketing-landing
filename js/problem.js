/* Problem: three failure moments. A cool light travels down the cascade to the
   moment nearest the middle of the screen; the first time the light reaches a
   moment, its short story plays once. Planes drift by depth on scroll. */
(function () {
  "use strict";
  var S = window.Stacked;
  var root = document.getElementById("problem");
  if (!root || !S) return;

  var SLIDE = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  var light = root.querySelector("[data-light]");
  var close = root.querySelector(".problem__close");
  var moments = Array.prototype.slice.call(root.querySelectorAll("[data-moment]")).map(function (el) {
    var plane = el.querySelector(".problem__plane");
    var beats = (el.getAttribute("data-beats") || "").split(",").map(Number).filter(function (n) { return n >= 0; });
    return { el: el, plane: plane, depth: parseFloat(plane && plane.getAttribute("data-depth")) || 0.7, beats: beats, played: false };
  }).filter(function (m) { return m.plane; });
  if (!moments.length) { console.error("[problem] no moments found"); return; }

  /* A beat adds .is-bN to the moment and brings its [data-beat="N"] chat items into the thread.
     Items already in the thread slide up from where they were (FLIP, transform only). */
  function beat(m, n, still) {
    m.el.classList.add("is-b" + n);
    var items = Array.prototype.slice.call(m.el.querySelectorAll('[data-beat="' + n + '"]'));
    if (!items.length) return;
    if (still) { items.forEach(function (x) { x.classList.add("is-shown", "is-on"); }); return; }
    var kids = Array.prototype.filter.call(items[0].parentNode.children, function (c) { return c.classList.contains("is-shown"); });
    var before = kids.map(function (c) { return c.offsetTop; });
    items.forEach(function (x) { x.classList.add("is-shown"); });
    kids.forEach(function (c, i) {
      var d = before[i] - c.offsetTop;
      if (d) { c.style.transition = "none"; c.style.transform = "translateY(" + d + "px)"; }
    });
    /* older items slide first (no entrance delay), the new one fades in once its slot is clear */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        kids.forEach(function (c) { c.style.transition = SLIDE; c.style.transform = ""; });
        setTimeout(function () { items.forEach(function (x) { x.classList.add("is-on"); }); }, 240);
        setTimeout(function () { kids.forEach(function (c) { c.style.transition = ""; }); }, 800);
      });
    });
  }
  function play(m) {
    if (m.played) return;
    m.played = true;
    m.el.classList.add("is-live");
    m.beats.forEach(function (ms, i) { setTimeout(function () { beat(m, i + 1); }, ms); });
  }
  /* Jump straight to the end of a story (reduced motion, or a moment skipped past). */
  function settle(m) {
    if (m.played) return;
    m.played = true;
    m.el.classList.add("is-live");
    m.beats.forEach(function (_, i) { beat(m, i + 1, true); });
  }

  /* Reduced motion: every moment in its final state, all in the light. */
  if (S.reduce) {
    moments.forEach(function (m) { settle(m); m.el.classList.add("is-lit"); });
    return;
  }

  /* The HTML ships the finished chat; rewind it so it can play. */
  Array.prototype.forEach.call(root.querySelectorAll("[data-beat]"), function (x) { x.classList.remove("is-shown", "is-on"); });
  /* Planes rise in as they arrive; their stories wait for the light. */
  moments.forEach(function (m) { S.onceInView(m.el, function () { m.el.classList.add("is-live"); }, 0.3); });

  var lit = -2, lx = 0, ly = 0, placed = false, near = false;

  function setLit(i) {
    if (i === lit) return;
    lit = i;
    moments.forEach(function (m, j) { m.el.classList.toggle("is-lit", j === i); });
    if (i > -1) play(moments[i]);
  }
  function centre(el, inner) {
    return {
      x: el.offsetLeft + (inner ? inner.offsetLeft + inner.offsetWidth / 2 : el.offsetWidth * 0.35),
      y: el.offsetTop + (inner ? inner.offsetTop + inner.offsetHeight / 2 : el.offsetHeight / 2)
    };
  }

  S.onFrame(function () {
    var r = root.getBoundingClientRect();
    /* .is-near gates the section's ambient loop (the spinner) so nothing ticks off screen */
    var isNear = r.bottom > -100 && r.top < innerHeight + 100;
    if (isNear !== near) { near = isNear; root.classList.toggle("is-near", near); }
    if (!near) return;

    /* read: the moment nearest the middle (inside the central band) and each one's travel.
       The light never leaves its CSS spot (left/top); it only moves by transform, relative to that spot. */
    var H = innerHeight, mid = H * 0.5, best = -1, bestD = Infinity, travel = [], skipped = [];
    var restX = light ? light.offsetLeft + light.offsetWidth / 2 : 0;
    var restY = light ? light.offsetTop + light.offsetHeight / 2 : 0;
    moments.forEach(function (m, i) {
      var mr = m.el.getBoundingClientRect(), cy = mr.top + mr.height / 2, d = Math.abs(cy - mid);
      if (cy > H * 0.14 && cy < H * 0.8 && d < bestD) { bestD = d; best = i; }
      if (mr.bottom < H * 0.14) skipped.push(m);
      travel.push(S.through(m.el));
    });
    var tgt = null;
    if (best > -1) tgt = centre(moments[best].el, moments[best].plane);
    else if (close && close.getBoundingClientRect().top < H * 0.7) tgt = centre(close, null);

    /* write: a moment jumped past (nav link, fast fling) shows its ending, not its waiting state */
    skipped.forEach(settle);
    setLit(best);
    if (light && tgt) {
      if (!placed) { lx = tgt.x; ly = tgt.y; placed = true; }
      lx += (tgt.x - lx) * 0.06;
      ly += (tgt.y - ly) * 0.06;
      light.style.transform = "translate3d(" + (lx - restX).toFixed(1) + "px," + (ly - restY).toFixed(1) + "px,0)";
    }
    moments.forEach(function (m, i) {
      var y = (0.5 - travel[i]) * (m.depth - 0.7) * 180 + S.pointer.y * 8 * m.depth;
      var x = S.pointer.x * 10 * m.depth;
      m.plane.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
    });
  });
})();
