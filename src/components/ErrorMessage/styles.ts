import styled from "styled-components";
import { STATUS_COLORS } from "../../constants/styleConstants";

export const ErrorMessage = styled.span`
  color: ${STATUS_COLORS.ERROR};
  font-size: 12px;
  font-weight: 500;
  line-height: 10px;
  text-decoration: none;
  font-family: Montserrat;
  margin-top: 8px;
  display: flex;
  justify-content: flex-start;
`;