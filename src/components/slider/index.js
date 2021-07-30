import React,{useEffect,useState} from 'react';
import { SliderContainer } from './style';
// import "swiper/css/swiper.css";
// import 'swiper/swiper.min.css';
import 'swiper/swiper.scss';
import Swiper from "swiper";
const Slider = (props) => {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  // 设置轮播图的播放
  useEffect(() => {
    
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autopaly: {
          delay: 300,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' },
      });
      setSliderSwiper(newSliderSwiper);
    }
    console.log('output bannerList in Slider component', bannerList);
    
  }, [bannerList.length, sliderSwiper]);

  // const payForMusic = (url) => {
  //   // window.open('url')
  // }
  const SliderNodes = bannerList.map((slider) => {
    return (
      <div className="swiper-slide" key={slider.imageUrl}>
        <div className="slider-nav">
          <img src={slider.imageUrl} alt="recommend" width="100%" height="100%" />
          {/* <a href={slider.url}></a> */}
        </div>
      </div>
    )
  })

  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            SliderNodes
            /* 
            bannerList.map((slider) => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav" >
                    <img src={slider.imageUrl} alt="recommend" width="100%" height="100%"/>
                  </div>
                </div>
              )
            })
             */

          }
          {/* <div className="swiper-pagination"></div> */}
        </div>
      </div>
      <div className="before"></div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
