//@ts-nocheck
import { Header } from "../../components/Header";
import background2 from "../../assets/images/atach2.png";
import * as S from "./style";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button/style";
import ArrowRight from "../../assets/icons/arrow-right/ArrowRight";
import { ProfileIcon } from "../../assets/icons/profile-icon/Profile";
import { NavigationIcon } from "../../assets/icons/Navigation/Navigation";
import { BigArrowDown } from "../../assets/icons/big-arrow-down/BigArrowDown";
import DOWNAPP from "../../assets/images/downapp.png";
import QRCODE from "../../assets/images/qrcode-black.png";
import { Footer } from "../../components/Footer";
import Document from "../../assets/icons/cards/document/Document";
import People from "../../assets/icons/cards/people/People";
import House from "../../assets/icons/cards/house/House";

export const AtachDoc = () => {
  return (
    <S.Container>
      <Header />
      <S.SubHeader
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          position: "relative",
        }}
      >
        <S.SubHeaderContainer>
          <S.TextContainer>
            <Title
              fs={32}
              fw={700}
              color={NEUTRAL_COLORS.WHITE}
              value="Lucas, seu cadastro foi Finalizado!"
            />
            <Text
              fs={22}
              fw={400}
              color={NEUTRAL_COLORS.WHITE}
              mt={28}
              value="Agora iremos solicitar a comprovação de alguns documentos para concluir seu processo de abertura de conta na Nova Futura."
            />
            <Text
              fs={22}
              fw={400}
              color={NEUTRAL_COLORS.WHITE}
              mt={28}
              value="Após a inclusão dos dados cadastrais do procurador e do titular da conta, será necessário encaminhar o documento que comprove a procuração, termo de inclusão do procurador e documentos de ambas as partes (Procurador e Titular)."
            />
            <Button
              values={{
                height: 60,
                br: 10,
                bgc: PRIMARY_COLORS.JEANS_BLUE,
                border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                mt: 48,
                fs: 25,
                fw: 400,
              }}
            >
              <S.Line>
                <NavigationIcon color={"#fff"} size={22} />
                Envio de documentos
                <ArrowRight color="#fff" />
              </S.Line>
            </Button>
            <Button
              values={{
                height: 60,
                br: 10,
                bgc: PRIMARY_COLORS.JEANS_BLUE,
                border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                mt: 24,
                fs: 25,
                fw: 400,
              }}
            >
              <S.Line>
                <ProfileIcon color={"#fff"} size={22} />
                Perfil investidor
                <ArrowRight color="#fff" />
              </S.Line>
            </Button>
          </S.TextContainer>
        </S.SubHeaderContainer>
      </S.SubHeader>

      <S.UnderHeader>
        <Title
          fs={32}
          fw={700}
          color="#fff"
          td="underline"
          mb={48}
          tdc={PRIMARY_COLORS.ELETRIC_BLUE}
          value="Envio de Documentos"
        />
        <S.UnderHeaderContent>
          <p>
            <span>Será necessário enviar os documentos abaixo tanto do procurador quanto do titular da conta.</span>
          </p>
          <S.GeneralText>
            É importante que logo após escanear ou tirar fotos dos documentos que
            devem ser enviados, verificar a qualidade, as imagens devem estão
            legíveis e claras para que a analise seja mais eficiente.
          </S.GeneralText>
          <p>
            <span>
              Realize o envio dos documento para o e-mail dumentosnf@novafutura.com.br
            </span>
          </p>
        </S.UnderHeaderContent>
      </S.UnderHeader>
      <S.LineCard>
        <S.Card>
          <Document />
          <Text
            fs={20}
            fw={600}
            mt={22}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Documento de identidade do titular da conta e do procurador"
          />
          <S.GeneralText
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#293953",
              marginTop: "22px",
              textAlign: "start",
            }}
          >
            Foto ou documento escaneado,{" "}
            <Text
              fs={20}
              fw={600}
              mt={22}
              color={PRIMARY_COLORS.NIGHT_BLUE}
              value="frente e verso"
            />{" "}
            do{" "}
            <Text
              fs={20}
              fw={600}
              mt={22}
              color={PRIMARY_COLORS.NIGHT_BLUE}
              value="RG"
            />{" "}
            ou{" "}
            <Text
              fs={20}
              fw={600}
              mt={22}
              color={PRIMARY_COLORS.NIGHT_BLUE}
              value="CNH"
            />
            .{" "}
          </S.GeneralText>
        </S.Card>
        <S.Card>
          <People />
          <Text
            fs={20}
            fw={600}
            mt={22}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Procuração"
          />
          <S.GeneralText
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#293953",
              marginTop: "22px",
              textAlign: "start",
            }}
          >
            <Text
              fs={20}
              fw={600}
              mt={22}
              color={PRIMARY_COLORS.NIGHT_BLUE}
              value="Deverá haver os seguintes termos:"
            />{" "}
            “gerir”, “administrar”, “abrir”, “resgatar”, “movimentar” e
            ”quitar”.
          </S.GeneralText>
        </S.Card>
        <S.Card>
          <House />
          <Text
            fs={20}
            fw={600}
            mt={22}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Comprovante de residência do titular da conta"
          />
          <S.GeneralText
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#293953",
              marginTop: "22px",
              textAlign: "start",
            }}
          >
            Contas de consumo mensal (luz, água, telefone ou fatura do cartão).
            Validade de no máximo 6 meses.
          </S.GeneralText>
        </S.Card>
      </S.LineCard>
      <S.UpFooter>
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
      </S.UpFooter>
      <Footer />
    </S.Container>
  );
};
