import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBoxWide = ({ title, value, increase, icon, description }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";

    return (
        <Box
            gridColumn="span 4"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.75rem" // Slightly rounder for a modern look
            // 🔥 Professional depth for Light Mode
            boxShadow={isLight ? "0px 4px 12px rgba(0, 0, 0, 0.05)" : "none"}
            border={isLight ? `1px solid ${theme.palette.grey[100]}` : "none"}
            sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-3px)" }
            }}
        >
            <FlexBetween>
                <Typography 
                    variant="h6" 
                    sx={{ color: isLight ? theme.palette.grey[600] : theme.palette.secondary[100] }}
                >
                    {title}
                </Typography>
                <Box sx={{ color: theme.palette.primary.main }}>{icon}</Box>
            </FlexBetween>

            <Typography
                variant="h2" // Bigger for more impact
                fontWeight="700"
                sx={{ 
                    color: isLight ? theme.palette.grey[900] : theme.palette.secondary[200],
                    my: "0.5rem" 
                }}
            >
                {value}
            </Typography>

            <FlexBetween gap="1rem">
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: theme.palette.primary.main }}
                >
                    {increase}
                </Typography>
                <Typography 
                    variant="caption" 
                    sx={{ color: isLight ? theme.palette.grey[500] : "inherit" }}
                >
                    {description}
                </Typography>
            </FlexBetween>
        </Box>
    );
};

export default StatBoxWide;