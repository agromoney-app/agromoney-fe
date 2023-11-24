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
import { useForm, SubmitHandler } from "react-hook-form";
import { Transaction } from "@/app/interfaces/interface";
import style from "styled-jsx/style";
import dayjs, { Dayjs } from "dayjs";

export default function Page() {
	const [active, setActive] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Transaction>();

	const [date, setDate] = useState<Date | null>();
	const handleDateChange = (date: Date | null) => {
		setDate(date);
	};

	const submit: SubmitHandler<Transaction> = (data) =>
		console.log({ date: date, description: data.description });

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
					<Button onClick={() => (window.location.href = "/keuangan/catat/pengeluaran")}>
						Pengeluaran
					</Button>
					<Button variant="contained">Pemasukan</Button>
				</ButtonGroup>

				{/* VALUE */}
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
							Jumlah Pemasukan
						</Typography>
						<TextField
							sx={{ my: 1 }}
							id="outlined-basic"
							label="Jumlah Pemasukan"
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
								format="DD/MM/YYYY"
							/>
						</DemoContainer>
					</LocalizationProvider>

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
				{/* </Stack> */}
			</Stack>
			<Navigation />
		</Stack>
	);
}
