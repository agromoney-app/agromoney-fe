"use client";

import {
	Autocomplete,
	Box,
	Button,
	ButtonGroup,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import TopBar from "@/app/components/TopBar";
import { useEffect, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Navigation from "@/app/components/navigation2";
import { SubmitHandler, useForm } from "react-hook-form";

interface Categories {
	id: number;
	name: string;
}

interface Transaction {
	amount: number;
	date: Date;
	description: string;
	categoryId: number;
	categories: {
		id: number;
		name: string;
	};
}

export default function Page() {
	const [active, setActive] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [categories, setCategories] = useState<Categories[]>([]);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [description, setDescription] = useState("");
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [date, setDate] = useState<Date | null>(null);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedCategory(event.target.value as string);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSubmitAmount = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAmount(parseInt(event.currentTarget.amount.value));
		handleCloseModal();
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/transactions`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify({
					transactionTime: date,
					amount: amount,
					type: "EXPENSE",
					description: description,
					categoryId: categories.find((category) => category.name === selectedCategory)?.id,
					categories: {
						id: categories.find((category) => category.name === selectedCategory)?.id,
						name: selectedCategory,
					},
				}),
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	async function getCategories() {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVICE_BASE}/transactions/categories`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getCategories();
	}, []);

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
				onSubmit={handleSubmit}
				component={"form"}
				maxWidth={"sm"}
				width={1}
				height={1}
				bgcolor={"#FFFFFF"}
				padding={2}
				alignItems={"center"}
				paddingBottom={10}
			>
				{/* TOP */}
				<Typography variant="h6" color={"primary.main"} marginBottom={2}>
					Transaksi Baru
				</Typography>
				<ButtonGroup>
					<Button variant="contained">Pengeluaran</Button>
					<Button onClick={() => (window.location.href = "/keuangan/catat/pemasukan")}>
						Pemasukan
					</Button>
				</ButtonGroup>

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
				<Stack direction={"column"} width={"100%"} gap={2} marginTop={"auto"}>
					{/* DATE */}

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker label="Tanggal transaksi" value={date} onChange={setDate} />
					</LocalizationProvider>
					{/* JENIS */}
					<FormControl sx={{ my: 1 }} fullWidth>
						<InputLabel id="categorySelected">Category</InputLabel>
						<Select
							onChange={handleChange}
							value={selectedCategory}
							labelId="categorySelected"
							label="Category"
						>
							{categories?.map((category) => (
								<MenuItem key={category.id} value={category.name}>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* DESKRIPSI */}
					<TextField
						id="description"
						label="Deskripsi (opsional)"
						variant="outlined"
						fullWidth
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button variant="contained" size="large" type="submit">
						Simpan
					</Button>
				</Stack>
			</Stack>
			<Navigation />
		</Stack>
	);
}
