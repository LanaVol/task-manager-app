import React, { useEffect, useState } from "react";
import { Board } from "../../components/Board/Board";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { Grid, Container, Typography, Paper, Box } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { BoardItem, CardItem } from "../../interfaces/DataTypes";

import imageBg from "../../image/2.png";
import TaskService from "../../services/TaskService";
import { Progress } from "../../components/Progress/Progress";
import { Error } from "../../components/Error/Error";
import { AxiosError } from "axios";
import { styled } from "@mui/material/styles";

export const TaskBoard = ({ mode }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [boards, setBoards] = useState<BoardItem[]>([]);
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await TaskService.getBoards();

        if (data) setBoards(data[0]?.boards);
      } catch (e: any) {
        setError(e.response?.data?.message || "Network Error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // function update({ boardId, board }: any) {
  //   TaskService.updateBoard({
  //     boardId: boardId,
  //     board: board,
  //   });
  // }

  // adding new board
  const addBoardHandler = async (boardTitle: string) => {
    try {
      setIsLoading(true);
      const { data } = await TaskService.addBoard({
        title: boardTitle,
        cards: [],
      });
      if (data) setBoards([...boards, data]);
    } catch (e: any) {
      setError(e.response?.data?.message || "Network Error");
    } finally {
      setIsLoading(false);
    }
  };

  // remove current board
  const removeBoard = async (boardId: number) => {
    setIsLoading(true);
    try {
      const { data } = await TaskService.deleteBoard(boardId);
      const updatedBoardList = boards.filter((board) => board.id !== data);
      setBoards(updatedBoardList);
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // adding new card to current board
  const addCardHandler = async (boardId: number, cardTitle: string) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  // remove current card
  const removeCard = async (boardId: number, cardId: number) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  // update current card
  const updateCard = async (
    boardId: number,
    cardId: number,
    card: CardItem
  ) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  // drag&drop cards
  const onDragEnd = async (boardId: number, cardId: number) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({ boardId: boardId, cardId: cardId });
  };

  // MUI
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: theme.palette.mode === "dark" ? "orange" : "blue",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  // MUIend

  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        minHeight: "70vh",
        display: "flex",
        alignItems: matches ? "start" : "center",
        flexDirection: matches ? "row" : "column",
        justifyContent: matches ? "space-between" : "center",
        padding: "20px 30px",
        gap: "20px",
        // backgroundImage: `url(${imageBg})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        sx={{
          flexGrow: 1,
          border: "1px solid blue",
        }}
      >
        {isLoading ? <Progress /> : null}
        {error ? <Error error={error} /> : null}
        {boards?.length > 0 &&
          boards.map((board) => (
            <Box
              gridColumn="span 3"
              // sx={{ border: "1px solid red" }}
              // sx={{ width: matches ? "fit-content" : "100%" }}
            >
              <Item>
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
              </Item>
            </Box>
          ))}
      </Box>
      <CustomInput
        text="Add Board"
        placeholder="Enter Board Title"
        onClickAddBtn={addBoardHandler}
      />
    </Container>
  );
};
