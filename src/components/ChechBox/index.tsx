import * as S from "./styles";
import React from 'react';

interface CheckProps {
  checked: boolean;
  width?: number;
  height?: number;
  onChange: (value: any) => void;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckProps>(
  ({ checked, width, height, onChange }, ref) => {
    return (
      <S.CheckBox
        ref={ref}
        width={width}
        height={height}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }
);
