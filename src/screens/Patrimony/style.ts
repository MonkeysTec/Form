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
  }
`;

export const LeftContainer = styled.div`
  width: calc(100% + 20px);
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
    width: calc(100% - 48px);
    align-items: center;
  }
`;

export const RightContainerSmall = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
`;

export const LineCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);

  width: 100%;

  gap: 12px;
  place-content: center;
  margin-top: 6px;

  @media (max-width: 500px) {
  grid-template-columns: repeat(1,1fr);
  gap: 12px;
  }
`;

export const LineInput = styled(LineRadio)`
  @media (max-width: 500px) {
  flex-direction: column;
  }
`;

export const ButtonLine = styled.div`
  width: 100%;
  display: flex;
  margin-top: 22px;
  justify-content: space-between;
  margin-bottom: 40px;
  @media (max-width: 500px) {
    gap: 20px;
  }
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

export const GeneralText = styled.div`
  font-size: 15px;
  font-weight: 400;
`;