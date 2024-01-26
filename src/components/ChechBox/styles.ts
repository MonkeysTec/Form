import styled from "styled-components";

interface CheckProps {
  checked: boolean;
  width?: number;
  height?: number;
  onChange: (value: any) => void;
}

export const CheckBox = styled.input<CheckProps>`
  min-width: ${ props => props.width ? props.width + 'px' : '25px'};
  height: ${ props => props.height ? props.height + 'px' : '25px'};
`;