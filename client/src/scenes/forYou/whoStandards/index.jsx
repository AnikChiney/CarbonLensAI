import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";
import { Refresh } from "@mui/icons-material";

import Header from "components/Header";
import { useGetRandomWhoStandardsQuery } from "state/api";
import FlexBetween from "components/FlexBetween";

import SimpleLineChart from "components/SimpleLineChart";

/* ---------------- WHO DATA ---------------- */

const whoStandards = [
  {
    _id: "1",
    title: "PM2.5 (Fine Particles)",
    type: "Air Quality",
    limit: "5 µg/m³",
    current: "42 µg/m³",
    content:
      "PM2.5 particles penetrate deep into lungs and bloodstream and cause respiratory and cardiovascular diseases.",
  },
  {
    _id: "2",
    title: "PM10 (Coarse Particles)",
    type: "Air Quality",
    limit: "15 µg/m³",
    current: "72 µg/m³",
    content:
      "PM10 particles originate from dust, construction activities, and industrial emissions.",
  },
  {
    _id: "3",
    title: "NO₂ (Nitrogen Dioxide)",
    type: "Traffic Pollution",
    limit: "10 µg/m³",
    current: "36 µg/m³",
    content:
      "NO₂ emissions mainly come from vehicles and contribute to respiratory diseases.",
  },
  {
    _id: "4",
    title: "O₃ (Ozone)",
    type: "Photochemical Pollution",
    limit: "100 µg/m³",
    current: "120 µg/m³",
    content:
      "Ground-level ozone forms when pollutants react in sunlight and can damage lungs.",
  },
];

/* ---------------- CHART DATA ---------------- */

const chartData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 38 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 41 },
  { month: "May", value: 44 },
];

/* ---------------- CARD ---------------- */

const StdCard = ({ title, content, type, limit, current }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {type}
        </Typography>

        <Typography variant="h3">{title}</Typography>

        <Box height={10}></Box>

        <Typography variant="h5" sx={{ color: theme.palette.primary[100] }}>
          {content}
        </Typography>

        <Box mt={2}>
          <Typography>
            <b>WHO Limit:</b> {limit}
          </Typography>

          <Typography>
            <b>Current Level:</b> {current}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ---------------- HEALTH IMPACT ---------------- */

const HealthImpact = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h4">Health Risks of Air Pollution</Typography>

        <Typography mt={2}>
          Exposure to air pollution above WHO limits can lead to serious
          health effects including:
        </Typography>

        <Typography mt={1}>
          • Respiratory diseases such as asthma and bronchitis
        </Typography>

        <Typography>
          • Cardiovascular diseases including heart attacks
        </Typography>

        <Typography>
          • Increased risk of lung cancer
        </Typography>

        <Typography>
          • Reduced life expectancy
        </Typography>

        <Typography mt={2}>
          According to the WHO, air pollution contributes to nearly
          <b> 7 million premature deaths every year worldwide.</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const WHOstandards = () => {
  const theme = useTheme();
  const { data: apiData, isLoading, refetch } =
    useGetRandomWhoStandardsQuery();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const data = apiData?.data || whoStandards;

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch]);

  const handleClick = () => {
    setRefresh(true);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="WHO Standards (Hit Refresh!)"
          subtitle="WHO Air Quality Guidelines Compared with Current Pollution Levels"
        />

        <Button variant="contained" onClick={handleClick}>
          <FlexBetween>
            <Refresh fontSize="large" />
            <Box width={6}></Box>
            <Typography>Refresh</Typography>
          </FlexBetween>
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ width: "60%", margin: "2rem 0 2rem 0.2rem" }}>
          <p
            style={{
              color: `${theme.palette.secondary[500]}`,
            }}
          >
            LOADING...
          </p>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {data?.map(({ title, content, type, limit, current, _id }) => (
              <StdCard
                key={_id}
                title={title}
                content={content}
                type={type}
                limit={limit}
                current={current}
              />
            ))}
          </Box>

          {/* Pollution Trend Chart */}
          <Box mt={5}>
            <SimpleLineChart data={chartData} />
          </Box>

          {/* Health Impact Section */}
          <HealthImpact />
        </>
      )}
    </Box>
  );
};

export default WHOstandards;