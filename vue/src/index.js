import Koa2 from 'koa';
import staticFiles from 'koa-static';
import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

import App from './App.vue';
import { createRouter, routerReady } from './route.js';

import { createStore } from './vuex/store';
import { getServerAxios } from "./util/getAxios";
import { proxyHanlder } from "./middleware/proxy";

const renderer = createRenderer();
const app = new Koa2();

app.use(staticFiles('public'));

proxyHanlder(app);

/**
 * 应用接管路由
 */
app.use(async function (ctx) {
  const req = ctx.request;

  //图标直接返回
  if (req.path === '/favicon.ico') {
    ctx.body = '';
    return false;
  }

  const router = createRouter();
  const store = createStore(getServerAxios(ctx));

  const vm = new Vue({
    router,
    store,
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

  const context = { title: 'hello' }; //创建一个上下文对象

  try {
    await Promise.all(
      matchedComponents.map((Component) => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
          });
        }
      })
    );
    htmlString = await renderer.renderToString(vm, context);
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }

  ctx.body = `<html>
  <head>
  ${context.styles ? context.styles : ''}
  </head>
    <body>
      ${htmlString}
      <script>
        var context = {
          state: ${JSON.stringify(store.state)}
        }
      </script>
      <script src="./index.js"></script>
    </body>
  </html>`;
});

app.listen(3000);