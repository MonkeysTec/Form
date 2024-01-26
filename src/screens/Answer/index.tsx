import { Header } from "../../components/Header";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button/style";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";

export const Answer = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <Header />
      <S.BodyContainer>
        <S.InsideContainer>
          <Title
            value={
              "Para uma melhor experiência, precisamos te conhecer melhor, vamos lá?"
            }
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={28}
            fw={700}
            lh={30}
          />
          <Title
            value={"Qual o meu perfil de investidor e para que ele serve?"}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={20}
            fw={700}
            lh={30}
            mt={24}
          />
          <Text
            value={
              "O perfil do investidor é uma ferramenta que ajuda a determinar qual é o tipo de investimento mais adequado para você, levando em consideração seu perfil de risco, objetivos financeiros e tolerância a perdas. Ele é importante porque cada pessoa tem diferentes preferências e níveis de conforto quando se trata de investimentos. Você será enquadrado em 1 de 3 perfis (Conservador, Moderado ou Agressivo). "
            }
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={16}
            fw={400}
            mt={24}
            mb={24}
            lh={22}
          />
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/patrimony")}
              values={{
                fs: 15,
                fw: 600,
                color: PRIMARY_COLORS.CORAL,
                border: `2px solid ${PRIMARY_COLORS.CORAL}`,
                width: 170,
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              values={{
                fs: 15,
                fw: 600,
                color: NEUTRAL_COLORS.WHITE,
                border: `2px solid ${PRIMARY_COLORS.NIGHT_BLUE}`,
                bgc: `${PRIMARY_COLORS.NIGHT_BLUE}`,
                width: 170,
              }}
            >
              Continuar
            </Button>
          </S.ButtonLine>
        </S.InsideContainer>
      </S.BodyContainer>
    </S.Container>
  );
};
