import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { dndToDoState, IDndToDo } from "./atoms";
import { useSetRecoilState } from "recoil";
import { readBuilderProgram } from "typescript";

const Wrapper = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  border: 3px solid black;

  background-color: ${(props) =>
    props.isDragging ? "#CEFBC9" : props.theme.boardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

const BoardTitle = styled.div`
  color: ${(props) => props.theme.bgColor};
  padding-top: 10px;
  background-color: #ffff8f;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
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

interface IBoardProps {
  toDos: IDndToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(dndToDoState);
  const onVaild = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <BoardTitle>{boardId}</BoardTitle>
          <Form onSubmit={handleSubmit(onVaild)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>

          <Droppable droppableId={boardId}>
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    index={index}
                    boardId={boardId}
                  />
                ))}
                {magic.placeholder}
                {/* placeholder 이동할때 보드 사이즈 변화 막음 */}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
