import { InputLabelProps } from "./Input.props";
import * as S from "./style";

export const Input: React.FC<InputLabelProps> = ({
  inputProps,
  containerProps,
  labelProps,
  maxLength,
  ...rest
}) => {
  const handleChange = (value: string) => {
    inputProps.onChange(value);
  };

  return (
    <S.InputContainer values={containerProps}>
      <S.Label values={labelProps}>{labelProps.value}</S.Label>
      <S.Input
      {...rest}
      maxLength={maxLength}
        placeholder={inputProps.ph}
        type={inputProps.tp}
        value={inputProps.value}
        values={inputProps}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={inputProps.onBlur}
        ref={inputProps.ref}
      />
      {inputProps.errorMessage && <S.ErrorMessage>{inputProps.errorMessage}</S.ErrorMessage>}
    </S.InputContainer>
  );
};
