import styled from "styled-components"
import { PRIMARY_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: 100%;
  height: 440px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
  padding: 0px 225px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width:100%;
    height: unset;
    padding: 24px 0px;
  }
`;

export const InsideContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 48px;
  @media (max-width: 768px) {
    width: calc(100% - 48px);
    padding: 0px 24px;
    display: grid;
    grid-template-columns: repeat(1, fit-content(100%));
    gap:16px;
  }

`;

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
`;

export const Logo = styled.img`
  width: 138px;
  height: 50px;
  cursor: pointer;
`;

export const Line = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
`;