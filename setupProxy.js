const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "ws",
    createProxyMiddleware({
      target: "http://localhost:8888",
      ws: true,  // 웹소켓을 사용하겠다!
    })
  );
};