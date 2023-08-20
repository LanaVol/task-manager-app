import React from "react";
import { Box, Typography } from "@mui/material";

interface ItemIconTextProps {
  Component: any;
  info: string;
}

const ItemIconText = ({ Component, info }: ItemIconTextProps): JSX.Element => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Component color="primary" fontSize="medium" />
        <Typography
          variant="h4"
          fontSize="20px"
          gutterBottom
          marginBottom={0}
          sx={{ padding: "5px", paddingTop: "0" }}
        >
          {info}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemIconText;
