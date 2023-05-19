import React from "react";
import { Box, Paper } from "@mui/material";
import { ItemCardInfoBG } from "../style/styles/styles";

export const Modal = (props: any) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        padding: "20px",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // gap: 5,
        zIndex: 15,
      }}
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <ItemCardInfoBG
        sx={{
          // backgroundColor: "red",
          // width: "80%",
          maxWidth: "700px",
          // display: "flex",
          // justifyContent: "space-between",
          // alignItems: "center",

          padding: "40px 30px",
        }}
        onClick={(event: any) => event.stopPropagation()}
      >
        {props.children}
      </ItemCardInfoBG>
    </Paper>
  );
};
