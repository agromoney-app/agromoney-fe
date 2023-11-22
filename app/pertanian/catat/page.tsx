"use client";
import {
	Box,
	Button,
	Container,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import Navigation from "@/app/components/navigation2";
import Shortcut from "@/app/components/shortcut";
import { ToastContainer } from "react-toastify";

export default function CatatPertanian() {
	const [selectedProduct, setSelectedProduct] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedProduct(event.target.value as string);
	};

	const router = useRouter();

	const products = [
		{ id: 0, value: "Bulir" },
		{ id: 1, value: "Biji minyak" },
		{ id: 2, value: "Buah dan sayur" },
		{ id: 3, value: "Kacang-kacangan" },
		{ id: 4, value: "Gula dan Pemanis" },
		{ id: 5, value: "Kopi dan Teh" },
		{ id: 6, value: "Rempah-rempah" },
	];
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
				<Container maxWidth={"sm"} sx={{ display: "flex", justifyContent: "space-between" }}>
					<Button
						onClick={() => router.push("/")}
						startIcon={<ArrowBackIosNewIcon />}
						variant="text"
						sx={{ color: "#ffffff" }}
					>
						Catat Pertanian
					</Button>
				</Container>
			</Paper>

			{/* CONTENT */}
			<Typography
				variant="h6"
				component="h6"
				sx={{ textAlign: "center", color: "primary.main", my: 3 }}
			>
				Catat Data Pertanian
			</Typography>
			<Box
				component="form"
				sx={{
					"& .MuiTextField-root": { width: "100%" },
				}}
				noValidate
				autoComplete="off"
			>
				<FormControl sx={{ my: 1 }} fullWidth>
					<InputLabel id="produkSelected">Produk</InputLabel>
					<Select
						onChange={handleChange}
						value={selectedProduct}
						labelId="produkSelected"
						label="Produk"
					>
						{products.map((product) => (
							<MenuItem key={product.id} value={product.value}>
								{product.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Stack sx={{ my: 1 }} direction={"row"} justifyContent={"space-between"} gap={2}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker label="Tanggal Tanam" />
					</LocalizationProvider>
					<Typography
						variant="h6"
						component="h6"
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						-
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker label="Tanngal Panen" />
					</LocalizationProvider>
				</Stack>

				<TextField sx={{ my: 1 }} fullWidth label="Catatan" id="catatan" type="text" />
				<TextField
					sx={{ my: 1 }}
					fullWidth
					label="Jumlah Panen (kosongkan jika belum  panen)"
					id="jumlah panen"
					type="number"
					InputProps={{
						endAdornment: <InputAdornment position="end">kg</InputAdornment>,
					}}
				/>

				<Button type="submit" variant="contained" sx={{ width: "100%", my: 1 }}>
					Simpan
				</Button>
			</Box>
			<Navigation />
		</Stack>
	);
}
