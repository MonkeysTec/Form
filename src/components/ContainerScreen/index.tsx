import { Header } from "../Header"
import * as S from "./styles"
import { ReactNode } from "react"

interface ContainerScreenProps {
    children: ReactNode
}

export const ContainerScreen = ({ children }: ContainerScreenProps) => {
    return (
        <S.Container>
            <Header />
            <S.Body>
                {children}
            </S.Body>
        </S.Container>
    )
}