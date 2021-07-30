import LazyLoad from "react-lazyload";

<LazyLoad placeholder={<img width='100%' height='100%' src={require('./music.png')} alt='music'/>}>
  <img src={item.picUrl + "?param=300*300"} width="100%" height="100%" alt="music" />
</LazyLoad>