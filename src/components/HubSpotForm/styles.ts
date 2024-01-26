import styled from "styled-components";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";

export const ContainerHubSpotForm = styled.div`
    input[type="text"],input[type="email"],input[type="tel"] {
        padding: 0px 10px;
        width: 100%;
        border: 2px solid ${PRIMARY_COLORS.JEANS_BLUE};
        height: 40px;
        color: ${NEUTRAL_COLORS.DARK};
        font-size: 15px;
        font-weight: 400;
        text-decoration: none;
        border-radius: 6px;
        font-family: 'Montserrat';
        &::placeholder {
            color: ${NEUTRAL_COLORS.GRAY};
        }

    }

    input[type="submit"] {
        height: 40px;
        width: 100%;
        color: ${NEUTRAL_COLORS.WHITE};
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        border-radius: 10px;
        background-color: ${PRIMARY_COLORS.NIGHT_BLUE};
        border: 2px solid ${PRIMARY_COLORS.NIGHT_BLUE};
    }

    label{
        span{
            color: '${NEUTRAL_COLORS.DARK}';
            font-size: 15px;
            font-weight: 400;
            line-height: 10px;
            text-decoration: none;
            font-family: 'Montserrat';
        }
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 22px;
        div{
                .input {
                    margin-top: 16px;
                }
        }
    }


`;