"use client";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Navigation from "../components/navigation";
import { useRouter } from "next/navigation";

export default function Register() {
	const router = useRouter();
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
			<Box
				sx={{
					bgcolor: "primary.main",
					height: 40,
					width: "100%",
					p: 0,
				}}
			>
				<Button
					variant="text"
					startIcon={<ArrowBackIosNewIcon />}
					sx={{ bgcolor: "primary.main", color: "white" }}
					onClick={() => router.push("/")}
				>
					Register
				</Button>
			</Box>

			<Box sx={{ p: 0, mt: 8, width: 320, display: "flex", flexDirection: "column" }}>
				<Typography variant="h5" component="h5">
					Register
				</Typography>
				<Typography variant="body1" component="p">
					Sudah punya akun? <a href="/login">Login</a>
				</Typography>

				<form action="">
					<TextField required sx={{ mt: 6 }} fullWidth label="Name" id="name" type="text" />
					<TextField sx={{ mt: 2 }} fullWidth label="Phone number" id="phoneNumber" type="text" />
					<TextField required sx={{ mt: 2 }} fullWidth label="Email" id="email" type="email" />
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
				</form>

				<Button variant="contained" sx={{ mt: 2, width: "100%" }}>
					Register
				</Button>
			</Box>
			<Navigation />
		</Box>
	);
}
