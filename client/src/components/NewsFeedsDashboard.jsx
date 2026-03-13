import React from "react";
// 🔥 Added 'Stack' to the list below
import { Box, Typography, Grid, LinearProgress, useMediaQuery, Stack } from "@mui/material"; 
import NewsFeedCard from "components/NewsCard";
import { useGetGlobalNewsQuery } from "state/api.js";
import { useTheme } from "@mui/material/styles";

const NewsFeedDashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isLight = theme.palette.mode === "light";

    const { data, isLoading } = useGetGlobalNewsQuery({
        page: 1,
        pageSize: 10, // Reduced for dashboard view consistency
    });

    return (
        <Box sx={{ width: "100%", mt: "1rem" }}>
            <Typography 
                fontWeight="700" 
                variant={isMobile ? "h4" : "h2"}
                sx={{ color: theme.palette.text.primary, mb: "1rem" }}
            >
                Global Environment News
            </Typography>

            {/* 🔥 Responsive Scroll Container */}
            <Box 
                sx={{ 
                    maxHeight: isMobile ? "auto" : "500px", 
                    overflowY: "auto",
                    pr: 1, // Space for the scrollbar
                    // 🔥 Professional Scrollbar Styling
                    "::-webkit-scrollbar": { width: "6px" },
                    "::-webkit-scrollbar-track": { 
                        backgroundColor: isLight ? "#f0f0f0" : "rgba(255,255,255,0.05)",
                        borderRadius: "10px" 
                    },
                    "::-webkit-scrollbar-thumb": { 
                        backgroundColor: isLight ? "#ccc" : theme.palette.primary.main, 
                        borderRadius: "10px" 
                    },
                }}
            >
                {isLoading ? (
                    <Box sx={{ width: "100%", mt: 2 }}>
                        <LinearProgress color="secondary" />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {data?.articles?.length > 0 ? (
                            data.articles.slice(0, 5).map((article, index) => (
                                <Grid item xs={12} key={index}>
                                    <NewsFeedCard
                                        title={article.title}
                                        content={article.description}
                                        image={article.urlToImage}
                                        source={article.source.name}
                                        publishedAt={article.publishedAt}
                                        url={article.url}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Stack spacing={2}>
                                    <NewsFeedCard
                                        title="🌍 Environmental Updates"
                                        content="Current global data indicates record-breaking temperatures and critical climate milestones."
                                        image="https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?w=900&auto=format&fit=crop"
                                        source="CarbonLens AI"
                                        publishedAt={new Date().toISOString()}
                                        url="#"
                                    />
                                    <NewsFeedCard
                                        title="♻ Sustainability Matters"
                                        content="The green hydrogen market is projected to grow significantly by 2030."
                                        image="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=2070"
                                        source="CarbonLens AI"
                                        publishedAt={new Date().toISOString()}
                                        url="#"
                                    />
                                </Stack>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default NewsFeedDashboard;