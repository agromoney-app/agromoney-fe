"use client";

import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Navigation from "../components/navigation2";
import Search from "../components/searchCity";
import Image from "next/image";
import CurrentWeather from "../components/currentWeather";
import { useState } from "react";
import Forecast from "../components/forecast";

export default function Page() {
	const router = useRouter();
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);

	const openWeatherUrl = "https://api.openweathermap.org/data/2.5";

	const handleOnSearchChange = (searchData: any) => {
		const [lat, lon] = searchData.value.split(" ");

		const currentWeatherFetch = fetch(
			`${openWeatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}&units=metric`
		);

		const forecastFetch = fetch(
			`${openWeatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({ city: searchData.label, ...weatherResponse });
				setForecast({ city: searchData.label, ...forecastResponse });
			})
			.catch((err) => console.log(err));
	};

	return (
		<Stack
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			sx={{ width: "100vw", height: "100vh" }}
			overflow={"scroll"}
		>
			<Paper
				square
				sx={{
					bgcolor: "primary.main",

					width: "100vw",
					zIndex: 50,
				}}
			>
				<Container maxWidth={"sm"} sx={{ display: "flex" }}>
					<Button
						onClick={() => router.push("/")}
						startIcon={<ArrowBackIosNewIcon />}
						variant="text"
						sx={{ color: "#ffffff" }}
					>
						Cuaca
					</Button>
				</Container>
			</Paper>

			<Box
				maxWidth={"sm"}
				width={1}
				display={"flex"}
				flexDirection={"column"}
				paddingX={4}
				paddingY={4}
			>
				<Search onSearchChange={handleOnSearchChange} />
				{currentWeather && <CurrentWeather data={currentWeather} />}
				{forecast && <Forecast data={forecast} />}
			</Box>
			<Navigation />
		</Stack>
	);
}
