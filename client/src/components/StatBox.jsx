import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, rangeText, icon, description, colSpan, rowSpan }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";

    return (
        <Box
            gridColumn={`span ${colSpan ? colSpan : 2}`}
            gridRow={`span ${rowSpan ? rowSpan : 1}`}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.75rem"
            boxShadow={isLight ? "0px 2px 8px rgba(0, 0, 0, 0.04)" : "none"}
            border={isLight ? `1px solid ${theme.palette.grey[100]}` : "none"}
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
                variant="h3"
                fontWeight="700"
                sx={{ color: isLight ? theme.palette.grey[900] : theme.palette.secondary[200] }}
            >
                {value}
            </Typography>

            <FlexBetween gap="1rem">
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: isLight ? theme.palette.primary[500] : theme.palette.secondary.light }}
                >
                    {rangeText}
                </Typography>
                <Typography variant="caption">{description}</Typography>
            </FlexBetween>
        </Box>
    );
};

export default StatBox;