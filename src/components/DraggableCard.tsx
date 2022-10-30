import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { dndToDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  color: black;
  display: flex;

  background-color: ${(props) =>
    props.isDragging ? "#eeffff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

const ToDoDelete = styled.button`
  border: none;
  font-size: 7px;
  background-color: ${(props) => props.theme.cardColor};
  margin-left: auto;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(dndToDoState);
  const onDelete = () => {
    setToDos((allBoards) => {
      const newBoards = allBoards[boardId].filter((toDo) => toDo.id !== toDoId);
      return { ...allBoards, [boardId]: newBoards };
    });
    // setToDos((allBoards) => {
    //   allBoards[boardId].filter((toDo) => {
    //     toDo.id !== toDoId;
    //   });
    // return allBoards;
    // });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <ToDoDelete onClick={onDelete}>✖</ToDoDelete>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

//prop 변하지 않으면 렌더링 하지말아라 memo
