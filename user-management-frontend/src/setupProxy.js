const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/User-Service1',
    createProxyMiddleware({
      target: 'http://localhost:8088',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};