import React from "react";

import "./App.css";
import { Header } from "./components/Header/Header";
import { TaskBoard } from "./pages/Taskboard/Taskboard";

function App() {
  return (
    <div className="App">
      <Header />
      <TaskBoard />
    </div>
  );
}

export default App;
