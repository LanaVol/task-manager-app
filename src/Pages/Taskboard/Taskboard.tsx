import React, { useEffect, useState } from "react";
import { Board } from "../../Components/Board/Board";
import { CustomInput } from "../../Components/CustomInput/CustomInput";
import { Stack, Button, Box } from "@mui/material";
import { BoardItem, CardItem } from "../../Interfaces/DataTypes";
// import { AxiosServices } from "../../AxiosServices/AxiosServices";
import {
  setBoardList,
  updateLocaleStorageBoards,
} from "../../AxiosServices/LocalStorageServices";
import imageBg from "../../image/2.png";

export const TaskBoard = () => {
  const [boards, setBoards] = useState<BoardItem[]>([]);
  // const { loading, error, tasks } = AxiosServices();

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    const boards: BoardItem[] = await setBoardList();
    setBoards(boards);
  }

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  // adding new board
  const addBoardHandler = (boardTitle: string) => {
    const boardList = [...boards];
    boardList.push({
      id: Date.now() + Math.random() * 10,
      title: boardTitle,
      cards: [],
    });
    setBoards(boardList);
    console.log("@@2", boardList);
  };

  // remove current board
  const removeBoard = (boardId: number) => {
    const boardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === boardId;
    });
    if (boardIndex < 0) {
      return;
    }
    const tempBoardList = [...boards];
    tempBoardList.splice(boardIndex, 1);
    setBoards(tempBoardList);
  };

  // adding new card to current board
  const addCardHandler = (boardId: number, cardTitle: string) => {
    console.log(boards);
    const boardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === boardId;
    });
    if (boardIndex < 0) {
      return;
    }
    const tempBoardList = [...boards];
    tempBoardList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title: cardTitle,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoardList);
  };

  // remove current card
  const removeCard = (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === boardId;
    });
    if (boardIndex < 0) {
      return;
    }
    const tempBoardList = [...boards];
    const cards = tempBoardList[boardIndex].cards;
    const cardIndex = cards.findIndex((el) => el.id === cardId);
    if (cardIndex < 0) {
      return;
    }
    cards.splice(cardIndex, 1);
    setBoards(tempBoardList);
  };

  // update current card
  const updateCard = (boardId: number, cardId: number, card: CardItem) => {
    const boardIndex = boards.findIndex((el) => {
      return el.id === boardId;
    });
    if (boardIndex < 0) {
      return;
    }
    const tempBoardList = [...boards];
    const cards = tempBoardList[boardIndex].cards;

    const cardIndex = cards.findIndex((el) => {
      return el.id === cardId;
    });
    if (cardIndex < 0) {
      return;
    }

    tempBoardList[boardIndex].cards[cardIndex] = card;
    setBoards(tempBoardList);
  };

  // drag&drop cards
  const onDragEnd = (boardId: number, cardId: number) => {
    // console.log("dragEnd");
    const sourceBoardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === boardId;
    });
    if (sourceBoardIndex < 0) {
      return;
    }

    const sourceCardIndex = boards[sourceBoardIndex].cards?.findIndex(
      (el: CardItem) => {
        return el.id === cardId;
      }
    );
    if (sourceCardIndex < 0) {
      return;
    }

    const targetBoardIndex = boards.findIndex((el: BoardItem) => {
      return el.id === targetCard.boardId;
    });
    if (targetBoardIndex < 0) {
      return;
    }

    const targetCardIndex = boards[targetBoardIndex].cards?.findIndex(
      (el: CardItem) => {
        return el.id === targetCard.cardId;
      }
    );

    if (targetCardIndex < 0) {
      return;
    }

    const tempBoardList = [...boards];
    const sourceCard = tempBoardList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );
    setBoards(tempBoardList);

    setTargetCard({ boardId: 0, cardId: 0 });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    // console.log("dragEnter");
    if (targetCard.cardId === cardId) {
      return;
    }
    setTargetCard({ boardId: boardId, cardId: cardId });
  };

  useEffect(() => {
    updateLocaleStorageBoards(boards);
  }, [boards]);

  return (
    <Box
      minHeight="70vh"
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="start"
      sx={{
        padding: "20px 30px",
        gap: "10px",
        backgroundImage: `url(${imageBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* {loading && <Box>Loading page...</Box>} */}
        {/* {error && <Box color="secondary">{error}</Box>} */}
        {boards.map((board) => (
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
    </Box>
  );
};
