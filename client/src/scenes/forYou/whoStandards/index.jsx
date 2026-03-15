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

/* WHO standards */

const whoStandards = [
  {
    _id: "1",
    title: "PM2.5",
    type: "Air Quality",
    limit: "5 µg/m³",
    current: "42 µg/m³",
    content:
      "Fine particulate matter penetrates lungs and bloodstream causing respiratory and cardiovascular diseases.",
  },
  {
    _id: "2",
    title: "PM10",
    type: "Air Quality",
    limit: "15 µg/m³",
    current: "72 µg/m³",
    content:
      "Coarse particles from construction, traffic, and dust causing airway irritation.",
  },
  {
    _id: "3",
    title: "NO₂",
    type: "Traffic Pollution",
    limit: "10 µg/m³",
    current: "36 µg/m³",
    content:
      "Vehicle emissions contributing to lung inflammation and urban smog.",
  },
  {
    _id: "4",
    title: "O₃",
    type: "Photochemical Pollution",
    limit: "100 µg/m³",
    current: "120 µg/m³",
    content:
      "Ground level ozone damages lung tissue and reduces crop productivity.",
  },
];

/* user contribution */

const userImpactData = [
  { pollutant: "PM2.5", contribution: 18, risk: "High" },
  { pollutant: "PM10", contribution: 12, risk: "Moderate" },
  { pollutant: "NO₂", contribution: 9, risk: "Moderate" },
  { pollutant: "O₃", contribution: 6, risk: "Low" },
];

/* pollution trend */

const pollutionTrend = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 42 },
  { month: "May", value: 38 },
  { month: "Jun", value: 45 },
];

/* mitigation trend */

const mitigationTrend = [
  { month: "Jul", value: 42 },
  { month: "Aug", value: 41 },
  { month: "Sep", value: 41 },
  { month: "Oct", value: 40 },
  { month: "Nov", value: 39 },
  { month: "Dec", value: 38 },
];

/* WHO standard card */

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

/* user contribution card */

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

/* main page */

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
        subtitle="Air Quality Limits vs Pollution Impact"
      />

      {isLoading ? (
        <Box sx={{ width:"60%", margin:"2rem 0" }}>
          <LinearProgress/>
        </Box>
      ) : (
        <>
          {/* WHO standards cards */}

          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            gap="20px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {data.map((item) => (
              <StdCard key={item._id} {...item}/>
            ))}
          </Box>

          {/* health explanation */}

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
                experience higher risks of chronic respiratory diseases
                and reduced workplace productivity.
              </Typography>

            </CardContent>
          </Card>

          {/* user contribution */}

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

          {/* pollution trend */}

          <SimpleLineChart
            data={pollutionTrend}
            title="Pollution Trend (Before Mitigation)"
          />

          {/* mitigation explanation */}

          <Card sx={{ mt:4 }}>
            <CardContent>

              <Typography variant="h4">
                Mitigation Strategies
              </Typography>

              <Typography mt={2}>
                Transitioning to renewable energy, improving energy efficiency,
                and reducing vehicle usage can significantly reduce pollution.
              </Typography>

            </CardContent>
          </Card>

          {/* mitigation progress */}

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