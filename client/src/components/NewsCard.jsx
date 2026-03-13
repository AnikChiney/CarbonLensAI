import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    IconButton,
    useTheme,
    Box,
    useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const NewsFeedCard = ({ title, content, image, source, publishedAt, url }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isLight = theme.palette.mode === "light";

    const handleCardClick = () => {
        if (url) {
            window.open(url, "_blank"); // Better UX: open in new tab
        }
    };

    return (
        <Grid item xs={12}>
            <Card
                onClick={handleCardClick}
                sx={{
                    backgroundColor: theme.palette.background.alt,
                    display: "flex",
                    // 🔥 Column on mobile, Row on desktop
                    flexDirection: isMobile ? "column" : "row",
                    borderRadius: "12px",
                    // Professional shadow/border for Light Mode
                    boxShadow: isLight ? "0px 4px 12px rgba(0,0,0,0.05)" : theme.shadows[2],
                    border: isLight ? `1px solid ${theme.palette.grey[100]}` : "none",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                    overflow: "hidden",
                    mb: 2,
                    "&:hover": {
                        backgroundColor: isLight ? theme.palette.grey[50] : "rgba(255,255,255,0.05)",
                        transform: "translateY(-2px)",
                    },
                }}
            >
                <CardMedia
                    component="img"
                    image={image || "https://via.placeholder.com/400x200?text=Environmental+News"}
                    alt={title}
                    sx={{
                        // 🔥 Responsive sizing
                        width: isMobile ? "100%" : 240,
                        height: isMobile ? 200 : "auto",
                        objectFit: "cover",
                    }}
                />

                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: isMobile ? 2 : 3,
                        gap: 1,
                    }}
                >
                    <Typography
                        variant={isMobile ? "h5" : "h3"}
                        fontWeight="bold"
                        color={theme.palette.text.primary}
                        sx={{
                            // Truncate long titles
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.text.secondary,
                            display: "-webkit-box",
                            WebkitLineClamp: isMobile ? 2 : 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 1,
                        }}
                    >
                        {content}
                    </Typography>

                    <Box mt="auto" display="flex" alignItems="center" gap={2}>
                        <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            sx={{ color: theme.palette.primary.main }}
                        >
                            {source}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            {new Date(publishedAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                </CardContent>

                {!isMobile && (
                    <Box display="flex" alignItems="center" pr={2}>
                        <IconButton disabled>
                            <ArrowForwardIosIcon sx={{ fontSize: "1rem", color: theme.palette.grey[400] }} />
                        </IconButton>
                    </Box>
                )}
            </Card>
        </Grid>
    );
};

export default NewsFeedCard;