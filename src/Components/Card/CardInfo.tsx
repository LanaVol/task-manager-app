import React, { useEffect, useState } from "react";

import { CardItem, LabelItem, TaskItem } from "../../Interfaces/DataTypes";
import { Modal } from "../Modal/Modal";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import {
  Title as Title,
  Description as Description,
  CalendarMonth as CalendarMonth,
  Assignment as Assignment,
  Close as Close,
  BookmarkBorder as BookmarkBorder,
  Bookmark as Bookmark,
} from "@mui/icons-material/";
import { DateCalendar } from "../Calendar/Calendar";
import { colorList } from "../../Data/dataUtility";
import { CustomInput } from "../CustomInput/CustomInput";
import { Chip } from "../Common/Chip";

interface CardInfoProps {
  card: CardItem;
  boardId: number;
  onCLose: () => void;
  updateCard: (boardId: number, cardId: number, card: CardItem) => void;
}

export const CardInfo: React.FC<CardInfoProps> = (props: CardInfoProps) => {
  const { card, boardId, onCLose, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState<CardItem>({
    ...card,
    labels: [],
  });
  console.log(cardValues);

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDescript = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  //-------------------------------- add and remove label
  const addLabel = (label: LabelItem) => {
    const index = cardValues.labels?.findIndex((el) => el.text === label.text);
    if (index > -1) {
      return;
    }

    setSelectedColor("");
    setCardValues({ ...cardValues, labels: [...cardValues.labels, label] });
  };

  const removeLabel = (label: LabelItem) => {
    const tempLabels = cardValues.labels.filter((el) => el.text !== label.text);

    setCardValues({ ...cardValues, labels: tempLabels });
  };

  //------------------------------ add, remove & update new task
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

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((el) => {
      return el.id === id;
    });
    if (index < 0) {
      return;
    }

    tasks[index].completed = Boolean(value);

    setCardValues({ ...cardValues, tasks });
    console.log(cardValues);
  };

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) {
      return 0;
    }
    const completed = cardValues.tasks?.filter(
      (task) => task.completed
    )?.length;
    return (completed / cardValues.tasks?.length) * 100;
  };
  const calculatedPercent = calculatePercent();

  // update date
  const updateDate = (date: string) => {
    console.log("@@", date);
    if (!date) {
      return;
    }
    setCardValues({ ...cardValues, date });
  };

  // for checkbox MUI
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [dense, setDense] = useState(false);

  useEffect(() => {
    if (updateCard) {
      updateCard(boardId, cardValues.id, cardValues);
    }
  }, [cardValues]);

  return (
    <Modal onClose={onCLose}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px 30px",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Title color="info" fontSize="large" />
            <Typography
              variant="h5"
              gutterBottom
              marginBottom={0}
              sx={{ padding: "5px" }}
            >
              Title
            </Typography>
          </Box>
          <CustomInput
            directionBtn={"row"}
            width="fullwidth"
            // Уточнити щодо найменування в Custom Input
            text={cardValues.title || "Edit Title"}
            placeholder="Enter Title"
            onClickAddBtn={updateTitle}
          />
        </Paper>

        <Paper
          elevation={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Description color="info" fontSize="large" />
            <Typography
              variant="h5"
              gutterBottom
              marginBottom={0}
              sx={{ padding: "5px" }}
            >
              Description
            </Typography>
          </Box>
          <CustomInput
            directionBtn={"row"}
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter Description"
            onClickAddBtn={updateDescript}
          />
        </Paper>

        <Paper
          elevation={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CalendarMonth color="info" fontSize="large" />
            <Typography
              variant="h5"
              gutterBottom
              marginBottom={0}
              sx={{ padding: "5px" }}
            >
              Date
            </Typography>
          </Box>
          <DateCalendar updateDate={updateDate} />
        </Paper>

        <Box>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <BookmarkBorder color="info" fontSize="large" />
                <Typography
                  variant="h5"
                  gutterBottom
                  marginBottom={0}
                  sx={{ padding: "5px" }}
                >
                  Labels
                </Typography>
              </Box>

              <Box width="fit-content" display="flex" gap="7px">
                {cardValues.labels?.map((el, index) => (
                  <Chip key={index} el={el} removeLabel={removeLabel} />
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <List dense={dense} sx={{ padding: "0" }}>
                <ListItem>
                  {colorList.map((color, index) => (
                    <ListItemIcon
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        minWidth: "15px",
                        border: "1px solid gray",
                        borderRadius: "15px",
                        padding: "2px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <Bookmark sx={{ backgroundColor: { color } }} />
                    </ListItemIcon>
                  ))}
                </ListItem>
              </List>
              <CustomInput
                text="Add Label"
                placeholder="Enter label text"
                onClickAddBtn={(value: string) =>
                  addLabel({ color: selectedColor, text: value })
                }
              />
            </Box>
          </Paper>
        </Box>

        <Box>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Assignment color="info" fontSize="large" />
              <Typography
                variant="h5"
                gutterBottom
                marginBottom={0}
                sx={{ padding: "5px" }}
              >
                Tasks
              </Typography>
            </Box>
            <CustomInput
              directionBtn={"row"}
              text={"Add New Task"}
              placeholder="Enter Task"
              onClickAddBtn={addTask}
            />
          </Paper>
          {/* <Box
            sx={{ width: "fullwidth", height: "20px", border: "1px solid red" }}
          >
            <Box
              sx={{
                width: `${calculatedPercent}%`,
                height: "10px",
                backgroundColor: `${
                  calculatedPercent === 100 ? "secondary" : ""
                }`,
              }}
            />
          </Box> */}

          <Paper elevation={2} sx={{ marginBottom: "10px" }}>
            {cardValues.tasks?.map((el) => (
              <Paper
                elevation={1}
                key={el.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    {...label}
                    checked={el.completed}
                    onChange={(e) => updateTask(el.id, e.target.checked)}
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
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
};
