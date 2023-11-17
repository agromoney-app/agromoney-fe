"use client";
import Image from "next/image";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<Container
			maxWidth="sm"
			sx={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				height: "100vh",
				textAlign: "center",
				width: "320px",
			}}
		>
			<Typography variant="h4" component="h4">
				Growink
			</Typography>
			<Image src="/images/welcome.png" alt="logo" width={275} height={275} />
			<Typography variant="h5" component="h5" sx={{ mt: 2, textAlign: "center" }}>
				Selamat Datang
			</Typography>
			<Typography variant="caption" sx={{ mt: 2, textAlign: "center" }}>
				Di AgroMoney, Kami membantu anda mengubah lahan menjadi kesuksesan
			</Typography>
			<Button
				variant="contained"
				sx={{ mt: 2, width: "100%" }}
				onClick={() => router.push("/login")}
			>
				Login
			</Button>
			<Button
				variant="outlined"
				sx={{ mt: 2, width: "100%" }}
				onClick={() => router.push("/register")}
			>
				Register
			</Button>
		</Container>
	);
}
