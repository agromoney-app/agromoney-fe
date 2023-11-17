"use client";
import { Box, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import Shortcut from "@/app/components/shortcut";
export default function Profile() {
	const router = useRouter();
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
					Profile
				</Button>
			</Box>
			<Shortcut />
			<Navigation />
		</Box>
	);
}
