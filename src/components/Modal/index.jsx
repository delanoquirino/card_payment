import * as S from "./styles";
import { useFormik } from "formik";
import NumberFormat from "react-number-format";

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

export const Modal = ({ open, close, selectUser, openSuccess, Invalid }) => {
  const formik = useFormik({
    initialValues: {
      payment: "",
      selectcard: 0,
    },

    onSubmit: (values) => {
      if (!selectUser) return;
      const selectedCard = cards[values.selectcard];

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
          .then(() => {
            if (selectedCard.card_number === "1111111111111111") {
              openSuccess(true);
              Invalid(false);
              close();
            } else {
              openSuccess(true);
              Invalid(true);
              close();
            }
          });
      }
    },
  });

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, "");

    const formattedValue = (Number(numericValue) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );

    return formattedValue;
  };

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
              type="text"
              name="payment"
              placeholder="R$ 00,00"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue("payment", formatCurrency(e.target.value));
              }}
              value={formik.values.payment}
              required
            />

            <label htmlFor="Cartao">Selecione o Cartão:</label>
            <select
              name="selectcard"
              onChange={formik.handleChange}
              value={formik.values.selectcard}
              required
              defaultValue="Selecione um cartão"
            >
          
  {cards.map(({ card_number }, index) => {
    return (
      <option key={card_number} value={index}>
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
