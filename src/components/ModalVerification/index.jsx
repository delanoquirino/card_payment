import * as S from "./styles";

export const ModalVerification = ({ open, prop }) => {


    return (

        <S.ModalVerification isOpen={open} >
            <>
                <S.Header>
                    <h3>
                        Recibo de pagamento
                    </h3>
                </S.Header>
                <S.Verification>
                    <h3>
                        {prop ? "Pagamento recibido com sucesso" : "Erro no pagamento"}
                    </h3>
                </S.Verification>

            </>

        </S.ModalVerification  >

    );
};
