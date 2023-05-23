import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  Container,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu as MenuIcon } from "@mui/icons-material";
import { BurgerMenu } from "./Burger";
import { Mode } from "./Mode";
import { LogOut } from "./LogOut";

type Anchor = "left";

export const Header = ({ mode, setMode }: any) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:600px)");
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [stateBurger, setStateBurger] = useState({
    left: false,
  });

  useEffect(() => {
    if (!matches) {
      setBurgerMenu(false);
    }
  }, [matches]);

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/auth");
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setStateBurger({ ...stateBurger, [anchor]: open });
      setBurgerMenu(!burgerMenu);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            {matches ? (
              <IconButton
                onClick={toggleDrawer("left", true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}

            {burgerMenu ? (
              <BurgerMenu
                burgerMenu={burgerMenu}
                matches={matches}
                stateBurger={stateBurger}
                toggleDrawer={toggleDrawer}
                logOut={logOut}
                mode={mode}
                setMode={setMode}
              />
            ) : null}

            <Typography
              variant="h6"
              component="div"
              textAlign={matches ? "center" : "left"}
              sx={{ flexGrow: 1, padding: "10px" }}
            >
              Task Manager App
            </Typography>

            {matches ? "" : <LogOut logOut={logOut} />}

            {matches ? (
              ""
            ) : (
              <Mode mode={mode} setMode={setMode} matches={matches} />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
