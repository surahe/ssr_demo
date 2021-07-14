import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import { render } from './utils';
import routes from '../Routes';
import { getStore } from '../store';

const app = express();
app.use(express.static('public'));

app.use('/api', proxy('http://localhost:4000', {
  proxyReqPathResolver: function (req) {
    return '/api' + req.url
  }
}));

//注意这里要换成*来匹配
app.get('*', function (req, res) {
  const store = getStore();
  //调用matchRoutes用来匹配当前路由(支持多级路由)
  const matchedRoutes = matchRoutes(routes, req.path)
  //promise对象数组
  const promises = [];
  matchedRoutes.forEach(item => {
    //如果这个路由对应的组件有loadData方法
    if (item.route.loadData) {
      //那么就执行一次,并将store传进去
      //注意loadData函数调用后需要返回Promise对象
      promises.push(item.route.loadData(store))
    }
  })
  Promise.all(promises).then(() => {
    //此时该有的数据都已经到store里面去了
    //执行渲染的过程(res.send操作)
    res.send(render(store, routes, req));
  })

});

app.listen(3001, () => {
  console.log('listen:3001')
});
