import React from "react";
import { Box, Typography } from "@mui/material";

const Individual = () => {
  return (
    <Box p="2rem">
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Individual Carbon Dashboard
      </Typography>

      <Typography>
        Track your personal carbon footprint and receive AI-powered
        sustainability insights.
      </Typography>
    </Box>
  );
};

export default Individual;
