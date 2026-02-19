import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Co2,
  DownloadOutlined,
  Business,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  //useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetCarbonStatsQuery } from "state/api";
import OverviewBox from "components/OverviewBox";
import WeatherInfo from "components/WeatherInfo";
import NewsFeedDashboard from "components/NewsFeedsDashboard";

const Dashboard = () => {
  //const theme = useTheme();
  const navigate = useNavigate();
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data } = useGetCarbonStatsQuery({
    year: currentYear,
    month: currentMonth,
  });

  const dashboardCardStyle = {
    position: "relative",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "translateY(-6px)",
    },
  };

  const glowBorder = {
    position: "absolute",
    inset: 0,
    borderRadius: "20px",
    padding: "2px",
    background:
      "linear-gradient(120deg, #00ffaa, #00c6ff, #0072ff, #00ffaa)",
    backgroundSize: "300% 300%",
    animation: "glowMove 6s linear infinite",
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        "@keyframes glowMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "@keyframes fadeUp": {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {/* HEADER */}
      <FlexBetween mb="2rem">
        <Header
          title="CarbonLensAI"
          subtitle="AI-powered carbon emission intelligence platform"
        />

        <Button
          sx={{
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "10px",
            transition: "0.3s",
            "&:hover": { opacity: 0.85 },
          }}
        >
          <DownloadOutlined sx={{ mr: 1 }} />
          REPORT
        </Button>
      </FlexBetween>

      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="24px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      > 

        {/* INDIVIDUALS CARD */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          sx={{ ...dashboardCardStyle, p: "2rem", cursor: "pointer" }}
          onClick={() => window.open("https://onlinecourses.nptel.ac.in/noc26_cs84/unit?unit=104&lesson=111", "_self")} // akhne change korbi ("_self" dile oi tab ei open hbe r "_blank" dile onno tab e open hbe)
        >
          <Box sx={glowBorder} />

          <Person sx={{ fontSize: 42, mb: 2, color: "#00ffaa" }} />

          <Typography variant="h5" fontWeight="bold" mb={1}>
            Individuals
          </Typography>

          <Typography sx={{ opacity: 0.75 }}>
            Track your personal carbon footprint, receive AI-powered
            insights, and take climate-conscious daily actions.
          </Typography>
        </Box>

        {/* INDUSTRIAL CARD */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          sx={{ ...dashboardCardStyle, p: "2rem", cursor: "pointer" }}
          onClick={() => window.open("https://onlinecourses.nptel.ac.in/noc26_cs84/unit?unit=104&lesson=111", "_blank")} // akhne change korbi ("_self" dile oi tab ei open hbe r "_blank" dile onno tab e open hbe)
        >
          <Box sx={glowBorder} />

          <Business sx={{ fontSize: 42, mb: 2, color: "#00c6ff" }} />

          <Typography variant="h5" fontWeight="bold" mb={1}>
            Industrial
          </Typography>

          <Typography sx={{ opacity: 0.75 }}>
            Monitor large-scale emissions, forecast impact using AI
            models, and optimize sustainability performance.
          </Typography>
        </Box>

        {/* WEATHER */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ ...dashboardCardStyle, p: "1.8rem" }}
        >
          <WeatherInfo />
        </Box>

        {/* OVERVIEW */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <OverviewBox
            title="Carbon Footprint (KGs CO2)"
            value={3262}
            transport={1728}
            electricity={984}
            others={150}
            icon={<Co2 sx={{ color: "#00ffaa", fontSize: 28 }} />}
            rowSpan={2}
            colSpan={4}
          />
        </Box>

        {/* NEWS */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{ ...dashboardCardStyle, p: "2rem" }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Global Environment News
          </Typography>

          <NewsFeedDashboard />
        </Box>

        {/* OVERVIEW CHART */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{ ...dashboardCardStyle, p: "2rem" }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Previous 12 Months CO₂ Emissions
          </Typography>

          <OverviewChart isDashboard={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
