function canonicalLanguage(code) {
  const base = String(code || "en").toLowerCase().split("-")[0];
  // Home Assistant uses nb/nb-NO for Norwegian Bokmal. The card's existing
  // translation is kept under no for backwards compatibility, so treat both
  // identifiers as the same language instead of falling back to English.
  return base === "nb" ? "no" : base;
}
function lang(hass) {
  const l = canonicalLanguage(hass && ((hass.locale && hass.locale.language) || hass.language));
  return LANGUAGE_NAMES[l] ? l : "en";
}
function t(hass, key) {
  const d = langDict(lang(hass));
  return (d && d[key]) || T.en[key] || key;
}

// A release carries English inside the card and every other language in a
// file of its own beside it, ha-appliance-card-<lang>.json, so a dashboard
// reads one language and not fourteen. The source keeps them all, which is
// what the tests run on; tools/build.mjs splits them out.
//
// A language is fetched the first time it is asked for, and kept in local
// storage under the card's version, so every later visit finds it before the
// first render and never shows English for a moment. A new version starts a
// new key and drops the old ones. Until the file arrives the card speaks
// English, then every card on the page draws itself again.
const LANG_CACHE = "ha-appliance-card-i18n:";
// Cards and editors on the page, to draw again once a language has arrived.
const langListeners = new Set();
function onLanguageLoaded(fn, on) {
  if (on) langListeners.add(fn);
  else langListeners.delete(fn);
}
const langState = {};
function langDict(l) {
  if (T[l]) return T[l];
  if (!langState[l]) requestLanguage(l);
  return T[l] || null;
}
function requestLanguage(l) {
  langState[l] = "loading";
  const key = `${LANG_CACHE}${CARD_VERSION}:${l}`;
  try {
    const store = window.localStorage;
    for (let i = store.length - 1; i >= 0; i--) {
      const k = store.key(i);
      if (k && k.startsWith(LANG_CACHE) && !k.startsWith(`${LANG_CACHE}${CARD_VERSION}:`)) store.removeItem(k);
    }
    const kept = JSON.parse(store.getItem(key) || "null");
    if (kept && typeof kept === "object") {
      T[l] = kept;
      langState[l] = "ready";
      return;
    }
  } catch (e) {
    /* no storage: fetch it */
  }
  if (typeof fetch !== "function") return;
  fetch(assetUrl(`ha-appliance-card-${l}.json`))
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((dict) => {
      T[l] = dict;
      langState[l] = "ready";
      try { window.localStorage.setItem(key, JSON.stringify(dict)); } catch (e) { /* full or blocked */ }
      for (const fn of Array.from(langListeners)) {
        try { fn(); } catch (e) { /* one card failing must not stop the others */ }
      }
    })
    .catch((err) => {
      // Once per page: a missing file stays missing, and English is shown.
      langState[l] = "failed";
      console.warn(`HA-APPLIANCE-CARD: no ${l} translation, English it is (${err && err.message})`);
    });
}

// Where the card's own files are served. A classic script knows its own
// address while it runs; Home Assistant adds a resource as a module, which
// does not, so the page is asked for the card's <script> next, and HACS's
// folder is the last resort. The version in the query keeps the browser from
// serving a previous release's file from its cache.
const SCRIPT_URL = (() => {
  try { return (document.currentScript && document.currentScript.src) || null; } catch (e) { return null; }
})();
function assetUrl(name) {
  let src = SCRIPT_URL;
  if (!src) {
    try {
      const tag = Array.from(document.querySelectorAll("script[src]")).find((el) => /\/ha-appliance-card\.js(\?|#|$)/.test(el.src));
      src = tag && tag.src;
    } catch (e) {
      src = null;
    }
  }
  const base = src ? new URL(".", src).href : "/hacsfiles/ha-appliance-card/";
  return `${base}${name}?v=${CARD_VERSION}`;
}

// Each language names itself, so the list needs no translating.
const LANGUAGE_NAMES = {
  en: "English", fr: "Fran\u00e7ais", de: "Deutsch", es: "Espa\u00f1ol",
  it: "Italiano", nl: "Nederlands", pt: "Portugu\u00eas", sv: "Svenska",
  no: "Norsk", da: "Dansk", pl: "Polski", ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  zh: "\u4e2d\u6587", cs: "\u010ce\u0161tina",
};

// A card can be pinned to one language whatever Home Assistant is set to.
// Someone running HA in English so error messages match what they find online
// may still want the card in their own language. Overriding the locale on a
// copy of hass leaves every t() call downstream working unchanged, and carries
// the choice to the dates as well, which share the same resolution.
function localizedHass(hass, cfg) {
  const want = cfg && cfg.language;
  const resolved = canonicalLanguage(want);
  if (!hass || !want || want === "auto" || !LANGUAGE_NAMES[resolved]) return hass;
  return { ...hass, language: resolved, locale: { ...(hass.locale || {}), language: resolved } };
}

// ---------------------------------------------------------------------------
// State normalization, working across brands and integrations
// ---------------------------------------------------------------------------

