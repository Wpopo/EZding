import styled from 'styled-components';

export const MemberLayout = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #3f3f3f;
`;
export const MemberContent = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  height: 100%;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;
  color: #ffffff;
`;
export const MemberLeft = styled.div`
  min-width: 320px;
  .wrapDescrib {
    margin: 0 auto;
    width: 240px;
    padding: 3.5rem 0 0 0;
    font-size: 18px;
    @media (max-width: 426px) {
      padding: 0;
    }
  }
  div {
    width: 240px;
    @media (max-width: 426px) {
      max-height: 320px;
      margin: 1.5rem auto;
    }
    margin: 2rem auto;
      img {
        width: 100%;
      }
    }
  }
`;
export const MemberRight = styled.div`
  min-width: 320px;
  div {
    text-align: center;
    .wraperLogo {
      padding: 8rem 0 0 0;
      width: 86px; //圖片的外框
      margin: 2.5rem auto;
      img {
        width: 100%;
      }
      @media (max-width: 426px) {
        padding: 5rem 0 0 0;
      }
    }
    .warningText {
      width: 200px;
      margin: 2px auto;
      span {
        display: block;
        text-align: left;
        color: #fa6b6b;
        font-size: 12px;
      }
    }
    .wraphr {
      width: 230px;
      display: inline-flex;
      justify-content: space-around;
      hr {
        width: 80px;
        border: none;
        border-bottom: 1px solid #8e8e8e;
      }
    }
    .wrapSocial {
      width: 150px;
      display: inline-flex;
      justify-content: space-around;
      margin: 1rem auto;
      img {
        width: 40px;
      }
    }

    .text {
      font-size: 14px;
      width: 100%;
      margin: 0.5rem auto;
    }
    .wrapCheckInput {
      display: inline-flex;
      justify-content: space-between;
      width: 230px;
      margin: 1rem auto;
    }
  }
  p {
    text-align: center;
    font-size: 21px;
    margin: 0 auto;
  }
`;

export const CheckInput = styled.input`
  border: 1px solid #292929;
  appearance: none;
  outline: none;
  height: 41px;
  width: 41px;
  margin: 0 0.25rem;
  background-color: #292929;
  border-radius: 2px;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  &:focus{
    border: 1px solid #e50a84;
    }
  }
`;

export const GrayButton = styled.div`
  margin: 1rem auto;
  border: 1px solid #dcdcdc;
  border-radius: 22px;
  text-align: center;
  cursor: pointer;
  width: 230px;
  height: 44px;
  color: #ffffff;
  div {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    span {
      font-size: 12px;
      color: #8e8e8e;
    }
  }
  &:hover {
    background-color: #e50a84;
    border: 1px solid #e50a84;
  }
`;

export const PhoneInput = styled.input`
  border: 1px solid #292929;
  appearance: none;
  outline: none;
  height: 44px;
  width: 214px;
  border-radius: 22px;
  background-color: #292929;
  font-size: 14px;
  color: white;
  padding-left: 1rem;
  margin-top: 1rem;
  position: relative;
`;

export const Eye = styled.span`
  position: absolute;
  transform: translate(-2.5rem, 2rem);
`;
export const Policy = styled.div`
  width: 230px;
  margin: 0 auto;
  display: inline-flex;
  div {
    text-align: left !important;
    cursor: pointer;
    svg {
      width: 1rem;
      margin-right: 2px;
    }
  }
  input {
    display: none;
  }
  label {
    font-size: 12px;
    span {
      color: #fa6b6b;
      cursor: pointer;
    }
  }
`;

export const SliderWrap = styled.div`
  margin: 0;
  div {
    margin: 2.5rem auto 0 auto;
    font-size: 1rem;
    @media (max-width: 426px) {
      margin: 0.25rem auto 0 auto;
    }
  }
  .slick-dots {
    transform: translateY(-11.75rem);
    text-align: left;
    @media (max-width: 426px) {
      transform: translateY(-14.5rem);
    }
    li {
      margin: 0;
    }
  }
`;
