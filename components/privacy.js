import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

class Privacy extends React.Component {
  state = {
    ezdingCookie: Cookies.get('ezdingCookie'),
    isShow: 'flex',
  };

  showPrivacy = () => {
    this.setState({ ezdingCookie: 'ezding' });
    this.setState({ isShow: 'none' });
    Cookies.set('ezdingCookie', 'ezding', { path: '/' });
  };

  render() {
    return (
      <ROOT diplayOrNot={this.state.isShow}>
        {/* {console.log('cookie', this.state.ezdingCookie === 'ezding')} */}
        <TittleStyle>
          本網站使用cookie以提供您更優質的服務，繼續瀏覽即表示您同意我們使用相關資訊。 
        {/*<SPAN>請詳閱隱私權條款</SPAN>*/}
        </TittleStyle>
        <EZBUTTON onClick={this.showPrivacy}>
          <EZBUTTONTEXT>我知道了！請關閉提示</EZBUTTONTEXT>
        </EZBUTTON>
      </ROOT>
    );
  }
}

export default Privacy;

const ROOT = styled.div`
  display: ${(props) => {
    // console.log('props.diplayOrNot', props.diplayOrNot);
    return props.diplayOrNot;
  }};
  height: 75px;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 100;
  // position: fixed;
  background-color: #3f3f3f;
  @media (max-width: 768px) {
    height: 150px;
    flex-direction: column;
  }
`;
const TittleStyle = styled.div`
  color: #ffffff;
  width: 743px;
  font-size: 16px;
  margin: 0px 10px;
  @media (max-width: 768px) {
    width: 284px;
    height: 66px;
    margin: 10px 10px 0px 15px;
  }
`;
const SPAN = styled.span`
  color: #f88bd0;
`;
const EZBUTTONTEXT = styled.div`
  font-size: 16px;
  font-weight: 500;
  height: 22px;
`;
const EZBUTTON = styled.div`
  width: 230px;
  height: 44px;
  border-radius: 22px;
  color: #ffffff;
  background-color: #e50081;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px;
  @media (max-width: 768px) {
    margin: 10px 10px;
  }
`;
