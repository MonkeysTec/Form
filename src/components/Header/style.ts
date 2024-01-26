import styled from "styled-components"
import { PRIMARY_COLORS } from "../../constants/styleConstants"

export const Container = styled.div`
  width: 100%;
  height: 105px;
  min-height: 105px;
  background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
  padding: 0px 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 24px;
  }
`;

export const Logo = styled.img`
  width: 138px;
  height: 50px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: calc(138px * 0.8);
    height: calc(50px * 0.8);
  }
`;

export const DivHorizontal = styled.div`
  display: flex;
  flex-direction: rows;
  gap: 24px;
`;