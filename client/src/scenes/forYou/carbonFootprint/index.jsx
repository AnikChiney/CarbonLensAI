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
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data, isLoading } = useGetCarbonStatsQuery({
    year: currentYear,
    month: currentMonth,
  });

  // ✅ FALLBACK DATA (prevents blank UI)
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

  // ✅ SAFE DATA
  const safeData = data || fallbackData;

  // ✅ SAFE NUMBERS (prevents NaN)
  const percentage = parseInt(safeData?.percentageIncDec || 0);
  const totalCarbon = parseInt(safeData?.totalCarbonByPerson || 0);
  const transport = parseInt(
    safeData?.carbonData?.categories?.transport || 0
  );
  const electricity = parseInt(
    safeData?.carbonData?.categories?.electricity || 0
  );
  const others = parseInt(
    safeData?.carbonData?.categories?.others || 0
  );

  return (
    <Box m="1.5rem 2.5rem">
      {/* HEADER */}
      <FlexBetween mb="0.3rem">
        <Header
          title="Carbon Footprint"
          subtitle="How Much Carbon Are You Really Emitting? Uncover Your Impact Now!"
        />
      </FlexBetween>

      {/* LOADING */}
      {isLoading && (
        <Typography mt="1rem">Loading Carbon Insights...</Typography>
      )}

      {/* GRID */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="170px"   // ✅ Stable row height
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
          p="1rem"
          borderRadius="0.55rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            sx={{
              height: 320,
              width: 320,
              objectFit: "contain",
            }}
            alt={safeData?.isGood ? "Well Done" : "Try Harder"}
            src={safeData?.isGood ? "/well-done.png" : "/sad.svg"}
          />
        </Box>

        {/* SUMMARY */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          p="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h4" fontWeight="bold">
            Your current CO₂ emissions are
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: 88,
              fontWeight: "bold",
              color: safeData?.isGood ? "#00C853" : "#D50000",
              lineHeight: 1.1,
            }}
          >
            {percentage}% {safeData?.isGood ? "LESS" : "MORE"}
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.75 }}>
            than the standard values for a person.
          </Typography>

          {!data && (
            <Typography color="orange" fontSize="0.9rem">
              Showing demo data (API unavailable)
            </Typography>
          )}
        </Box>

        {/* CURRENT MONTH */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <OverviewBox
            title="Current Month (KGs CO2 Emitted)"
            value={totalCarbon}
            transport={transport}
            electricity={electricity}
            others={others}
            icon={
              <Co2
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: 26,
                }}
              />
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
          <Typography variant="h6" mb="0.6rem" fontWeight="bold">
            12-Month Emission Trend
          </Typography>

          {/* ✅ Height constraint prevents overflow */}
          <Box sx={{ height: "230px" }}>
            <OverviewChart isDashboard={true} />
          </Box>
        </Box>

        {/* BREAKDOWN */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" mb="0.6rem" fontWeight="bold">
            Emissions by Category
          </Typography>

          <Box sx={{ height: "260px" }}>
            <BreakdownChart
              categories={safeData?.carbonData?.categories}
              isDashboard={true}
            />
          </Box>

          <Typography fontSize="0.85rem" sx={{ opacity: 0.65, mt: 1 }}>
            Breakdown of carbon footprint by category.
          </Typography>
        </Box>

        {/* AWARENESS */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h5" fontWeight="bold" mb="0.7rem">
            Why Reducing Carbon Emissions Matters 🌍
          </Typography>

          <Typography sx={{ opacity: 0.8 }} mb="1rem">
            Carbon emissions are a leading cause of climate change, affecting
            ecosystems, economies, and human health globally.
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={
              isNonMediumScreens ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
            }
            gap="22px"
          >
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Adverse Impacts on Society
              </Typography>

              <Typography sx={{ opacity: 0.7, lineHeight: 1.7 }}>
                • Extreme weather events<br />
                • Rising sea levels<br />
                • Health risks<br />
                • Resource insecurity<br />
                • Economic losses
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                How You Can Reduce Emissions
              </Typography>

              <Typography sx={{ opacity: 0.7, lineHeight: 1.7 }}>
                • Use public transport / EVs<br />
                • Reduce electricity usage<br />
                • Renewable energy<br />
                • Reduce waste & recycle<br />
                • Sustainable lifestyle
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarbonFootprint;
