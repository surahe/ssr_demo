import { renderToString } from 'react-dom/server';
// 重要是要用到 StaticRouter
import { StaticRouter } from 'react-router-dom';
import React from 'react'
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from '../Routes'

export const render = (store, routes, req, context) => {
  //构建服务端的路由
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} >
        <div>
          {renderRoutes(routes)}
        </div>
      </StaticRouter>
    </Provider>
  );
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
  `
}
