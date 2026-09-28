/* What's free: the four parts of the setup drop onto the stack, once, when the scene
   comes into view. No pin and no scrubbed stepper (that grammar belongs to #how): the
   page keeps moving and the list is plain text throughout.
   Desktop adds a gentle scroll drift on the scene and a small pointer tilt on the stack.
   Reduced motion or no JS: the CSS default is the finished stack. */
(function () {
  "use strict";
  var S = window.Stacked;
  var root = document.getElementById("free");
  if (!root || !S) return;

  function all(sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
  var stage = root.querySelector(".free__stage");
  var scene = root.querySelector("[data-free-scene]");
  var rig = root.querySelector("[data-free-rig]");
  var slabs = all("[data-layer]");
  if (!stage || !scene || !rig || slabs.length !== 4 || all("[data-shade]").length !== 4 || !root.querySelector("[data-ground]")) {
    console.error("[free] section markup is incomplete, leaving the static stack in place");
    return;
  }
  if (S.reduce) return;

  var desk = matchMedia("(min-width: 961px)");
  /* The build starts when the base of the stack (the rig point) rises to this share of
     the viewport height: on desktop the first slab lands well above the fold; the
     mobile scene starts once it is more than half on screen, so the whole build is seen. */
  var START_DESK = 0.78, START_MOB = 0.9;
  var DRIFT = 36;          /* px the scene travels against the scroll, desktop only */
  var SET_FALLBACK = 3400; /* ms: close the gaps even if the last transitionend never fires */
  var built = false, set = false, live = null, drift = "", tilted = "";

  function settle() {
    if (set) return;
    set = true;
    root.classList.add("is-set");
  }

  function build() {
    built = true;
    root.classList.add("is-built");
    setTimeout(settle, SET_FALLBACK);
  }

  /* the last slab finishing its drop closes the gaps */
  slabs[3].addEventListener("transitionend", function (e) {
    if (e.target === slabs[3] && e.propertyName === "transform" && built) settle();
  });

  root.classList.add("free--build");

  function still() {
    if (drift) { drift = ""; scene.style.removeProperty("translate"); }
    if (tilted) { tilted = ""; rig.style.removeProperty("transform"); }
  }

  S.onFrame(function () {
    var r = root.getBoundingClientRect();
    var inView = r.bottom > -200 && r.top < innerHeight + 200;
    if (!built && rig.getBoundingClientRect().top < innerHeight * (desk.matches ? START_DESK : START_MOB)) build();
    /* the pixel pulse only runs while the section is on screen and the stack is built */
    var on = inView && built;
    if (on !== live) { live = on; root.classList.toggle("is-live", live); }
    if (!inView) return;
    if (!desk.matches) { still(); return; }

    /* measured on the stage, which never moves, so the drift does not feed back into itself */
    var y = ((0.5 - S.through(stage)) * DRIFT).toFixed(1);
    if (y !== drift) { drift = y; scene.style.translate = "0 " + y + "px"; }
    if (S.fine) {
      var tf = "rotateX(" + (-S.pointer.y * 7).toFixed(2) + "deg) rotateY(" + (S.pointer.x * 9).toFixed(2) + "deg)";
      if (tf !== tilted) { tilted = tf; rig.style.transform = tf; }
    }
  });
})();
