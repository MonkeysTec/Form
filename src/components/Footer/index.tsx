import Facebook from "../../assets/icons/social-media/facebook/Facebook";
import Instagram from "../../assets/icons/social-media/instagram/Instagram";
import Linkedin from "../../assets/icons/social-media/linkedin/Linkedin";
import Twitter from "../../assets/icons/social-media/twitter/Twitter";
import Youtube from "../../assets/icons/social-media/youtube/Youtube";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import { Text } from "../Text";
import * as S from "./style";

export const Footer = () => {
  return (
    <S.Container>
      <S.InsideContainer>
        <S.Column>
          <S.Logo src={require("../../assets/images/novalogo.png")} />
          <Text
            fs={18}
            mt={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Nos acompanhe nas redes sociais para mais conteúdos "
          />
          <S.Line>
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
            <Youtube />
          </S.Line>
        </S.Column>
        <S.Column>
          <Text
            fs={18}
            fw={700}
            color={PRIMARY_COLORS.ELETRIC_BLUE}
            value="Fale conosco"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="atendimento@novafutura.com.br"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Capitais e Regiões Metropolitanas"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="+55 (11) 3291-800"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="+55 (11) 4020-6710"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Demais Regiões"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="0800-580-6710"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Atendimento em Dias Úteis das 09h às 18h"
          />
        </S.Column>
        <S.Column>
          <Text
            fs={18}
            fw={700}
            color={PRIMARY_COLORS.ELETRIC_BLUE}
            value="Sobre Nós"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Sobre a Nova Futura"
          />
          <Text fs={18} fw={400} color={NEUTRAL_COLORS.WHITE} value="Custos" />
          <Text fs={18} fw={400} color={NEUTRAL_COLORS.WHITE} value="Filiais" />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Agentes Autônomos"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Compliance"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Carreiras"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Imprensa"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Day Trade"
          />
        </S.Column>
        <S.Column>
          <Text
            fs={18}
            fw={700}
            color={PRIMARY_COLORS.ELETRIC_BLUE}
            value="Conteúdos"
          />
          <Text fs={18} fw={400} color={NEUTRAL_COLORS.WHITE} value="Blog" />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Canal do Youtube"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Futura academy"
          />
          <Text
            fs={18}
            fw={400}
            color={NEUTRAL_COLORS.WHITE}
            value="Dúvidas frequentes"
          />
          <Text
            fs={18}
            fw={700}
            mb={-12}
            mt={42}
            color={PRIMARY_COLORS.ELETRIC_BLUE}
            value="Baixe nosso aplicativo"
          />
          <S.Line>
            <S.Logo src={require("../../assets/images/download_apple.png")} />
            <S.Logo src={require("../../assets/images/download_apple.png")} />
          </S.Line>
        </S.Column>
      </S.InsideContainer>
    </S.Container>
  );
};
