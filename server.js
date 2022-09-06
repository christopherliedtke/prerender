#!/usr/bin/env node
// https://github.com/christopherliedtke/prerender
const prerender = require("./lib");

const server = prerender({
  // logRequests: true,
  chromeLocation: "/app/.apt/usr/bin/google-chrome",
});

// https://github.com/prerender/prerender-memory-cache
server.use(require("prerender-memory-cache"));

server.use(require("./lib/plugins/whitelist"));
// server.use(require("./lib/plugins/blockResources"));

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
