const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "http://150.230.32.159:8080",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxy));
};
