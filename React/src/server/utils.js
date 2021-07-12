import { renderToString } from 'react-dom/server';
// 重要是要用到 StaticRouter
import { StaticRouter } from 'react-router-dom';
import React from 'react'
import Routes from '../Routes'

export const render = (req) => {
  //构建服务端的路由
  const content = renderToString(
    <StaticRouter location={req.path} >
      {Routes}
    </StaticRouter>
  );
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `
}
