import React, { useRef, useEffect } from "react";
import { Paper } from "@mui/material";

export const Dropdown = (props: any) => {
  const dropdownRef: any = useRef(null);

  const handleClick = (e: any) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(e.currentTarget) &&
      props.onClose
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <Paper
      ref={dropdownRef}
      style={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "36px",
        right: 0,
        padding: "12px",
        borderRadius: "5px",
      }}
    >
      {props.children}
    </Paper>
  );
};
