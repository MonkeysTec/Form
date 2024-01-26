import Done from "../../assets/icons/Done/Done";
import { NEUTRAL_COLORS } from "../../constants/styleConstants";
import { Text } from "../Text";
import * as S from "./style";

interface StepProps {
  step: number;
}

export const Step = (step: StepProps) => {
  return (
    <S.Container>
      <S.Ball step={step.step >= 1 ? true : false}>
        <Text fs={15} fw={700} color={NEUTRAL_COLORS.WHITE} value="1" />
      </S.Ball>
      <S.Line />
      <S.Ball step={step.step >= 2 ? true : false}>
        <Text fs={15} fw={700} color={NEUTRAL_COLORS.WHITE} value="2" />
      </S.Ball>
      <S.Line />
      <S.Ball step={step.step >= 3 ? true : false}>
        <Text fs={15} fw={700} color={NEUTRAL_COLORS.WHITE} value="3" />
      </S.Ball>
      <S.Line />
      <S.Ball step={step.step >= 4 ? true : false}>
        <Text fs={15} fw={700} color={NEUTRAL_COLORS.WHITE} value="4" />
      </S.Ball>
      <S.Line />
      <S.Ball step={step.step >= 5 ? true : false}>
        <Done color={NEUTRAL_COLORS.WHITE} />
      </S.Ball>
    </S.Container>
  );
};
