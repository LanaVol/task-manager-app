import React from "react";
import { Box, Paper } from "@mui/material";

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
        gap: 5,
        zIndex: "10",
      }}
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <Box
        sx={{
          backgroundColor: "#ECF5FF",
          width: "80%",
          maxWidth: "700px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          padding: "30px",
        }}
        onClick={(event: any) => event.stopPropagation()}
      >
        {props.children}
      </Box>
    </Paper>
  );
};
