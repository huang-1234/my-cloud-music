import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle  } from 'react';
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';

import style from '../../assets/global-style'
const ScrollContainer = styled.div`
  width:100%;
  height:100%;
  overflow:hidden;
  /* overflow:auto; */
  .before {
  position: absolute;
  top: -300px;
  height: 400px;
  width: 100%;
  background: ${style["theme-color"]};
  }
`;

const Scroll = forwardRef((props, ref) => {
  
  const [bScroll, setBScroll] = useState();

  const scrollContainerRef = useRef();

  const { direction, click, refresh, bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll } = props;

  // 将scrollContainerRef.current作为better-scroll的构造函数里第一个参数
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: 'horizental' === direction,
      scrollY: 'vertical' === direction,
      //
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  },
    [bounceBottom, bounceTop, click, direction]
  );

  // 对滑动是进行监听
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  // 用户的滑动行为
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp, bScroll]);

  // 对用户的下拉行为做scroll.on监听
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown, bScroll]);

  // 监听用户的刷新行为
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });
  
  // 
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {/* sanyuan: <ScrollContainer ref={scrollContaninerRef}> */}
      {props.children}
    </ScrollContainer>
  );
});
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;
/* 
scroll 组件已经初步实现。但是，这还不够。
还有一些细节，比如防抖，loading 控制等等，后期会一步一步完善
*/