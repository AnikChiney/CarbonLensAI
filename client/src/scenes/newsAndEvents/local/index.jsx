import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Autocomplete, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Header from "components/Header";
import NewsFeedCard from "components/NewsCard";
import { useGetLocalNewsQuery } from "state/api.js";

const LocalNews = () => {
    const theme = useTheme();
    const [userCity, setUserCity] = useState(""); 
    const [allCities, setAllCities] = useState([]);
    const [isDetecting, setIsDetecting] = useState(true);

    // 1. Initial Setup: Load Cities + Detect Location
    useEffect(() => {
        const initializeData = async () => {
            try {
                // Fetch city list for suggestions
                const cityRes = await fetch("https://raw.githubusercontent.com/nshnt777/Indian-Cities-JSON/master/cities-by-state.json");
                const cityData = await cityRes.json();
                const flattenedCities = Object.values(cityData).flat();
                setAllCities([...new Set(flattenedCities)]); 

                // Detect current location
                const locRes = await fetch("https://ipapi.co/json/");
                const locData = await locRes.json();
                
                // Sets the internal state for the API, but we keep the search box empty
                if (locData.city) {
                    setUserCity(locData.city);
                } else {
                    setUserCity("India"); 
                }
            } catch (error) {
                setUserCity("India");
            } finally {
                setIsDetecting(false);
            }
        };
        initializeData();
    }, []);

    // 2. Fetch News based on userCity
    const { data, isLoading, isFetching } = useGetLocalNewsQuery(
        {
            location: userCity,
            page: 1,
            pageSize: 30,
        },
        { skip: isDetecting || !userCity } 
    );

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="1rem">
                <Header
                    title={`Environmental News: ${userCity}`}
                    subtitle={`Displaying news for ${userCity}. Search below to change location.`}
                />
                
                {!isDetecting && (
                    <Autocomplete
                        freeSolo
                        options={allCities}
                        // We remove 'value={userCity}' to keep the search bar empty by default
                        onChange={(event, newValue) => {
                            if (newValue) setUserCity(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                placeholder="Search city or state..." 
                                sx={{ 
                                    width: "350px",
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: theme.palette.background.alt,
                                        borderRadius: "25px", 
                                        paddingLeft: "1rem",
                                        "& fieldset": { borderColor: theme.palette.secondary[500] },
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: theme.palette.secondary[400] }} />
                                        </InputAdornment>
                                    ),
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setUserCity(e.target.value);
                                    }
                                }}
                            />
                        )}
                    />
                )}
            </Box>

            <Box mt="40px">
                {(isLoading || isFetching || isDetecting) ? (
                    <Box sx={{ width: "60%" }}>
                        <Typography variant="h6" sx={{ color: theme.palette.secondary[500], mb: "1rem" }}>
                            {isDetecting ? "DETECTING LOCATION..." : `UPDATING NEWS FOR ${userCity}...`}
                        </Typography>
                        <LinearProgress color="secondary" />
                    </Box>
                ) : data?.articles?.length > 0 ? (
                    data.articles.map((article, index) => (
                        <NewsFeedCard
                            key={`${article.url}-${index}`}
                            title={article.title}
                            content={article.description || article.content}
                            image={article.urlToImage}
                            source={article.source?.name}
                            publishedAt={article.publishedAt}
                            url={article.url}
                        />
                    ))
                ) : (
                    <Typography variant="h6" color="secondary" mt="2rem">
                        No local environmental news found for "{userCity}". 
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default LocalNews;