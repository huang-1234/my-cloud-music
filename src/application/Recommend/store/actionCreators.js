
//actionCreators.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

// changeBannerList
export const changeBannerList = (data) => {
  return ({
    // ype: actionTypes.CHANGE_BANNER,
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data),
  })
}

// changeRecommendList
export const changeRecommendList = (data) => {
  return ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
  })
}

// getBannerList
export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then((data) => {
      console.log('bannersdata:', data)
      dispatch(changeBannerList(data.banners));
    }).catch(() => {
      console.log('getting Scroll Picture was wrong');
    })
  }
}

//
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest()
      .then((data) => {
      // 'data:',
        console.log('RecommendListdata:',data)
      dispatch(changeRecommendList(data.result));
    }).catch(() => {
      console.log('getting songs data of RecommendList was wrong');
    })
  }
}
