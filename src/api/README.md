# api说明

## config
```js
现在在 src/api 目录下新建 config.js 文件，里面编写 axios 的配置:

import axios from 'axios';

export const baseUrl = 'http://xxx自己填';

//axios 的实例及拦截器配置
const axiosInstance = axios.create ({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误");
  }
);

export {
  axiosInstance
};
然后在同一个目录下新建 request.js 用来封装不同的网络请求，内容如下:

import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}
即需要的两个接口，到时候直接调这些函数即可。
```