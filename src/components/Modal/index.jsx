
import * as S from "./styles";
import { Formik, Field } from "formik";

let cards = [
    // valid card
    {
        card_number: "1111111111111111",
        cvv: 789,
        expiry_date: "01/18",
    },
    // invalid card
    {
        card_number: "4111111111111234",
        cvv: 123,
        expiry_date: "01/20",
    },
];

export const Modal = ({ open, close, selectUser }) => {

    // valor do select
    const selectCard = cards.map((card, key) => {

        return (
            <option key={key} value={card.card_number}>
                Cartão com final: {card.card_number.slice(-4)}
            </option>
        );

    });


    return (
        <S.Modal isOpen={open}>
            {selectUser ? (
                <>
                    <S.Header>
                        <h3>
                            Pagamento para <span>{selectUser.name}</span>
                        </h3>
                    </S.Header>
                    <Formik
                        initialValues={{
                            number: "",
                            selectcard: "",
                        }}
                        onSubmit={(values, actions) => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }}

                    >
                        <S.Form>
                            <Field
                                type="number"
                                name="number"
                                placeholder="R$ 00,00"

                            />

                            <Field
                                as="select"
                                name="selectcard"
                            >
                                <option value=""></option>
                                {selectCard}
                            </Field>

                            <button type="submit">Pagar</button>
                            <button onClick={close}>Cancelar</button>
                        </S.Form>
                    </Formik>
                </>
            ) : (
                <p>Nenhum usuário selecionado.</p>
            )}
        </S.Modal>
    );
};
