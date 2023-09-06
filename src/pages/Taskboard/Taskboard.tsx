import React, { useEffect, useState, useCallback } from "react";
import { Board } from "../../components/Board/Board";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { GridItem } from "../../components/style/GridItem/GridItem";
import { ItemAddBoardBtn } from "../../components/style/styles/styles";
import { Grid, Container, Box } from "@mui/material";
import { BoardItem, CardItem } from "../../interfaces/DataTypes";
import { Progress } from "../../components/Progress/Progress";
import { Error } from "../../components/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoards,
  addNewBoard,
  removeBoard,
  updateBoardTitle,
  addNewCard,
  removeCard,
  updateCard,
  onDragEnd,
} from "../../redux/board/board.operations";
import { AppDispatch } from "../../redux/store";

export const TaskBoard = (): JSX.Element => {
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const dispatch: AppDispatch = useDispatch();
  const boards = useSelector((state: any) => state.boards.boards);
  const isLoading = useSelector((state: any) => state.boards.isLoading);
  const error = useSelector((state: any) => state.boards.error);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  // adding new board
  const addBoardHandler = useCallback(
    (boardTitle: string) => {
      const newBoard = {
        title: boardTitle,
        cards: [],
      };
      dispatch(addNewBoard(newBoard));
    },
    [dispatch]
  );

  // update board title
  const updateBoardNameHandler = useCallback(
    (boardId: number, value: string) => {
      const boardIndex = boards.findIndex((el: BoardItem) => el.id === boardId);
      if (boardIndex === -1) return;
      const updatedBoard = { ...boards[boardIndex] };
      updatedBoard.title = value;
      console.log(boardId, updatedBoard);
      dispatch(updateBoardTitle({ boardId, board: updatedBoard }));
    },
    [dispatch, boards]
  );

  // remove current board
  const removeBoardHandler = useCallback(
    (boardId: number) => {
      dispatch(removeBoard(boardId));
    },
    [dispatch]
  );

  // adding new card to current board
  const addCardHandler = useCallback(
    (boardId: number, cardTitle: string) => {
      const boardIndex = boards.findIndex((el: BoardItem) => el.id === boardId);
      if (boardIndex === -1) return;

      const tempBoardList = JSON.parse(JSON.stringify(boards));
      tempBoardList[boardIndex].cards.push({
        id: Date.now() + Math.random() * 2,
        title: cardTitle,
        labels: [],
        date: "",
        tasks: [],
      });

      dispatch(addNewCard({ boardId, board: tempBoardList[boardIndex] }));
    },
    [dispatch, boards]
  );

  // remove current card
  const removeCardHandler = useCallback(
    (boardId: number, cardId: number) => {
      const boardIndex = boards.findIndex((el: BoardItem) => {
        return el.id === boardId;
      });
      if (boardIndex === -1) return;
      const updatedBoard = { ...boards[boardIndex] };
      updatedBoard.cards = updatedBoard.cards.filter(
        (card: any) => card.id !== cardId
      );
      dispatch(removeCard({ boardId, board: updatedBoard }));
    },
    [dispatch, boards]
  );

  // update current card
  const updateCardHandler = useCallback(
    (boardId: number, cardId: number, card: CardItem) => {
      const boardIndex = boards.findIndex((el: any) => {
        return el.id === boardId;
      });
      if (boardIndex === -1) return;

      const updatedBoard = JSON.parse(JSON.stringify(boards[boardIndex]));
      const cards = updatedBoard.cards;
      const cardIndex = cards.findIndex((el: any) => {
        return el.id === cardId;
      });
      if (cardIndex === -1) return;

      updatedBoard.cards[cardIndex] = card;
      dispatch(updateCard({ boardId, board: updatedBoard }));
    },
    [dispatch, boards]
  );

  // drag&drop cards
  const onDragEndHandler = useCallback(
    (boardId: number, cardId: number) => {
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
      const tempBoardList = JSON.parse(JSON.stringify(boards));
      const sourceCard = tempBoardList[sourceBoardIndex].cards[sourceCardIndex];
      tempBoardList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
      tempBoardList[targetBoardIndex].cards.splice(
        targetCardIndex,
        0,
        sourceCard
      );
      const boardDel = tempBoardList[sourceBoardIndex];
      const boardAdded = tempBoardList[targetBoardIndex];

      dispatch(
        onDragEnd([
          { boardId: boardDel.id, board: boardDel },
          { boardId: boardAdded.id, board: boardAdded },
        ])
      );
      setTargetCard({ boardId: 0, cardId: 0 });
    },
    [dispatch, boards, targetCard.boardId, targetCard.cardId]
  );

  const onDragEnter = (boardId: number, cardId: number) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({ boardId: boardId, cardId: cardId });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: "20px 30px",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        {isLoading ? <Progress /> : null}
        {error ? <Error error={error} /> : null}
        {boards?.length > 0 &&
          boards?.map((board: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={board.id}>
              <GridItem>
                <Board
                  board={board}
                  addCard={addCardHandler}
                  removeBoard={() => removeBoardHandler(board.id)}
                  removeCard={removeCardHandler}
                  updateCard={updateCardHandler}
                  onDragEnd={onDragEndHandler}
                  onDragEnter={onDragEnter}
                  updateBoardName={updateBoardNameHandler}
                />
              </GridItem>
            </Grid>
          ))}
      </Grid>

      <Box>
        <ItemAddBoardBtn>
          <CustomInput
            placeholder="Enter Board Title"
            onClickAddBtn={addBoardHandler}
            padding="20px"
            bdRadius="50%"
          />
        </ItemAddBoardBtn>
      </Box>
    </Container>
  );
};
