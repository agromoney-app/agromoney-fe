"use client";
import {
	Avatar,
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import Shortcut from "@/app/components/shortcut";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";

export default function Profile() {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const [provinsi, setProvinsi] = useState("");
	const [kota, setKota] = useState("");
	const [kecamatan, setKecamatan] = useState("");
	const [kelurahan, setKelurahan] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setProvinsi(event.target.value as string);
		setKota(event.target.value as string);
		setKecamatan(event.target.value as string);
		setKelurahan(event.target.value as string);
	};

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
					Profile
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
				<Box sx={{ mt: 1, width: 320, display: "flex", justifyContent: "left" }}>
					<Typography variant="h5" component="h5">
						Data Diri
					</Typography>
				</Box>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { width: "100%" },
						mt: 1,
					}}
					noValidate
					autoComplete="off"
				>
					<Box sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
						<Avatar></Avatar>
						<Button variant="outlined" sx={{ ml: 1 }}>
							Ubah foto
						</Button>
					</Box>

					<TextField sx={{ mt: 1 }} fullWidth label="Nama Lengkap" id="Nama Lengkap" type="text" />
					<TextField
						sx={{ mt: 1 }}
						fullWidth
						label="Nomor Telepon"
						id="Nomor Telepon"
						type="number"
					/>
					<TextField sx={{ mt: 1 }} fullWidth label="Email" id="Email" type="email" />

					<FormControl required sx={{ mt: 2, width: "100%" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>

					<Box sx={{ mt: 2, width: 320, display: "flex", justifyContent: "left" }}>
						<Typography variant="h5" component="h5">
							Domisili
						</Typography>
					</Box>

					<FormControl fullWidth sx={{ mt: 1 }}>
						<InputLabel id="select-label-provinsi">Provinsi</InputLabel>
						<Select
							labelId="select-label-provinsi"
							id="select-label-provinsi"
							value={provinsi}
							label="Provinsi"
							onChange={handleChange}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth sx={{ mt: 1 }}>
						<InputLabel id="select-label-kota">Kota</InputLabel>
						<Select
							labelId="select-label-kota"
							id="select-label-kota"
							value={kota}
							label="Kota"
							onChange={handleChange}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth sx={{ mt: 1 }}>
						<InputLabel id="simple-select-kecamatan">Kecamatan</InputLabel>
						<Select
							labelId="simple-select-kecamatan"
							id="simple-select-kecamatan"
							value={kecamatan}
							label="Kecamatan"
							onChange={handleChange}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth sx={{ mt: 1 }}>
						<InputLabel id="simple-select-kelurahan">Kelurahan</InputLabel>
						<Select
							labelId="simple-select-kelurahan"
							id="simple-select-kelurahan"
							value={kelurahan}
							label="Kelurahan"
							onChange={handleChange}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>

					<TextField
						sx={{ mt: 1 }}
						fullWidth
						id="Alamat"
						label="Alamat"
						placeholder="Alamat"
						multiline
					/>
				</Box>
				<Button fullWidth variant="contained" sx={{ mt: 2, mb: 10 }}>
					Simpan
				</Button>
			</Box>

			<Shortcut />
			<Navigation />
		</Box>
	);
}
