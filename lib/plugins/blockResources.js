const blockedResources = [
  "google-analytics.com",
  "api.mixpanel.com",
  "fonts.googleapis.com",
  "stats.g.doubleclick.net",
  "mc.yandex.ru",
  "use.typekit.net",
  "beacon.tapfiliate.com",
  "js-agent.newrelic.com",
  "api.segment.io",
  "woopra.com",
  "static.olark.com",
  "static.getclicky.com",
  "fast.fonts.com",
  "youtube.com/embed",
  "cdn.heapanalytics.com",
  "googleads.g.doubleclick.net",
  "pagead2.googlesyndication.com",
  "fullstory.com/rec",
  "navilytics.com/nls_ajax.php",
  "log.optimizely.com/event",
  "hn.inspectlet.com",
  "tpc.googlesyndication.com",
  "partner.googleadservices.com",
  "matomo.mfa-mal-anders.de",
  ".ttf",
  ".eot",
  ".otf",
  // ".woff",
  ".png",
  ".gif",
  ".tiff",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".ico",
  ".svg",
];

module.exports = {
  tabCreated: (req, res, next) => {
    req.prerender.tab.Network.setRequestInterception({
      patterns: [{ urlPattern: "*" }],
    }).then(() => {
      next();
    });

    req.prerender.tab.Network.requestIntercepted(
      async ({ interceptionId, request }) => {
        let blocked;
        let requestUrl;
        try {
          let shouldBlock = false;
          blockedResources.forEach((substring) => {
            if (request.url.indexOf(substring) >= 0) {
              shouldBlock = true;
              blocked = substring;
              requestUrl = request.url;
            }
          });

          let interceptOptions = { interceptionId };

          if (shouldBlock) {
            interceptOptions.errorReason = "Aborted";
          }

          await req.prerender.tab.Network.continueInterceptedRequest(
            interceptOptions
          );
        } catch (error) {
          console.error(
            "Error on request interception in blockResources",
            error,
            requestUrl,
            blocked
          );
        }
      }
    );
  },
};
