/* Hero: entrance, one WhatsApp conversation, depth on pointer and scroll. */
(function () {
  "use strict";
  var S = window.Stacked;
  var scene = document.querySelector("#top [data-scene]");
  if (!scene || !S) return;
  var planes = Array.prototype.slice.call(scene.querySelectorAll("[data-depth]"));
  var label = scene.querySelector("[data-typing-label]");
  var msg = function (s) { return scene.querySelector('[data-step="' + s + '"]'); };

  function show(el) {
    el.classList.add("is-shown");
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("is-on"); }); });
  }
  function hide(el) { el.classList.remove("is-shown", "is-on"); }
  function typing(on) {
    var t = msg("typing");
    if (on) show(t); else hide(t);
    label.textContent = on ? "typing…" : "online";
  }

  /* One conversation, played once: the ad click becomes a WhatsApp chat. */
  var script = [
    [700, function () { show(msg(1)); }],
    [900, function () { typing(true); }],
    [1300, function () { typing(false); show(msg(2)); }],
    [1500, function () { show(msg(3)); }],
    [800, function () { typing(true); }],
    [1200, function () { typing(false); show(msg(4)); }]
  ];
  function play(i) {
    if (i >= script.length) return;
    setTimeout(function () { script[i][1](); play(i + 1); }, script[i][0]);
  }

  requestAnimationFrame(function () { scene.classList.add("is-in"); });
  if (S.reduce) { [1, 2, 3, 4].forEach(function (s) { msg(s).classList.add("is-shown", "is-on"); }); return; }
  play(0);

  /* Depth: the pointer shifts planes by depth; scroll separates them. Scroll is clamped to
     one screen, and on touch (no pointer) a frame only runs when that clamped value changed,
     so a fast fling still lands the planes on their final offset. */
  var lastSy = -1;
  S.onFrame(function () {
    var sy = Math.min(scrollY, innerHeight);
    if (!S.fine && sy === lastSy) return;
    lastSy = sy;
    planes.forEach(function (p) {
      var d = parseFloat(p.getAttribute("data-depth"));
      var x = S.pointer.x * 28 * d, y = S.pointer.y * 20 * d - sy * (d - 0.7) * 0.35;
      p.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
    });
  });
})();
