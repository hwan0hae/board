import React, { useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const BoardAddBtn = styled.button`
  border-radius: 25px;
  background-color: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.bgColor};
  font-weight: 500;
  font-size: 30px;
  border: none;
  margin-bottom: 10px;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #ffbb00;
  }
`;

function BoardAdd() {
  const [modal, setModal] = useState(false); //훅으로 처리 해보자
  return (
    <>
      <BoardAddBtn onClick={() => setModal(!modal)}>Board Add</BoardAddBtn>
      {modal && <Modal closeModal={() => setModal(!modal)} />}
    </>
  );
}

export default BoardAdd;
