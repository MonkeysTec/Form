import styled from "styled-components";
import { NEUTRAL_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${NEUTRAL_COLORS.WHITE};
  display: flex;
  flex-direction: column;
`;

export const RightContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 120px;
  gap: 18px;

  @media (max-width: 360px) {
    align-items: center;
    padding-right: 0px;
  }
  @media (max-width: 540px) and (min-width: 361px) {
    width: 100%;
    align-items: center;
    padding-right: 0px;
  }
  @media (max-width: 1280px)  and (min-width: 541px){
    padding-right: 50px;
  }
`;

export const TextContainer = styled.div`
  width: 545px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    background-color: #293953d5;
    padding: 8px;
    width: calc(100% - 48px);
    border-radius: 8px;
  }
`;

export const LinkLogin = styled.div`
  padding-right: 80px;
  align-items: flex-start;
  p{
    color: ${NEUTRAL_COLORS.WHITE} !important;
    margin: 0 !important;
  }
`;

export const FormContainer = styled.div`
  width: 545px;
  height: 432px;
  border-radius: 25px;
  background-color: ${NEUTRAL_COLORS.WHITE};
  margin-top: 22px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 44px 40px;
  gap: 22px;
  @media (max-width: 768px) {
  width: calc(100% - 48px);
  height: unset;
  padding: 28px 24px;
  }
`;