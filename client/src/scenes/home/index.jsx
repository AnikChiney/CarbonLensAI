import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Fade,
  useTheme,
  alpha,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  AutoGraph, 
  Psychology, 
  Insights, 
  KeyboardArrowRight 
} from "@mui/icons-material";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBrand(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Visual Assets for Feature Icons
  const featureIcons = [
    <Insights sx={{ fontSize: 40, color: "#00c6ff" }} />,
    <AutoGraph sx={{ fontSize: 40, color: "#0072ff" }} />,
    <Psychology sx={{ fontSize: 40, color: "#00ffaa" }} />
  ];

  return (
    <Box sx={{ backgroundColor: "#050a10", color: "#fff", overflow: "hidden" }}>
      
      {/* 1. HERO SECTION WITH ANIMATED TEXTURES */}
      <Box
        sx={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "radial-gradient(circle at 50% -20%, #112240 0%, #050a10 70%)",
        }}
      >
        {/* Animated Background Decoration */}
        <Box sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "linear-gradient(90deg, #00c6ff22, #0072ff22)",
            filter: "blur(120px)",
            borderRadius: "50%",
            zIndex: 1
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Fade in timeout={1000}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                mb: 3,
                background: "linear-gradient(180deg, #FFFFFF 0%, #A0AEC0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI-Powered <br /> Climate Intelligence
            </Typography>
          </Fade>

          <Fade in timeout={1500}>
            <Typography
              variant="h5"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                mb: 6,
                color: "#94a3b8",
                fontWeight: 400,
                lineHeight: 1.8,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              The enterprise-grade platform to quantify emissions, forecast impact, 
              and generate explainable AI insights for a sustainable future.
            </Typography>
          </Fade>

          <Fade in timeout={2000}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                  boxShadow: "0 0 20px rgba(0, 198, 255, 0.4)",
                  "&:hover": { transform: "scale(1.05)", boxShadow: "0 0 30px rgba(0, 198, 255, 0.6)" }
                }}
              >
                Get Started Free
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                endIcon={<KeyboardArrowRight />}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: "50px",
                  color: "#fff",
                  borderColor: alpha("#fff", 0.2),
                  backdropFilter: "blur(10px)",
                  "&:hover": { borderColor: "#fff", background: alpha("#fff", 0.05) }
                }}
              >
                Explore Platform
              </Button>
            </Stack>
          </Fade>

          {showBrand && (
            <Fade in timeout={1000}>
              <Typography sx={{ mt: 8, fontSize: "0.75rem", letterSpacing: 5, opacity: 0.4, textTransform: "uppercase" }}>
                Official Engine: CarbonLens AI v3.0
              </Typography>
            </Fade>
          )}
        </Container>
      </Box>

      {/* 2. LOGO CLOUD (Judges love social proof/tech stack) */}
      <Container sx={{ py: 6, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "#64748b", mb: 4, display: "block", letterSpacing: 2 }}>
              POWERED BY INDUSTRY LEADERS
          </Typography>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={6} sx={{ opacity: 0.5 }}>
              {["React", "Gemini AI", "FastAPI", "Node.js", "MongoDB"].map((tech) => (
                  <Typography key={tech} variant="h6" fontWeight="800" sx={{ color: "#94a3b8" }}>{tech}</Typography>
              ))}
          </Stack>
      </Container>

      {/* 3. FEATURE SECTION WITH GLASS CARDS */}
      <Container sx={{ py: 15 }}>
        <Box textAlign="center" mb={10}>
            <Typography variant="overline" sx={{ color: "#00c6ff", fontWeight: 700, letterSpacing: 3 }}>
                CORE CAPABILITIES
            </Typography>
            <Typography variant="h2" fontWeight={800} mt={2}>
                Intelligent Climate Analytics
            </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              title: "Emission Quantification",
              desc: "Precisely calculate carbon footprints across global supply chains with sub-meter accuracy.",
            },
            {
              title: "Predictive Forecasting",
              desc: "Deep-learning models that project 10-year environmental trends for strategic planning.",
            },
            {
              title: "Explainable AI Insights",
              desc: "Transparent neural networks that explain 'the why' behind every climate metric.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: "24px",
                  background: "rgba(15, 23, 42, 0.4)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    borderColor: "#00c6ff",
                    background: "rgba(15, 23, 42, 0.6)",
                  },
                }}
              >
                <CardContent>
                  <Box mb={3}>{featureIcons[index]}</Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: "#94a3b8", lineHeight: 1.7 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 4. CTA FOOTER */}
      <Box sx={{ 
          background: "linear-gradient(180deg, #050a10 0%, #001220 100%)", 
          py: 12, 
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <Container maxWidth="sm">
          <Typography variant="h3" fontWeight={900} mb={3}>
            Ready to lead the <br /> <span style={{color: "#00c6ff"}}>Green Revolution?</span>
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            sx={{
              px: 8, py: 2,
              borderRadius: "50px",
              background: "#fff",
              color: "#000",
              fontWeight: 800,
              "&:hover": { background: "#e2e8f0" }
            }}
          >
            Create My Account
          </Button>
        </Container>
      </Box>
    </Box>
  );
}