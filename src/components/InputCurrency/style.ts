import styled from "styled-components"
import { NEUTRAL_COLORS, STATUS_COLORS } from "../../constants/styleConstants"
import { InputContainerProps, LabelProps, InputProps } from "./Input.props"

export const InputContainer = styled.div<{values: InputContainerProps}>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: ${ props => props.values.width ? props.values.width : '100%'};
  margin-top: ${ props => props.values.mt ? props.values.mt + 'px' : 'none'};
  margin-bottom: ${ props => props.values.mb ? props.values.mb + 'px' : 'none'};
  margin-left: ${ props => props.values.ml ? props.values.ml + 'px' : 'none'};
  margin-right: ${ props => props.values.mr ? props.values.mr + 'px' : 'none'};
`;

export const Label = styled.label<{values: LabelProps}>`
  color: ${ props => props.values.color ? props.values.color : NEUTRAL_COLORS.DARK};
  font-size: ${ props => props.values.fs ? props.values.fs + 'px' : '15px'};
  font-weight: ${ props => props.values.fw ? props.values.fw : '400'};
  line-height: ${ props => props.values.lh ? props.values.lh + 'px' : '10px'};
  text-decoration: ${ props => props.values.td ? props.values.td : 'none'};
  font-family: ${ props => props.values.ff ? props.values.ff : 'Montserrat'};
`;

export const Input = styled.input<{values: InputProps}>`
  padding: 0px 10px;
  width: ${ props => props.values.width ? props.values.width : '100%'};
  border: ${ props => props.values.border ? props.values.border : 'none'};
  height: ${ props => props.values.heigth ? props.values.heigth + 'px' : '40px'};
  color: ${ props => props.values.color ? props.values.color : NEUTRAL_COLORS.DARK};
  font-size: ${ props => props.values.fs ? props.values.fs + 'px' : '15px'};
  font-weight: ${ props => props.values.fw ? props.values.fw : '400'};
  text-decoration: ${ props => props.values.td ? props.values.td : 'none'};
  border-radius: ${ props => props.values.br ? props.values.br + 'px' : '0px'};
  font-family: ${ props => props.values.ff ? props.values.ff : 'Montserrat'};
  &::placeholder {
    color: ${ props => props.values.color ? props.values.color : NEUTRAL_COLORS.GRAY};
  }
`;

export const ErrorMessage = styled.span`
  color: ${STATUS_COLORS.ERROR};
  font-size: 12px;
  font-weight: 500;
  line-height: 10px;
  text-decoration: none;
  font-family: Montserrat;
  margin-left: 5px;
  margin-top: -5px;
  display: flex;
  justify-content: flex-end;
`;