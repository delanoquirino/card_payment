import * as S from "./styles";

export const ModalVerification = (prop, transaçãoConcluida) => {

    return (

        <S.ModalVerification >
            <S.Header>
                <h3>
                    Recibo de pagamento
                </h3>
            </S.Header>
            <S.Verification>
                <h3>
                    {transaçãoConcluida ? "Pagamento recebido com sucesso" : "Erro no pagamento"}
                </h3>
                <button onClick={prop.close} >Fechar</button>
            </S.Verification>
        </S.ModalVerification  >

    );
};
