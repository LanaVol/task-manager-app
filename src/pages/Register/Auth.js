import React from "react";
import { Outlet } from "react-router-dom";
import { Progress } from "../../components/Progress/Progress";

export const AuthPage = () => {
  const isLoading = true;

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <Outlet />
      {/* {isLoading && <Progress />} */}
    </div>
  );
};
