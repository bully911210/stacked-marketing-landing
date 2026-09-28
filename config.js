/* Single source of truth for facts on the page. Prices appear nowhere else.
   Anything empty here is NOT rendered. Never fill a slot with an invented value. */
window.STACKED = Object.freeze({
  whatsapp: {
    e164: "27621779799",
    display: "062 177 9799"
  },
  price: {
    foundations: 0,
    management: 10000,
    adSpendMin: 10000
  },
  metaPixelId: "",               // empty = events recorded in the on-page log only
  guarantee: {
    terms: []                     // TODO: Franz to supply exact terms. Empty = list hidden.
  }
});
