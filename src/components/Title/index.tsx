import { TitleProps } from "./Title.props";
import * as S from "./style";

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
  return <S.Title values={props}>{props.value}</S.Title>;
};
