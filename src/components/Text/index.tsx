import { TextProps } from "./Text.props";
import * as S from "./style";

export const Text: React.FC<TextProps> = (props: TextProps) => {
  return <S.Text values={props}>{props.value}</S.Text>;
};
