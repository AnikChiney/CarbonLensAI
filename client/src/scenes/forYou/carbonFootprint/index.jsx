import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Co2 } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetCarbonStatsQuery } from "state/api";
import OverviewBox from "components/OverviewBox";

const CarbonFootprint = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data, isLoading } = useGetCarbonStatsQuery({
    year: currentYear,
    month: currentMonth,
  });

  // ✅ FALLBACK DATA
  const fallbackData = {
    isGood: true,
    percentageIncDec: 10,
    totalCarbonByPerson: 250,
    carbonData: {
      categories: {
        transport: 120,
        electricity: 90,
        others: 40,
      },
    },
  };

  // ✅ SAFE DATA (always available)
  const safeData = data || fallbackData;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Carbon Footprint"
          subtitle="How Much Carbon Are You Really Emitting? Uncover Your Impact Now!"
        />

      {/* ✅ Loading indicator */}
      {isLoading && (
        <Typography mt="1rem">Loading Carbon Insights...</Typography>
      )}

      {/* ✅ Always render grid */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="30px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        {/* IMAGE */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="transparent"
          p="1rem"
          borderRadius="0.55rem"
          display="flex"
          justifyContent="space-between"
        >
          <Box
            component="img"
            sx={{ height: 330, width: 330 }}
            alt={safeData.isGood ? "Well Done" : "Try Harder"}
            src={safeData.isGood ? "/well-done.png" : "/sad.svg"}
          />
        </Box>

        {/* SUMMARY TEXT */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="transparent"
          p="1rem"
          borderRadius="0.55rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Your current CO₂ emissions are
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: 90,
              fontWeight: "bold",
              color: safeData.isGood ? "green" : "red",
            }}
          >
            {parseInt(safeData.percentageIncDec)}%
            {safeData.isGood ? " LESS" : " MORE"}
          </Typography>

          <Typography variant="h6">
            than the standard values for a person.
          </Typography>

          {/* ✅ Demo data indicator */}
          {!data && (
            <Typography color="orange" fontSize="0.9rem">
              Showing demo data (API unavailable)
            </Typography>
          )}
        </Box>

        {/* OVERVIEW BOX */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <OverviewBox
            title="Current Month (KGs CO2 Emitted)"
            value={parseInt(safeData.totalCarbonByPerson)}
            transport={parseInt(safeData.carbonData.categories.transport)}
            electricity={parseInt(safeData.carbonData.categories.electricity)}
            others={parseInt(safeData.carbonData.categories.others)}
            icon={
              <Co2 sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
            }
          />
        </Box>

        {/* TREND CHART */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" mb="0.5rem">
            12-Month Emission Trend
          </Typography>
          <OverviewChart isDashboard={true} />
        </Box>

        {/* BREAKDOWN CHART */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" mb="0.5rem">
            Emissions by Category
          </Typography>

          <BreakdownChart
            categories={safeData.carbonData.categories}
            isDashboard={true}
          />

          <Typography fontSize="0.85rem" sx={{ opacity: 0.7 }}>
            Breakdown of carbon footprint by category.
          </Typography>
        </Box>

        {/* AWARENESS PANEL */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h5" fontWeight="bold" mb="0.8rem">
            Why Reducing Carbon Emissions Matters 🌍
          </Typography>

          <Typography sx={{ opacity: 0.85 }} mb="1rem">
            Carbon emissions are a leading cause of climate change, affecting
            ecosystems, economies, and human health globally.
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={
              isNonMediumScreens ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
            }
            gap="20px"
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Adverse Impacts on Society
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.75 }}>
                • Increased global warming & extreme weather events<br />
                • Rising sea levels affecting coastal regions<br />
                • Health risks from air pollution<br />
                • Food & water insecurity<br />
                • Economic losses from climate disasters
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight="bold">
                How You Can Reduce Emissions
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.75 }}>
                • Use public transport / EVs<br />
                • Reduce electricity usage<br />
                • Adopt renewable energy<br />
                • Reduce waste & recycle<br />
                • Practice sustainable living
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarbonFootprint;
