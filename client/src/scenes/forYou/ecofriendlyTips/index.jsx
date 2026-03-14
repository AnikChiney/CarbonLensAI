import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Rating,
} from "@mui/material";

import Header from "components/Header";
import { Refresh } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/* ---------------- ECO TIPS DATA ---------------- */

const ecoTips = [
  {
    _id: "1",
    title: "Use Public Transport",
    content:
      "Switching from private cars to buses or metro can reduce personal carbon emissions by up to 45%. Public transport is also 3–5× more energy efficient per passenger and helps reduce traffic congestion and fuel consumption.",
    type: "Transport",
  },
  {
    _id: "2",
    title: "Switch to LED Lighting",
    content:
      "LED bulbs consume up to 80% less electricity than traditional bulbs and last up to 25 times longer. Replacing just five bulbs in a home can reduce around 200 kg of CO₂ emissions annually.",
    type: "Energy",
  },
  {
    _id: "3",
    title: "Reduce Food Waste",
    content:
      "Food waste produces methane gas in landfills, which is 25× more harmful than CO₂. Planning meals and composting leftovers can reduce environmental impact significantly.",
    type: "Waste",
  },
  {
    _id: "4",
    title: "Carry Reusable Bags",
    content:
      "Plastic bags take hundreds of years to decompose. Using reusable cloth bags helps reduce plastic pollution and protects marine ecosystems.",
    type: "Lifestyle",
  },
  {
    _id: "5",
    title: "Cycle for Short Trips",
    content:
      "Nearly half of urban trips are under 5 km. Cycling instead of driving reduces emissions, improves air quality, and boosts cardiovascular health.",
    type: "Transport",
  },
  {
    _id: "6",
    title: "Unplug Idle Electronics",
    content:
      "Standby power accounts for 5–10% of household electricity use. Unplugging unused devices or using smart power strips helps reduce wasted energy.",
    type: "Energy",
  },
  {
    _id: "7",
    title: "Plant More Trees",
    content:
      "A mature tree can absorb around 22 kg of CO₂ annually. Trees improve air quality, reduce urban heat, and support biodiversity.",
    type: "Lifestyle",
  },
  {
    _id: "8",
    title: "Use Energy Efficient Appliances",
    content:
      "Energy-efficient appliances consume up to 30% less electricity and help reduce both energy bills and carbon emissions.",
    type: "Energy",
  },
  {
    _id: "9",
    title: "Reduce Water Waste",
    content:
      "Water treatment and pumping require large amounts of energy. Conserving water helps reduce energy consumption and environmental impact.",
    type: "Lifestyle",
  },
  {
    _id: "10",
    title: "Buy Local Products",
    content:
      "Local products travel shorter distances, reducing transportation emissions and supporting local economies.",
    type: "Lifestyle",
  },
];

/* ---------------- RATING ---------------- */

const TipRating = () => {
  const [value, setValue] = useState(3);

  return (
    <Rating
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    />
  );
};

/* ---------------- TIP CARD ---------------- */

const StdCard = ({ title, content, type }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>

        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
        >
          {type}
        </Typography>

        <Typography variant="h3">{title}</Typography>

        <Box height={10} />

        <Typography variant="h5" sx={{ color: theme.palette.primary[100] }}>
          {content}
        </Typography>

        <Box mt={2}>
          <TipRating />
        </Box>

      </CardContent>
    </Card>
  );
};

/* ---------------- AI SUSTAINABILITY SECTION ---------------- */

const AISuggestion = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>

        <Typography variant="h4" gutterBottom>
          AI Sustainability Advisor
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Our AI sustainability system analyzes environmental patterns and
          recommends practical eco-friendly habits to help individuals
          reduce their carbon footprint.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          • Small behavioral changes can collectively create massive
          environmental impact worldwide.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          • Reducing electricity consumption by just 10% globally could
          save millions of tons of CO₂ emissions annually.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          • Walking or cycling for short distances helps reduce urban
          air pollution and improves personal health.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          • Recycling and responsible waste management conserve natural
          resources and reduce landfill emissions.
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Future versions of CarbonLens will generate personalized
          sustainability recommendations based on your lifestyle,
          energy usage, and carbon footprint.
        </Typography>

      </CardContent>
    </Card>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const EcofriendlyTips = () => {

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTips = ecoTips.filter((tip) => {

    const matchesSearch =
      tip.title.toLowerCase().includes(search.toLowerCase()) ||
      tip.content.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || tip.type === filter;

    return matchesSearch && matchesFilter;

  });

  return (
    <Box m="1.5rem 2.5rem">

      <Box display="flex" justifyContent="space-between">

        <Header
          title="Ecofriendly Tips"
          subtitle="Green is the New Cool: Discover Fun Eco-Hacks to Save the Planet!"
        />

        <Button variant="contained">
          <FlexBetween>
            <Refresh fontSize="large"/>
            <Box width={6}/>
            <Typography>Refresh</Typography>
          </FlexBetween>
        </Button>

      </Box>

      <Box mt={3} mb={2}>

        <TextField
          fullWidth
          label="Search Eco Tips"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />

      </Box>

      <Box mb={3}>
        {["All","Energy","Transport","Waste","Lifestyle"].map((f)=>(
          <Button
            key={f}
            variant="outlined"
            sx={{mr:1}}
            onClick={()=>setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0,1fr))"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >

        {filteredTips.map((tip)=>(
          <StdCard key={tip._id} {...tip}/>
        ))}

      </Box>

      <AISuggestion/>

    </Box>
  );
};

export default EcofriendlyTips;