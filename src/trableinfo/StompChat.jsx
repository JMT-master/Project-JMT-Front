import React from 'react'

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/ws",
        createProxyMiddleware({ target: "http://localhost:8888", ws: true })
    );
};

const StompChat = () => {



  return (
    <div>StompChat</div>
  )
}

export default StompChat