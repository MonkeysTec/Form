//@ts-nocheck
import { Header } from "../../components/Header";
import { PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Title } from "../../components/Title";
import JAVABEANS from "../../assets/gifs/coffee.gif";
import DOWNAPP from "../../assets/images/downapp.png";
import QRCODE from "../../assets/images/qrcode-black.png";
import { Text } from "../../components/Text";
import { BigArrowDown } from "../../assets/icons/big-arrow-down/BigArrowDown";
import { Footer } from "../../components/Footer";

export const Finish = () => {
  return (
    <S.Container>
      <Header />
      <S.BodyContainer>
        <S.InsideContainer>
          <img src={JAVABEANS} width={40} alt="" />
          <Title
            mt={12}
            value={"Claiton, seu cadastro foi finalizado!"}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={32}
            fw={700}
            lh={30}
            mb={48}
          />
          <Title
            value={"Seus dados foram recebidos!"}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={24}
            fw={700}
            lh={30}
            mb={12}
          />
          <S.GeneralText>
            Nossa equipe já está com os seus dados em analise e entrará em
            contato via e-mail ou telefone em até{" "}
            <Text fs={20} fw={700} value="48 horas (dois dias)" />, caso seja
            necessário, poderemos solicitar algum documento adicional para a
            confirmação de seus dados e identidade.
          </S.GeneralText>
          <Text
            fs={22}
            fw={700}
            mt={12}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="O que fazer agora?"
          />
          <Text
            fs={20}
            fw={400}
            mt={12}
            mb={48}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Baixe o nosso aplicativo e tenha controle de todas as informações na palma da tua mão."
          />
          <div>
            <BigArrowDown />
          </div>
          <Title
            value={"Baixe já o app da"}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={24}
            fw={700}
            lh={30}
            mt={48}
          />
          <Title
            value={"Nova Futura"}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            fs={24}
            fw={700}
            lh={30}
            mb={12}
          />
          <Text
            fs={20}
            fw={400}
            mt={12}
            mb={48}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="O Futuro dos investimentos na palma da sua mão e com a facilidade que você sempre desejou!"
          />
          <S.SmartphoneContainer>
            <S.SmartphoneImage src={DOWNAPP} width={900} alt="" />
            <S.QRCodeImage
              src={QRCODE}
              width={150}
              alt=""
            />
          </S.SmartphoneContainer>
        </S.InsideContainer>
      </S.BodyContainer>
      <Footer />
    </S.Container>
  );
};
