import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import DownPointer from "../../assets/icons/down-pointer/DownPointer";
import { PRIMARY_COLORS } from "../../constants/styleConstants";
import { InputLabelProps } from "./Select.props";
import { debounce } from 'lodash'

export const Select: React.FC<InputLabelProps> = ({
  inputProps,
  containerProps,
  labelProps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState('');

  const handleChange = (option: string) => {
    inputProps.onChange(option);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const debouncedChangeHandler = debounce((value: string) => {
    setFilteredOptions(value);
  }, 300);

  const clickOutside = (e: any) => {
    if (e.target.closest("ul")) return;
    setIsOpen(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', clickOutside);
    } else {
      document.removeEventListener('mousedown', clickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen]);

  return (
    <S.Container onClick={() => inputRef.current?.focus()} values={containerProps}>
      <S.Label values={labelProps}>{labelProps.value}</S.Label>
      <S.Input
        values={inputProps}
        onClick={handleOpen}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {inputProps.ph && !inputProps.value ? (
          <input onBlur={inputProps.onBlur} ref={inputRef} value={inputProps.value} onChange={(e) => {
            inputProps.onChange(e.currentTarget.value)
            debouncedChangeHandler(e.currentTarget.value)
            if (e.currentTarget.value.length > 0) {
              setIsOpen(true)
            }
          }} />
        ) : (
          <input onBlur={inputProps.onBlur} ref={inputRef} value={inputProps.value} onChange={(e) => {
            inputProps.onChange(e.currentTarget.value)
            debouncedChangeHandler(e.currentTarget.value)
            if (e.currentTarget.value.length > 0) {
              setIsOpen(true)
            }
          }} />
        )}
        {isOpen && (
          <S.Options onBlur={() => clickOutside}>
            {inputProps.options.filter((option) => {
              return option?.toLowerCase().includes(filteredOptions.toLowerCase());
            }).map((option, i) => (
              <li key={option + i} onClick={() => handleChange(option)}>
                <button >{option}</button>
              </li>
            ))}
          </S.Options>
        )}
        <DownPointer color={PRIMARY_COLORS.JEANS_BLUE} />
      </S.Input>
      {inputProps.errorMessage && <S.ErrorMessage>{inputProps.errorMessage}</S.ErrorMessage>}
    </S.Container>
  );
};
