import React from "react";
import { Grid } from "@mui/material";

function CardInfoItem({ children }) {
  return (
    <Grid
      container
      sx={{
        marginBottom: "0.3rem",
        padding: "1rem",
      }}
    >
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        {children[0]}
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        {children[1]}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {children[2]}
      </Grid>
    </Grid>
  );
}

export default CardInfoItem;
