import React from 'react';
import 'isomorphic-unfetch';
import { PreferentialWrapper, ChooseBorder, ChooseBtn } from 'Styled/preferentialStyled';
import PreTitleList from './preTitleList';
import * as activityAPI from '../../actions/activityAPI';

class PreTitle extends React.Component {
  constructor(props) {
    super(props);

    this.getBankDiscount = this.getBankDiscount.bind(this);
    this.getCreditDiscount = this.getCreditDiscount.bind(this);
    this.borderSlip = this.borderSlip.bind(this);
    this.deletePathOpen = this.deletePathOpen.bind(this);

    this.state = {
      creditData: [],
      bankData: [],
      isChoice: true,
      isLoading: true,
      isError: false,
      blockValue: '',
      pathOpen: false,
      idOpen: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathOpen !== this.state.pathOpen) {
      this.setState({
        pathOpen: nextProps.pathOpen,
        blockValue: 1,
        idOpen: nextProps.idOpen,
        isChoice: false,
      });
    }
  }

  borderSlip(value) {
    this.setState({
      isChoice: value == 0,
      blockValue: value,
    });
  }

  // 取得信用卡優惠
  getCreditDiscount() {
    this.setState({
      isLoading: true,
    });

    const type = '1,11';
    activityAPI
      .getcredit_and_bank(type)
      .then(result => {
        this.setState({
          isLoading: false,
          creditData: result.result,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  // 取得銀行優惠
  getBankDiscount() {
    this.setState({
      isLoading: true,
    });

    const type = '2,10';
    activityAPI
      .getcredit_and_bank(type)
      .then(result => {
        this.setState({
          isLoading: false,
          bankData: result.result,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  componentDidMount() {
    this.getCreditDiscount();
    this.getBankDiscount();
    this.borderSlip(0);
  }

  deletePathOpen() {
    // 取消PathOpen
    this.setState(
      {
        pathOpen: false,
      },
      () => {
        this.props.deletePathOpen();
      },
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <PreferentialWrapper>
          <div className="wrapper">
            <div className="title">
              <ChooseBtn onClick={() => this.borderSlip(0)} choice={this.state.isChoice}>
                信用卡優惠
              </ChooseBtn>
              <ChooseBtn onClick={() => this.borderSlip(1)} choice={!this.state.isChoice}>
                銀行滿額優惠
              </ChooseBtn>
              <ChooseBorder className="border" choice={this.state.isChoice} />
            </div>
            <div className="title-list">
              {this.state.blockValue === 0 ? (
                <PreTitleList
                  blockValue={this.state.blockValue}
                  pathOpen={this.state.pathOpen}
                  isLoading={this.state.isLoading}
                  isError={this.state.isError}
                />
              ) : null}
              {this.state.blockValue === 1 ? (
                <PreTitleList
                  blockValue={this.state.blockValue}
                  pathOpen={this.state.pathOpen}
                  isLoading={this.state.isLoading}
                  isError={this.state.isError}
                />
              ) : null}
            </div>
          </div>
        </PreferentialWrapper>
      );
    }
    if (this.state.creditData) {
      return (
        <PreferentialWrapper>
          <div className="wrapper">
            <div className="title">
              <ChooseBtn onClick={() => this.borderSlip(0)} choice={this.state.isChoice}>
                信用卡優惠
              </ChooseBtn>
              <ChooseBtn onClick={() => this.borderSlip(1)} choice={!this.state.isChoice}>
                銀行滿額優惠
              </ChooseBtn>
              <ChooseBorder className="border" choice={this.state.isChoice} />
            </div>

            <div className="title-list">
              {this.state.blockValue === 0 ? (
                <PreTitleList
                  blockValue={this.state.blockValue}
                  pathOpen={this.state.pathOpen}
                  deletePathOpen={this.deletePathOpen}
                  titlelist={this.state.creditData}
                  isLoading={this.state.isLoading}
                  isError={this.state.isError}
                />
              ) : null}
              {this.state.blockValue === 1 ? (
                <PreTitleList
                  blockValue={this.state.blockValue}
                  pathOpen={this.state.pathOpen}
                  idOpen={this.state.idOpen}
                  deletePathOpen={this.deletePathOpen}
                  titlelist={this.state.bankData}
                  isLoading={this.state.isLoading}
                  isError={this.state.isError}
                />
              ) : null}
            </div>
          </div>
        </PreferentialWrapper>
      );
    }
    if (this.state.isError) {
      return (
        <PreferentialWrapper>
          <div className="wrapper">
            <div className="title">
              <ChooseBtn onClick={() => this.borderSlip(0)} choice={this.state.isChoice}>
                信用卡優惠
              </ChooseBtn>
              <ChooseBtn onClick={() => this.borderSlip(1)} choice={!this.state.isChoice}>
                銀行滿額優惠
              </ChooseBtn>
              <ChooseBorder className="border" choice={this.state.isChoice} />
            </div>
            <div className="title-list">
              {this.state.blockValue === 0 ? (
                <PreTitleList
                  blockValue={this.state.blockValue}
                  pathOpen={this.state.pathOpen}
                  isLoading={this.state.isLoading}
                  isError={this.state.isError}
                />
              ) : null}
              {this.state.blockValue === 1 ? (
                <PreTitleList
                  blockValue={this.state.blockValue}
                  pathOpen={this.state.pathOpen}
                  isLoading={this.state.isLoading}
                  isError={this.state.isError}
                />
              ) : null}
            </div>
          </div>
        </PreferentialWrapper>
      );
    }
  }
}

export default PreTitle;
