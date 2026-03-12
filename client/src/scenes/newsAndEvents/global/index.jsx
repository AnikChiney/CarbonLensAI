import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "components/Header";
import NewsFeedCard from "components/NewsCard";
import { useGetGlobalNewsQuery } from "state/api.js";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const GlobalNews = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useGetGlobalNewsQuery({
    page,
    pageSize,
  });

  const newsData = data;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Global News & Events"
        subtitle="Stay Informed, Change the World: Explore Global News and Events Shaping Our Future!"
      />

      <Box mt="40px" minHeight="75vh">

        {/* Loading */}
        {isLoading ? (
          <Box sx={{ width: "60%", margin: "2rem 0 2rem 0.2rem" }}>
            <p style={{ color: theme.palette.secondary[500] }}>
              LOADING...
            </p>
            <LinearProgress />
          </Box>
        ) : isError ? (
          /* Error State */
          <Typography mt={3} color="error">
            Failed to load news. Please try again later.
          </Typography>
        ) : (
          <>
            {/* No News */}
            {newsData?.articles?.length === 0 ? (
              <Typography mt={3} color="secondary">
                No environmental news found today.
              </Typography>
            ) : (
              <>
                {/* News Cards */}
                {newsData?.articles?.map((article, index) => (
                  <NewsFeedCard
                    key={index}
                    title={article.title}
                    content={article.description}
                    image={article.urlToImage}
                    source={article.source?.name}
                    publishedAt={article.publishedAt}
                    url={article.url}
                  />
                ))}

                {/* Pagination */}
                <Box
                  mt={3}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={page === 1}
                    onClick={handlePrevPage}
                  >
                    Previous Page
                  </Button>

                  <Typography variant="h5" mx={2}>
                    Page {page}
                  </Typography>

                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleNextPage}
                    disabled={!newsData?.articles || newsData.articles.length < pageSize}
                  >
                    Next Page
                  </Button>
                </Box>
              </>
            )}

            <Box height={20}></Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default GlobalNews;