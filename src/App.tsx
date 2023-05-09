import React from "react";

import "./App.css";
import { Header } from "./Components/Header/Header";
import { TaskBoard } from "./Pages/Taskboard/Taskboard";

function App() {
  return (
    <div className="App">
      <Header />
      <TaskBoard />
    </div>
  );
}

export default App;
