import { React } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export const RegisterForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-zА-Яа-я]+$/, "Only letters are allowed")
      .min(2, "Too short!")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .matches(/^[A-Za-zА-Яа-я]+$/, "Only letters are allowed")
      .min(2, "Too short!")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string("Enter your password")
      .max(20, "Must be 20 characters or less")
      .min(8, "Password should be a minimum 8 characters length")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));

      async function fetchAuth() {
        const { data } = await AuthService.register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });
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
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          sx={{ paddingBottom: "20px" }}
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
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
