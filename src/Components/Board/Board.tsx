import React, { useState } from "react";
import { Paper, Box, Typography, IconButton, Button } from "@mui/material";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { BoardItem, CardItem } from "../../interfaces/DataTypes";
import { CustomInput } from "../CustomInput/CustomInput";
import { Card } from "../Card/Card";
import { Dropdown } from "../Dropdown/Dropdown";
import useMediaQuery from "@mui/material/useMediaQuery";

interface BoardProps {
  board: BoardItem;
  addCard: (boardId: number, cardTitle: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: CardItem) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    updateCard,
    onDragEnd,
    onDragEnter,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Paper
      elevation={2}
      sx={{
        // backgroundColor: "#ECF5FF",
        backgroundColor: "secondary",
        width: matches ? "fit-content" : "100%",

        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="10px"
          sx={{ border: "1px solid red" }}
        >
          <Typography variant="h5" gutterBottom sx={{ padding: "15px" }}>
            {board.title}
          </Typography>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {board?.cards?.length || 0}
            </Typography>
          </Box>

          <Box sx={{ zIndex: 5 }}>
            <IconButton
              aria-label="menu"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <LinearScaleIcon fontSize="medium" color="info" />
            </IconButton>
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <Box
                  onClick={() => {
                    removeBoard(board?.id);
                  }}
                >
                  <Button variant="contained">Delete Board</Button>
                </Box>
              </Dropdown>
            )}
          </Box>
        </Box>
        <Box sx={{ padding: "7px 15px", maxWidth: "300px" }}>
          {board?.cards?.map((card) => (
            <Card
              card={card}
              key={card.id}
              boardId={board.id}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
            />
          ))}
        </Box>
      </Box>

      <CustomInput
        text="Add Card"
        placeholder="Enter Card Title"
        onClickAddBtn={(value: string) => {
          addCard(board.id, value);
        }}
      />
    </Paper>
  );
};
