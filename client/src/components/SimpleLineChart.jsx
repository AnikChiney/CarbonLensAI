import React from "react";
import { Box, Typography } from "@mui/material";

const SimpleLineChart = ({ data }) => {
  const width = 600;
  const height = 250;

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.value - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        PM2.5 Monthly Trend
      </Typography>

      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke="#4caf50"
          strokeWidth="3"
          points={points}
        />
      </svg>

      <Box display="flex" justifyContent="space-between" mt={1}>
        {data.map((d) => (
          <Typography key={d.month} variant="caption">
            {d.month}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default SimpleLineChart;
