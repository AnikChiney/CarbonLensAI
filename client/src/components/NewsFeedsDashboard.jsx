import React from "react";
import { Box, Typography } from "@mui/material";
import NewsFeedCard from "components/NewsCard";
import { useGetGlobalNewsQuery } from "state/api.js";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const NewsFeedDashboard = () => {
	const theme = useTheme();
	const { data, isLoading } = useGetGlobalNewsQuery({
		page: 1,
		pageSize: 30,
	});

	return (
		<>
			<Typography marginTop="0.5rem" fontWeight="bold" variant="h2">
				Global Environment News
			</Typography>
			<Box mt="40px" height="26.5rem" overflow="auto">
					  {data?.articles?.length > 0 ? (
					    data.articles.slice(0, 2).map((article, index) => (
					      <NewsFeedCard
					        key={index}
					        title={article.title}
					        content={article.description}
					        image={article.urlToImage}
					        source={article.source.name}
					        publishedAt={article.publishedAt}
					        url={article.url}
					      />
					    ))
					  ) : (
					    <>
					      <NewsFeedCard
					        title="🌍 Environmental Updates"
					        content="The 2015–2024 period was the warmest decade on record, with 2024 officially the hottest year. February 2026 data indicates the planet is continuing to experience record-breaking temperatures, with 2025 likely to rank among the top three warmest years."
					        image="https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVudmlyb25tZW50fGVufDB8fDB8fHww"
					        source="CarbonLens AI"
					        publishedAt={new Date().toISOString()}
					        url="#"
					      />
					      <NewsFeedCard
					        title="♻ Sustainability Matters"
					        content="The green hydrogen market is projected to grow at a Compound Annual Growth Rate (CAGR) of over 50% between 2025 and 2030, building on record-breaking solar and wind installations."
					        image="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					        source="CarbonLens AI"
					        publishedAt={new Date().toISOString()}
					        url="#"
					      />
					    </>
					  )}
			</Box>

		</>
	);
};

export default NewsFeedDashboard;
