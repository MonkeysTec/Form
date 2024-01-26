import styled from "styled-components";
import { PRIMARY_COLORS } from "../../constants/styleConstants";

export const GeneralContainer = styled.div`
  width: 100%;
  max-width: 1725px;
  display: grid;

  grid-template-columns: repeat(2, fit-content(100%));
  gap: 112px;

  place-content: space-between;
  place-items: start;
  align-self: center;

  @media (max-width: 1366px) {
  max-width: 100%;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, fit-content(100%));
    gap: 48px;
    place-items: center;
    padding-bottom: 40px;
  }
`;

export const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: calc(100% - 48px);
    order: 2;
  }
`;

export const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 22px;
  @media (max-width: 768px) {
    width: calc(100% - 48px);
    align-items: center;
  }
`;

export const CardContainer = styled.div`
  height: 255px;
  width: 423px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
  border-radius: 28px;
  padding: 0px 32px;
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
  @media (max-width: 500px) {
    flex-direction: column;
    margin-top: 0px;
  }
`;

export const ButtonLine = styled.div`
  width: 100%;
  display: flex;
  margin-top: 22px;
  justify-content: space-between;
  @media (max-width: 1366px) {
    gap: 196px;
  }
  @media (max-width: 500px) {
    gap: 20px;
  }
`;