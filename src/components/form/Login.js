import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Typography,
  ImageListItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { Link, useNavigate } from "react-router-dom";
import { ItemCardInfo } from "../style/styles/styles";
import todolist from "../../image/todolist.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { AuthOperations } from "../../redux/auth/auth.operations";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

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
      dispatch(
        AuthOperations.singin({
          email: values.email,
          password: values.password,
        })
      );
      navigate("/");
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
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        style={{
          maxWidth: "500px",
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

          <ImageListItem
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              maxWidth: "400px",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            <img
              src={todolist}
              alt="Screen Saver"
              sx={{ height: "100%", weight: "auto" }}
            />
          </ImageListItem>

          <TextField
            sx={{ paddingBottom: "20px" }}
            autoComplete="off"
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              autoComplete="off"
              sx={{ backgroundColor: "inherit" }}
            />
            <FormHelperText
              error={formik.touched.password && Boolean(formik.errors.password)}
              sx={{
                visibility:
                  formik.touched.password && formik.errors.password
                    ? "visible"
                    : "hidden",
                height: "12px",
                marginBottom: "10px",
              }}
            >
              {formik.errors.password}
            </FormHelperText>
          </FormControl>

          <Typography
            variant="subtitle2"
            textAlign="left"
            component="div"
            width="100%"
          >
            User for test: <br />
            e-mail: tester@gmail.com <br />
            password: tester123
          </Typography>

          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            loading={isLoading}
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
