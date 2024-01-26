import { ReactNode } from "react";
import * as S from "./styles";

export const ErrorMessage = ({ text }: { text?: any }) => {
    return (
        <S.ErrorMessage>
            {text}
        </S.ErrorMessage>
    )
}