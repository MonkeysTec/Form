import styled from "styled-components"
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
`;

export const Ball = styled.div<{step: boolean}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${ props => props.step ? PRIMARY_COLORS.JEANS_BLUE : NEUTRAL_COLORS.GRAY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.div`
  width: 20px;
  height: 1px;
  background-color: ${NEUTRAL_COLORS.GRAY};
`;