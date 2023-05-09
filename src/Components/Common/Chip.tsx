import React from "react";
import { LabelItem } from "../../Interfaces/DataTypes";

import { Close as Close } from "@mui/icons-material";

interface ChipProps {
  el: LabelItem;
  removeLabel?: (label: LabelItem) => void;
}

export const Chip = (props: ChipProps) => {
  const { el, removeLabel } = props;
  console.log("@", el);

  return (
    <label
      style={{
        backgroundColor: el.color,
        color: "#fff",
        width: "fit-content",
        padding: "3px 6px",
        borderRadius: "7px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "7px",
      }}
    >
      {el.text}
      {removeLabel && (
        <Close
          fontSize="small"
          sx={{ width: "18px", color: "#fff", cursor: "pointer" }}
          onClick={() => removeLabel(el)}
        />
      )}
    </label>
  );
};
