import { NEUTRAL_COLORS, PRIMARY_COLORS, STATUS_COLORS } from "../../constants/styleConstants";
import { InputLabelProps } from "./Input.props";
import * as S from "./style";
import { CurrencyInput } from "react-currency-mask";

export const InputCurrency: React.FC<InputLabelProps> = ({
  inputProps,
  containerProps,
  labelProps,
}) => {
  const handleChange = (value: string | number) => {
    inputProps.onChange(value);
  };

  const { errorMessage } = inputProps;

  return (
    <S.InputContainer values={containerProps}>
      <S.Label values={labelProps}>{labelProps.value}</S.Label>
      <CurrencyInput
        // @ts-ignore
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
        placeholder={inputProps.ph}
        valueIsNumericString={true}
        onChangeValue={(e, origin, masked) => handleChange(origin)
        }
        onBlur={inputProps.onBlur}
        ref={inputProps.ref}
      />
      {errorMessage && <S.ErrorMessage>{inputProps.errorMessage}</S.ErrorMessage>}
    </S.InputContainer>
  );
};
