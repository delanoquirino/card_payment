
import * as S from "./styles";
import { useFormik } from "formik";

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
            selectcard: "",
        },
       
        onSubmit: (values) => {
            if (!selectUser) return;
            const selectedCard = cards[values.selectcard]
     
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
                            Invalid(false)
                            close()
                        } else {
                            openSuccess(true);
                            Invalid(true)
                            close()
                        }
                    })
                    
            }
        },
    });

    
    const formatNumber = (valor) => {
        valor = valor.replace(/(\d)(\d{2})$/, '$1,$2');
    
        //separador de milhar
        valor = valor.replace(/\d(?=(\d{3})+\,)/g, '$&.');
    
        return valor;
    }

    const mask = (e) => {
        let valor = e.target.value;

    // Remove todos os caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    valor = valor.replace(/^0+/, '');

    // Formata a parte decimal  digitar
    if (valor.length <= 2) {
        valor = ("000" + valor).slice(-3)
    }


    valor = formatNumber(valor);

    e.target.value = 'R$ ' + valor;
   }
    
   
   
    
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
                            onChange={formik.handleChange}
                            value={formik.values.payment}
                            onKeyUp={mask}
                            required
                         
                        />
                              



                        <label htmlFor="Cartao">Selecione o Cartão:</label>
                        <select
                            name="selectcard"
                            onChange={formik.handleChange}
                            value={formik.values.selectcard}
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
