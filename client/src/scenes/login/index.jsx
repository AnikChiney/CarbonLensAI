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
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";

import { useGoogleLogin } from "@react-oauth/google";

import { useLoginMutation, useGoogleLoginMutation } from "state/api";
import { setCredentials } from "state/authSlice";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" component={RouterLink} to="/">
        CarbonLensAI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [loginWithGoogle] = useGoogleLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  /* ================= NORMAL LOGIN ================= */

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  /* ================= GOOGLE LOGIN ================= */

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await loginWithGoogle({
          access_token: tokenResponse.access_token,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Google login successful!");
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        toast.error("Google login failed");
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  /* ================= UI ================= */

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        backgroundColor={theme.palette.background.alt}
        p="2rem"
        borderRadius="0.75rem"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon sx={{ fontSize: "26px" }} />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

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
            Sign In
          </Button>

          {isLoading && <LinearProgress />}

          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* Google Login Button */}
          <Box display="flex" justifyContent="center">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => googleLoginHandler()}
              sx={{
                mt: 1,
                py: 1.2,
                borderColor: "#dadce0",
                color: "#fff",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Sign In with Google
            </Button>
          </Box>

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
