import * as S from "./styles";

export const ModalVerification = (prop) => {

    return (

        <S.ModalVerification>
            <S.Header>
                <h3>
                    Recibo de pagamento
                </h3>
            </S.Header>
            <S.Verification>
                <h3>
                    {prop ? "Pagamento recibido com sucesso" : "Erro no pagamento"}
                </h3>
                <button >Fechar</button>
            </S.Verification>
        </S.ModalVerification  >

    );
};
