import { React, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      async function fetchLogin() {
        try {
          setError(null);
          const { data } = await AuthService.login({
            email: values.email,
            password: values.password,
          });

          localStorage.setItem("token", data.token);
          navigate("/");
        } catch (e) {
          setError(e?.response?.data?.message || "Your network error");
        }
      }

      fetchLogin();
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
      <form
        onSubmit={formik.handleSubmit}
        style={{
          maxWidth: "500px",
          padding: "50px 30px",
          border: "1px solid red",
          autoComplete: "off",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{ flexGrow: 1, padding: "20px" }}
        >
          Login
        </Typography>
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
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ flexGrow: 1, padding: "20px" }}
        >
          Don't have an account yet?{" "}
          <Link to="/auth/register">Create an account</Link>
        </Typography>
        {error ? (
          <Typography
            variant="subtitle1"
            component="p"
            color="error"
            sx={{ flexGrow: 1, padding: "20px" }}
          >
            {error}
          </Typography>
        ) : null}
      </form>
    </Box>
  );
};
