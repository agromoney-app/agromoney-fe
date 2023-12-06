"use client";
import { Box, Button, Card, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import Navigation from "../components/navigation2";
import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Cuaca() {
	const router = useRouter();
	const [city, setCity] = useState("");
	const [weatherData, setWeatherData] = useState<any[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCity(event.target.value);
	};

	const getWeatherDetail = (city: string, lat: number, lon: number) => {
		const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`;
		try {
			fetch(WEATHER_API_URL).then((res) => {
				res.json().then((data) => {
					console.log(data);

					//filter the forecasts to get only one forecast per day
					const uniqueForecastDays: number[] = [];
					const fiveDaysForecast = data.list.filter(
						(forecast: { dt_txt: string | number | Date }) => {
							const forecastDate = new Date(forecast.dt_txt).getDate();
							if (!uniqueForecastDays.includes(forecastDate)) {
								return uniqueForecastDays.push(forecastDate);
							}
						}
					);
					console.log(fiveDaysForecast);
					const weatherData = fiveDaysForecast.map((forecast: any) => ({
						dt_txt: forecast.dt_txt,
						main: forecast.main,
						weather: forecast.weather,
						wind: forecast.wind,
					}));
					setWeatherData(weatherData);
					console.log(weatherData);
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`;

		try {
			fetch(GEOCODING_API_URL).then((res) => {
				res.json().then((data) => {
					if (!data) {
						alert("Kota tidak ditemukan");
					}
					const { city, lat, lon } = data[0];
					getWeatherDetail(city, lat, lon);
					console.log(data);
					setCity(city);
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	const dateTextToDay = (dateText: string) => {
		let date = new Date(dateText);
		const daysOfWeek = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		let dayOfWeek = daysOfWeek[date.getDay()];
		return dayOfWeek;
	};

	return (
		<Stack
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			sx={{ width: "100vw", height: "100vh" }}
		>
			{/* TOP BAR */}
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

			{/* CONTENT */}
			<Box
				maxWidth={"sm"}
				width={1}
				display={"flex"}
				flexDirection={"column"}
				paddingX={4}
				paddingY={4}
			>
				{/* SEARCH */}
				<Box
					component={"form"}
					onSubmit={handleSubmit}
					display={"flex"}
					flexDirection={"column"}
					gap={2}
					marginBottom={4}
				>
					<TextField defaultValue={city} onChange={handleChange} fullWidth label="Kota" />
					<Button fullWidth type="submit" variant="contained">
						Cari
					</Button>
				</Box>
				{/* WEATHER DATA */}
				<Box
					maxWidth={"sm"}
					display={"flex"}
					width={"100%"}
					flexDirection={"column"}
					gap={2}
					flexWrap={"wrap"}
					justifyContent={"center"}
					overflow={"scroll"}
					marginBottom={4}
				>
					{/* MAIN */}
					{weatherData[0] && (
						<Paper
							sx={{
								backgroundColor: "#ffffff",
								height: "fit",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 2,
								paddingX: 4,
								paddingY: 8,
							}}
						>
							{/* FIRST ROW */}
							<Typography variant="h5">Today</Typography>
							{/* SECOND ROW */}
							<Stack
								direction={"row"}
								display={"flex"}
								justifyContent={"space-between"}
								alignItems={"center"}
								width={1}
							>
								<Typography variant="h3" textAlign={"center"}>
									36°C
								</Typography>
								<img
									src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather[0].icon}@2x.png`}
									alt="cuaca"
									width={120}
									height={120}
								/>
							</Stack>
							{/* THIRD ROW */}
							<Stack
								direction={"row"}
								display={"flex"}
								justifyContent={"space-between"}
								alignItems={"center"}
								width={1}
							>
								<Typography variant="caption">Wind {weatherData[0]?.wind.speed} km/h</Typography>
								<Typography variant="caption">Humidity {weatherData[0]?.main.humidity}%</Typography>
							</Stack>
						</Paper>
					)}

					{weatherData.map(
						(item, index) =>
							index !== 0 && (
								<Paper
									key={index}
									sx={{
										bgcolor: "#fff",
										display: "flex",
										padding: 2,
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Box display={"flex"} flexDirection={"column"}>
										<Typography variant="body1">
											{dateTextToDay(item.dt_txt.split(" ")[0])}
										</Typography>
										<Typography variant="caption">{item.dt_txt.split(" ")[0]}</Typography>
										<Stack direction={"row"} gap={2}>
											<Typography variant="caption">{item.wind.speed} km/j</Typography>
											<Typography variant="caption">{item.main.humidity}%</Typography>
										</Stack>
									</Box>
									<Box flexDirection={"column"} display={"flex"}>
										<Typography textAlign={"center"} variant="caption">
											{item.weather[0].description.toUpperCase()}
										</Typography>

										<Stack
											display={"flex"}
											flexDirection={"row"}
											justifyContent={"flex-end"}
											alignItems={"center"}
										>
											<Typography variant="body1">
												{Math.floor(((item.main.temp - 32) * 5) / 9)}°C
											</Typography>
											<img
												src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
												alt="cuaca"
												width={40}
												height={40}
											/>
										</Stack>
									</Box>
								</Paper>
							)
					)}
				</Box>
			</Box>
			<Navigation />
		</Stack>
	);
}
