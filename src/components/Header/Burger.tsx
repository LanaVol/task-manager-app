import React from "react";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { WrapperBurgerMenu } from "../style/styles/styles";
import { LogOut } from "./LogOut";
import { Mode } from "./Mode";

type Anchor = "left";

interface BurgerMenuProps {
  burgerMenu: boolean;
  matches: boolean;
  stateBurger: {
    left: boolean;
  };
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const BurgerMenu = ({
  burgerMenu,
  matches,
  stateBurger,
  toggleDrawer,
  mode,
  setMode,
}: BurgerMenuProps) => {
  const list = (anchor: Anchor) => (
    <WrapperBurgerMenu
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          <LogOut />,
          <Mode mode={mode} setMode={setMode} matches={matches} />,
        ].map((el, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={el} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </WrapperBurgerMenu>
  );

  return burgerMenu ? (
    <React.Fragment key={"left"}>
      <Drawer
        anchor="left"
        open={stateBurger["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  ) : null;
};
