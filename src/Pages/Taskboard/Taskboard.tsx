import React, { useEffect, useState } from "react";
import { Board } from "../../components/Board/Board";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { Stack, Box, Container } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { BoardItem, CardItem } from "../../interfaces/DataTypes";

import imageBg from "../../image/2.png";
import TaskService from "../../services/TaskService";

export const TaskBoard = ({ mode }: any) => {
  const [boards, setBoards] = useState<BoardItem[]>([]);
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });
  const matches = useMediaQuery("(min-width:600px)");
  console.log("@matches", matches);

  useEffect(() => {
    async function fetch() {
      const { data } = await TaskService.getBoards();
      if (data) {
        setBoards(data[0]?.boards);
      }
    }
    fetch();
  }, []);

  // adding new board
  const addBoardHandler = async (boardTitle: string) => {
    const { data } = await TaskService.addBoard({
      title: boardTitle,
      cards: [],
    });
    if (data) {
      setBoards([...boards, data]);
    }
  };

  // remove current board
  const removeBoard = async (boardId: number) => {
    const { data } = await TaskService.deleteBoard(boardId);
    const updatedBoardList = boards.filter((board) => board.id !== data);
    setBoards(updatedBoardList);
  };

  // adding new card to current board
  const addCardHandler = async (boardId: number, cardTitle: string) => {
    const boardIndex = boards.findIndex((el: BoardItem) => el.id === boardId);
    if (boardIndex === -1) return;

    const tempBoardList = [...boards];
    tempBoardList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title: cardTitle,
      labels: [],
      date: "",
      tasks: [],
    });

    const { data } = await TaskService.updateBoard({
      boardId,
      board: tempBoardList[boardIndex],
    });

    const updatedListBoard = boards.map((el) => {
      if (el.id === data.id) {
        el = data;
      }
      return el;
    });
    setBoards(updatedListBoard);
  };

  // remove current card
  const removeCard = async (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === boardId;
    });
    if (boardIndex === -1) return;

    const updatedBoard = { ...boards[boardIndex] };

    updatedBoard.cards = updatedBoard.cards.filter(
      (card) => card.id !== cardId
    );

    const { data } = await TaskService.updateBoard({
      boardId,
      board: updatedBoard,
    });

    const updatedListBoard = boards.map((el) => {
      if (el.id === data.id) {
        el = data;
      }
      return el;
    });
    setBoards(updatedListBoard);
  };

  // update current card
  const updateCard = async (
    boardId: number,
    cardId: number,
    card: CardItem
  ) => {
    const boardIndex = boards.findIndex((el) => {
      return el.id === boardId;
    });
    if (boardIndex === -1) return;

    const updatedBoard = { ...boards[boardIndex] };
    const cards = updatedBoard.cards;
    const cardIndex = cards.findIndex((el) => {
      return el.id === cardId;
    });
    if (cardIndex === -1) return;

    updatedBoard.cards[cardIndex] = card;

    const { data } = await TaskService.updateBoard({
      boardId,
      board: updatedBoard,
    });
    const updatedListBoard = boards.map((el) => {
      if (el.id === data.id) {
        el = data;
      }
      return el;
    });
    setBoards(updatedListBoard);
  };

  // drag&drop cards
  const onDragEnd = async (boardId: number, cardId: number) => {
    const sourceBoardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === boardId;
    });
    if (sourceBoardIndex === -1) return;

    const sourceCardIndex = boards[sourceBoardIndex].cards?.findIndex(
      (el: CardItem) => {
        return el.id === cardId;
      }
    );
    if (sourceCardIndex === -1) return;

    const targetBoardIndex = boards.findIndex(
      (el: BoardItem) => el.id === targetCard.boardId
    );

    if (targetBoardIndex === -1) return;

    const targetCardIndex = boards[targetBoardIndex].cards?.findIndex(
      (el: CardItem) => el.id === targetCard.cardId
    );
    if (targetCardIndex === -1) return;

    const tempBoardList = [...boards];

    const sourceCard = tempBoardList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );

    const boardDel = tempBoardList[sourceBoardIndex];
    const boardAdded = tempBoardList[targetBoardIndex];

    const [board1, board2] = await Promise.all([
      TaskService.updateBoard({
        boardId: boardDel.id,
        board: boardDel,
      }),
      TaskService.updateBoard({
        boardId: boardAdded.id,
        board: boardAdded,
      }),
    ]);

    const updateBoardList = boards.map((board) => {
      if (board.id === board1.data.id) {
        return board1.data;
      }
      if (board.id === board2.data.id) {
        return board2.data;
      }
      return board;
    });

    setBoards(updateBoardList);
    setTargetCard({ boardId: 0, cardId: 0 });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({ boardId: boardId, cardId: cardId });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: matches ? "start" : "center",
        flexDirection: matches ? "row" : "column",

        justifyContent: matches ? "space-between" : "center",
        padding: "20px 30px",
        // flexWrap: "wrap",

        gap: "20px",
        // backgroundImage: `url(${imageBg})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
    >
      <Stack
        sx={{
          width: matches ? "90%" : "100%",
          justifyContent: matches ? "space-between" : "center",
        }}
        direction="row"
        spacing={2}
        gap="10px"
        flexWrap="wrap"
      >
        {/* {loading && <Box>Loading page...</Box>} */}
        {/* {error && <Box color="secondary">{error}</Box>} */}
        {boards?.length > 0 &&
          boards.map((board) => (
            <Board
              board={board}
              key={board.id}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(board.id)}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
            />
          ))}
      </Stack>
      <CustomInput
        text="Add Board"
        placeholder="Enter Board Title"
        onClickAddBtn={addBoardHandler}
      />
    </Container>
  );
};
