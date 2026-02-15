import Home from "scenes/home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Login from "scenes/login";
import Register from "scenes/register";
import PrivateRoute from "components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "scenes/dashboard";
import EnvironmentMetrics from "scenes/environmentMetrics";

import WaterUsage from "scenes/forYou/waterUsage";
import EcofriendlyTips from "scenes/forYou/ecofriendlyTips";
import WHOstandards from "scenes/forYou/whoStandards";
import CarbonFootprint from "scenes/forYou/carbonFootprint";

import TopHeadlines from "scenes/newsAndEvents/topHeadlines";
import LocalNews from "scenes/newsAndEvents/local";
import GlobalNews from "scenes/newsAndEvents/global";

function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ToastContainer />
				<Routes>

					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Protected Routes */}
					<Route element={<PrivateRoute />}>
						<Route element={<Layout />}>
						
						{/* general */}
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/envmetrics" element={<EnvironmentMetrics />} />

						{/* For You */}
						<Route path="/water-usage" element={<WaterUsage />} />
						<Route path="/ecofriendly-tips" element={<EcofriendlyTips />} />
						<Route path="/who-standards" element={<WHOstandards />} />
						<Route path="/carbon-footprint" element={<CarbonFootprint />} />

						{/* news and events */}
						<Route path="/top-headlines" element={<TopHeadlines />} />
						<Route path="/local-news" element={<LocalNews />} />
						<Route path="/global-news" element={<GlobalNews />} />
						
						</Route>
					</Route>

				</Routes>

			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
