/* eslint-disable import/no-anonymous-default-export */
//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
})

/* 
3. 定义 reducer 函数
在 reducer.js 文件中加入以下处理逻辑，由于存放的是 immutable 数据结构，
所以必须用 set 方法来设置新状态，同时取状态用 get 方法。
*/
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
}

// export default Reducer;
