import styled, { css, keyframes } from 'styled-components';
import Palette from 'Styled/palette';
import { WrapperSample } from './commonStyled';

const sizes = {
  desktop: 1439,
  pad: 1023,
  phone: 767,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

// loading
const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const PaymentWebWrapper = styled(WrapperSample)`
  padding-top: ${props => (props.isNavber ? '80px' : '20px')};
  background-color: ${Palette.primary['gray-1']};
  font-size: 14px;
  font-family: PingFangTC, Microsoft JhengHei, system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Helvetica,
    Arial, sans-serif;

  p,
  span {
    color: ${Palette.primary['white-1']};
  }

  .center {
    text-align: center;
    margin: auto;
  }

  .padding-bottom-10 {
    padding-bottom: 15px !important;
  }

  // 禁止text-selected
  .no_copy {
    -webkit-user-select: none; // Chrome all, Safari all
    -moz-user-select: none; // Firefox all
    -ms-user-select: none; // IE 10+
    user-select: none; // Likely future
  }

  .load {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    color: #f2f4f8;
    animation: ${rotate360} 1s infinite;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${Palette.primary['black-2']} inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  .fullPage {
    width: 100%;
    height: calc(100% - 80px);
    margin: auto;
    background-color: ${Palette.primary['gray-1']};

    .twoBlocks {
      display: flex;
      margin-left: 60px;

      .left {
        flex: 1;
        padding-top: 40px;
        .fullWrap {
          margin: auto;
          max-width: 648px;
          padding: 0 28px;
        }

        .twoWrap {
          display: flex;
          justify-content: center;
          flex: 1;
          height: 100%;

          .leftWrap {
            min-width: 96px;
            display: inline-flex;
          }
          .rightWrap {
            max-width: 618px;
            padding: 0 56px;
            flex: 1;
          }
        }
      }

      .right {
        width: 400px;
        min-width: 400px;
        min-height: calc(100vh - 80px);
        color: ${Palette.primary['white-1']};

        .markpoint {
          height: calc(100% - 90px);
          padding: 45px 25px;
          background-color: ${Palette.primary['black-3']};
        }
      }
    }
  }

  .checkCircle {
    label {
      background-color: ${Palette.support['gray-1']};
      :after {
        border-color: ${Palette.primary['gray-1']};
      }
    }
    input[type='checkbox'] {
      margin: auto;
      :checked + label {
        background-color: ${Palette.primary['pink-1']};
      }
    }
  }

  .tag {
    text-decoration: underline;
    :hover,
    :focus {
      cursor: pointer;
    }
    :hover {
      color: ${Palette.primary['pink-1']};
    }
  }

  .expansionWrap {
    .box {
      padding-bottom: 50px;
    }
    .sortWrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 12px;

      svg {
        width: 14px;
        height: 14px;
        padding: 5px;
        margin-right: 3px;
        color: ${Palette.secondary['gray-70']};
        background-color: ${Palette.secondary['gray-80']};
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
      }

      svg,
      span {
        cursor: pointer;
      }
    }
    .titleWrap {
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px ${Palette.secondary['gray-70']};
      padding: 8px 0;

      &.noLine {
        border: unset;
      }
      .more {
        font-size: 14px;
        font-weight: bold;
        color: ${Palette.secondary['gray-60']};
        cursor: pointer;
        align-items: center;
        padding-right: 10px;

        &.open {
          color: #ffffff;
          text-decoration: underline;
        }
      }
    }
    .title {
      font-size: 18px;
      color: ${Palette.support['pink-1']};
    }
    .checkWrap {
      display: flex;
      flex-direction: column;
      .check {
        margin: auto;
        display: flex;
        flex-direction: column;

        .check-input {
          display: flex;
          margin-bottom: 8px;

          div:nth-child(2) {
            margin-left: 8px;
          }

          &.OTP {
            position: relative;
            .OTP-button {
              position: absolute;
              right: 8px;
              top: 6px;
              width: 80px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size: 12px;
              border: 1px solid #ffffff;
              border-radius: 30px;
              background-color: #ffffff;
              color: #000000;
              cursor: pointer;
            }
            input {
              width: calc(288px - 112px); // 128 = 96+16
              padding: 0 96px 0 16px;
            }
            .cancelIcon {
              right: 96px;
            }
          }
        }

        .check-text {
          text-align: center;
          padding: 4px 0 0 0;

          &.check_OK {
            color: ${Palette.Check.OK};
          }
          &.check_Error {
            color: ${Palette.Check.Error};
          }
        }
      }
    }
  }

  .foodWrap {
    display: flex;
    flex-wrap: wrap;
    // 加上 foodItem 的padding-right 16px
    // 已維持畫面比例
    width: calc(100% + 16px);
    .foodItem {
      padding-right: 16px;
      padding-bottom: 18px;
    }
    .foodContext {
      display: inline-block;
      img {
        width: 150px;
        height: 100px;
      }
    }
  }
  ${media.pad`
    .fullPage {
      .twoBlocks {
        margin-left: 0px;
        .left {
          padding-top: 0px;
          .fullWrap {
            max-width: 712px;
          }
          .twoWrap {
            .rightWrap {
              max-width: 588px;
              margin: 0 40px;
            }
          }
        }
        .right {
          width: 0px;
          min-Width: 0px
        }
      }
    }
  `}
  ${media.phone`
    .fullPage {
      padding-bottom: 72px; // 扣除下方固定列
      .twoBlocks {
        margin-left: 0px;
        .left {
          .twoWrap {
            flex-direction: column;
            flex: 1;
            .rightWrap {
              max-width: unset;
              padding: 20px 15px 0px 15px;
              margin: unset;
            }
          }
        }
      }
    }
  `}
`;

export const ServicePolicyWrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 40px 16px 50px 16px;
  background-color: ${Palette.primary['gray-1']};

  .boxWrap {
    height: 450px;
    padding: 20px 0px;
    background-color: ${Palette.secondary['gray-80']};

    .box {
      height: 100%;
      padding: 0px 80px;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 7px;
      }
      ::-webkit-scrollbar-track {
        -webkit-border-radius: 10px;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 4px;
        border-radius: 4px;
        background-color: #212121;
      }
    }

    .title {
      font-size: 18px;
    }

    .subTitle {
      font-size: 16px;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
  }

  ${media.phone`
    padding: 0px 16px 40px 16px;

    .boxWrap {
      height: 390px;
      .box {
        padding: 0px 24px;
      }
    }
  `}
`;
