import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Divider,
  Stack,
  Paper,
  Grid,
  Chip
} from "@mui/material";
import {
  HealthAndSafety,
  TipsAndUpdates,
  BusinessCenter,
  Person,
  Science,
  WarningAmber,
  CheckCircleOutline
} from "@mui/icons-material";

import Header from "components/Header";
import { useGetRandomWhoStandardsQuery } from "state/api";
import SimpleLineChart from "components/SimpleLineChart";

/* ---------------- DATA FALLBACKS ---------------- */

const whoStandards = [
  { _id: "1", title: "PM2.5 (Fine Particles)", type: "Air Quality", limit: "5 µg/m³", current: "42 µg/m³", content: "Fine particulate matter that penetrates deep into lungs and bloodstream causing severe health issues." },
  { _id: "2", title: "PM10 (Coarse Particles)", type: "Air Quality", limit: "15 µg/m³", current: "72 µg/m³", content: "Particles from dust, construction, and road traffic that irritate respiratory pathways." },
  { _id: "3", title: "NO₂ (Nitrogen Dioxide)", type: "Traffic Pollution", limit: "10 µg/m³", current: "36 µg/m³", content: "Emitted mainly from vehicles and power plants causing airway inflammation." },
  { _id: "4", title: "O₃ (Ground-level Ozone)", type: "Photochemical Pollution", limit: "100 µg/m³", current: "120 µg/m³", content: "Formed by chemical reactions between pollutants and sunlight damaging lung tissue." },
];

const userImpactData = [
  { pollutant: "PM2.5", contribution: 18, risk: "High", source: "Vehicle emissions & fossil fuel electricity" },
  { pollutant: "PM10", contribution: 12, risk: "Moderate", source: "Urban dust and construction activity" },
  { pollutant: "NO2", contribution: 9, risk: "Moderate", source: "Traffic and industrial emissions" },
  { pollutant: "O3", contribution: 6, risk: "Low", source: "Secondary atmospheric reactions" },
];

/* ---------------- PREMIUM CARD COMPONENTS ---------------- */

const StdCard = ({ title, content, type, limit, current }) => {
  const theme = useTheme();
  const curVal = parseFloat(current);
  const limVal = parseFloat(limit);
  const ratio = Math.min((curVal / limVal) * 100, 100);
  const isOverLimit = curVal > limVal;

  return (
    <Card sx={{ 
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.75rem",
      border: isOverLimit ? `1px solid ${theme.palette.secondary[500]}` : "none",
      transition: "transform 0.2s ease-in-out",
      "&:hover": { transform: "translateY(-5px)" }
    }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="h6" color={theme.palette.secondary[300]} fontWeight="bold">{type}</Typography>
          <Chip 
            icon={isOverLimit ? <WarningAmber /> : <CheckCircleOutline />}
            label={isOverLimit ? "DANGER" : "SAFE"} 
            size="small" 
            color={isOverLimit ? "error" : "success"}
          />
        </Stack>
        <Typography variant="h4" fontWeight="700">{title}</Typography>
        <Typography variant="body2" sx={{ color: theme.palette.primary[100], mt: 1, height: "40px" }}>
          {content}
        </Typography>
        <Box mt={3}>
          <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption">Current: {current}</Typography>
            <Typography variant="caption" fontWeight="bold">WHO Limit: {limit}</Typography>
          </Stack>
          <LinearProgress 
            variant="determinate" 
            value={ratio} 
            sx={{ 
              height: 6, borderRadius: 5,
              backgroundColor: theme.palette.primary[700],
              "& .MuiLinearProgress-bar": { backgroundColor: isOverLimit ? theme.palette.secondary[400] : theme.palette.primary[300] }
            }} 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const UserContributionCard = ({ pollutant, contribution, risk, source }) => {
  const theme = useTheme();
  
  // Dynamic color mapping for risks
  const riskColor = 
    risk === "High" ? theme.palette.error.main : 
    risk === "Moderate" ? "#FFD700" : // Yellow
    theme.palette.success.main; // Green

  return (
    <Card sx={{ backgroundColor: theme.palette.background.alt, borderRadius: "0.75rem" }}>
      <CardContent>
        <Typography variant="h4" color={theme.palette.secondary[200]} fontWeight="bold">{pollutant}</Typography>
        <Divider sx={{ my: 1.5, opacity: 0.2 }} />
        <Typography variant="body2"><b>Personal Contribution:</b> {contribution}%</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}><b>Primary Source:</b> {source}</Typography>
        <Box mt={2} p={1} sx={{ backgroundColor: theme.palette.primary[700], borderRadius: "4px", textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: riskColor, fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px" }}>
            Risk Level: {risk}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ---------------- HEALTH IMPACT ANALYSIS ---------------- */

const HealthImpact = () => {
  const theme = useTheme();
  return (
    <Paper sx={{ mt: 4, p: 4, backgroundColor: theme.palette.background.alt, borderRadius: "1rem" }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <HealthAndSafety sx={{ color: theme.palette.secondary[400], fontSize: 40 }} />
        <Box>
          <Typography variant="h3" fontWeight="700">Health Impact Analysis</Typography>
          <Typography variant="h6" color={theme.palette.secondary[200]}>Epidemiological Risks & Clinical Observations</Typography>
        </Box>
      </Stack>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color={theme.palette.secondary[400]} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person fontSize="small" /> Individual Health Risks
          </Typography>
          <Divider sx={{ mb: 2, borderColor: theme.palette.primary[600] }} />
          <Typography variant="body1" sx={{ lineHeight: 1.8, opacity: 0.9 }}>
            • Chronic respiratory diseases including asthma and bronchitis.<br/>
            • Cardiovascular diseases such as heart attacks and hypertension.<br/>
            • Reduced lung capacity and long-term breathing disorders.<br/>
            • Increased risk of stroke and lung cancer.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color={theme.palette.secondary[400]} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessCenter fontSize="small" /> Industrial & Occupational Risks
          </Typography>
          <Divider sx={{ mb: 2, borderColor: theme.palette.primary[600] }} />
          <Typography variant="body1" sx={{ lineHeight: 1.8, opacity: 0.9 }}>
            • Workers exposed to particulate pollution face higher respiratory illness rates.<br/>
            • Long-term industrial emissions increase health risks for surrounding communities.<br/>
            • Increased healthcare costs and reduced workforce productivity.<br/>
            • WHO reports nearly <b>7 million premature deaths</b> globally every year.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

/* ---------------- STRATEGIC MITIGATION FRAMEWORK ---------------- */

const MitigationStrategiesBox = () => {
  const theme = useTheme();
  return (
    <Box mt={6}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TipsAndUpdates sx={{ color: theme.palette.secondary[400], fontSize: 35 }} />
        <Typography variant="h3" fontWeight="700">Strategic Mitigation Framework</Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: theme.palette.primary[700], borderRadius: "1rem", height: '100%' }}>
            <CardContent>
              <Typography variant="h4" color={theme.palette.secondary[300]} mb={3} fontWeight="600">For Individuals</Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography color={theme.palette.secondary[500]} fontWeight="bold">01</Typography>
                  <Typography variant="body1">Reduce use of <b>private vehicles</b> and switch to <b>public transport</b>.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography color={theme.palette.secondary[500]} fontWeight="bold">02</Typography>
                  <Typography variant="body1">Reduce <b>electricity consumption</b> and shift to <b>renewable energy</b>.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography color={theme.palette.secondary[500]} fontWeight="bold">03</Typography>
                  <Typography variant="body1">Avoid <b>burning waste</b> and adopt <b>recycling practices</b>.</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: theme.palette.primary[700], borderRadius: "1rem", height: '100%' }}>
            <CardContent>
              <Typography variant="h4" color={theme.palette.secondary[300]} mb={3} fontWeight="600">For Industries</Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography color={theme.palette.secondary[500]} fontWeight="bold">01</Typography>
                  <Typography variant="body1">Install <b>emission control systems</b> like scrubbers and filters.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography color={theme.palette.secondary[500]} fontWeight="bold">02</Typography>
                  <Typography variant="body1">Transition toward <b>cleaner fuels</b> and <b>renewable energy</b>.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography color={theme.palette.secondary[500]} fontWeight="bold">03</Typography>
                  <Typography variant="body1">Implement <b>continuous pollution monitoring systems</b>.</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const WHOstandards = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { data: apiData, isLoading } = useGetRandomWhoStandardsQuery();
  const data = apiData?.data || whoStandards;

  return (
    <Box m="1.5rem 2.5rem" pb="4rem">
      <Header
        title="WHO AIR QUALITY STANDARDS"
        subtitle="WHO Air Quality Guidelines and Pollution Impact Analysis"
      />

      {isLoading ? (
        <Box sx={{ width: "100%", mt: 5 }}><LinearProgress color="secondary" /></Box>
      ) : (
        <>
          <Box
            mt="25px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            rowGap="20px"
            columnGap="1.33%"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
          >
            {data?.map((item) => (
              <StdCard key={item._id} {...item} />
            ))}
          </Box>

          <HealthImpact />

          <Box mt={6}>
            <Typography variant="h3" mb={3} fontWeight="bold">Your Contribution to WHO Indicators</Typography>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              gap="20px"
              sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
              {userImpactData.map((item, i) => (
                <UserContributionCard key={i} {...item} />
              ))}
            </Box>
            <Box mt={6} p={3} sx={{ backgroundColor: theme.palette.background.alt, borderRadius: "1rem" }}>
              <SimpleLineChart data={[
                { month: "Nov", value: 50 }, { month: "Dec", value: 48 }, 
                { month: "Jan", value: 52 }, { month: "Feb", value: 46 }, { month: "Mar", value: 56 }
              ]} title="Pollution Trend" />
            </Box>
          </Box>

          <MitigationStrategiesBox />

          <Box mt={6} p={3} sx={{ backgroundColor: theme.palette.background.alt, borderRadius: "1rem" }}>
            <SimpleLineChart data={[
                { month: "June", value: 42 }, { month: "Jul", value: 41 }, 
                { month: "Aug", value: 39 }, { month: "Sep", value: 39 }, { month: "Oct", value: 40 }
            ]} title="Pollution Reduction Progress" />
          </Box>

          <Box mt={8} textAlign="center" sx={{ opacity: 0.5 }}>
            <Science sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body2">Powered by CarbonLens Intelligence Network © 2026</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default WHOstandards;