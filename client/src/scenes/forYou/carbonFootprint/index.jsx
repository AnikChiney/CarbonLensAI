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

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Carbon Footprint"
          subtitle="How Much Carbon Are You Really Emitting? Uncover Your Impact Now!"
        />
      </FlexBetween>

      {isLoading && (
        <Typography mt="1rem">Loading Carbon Insights...</Typography>
      )}

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
        <Box gridColumn="span 4" gridRow="span 2" p="1rem">
          <Box
            component="img"
            sx={{ height: 330, width: 330 }}
            alt="status"
            src={safeData.isGood ? "/well-done.png" : "/sad.svg"}
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
          <Typography variant="h5" fontWeight="bold">
            Your current CO₂ emissions are
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: 96,
              fontWeight: "bold",
              lineHeight: 1.1,
              color: safeData.isGood ? "#00C853" : "#D50000",
            }}
          >
            {parseInt(safeData.percentageIncDec || 0)}%
            <span style={{ fontSize: 40 }}>
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
        <Box gridColumn="span 12" gridRow="span 1">
          <OverviewBox
            title="Current Month (KGs CO2 Emitted)"
            value={parseInt(safeData.totalCarbonByPerson || 0)}
            transport={parseInt(safeData.carbonData.categories.transport || 0)}
            electricity={parseInt(
              safeData.carbonData.categories.electricity || 0
            )}
            others={parseInt(safeData.carbonData.categories.others || 0)}
            icon={
              <Co2
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* TREND CHART */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.8rem"
        >
          <Typography variant="h5" fontWeight="bold" mb="1rem">
            12-Month Emission Trend
          </Typography>
        
          <Box sx={{ height: "200px" }}>
            <OverviewChart isDashboard={true} />
          </Box>
        </Box>


        {/* BREAKDOWN CHART */}
        <Box
          gridColumn="span 16"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.8rem"
        >
          <Typography variant="h5" fontWeight="bold" mb="1rem">
            Emissions by Category
          </Typography>
        
          <Box sx={{ height: "200px" }}>
            <BreakdownChart
              categories={safeData.carbonData.categories}
              isDashboard={true}
            />
          </Box>
        </Box>


        {/* AWARENESS PANEL */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          background="linear-gradient(135deg, rgba(0,255,170,0.08), rgba(0,198,255,0.08))"
          p="2rem"
          borderRadius="1rem"
          boxShadow="0 6px 24px rgba(0,0,0,0.25)"
        >
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            Why Reducing Carbon Emissions Matters 🌍
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.75 }} mb="1.5rem">
            Carbon emissions are a leading driver of climate change, affecting
            ecosystems, economies, and human health.
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={
              isNonMediumScreens ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
            }
            gap="32px"
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Adverse Impacts on Society
              </Typography>

              <Typography sx={{ opacity: 0.75, lineHeight: 1.8 }}>
                • Increased global warming & extreme weather events<br />
                • Rising sea levels affecting coastal regions<br />
                • Health risks from air pollution<br />
                • Food & water insecurity<br />
                • Economic losses from climate disasters
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" fontWeight="bold">
                How You Can Reduce Emissions
              </Typography>

              <Typography sx={{ opacity: 0.75, lineHeight: 1.8 }}>
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
