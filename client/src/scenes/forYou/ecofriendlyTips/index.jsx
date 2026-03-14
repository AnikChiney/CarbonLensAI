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
  CircularProgress,
} from "@mui/material";

import Header from "components/Header";
import { Refresh } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/* ---------------- REAL ECO TIPS DATA ---------------- */

const ecoTips = [
  {
    _id: "1",
    title: "Use Public Transport",
    content:
      "Switching from private cars to buses or metro can reduce personal carbon emissions by up to 45%.",
    type: "Transport",
  },
  {
    _id: "2",
    title: "Switch to LED Lighting",
    content:
      "LED bulbs consume up to 80% less electricity than traditional bulbs and last much longer.",
    type: "Energy",
  },
  {
    _id: "3",
    title: "Reduce Food Waste",
    content:
      "Plan meals and store food properly to prevent waste. Food waste contributes heavily to methane emissions.",
    type: "Waste",
  },
  {
    _id: "4",
    title: "Carry Reusable Bags",
    content:
      "Using reusable bags helps reduce plastic pollution and protects marine ecosystems.",
    type: "Lifestyle",
  },
  {
    _id: "5",
    title: "Cycle for Short Trips",
    content:
      "Cycling instead of driving for short distances reduces emissions and improves personal health.",
    type: "Transport",
  },
  {
    _id: "6",
    title: "Unplug Idle Electronics",
    content:
      "Devices plugged in consume standby power. Unplugging them can reduce electricity usage by 5–10%.",
    type: "Energy",
  },
];

/* ---------------- TIP RATING ---------------- */

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

const StdCard = ({ _id, title, content, type }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

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
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse in={isExpanded}>
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>
            Small actions today create a greener tomorrow 🌍
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
};

/* ---------------- SEARCH ---------------- */

const TipSearch = ({ setSearch }) => {
  return (
    <TextField
      fullWidth
      label="Search Eco Tips"
      variant="outlined"
      sx={{ mb: 2 }}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

/* ---------------- FILTER ---------------- */

const TipFilter = ({ setFilter }) => {
  const filters = ["All", "Energy", "Transport", "Waste", "Lifestyle"];

  return (
    <Box mb="20px">
      {filters.map((f) => (
        <Button
          key={f}
          variant="outlined"
          sx={{ mr: 1 }}
          onClick={() => setFilter(f)}
        >
          {f}
        </Button>
      ))}
    </Box>
  );
};

/* ---------------- STATS ---------------- */

const TipStats = ({ count }) => {
  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: theme.palette.background.alt, mb: 2 }}>
      <CardContent>
        <Typography variant="h5">Total Tips</Typography>
        <Typography variant="h3">{count}</Typography>
      </CardContent>
    </Card>
  );
};

/* ---------------- AI TIP ---------------- */

const AISuggestion = () => {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5">AI Sustainability Suggestion</Typography>
        <Typography>
          Consider switching to renewable electricity sources or installing
          rooftop solar panels to significantly reduce your carbon footprint.
        </Typography>
      </CardContent>
    </Card>
  );
};

/* ---------------- LOADER ---------------- */

const RefreshLoader = () => (
  <Box display="flex" justifyContent="center" mt={4}>
    <CircularProgress />
  </Box>
);

/* ---------------- MAIN PAGE ---------------- */

const EcofriendlyTips = () => {

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredData = ecoTips.filter((tip) => {

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
            <Box width={6} />
            <Typography>Refresh</Typography>
          </FlexBetween>
        </Button>

      </Box>

      <Box mt={3}>

        <TipSearch setSearch={setSearch} />

        <TipFilter setFilter={setFilter} />

        <TipStats count={filteredData.length} />

      </Box>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0,1fr))"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >

        {filteredData.map(({ title, content, type, _id }) => (
          <StdCard
            key={_id}
            _id={_id}
            title={title}
            content={content}
            type={type}
          />
        ))}

      </Box>

      <AISuggestion />

    </Box>
  );
};

export default EcofriendlyTips;
