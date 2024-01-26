import styled from "styled-components";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${NEUTRAL_COLORS.WHITE};
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;
  padding: 40px 0px;
  position: relative;
`;

export const InsideContainer = styled.div`
  width: 600px;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: calc(100% - 48px);
  }
`;

export const FormContainer = styled.div`
  width: 687px;
  height: fit-content;
  padding: 30px;
  border-radius: 10px;
  background-color: ${NEUTRAL_COLORS.WHITE};
  box-shadow: 0px 4px 14px 5px rgba(0, 0, 0, 0.25);
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

export const SmartphoneContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    place-content: center;
    width: 100%;
    gap: 24px;
  }
  `;

export const GeneralText = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${PRIMARY_COLORS.NIGHT_BLUE};
  margin-bottom: 24px;
`;

export const PercentageDiv = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  margin-bottom: 18px;
`;

export const PercentageFull = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
`;

export const PercentageEmpty = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${NEUTRAL_COLORS.LIGHT_GRAY};
`;

export const Cards = styled.div`
  height: 60px;
  width: 100%;
  background-color: ${NEUTRAL_COLORS.LIGHT_GRAY};
  border-left: 5px solid ${PRIMARY_COLORS.NIGHT_BLUE};
  border-radius: 5px 0px 0px 5px;
  margin-top: 18px;
  cursor: pointer;
  padding-left: 20px;
  display: flex;
  align-items: center;
`;

export const ButtonLine = styled.div`
  width: 100%;
  display: flex;
  margin-top: 22px;
  justify-content: space-between;
`;

export const Answer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;