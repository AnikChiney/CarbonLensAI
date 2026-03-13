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
import GoogleIcon from "@mui/icons-material/Google"; // Added Google Icon
import { useTheme } from "@mui/material/styles";
import { useRegisterMutation, useGoogleLoginMutation } from "state/api";
import { setCredentials } from "state/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

function Copyright(props) {
  return (
    <Typography variant="body2" color="#64748b" align="center" {...props}>
      {"Copyright © "}
      <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: "none" }}>
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
  const isLight = theme.palette.mode === "light";

  const [register, { isLoading }] = useRegisterMutation();
  const [googleAuth] = useGoogleLoginMutation();

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
      dispatch(setCredentials(res));
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 8, // Added padding for scrollable forms on mobile
        background: isLight 
          ? "radial-gradient(circle at 50% 50%, #f4f7fe 0%, #e2e8f0 100%)"
          : "radial-gradient(circle at 50% 50%, #112240 0%, #050a10 100%)",
      }}
    >
      <Container component="main" maxWidth="sm"> {/* Increased to 'sm' for better grid layout */}
        <CssBaseline />

        <Box
          sx={{
            p: { xs: 3, md: 5 },
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
            Create Account
          </Typography>
          
          <Typography variant="body2" color="#64748b" mb={3} textAlign="center">
            Join the mission to quantify and reduce global emissions.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  required 
                  fullWidth 
                  name="fname" 
                  label="First Name" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  required 
                  fullWidth 
                  name="lname" 
                  label="Last Name" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  required 
                  fullWidth 
                  name="email" 
                  label="Email Address" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  required 
                  fullWidth 
                  name="city" 
                  label="City" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  required 
                  fullWidth 
                  name="country" 
                  label="Country" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  name="phone" 
                  label="Phone Number" 
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
            </Grid>

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
              {isLoading ? "Creating Account..." : "Join Now"}
            </Button>

            {isLoading && <LinearProgress sx={{ borderRadius: "5px", height: "6px" }} />}

            <Divider sx={{ my: 3, fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>
              OR SIGN UP WITH
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => googleSignUp()}
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
                  to="/login" 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 700,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </Box> // This closes the outer background Box
  );
}