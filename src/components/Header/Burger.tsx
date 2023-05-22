import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Close, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
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
  logOut: () => void;
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const BurgerMenu = ({
  burgerMenu,
  matches,
  stateBurger,
  toggleDrawer,
  logOut,
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
          <LogOut logOut={logOut} />,
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
