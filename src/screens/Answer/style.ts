import styled from "styled-components";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: calc(100vh - 105px);
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 42px;
`;

export const InsideContainer = styled.div`
  width: 800px;
  height: 100%;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 42px;
  align-items: center;
  @media (max-width: 768px) {
    width: calc(100% - 48px);
    justify-content: start;
    padding-top: 32px;
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

export const GeneralText = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: ${PRIMARY_COLORS.NIGHT_BLUE};
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
  @media (max-width: 500px) {
    flex-direction: column;
    gap:16px;
    align-items: center;
    padding-bottom: 40px;
    }
`;

export const Answer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;