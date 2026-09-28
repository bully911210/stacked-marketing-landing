/* Pricing, direction A: the monthly plate settles onto the free foundation.
   Prices come from config (the HTML already holds the same values).
   Armed (.pricing-a--arm): the Managed Meta Ads plate hovers above its seat and the
   guarantee is not placed yet. Then (.is-set) the plate lowers into place, its shadow
   tightens and the guarantee lands on top. One moment, once. No pin, no scrub.
   When: on a wide screen, once the contact line between the plates is on screen, so the
   landing itself is seen. On a phone the top plate is taller than the view, so it settles
   once its top edge (where the guarantee lands) is well in view instead.
   Reduced motion or no JS: the CSS default is the settled stack. */
(function () {
  "use strict";
  var S = window.Stacked;
  var root = document.querySelector("section.pricing-a");
  if (!root || !S) return;

  /* ---- prices from config -------------------------------------------- */
  var p = S.config && S.config.price;
  if (p && isFinite(p.foundations) && isFinite(p.management) && isFinite(p.adSpendMin)) {
    var values = { foundations: p.foundations, management: p.management, adSpendMin: p.adSpendMin, total: p.management + p.adSpendMin };
    Array.prototype.forEach.call(root.querySelectorAll("[data-price]"), function (el) {
      var key = el.getAttribute("data-price");
      if (key in values) el.textContent = S.rand(values[key]);
      else console.error("[pricing-a] unknown price key: " + key);
    });
  } else {
    console.error("[pricing-a] window.STACKED.price is missing or invalid; keeping the prices written in the HTML");
  }

  if (S.reduce) return;

  var cast = root.querySelector("[data-cast]");
  var top = root.querySelector("[data-plate='top']");
  if (!cast || !top) {
    console.error("[pricing-a] stack markup is incomplete, leaving the settled stack in place");
    return;
  }

  var wide = matchMedia("(min-width: 761px)");
  var SEAT_WIDE = 0.9;   /* contact line above 90% of the view height */
  var SEAT_PHONE = 0.7;  /* top plate's top edge above 70% of the view height */

  function due() {
    return wide.matches
      ? cast.getBoundingClientRect().top < innerHeight * SEAT_WIDE
      : top.getBoundingClientRect().top < innerHeight * SEAT_PHONE;
  }

  /* Already on or past it at load (an anchor jump, a reload further down): leave it settled. */
  if (due()) return;

  root.classList.add("pricing-a--arm");
  var off = S.onFrame(function () {
    if (!due()) return;
    off();
    root.classList.add("is-set");
  });
})();
