import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";

import Header from "components/Header";
import { useGetRandomWhoStandardsQuery } from "state/api";

import SimpleLineChart from "components/SimpleLineChart";

/* ---------------- WHO STANDARD DATA ---------------- */

const whoStandards = [
  {
    _id: "1",
    title: "PM2.5 (Fine Particles)",
    type: "Air Quality",
    limit: "5 µg/m³",
    current: "42 µg/m³",
    content:
      "Fine particulate matter that penetrates deep into lungs and bloodstream causing respiratory and cardiovascular diseases.",
  },
  {
    _id: "2",
    title: "PM10 (Coarse Particles)",
    type: "Air Quality",
    limit: "15 µg/m³",
    current: "72 µg/m³",
    content:
      "Particles originating from dust, construction, and traffic causing airway irritation.",
  },
  {
    _id: "3",
    title: "NO₂ (Nitrogen Dioxide)",
    type: "Traffic Pollution",
    limit: "10 µg/m³",
    current: "36 µg/m³",
    content:
      "Vehicle and industrial emissions contributing to urban smog and respiratory inflammation.",
  },
  {
    _id: "4",
    title: "O₃ (Ground-level Ozone)",
    type: "Photochemical Pollution",
    limit: "100 µg/m³",
    current: "120 µg/m³",
    content:
      "Formed by chemical reactions in sunlight and capable of damaging lung tissue.",
  },
];

/* ---------------- USER CONTRIBUTION ---------------- */

const userImpactData = [
  { pollutant: "PM2.5", contribution: 18, risk: "High" },
  { pollutant: "PM10", contribution: 12, risk: "Moderate" },
  { pollutant: "NO₂", contribution: 9, risk: "Moderate" },
  { pollutant: "O₃", contribution: 6, risk: "Low" },
];

/* ---------------- TREND DATA ---------------- */

const pollutionTrend = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 42 },
  { month: "May", value: 38 },
  { month: "Jun", value: 45 },
];

const mitigationTrend = [
  { month: "Jul", value: 42 },
  { month: "Aug", value: 41 },
  { month: "Sep", value: 41 },
  { month: "Oct", value: 40 },
  { month: "Nov", value: 39 },
  { month: "Dec", value: 38 },
];

/* ---------------- WHO CARD ---------------- */

const StdCard = ({ title, content, type, limit, current }) => {
  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: theme.palette.background.alt }}>
      <CardContent>

        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]}>
          {type}
        </Typography>

        <Typography variant="h3">{title}</Typography>

        <Box height={10} />

        <Typography variant="h5">{content}</Typography>

        <Box mt={2}>
          <Typography><b>WHO Limit:</b> {limit}</Typography>
          <Typography><b>Current Level:</b> {current}</Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

/* ---------------- USER CONTRIBUTION CARD ---------------- */

const UserContributionCard = ({ pollutant, contribution, risk }) => {

  const riskColor =
    risk === "High"
      ? "red"
      : risk === "Moderate"
      ? "orange"
      : "green";

  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: theme.palette.background.alt }}>
      <CardContent>

        <Typography variant="h4">{pollutant}</Typography>

        <Typography mt={1}>
          <b>User Contribution:</b> {contribution}%
        </Typography>

        <Typography mt={1} color={riskColor} fontWeight="bold">
          Risk Level: {risk}
        </Typography>

      </CardContent>
    </Card>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const WHOstandards = () => {

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const { data: apiData, isLoading } =
    useGetRandomWhoStandardsQuery();

  const data = apiData?.data || whoStandards;

  return (
    <Box m="1.5rem 2.5rem">

      <Header
        title="WHO Standards"
        subtitle="WHO Air Quality Guidelines and Pollution Impact Analysis"
      />

      {isLoading ? (
        <Box sx={{ width:"60%", margin:"2rem 0 2rem 0.2rem" }}>
          <LinearProgress/>
        </Box>
      ) : (
        <>
          {/* WHO STANDARD CARDS */}

          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

            {data.map((item) => (
              <StdCard key={item._id} {...item}/>
            ))}

          </Box>

          {/* HEALTH RISKS */}

          <Card sx={{ mt:4 }}>
            <CardContent>

              <Typography variant="h4">
                Health Risks of Air Pollution
              </Typography>

              <Typography mt={2}>
                Exposure to polluted air can cause respiratory diseases,
                cardiovascular disorders, stroke, and lung cancer.
              </Typography>

              <Typography mt={2}>
                Industrial workers exposed to particulate pollution
                face increased risks of chronic respiratory illnesses
                and reduced workplace productivity.
              </Typography>

            </CardContent>
          </Card>

          {/* USER CONTRIBUTION */}

          <Box mt={6}>

            <Typography variant="h3" mb={3}>
              Your Contribution to Pollution
            </Typography>

            <Box
              display="grid"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              gap="20px"
            >
              {userImpactData.map((item,i) => (
                <UserContributionCard key={i} {...item}/>
              ))}
            </Box>

          </Box>

          {/* BOTH TRENDS TOGETHER */}

          <SimpleLineChart
            data={pollutionTrend}
            title="Pollution Trend (Before Mitigation)"
          />

          <SimpleLineChart
            data={mitigationTrend}
            title="Pollution Reduction After Mitigation"
          />

        </>
      )}

    </Box>
  );
};

export default WHOstandards;