import React, { useEffect} from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
// 下面两个是超级顺滑的UI组合
import { Content } from './style';
import Scroll from '../../baseUI/Scroll'
// 新增加的两个为了连接store
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';

// ta是用function Recommend (props)
const Recommend = (props) => {

  // mock数据 bannerList with RecommendList。有了Redux和axios，下面两个静态数据直接丢弃
  
  const bannerList = [1, 2, 3, 4].map((item) => {
    return ({
      imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
    })
    
  })
  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
    return {
      id: 1,
      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    }
  });
  
  // 将上面的静态数据转换为动态数据
  // const { bannerList, recommendList } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  
  //useEffect
  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const bannerListJS = bannerList ? bannerList : [];
  const recommendListJS = recommendList ? recommendList : [];
  // 动态的从immutable中得到数据
  // const bannerListJS = bannerList ? bannerList.toJS() : [];
  // const recommendListJS = recommendList ? recommendList.toJS() : [];
  /* 
    刚才我们在components下写的Scroll组件就是在这个调用的。
    另外：
    可能你会不解，Content 样式组件是个什么鬼？在这里我要强调一下，better-scroll 的原理并不复杂，
    就是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，
    因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器。
  */
  return (
    <Content>
      <Scroll className="list">
        <div>
          {/* 既然数据都变为动态的了，那肯定这个传过去给相应的组件的时候也要变化形式了 */}
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
  /* 渲染时报错如下
   Encountered two children with the same key, `http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg`. 
   Keys should be unique so that components maintain their identity across updates.
   Non-unique keys may cause children to be duplicated and/or omitted — 
   the behavior is unsupported and could change in a future version.
  */
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
