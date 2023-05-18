import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

const shadow = {
  1: "-1px 2px 2px 1px #00bcd450, 2px 2px 2px 1px #00bcd450, 2px 2px 2px 1px #00bcd450",
  2: "-1px 2px 2px 1px #bf360c50, 2px 2px 2px 1px #bf360c50, 2px 2px 2px 1px #bf360c50",
  // 2: "0px 2px 1px -1px #bf360c, 0px 1px 1px 0px #bf360c, 0px 1px 3px 0px #bf360c",
};

export const GridItem = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#00606450" : "#00acc150",
  boxShadow: theme.palette.mode === "dark" ? shadow[1] : shadow[2],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
