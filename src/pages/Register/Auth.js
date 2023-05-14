import React from "react";
import { SignupForm } from "../../components/form/Register";

export const AuthPage = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <SignupForm />
    </div>
  );
};
