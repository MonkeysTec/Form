import { PatternFormat } from "react-number-format";
import { InputLabelProps } from "./Input.props";
import * as S from "./style";
import { NEUTRAL_COLORS, PRIMARY_COLORS, STATUS_COLORS } from "../../constants/styleConstants";
import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

export const InputFormated = forwardRef<HTMLInputElement, InputLabelProps>(({
  inputProps,
  containerProps,
  labelProps,
}, ref) => {
  const handleChange = (value: string) => {
    inputProps.onChange(value);
  };

  const { errorMessage } = inputProps;

  return (
    <S.InputContainer values={containerProps}>
      <S.Label values={labelProps}>{labelProps.value}</S.Label>
      <IMaskInput
        mask={inputProps.mask}
        radix="."
        unmask={true} // true|false|'typed'
        style={{
          width: inputProps.width,
          height: "40px",
          borderRadius: "6px",
          border: errorMessage ? `2px solid ${STATUS_COLORS.ERROR}` : `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
          fontWeight: "400",
          fontFamily: "Montserrat",
          fontSize: "15px",
          color: NEUTRAL_COLORS.DARK,
          padding: "0px 10px",
        }}
        value={inputProps.value}
        onAccept={(value, masked) => {
          if (inputProps.maskedValueDate) {
            return inputProps.onChange(masked._value)
          } else {
            return inputProps.onChange(value)
          }
        }}
        // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
        //   const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        //   if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
        //     event.preventDefault();
        //   }
        // }}
        placeholder={inputProps.ph}
        onBlur={inputProps.onBlur}
  
      />
      {errorMessage && <S.ErrorMessage>{inputProps.errorMessage}</S.ErrorMessage>}
    </S.InputContainer>
  );
});
