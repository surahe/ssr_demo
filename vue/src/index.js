import Koa2 from 'koa';
import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';

// Vue部分
import App from './App.vue';
import { createRouter, routerReady } from './route.js';

const renderer = createRenderer();
const app = new Koa2();

/**
 * 应用接管路由
 */
app.use(async function (ctx) {
  const req = ctx.request;

  const router = createRouter(); //创建路由

  const vm = new Vue({
    router,
    render: (h) => h(App),
  });

  router.push(req.url);

  // 等到 router 钩子函数解析完
  await routerReady(router);

  //获取匹配的页面组件
  const matchedComponents = router.getMatchedComponents();

  if (!matchedComponents.length) {
    ctx.body = '没有找到该网页,404';
    return;
  }

  ctx.set('Content-Type', 'text/html;charset=utf-8');

  const htmlString = await renderer.renderToString(vm);

  ctx.body = `<html>
  <head>
  </head>
    <body>
      ${htmlString}
    </body>
  </html>`;
});

app.listen(3000);