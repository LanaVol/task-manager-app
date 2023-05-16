import React, { useState } from "react";
import { Paper, Box, Button, TextField, Stack } from "@mui/material";
import { Add as Add, Close, Done } from "@mui/icons-material/";
import IconButton from "@mui/material/IconButton";

interface CustomInputProps {
  text: string;
  placeholder: string;
  defaultValue?: string;
  onClickAddBtn: (value: string) => void;
  directionBtn?: string;
  width?: string;
}

export const CustomInput = (props: CustomInputProps) => {
  const {
    text,
    placeholder,
    defaultValue,
    onClickAddBtn,
    directionBtn,
    width,
  } = props;

  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(defaultValue || "");

  const getTitleBoard = (e: any) => {
    e.preventDefault();

    if (inputText && onClickAddBtn) {
      onClickAddBtn(inputText);
      setInputText("");
    }
    setIsCustomInput(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      borderRadius="7px"
      width={width}
      // width="100%"
    >
      {isCustomInput ? (
        <Paper
          elevation={1}
          sx={{
            // width: "200px",
            width: "fit-content",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            placeholder={placeholder || text}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            autoFocus
            multiline
            maxRows={3}
          />

          <Stack
            spacing={1}
            sx={{
              justifyContent: "center",
              flexDirection: `${directionBtn || "column"}`,
            }}
          >
            <IconButton
              aria-label="add title board"
              color="primary"
              onClick={getTitleBoard}
            >
              <Done fontSize="medium" />
            </IconButton>
            <IconButton
              aria-label="close"
              color="secondary"
              onClick={() => {
                setIsCustomInput(false);
              }}
            >
              <Close fontSize="medium" />
            </IconButton>
          </Stack>
        </Paper>
      ) : (
        <Box>
          <Button
            // startIcon={<Add />}
            onClick={() => setIsCustomInput(true)}
            variant="outlined"
          >
            {text}
          </Button>
        </Box>
      )}
    </Box>
  );
};
