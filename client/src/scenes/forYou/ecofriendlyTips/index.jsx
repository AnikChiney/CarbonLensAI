import React, { useEffect, useState } from "react";
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

import LinearProgress from "@mui/material/LinearProgress";
import Header from "components/Header";
import { useGetRandomEcofriendlyTipsQuery } from "state/api.js";
import { Refresh } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";

/* ----------------------- Tip Rating ----------------------- */

const TipRating = () => {
  const [value, setValue] = useState(3);

  return (
    <Rating
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    />
  );
};

/* ----------------------- Standard Tip Card ----------------------- */

const StdCard = ({ _id, title, content, type }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>

        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
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
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>More Coming Soon!</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

/* ----------------------- Search Component ----------------------- */

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

/* ----------------------- Filter Component ----------------------- */

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

/* ----------------------- Stats Component ----------------------- */

const TipStats = ({ count }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        mb: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5">Total Tips</Typography>
        <Typography variant="h3">{count}</Typography>
      </CardContent>
    </Card>
  );
};

/* ----------------------- AI Suggestion ----------------------- */

const AISuggestion = () => {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5">AI Sustainability Tip</Typography>
        <Typography>
          Try replacing short car trips with cycling or walking to reduce
          carbon emissions and improve health.
        </Typography>
      </CardContent>
    </Card>
  );
};

/* ----------------------- Loader ----------------------- */

const RefreshLoader = () => (
  <Box display="flex" justifyContent="center" mt={4}>
    <CircularProgress />
  </Box>
);

/* ----------------------- Main Page ----------------------- */

const EcofriendlyTips = () => {
  const theme = useTheme();

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useGetRandomEcofriendlyTipsQuery();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const data = apiData;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleClick = () => {
    refetch();
  };

  const filteredData =
    data?.filter((tip) => {
      const matchesSearch =
        tip.title.toLowerCase().includes(search.toLowerCase()) ||
        tip.content.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || tip.type === filter;

      return matchesSearch && matchesFilter;
    }) || [];

  return (
    <Box m="1.5rem 2.5rem">

      <Box display="flex" justifyContent="space-between">

        <Header
          title="Ecofriendly Tips (Hit Refresh!)"
          subtitle="Green is the New Cool: Discover Fun Eco-Hacks to Save the Planet!"
        />

        <Button variant="contained" onClick={handleClick}>
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

      {!isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
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
      ) : (
        <>
          <Box sx={{ width: "60%", margin: "2rem 0 2rem 0.2rem" }}>
            <p
              style={{
                color: `${theme.palette.secondary[500]}`,
              }}
            >
              LOADING...
            </p>
            <LinearProgress />
          </Box>

          <RefreshLoader />
        </>
      )}

      <AISuggestion />

    </Box>
  );
};

export default EcofriendlyTips;
