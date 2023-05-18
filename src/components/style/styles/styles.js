import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";
import { grey, cyan, deepOrange } from "@mui/material/colors";

export const ItemAddBoardBtn = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.secondary.main,
  ...theme.typography.button,
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  position: "fixed",
  bottom: "30px",
  right: "30px",
  borderRadius: "50%",
  zIndex: 10,
}));

export const ItemAddCardBtn = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.secondary.main,
  ...theme.typography.button,
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  padding: "5px",
}));

export const TitleBgBoard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#00606430" : "#ff572230",
  // backgroundColor: theme.palette.mode === "dark" ? cyan[900] : deepOrange[50],
}));
