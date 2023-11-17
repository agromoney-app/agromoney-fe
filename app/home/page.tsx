"use client";
import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import AccountMenu from "../components/accountMenu";
import Navigation from "../components/navigation";
import Shortcut from "../components/shortcut";

export default function Login() {
	const router = useRouter();

	return (
		<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
			<Box
				sx={{
					bgcolor: "primary.main",
					height: 50,
					width: "100%",
					p: 0,
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
			<Shortcut />
			<Navigation />
		</Box>
	);
}
