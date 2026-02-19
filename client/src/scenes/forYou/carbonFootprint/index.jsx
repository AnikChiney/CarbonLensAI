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

  // ✅ Safe fallback
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

  const safeData = data || fallbackData;

  const cardStyle = {
    backgroundColor: theme.palette.background.alt,
    borderRadius: "1rem",
    padding: "1.6rem",
    boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* HEADER */}
      <FlexBetween mb="0.5rem">
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
        gridAutoRows="220px"   // ✅ prevents overlap
        gap="26px"
      >
        {/* IMAGE */}
        <Box gridColumn="span 4" gridRow="span 2" sx={cardStyle}>
          <Box
            component="img"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="status"
            src={safeData.isGood ? "/well-done.png" : "/sad.svg"}
          />
        </Box>

        {/* SUMMARY */}
        <Box gridColumn="span 8" gridRow="span 2" sx={cardStyle}>
          <Typography variant="h5" fontWeight="bold">
            Your current CO₂ emissions are
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: 92,
              fontWeight: "bold",
              lineHeight: 1.05,
              color: safeData.isGood ? "#00C853" : "#D50000",
            }}
          >
            {parseInt(safeData.percentageIncDec || 0)}%
            <span style={{ fontSize: 38 }}>
              {safeData.isGood ? " LESS" : " MORE"}
            </span>
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.7 }}>
            than the standard values for a person.
          </Typography>

          {!data && (
            <Typography color="orange" fontSize="0.9rem">
              Showing demo data
            </Typography>
          )}
        </Box>

        {/* CURRENT MONTH */}
        <Box gridColumn="span 12" gridRow="span 2">
          <OverviewBox
            title="Current Month (KGs CO2 Emitted)"
            value={parseInt(safeData.totalCarbonByPerson || 0)}
            transport={parseInt(safeData.carbonData.categories.transport || 0)}
            electricity={parseInt(safeData.carbonData.categories.electricity || 0)}
            others={parseInt(safeData.carbonData.categories.others || 0)}
            icon={
              <Co2 sx={{ color: theme.palette.secondary[300], fontSize: 26 }} />
            }
          />
        </Box>

        {/* TREND CHART */}
        <Box gridColumn="span 12" gridRow="span 2" sx={cardStyle}>
          <Typography variant="h5" fontWeight="bold" mb="1rem">
            12-Month Emission Trend
          </Typography>

          <Box sx={{ height: "300px" }}>
            <OverviewChart isDashboard={true} />
          </Box>
        </Box>

        {/* BREAKDOWN */}
        <Box gridColumn="span 12" gridRow="span 2" sx={cardStyle}>
          <Typography variant="h5" fontWeight="bold" mb="1rem">
            Emissions by Category
          </Typography>

          <Box sx={{ height: "300px" }}>
            <BreakdownChart
              categories={safeData.carbonData.categories}
              isDashboard={true}
            />
          </Box>
        </Box>

        {/* AWARENESS */}
        <Box gridColumn="span 12" gridRow="span 1" sx={{
          borderRadius: "1.2rem",
          padding: "2rem",
          background:
            "linear-gradient(135deg, rgba(0,255,170,0.08), rgba(0,198,255,0.08))",
          boxShadow: "0 6px 28px rgba(0,0,0,0.25)",
        }}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            Why Reducing Carbon Emissions Matters 🌍
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.75 }} mb="1.4rem">
            Carbon emissions accelerate climate change, disrupting ecosystems,
            economies, and human well-being.
          </Typography>

          <Box display="grid"
            gridTemplateColumns={isNonMediumScreens ? "repeat(2,1fr)" : "1fr"}
            gap="30px"
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Adverse Impacts on Society
              </Typography>

              <Typography sx={{ opacity: 0.75, lineHeight: 1.8 }}>
                • Extreme weather events<br />
                • Rising sea levels<br />
                • Health risks<br />
                • Resource insecurity<br />
                • Economic losses
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" fontWeight="bold">
                How You Can Reduce Emissions
              </Typography>

              <Typography sx={{ opacity: 0.75, lineHeight: 1.8 }}>
                • Use EVs / public transport<br />
                • Reduce electricity usage<br />
                • Adopt renewable energy<br />
                • Reduce waste<br />
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
