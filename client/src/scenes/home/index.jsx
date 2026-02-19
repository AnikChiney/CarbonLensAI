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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBrand(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          background:
            "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
          color: "#fff",
          py: 16,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Fade in timeout={800}>
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
              sx={{ letterSpacing: 1 }}
            >
              AI-Powered Climate Intelligence
            </Typography>
          </Fade>

          <Fade in timeout={1200}>
            <Typography
              variant="h6"
              sx={{
                mb: 5,
                opacity: 0.85,
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Quantify emissions. Forecast environmental impact.
              Generate explainable AI insights for smarter sustainability decisions.
            </Typography>
          </Fade>

          <Fade in timeout={1600}>
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mr: 2,
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #00c6ff, #0072ff)",
                }}
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.4)",
                  backdropFilter: "blur(6px)",
                }}
                onClick={() => navigate("/login")}
              >
                Explore Platform
              </Button>
            </Box>
          </Fade>

          {showBrand && (
            <Fade in timeout={1000}>
              <Typography
                sx={{
                  mt: 6,
                  fontSize: "0.85rem",
                  letterSpacing: 3,
                  opacity: 0.6,
                }}
              >
                Powered by <b><i>CarbonLens AI</i></b>
              </Typography>
            </Fade>
          )}
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Container sx={{ py: 12 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Intelligent Climate Analytics Platform
        </Typography>

        <Typography
          align="center"
          sx={{ mb: 6, color: "text.secondary", maxWidth: 700, mx: "auto" }}
        >
          Built with Generative AI to provide accurate measurement,
          predictive forecasting, and explainable sustainability intelligence.
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Emission Quantification",
              desc: "Precisely calculate carbon footprints across industries, supply chains, and consumer behavior.",
            },
            {
              title: "Predictive Forecasting",
              desc: "AI-driven models project future emissions trends for proactive climate strategies.",
            },
            {
              title: "Explainable AI Insights",
              desc: "Transparent AI explanations reveal emission drivers for confident decision-making.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA SECTION */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #111, #1a1a1a)",
          color: "#fff",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Make Data-Driven Climate Decisions
          </Typography>

          <Typography sx={{ mb: 4, opacity: 0.8 }}>
            Transform emissions data into actionable intelligence with AI.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            }}
            onClick={() => navigate("/register")}
          >
            Start Now
          </Button>
        </Container>
      </Box>
    </>
  );
}
