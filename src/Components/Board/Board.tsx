import React, { useState } from "react";
import { Paper, Box, Typography, IconButton, Button } from "@mui/material";
// import LinearScaleIcon from "@mui/icons-material/LinearScale";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { BoardItem, CardItem } from "../../interfaces/DataTypes";
import { CustomInput } from "../CustomInput/CustomInput";
import { Card } from "../Card/Card";
import { Dropdown } from "../Dropdown/Dropdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { grey, deepOrange } from "@mui/material/colors";

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
  // const matches = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={
        {
          // width: matches ? "fit-content" : "100%",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "space-between",
          // backgroundColor: "inherit",
        }
      }
    >
      <Box
        sx={
          {
            // border: "1px solid red",
          }
        }
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="10px"
          sx={{ border: "1px solid blue", padding: "8px" }}
        >
          <Typography variant="h5" gutterBottom sx={{ padding: "0px" }}>
            {board.title}
          </Typography>
          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                border: "1px solid red",
                padding: "7px 16px",
                borderRadius: "50%",
              }}
            >
              {board?.cards?.length || 0}
            </Typography>
          </Box>

          <Box sx={{ zIndex: 5 }}>
            <IconButton
              size="large"
              color="secondary"
              aria-label="menu"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <DragHandleRoundedIcon fontSize="inherit" />
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
        <Box
          sx={{
            // border: "1px solid red",
            padding: "7px",
            maxHeight: "450px",
            overflow: "hidden",
            "&:hover": { overflowY: "scroll" },
            "&::-webkit-scrollbar": {
              width: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: deepOrange[300],
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: grey[300],
            },
          }}
        >
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
    </Box>
  );
};
