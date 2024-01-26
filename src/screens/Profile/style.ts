import styled from "styled-components";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 105px);
`;

export const Body = styled.div`
  width: 100%;
  height: calc(100vh - 105px);
  padding: 40px 200px;
  @media (max-width: 768px) {
  padding: 40px 0px;
  }
`;

export const GeneralContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;

  grid-template-columns: repeat(2, fit-content(100%));

  place-content: space-between;
  place-items: start;
  align-self: center;

  @media (max-width: 1366px) {
  max-width: 100%;
  place-content: center;
  gap: 64px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, fit-content(100%));
    gap: 48px;
    place-items: center;
    place-content: center;
    padding-bottom: 40px;
  }
`;

export const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    width: calc(100% - 48px);
    order: 2;
  }
`;

export const LeftContainerSmall = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 22px;
  @media (max-width: 768px) {
   align-items: center;
  }
  @media (max-width: 500px) {
    width: calc(100% - 48px);
  }
`;

export const RightContainerSmall = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const CardContainer = styled.div`
  height: fit-content;
  width: 423px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
  border-radius: 28px;
  padding: 32px 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
    width: 100%;
    height: unset;
    padding: 32px;
  }
`;

export const LineRadio = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 6px;
`;

export const Linned = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  gap: 8px;
`;

export const FormContainer = styled.div`
  width: 687px;
  height: fit-content;
  padding: 30px;
  border-radius: 10px;
  background-color: ${NEUTRAL_COLORS.WHITE};
  box-shadow: 0px 4px 14px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const GeneralText = styled.div`
  font-size: 16px;
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

export const Cards = styled.div<{choose: boolean}>`
  height: 60px;
  width: 100%;
  background-color: ${ props => props.choose ? NEUTRAL_COLORS.GRAY : NEUTRAL_COLORS.LIGHT_GRAY};
  border-left: 5px solid ${PRIMARY_COLORS.NIGHT_BLUE};
  border-radius: 5px 0px 0px 5px;
  margin-top: 18px;
  cursor: pointer;
  padding-left: 20px;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    height: unset;
    min-height: 60px;
  }
`;

export const ButtonLine = styled.div`
  width: 100%;
  display: flex;
  margin-top: 22px;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
`;

export const Answer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SuitStartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InfoLineStart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    gap: 16px;
  }
`;