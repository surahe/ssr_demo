import { renderToString } from 'react-dom/server';
// 重要是要用到 StaticRouter
import { StaticRouter } from 'react-router-dom';
import React from 'react'
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from '../Routes'
import StyleContext from 'isomorphic-style-loader/StyleContext';

export const render = (store, routes, req, context) => {
  const css = new Set();
  const insertCss = (...styles) => styles.forEach(style => {
    css.add(style._getCss())
  })

  //构建服务端的路由
  const content = renderToString(
    <Provider store={store}>
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter  location={req.path} >
          <div>
            {renderRoutes(routes)}
          </div>
        </StaticRouter>
      </StyleContext.Provider>
    </Provider>
  );
  return `
    <html>
      <head>
        <title>ssr</title>
        <style>${[...css].join('')}</style>
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
