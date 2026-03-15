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

/* ---------------- WHO STANDARD DATA ---------------- */

const whoStandards = [
  {
    _id: "1",
    title: "PM2.5 (Fine Particles)",
    type: "Air Quality",
    limit: "5 µg/m³",
    current: "42 µg/m³",
    content:
      "PM2.5 particles penetrate deep into lungs and bloodstream causing respiratory and cardiovascular diseases.",
  },
  {
    _id: "2",
    title: "PM10 (Coarse Particles)",
    type: "Air Quality",
    limit: "15 µg/m³",
    current: "72 µg/m³",
    content:
      "PM10 pollution originates from dust, construction activities, and industrial emissions.",
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

/* ---------------- USER CONTRIBUTION DATA ---------------- */

const userImpactData = [
  {
    pollutant: "PM2.5",
    contribution: 18,
    risk: "High",
    source: "Vehicle usage & fossil fuel electricity",
  },
  {
    pollutant: "PM10",
    contribution: 12,
    risk: "Moderate",
    source: "Urban dust & construction pollution",
  },
  {
    pollutant: "NO2",
    contribution: 9,
    risk: "Moderate",
    source: "Traffic emissions",
  },
  {
    pollutant: "O3",
    contribution: 6,
    risk: "Low",
    source: "Secondary atmospheric reactions",
  },
];

/* ---------------- TREND DATA ---------------- */

const pollutionTrend = [
  { month: "Jan", value: 22 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 19 },
  { month: "Apr", value: 18 },
  { month: "May", value: 17 },
];

/* ---------------- WHO CARD ---------------- */

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

        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]}>
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

/* ---------------- USER CONTRIBUTION CARD ---------------- */

const UserContributionCard = ({ pollutant, contribution, risk, source }) => {
  const theme = useTheme();

  const riskColor =
    risk === "High" ? "red" : risk === "Moderate" ? "orange" : "green";

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>

        <Typography variant="h4">{pollutant}</Typography>

        <Typography mt={1}>
          <b>User Contribution:</b> {contribution}%
        </Typography>

        <Typography mt={1}>
          <b>Main Source:</b> {source}
        </Typography>

        <Typography mt={1} color={riskColor} fontWeight="bold">
          Risk Level: {risk}
        </Typography>

      </CardContent>
    </Card>
  );
};

/* ---------------- HEALTH IMPACT SECTION ---------------- */

const HealthImpact = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>

        <Typography variant="h4">Health Risks of Air Pollution</Typography>

        <Typography mt={2}>
          Exposure to air pollution above WHO guidelines can cause serious
          health effects including:
        </Typography>

        <Typography mt={1}>
          • Respiratory diseases such as asthma and bronchitis
        </Typography>

        <Typography>
          • Cardiovascular diseases including heart attacks
        </Typography>

        <Typography>
          • Increased lung cancer risk
        </Typography>

        <Typography>
          • Reduced life expectancy
        </Typography>

        <Typography mt={2}>
          According to the WHO, air pollution contributes to nearly
          <b> 7 million premature deaths globally every year.</b>
        </Typography>

      </CardContent>
    </Card>
  );
};

/* ---------------- USER IMPACT SECTION ---------------- */

const UserImpactSection = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box mt={6}>

      <Typography variant="h3" mb={3}>
        Your Contribution to WHO Pollution Indicators
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0,1fr))"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {userImpactData.map((item, i) => (
          <UserContributionCard key={i} {...item} />
        ))}
      </Box>

      <Box mt={5}>
        <SimpleLineChart data={pollutionTrend} />
      </Box>

      <Card sx={{ mt: 4 }}>
        <CardContent>

          <Typography variant="h4">
            Why Reducing These Pollutants Matters
          </Typography>

          <Typography mt={2}>
            Activities that produce carbon emissions also release harmful
            pollutants such as PM2.5 and NO₂. Reducing fossil fuel consumption,
            vehicle usage, and inefficient industrial processes lowers both
            greenhouse gases and toxic air pollutants.
          </Typography>

          <Typography mt={2}>
            Meeting WHO air quality standards significantly reduces respiratory
            illnesses, cardiovascular diseases, and premature mortality.
          </Typography>

          <Typography mt={2}>
            Cleaner air leads to healthier communities, improved productivity,
            and a more sustainable environment.
          </Typography>

        </CardContent>
      </Card>

    </Box>
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
          subtitle="WHO Air Quality Guidelines Compared with Pollution Impact"
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

          <HealthImpact />

          <UserImpactSection />
        </>
      )}
    </Box>
  );
};

export default WHOstandards;