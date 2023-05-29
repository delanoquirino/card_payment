import { useState } from "react";
import * as S from "./styles";
import { Formik, Field, } from "formik";
import { ModalVerification } from "../ModalVerification";

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
    const [modalSuccess, setModalSuccess] = useState(false);
    const [verificationOpen, setverificationOpen] = useState(false);

    // abrir modal
    function openModal() {
        setverificationOpen(true);

    }


    // valor do select
    const selectCard = cards.map(({ card_number }) => {
        return (
            <option key={card_number} value={card_number}>
                Cartão com final: {card_number.slice(-4)}
            </option>
        );
    });

    const handleSubmit = (values, actions, e) => {
        e.preventDefault();
        values.selectcard;
        actions.setSubmitting(false);
        openModal()


        fetch(
            "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
            {
                method: "POST",
                body: JSON.stringify({
                    cardnumber: cards[values.selectcard].card_number,
                    cvv: cards[values.selectcard].cvv,
                    expiry_date: cards[values.selectcard].expiry_date,
                    idUser: selectUser.id,
                    value: values.number,
                }),
            }
        )
            .then((resJson) => resJson.json())
            .then((response) => {
                if (cards[values.selectcard].card_number === "1111111111111111") {
                    setModalSuccess(true);
                }
            })
            .catch((err) => {
                console.error("Ocorreu um erro na solicitação:", err);
            });
    };

    return (
        <>
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
                            onSubmit={handleSubmit}

                        >
                            <S.Form>
                                <Field type="number" name="number" placeholder="R$ 00,00" />

                                <Field as="select" name="selectcard">
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
            </S.Modal >
            <ModalVerification open={verificationOpen} prop={modalSuccess} />

        </>
    );
};
