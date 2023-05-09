import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { BoardItem } from "../interfaces/DataTypes";

export function AxiosServices() {
  const [tasks, setTasks] = useState<BoardItem[]>([]);
  // const [qoute, setQuote] = useState<BoardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //       "https://task-app-back.vercel.app/task"

  async function fetchTodos() {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get<BoardItem[]>(
        "https://quote-garden.onrender.com/api/v3/quotes"
      );
      console.log(response.data);
      setTasks(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    // fetchTodos();
  }, []);

  return { tasks, loading, error };
}
