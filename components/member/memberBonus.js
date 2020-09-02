import React from 'react';
import Router from 'next/router';
import { MemberBonusWrapper } from '../../styled/memberStyled';
// api
import * as memberAPI from '../../actions/memberAPI';

class MemberBonus extends React.Component {
  constructor(props) {
    super(props);

    this.getMemberPoints = this.getMemberPoints.bind(this);
    this.tipsClick = this.tipsClick.bind(this);
    this.gotoURL = this.gotoURL.bind(this);

    this.state = {
      isLoading: true,
      isError: false,
      memberPoint: '',
      isTipsShow: false,
      part: this.props.part,
    };
  }

  componentDidMount() {
    this.getMemberPoints();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.part !== this.state.part) {
      this.setState({
        part: nextProps.part,
      });
    }
  }

  getMemberPoints() {
    this.setState({
      isLoading: true,
    });

    const token = localStorage.getItem('accessToken');
    const point_type = 'ez_member_point';

    memberAPI
      .getMemberPoints(token, point_type)
      .then(result => {
        if (result.code === '401.103') {
          this.props.alertShow(true);
        } else if (result.code === '200') {
          this.setState({
            isLoading: false,
            memberPoint: result.result,
          });
        }
      })
      .catch(error => {
        this.setState(
          {
            isLoading: false,
            isError: true,
          },
          () => {
            this.props.alertShow(true);
          },
        );
      });
  }

  tipsClick() {
    this.setState({
      isTipsShow: !this.state.isTipsShow,
    });
  }

  gotoURL(pathname = '/memberCenter', q = { part: 'bonus' }) {
    Router.push({
      pathname,
      query: q !== '' ? q : null,
    });
  }

  render() {
    const { isLoading, memberPoint } = this.state;
    const { part } = this.props;

    if (isLoading) {
      return (
        <MemberBonusWrapper part={part}>
          <div className="bonusWrapper">
            <div className="titlebox" />
          </div>
        </MemberBonusWrapper>
      );
    }
    if (memberPoint) {
      return (
        <MemberBonusWrapper part={part}>
          <div className="bonusWrapper" onClick={() => this.gotoURL()}>
            <div className="titlebox">
              <div className="title">紅利點數</div>
              <RedPointTip handleClick={this.gotoURL} />
              <img className="listBtn" src="../../static/member/list.svg" />
              <div className="listtxt">紅利列表</div>
            </div>
            <div className="titleboxRWD" />
            <div className="sumPoint">
              <div className="point">{memberPoint.point_sum}</div>
              <span>點</span>
            </div>

            <div className="sumPointRWD">
              <img className="icon" src="../../static/member/point.svg" />
              <div className="text">目前擁有</div>
              <div className="point">{memberPoint.point_sum}</div>
              <div className="text dot">點</div>
              <RedPointTip handleClick={this.gotoURL} />
            </div>
          </div>
        </MemberBonusWrapper>
      );
    }
    return <MemberBonusWrapper part={part} />;
  }
}

const RedPointTip = ({ handleClick }) => (
  <img
    className="tips"
    onClick={e => {
      handleClick('/bonusContents', ''), e.stopPropagation();
    }}
    src="../../static/member/information.svg"
  />
);
export default MemberBonus;
