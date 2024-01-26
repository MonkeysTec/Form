import { Header } from "../../components/Header";
import * as S from "./style";
//@ts-ignore
import background from "../../assets/images/landingpage.png";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS } from "../../constants/styleConstants";
import { Text } from "../../components/Text";
import HubSpotForm from "../../components/HubSpotForm";
import { TextContinueRegister } from "../../components/TextContinueRegister";

export const Login = () => {
  return (
    <S.Container
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <S.RightContainer>
        <S.TextContainer>
          <Title
            value={"Saia da poupança"}
            color={NEUTRAL_COLORS.WHITE}
            fs={32}
            fw={700}
            lh={38}
            ml={40}
          />
          <Text
            value={"Faça parte do futuro dos seus investimentos!"}
            color={NEUTRAL_COLORS.WHITE}
            fs={18}
            fw={500}
            lh={22}
            ml={40}
          />
        </S.TextContainer>
        <S.FormContainer>
          <HubSpotForm formId="7c1dd760-5fd1-43ea-aa36-2096bfa56494" portalId="9019723" region="na1" />
        </S.FormContainer>
        <S.LinkLogin>
          <TextContinueRegister />
        </S.LinkLogin>
      </S.RightContainer>
    </S.Container>
  );
};
