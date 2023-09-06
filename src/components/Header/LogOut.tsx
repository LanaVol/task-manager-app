import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { AuthOperations } from "../../redux/auth/auth.operations";
import { AppDispatch } from "../../redux/store";

export const LogOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.auth.isLogged);
  const handleLogOut = () => {
    dispatch(AuthOperations.logout());
  };

  return isLogged ? (
    <Box
      onClick={handleLogOut}
      sx={{ display: "flex", alignContent: "center" }}
    >
      <Button color="inherit" startIcon={<LogoutIcon />}>
        Log out
      </Button>
    </Box>
  ) : null;
};
