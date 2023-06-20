"use client"
import { useEffect, useState } from "react";

//style
import * as S from "../styles/home";
import { Modal } from "@/components/Modal";
import { ModalVerification } from "@/components/ModalVerification";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [cardInvalid, setCardInvalid] = useState(false);


  // abrir modal
  const openModal = (user) => {
    setModalOpen(true);
    setSelectedUser(user);

  }

  // fechar modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  }

  // requisiçao de dados dos usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.mocky.io/v2/5d531c4f2e0000620081ddce"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <ul>
        {user.map((user) => (
          <S.Lista key={user.id}>
            <S.Usuario>
              <S.Imagem src={user.img} alt={user.name} />
              <S.Dados>
                <span>{user.name}</span>
                <span>
                  ID: {user.id} - Username: {user.username}
                </span>
              </S.Dados>
            </S.Usuario>
            <S.Button onClick={() => openModal(user)}>Pagar</S.Button>
          </S.Lista>
        ))}
      </ul>
      <Modal open={modalOpen}
        close={
          closeModal
        }
        openSuccess={setModalSuccess}
        Invalid={setCardInvalid}
        selectUser={selectedUser}
      />
     {modalSuccess && <ModalVerification close={() => {setModalSuccess(false)}} errorForm={cardInvalid} /> }
     
     
    </main>
  )
}


//{modalSuccess && <ModalVerification close={() => {setModalSuccess(false)}}/> }


/* {modalSuccess ? (
  <ModalVerification transacaoConcluida={true} close={() => {setModalSuccess(false)}}/>
) : (
  <ModalVerification transacaoConcluida={false} close={() => {setModalSuccess(false)}}/>
)} */