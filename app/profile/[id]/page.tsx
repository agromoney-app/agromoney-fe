"use client";
import {
	Avatar,
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
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import Shortcut from "@/app/components/shortcut";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	async function getUser() {
		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/user/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		setName(data.name);
		setEmail(data.email);
		setPhoneNumber(data.phoneNumber);
		console.log(response);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/user/me`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
					phoneNumber,
				}),
			});
			console.log(response);

			if (!response.ok) {
				const error = await response.json();
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			} else {
				const data = await response.json();
				console.log("Response data: ", data);
				toast.success("User updated successfully!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

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
				<ToastContainer />
				<Box sx={{ mt: 3, width: 320, display: "flex", justifyContent: "left" }}>
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
					onSubmit={handleSubmit}
				>
					<Box sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
						<Avatar></Avatar>
						<Button variant="outlined" sx={{ ml: 1 }}>
							Ubah foto
						</Button>
					</Box>

					<TextField
						sx={{ mt: 1 }}
						fullWidth
						label="Nama Lengkap"
						id="Nama Lengkap"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						sx={{ mt: 1 }}
						fullWidth
						label="Nomor Telepon"
						id="Nomor Telepon"
						type="number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<TextField
						sx={{ mt: 1 }}
						fullWidth
						label="Email"
						id="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<FormControl required sx={{ mt: 2, width: "100%" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 10 }}>
						Simpan
					</Button>
				</Box>
			</Box>

			<Shortcut />
			<Navigation />
		</Box>
	);
}
