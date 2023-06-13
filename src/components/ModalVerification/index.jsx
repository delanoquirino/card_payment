import * as S from "./styles";

export const ModalVerification = ({close, teste}) => {
    console.log(teste)

    return (

        <S.ModalVerification >
            <S.Header>
                <h3>
                    Recibo de pagamento
                </h3>
            </S.Header>
            <S.Verification>
                <h3>
                    {teste ?  "Erro no pagamento": "Pagamento realizado com sucesso" }
                </h3>
                <button onClick={close} >Fechar</button>
            </S.Verification>
        </S.ModalVerification  >

    );
};
