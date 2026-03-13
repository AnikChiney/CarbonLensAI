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
  alpha,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginMutation, useGoogleLoginMutation } from "state/api";
import { setCredentials } from "state/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography variant="body2" color="#64748b" align="center" {...props}>
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
  const isLight = theme.palette.mode === "light";

  const [login, { isLoading }] = useLoginMutation();
  const [loginWithGoogle] = useGoogleLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

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
        toast.error("Google login failed");
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: isLight 
          ? "radial-gradient(circle at 50% 50%, #f4f7fe 0%, #e2e8f0 100%)"
          : "radial-gradient(circle at 50% 50%, #112240 0%, #050a10 100%)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            p: 4,
            borderRadius: "24px",
            backgroundColor: isLight ? "#ffffff" : "rgba(15, 23, 42, 0.6)",
            backdropFilter: isLight ? "none" : "blur(16px)",
            border: `1px solid ${isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.08)"}`,
            boxShadow: isLight 
              ? "0px 20px 40px rgba(0,0,0,0.05)" 
              : "0px 20px 40px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
            <LockOutlinedIcon sx={{ fontSize: "30px", color: "#fff" }} />
          </Avatar>

          <Typography 
            component="h1" 
            variant="h3" 
            fontWeight="800" 
            sx={{ mt: 2, mb: 1, letterSpacing: "-0.02em" }}
          >
            Sign In
          </Typography>
          <Typography variant="body2" color="#64748b" mb={3}>
            Welcome back to the Green Revolution.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "1rem",
                background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                boxShadow: "0 4px 15px rgba(0, 198, 255, 0.3)",
                "&:hover": { transform: "translateY(-2px)", opacity: 0.9 }
              }}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            {isLoading && <LinearProgress sx={{ borderRadius: "5px", height: "6px" }} />}

            <Divider sx={{ my: 3, fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>
              OR CONTINUE WITH
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => googleLoginHandler()}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.2)",
                color: isLight ? "#1e293b" : "#fff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: isLight ? alpha(theme.palette.primary.main, 0.05) : "rgba(255,255,255,0.05)",
                },
              }}
            >
              Google
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 700,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </Box>
  );
}