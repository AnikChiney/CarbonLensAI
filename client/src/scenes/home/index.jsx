import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="20px"
    >
      <Typography variant="h2" fontWeight="bold">
        Welcome to CarbonLensAI 🌍
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/login")}
      >
        Sign In
      </Button>

      <Button
        variant="outlined"
        size="large"
        onClick={() => navigate("/register")}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Home;
