/* =====================================================
    === openGame() — loads games directly in-page ========
    ===================================================== */
(function() {
  window.openGame = function(url, sourcePage) {
    if (!url) return;
    if (typeof loadGameInPage === 'function') {
      loadGameInPage(url, sourcePage || 'games');
    }
  };
})();

/* =====================================================
    === GLOBAL MIDGAME AD SUPPRESSION ==================
    ===================================================== */
(function() {
  function removeMidgameOverlayText() {
    const markers = [
      "a midgame ad will appear here",
      "midgame ad"
    ];

    const nodes = document.querySelectorAll("div, p, span, section");
    nodes.forEach((node) => {
      const text = (node.textContent || "").trim().toLowerCase();
      if (!text) return;
      if (markers.some((m) => text.includes(m))) {
        node.style.display = "none";
        if (node.parentElement && node.parentElement.children.length === 1) {
          node.parentElement.style.display = "none";
        }
      }
    });
  }

  function patchAdApis() {
    // Google-style ad break API used by many web builds.
    if (typeof window.adBreak !== "function" || !window.adBreak.__jqrgNoAds) {
      const adBreak = function(config) {
        try {
          if (config && typeof config.beforeAd === "function") config.beforeAd();
          if (config && typeof config.afterAd === "function") config.afterAd();
          if (config && typeof config.adBreakDone === "function") {
            config.adBreakDone({ breakStatus: "notReady" });
          }
        } catch (_) {}
        return Promise.resolve({ breakStatus: "notReady" });
      };
      adBreak.__jqrgNoAds = true;
      window.adBreak = adBreak;
    }

    // CrazyGames SDK wrappers.
    const sdk = window.CrazyGames && window.CrazyGames.SDK;
    if (sdk && sdk.ad) {
      sdk.ad.requestAd = () => Promise.resolve({ success: false, noAd: true });
      sdk.ad.hasAdblock = () => Promise.resolve(false);
      sdk.ad.addAdblockPopupListener = () => {};
    }

    // Poki SDK wrappers.
    if (window.PokiSDK) {
      window.PokiSDK.commercialBreak = () => Promise.resolve(false);
      window.PokiSDK.rewardedBreak = () => Promise.resolve(false);
    }

    // OVO/Game wrappers that expose WebSdkWrapper.
    if (window.WebSdkWrapper) {
      window.WebSdkWrapper.interstitial = () => Promise.resolve(true);
      window.WebSdkWrapper.rewarded = () => Promise.resolve(true);
    }
  }

  patchAdApis();
  removeMidgameOverlayText();

  const obs = new MutationObserver(() => {
    patchAdApis();
    removeMidgameOverlayText();
  });

  if (document.documentElement) {
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  setInterval(patchAdApis, 1000);
})();
