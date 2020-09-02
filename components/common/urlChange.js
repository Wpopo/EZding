import React from 'react';
import { UrlChangeWrapper } from '../../styled/commonStyled';

export default () => {
  return (
    <UrlChangeWrapper>
      <img className="loading" alt="loading" src={'/static/common/loading.gif'} />
    </UrlChangeWrapper>
  );
};
