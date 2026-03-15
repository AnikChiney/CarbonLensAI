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
      "Fine particulate matter that penetrates deep into lungs and bloodstream causing severe health issues.",
  },
  {
    _id: "2",
    title: "PM10 (Coarse Particles)",
    type: "Air Quality",
    limit: "15 µg/m³",
    current: "72 µg/m³",
    content:
      "Particles from dust, construction, and road traffic that irritate respiratory pathways.",
  },
  {
    _id: "3",
    title: "NO₂ (Nitrogen Dioxide)",
    type: "Traffic Pollution",
    limit: "10 µg/m³",
    current: "36 µg/m³",
    content:
      "Emitted mainly from vehicles and power plants causing airway inflammation.",
  },
  {
    _id: "4",
    title: "O₃ (Ground-level Ozone)",
    type: "Photochemical Pollution",
    limit: "100 µg/m³",
    current: "120 µg/m³",
    content:
      "Formed by chemical reactions between pollutants and sunlight damaging lung tissue.",
  },
];

/* ---------------- USER CONTRIBUTION DATA ---------------- */

const userImpactData = [
  {
    pollutant: "PM2.5",
    contribution: 18,
    risk: "High",
    source: "Vehicle emissions & fossil fuel electricity",
  },
  {
    pollutant: "PM10",
    contribution: 12,
    risk: "Moderate",
    source: "Urban dust and construction activity",
  },
  {
    pollutant: "NO2",
    contribution: 9,
    risk: "Moderate",
    source: "Traffic and industrial emissions",
  },
  {
    pollutant: "O3",
    contribution: 6,
    risk: "Low",
    source: "Secondary atmospheric reactions",
  },
];

/* ---------------- POLLUTION TREND ---------------- */

const pollutionTrend = [
  { month: "Nov", value: 50 },
  { month: "Dec", value: 48 },
  { month: "Jan", value: 52 },
  { month: "Feb", value: 46 },
  { month: "Mar", value: 62 },
];

/* ---------------- MITIGATION TREND ---------------- */

const mitigationTrend = [
  { month: "June", value: 41 },
  { month: "Jul", value: 40 },
  { month: "Aug", value: 39 },
  { month: "Sep", value: 39 },
  { month: "Oct", value: 37.5 },
];

/* ---------------- WHO STANDARD CARD ---------------- */

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

        <Typography variant="h5" sx={{ color: theme.palette.primary[100] }}>
          {content}
        </Typography>

        <Box mt={2}>
          <Typography><b>WHO Limit:</b> {limit}</Typography>
          <Typography><b>Current Level:</b> {current}</Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

/* ---------------- USER CONTRIBUTION CARD ---------------- */

const UserContributionCard = ({ pollutant, contribution, risk, source }) => {

  const riskColor =
    risk === "High" ? "red" :
    risk === "Moderate" ? "orange" :
    "green";

  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: theme.palette.background.alt }}>
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

/* ---------------- HEALTH IMPACT ---------------- */

const HealthImpact = () => (
  <Card sx={{ mt: 4 }}>
    <CardContent>

      <Typography variant="h4">Health Risks of Air Pollution</Typography>

      <Typography mt={2}><b>Individual Health Risks:</b></Typography>

      <Typography mt={1}>
        • Chronic respiratory diseases including asthma and bronchitis.
      </Typography>

      <Typography>
        • Cardiovascular diseases such as heart attacks and hypertension.
      </Typography>

      <Typography>
        • Reduced lung capacity and long-term breathing disorders.
      </Typography>

      <Typography>
        • Increased risk of stroke and lung cancer.
      </Typography>

      <Typography mt={2}><b>Industrial & Occupational Risks:</b></Typography>

      <Typography mt={1}>
        • Workers exposed to particulate pollution face higher respiratory illness rates.
      </Typography>

      <Typography>
        • Long-term industrial emissions increase health risks for surrounding communities.
      </Typography>

      <Typography>
        • Increased healthcare costs and reduced workforce productivity.
      </Typography>

      <Typography mt={2}>
        According to WHO, air pollution causes nearly
        <b> 7 million premature deaths globally every year.</b>
      </Typography>

    </CardContent>
  </Card>
);

/* ---------------- USER IMPACT SECTION ---------------- */

const UserImpactSection = () => {

  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box mt={6}>

      <Typography variant="h3" mb={3}>
        Your Contribution to WHO Pollution Indicators
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {userImpactData.map((item, i) => (
          <UserContributionCard key={i} {...item} />
        ))}
      </Box>

      <Box mt={6}>
        <SimpleLineChart
          data={pollutionTrend}
          title="Pollution Trend"
        />
      </Box>

    </Box>
  );
};

/* ---------------- MITIGATION STRATEGIES ---------------- */

const MitigationStrategiesBox = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>

        <Typography variant="h4">
          Recommended Mitigation Strategies
        </Typography>

        <Typography mt={2}>
          Based on your contribution to pollutants such as PM2.5, PM10,
          NO₂, and O₃, the following mitigation strategies can reduce
          environmental impact.
        </Typography>

        <Typography mt={3}><b>For Individuals:</b></Typography>

        <Typography mt={1}>
          • Reduce use of private vehicles and switch to public transport.
        </Typography>

        <Typography>
          • Reduce electricity consumption and shift to renewable energy.
        </Typography>

        <Typography>
          • Avoid burning waste and adopt recycling practices.
        </Typography>

        <Typography mt={3}><b>For Industries:</b></Typography>

        <Typography mt={1}>
          • Install emission control systems like scrubbers and filters.
        </Typography>

        <Typography>
          • Transition toward cleaner fuels and renewable energy.
        </Typography>

        <Typography>
          • Implement continuous pollution monitoring systems.
        </Typography>

      </CardContent>
    </Card>
  );
};

/* ---------------- MITIGATION PROGRESS ---------------- */

function MitigationProgress() {
	return (
		<Box mt={6}>

			<SimpleLineChart
				data={mitigationTrend}
				title="Pollution Reduction After Mitigation"
			/>

		</Box>
	);
}

/* ---------------- MAIN PAGE ---------------- */

const WHOstandards = () => {

  const { data: apiData, isLoading } =
    useGetRandomWhoStandardsQuery();

  const isNonMobile = useMediaQuery("(min-width:1000px)");
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

            {data?.map(({title,content,type,limit,current,_id}) => (
              <StdCard key={_id} {...{title,content,type,limit,current}} />
            ))}

          </Box>

          <HealthImpact/>

          <UserImpactSection/>

          <MitigationStrategiesBox/>

          <MitigationProgress/>
        </>
      )}

    </Box>
  );
};

export default WHOstandards;