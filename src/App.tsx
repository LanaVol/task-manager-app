import React, { useState } from "react";

import "./App.css";
import { Header } from "./components/Header/Header";
import { TaskBoard } from "./pages/Taskboard/Taskboard";
import { Box, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode === "light" || mode === "dark" ? mode : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        minHeight="100vh"
        className="App"
      >
        <Header setMode={setMode} mode={mode} />
        <TaskBoard />
      </Box>
    </ThemeProvider>
  );
}

export default App;
