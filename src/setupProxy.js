const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    "/event",
    createProxyMiddleware({
      target: "https://app.thewellnessatlas.com",
      changeOrigin: true,
      secure: true,
      headers: {
        Origin: "https://app.thewellnessatlas.com",
      },
      logLevel: "debug",
    })
  );
};
