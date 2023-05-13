import styled from "styled-components";
import ReactModal from "react-modal";


export const Modal = styled(ReactModal)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    height: auto;
    width: 50%;
    border-radius: 5px;
    
`
export const Header = styled.header`
   background-color:#474A6E;
   display: flex;
   align-items: center;
   color: #fff;
   padding-left: 10px;

   span {
    color: #FFFF00;
   }
   
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

  input, select {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 5px;
  }

  input, select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #d7d7d7;
  }
`