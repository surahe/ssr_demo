import Vue from 'vue';
import Router from 'vue-router';
import List from './pages/List';
import Search from './pages/Search';


Vue.use(Router);

export const createRouter = () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/list',
        component: List,
      },
      {
        path: '/search',
        component: Search,
      },
      {
        path: '/',
        component: List,
      },
    ],
  });
};
export const routerReady = async (router) => {
  return new Promise((resolve) => {
    // 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
    // 这可以有效确保服务端渲染时服务端和客户端输出的一致。
    router.onReady(() => {
      resolve(null);
    });
  });
};