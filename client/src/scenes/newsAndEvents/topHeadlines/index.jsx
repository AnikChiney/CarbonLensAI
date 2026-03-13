import React, { useState } from "react";
import { Box, Typography, LinearProgress, Chip, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "components/Header";
import NewsFeedCard from "components/NewsCard";
import { useGetTopHeadlinesQuery } from "state/api.js";

const categories = ["All", "Climate", "Energy", "Policy", "Wildlife", "Pollution"];

const TopHeadlines = () => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");

    const { data, isLoading, isFetching } = useGetTopHeadlinesQuery({
        page,
        pageSize: 20,
        // If your backend supports category filtering, pass it here
        category: activeCategory === "All" ? "" : activeCategory,
    });

    return (
        <Box m="1.5rem 2.5rem">
            <Header
                title="TOP ENVIRONMENTAL HEADLINES"
                subtitle="The most critical breaking news in sustainability and climate action worldwide."
            />

            {/* Category Filters */}
            <Stack direction="row" spacing={1} mt="20px" flexWrap="wrap" useFlexGap>
                {categories.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        onClick={() => setActiveCategory(cat)}
                        color={activeCategory === cat ? "secondary" : "default"}
                        variant={activeCategory === cat ? "filled" : "outlined"}
                        sx={{ fontSize: "0.9rem", fontWeight: "600" }}
                    />
                ))}
            </Stack>

            <Box mt="40px" height="75vh">
                {isLoading || isFetching ? (
                    <Box sx={{ width: "60%" }}>
                        <Typography variant="h6" sx={{ color: theme.palette.secondary[500], mb: "1rem" }}>
                            FETCHING BREAKING NEWS...
                        </Typography>
                        <LinearProgress color="secondary" />
                    </Box>
                ) : data?.articles?.length > 0 ? (
                    <Box>
                        {/* FEATURED STORY: The first article gets a special layout if you want, 
                            or just map them all using your NewsFeedCard */}
                        {data.articles.map((article, index) => (
                            <NewsFeedCard
                                key={`${article.url}-${index}`}
                                title={article.title}
                                content={article.description}
                                image={article.urlToImage}
                                source={article.source?.name}
                                publishedAt={article.publishedAt}
                                url={article.url}
                                // Pass a 'trending' prop if you want to show a badge
                                isTrending={index < 3} 
                            />
                        ))}
                    </Box>
                ) : (
                    <Typography>No breaking headlines found for this category.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default TopHeadlines;