import { React } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AxiosError } from "axios";

export const RegisterForm = () => {
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[A-Za-zА-Яа-я]+$/, "Only letters are allowed")
      .min(2, "Too short!")
      .max(15, "Must be 15 characters or less")
      .required("Required"),

    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string("Enter your password")
      .max(20, "Must be 20 characters or less")
      .min(8, "Password should be a minimum 8 characters length")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { userName: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));

      async function fetchAuth() {
        try {
          const { data } = await AuthService.register({
            userName: values.firstName,
            email: values.email,
            password: values.password,
          });

          console.log(data.data);

          localStorage.setItem("token", data.token);
        } catch {}
      }

      fetchAuth();
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
          CREATE AN ACCOUNT
        </Typography>
        <TextField
          sx={{ paddingBottom: "20px" }}
          fullWidth
          id="userName"
          name="userName"
          label="User Name"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
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
          Have already an account? <Link to="/auth">Log in</Link>
        </Typography>
      </form>
    </Box>
  );
};
