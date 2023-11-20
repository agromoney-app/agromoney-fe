"use client";
import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
import AccountMenu from "../components/accountMenu";
import Navigation from "../components/navigation";
import Shortcut from "../components/shortcut";

export default function Home() {
	const router = useRouter();

	async function getUser() {
		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/user/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
		});
		console.log(response);
	}

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

					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
					px: 2,
				}}
			>
				<Typography sx={{ cursor: "pointer", bgcolor: "primary.main", color: "white" }}>
					Home
				</Typography>
				<AccountMenu />
			</Box>

			<Box sx={{ mt: 2, width: 320 }}>
				<Box
					sx={{
						backgroundColor: "#ffffff",
						height: 80,
						alignItems: "center",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						borderRadius: 2,
					}}
				>
					<Typography variant="caption">Total Saldo</Typography>

					<Typography variant="h5" component="h5">
						Rp. 1000.000
					</Typography>
				</Box>

				<Box
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						flexDirection: "row",
						gap: 1,
					}}
				>
					<Box
						sx={{
							mt: 1,
							backgroundColor: "#ffffff",
							height: 80,
							width: "50%",
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							borderRadius: 2,
						}}
					>
						<Typography variant="caption">Total Pemasukan</Typography>
						<Typography variant="body1" component="p" sx={{ color: "success.main" }}>
							+ Rp. 2000.000
						</Typography>
					</Box>

					<Box
						sx={{
							mt: 1,
							backgroundColor: "#ffffff",
							height: 80,
							width: "50%",
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							borderRadius: 2,
						}}
					>
						<Typography variant="caption">Total Pengeluaran</Typography>
						<Typography variant="body1" component="p" sx={{ color: "error.main" }}>
							- Rp. 1000.000
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box sx={{ mt: 1, width: 320, display: "flex", justifyContent: "left" }}>
				<Typography variant="caption">Transaksi terakhir</Typography>
			</Box>

			<Box sx={{ mt: 1, width: 320 }}>
				<Box
					sx={{
						backgroundColor: "#ffffff",
						height: 80,
						alignItems: "center",
						display: "flex",
						justifyContent: "space-between",
						px: 2,
						flexDirection: "row",
						borderRadius: 2,
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography variant="body1" component="p">
							Benih dan Tanaman
						</Typography>
						<Typography variant="caption">Pengeluaran</Typography>
						<Typography variant="caption">Beli benih tanaman Kopi</Typography>
					</Box>

					<Typography variant="body1" component="p" sx={{ color: "error.main" }}>
						- Rp. 1000.000
					</Typography>
				</Box>
			</Box>

			<Button sx={{ mt: 1, width: 320 }} variant="contained">
				Lihat History Keuangan
			</Button>

			<Box sx={{ mt: 1, width: 320, display: "flex", justifyContent: "left" }}>
				<Typography variant="caption">Panen terakhir</Typography>
			</Box>

			<Box sx={{ mt: 1, width: 320 }}>
				<Box
					sx={{
						backgroundColor: "#ffffff",
						height: 80,
						alignItems: "center",
						display: "flex",
						justifyContent: "space-between",
						px: 2,
						flexDirection: "row",
						borderRadius: 1,
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography variant="body1" component="p">
							Nasi Putih
						</Typography>
						<Typography variant="caption">Nasi Putih lahan A</Typography>
						<Typography sx={{ color: "warning.main" }} variant="caption">
							Panen 20 November 2023
						</Typography>
					</Box>

					<Chip
						sx={{ color: "warning.main", borderColor: "warning.main" }}
						icon={<AccessTimeIcon color="warning" />}
						label="2 Minggu"
						variant="outlined"
					/>
				</Box>
			</Box>

			<Button sx={{ mt: 1, width: 320 }} variant="contained">
				Lihat History Keuangan
			</Button>

			<Shortcut />
			<Navigation />
		</Box>
	);
}
