import React from 'react';
import 'isomorphic-unfetch';
import { GuideTitleWrapper } from 'Styled/guideStyled';

const guideTitle = () => {
  const buttonToArea = value => {
    const buttonNodeDis = document.querySelector('.buttonToDiscount');
    const buttonNodeStep = document.querySelector('.buttonToStep');

    if (value === 0) {
      buttonNodeDis.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else {
      buttonNodeStep.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <GuideTitleWrapper>
      <div className="guideTitleWrap">
        <div className="leftTitle">
          <div className="leftTitleWord" />

          <div className="leftTriangleSec">
            <img className="lefttriangleImg" src={'/static/guide/triangle.svg'} onClick={() => buttonToArea(0)} />
            <a className="lefttriangle" onClick={() => buttonToArea(0)}>
              了解詳情
            </a>
          </div>
        </div>

        <div className="middleGift" />

        <div className="rightTitle">
          <div className="rightTitleWord" />

          <div className="rightTriangleSec">
            <img className="righttriangleImg" src={'/static/guide/triangle.svg'} onClick={() => buttonToArea(1)} />
            <a className="rightTriangleWord" onClick={() => buttonToArea(1)}>
              了解詳情
            </a>
          </div>
        </div>
        <div className="buttonToDiscount" />
      </div>
    </GuideTitleWrapper>
  );
};

export default guideTitle;
