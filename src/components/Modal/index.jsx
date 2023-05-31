import { useState } from "react";
import * as S from "./styles";
import { useFormik } from "formik";
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

    const formik = useFormik({
        initialValues: {
            payment: "",
            selectcard: "",
        },
        onSubmit: (values) => {
            if (!selectUser) return;
            const selectedCard = cards.find((card) => card.card_number === values.selectcard);


            if (selectedCard) {
                fetch("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989", {
                    method: "POST",
                    body: JSON.stringify({
                        cardnumber: selectedCard.card_number,
                        cvv: selectedCard.cvv,
                        expiry_date: selectedCard.expiry_date,
                        idUser: selectUser.id,
                        value: values.payment,
                    }),
                })
                    .then((resJson) => resJson.json())
                    .then((response) => {
                        if (selectedCard.card_number === "1111111111111111") {
                            setModalSuccess(true);
                            alert("Pagamento concluido com sucesso");
                            close()
                            return <ModalVerification />
                        } else {
                            alert("Erro no pagamento");
                        }
                    })
                    .catch((err) => {
                        console.error("Ocorreu um erro na solicitação:", err);
                    });
            }
        },
    });

    return (
        <>
            <S.Modal isOpen={open}>
                <>
                    <S.Header>
                        <h3>
                            Pagamento para {selectUser && <span>{selectUser.name}</span>}
                        </h3>
                    </S.Header>

                    <S.Form onSubmit={formik.handleSubmit}>
                        <label htmlFor="Valor">Valor:</label>
                        <input
                            type="number"
                            name="payment"
                            placeholder="R$ 00,00"
                            onChange={formik.handleChange}
                            value={formik.values.payment}
                        />
                        <label htmlFor="Cartao">Selecione o Cartão:</label>
                        <select
                            name="selectcard"
                            onChange={formik.handleChange}
                            value={formik.values.selectcard}
                        >
                            {cards.map(({ card_number }) => {
                                return (
                                    <option key={card_number} value={card_number}>
                                        Cartão com final: {card_number.slice(-4)}
                                    </option>
                                );
                            })}
                        </select>

                        <button type="submit">Pagar</button>
                        <button onClick={close}>Cancelar</button>
                    </S.Form>
                </>
            </S.Modal>
        </>
    );
};
