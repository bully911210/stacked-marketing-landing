/* CTA (#start): the visitor's answers assemble, live, into a WhatsApp bubble.
   The send button in the mock wakes up once name and business are filled.
   On submit: inline validation, then WhatsApp opens with the message and the
   mock marks it sent. Nothing is stored; nothing leaves the browser except
   the wa.me link the visitor opens. */
(function () {
  "use strict";
  var S = window.Stacked;
  var root = document.getElementById("start");
  if (!root || !S) return;
  var all = function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); };

  /* Footer: WhatsApp link and number from config (the static href is the fallback). */
  var num = S.config && S.config.whatsapp && S.config.whatsapp.display;
  all("[data-wa-link]").forEach(function (a) { a.href = S.waLink("Hi Stacked, I'd like to hear more about the free Meta Ads setup."); });
  if (num) all("[data-wa-num]").forEach(function (n) { n.textContent = num; });

  var form = root.querySelector("[data-cta-form]");
  if (!form) return;

  var KEYS = ["name", "business", "what"];
  var ERRORS = { name: "Please add your name.", business: "Please add your business name." };
  var input = {}, slots = {}, touched = {};
  var missing = KEYS.filter(function (k) {
    input[k] = form.querySelector("#cta-" + k);
    slots[k] = all('[data-slot="' + k + '"]');
    return !input[k];
  });
  if (missing.length) { console.error("[cta] missing form fields: " + missing.join(", ")); return; }

  var status = form.querySelector("[data-status]");
  if (!status) { console.error("[cta] missing the form status region"); return; }
  var optional = all("[data-optional]");
  var bubbles = all("[data-bubble]");
  form.noValidate = true; // our own inline errors replace the browser bubbles

  /* ---- text ------------------------------------------------------------ */
  function tidy(v) { return v.replace(/\s+/g, " ").trim().replace(/[\s.,;:!?]+$/, ""); }
  function values() { return { name: tidy(input.name.value), business: tidy(input.business.value), what: tidy(input.what.value) }; }
  function compose(v) {
    return "Hi Stacked, I’m " + v.name + " from " + v.business + "." +
      (v.what ? " We sell " + v.what + "." : "") + " I’d like my free Meta Ads setup.";
  }

  /* ---- live preview ---------------------------------------------------- */
  function paint(key) {
    var v = tidy(input[key].value);
    slots[key].forEach(function (el) {
      var wasEmpty = el.classList.contains("is-empty");
      el.textContent = v || el.getAttribute("data-ph");
      el.classList.toggle("is-empty", !v);
      if (wasEmpty && v && !S.reduce) { el.classList.remove("is-pop"); void el.offsetWidth; el.classList.add("is-pop"); }
    });
  }
  function sync() {
    var v = values();
    root.classList.toggle("is-ready", !!(v.name && v.business));
    optional.forEach(function (el) { el.classList.toggle("is-blank", !v.what); });
  }
  function unsend() {
    if (!root.classList.contains("is-sent")) return;
    root.classList.remove("is-sent");
    status.textContent = "";
  }

  /* ---- validation ------------------------------------------------------ */
  function check(key) {
    var msg = ERRORS[key] && !tidy(input[key].value) ? ERRORS[key] : "";
    var err = form.querySelector("#cta-" + key + "-err");
    if (msg) input[key].setAttribute("aria-invalid", "true"); else input[key].removeAttribute("aria-invalid");
    if (err) { err.textContent = msg; err.hidden = !msg; }
    return !msg;
  }

  KEYS.forEach(function (key) {
    var el = input[key];
    el.addEventListener("focus", function () { slots[key].forEach(function (s) { s.classList.add("is-active"); }); });
    el.addEventListener("blur", function () { slots[key].forEach(function (s) { s.classList.remove("is-active"); }); });
    el.addEventListener("input", function () {
      paint(key); sync(); unsend();
      if (touched[key]) check(key);
    });
  });
  /* Enter in "Your name" moves on instead of submitting half a form. */
  input.name.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !tidy(input.business.value)) { e.preventDefault(); input.business.focus(); }
  });

  /* ---- open WhatsApp --------------------------------------------------- */
  function openWhatsApp(url) {
    var win = null;
    try { win = window.open("", "_blank"); } catch (err) { console.error("[cta] could not open a new tab", err); }
    if (!win) { location.href = url; return false; } // popup blocked: use this tab
    try { win.opener = null; } catch (err) { console.error("[cta] could not detach the new tab", err); }
    win.location.href = url;
    return true;
  }
  function announce(url, newTab) {
    status.textContent = newTab ? "WhatsApp is opening in a new tab. " : "Opening WhatsApp. ";
    if (!newTab) return;
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    a.textContent = "Didn’t open? Try again";
    status.appendChild(a);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    ["name", "business"].forEach(function (k) {
      touched[k] = true;
      if (!check(k) && !firstBad) firstBad = input[k];
    });
    if (firstBad) { unsend(); firstBad.focus(); return; }

    var url = S.waLink(compose(values()));
    var newTab = openWhatsApp(url);
    root.classList.remove("is-sent");
    void root.offsetWidth; // restart the send animation on a second submit
    root.classList.add("is-sent");
    announce(url, newTab);
  });

  /* ---- entrance: the bubble's words assemble one by one ---------------- */
  function arm(bubble) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span");
            w.className = /^[.,;:!?]+$/.test(part) ? "cta__w cta__w--p" : "cta__w"; // --p: stays inline, so it never wraps away from its word
            w.textContent = part; w.style.setProperty("--i", i++);
            frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.hasAttribute("data-slot")) {
          n.classList.add("cta__w"); n.style.setProperty("--i", i++);
        } else if (n.nodeType === 1 && !n.hasAttribute("data-meta")) {
          walk(n);
        }
      });
    })(bubble);
    bubble.classList.add("is-armed");
  }

  /* ---- mobile: keep the live preview in view while typing ---------------
     On narrow screens the preview card leads the form. While the visible area
     fits the card plus a field, the card is pinned under the nav (.is-pin,
     CSS sticky). On focus, and when the on-screen keyboard changes the visible
     area, the page scrolls the least it can so the focused field sits just
     under the card and above the keyboard. The keyboard only shrinks the
     visual viewport, so everything is measured against it. */
  function keepInView(mini) {
    var nav = document.querySelector(".nav");
    var bubble = mini.querySelector("[data-bubble]");
    var vv = window.visualViewport || null;
    var GAP = 20, EDGE = 10, timer = 0, lastH = 0;

    function shown() { return mini.getClientRects().length > 0; }
    /* where the nav ends; 0 while js/base.js has tucked it away (or it is faded out) */
    function navBottom() {
      if (!nav || (nav.classList.contains("nav--tucked") && !nav.matches(":focus-within"))) return 0;
      return parseFloat(getComputedStyle(nav).opacity) < 0.1 ? 0 : Math.max(0, nav.getBoundingClientRect().bottom);
    }
    function band() {
      var top = vv ? vv.offsetTop : 0, h = vv ? vv.height : innerHeight;
      return { top: Math.max(top, navBottom()) + EDGE, bottom: top + h - EDGE };
    }
    function pin() {
      var ok = false;
      if (shown() && !(vv && vv.scale > 1.05)) { // never pin over a pinch-zoomed page
        var b = band();
        ok = b.bottom - b.top >= mini.offsetHeight + 8 + input.name.offsetHeight;
        root.style.setProperty("--cta-pin", Math.round(b.top) + "px");
      }
      root.classList.toggle("is-pin", ok);
      return ok;
    }
    /* d scrolls the page down by d px; each tier is [least d, most d] */
    function align(el) {
      if (!shown()) return;
      var pinned = pin(), b = band(), H = mini.offsetHeight;
      var f = (el.closest(".cta__field") || el).getBoundingClientRect(), i = el.getBoundingClientRect();
      var hiPref, hiMin, bt;
      if (pinned) { hiPref = f.top - (b.top + H + GAP); hiMin = i.top - (b.top + H + 8); }
      else { bt = bubble ? bubble.getBoundingClientRect().top - b.top : Infinity; hiPref = Math.min(bt, f.top - b.top); hiMin = Math.min(bt, i.top - b.top); }
      var loPref = f.bottom - b.bottom, loMin = i.bottom - b.bottom;
      var tiers = [[loPref, hiPref], [loMin, hiPref], [loMin, hiMin]];
      var d = loMin; // nothing fits: the field wins, with as much of the card above it as possible
      for (var k = 0; k < tiers.length; k++) {
        var lo = tiers[k][0], hi = tiers[k][1];
        if (lo <= hi) { d = lo > 0 ? lo : hi < 0 ? hi : 0; break; }
      }
      lastH = H;
      if (Math.abs(d) > 2) window.scrollBy({ top: d, behavior: S.reduce ? "auto" : "smooth" });
    }
    function schedule(el, ms) {
      clearTimeout(timer);
      timer = setTimeout(function () { if (document.activeElement === el) align(el); }, ms);
    }
    function onViewport() {
      pin();
      var a = document.activeElement;
      if (a && KEYS.some(function (k) { return input[k] === a; })) schedule(a, 140);
    }
    KEYS.forEach(function (k) {
      input[k].addEventListener("focus", function () { schedule(input[k], 80); });
      /* the bubble gained or lost a line: keep the field clear of the keyboard */
      input[k].addEventListener("input", function () { if (shown() && mini.offsetHeight !== lastH) schedule(input[k], 0); });
    });
    addEventListener("resize", onViewport);
    if (vv) { vv.addEventListener("resize", onViewport); vv.addEventListener("scroll", pin); }
    if (nav) { // the nav shows and tucks away as the page scrolls: follow it
      nav.addEventListener("transitionend", pin);
      if ("MutationObserver" in window) new MutationObserver(pin).observe(nav, { attributes: true, attributeFilter: ["class"] });
    }
    pin();
  }
  var stage = form.querySelector("[data-stage]");
  var mini = stage && stage.querySelector(".cta__mini");
  if (mini) keepInView(mini); // optional: without the stage the form simply scrolls as normal

  KEYS.forEach(paint); // restores values the browser kept (back button, autofill)
  sync();
  addEventListener("pageshow", function () { KEYS.forEach(paint); sync(); });

  if (S.reduce) { root.classList.add("is-in"); return; }
  bubbles.forEach(arm);
  S.onceInView(root.querySelector(".cta__grid"), function () { root.classList.add("is-in"); }, 0.3);

  /* ---- depth: pointer shifts planes by depth, scroll separates them ---- */
  var scene = root.querySelector("[data-scene]");
  var planes = scene ? all("[data-scene] [data-depth]") : [];
  if (!planes.length) return;
  S.onFrame(function () {
    if (!scene.offsetWidth) return; // hidden on tablet and mobile
    var r = scene.getBoundingClientRect();
    if (r.bottom < -100 || r.top > innerHeight + 100) return;
    var t = S.through(scene);
    planes.forEach(function (p) {
      var d = parseFloat(p.getAttribute("data-depth")) || 0;
      var x = S.pointer.x * 18 * d;
      var y = S.pointer.y * 14 * d + (0.5 - t) * 70 * (d - 0.6);
      p.style.transform = "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
    });
  });
})();
