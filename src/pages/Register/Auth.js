import React from "react";
import { SignupForm } from "../../components/form/Register";
import { WithMUI } from "../../components/form/Login";

export const AuthPage = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <SignupForm />
      {/* <WithMUI /> */}
    </div>
  );
};
