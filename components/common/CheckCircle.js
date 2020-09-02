import React from 'react';
import { CheckCircleWrapper } from 'Styled/commonStyled';

const CheckCircle = ({ id = 'checkbox', isChecked = false, size = 'normal', onClick }) => (
  <CheckCircleWrapper className="checkCircle" size={size}>
    <input type="checkbox" id={id} checked={isChecked} onChange={onClick} />
    <label htmlFor={id} />
  </CheckCircleWrapper>
);

export default CheckCircle;
