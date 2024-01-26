import React from 'react';
import * as S from './styles';
import { useController } from 'react-hook-form';

interface RadioButtonProps {
  name: string;
  control: any;
  value: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ name, control, value }) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <S.RadioButton
      type="radio"
      value={value}
      checked={field.value === value}
      onChange={() => field.onChange(value)}
    />
  );
};
