# Recommend推荐页

## index.js 返回的JSX
```jsx
  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
```
## 组件说明

```js
  /* 
    刚才我们在components下写的Scroll组件就是在这个调用的。
    另外：
    可能你会不解，Content 样式组件是个什么鬼？在这里我要强调一下，better-scroll 的原理并不复杂，
    就是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，
    因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器。
  */
```

> 渲染的时候报了个错误
```js
  /* 渲染时报错如下
   Encountered two children with the same key, `http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg`. 
   Keys should be unique so that components maintain their identity across updates.
   Non-unique keys may cause children to be duplicated and/or omitted — 
   the behavior is unsupported and could change in a future version.
  */
```

## redux 层开发
在 Recommend 目录下，新建 store 文件夹，然后新建以下文件
```js
actionCreators.js// 放不同 action 的地方
constants.js      // 常量集合，存放不同 action 的 type 值
index.js          // 用来导出 reducer，action
reducer.js        // 存放 initialState 和 reducer 函数
```

## 1. 声明初始化 state
初始化 state 在 reducer 中进行
```js
//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS ({
  bannerList: [],
  recommendList: [],
});
```


## 2. 定义 constants
```js
//constants.js
export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';

export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';
```


## 3. 定义 reducer 函数
在 reducer.js 文件中加入以下处理逻辑，由于存放的是 immutable 数据结构，所以必须用 set 方法来设置新状态，同时取状态用 get 方法。
```js
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set ('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set ('recommendList', action.data);
    default:
      return state;
  }
}
```

## 4. 编写具体的 action
```js
//actionCreators.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS (data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS (data)
});

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest ().then (data => {
      dispatch (changeBannerList (data.banners));
    }).catch (() => {
      console.log ("轮播图数据传输错误");
    }) 
  }
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest ().then (data => {
      dispatch (changeRecommendList (data.result));
    }).catch (() => {
      console.log ("推荐歌单数据传输错误");
    });
  }
};
```

## 5. 将相关变量导出
```js
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'

export { reducer, actionCreators };
```
如果以后要加入新状态，或者创建新的 reducer 模块，直接走这些步骤即可。

## 组件连接 Redux
首先，需要将 recommend 下的 reducer 注册到全局 store，在 store/reducer.js 中，内容如下:
<font color=red>全局的store，就是src/store.reducer.js</font>
```js
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers ({
  recommend: recommendReducer,
});
```
注册完成！

## 组件连接Redux

```js
import React from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
// 下面两个是超级顺滑的UI组合
import { Content } from './style';
import Scroll from '../../baseUI/Scroll'
// 新增加的两个为了连接store
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
```

```error
actionCreators.js中的一个type写错了
ype: actionTypes.CHANGE_BANNER,

```