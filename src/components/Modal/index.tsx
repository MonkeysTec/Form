import { NEUTRAL_COLORS } from '../../constants/styleConstants'
import { Button } from '../Button/style'
import * as S from './styles'

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;

}

export const Modal = ({ isOpen, setIsOpen }: ModalProps) => {


    return (
        <>
            {isOpen ?
                <S.Container>
                    <S.ModalContainer>
                        <h2>Termo de uso do nosso sistema</h2>
                        <S.Divisor />
                        <S.LegalText>
                            <ul>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                                <li> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non praesentium aliquid asperiores ipsam modi saepe labore nobis, nam tenetur ullam culpa voluptatibus obcaecati quasi consequuntur nostrum ad itaque accusamus!</li>
                            </ul>
                        </S.LegalText>
                        <S.ButtonContainer>
                            <Button values={{
                                border: `2px solid ${NEUTRAL_COLORS.GRAY}`,
                                color: NEUTRAL_COLORS.GRAY,
                                width: 184
                            }}>
                                Voltar
                            </Button>
                            <Button onClick={() => setIsOpen(false)} values={{
                                bgc: NEUTRAL_COLORS.GRAY,
                                border: `2px solid ${NEUTRAL_COLORS.GRAY}`,
                                color: NEUTRAL_COLORS.WHITE,
                                width: 208
                            }}>
                                Li e Aceito os Termos
                            </Button>
                        </S.ButtonContainer>
                    </S.ModalContainer>
                </S.Container> : null}
        </>
    )
}