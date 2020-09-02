import React from 'react';
import 'isomorphic-unfetch';
import { PreferentialTitleList } from 'Styled/preferentialStyled';
import PopUpContent from '../common/popUpContent';
import LoadingCircle from '../common/loading';
import PrePrices from './prePrices';
import * as activityAPI from '../../actions/activityAPI';

class PreTitleList extends React.Component {
  constructor(props) {
    super(props);

    this.popUpOpen = this.popUpOpen.bind(this);
    this.getDetailPlan = this.getDetailPlan.bind(this);
    this.showUi = this.showUi.bind(this);

    this.state = {
      visiblePopUp: false,
      checked: null,
      isLoading: this.props.isLoading,
      isError: this.props.isError,
      titlelist: this.props.titlelist,
      paymentName: '',
      paymentDesc: [],
      pathOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({
        isLoading: nextProps.isLoading,
      });
    } else if (nextProps.isError !== this.state.isError) {
      this.setState({
        isError: nextProps.isError,
      });
    } else if (nextProps.titlelist !== this.state.titlelist) {
      this.setState({
        titlelist: nextProps.titlelist,
      });
    }

    if (nextProps.pathOpen !== this.state.pathOpen) {
      this.setState(
        {
          pathOpen: nextProps.pathOpen,
        },
        () => {
          this.getDetailPlan(this.props.idOpen);
        },
      );
    }
  }

  popUpOpen(item) {
    this.setState({
      visiblePopUp: true,
    });

    if (this.state.visiblePopUp === false) {
      this.setState(
        {
          visiblePopUp: true,
        },
        () => {
          // 取消上層的scrollbar
          document.body.style.overflow = 'hidden';
          document.getElementById('scrollHide').style.width = '100%';
          document.getElementById('scrollHide').style.overflow = 'hidden';
        },
      );
    } else {
      this.setState(
        {
          visiblePopUp: false,
          pathOpen: false,
        },
        () => {
          document.body.style.overflow = 'auto';
          document.getElementById('scrollHide').style.position = 'relative';
          document.getElementById('scrollHide').style.overflow = 'auto';
          this.props.deletePathOpen();
        },
      );
    }
  }

  // 帶入上層傳入的payment_id
  getDetailPlan(item) {
    activityAPI
      .getparentID(item)
      .then(result => {
        // 如果payment_desc為空值
        if (result.result == null || result.result.payment_desc == null) {
          const paymentDesc = [];
          paymentDesc.push(
            <div key="key" style={{ color: '#4a4a4a' }}>
              目前無資訊
            </div>,
          );

          this.setState(
            {
              paymentName: '',
              checked: item,
              paymentDesc,
            },
            () => {
              this.popUpOpen();
            },
          );
        } else {
          function handler(match) {
            const re = /#[A-z0-9]{6}/;
            const num = match.match(re);
            return `style=color:${num}`;
          }

          const text = result.result.payment_desc
            .replace(/color="#[A-z0-9]{6}"/g, handler)
            .replace(/<font/g, '<span')
            .replace(/\/font>/g, '/span>');

          const paymentDesc = [];

          paymentDesc.push(
            <div key="key">
              <p dangerouslySetInnerHTML={{ __html: text }} />
            </div>,
          );

          this.setState(
            {
              paymentName: result.result.payment_name,
              checked: item,
              paymentDesc,
            },
            () => {
              this.popUpOpen();
            },
          );
        }
      })
      .catch(error => {});
  }

  // show UI
  showUi() {
    return (
      <div>
        <h4>{this.state.paymentName}</h4>
        <h5>優惠適用資格：</h5>
        <span>{this.state.paymentDesc}</span>
        <PrePrices blockValue={this.props.blockValue} parentPaymentID={this.state.checked} />
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <PreferentialTitleList>
          <LoadingCircle height={'500px'} />
        </PreferentialTitleList>
      );
    }
    if (this.state.titlelist) {
      return (
        <div>
          {// show detail activity
          this.state.visiblePopUp ? (
            <PopUpContent popUpOpen={this.popUpOpen} visiblePopUp={this.state.visiblePopUp} showUi={this.showUi} />
          ) : null}
          <PreferentialTitleList>
            <div className="contentGropu">
              {this.state.titlelist.map((item, index) => {
                const bankName = item.payment_name.split('(')[0];

                const text = item.payment_name.split('(')[1];

                let discountPlan = null;
                if (text !== undefined) {
                  discountPlan = text.substring(0, text.length - 1);
                }

                return (
                  <div className="grid" key={index} onClick={() => this.getDetailPlan(item.payment_id)}>
                    <div className="wrap">
                      <div className="bank">{bankName}</div>
                      {discountPlan === null ? null : <div className="planDec">{discountPlan}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </PreferentialTitleList>
        </div>
      );
    }
    if (this.state.isError) {
      return <PreferentialTitleList>isError</PreferentialTitleList>;
    }
    return (
      <PreferentialTitleList>
        <LoadingCircle height={'500px'} />
      </PreferentialTitleList>
    );
  }
}

export default PreTitleList;
