import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { dndToDoState } from "./atoms";

const ModalPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.div`
  position: absolute;
  width: 300px;
  height: 200px;
  padding: 40px;
  text-align: center;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  color: ${(props) => props.theme.bgColor};
  font-weight: 500;
  font-size: 24px;
`;

const Form = styled.form`
  width: 100%;
  text-align: center;
  margin-top: 10px;

  input {
    width: 80%;
    border: none;
    border-bottom: 3px solid;
    background-color: ${(props) => props.theme.boardColor};

    &:focus {
      outline: none;
    }
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 5px;
  transition: 0.2s color ease-in-out;
  font-size: 20px;
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 5px;

  &:hover {
    color: gray;
  }
`;

interface IForm {
  board: string;
}
//chileren 프롭스로 받아서 사용할수도있음 귀찮으니 여기서 작성

// 보드 이름 입력 과 추가버튼
function Modal({ closeModal }: any) {
  const { register, handleSubmit } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(dndToDoState);
  console.log(toDos);
  const onVaild = ({ board }: IForm) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [board]: [],
      };
    });
    console.log(toDos);
    closeModal();
  };
  return (
    <ModalPage onClick={closeModal}>
      <ModalBody onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        Board Name
        <Form onSubmit={handleSubmit(onVaild)}>
          <input
            {...register("board", { required: true })}
            type="text"
            placeholder="보드 이름 입력하세요."
            autoFocus
          />
          <br />
          <Button>Add</Button>
          <Button onClick={closeModal}>✖</Button>
        </Form>
      </ModalBody>
    </ModalPage>
  );
}

export default Modal;
