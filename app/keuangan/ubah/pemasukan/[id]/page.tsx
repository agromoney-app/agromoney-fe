"use client";

import {
	Autocomplete,
	Box,
	Button,
	ButtonGroup,
	Container,
	MenuItem,
	Modal,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import TopBar from "@/app/components/TopBar";
import { useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navigation from "@/app/components/navigation2";

import dayjs, { Dayjs } from "dayjs";

export default function Page({ params }: { params: { id: string } }) {
	const [active, setActive] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [transactionTime, setTransactionTime] = useState("");
	const [selectedTransactionTime, setSelectedTransactionTime] = useState(new Date(transactionTime));
	const [selectedTransactionDate, setSelectedTransactionDate] = useState<Dayjs | null>(null);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleTransactionDateChange = (date: any) => {
		setSelectedTransactionDate(date);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSubmitAmount = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAmount(parseInt(event.currentTarget.amount.value));
		handleCloseModal();
	};

	async function getTransaction() {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVICE_BASE}/transactions/${params.id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			const data = await response.json();
			setAmount(data.amount);
			setDescription(data.description);
			const dt = convertDateDes(data.transactionTime);
			setTransactionTime(dt);
			setSelectedTransactionDate(dayjs(dt));
			console.log(dt);

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	const convertDateDes = (isoDate: string) => {
		const date = new Date(isoDate);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		if (month < 10) {
			return `${year}-0${month}-${day}`;
		}
		if (day < 10) {
			return `${year}-${month}-0${day}`;
		}
		console.log(`${year}-${month}-${day}`);

		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		if (transactionTime) {
			setSelectedTransactionDate(dayjs(transactionTime));
		}
	}, [transactionTime]);

	useEffect(() => {
		getTransaction();
	}, [params.id]);

	useEffect(() => {
		setAmount(amount);
	});

	return (
		// PAGE
		<Stack
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			padding={0}
			height={"100vh"}
		>
			{/* TOPBAR */}
			<TopBar />

			{/* CONTENT */}

			<Modal open={isModalOpen} onClose={handleCloseModal}>
				<Box
					maxWidth={"sm"}
					component={"form"}
					onSubmit={handleSubmitAmount}
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						borderRadius: "10px",
						boxShadow: 24,
						p: 4,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography sx={{ my: 1 }} id="modal-modal-title" variant="h6" component="h2">
						Jumlah Pengeluaran
					</Typography>
					<TextField
						sx={{ my: 1 }}
						id="outlined-basic"
						label="Jumlah Pengeluaran"
						variant="outlined"
						type="number"
						name="amount"
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
					<Button type="submit" sx={{ my: 1 }} variant="contained">
						Simpan
					</Button>
				</Box>
			</Modal>
			<Stack
				maxWidth={"sm"}
				component={"form"}
				width={1}
				height={1}
				bgcolor={"#FFFFFF"}
				padding={2}
				alignItems={"center"}
				paddingBottom={10}
			>
				{/* TOP */}
				<Typography variant="h6" color={"primary.main"} marginBottom={2}>
					Ubah Pemasukan
				</Typography>

				<Typography
					onClick={handleOpenModal}
					variant="h4"
					color={"primary.main"}
					marginTop={"auto"}
					sx={{ cursor: "pointer" }}
				>
					{Number(amount).toLocaleString("id-ID", {
						currency: "IDR",
						style: "currency",
					})}
				</Typography>

				{/* MODAL */}

				{/* FORM */}

				<Typography sx={{ my: 1 }} id="modal-modal-title" variant="h6" component="h2"></Typography>
				<Stack direction={"column"} width={"100%"} gap={2} marginTop={"auto"}>
					{/* DATE */}
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							format="DD/MM/YYYY"
							label="Tanggal transaksi"
							value={selectedTransactionDate}
							onChange={(date) => handleTransactionDateChange(date)}
						/>
					</LocalizationProvider>

					{/* DESKRIPSI */}
					<TextField
						id="description"
						label="Deskripsi (opsional)"
						variant="outlined"
						fullWidth
						value={description}
						name="description"
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button variant="contained" size="large" type="submit">
						Simpan
					</Button>
				</Stack>
				{/* </Stack> */}
			</Stack>
			<Navigation />
		</Stack>
	);
}
