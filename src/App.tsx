import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components/Header/Header";
import { TaskBoard } from "./pages/Taskboard/Taskboard";
import { Box, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AuthPage } from "./pages/Register/Auth";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode === "light" || mode === "dark" ? mode : "light",
      primary: {
        main: "#00838f",
        light: "#00acc1",
        dark: "#006064",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          minHeight="100vh"
          className="App"
        >
          <Header setMode={setMode} mode={mode} />
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
