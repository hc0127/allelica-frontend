const {createProxyMiddleware} = require("http-proxy-middleware");
const proxy = {
  target: "http://152.70.118.131:8080",
  //target: "http://localhost:5000/",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxy));
};
