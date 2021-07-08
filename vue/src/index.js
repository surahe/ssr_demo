import Koa2 from 'koa';
import staticFiles from 'koa-static';
import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

import App from './App.vue';
import { createRouter, routerReady } from './route.js';

const renderer = createRenderer();
const app = new Koa2();

app.use(staticFiles('public'));

/**
 * 应用接管路由
 */
app.use(async function (ctx) {
  const req = ctx.request;

  const router = createRouter();

  const vm = new Vue({
    router,
    render: (h) => h(App),
  });

  router.push(req.url);

  // 等到 router 钩子函数解析完
  await routerReady(router);

  const matchedComponents = router.getMatchedComponents();

  if (!matchedComponents.length) {
    ctx.body = '没有找到该网页,404';
    return;
  }

  ctx.set('Content-Type', 'text/html;charset=utf-8');

  let htmlString

  try {
    htmlString = await renderer.renderToString(vm);
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }

  ctx.body = `<html>
  <head>
  </head>
    <body>
      ${htmlString}
    </body>
    <script src="./index.js"></script>
  </html>`;
});

app.listen(3000);