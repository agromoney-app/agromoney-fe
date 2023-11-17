import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import GrassIcon from "@mui/icons-material/Grass";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Navigation() {
	const [value, setValue] = React.useState("recents");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<BottomNavigation
			sx={{ width: 320, position: "fixed", bottom: 0, backgroundColor: "Background" }}
			value={value}
			onChange={handleChange}
		>
			<BottomNavigationAction label="home" value="home" icon={<HomeIcon />} />
			<BottomNavigationAction label="Grow" value="Grow" icon={<GrassIcon />} />
			<BottomNavigationAction label="Finance" value="Finance" icon={<AttachMoneyIcon />} />
			<BottomNavigationAction label="Weather" value="Weather" icon={<ThunderstormIcon />} />
		</BottomNavigation>
	);
}
