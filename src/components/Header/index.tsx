import { useNavigate } from "react-router-dom";
import PointerLeft from "../../assets/icons/pointer-left/PointerLeft";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import { Button } from "../Button/style";
import * as S from "./style";

export const Header = () => {
  const navigate = useNavigate();

  const breakpointSmall = window.matchMedia("(max-width: 500px)");

  return (
    <S.Container>
      {breakpointSmall.matches &&
        <Button
          values={{
            fs: 15,
            fw: 600,
            color: NEUTRAL_COLORS.WHITE,
            border: `2px solid ${PRIMARY_COLORS.CORAL}`,
            width: breakpointSmall.matches && 40,
          }}
        >
          <PointerLeft color={`${NEUTRAL_COLORS.WHITE}`} size={16} />
        </Button>}
      <S.Logo
        src={require("../../assets/images/novalogo.png")}
        onClick={() => navigate("/home")}
      />
      <S.DivHorizontal>
        {!breakpointSmall.matches && <Button
          values={{
            fs: 15,
            fw: 600,
            color: NEUTRAL_COLORS.WHITE,
            border: `2px solid ${PRIMARY_COLORS.CORAL}`,
            width: breakpointSmall.matches ? 48 : 185,
          }}
        >
          <PointerLeft color={`${NEUTRAL_COLORS.WHITE}`} />
          {breakpointSmall.matches ? '' : 'Voltar para o site'}
        </Button>}
        <Button
          values={{
            fs: 15,
            fw: 600,
            color: NEUTRAL_COLORS.WHITE,
            border: `2px solid ${PRIMARY_COLORS.ELETRIC_BLUE}`,
            bgc: `${PRIMARY_COLORS.ELETRIC_BLUE}`,
            width: 120,
          }}
        >
          Fazer login
        </Button>
      </S.DivHorizontal>
    </S.Container>
  );
};
