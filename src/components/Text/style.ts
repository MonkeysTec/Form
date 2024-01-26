import styled from "styled-components"
import { NEUTRAL_COLORS } from "../../constants/styleConstants"
import { TextProps } from "./Text.props"

export const Text = styled.p<{values: TextProps}>`
  color: ${ props => props.values.color ? props.values.color : NEUTRAL_COLORS.DARK};
  margin-top: ${ props => props.values.mt ? props.values.mt + 'px' : 'none'};
  margin-bottom: ${ props => props.values.mb ? props.values.mb + 'px' : 'none'};
  margin-left: ${ props => props.values.ml ? props.values.ml + 'px' : 'none'};
  margin-right: ${ props => props.values.mr ? props.values.mr + 'px' : 'none'};
  font-size: ${ props => props.values.fs ? props.values.fs + 'px' : '10px'};
  font-weight: ${ props => props.values.fw ? props.values.fw : '100'};
  line-height: ${ props => props.values.lh ? props.values.lh + 'px' : '25px'};
  text-decoration: ${ props => props.values.td ? props.values.td : 'none'};
  text-decoration-color: ${ props => props.values.tdc ? props.values.tdc : NEUTRAL_COLORS.DARK };
  text-align: ${ props => props.values.ta ? props.values.ta : 'none' };
  cursor: ${ props => props.values.pointer ? 'pointer' : 'null' };
`;