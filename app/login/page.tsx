"use client";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useState } from "react";
import Navigation from "../components/navigation";
import { useRouter } from "next/navigation";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
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
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
				}}
			>
				<Button
					variant="text"
					startIcon={<ArrowBackIosNewIcon />}
					sx={{ bgcolor: "primary.main", color: "white" }}
					onClick={() => router.push("/")}
				>
					Login
				</Button>
			</Box>

			<Box sx={{ p: 2, mt: 8, width: 320, display: "flex", flexDirection: "column" }}>
				<Typography variant="h5" component="h5">
					Masuk
				</Typography>
				<Typography variant="body1" component="p">
					Belum punya akun?{" "}
					<a href="/register" style={{ textDecoration: "none" }}>
						Buat akun
					</a>
				</Typography>

				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { width: "100%" },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField sx={{ mt: 6 }} fullWidth label="Email" id="Email" type="email" />

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
				</Box>

				<Button variant="contained" sx={{ mt: 2, width: "100%" }}>
					Login
				</Button>
			</Box>
		</Box>
	);
}
