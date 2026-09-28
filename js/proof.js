/* proof-c: new enquiries land one by one and stack up, each new one pushing
   the others back. Also wires "Ask us for the exact terms" to WhatsApp, shows
   the WhatsApp number from config, and renders the guarantee terms from config
   verbatim (or nothing at all when there are none). */
(function () {
  "use strict";
  var root = document.querySelector("section.proof-c");
  if (!root) return;
  var S = window.Stacked;
  if (!S) { console.error("[proof-c] window.Stacked is missing; base.js must load first"); return; }

  var TERMS_TEXT = "Hi Stacked, please send me the exact terms of your lead guarantee.";
  var FIRST = 260;   // ms from the stack entering view to the first enquiry
  var GAP = 440;     // ms between enquiries
  var TRAVEL = 7;    // px of pointer parallax at the edge of the screen

  /* 1. "Ask us for the exact terms" opens WhatsApp in a new tab. */
  var link = root.querySelector("[data-pc-terms-link]");
  if (link) {
    link.href = S.waLink(TERMS_TEXT);
    link.target = "_blank";
    link.rel = "noopener";
  }

  /* 2. The number beside the button, from config (nothing if it is missing). */
  var num = root.querySelector("[data-pc-number]");
  var wa = S.config && S.config.whatsapp;
  if (num) {
    if (wa && typeof wa.display === "string" && wa.display.trim() !== "") num.textContent = " · " + wa.display;
    else num.parentNode.removeChild(num);
  }

  /* 3. Guarantee terms: verbatim strings from config, or no list at all. */
  var list = root.querySelector("[data-pc-terms]");
  if (list) {
    var g = S.config && S.config.guarantee;
    var terms = g && Array.isArray(g.terms)
      ? g.terms.filter(function (t) { return typeof t === "string" && t.trim() !== ""; })
      : [];
    if (terms.length) {
      terms.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        list.appendChild(li);
      });
      list.hidden = false;
    } else {
      list.parentNode.removeChild(list);
    }
  }

  /* Reduced motion: the markup already renders the finished stack. */
  var stack = root.querySelector("[data-pc-stack]");
  var cards = stack ? Array.prototype.slice.call(stack.querySelectorAll("[data-pc-card]")) : [];
  var deal = root.querySelector(".proof-c__deal");
  if (S.reduce || !cards.length) return;
  root.classList.add("proof-c--motion");

  /* 4. The stack. Cards are in arrival order; card k landing puts it in front
        (depth 0) and pushes every earlier card one step back. Once all four
        are in, the earlier enquiries far back in the pile fade up behind them. */
  var ghosts = Array.prototype.slice.call(stack.querySelectorAll("[data-pc-ghost]"));
  cards.forEach(function (c) { c.setAttribute("data-d", "0"); });
  function land(k) {
    for (var j = 0; j <= k; j++) cards[j].setAttribute("data-d", String(k - j));
    cards[k].classList.add("is-on");
    if (k === cards.length - 1) {
      ghosts.slice().reverse().forEach(function (gh, i) {
        setTimeout(function () { gh.classList.add("is-on"); }, 240 + i * 140);
      });
    }
  }
  S.onceInView(stack, function () {
    stack.classList.add("is-on");
    cards.forEach(function (c, k) { setTimeout(function () { land(k); }, FIRST + k * GAP); });
  }, 0.75);   /* cards land at the bottom of the pile, so wait until that end is on screen */
  if (deal) S.onceInView(deal, function () { deal.classList.add("is-on"); }, 0.3);

  /* 5. A fine pointer shifts the stack and its light a few px apart (depth). */
  if (!S.fine) return;
  var glow = root.querySelector(".proof-c__glow");
  var last = "";
  S.onFrame(function () {
    var x = S.pointer.x * TRAVEL * 2, y = S.pointer.y * TRAVEL * 2;
    var key = x.toFixed(2) + "," + y.toFixed(2);
    if (key === last) return;
    last = key;
    stack.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
    if (glow) glow.style.transform = "translate3d(" + (-x * 0.6).toFixed(2) + "px," + (-y * 0.6).toFixed(2) + "px,0)";
  });
})();
