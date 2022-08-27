#!/usr/bin/env node
// https://github.com/christopherliedtke/prerender
const prerender = require("./lib");
// https://github.com/prerender/prerender-memory-cache
server.use(require("prerender-memory-cache"));

const server = prerender({
  logRequests: true,
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
