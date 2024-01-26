import { ButtonProps } from "./Button.props";
import * as S from "./style";

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <S.Button values={props} />;
};
