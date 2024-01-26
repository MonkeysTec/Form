import styled from "styled-components";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
  height: unset;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  height: 100%;

  padding: 40px calc(100 / 1366 * 100%);
  @media (max-width: 768px) {
  width: 100%;
  padding: 40px 0px;
  }
`;

export const GeneralContainer = styled.div`
  width: 100%;
  max-width: 1725px;
  display: grid;

  grid-template-columns: repeat(2, fit-content(100%));
  gap: 112px;

  place-content: space-between;
  place-items: center;
  align-self: center;

  @media (max-width: 1366px) {
  max-width: unset;
  width: 100%;
  padding: 0 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: fit-content(100%);
    gap: 0px;
  }

  @media (max-width: 500px) {
    width: 100%;
    align-self: flex-start;
  }
`;

export const LeftContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  gap: 12px;

  h1{
    font-size:40px;
    font-weight:700;
    color: ${PRIMARY_COLORS.NIGHT_BLUE};
  }

  padding-bottom: 32px;

  @media (max-width: 768px) {
  height: 100%;
  padding: 32px 0px;
  h1{
    font-size:32px;
    font-weight:700;
    color: ${PRIMARY_COLORS.NIGHT_BLUE};
  }
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const RightContainer = styled.div`
  display: flex;

  width: 100%;
  height: calc(100vh - 105px);

  flex-direction: column;
  justify-content: start;
  align-items: flex-end;

  @media (max-width: 768px) {
  height: 100%;
  padding: 32px 0px;
  align-items: center;
  }

  @media (max-width: 500px) {
    align-items: center;
  }
`;

export const CheckLine = styled.div`
  display: flex;
  gap: 12px;
`;

export const GeneralText = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

export const InfoContainer = styled.div`
  width: 456px;
  height: 623px;
  border-radius: 28px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  color: ${NEUTRAL_COLORS.WHITE};

  h1{
    font-size: 24px;
    font-weight: 700;
    line-height: 25px;
  }

  @media (max-width: 768px) {
    display: none;
    width: 100%;
    height: unset;

    h1{
    font-size: 20px;
    }

    padding: 24px;
  }
`;

export const DoubleContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const InfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
  @media (max-width: 500px) {
    gap: 16px;
  }
`;

export const InfoLineStart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 500px) {
    gap: 16px;
  }
`;

export const InfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  h2{
    line-height: 25px;
    font-size: 20px;
    font-weight: 700;
  }
  p{
    line-height: 25px;
    font-size: 16px;
    font-weight: 400;
  }

  @media (max-width: 500px) {
     h2{
    font-size: 16px;
     }
     p{
    font-size: 14px;
     }
  }
`;