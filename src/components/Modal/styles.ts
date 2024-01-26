import styled from "styled-components";
import { NEUTRAL_COLORS } from "../../constants/styleConstants";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;

    background-color: #00000050;
`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding: 32px;
    max-width: calc(730px - 64px);
    max-height: 540px;

    background-color: ${NEUTRAL_COLORS.WHITE};
    border-radius: 10px;

    box-shadow: 0px 4px 14px 5px rgba(0, 0, 0, 0.25);
    overflow: hidden;
`;

export const Divisor = styled.div`
    width: 100%;
    height: 8px;

    background-color: #d9d9d9;

`;

export const LegalText = styled.div`
    width: 100%;
    height: 100%;
    background: #E8E3E3;
    border: 1px #CFCFCF solid;
    padding: 12px 32px;
    overflow: auto;
    max-height: 337px;
    ul{
        list-style: outside;
        li {
            list-style: num;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
            color: #000000;
        }
    }

`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
`;