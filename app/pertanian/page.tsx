"use client";
import { Box, Button, InputAdornment, Tabs, TextField } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Shortcut from "../components/shortcut";
import Navigation from "../components/navigation";

export default function Pertanian() {
	const router = useRouter();

	const [value, setValue] = useState("2");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
			<Box
				sx={{
					bgcolor: "primary.main",
					height: 45,
					width: "100%",
					alignItems: "center",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					zIndex: 2,
					position: "fixed",
				}}
			>
				<Button
					variant="text"
					startIcon={<ArrowBackIosNewIcon />}
					sx={{ bgcolor: "primary.main", color: "white" }}
					onClick={() => router.push("/home")}
				>
					Catat
				</Button>
			</Box>

			<Box
				sx={{
					mt: 6,
					width: 320,
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Box sx={{ width: 320, typography: "body1" }}>
					<TabContext value={value}>
						<TabList
							sx={{ justifyItems: "space-between" }}
							onChange={handleChange}
							aria-label="lab API tabs example"
						>
							<Tab label="Statistik" value="1" />
							<Tab label="History" value="2" />
							<Tab label="Pantau" value="3" />
						</TabList>

						<TabPanel sx={{ p: 0, mt: 3 }} value="1">
							Statistik
						</TabPanel>
						<TabPanel sx={{ p: 0, mt: 3 }} value="2">
							History
						</TabPanel>
						<TabPanel sx={{ p: 0, mt: 3 }} value="3">
							Pantau
						</TabPanel>
					</TabContext>
				</Box>
			</Box>

			<Shortcut />
			<Navigation />
		</Box>
	);
}
