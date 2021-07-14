import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';
import clientAxios from '../client/request';
import serverAxios from '../server/request';

// 合并项目组件中store的reducer
const reducer = combineReducers({
  home: homeReducer
})

//服务端的store创建函数
export const getStore = () => {
  //让thunk中间件带上serverAxios
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

//客户端的store创建函数
export const getClientStore = () => {
  const defaultState = window.context ? window.context.state : {};
  //让thunk中间件带上clientAxios
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
