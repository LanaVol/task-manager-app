import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const ItemBtn = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
  ...theme.typography.button,
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  position: "fixed",
  bottom: "30px",
  right: "30px",
  borderRadius: "50%",
}));
