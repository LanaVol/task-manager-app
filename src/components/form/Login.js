import { React, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { ItemCardInfo, ItemCardInfoBG } from "../style/styles/styles";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
          const { data } = await AuthService.login({
            email: values.email,
            password: values.password,
          });

          localStorage.setItem("token", data.token);
          navigate("/");
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setError(e?.response?.data?.message || "Your network error");
        }
      }

      fetchLogin();
    },
  });
  return (
    <Box
      sx={{
        paddingTop: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          maxWidth: "500px",
          autoComplete: "off",
        }}
      >
        <ItemCardInfo elevation={4} sx={{ padding: "50px 30px" }}>
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
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition="end"
            sx={{ padding: "12px 30px", margin: "0 auto" }}
          >
            <span>Submit</span>
          </LoadingButton>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ flexGrow: 1, padding: "20px" }}
          >
            Don't have an account yet?{" "}
            <Link to="/auth/register" style={{ color: "#00838f" }}>
              Create an account
            </Link>
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
        </ItemCardInfo>
      </form>
    </Box>
  );
};
