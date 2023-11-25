import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	Stack,
	Modal,
	Typography,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Product {
	id: number;
	name: string;
}

interface Yields {
	id: number;
	productId: number;
	product: string;
	plantingTime: string;
	harvestTime: any;
	description: string;
	quantity: number;
	isHarvested: boolean;
}
export default function PantauCard(props: { yields: Yields }) {
	const [yields, setYields] = useState<Yields[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [quantity, setQuantity] = useState(0);
	const [isHarvested, setIsHarvested] = useState(false);

	const route = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	async function getProducts() {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/products`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function getYields() {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});
			const data = await response.json();
			setYields(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getProducts();
		getYields();
	}, []);

	const isoDateString = props.yields.harvestTime;
	const isoDate = new Date(isoDateString);
	const options = { year: "numeric", month: "numeric", day: "numeric" };
	const readableDate = isoDate.toLocaleDateString("id-ID", options as Intl.DateTimeFormatOptions);

	const timeDifference = (time: any) => {
		const currentDateString = new Date().toISOString();
		const harvestDateString = new Date(time);

		const currentDate = new Date(currentDateString);
		const harvestDate = new Date(harvestDateString);

		const differenceMs = Math.abs(harvestDate.getTime() - currentDate.getTime());
		const differenceDays = differenceMs / (1000 * 60 * 60 * 24);
		return Math.floor(differenceDays);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/${props.yields.id}`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						quantity: props.yields.quantity,
						isHarvested: true,
					}),
				}
			);
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
				route.push("/home");
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

	const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.yields.quantity = parseInt(event.target.value);
	};

	return (
		<Stack direction={"column"} gap={2} padding={2} width={1} height={1} maxWidth={"sm"}>
			<Card>
				<CardContent sx={{ width: "100%" }}>
					<Stack direction={"row"} justifyContent={"space-between"}>
						<Stack direction={"column"}>
							<Typography sx={{ cursor: "default" }} variant="body1">
								{products?.find((product) => product.id === props.yields.productId)?.name}
							</Typography>
							<Typography sx={{ cursor: "default" }} variant="caption" color={"secondary.text"}>
								{props.yields.description}
							</Typography>
							{`${timeDifference(props.yields.harvestTime)} HARI` === "0 HARI" ? (
								<Typography sx={{ cursor: "default" }} color={"primary.main"} variant="caption">
									Panen {readableDate}
								</Typography>
							) : (
								<Typography sx={{ cursor: "default" }} color={"warning.main"} variant="caption">
									Panen {readableDate}
								</Typography>
							)}
						</Stack>
						<Stack justifyContent={"center"}>
							{/* <Typography color={"primary.main"} variant="body1">
															{yieldItem.quantity} Kg
														</Typography> */}
							{`${timeDifference(props.yields.harvestTime)} HARI` === "0 HARI" ? (
								<Box>
									{props.yields.isHarvested === true ? (
										<Button disabled onClick={handleOpenModal} variant="contained">
											Panen
										</Button>
									) : (
										<Button onClick={handleOpenModal} variant="contained">
											Panen
										</Button>
									)}

									<Modal open={isModalOpen} onClose={handleCloseModal}>
										<Box
											component="form"
											onSubmit={handleSubmit}
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
												Jumlah Panen
											</Typography>
											<TextField
												sx={{ my: 1 }}
												id="outlined-basic"
												label="Jumlah Panen"
												variant="outlined"
												onChange={handleChangeQuantity}
											/>
											<Button type="submit" sx={{ my: 1 }} variant="contained">
												Simpan
											</Button>
										</Box>
									</Modal>
								</Box>
							) : (
								<Chip
									sx={{
										color: "warning.main",
										borderColor: "warning.main",
										cursor: "default",
									}}
									icon={<AccessTimeIcon color="warning" />}
									label={`${timeDifference(props.yields.harvestTime)} HARI`}
									// label={remainingTime(yieldItem.harvestTime)}
									variant="outlined"
								/>
							)}
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</Stack>
	);
}
