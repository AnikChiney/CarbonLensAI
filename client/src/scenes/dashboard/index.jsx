import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Co2,
  DownloadOutlined,
  Business,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OverviewChart from "components/OverviewChart";
import { useGetCarbonStatsQuery } from "state/api";
import OverviewBox from "components/OverviewBox";
import WeatherInfo from "components/WeatherInfo";
import NewsFeedDashboard from "components/NewsFeedsDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data } = useGetCarbonStatsQuery({
    year: currentYear,
    month: currentMonth,
  });

  // --- Professional Component Styles ---

  const dashboardCardStyle = {
    position: "relative",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
    },
  };

  const glowBorder = {
    position: "absolute",
    inset: 0,
    borderRadius: "24px",
    padding: "2px",
    background:
      "linear-gradient(120deg, #00ffaa, #00c6ff, #0072ff, #00ffaa)",
    backgroundSize: "300% 300%",
    animation: "glowMove 6s linear infinite",
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  };

  const actionButtonStyle = (color) => ({
    width: "100%", 
    mt: 2,
    py: 1.8, // Slightly thicker for a premium "borderless" feel
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "800",
    fontSize: "0.85rem",
    borderRadius: "12px",
    color: "#fff",
    border: "none", // 🔥 Border removed
    background: alpha(color, 0.15), // Slightly more opaque since border is gone
    backdropFilter: "blur(4px)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: color,
      color: "#000", 
      boxShadow: `0 0 40px ${alpha(color, 0.5)}`,
      transform: "scale(1.01)",
    },
  });

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        "@keyframes glowMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      {/* HEADER SECTION */}
      <FlexBetween mb="2rem">
        <Header
          title="CarbonLensAI"
          subtitle="AI-powered carbon emission intelligence platform"
        />

        {/* <Button
          sx={{
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 198, 255, 0.3)",
            transition: "0.3s",
            "&:hover": { opacity: 0.85, transform: "translateY(-2px)" },
          }}
        >
          <DownloadOutlined sx={{ mr: 1 }} />
          REPORT
        </Button> */}
      </FlexBetween>

      {/* MAIN DASHBOARD GRID */}
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
        {/* INDIVIDUALS PORTAL */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          sx={{ ...dashboardCardStyle, p: "2.5rem" }}
        >
          <Box sx={glowBorder} />
          <Box sx={{ flexGrow: 1 }}>
            <Person sx={{ fontSize: 48, mb: 1, color: "#00ffaa" }} />
            <Typography variant="h5" fontWeight="900" fontSize={32} mb={1} sx={{ letterSpacing: "-1px" }}>
              Individuals
            </Typography>
            <Typography sx={{ opacity: 0.6, mb: 3, lineHeight: 1.6 }}>
              Track your personal carbon footprint, receive AI-powered
              insights, and take climate-conscious daily actions.
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForward />}
            sx={actionButtonStyle("#00ffaa")}
            onClick={() => window.open("https://carbonlensai-personal2.onrender.com/", "_blank")}
          >
            Open Platform
          </Button>
        </Box>

        {/* INDUSTRIAL PORTAL */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          sx={{ ...dashboardCardStyle, p: "2.5rem" }}
        >
          <Box sx={glowBorder} />
          <Box sx={{ flexGrow: 1 }}>
            <Business sx={{ fontSize: 48, mb: 1, color: "#00c6ff" }} />
            <Typography variant="h5" fontWeight="900" fontSize={32} mb={1} sx={{ letterSpacing: "-1px" }}>
              Industrial
            </Typography>
            <Typography sx={{ opacity: 0.6, mb: 3, lineHeight: 1.6 }}>
              Monitor large-scale emissions, forecast impact using deep-learning AI
              models, and optimize sustainability.
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForward />}
            sx={actionButtonStyle("#00c6ff")}
            onClick={() => window.open("https://carbonlensai-industrial-1.onrender.com/", "_blank")}
          >
            Open Analytics
          </Button>
        </Box>

        {/* WEATHER WIDGET */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ ...dashboardCardStyle, p: "1.8rem" }}
        >
          <WeatherInfo />
        </Box>

        {/* METRIC OVERVIEW */}
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

        {/* GLOBAL NEWS FEED */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{ ...dashboardCardStyle, p: "2.5rem" }}
        >
          <Typography variant="h4" fontWeight="800" mb={3} sx={{ letterSpacing: "-1px" }}>
            Global Environment News
          </Typography>
          <NewsFeedDashboard />
        </Box>

        {/* EMISSION PROJECTION CHART */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{ 
            ...dashboardCardStyle, 
            p: "2.5rem", 
            mb: "2rem",
            display: "flex",
            flexDirection: "column" 
          }}
        >
          <Typography variant="h4" fontWeight="800" mb={3} sx={{ letterSpacing: "-1px" }}>
            Previous 12 Months CO₂ Emissions
          </Typography>
          
          {/* 🔥 This wrapper box is the fix */}
          <Box sx={{ height: "400px", width: "100%", flexGrow: 1 }}>
            <OverviewChart isDashboard={false} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;