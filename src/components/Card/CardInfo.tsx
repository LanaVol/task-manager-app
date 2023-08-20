import React, { useEffect, useState } from "react";
import { CardItem, LabelItem, TaskItem } from "../../interfaces/DataTypes";
import { Modal } from "../Modal/Modal";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Checkbox,
  ListItemIcon,
  Grid,
} from "@mui/material";
import {
  Title,
  Description,
  CalendarMonth,
  AssignmentTurnedIn,
  Close,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material/";
import { DateCalendar } from "../Calendar/Calendar";
import { colorList } from "../../data/dataUtility";
import { CustomInput } from "../CustomInput/CustomInput";
import { Chip } from "../Common/Chip";
import { ItemAddCardBtn, ItemCardInfo } from "../style/styles/styles";
import { deepOrange } from "@mui/material/colors";
import ItemIconText from "./ItemIconText";
import CardInfoItem from "./CardInfoItem";

interface CardInfoProps {
  card: CardItem;
  boardId: number;
  onCLose: () => void;
  updateCard: (boardId: number, cardId: number, card: CardItem) => void;
}

export const CardInfo: React.FC<CardInfoProps> = (props: CardInfoProps) => {
  const { card, boardId, onCLose, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("#00796b");
  const [cardValues, setCardValues] = useState<CardItem>({
    ...card,
  });

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDescript = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  //--------------- add and remove label
  const addLabel = (label: LabelItem) => {
    const { labels } = cardValues;

    const index = labels.findIndex((el) => el.text === label.text);

    if (index > -1) return;

    setSelectedColor("#00796b");

    setCardValues((prevCardValues) => ({
      ...prevCardValues,
      labels: [...prevCardValues.labels, label],
    }));
  };

  const removeLabel = (label: LabelItem) => {
    const tempLabels = cardValues.labels.filter((el) => el.text !== label.text);
    setCardValues({ ...cardValues, labels: tempLabels });
  };

  //--------------------- add, remove & update new task
  const addTask = (value: string) => {
    const task: TaskItem = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({ ...cardValues, tasks: [...cardValues.tasks, task] });
  };

  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((el) => {
      return el.id !== id;
    });
    setCardValues({ ...cardValues, tasks: tempTasks });
  };

  const checkDoneTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((el) => {
      return el.id === id;
    });
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({ ...cardValues, tasks });
  };

  // ------------ update date
  const updateDate = (date: string) => {
    if (!date) {
      return;
    }
    setCardValues({ ...cardValues, date });
  };

  // for checkbox MUI
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    if (updateCard) {
      updateCard(boardId, cardValues.id, cardValues);
    }
  }, [cardValues]);

  return (
    <Modal onClose={onCLose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <Typography variant="h5" gutterBottom color="inherit" marginBottom={0}>
          Card Information
        </Typography>

        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ backgroundColor: "inherit", borderRadius: "50%" }}
          onClick={() => {
            onCLose();
          }}
        >
          <Close fontSize="medium" />
        </IconButton>
      </Box>

      <CardInfoItem>
        <ItemIconText Component={Title} info={cardValues.title} />

        <ItemAddCardBtn>
          <CustomInput
            directionBtn={"row"}
            text={"Edit Title"}
            placeholder="Enter Title"
            onClickAddBtn={updateTitle}
          />
        </ItemAddCardBtn>
      </CardInfoItem>

      <CardInfoItem>
        <ItemIconText
          Component={Description}
          info={cardValues.desc || "Description"}
        />

        <ItemAddCardBtn>
          <CustomInput
            directionBtn={"row"}
            defaultValue={cardValues.desc}
            text={"Edit a Description"}
            placeholder="Enter Description"
            onClickAddBtn={updateDescript}
          />
        </ItemAddCardBtn>
      </CardInfoItem>

      <CardInfoItem>
        <ItemIconText Component={CalendarMonth} info="Date" />
        <DateCalendar updateDate={updateDate} />
      </CardInfoItem>

      <CardInfoItem>
        <ItemIconText Component={BookmarkBorder} info="Labels" />
        <Box
          width="fit-content"
          display="flex"
          flexWrap="wrap"
          gap="7px"
          marginBottom="1rem"
        >
          {cardValues.labels?.map((el, index) => (
            <Chip key={index} el={el} removeLabel={removeLabel} />
          ))}
        </Box>

        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            {colorList.map((color, index) => (
              <ListItemIcon
                key={index}
                onClick={() => setSelectedColor(color)}
                sx={{
                  minWidth: "15px",
                  border: "1px solid #bf360c50",
                  borderRadius: "15px",
                  padding: "2px",
                  margin: "2px",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0px 4px 6px #bf360c50, -2px -4px 6px #bf360c50",
                  },
                }}
              >
                <Bookmark sx={{ backgroundColor: { color } }} />
              </ListItemIcon>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <ItemAddCardBtn>
              <CustomInput
                directionBtn={"row"}
                text="Add Label"
                placeholder="Enter label text"
                onClickAddBtn={(value: string) =>
                  addLabel({ color: selectedColor, text: value })
                }
              />
            </ItemAddCardBtn>
          </Grid>
        </Grid>
      </CardInfoItem>

      <CardInfoItem>
        <ItemIconText
          Component={AssignmentTurnedIn}
          info={`Tasks: ${cardValues.tasks.length}`}
        />
        <ItemAddCardBtn>
          <CustomInput
            directionBtn={"row"}
            text={"Add New Task"}
            placeholder="Enter Task"
            onClickAddBtn={addTask}
          />
        </ItemAddCardBtn>
      </CardInfoItem>

      <ItemCardInfo
        elevation={3}
        sx={{
          maxHeight: "150px",
          overflow: "hidden",
          "&:hover": { overflowY: "scroll" },
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: deepOrange["A400"],
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: deepOrange["100"],
          },
        }}
      >
        {cardValues.tasks?.map((el) => (
          <Paper
            elevation={1}
            key={el.id}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "3px",
              marginBottom: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                {...label}
                checked={el.completed}
                onChange={(e) => checkDoneTask(el.id, e.target.checked)}
              />
              <Typography
                variant="subtitle1"
                align="left"
                sx={{
                  textDecoration: el.completed ? "line-through" : "none",
                }}
              >
                {el.text}
              </Typography>
            </Box>

            <IconButton
              aria-label="close"
              color="secondary"
              onClick={() => removeTask(el.id)}
            >
              <Close fontSize="medium" />
            </IconButton>
          </Paper>
        ))}
      </ItemCardInfo>
    </Modal>
  );
};
