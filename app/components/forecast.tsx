import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { WiHumidity } from "react-icons/wi";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const Forecast = ({ data }: { data: any }) => {
	const dayInAWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInAWeek)
	);

	return (
		<>
			{data.list.slice(0, 7).map((item: any, idx: number) => (
				<Paper
					key={idx}
					sx={{
						bgcolor: "#fff",
						display: "flex",
						padding: 2,
						justifyContent: "space-between",
						alignItems: "center",
						my: 1,
					}}
				>
					<Box display={"flex"} flexDirection={"column"}>
						<Typography variant="body1">{forecastDays[idx]}</Typography>

						<Stack direction={"row"} gap={2}>
							<Typography variant="caption">Wind :{item.wind.speed} m/s</Typography>
							<Typography variant="caption">Humidity :{item.main.humidity}%</Typography>
							<Typography variant="caption">Preasure :{item.main.pressure} hPa</Typography>
						</Stack>
					</Box>
					<Box flexDirection={"column"} display={"flex"}>
						<Typography textAlign={"center"} variant="caption">
							{item.weather[0].description}
						</Typography>

						<Stack
							display={"flex"}
							flexDirection={"row"}
							justifyContent={"flex-end"}
							alignItems={"center"}
						>
							<Typography variant="body1">{Math.round(item.main.temp)} °C</Typography>
							<Image
								src={`/icons/${item.weather[0].icon}.png`}
								alt="cuaca"
								width={40}
								height={40}
							/>
						</Stack>
					</Box>
				</Paper>
			))}
		</>
	);
};

export default Forecast;
