import styled from "styled-components"
import { NEUTRAL_COLORS } from "../../constants/styleConstants"
import { ButtonProps } from "./Button.props"

export const Button = styled.button<{values: ButtonProps}>`
  height: ${ props => props.values.height ? props.values.height + 'px' : '40px'};
  width: ${ props => props.values.width ? props.values.width + 'px' : '100%'};
  border-radius: ${ props => props.values.br ? props.values.br + 'px' : '8px'};
  border: ${ props => props.values.border ? props.values.border : `2px solid ${NEUTRAL_COLORS.WHITE}`};
  background-color: ${ props => props.values.bgc ? props.values.bgc : 'unset'};
  color: ${ props => props.values.color ? props.values.color : NEUTRAL_COLORS.WHITE};
  margin-top: ${ props => props.values.mt ? props.values.mt + 'px' : 'none'};
  margin-bottom: ${ props => props.values.mb ? props.values.mb + 'px' : 'none'};
  margin-left: ${ props => props.values.ml ? props.values.ml + 'px' : 'none'};
  margin-right: ${ props => props.values.mr ? props.values.mr + 'px' : 'none'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;