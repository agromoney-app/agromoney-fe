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
import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Navigation from "@/app/components/navigation2";
import { Transaction } from "@/app/interfaces/interface";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
	const [active, setActive] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Transaction>();

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const [date, setDate] = useState<Date | null>();
	const handleDateChange = (date: Date | null) => {
		setDate(date);
	};

	const submit: SubmitHandler<Transaction> = (data) =>
		console.log({ date: date, description: data.description });

	const categories = [
		{ id: 0, label: "Benih dan Tanaman" },
		{ id: 1, label: "Pupuk dan Pembenah Tanah" },
		{ id: 2, label: "Pestisida dan Herbisida" },
		{ id: 3, label: "Peralatan dan Mesin" },
		{ id: 4, label: "Bahan Bakar dan Energi" },
		{ id: 5, label: "Tenaga Kerja" },
		{ id: 6, label: "Air" },
		{ id: 7, label: "Perbaikan dan Pemeliharaan" },
		{ id: 8, label: "Pengemasan dan Transportasi" },
		{ id: 9, label: "Asuransi" },
		{ id: 10, label: "Pemasaran dan Penjualan" },
		{ id: 11, label: "Utilitas" },
		{ id: 12, label: "Pendidikan dan Pelatihan" },
		{ id: 13, label: "Pajak dan Izin" },
	];
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
			<Stack
				maxWidth={"sm"}
				width={1}
				height={1}
				bgcolor={"#FFFFFF"}
				padding={2}
				alignItems={"center"}
				paddingBottom={10}
			>
				{/* <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          padding={2}
          height={1}
        > */}
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
				{/* VALUE */}
				{/* <Box marginY={5}> */}
				<Typography
					onClick={handleOpenModal}
					variant="h4"
					color={"primary.main"}
					marginTop={"auto"}
				>
					Rp 0
				</Typography>

				{/* MODAL */}
				<Modal open={isModalOpen} onClose={handleCloseModal}>
					<Box
						maxWidth={"sm"}
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
						/>
						<Button sx={{ my: 1 }} variant="contained">
							Simpan
						</Button>
					</Box>
				</Modal>
				{/* FORM */}
				<Stack direction={"column"} width={"100%"} gap={2} marginTop={"auto"}>
					{/* DATE */}

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DatePicker"]}>
							<DatePicker
								label="Tanggal transaksi"
								value={date}
								onChange={(newDate) => setDate(newDate)}
							/>
						</DemoContainer>
					</LocalizationProvider>
					{/* JENIS */}
					<Select value={selectedCategory} label="Jenis pengeluaran">
						{categories.map((category) => (
							<MenuItem key={category.id} onClick={() => setSelectedCategory(category.label)}>
								{category.label}
							</MenuItem>
						))}
					</Select>

					{/* DESKRIPSI */}
					<TextField
						id="description"
						label="Deskripsi (opsional)"
						variant="outlined"
						fullWidth
						defaultValue={""}
						{...register("description")}
					/>
					<Button variant="contained" size="large" onClick={handleSubmit(submit)}>
						Simpan
					</Button>
				</Stack>
			</Stack>
			<Navigation />
		</Stack>
	);
}
