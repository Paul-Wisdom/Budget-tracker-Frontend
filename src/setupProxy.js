const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            console.log('Proxying :', req.url);
        }
    }))
};
