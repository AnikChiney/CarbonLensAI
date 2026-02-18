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
					        content="Latest global environmental news will appear here shortly."
					        image={null}
					        source="CarbonLens AI"
					        publishedAt={new Date().toISOString()}
					        url="#"
					      />
					      <NewsFeedCard
					        title="♻ Sustainability Matters"
					        content="Stay tuned for climate and sustainability updates."
					        image={null}
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
