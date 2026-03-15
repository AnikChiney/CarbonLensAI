import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const SimpleLineChart = ({ data, title }) => {
  const width = 700;
  const height = 320;
  const padding = 50;

  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const scaleX = (index) =>
    padding + (index / (data.length - 1)) * (width - padding * 2);

  const scaleY = (value) =>
    height -
    padding -
    ((value - min) / (max - min || 1)) * (height - padding * 2);

  const points = data
    .map((d, i) => `${scaleX(i)},${scaleY(d.value)}`)
    .join(" ");

  const areaPoints =
    `${padding},${height - padding} ` +
    points +
    ` ${width - padding},${height - padding}`;

  const [hover, setHover] = useState(null);

  return (
    <Box mt={4}>
      <Typography variant="h4" mb={2}>
        {title}
      </Typography>

      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>

        {/* grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i / 4) * (height - padding * 2);
          return (
            <line
              key={i}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="#e0e0e0"
            />
          );
        })}

        {/* shaded area */}
        <polygon
          points={areaPoints}
          fill="#4caf50"
          opacity="0.15"
        />

        {/* trend line */}
        <polyline
          fill="none"
          stroke="#2e7d32"
          strokeWidth="3"
          points={points}
        />

        {/* data points */}
        {data.map((d, i) => {
          const cx = scaleX(i);
          const cy = scaleY(d.value);

          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="5"
                fill="#2e7d32"
                onMouseEnter={() => setHover({ x: cx, y: cy, value: d.value })}
                onMouseLeave={() => setHover(null)}
              />

              {/* x labels */}
              <text
                x={cx}
                y={height - padding + 20}
                textAnchor="middle"
                fontSize="12"
              >
                {d.month}
              </text>
            </g>
          );
        })}

        {/* y labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = Math.round(min + (i / 4) * (max - min));
          const y = height - padding - (i / 4) * (height - padding * 2);

          return (
            <text
              key={i}
              x={10}
              y={y}
              fontSize="12"
            >
              {value}
            </text>
          );
        })}

        {/* tooltip */}
        {hover && (
          <g>
            <rect
              x={hover.x - 25}
              y={hover.y - 35}
              width="50"
              height="20"
              fill="#333"
              rx="4"
            />
            <text
              x={hover.x}
              y={hover.y - 20}
              fill="white"
              fontSize="12"
              textAnchor="middle"
            >
              {hover.value}
            </text>
          </g>
        )}

      </svg>
    </Box>
  );
};

export default SimpleLineChart;