import React from 'react';

import { getCount} from '../../api/utils'
import { ListWrapper,ListItem,List} from './style'

const RecommendList = (props) => {
  const RecommendListNodes = props.recommendList.map((item, index) => {
    return (
      <ListItem key={item.id + index}>
        <div className="img_wrapper">
          <div className="decorate"></div>
          {/* 加此参数可以减小请求的图片资源大小 */}
          <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{getCount(item.playCount)}</span>
          </div>
          {/* 
            下面的decorate具体作用看style.js的25-31
          */}
          <div className="decorate"></div>
        </div>
        <div className="desc">{item.name}</div>

      </ListItem>
    )
  })
  return (
    <ListWrapper>
      <h1 className="title">recommend song</h1>
      <List>
        {
          RecommendListNodes
        }
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);
