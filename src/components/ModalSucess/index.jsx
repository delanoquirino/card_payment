import React from "react";
import * as S from "./styles";

export const ModalSuccess = ({ hidden }) => {
    return (
        <S.ModalSuccess style={{ display: hidden ? "block" : "none" }}>
            <S.Header>
                Recibo de pagamento
            </S.Header>
            <S.Text>
                Pagamento concluido com sucesso
            </S.Text>
        </S.ModalSuccess>
    );
};
