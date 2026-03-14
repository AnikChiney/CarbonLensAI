import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
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
      "Switching from private cars to buses or metro can reduce personal carbon emissions by up to 45%.",
    type: "Transport",
    details: [
      "A single bus can replace 30–40 private cars.",
      "Public transport is 3–5× more energy efficient per passenger.",
      "Using public transport one extra day per week can reduce transport emissions by up to 20%.",
      "It also helps reduce traffic congestion and fuel costs."
    ],
  },
  {
    _id: "2",
    title: "Switch to LED Lighting",
    content:
      "LED bulbs consume up to 80% less electricity than traditional bulbs.",
    type: "Energy",
    details: [
      "LED lights convert most electricity into light instead of heat.",
      "Replacing 5 bulbs with LEDs can reduce 200 kg CO₂ annually.",
      "LED bulbs last up to 25 times longer.",
      "Smart LED lighting can further reduce electricity usage."
    ],
  },
  {
    _id: "3",
    title: "Reduce Food Waste",
    content:
      "Planning meals and storing food properly helps prevent unnecessary waste.",
    type: "Waste",
    details: [
      "Food waste produces methane gas which is 25× stronger than CO₂.",
      "Nearly one-third of global food production is wasted.",
      "Meal planning reduces grocery expenses.",
      "Composting converts food waste into useful fertilizer."
    ],
  },
  {
    _id: "4",
    title: "Carry Reusable Bags",
    content:
      "Reusable cloth bags reduce plastic pollution and landfill waste.",
    type: "Lifestyle",
    details: [
      "Plastic bags can take 500–1000 years to decompose.",
      "Over 5 trillion plastic bags are used yearly worldwide.",
      "Reusable bags can replace hundreds of single-use plastics.",
      "They help protect marine ecosystems."
    ],
  },
  {
    _id: "5",
    title: "Cycle for Short Trips",
    content:
      "Cycling instead of driving short distances reduces emissions and improves health.",
    type: "Transport",
    details: [
      "Nearly 50% of city trips are under 5 km.",
      "Cycling produces zero emissions.",
      "Cycling improves cardiovascular health.",
      "Cities promoting cycling experience lower pollution."
    ],
  },
  {
    _id: "6",
    title: "Unplug Idle Electronics",
    content:
      "Devices plugged in consume standby electricity even when turned off.",
    type: "Energy",
    details: [
      "Standby power accounts for 5–10% of household electricity.",
      "Chargers and TVs consume phantom power.",
      "Smart power strips help eliminate wasted energy.",
      "Reducing standby energy lowers electricity bills."
    ],
  },
  {
    _id: "7",
    title: "Plant More Trees",
    content:
      "Trees absorb carbon dioxide and help cool the environment.",
    type: "Lifestyle",
    details: [
      "A mature tree absorbs around 22 kg CO₂ per year.",
      "Urban trees reduce heat island effects.",
      "Trees support biodiversity.",
      "They improve air quality and mental well-being."
    ],
  },
  {
    _id: "8",
    title: "Use Energy Efficient Appliances",
    content:
      "Energy-efficient appliances reduce electricity consumption.",
    type: "Energy",
    details: [
      "Energy Star appliances use up to 30% less electricity.",
      "They reduce electricity bills long term.",
      "Efficient appliances lower carbon emissions.",
      "They also conserve water in many cases."
    ],
  },
  {
    _id: "9",
    title: "Reduce Water Waste",
    content:
      "Conserving water reduces energy required for pumping and treatment.",
    type: "Lifestyle",
    details: [
      "Turning off taps while brushing saves liters of water.",
      "Fixing leaks saves thousands of liters annually.",
      "Water treatment consumes significant electricity.",
      "Efficient irrigation helps conserve water globally."
    ],
  },
  {
    _id: "10",
    title: "Buy Local Products",
    content:
      "Buying locally reduces transportation emissions.",
    type: "Lifestyle",
    details: [
      "Local goods require less transportation fuel.",
      "Supporting local businesses strengthens economies.",
      "Local produce often needs less packaging.",
      "Shorter supply chains reduce emissions."
    ],
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

const StdCard = ({ _id, title, content, type, details }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

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

      <CardActions>
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          {details.map((d, i) => (
            <Typography key={i} sx={{ mb: 1 }}>
              • {d}
            </Typography>
          ))}

          <Typography variant="caption">
            Tip ID: {_id}
          </Typography>

        </CardContent>
      </Collapse>
    </Card>
  );
};

/* ---------------- AI SUSTAINABILITY SECTION ---------------- */

const AISuggestion = () => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>

        <Typography variant="h4" gutterBottom>
          o AI Sustainability Advisor
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Our AI sustainability engine analyzes environmental patterns
          and recommends practical eco-friendly habits that individuals
          can adopt to reduce their carbon footprint.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          o Small behavioral changes can create massive environmental impact.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          o Reducing electricity consumption by just 10% globally could
          save millions of tons of CO₂ emissions each year.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          o Replacing short car trips with walking or cycling reduces
          urban air pollution and improves public health.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          o Recycling and waste segregation conserve natural resources
          and reduce landfill methane emissions.
        </Typography>

        <Typography sx={{ mt: 2 }}>
          In future versions of CarbonLens, this AI system will generate
          personalized sustainability recommendations based on your
          carbon footprint, energy usage, and lifestyle habits.
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
            <Refresh fontSize="large" />
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