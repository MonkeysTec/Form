import styled from "styled-components";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
const background  = require("../../assets/images/atach.png");


export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
`;

export const SubHeader = styled.div`
  width: 100%;
`;

export const SubHeaderContainer = styled.div`
  width: 100%;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0px;
  }
`;

export const TextContainer = styled.div`
  padding: 50px 80px;
  display: flex;
  flex-direction: column;
  width: 45%;
  @media (max-width: 768px) {
    padding: 0px;
    width: calc(100% - 48px);

  }
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px;
`;

export const UnderHeader = styled.div`
  width: 100%;
  height: 476px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 200px;
  p{
    font-size: 22px;
    font-weight:400;
    span{
      color: ${PRIMARY_COLORS.ELETRIC_BLUE}
    }
  }
  @media (max-width: 768px) {
  height: unset;
  padding: 50px 24px;
  padding-bottom: 230px;
    p{
      font-size: 16px;
    }
  }
`;

export const GeneralText = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: ${NEUTRAL_COLORS.WHITE};
  text-align: center;
  @media (max-width: 500px) {
  font-size: 16px;
  text-align: unset;
  }
`;

export const UnderHeaderContent = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  width: 100%;
  @media (max-width: 500px) {
    text-align: unset;
    gap: 16px;
  }
`;

export const UpFooter = styled.div`
  width: 100%;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  @media (max-width: 768px) {
    padding-top: 32px;
    width: calc(100% - 48px);
    align-self: center;
    margin-top: 20px;
  }
`;

export const LineCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3,fit-content(100%));
  place-content: center;
  place-items: center;
  gap: 48px;
  margin-top: -170px;
  padding-bottom: 20px;
  @media (max-width: 768px) {
  grid-template-columns: repeat(1,fit-content(100%));
  padding-bottom: 0;
  }
`;

export const Card = styled.div`
  width: 378px;
  height: 349px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 0px 4px 14px 5px rgba(0, 0, 0, 0.25);
  padding: 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    width: calc(100% - 48px);
  }
`;

export const SmartphoneContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    place-content: center;
    width: 100%;
    gap: 24px;
    padding-bottom: 40px;
  }
  `;

export const SmartphoneImage = styled.img`

@media (max-width: 768px) {
  width: calc(100% - 112px);
}
@media (max-width: 500px) {
  width: 100%;
}
`;

export const QRCodeImage = styled.img`
position: absolute;
right: 15%;
top: 0px;
@media (max-width: 768px) {
  position: relative;
  right: 0;
}
@media (max-width: 500px) {
  width: 120px;
}
`;