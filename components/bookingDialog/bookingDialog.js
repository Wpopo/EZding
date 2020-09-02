import React from 'react';
import { BookingDialogWrapper, ChoiceBtn, ChoiceBtnBottom, Clearfix } from '../../styled/bookingDialogStyled';
import BookingDialogMovie from './bookingDialogMovie';
import BookingDialogLocation from './bookingDialogLocation';
import BookingDialogGoToWhere from './bookingDialogGoToWhere';

class BookingDialog extends React.Component {
  constructor(props) {
    super(props);

    this.bottomClick = this.bottomClick.bind(this);
    this.bottomClick2 = this.bottomClick2.bind(this);
    this.gotowhere = this.gotowhere.bind(this);

    this.state = {
      isChoice: true,
      isMovieShow: true,
      isGoToShow: false,
    };
  }

  bottomClick() {
    this.setState({
      isChoice: true,
      isMovieShow: true,
    });
  }

  bottomClick2() {
    this.setState({
      isChoice: false,
      isMovieShow: false,
    });
  }

  gotowhere() {
    this.setState({
      isGoToShow: !this.state.isGoToShow,
    });
  }

  render() {
    const { isGoToShow, isChoice, isMovieShow } = this.state;
    return (
      <div>
        {// 點選電影後畫面切換成找影城或空位的畫面
        isGoToShow ? (
          <BookingDialogGoToWhere dialog={this.props.dialog} gotowhere={this.gotowhere} />
        ) : (
          // 選擇電影 或 選擇地區
          <BookingDialogWrapper>
            <div className="wrapper">
              <div className="cancel-icon" onClick={this.props.dialog}>
                <span className="cancel1" />
                <span />
              </div>

              <ChoiceBtn onClick={this.bottomClick} choice={isChoice}>
                <div className="text">想看什麼電影？</div>
              </ChoiceBtn>
              <ChoiceBtn onClick={this.bottomClick2} choice={!isChoice}>
                <div className="text right">想到哪看？</div>
              </ChoiceBtn>

              <ChoiceBtnBottom choice={isChoice}>
                <div className="choiceWrapper">
                  <div className="bottom" />
                </div>
              </ChoiceBtnBottom>

              <Clearfix />
              {// 選擇電影 或 地區的內容
              isMovieShow ? (
                <BookingDialogMovie gotowhere={() => this.gotowhere()} />
              ) : (
                <BookingDialogLocation dialog={this.props.dialog} />
              )}
            </div>
          </BookingDialogWrapper>
        )}
      </div>
    );
  }
}

export default BookingDialog;
