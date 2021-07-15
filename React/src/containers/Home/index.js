import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions'
import styles from './style.css';
import withStyles from 'isomorphic-style-loader/withStyles';

class Home extends Component {
  render() {
    const { list } = this.props
    return list.map(item => <div key={item.id}>{item.title}</div>)
  }
  UNSAFE_componentWillMount() {
    // 判断当前的数据是否已经从服务端获取
    // 要知道，如果是首次渲染的时候就渲染了这个组件，则不会重复发请求
    // 若首次渲染页面的时候未将这个组件渲染出来，则一定要执行异步请求的代码
    // 这两种情况对于同一组件是都是有可能发生的
    if (!this.props.list.length) {
      this.props.getHomeList()
    }
  }
}

const mapStateToProps = state => ({
  list: state.home.newsList,
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList());
  }
})

Home.loadData = (store) => {
  return store.dispatch(getHomeList())
}

// 连接store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
// const exportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles));