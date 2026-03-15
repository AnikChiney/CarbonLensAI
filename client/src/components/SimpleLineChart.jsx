import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";

const SimpleLineChart = ({ data, title }) => {
  const theme = useTheme();

  const width = 720;
  const height = 340;
  const padding = 60;

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

      {title && (
        <Typography variant="h4" mb={2}>
          {title}
        </Typography>
      )}

      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>

        {/* GRID */}

        {[0,1,2,3,4].map((i) => {
          const y = padding + (i / 4) * (height - padding * 2);

          return (
            <line
              key={i}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke={theme.palette.secondary[200]}
              strokeOpacity={0.25}
            />
          );
        })}

        {/* AREA */}

        <polygon
          points={areaPoints}
          fill={theme.palette.primary.main}
          opacity="0.15"
        />

        {/* LINE */}

        <polyline
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth="3"
          points={points}
        />

        {/* DATA POINTS */}

        {data.map((d, i) => {
          const cx = scaleX(i);
          const cy = scaleY(d.value);

          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="6"
                fill={theme.palette.primary.main}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() =>
                  setHover({ x: cx, y: cy, value: d.value })
                }
                onMouseLeave={() => setHover(null)}
              />

              {/* X LABELS (MONTHS) */}

              <text
                x={cx}
                y={height - padding + 25}
                textAnchor="middle"
                fontSize="13"
                fill="#ffffff"
                style={{ opacity: 0.85 }}
              >
                {d.month}
              </text>
            </g>
          );
        })}

        {/* Y LABELS */}

        {[0,1,2,3,4].map((i) => {
          const value = Math.round(min + (i / 4) * (max - min));
          const y = height - padding - (i / 4) * (height - padding * 2);

          return (
            <text
              key={i}
              x={15}
              y={y}
              fontSize="12"
              fill="#ffffff"
              style={{ opacity: 0.7 }}
            >
              {value}
            </text>
          );
        })}

        {/* TOOLTIP */}

        {hover && (
          <g>
            <rect
              x={hover.x - 22}
              y={hover.y - 38}
              width="45"
              height="22"
              fill={theme.palette.primary.main}
              rx="4"
            />

            <text
              x={hover.x}
              y={hover.y - 23}
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