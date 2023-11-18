"use client";
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	OutlinedInput,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { Dayjs } from "dayjs";
import Navigation from "@/app/components/navigation";
import Shortcut from "@/app/components/shortcut";

export default function CatatPertanian() {
	const [tanam, setTanam] = React.useState<Dayjs | null>(null);
	const [panen, setPanen] = React.useState<Dayjs | null>(null);
	const router = useRouter();
	return (
		<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
			<Box
				sx={{
					bgcolor: "primary.main",
					height: 45,
					width: "100%",
					alignItems: "center",
					p: 0,
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
					mt: 8,
					width: 320,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="h6" component="h6" sx={{ textAlign: "center", color: "primary.main" }}>
					Catat Data Pertanian
				</Typography>

				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { width: 320, display: "flex", flexDirection: "column" },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField required sx={{ mt: 3 }} fullWidth label="Produk" id="produk" type="text" />

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DatePicker"]}>
							<DatePicker
								views={["year", "month", "day"]}
								format="DD-MM-YYYY"
								label="Tanggal Tanam"
							/>
						</DemoContainer>
					</LocalizationProvider>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DatePicker"]}>
							<DatePicker
								views={["year", "month", "day"]}
								format="DD-MM-YYYY"
								label="Tanggal Panen"
							/>
						</DemoContainer>
					</LocalizationProvider>

					<TextField sx={{ mt: 1 }} fullWidth label="Catatan" id="catatan" type="text" />

					<TextField
						label="Jumlah Panen (kosongkan jika belum  panen)"
						id="jumlah panen"
						sx={{ mt: 1 }}
						InputProps={{
							endAdornment: <InputAdornment position="end">kg</InputAdornment>,
						}}
					/>
				</Box>

				<Button fullWidth variant="contained" sx={{ mt: 2 }}>
					Simpan
				</Button>
			</Box>

			<Shortcut />
			<Navigation />
		</Box>
	);
}
