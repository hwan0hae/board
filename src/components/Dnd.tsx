import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { dndToDoState, IDndToDoState } from "./atoms";
import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import Board from "./Board";
import BoardAdd from "./BoardAdd";
import Header from "./Header";

const Wrapper = styled.div`
  min-width: 480px;
  width: 100%;
  margin: 0px auto;
  height: 30vh;
  padding: 20px;
`;
const MenuBar = styled.div`
  display: flex;
  gap: 10px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

const BoardDeleteBtn = styled.span`
  font-weight: 500;
  font-size: 35px;
  transition: text-shadow 0.1s ease-in-out;
  &:hover {
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  }
`;

function Dnd() {
  const [toDos, setToDos] = useRecoilState(dndToDoState);

  const onDragEnd = (info: DropResult) => {
    console.log("info", info);
    const { destination, source } = info;
    // source 시작위치 destination 움직인 위치 draggableId 텍스트
    if (!destination) return;
    if (destination.droppableId === "boards") {
      setToDos((allBoards) => {
        const boardsCopy = Object.entries(allBoards); //오브젝트를 key, value로 배열화
        const [temp] = boardsCopy.splice(source.index, 1);
        boardsCopy.splice(destination.index, 0, temp);
        return boardsCopy.reduce(
          (r, [board, todos]) => ({ ...r, [board]: todos }),
          {}
        );
      });
      return;
    } else if (destination.droppableId === "boardDelete") {
      setToDos((allBoards) => {
        const boardsCopy = Object.entries(allBoards);
        const newBoard = boardsCopy.filter(
          (board, index) => index !== source.index
        );

        return newBoard.reduce(
          (r, [board, todos]) => ({ ...r, [board]: todos }),
          {}
        );
      });

      return;
    }
    setToDos((allBoards) => {
      const copyToDos: IDndToDoState = {};
      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });
      const taskObj = copyToDos[source.droppableId][source.index]; //string인 draggableId를 쓰지 않고 오브젝트를 쓰기때문에 지우기전에 미리 grep 해둠
      copyToDos[source.droppableId].splice(source.index, 1);
      copyToDos[destination.droppableId].splice(destination.index, 0, taskObj);
      return copyToDos;
    });

    // 같은보드 다른보드 이동시 따로 처리
    // if (destination?.droppableId === source.droppableId) {
    //   //same board movement.
    //   setToDos((allBoards) => {
    //     const boardCopy = [...allBoards[source.droppableId]];
    //     const taskObj = boardCopy[source.index]; // string인 draggableId를 쓰지 않고 오브젝트를 쓰기때문에 지우기전에 미리 grep 해둠
    //     boardCopy.splice(source.index, 1); //시작자리에서 제거
    //     boardCopy.splice(destination.index, 0, taskObj); //움직인 자리에 입력
    //     return {
    //       //오브젝트 반환
    //       ...allBoards,
    //       [source.droppableId]: boardCopy,
    //     };
    //   });
    // }
    // if (destination.droppableId !== source.droppableId) {
    //   // cross board movement.
    //   setToDos((allBoards) => {
    //     const sourceBoard = [...allBoards[source.droppableId]];
    //     const destinationBoard = [...allBoards[destination.droppableId]];
    //     const taskObj = sourceBoard[source.index]; // string인 draggableId를 쓰지 않고 오브젝트를 쓰기때문에 지우기전에 미리 grep 해둠

    //     sourceBoard.splice(source.index, 1);
    //     destinationBoard.splice(destination.index, 0, taskObj);

    //     return {
    //       ...allBoards,
    //       [source.droppableId]: sourceBoard,
    //       [destination.droppableId]: destinationBoard,
    //     };
    //   });
    // }
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Hwan Board</title>
      </Helmet>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <MenuBar>
          <BoardAdd />
          <Droppable droppableId="boardDelete" type="board">
            {(magic) => (
              <BoardDeleteBtn ref={magic.innerRef} {...magic.droppableProps}>
                🗑️
              </BoardDeleteBtn>
            )}
          </Droppable>
        </MenuBar>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  key={boardId}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
}

export default Dnd;
