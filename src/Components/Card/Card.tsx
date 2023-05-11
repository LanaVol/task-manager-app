import React, { useState } from "react";
import { CardItem } from "../../interfaces/DataTypes";
import { CardInfo } from "./CardInfo";
import { Dropdown } from "../Dropdown/Dropdown";
import { Chip } from "../Common/Chip";
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

interface CardProps {
  card: CardItem;
  boardId: number;
  removeCard: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: CardItem) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
  const { card, boardId, removeCard, updateCard, onDragEnd, onDragEnter } =
    props;
  const { id, title, date, tasks, labels } = card;

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "20px",
        marginBottom: "10px",
      }}
    >
      {showCardInfo && (
        <CardInfo
          card={card}
          boardId={boardId}
          onCLose={() => {
            setShowCardInfo(false);
          }}
          updateCard={updateCard}
        />
      )}

      <Stack
        key={card.id}
        draggable
        onDragEnd={() => {
          return onDragEnd(boardId, id);
        }}
        onDragEnter={() => {
          return onDragEnter(boardId, id);
        }}
        onClick={() => {
          setShowCardInfo(true);
        }}
        direction="column"
        spacing={2}
        justifyContent="space-between"
        alignItems="start"
      >
        <Box>
          {labels?.map((el, index: number) => (
            <Chip key={index} el={el} />
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <IconButton aria-label="menu">
              <LinearScaleIcon fontSize="medium" color="info" />
            </IconButton>
            {showDropdown && (
              <Dropdown
                onClose={() => {
                  setShowDropdown(false);
                }}
              >
                <Box onClick={() => removeCard(boardId, id)}>
                  <Button variant="contained">Delete Card</Button>
                </Box>
              </Dropdown>
            )}
          </Box>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {date}
        </Typography>
        <Box>
          {tasks && tasks?.length > 0 ? (
            <Box>
              {`${tasks?.filter((el) => el.completed)?.length}/${
                tasks?.length
              } tasks`}
            </Box>
          ) : (
            <Box>{`${tasks?.length} tasks`}</Box>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
