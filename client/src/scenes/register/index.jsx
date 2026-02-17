import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  LinearProgress,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";

import { useRegisterMutation, useGoogleLoginMutation } from "state/api";
import { setCredentials } from "state/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link component={RouterLink} to="/" color="inherit">
        CarbonLensAI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [register, { isLoading }] = useRegisterMutation();
  const [googleAuth] = useGoogleLoginMutation();

  // ================= NORMAL SIGN UP =================
const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const payload = {
    fname: data.get("fname"),
    lname: data.get("lname"),
    email: data.get("email"),
    password: data.get("password"),
    phone: data.get("phone"),
    city: data.get("city"),
    country: data.get("country"),
  };

  try {
    const res = await register(payload).unwrap();

    // 🔥 Update Redux with new user
    dispatch(setCredentials(res));

    toast.success("Account created successfully!");
    navigate("/dashboard");

  } catch (err) {
    toast.error(err?.data?.message || "Registration failed");
  }
};


  // ================= GOOGLE SIGN UP =================
  const googleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await googleAuth({
          access_token: tokenResponse.access_token,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success("Signed up with Google successfully!");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Google Sign-Up Failed");
      }
    },
    onError: () => toast.error("Google Sign-Up Failed"),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "0.75rem",
          boxShadow: 3,
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name="fname" label="First Name" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name="lname" label="Last Name" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="email" label="Email Address" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="city" label="City" />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="country" label="Country" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth name="phone" label="Phone" />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Button>

          {isLoading && <LinearProgress />}

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => googleSignUp()}
            sx={{ fontWeight: "bold" }}
          >
            Sign Up with Google
          </Button>

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
