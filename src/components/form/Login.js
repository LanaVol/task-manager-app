import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@mui/material";

export const WithMUI = () => {
  const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(8, "Password should be a minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Box
      sx={{
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ paddingBottom: "20px" }}
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ paddingBottom: "20px" }}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ padding: "12px 30px" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
