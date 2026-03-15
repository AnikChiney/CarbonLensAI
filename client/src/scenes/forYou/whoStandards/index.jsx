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

import { LineChart } from "@mui/x-charts/LineChart";

/* ---------------- WHO DATA ---------------- */

const whoStandards = [
  {
    _id: "1",
    title: "PM2.5 (Fine Particles)",
    type: "Air Quality",
    limit: "5 µg/m³",
    current: 42,
    content:
      "PM2.5 particles penetrate deep into lungs and bloodstream and are a major cause of respiratory disease.",
  },
  {
    _id: "2",
    title: "PM10 (Coarse Particles)",
    type: "Air Quality",
    limit: "15 µg/m³",
    current: 72,
    content:
      "PM10 pollution originates from construction dust, road traffic, and industrial emissions.",
  },
  {
    _id: "3",
    title: "NO₂ (Nitrogen Dioxide)",
    type: "Traffic Pollution",
    limit: "10 µg/m³",
    current: 36,
    content:
      "NO₂ emissions mainly come from vehicle exhaust and contribute to asthma and lung inflammation.",
  },
  {
    _id: "4",
    title: "O₃ (Ozone)",
    type: "Photochemical Pollution",
    limit: "100 µg/m³",
    current: 120,
    content:
      "Ground-level ozone forms when pollutants react in sunlight and can damage lungs.",
  },
];

/* ---------------- CHART DATA ---------------- */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const pm25Values = [45, 38, 50, 41, 44, 39];

/* ---------------- CARD ---------------- */

const StdCard = ({ title, content, type, limit, current }) => {
  const theme = useTheme();

  const isSafe = current <= parseInt(limit);

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
        >
          {type}
        </Typography>

        <Typography variant="h3">{title}</Typography>

        <Box height={10} />

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

          <Typography
            color={isSafe ? "green" : "red"}
            fontWeight="bold"
          >
            {isSafe ? "Within WHO Standard" : "Above WHO Limit"}
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

/* ---------------- POLLUTION CHART ---------------- */

const PollutionChart = () => {

  return (
    <Box mt={5}>

      <Typography variant="h4" mb={2}>
        PM2.5 Pollution Trend
      </Typography>

      <LineChart
        xAxis={[{ scaleType: "point", data: months }]}
        series={[
          {
            data: pm25Values,
            label: "PM2.5 µg/m³",
          },
        ]}
        width={800}
        height={300}
      />

    </Box>
  );
};

/* ---------------- HEALTH IMPACT ---------------- */

const HealthImpact = () => (
  <Card sx={{ mt: 4 }}>
    <CardContent>

      <Typography variant="h4">
        Health Risks of Air Pollution
      </Typography>

      <Typography mt={2}>
        Exposure to air pollution levels above WHO standards can cause:
      </Typography>

      <Typography mt={1}>
        • Respiratory diseases such as asthma and bronchitis
      </Typography>

      <Typography>
        • Cardiovascular diseases and heart attacks
      </Typography>

      <Typography>
        • Increased lung cancer risk
      </Typography>

      <Typography>
        • Reduced life expectancy
      </Typography>

      <Typography mt={2}>
        According to WHO, air pollution contributes to
        <b> nearly 7 million premature deaths every year worldwide.</b>
      </Typography>

    </CardContent>
  </Card>
);

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
          <p style={{ color: `${theme.palette.secondary[500]}` }}>
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

          <PollutionChart />

          <HealthImpact />
        </>
      )}

    </Box>
  );
};

export default WHOstandards;