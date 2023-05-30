import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const LogOut = ({ logOut }: { logOut: () => void }) => {
  const tokenLS = localStorage.getItem("token");

  return tokenLS ? (
    <Box onClick={logOut} sx={{ display: "flex", alignContent: "center" }}>
      <Button color="inherit" startIcon={<LogoutIcon />}>
        Log out
      </Button>
    </Box>
  ) : null;
};
