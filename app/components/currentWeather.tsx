import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const CurrentWeather = ({ data }: { data: any }) => {
	const date = new Date(data.dt * 1000);

	return (
		<Box>
			<Paper
				sx={{
					my: 2,
					p: 2,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Box>
						<Typography variant="h5" component="h5" sx={{}}>
							{data.city}
						</Typography>
					</Box>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography
							variant="h3"
							component="h3"
							sx={{ textAlign: "center", display: "flex", alignItems: "center" }}
						>
							<DeviceThermostatIcon sx={{ width: 40, height: 40 }} />
							{Math.round(data.main.temp)} °C
						</Typography>
						<Typography variant="body1">Wind : {data.wind.speed} m/s</Typography>
						<Typography variant="body1">Humidity : {Math.round(data.main.humidity)} %</Typography>
						<Typography variant="body1">Preasure : {data.main.pressure} hPa</Typography>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Image src={`/icons/${data.weather[0].icon}.png`} alt="logo" width={120} height={120} />
						<Typography variant="body1">{data.weather[0].description} </Typography>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};
export default CurrentWeather;
