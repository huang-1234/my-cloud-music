
// 封装的接口
import { axiosInstance } from './config';
// import { banner } from 'NeteaseCloudMusicApi';
// import { personalized_newsong } from './../../../Node/NeteaseCloudMusicApi/interface.d';

export const getBannerRequest = () => {
  return axiosInstance.get('./banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('./personalized');
}