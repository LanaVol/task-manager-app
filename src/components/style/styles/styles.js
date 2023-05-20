import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";
// import { grey, cyan, deepOrange } from "@mui/material/colors";

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
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? theme.palette.primary.dark
  //     : theme.palette.secondary.light,
  border:
    theme.palette.mode === "dark"
      ? `1px solid ${theme.palette.primary.dark}`
      : `1px solid ${theme.palette.secondary.light}`,
  ...theme.typography.button,
  textAlign: "center",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#26a69a" : "#ff7043",
    color: theme.palette.primary.contrastText,
  },
  transition: "all 100ms linear",
  // color: theme.palette.primary.contrastText,
  // padding: "5px",
}));

export const TitleBgBoard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#00606425" : "#ff572220",
  borderBottom:
    theme.palette.mode === "dark" ? "2px solid #006064" : "2px solid #ff5722",
  color: theme.palette.mode === "dark" ? "#009688" : "#d84315",
}));

export const TitleBgCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#ff3d0025" : "#00968825",
  borderBottom:
    theme.palette.mode === "dark" ? "1px solid #ff3d00" : "1px solid #009688",
  color: theme.palette.mode === "dark" ? "#ff3d00" : "#009688",
}));

export const ItemCardInfoBG = styled(Box)(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? theme.palette.primary.dark
  //     : theme.palette.secondary.light,
  backgroundColor: theme.palette.mode === "dark" ? "#00695c" : "#ffccbc",
  borderRadius: "16px",

  // color: theme.palette.mode === "dark" ? "#ff3d00" : "#009688",
}));

export const ItemCardInfo = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
}));
