//reducer.js
import { combineReducers } from 'redux-immutable';
/* 
首先，需要将 recommend 下的 reducer 注册到全局 store，在 store/reducer.js 中，内容如下:
*/
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
});
// 注册完成！