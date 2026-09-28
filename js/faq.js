/* FAQ: one-open accordion, WhatsApp links, numbers and guarantee terms from config.
   Answers start open in the HTML; this file collapses them (adds .faq--ready)
   only once it is running, so nothing is ever hidden without a way to open it. */
(function () {
  "use strict";
  var root = document.getElementById("faq");
  if (!root) return;
  var S = window.Stacked;
  if (!S) { console.error("[faq] window.Stacked is missing, answers are left open"); return; }
  var cfg = S.config || {};

  /* WhatsApp links: the pre-filled text lives in data-faq-wa, the href is the fallback. */
  Array.prototype.forEach.call(root.querySelectorAll("[data-faq-wa]"), function (a) {
    var link = S.waLink(a.getAttribute("data-faq-wa"));
    if (/wa\.me\/\d+/.test(link)) a.href = link;
    else console.error("[faq] no WhatsApp number in config, keeping the fallback link");
  });

  /* Prices come from config.js; the HTML value is only a fallback. */
  Array.prototype.forEach.call(root.querySelectorAll("[data-faq-price]"), function (el) {
    var v = cfg.price ? cfg.price[el.getAttribute("data-faq-price")] : null;
    if (typeof v === "number" && isFinite(v)) el.textContent = S.rand(v);
  });

  /* Guarantee terms: rendered verbatim only when config supplies them. */
  var termsEl = root.querySelector("[data-faq-terms]");
  var terms = cfg.guarantee && Array.isArray(cfg.guarantee.terms) ? cfg.guarantee.terms : [];
  if (termsEl && terms.length) {
    terms.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = String(t);
      termsEl.appendChild(li);
    });
    termsEl.hidden = false;
  }

  /* Accordion (WAI-ARIA pattern): buttons with aria-expanded + aria-controls. */
  var list = root.querySelector("[data-faq-list]");
  var items = Array.prototype.slice.call(root.querySelectorAll("[data-faq-item]"));
  var buttons = items.map(function (it) { return it.querySelector(".faq__btn"); });
  if (!list || !items.length || buttons.indexOf(null) > -1) {
    console.error("[faq] accordion markup incomplete, answers are left open");
    return;
  }

  function set(i, open) {
    items[i].classList.toggle("is-open", open);
    buttons[i].setAttribute("aria-expanded", open ? "true" : "false");
  }
  function toggle(i) {
    var willOpen = !items[i].classList.contains("is-open");
    items.forEach(function (_, j) { set(j, j === i ? willOpen : false); });
  }

  /* The first answer starts open, so nothing below it jumps while someone is reading.
     .faq--intro only times its entrance (rule and cross arrive after the row) and
     is dropped on the first click. */
  items.forEach(function (_, i) { set(i, i === 0); });
  root.classList.add("faq--ready", "faq--intro");

  buttons.forEach(function (btn, i) {
    btn.addEventListener("click", function () { root.classList.remove("faq--intro"); toggle(i); });
    btn.addEventListener("keydown", function (e) {
      var n = buttons.length, next = -1;
      if (e.key === "ArrowDown") next = (i + 1) % n;
      else if (e.key === "ArrowUp") next = (i - 1 + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      if (next < 0) return;
      e.preventDefault();
      buttons[next].focus();
    });
  });
})();
