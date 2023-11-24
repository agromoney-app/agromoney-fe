"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Shortcut from "../components/shortcut";
import Navigation from "../components/navigation2";
import TuneIcon from "@mui/icons-material/Tune";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { daysToWeeks } from "date-fns";

interface Product {
  id: number;
  name: string;
}

interface Yields {
  id: number;
  productId: number;
  product: string;
  plantingTime: string;
  harvestTime: string;
  description: string;
  quantity: number;
}

export default function Pertanian() {
  const router = useRouter();
  const [value, setValue] = useState("2");
  const [products, setProducts] = useState<Product[]>([]);
  const [yields, setYields] = useState<Yields[]>([]);
  const currentDate = new Date();

  const timeDifference = (time: any) => {
    const currentDateString = new Date().toISOString();
    const harvestDateString = new Date(time);

    const currentDate = new Date(currentDateString);
    const harvestDate = new Date(harvestDateString);

    const differenceMs = Math.abs(
      harvestDate.getTime() - currentDate.getTime()
    );
    const differenceDays = differenceMs / (1000 * 60 * 60 * 24);
    return Math.floor(differenceDays);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getYields() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
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

  var isoDateplantsString = yields[0]?.plantingTime;
  const isoDatePlats = new Date(isoDateplantsString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDatePlants = isoDatePlats.toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions
  );

  var isoDateharvestString = yields[0]?.harvestTime;
  const isoDateHarvest = new Date(isoDateharvestString);
  const formattedDateHarvest = isoDateHarvest.toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions
  );

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Paper
        square
        sx={{
          bgcolor: "primary.main",
          width: "100vw",
          zIndex: 50,
          position: "fixed",
        }}
      >
        <Container
          maxWidth={"sm"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => router.push("/home")}
            startIcon={<ArrowBackIosNewIcon />}
            variant="text"
            sx={{ color: "#ffffff" }}
          >
            Pertanian
          </Button>
        </Container>
      </Paper>

      <Box
        maxWidth={"sm"}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1", mt: 6 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                centered
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab label="Statistik" value="1" />
                <Tab label="History" value="2" />
                <Tab label="Pantau" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Statistik</TabPanel>
            <TabPanel value="2">
              <Stack
                direction={"column"}
                gap={2}
                padding={2}
                width={1}
                height={1}
                maxWidth={"sm"}
              >
                {yields?.map(
                  (yieldItem) =>
                    yieldItem.quantity > 0 && (
                      <Card key={yieldItem.id}>
                        <CardActions
                          onClick={() =>
                            (window.location.href = `/pertanian/update-catatan/${yieldItem.id}`)
                          }
                          sx={{ cursor: "pointer" }}
                        >
                          <CardContent sx={{ width: "100%" }}>
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Stack direction={"column"}>
                                <Typography variant="body1">
                                  {
                                    products?.find(
                                      (product) =>
                                        product.id === yieldItem.productId
                                    )?.name
                                  }
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color={"secondary.text"}
                                >
                                  {yieldItem.description}
                                </Typography>
                                <Typography
                                  color={"primary.main"}
                                  variant="caption"
                                >
                                  Panen {formattedDateHarvest}
                                </Typography>
                              </Stack>
                              <Stack justifyContent={"center"}>
                                <Typography
                                  color={"primary.main"}
                                  variant="body1"
                                >
                                  {yieldItem.quantity} kg
                                </Typography>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </CardActions>
                      </Card>
                    )
                )}
              </Stack>
            </TabPanel>
            <TabPanel value="3">
              <Stack
                direction={"column"}
                gap={2}
                padding={2}
                width={1}
                height={1}
                maxWidth={"sm"}
              >
                {yields?.map(
                  (yieldItem) =>
                    yieldItem.quantity == 0 && (
                      <Card key={yieldItem.id}>
                        <CardActions
                          onClick={() =>
                            (window.location.href = `/pertanian/update-catatan/${yieldItem.id}`)
                          }
                          sx={{ cursor: "pointer" }}
                        >
                          <CardContent sx={{ width: "100%" }}>
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Stack direction={"column"}>
                                <Typography variant="body1">
                                  {
                                    products?.find(
                                      (product) =>
                                        product.id === yieldItem.productId
                                    )?.name
                                  }
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color={"secondary.text"}
                                >
                                  {yieldItem.description}
                                </Typography>
                                <Typography
                                  color={"warning.main"}
                                  variant="caption"
                                >
                                  Panen {formattedDateHarvest}
                                </Typography>
                              </Stack>
                              <Stack justifyContent={"center"}>
                                {/* <Typography color={"primary.main"} variant="body1">
															{yieldItem.quantity} Kg
														</Typography> */}
                                <Chip
                                  sx={{
                                    color: "warning.main",
                                    borderColor: "warning.main",
                                  }}
                                  icon={<AccessTimeIcon color="warning" />}
                                  label={`${timeDifference(
                                    yieldItem.harvestTime
                                  )} HARI`}
                                  // label={remainingTime(yieldItem.harvestTime)}
                                  variant="outlined"
                                />
                              </Stack>
                            </Stack>
                          </CardContent>
                        </CardActions>
                      </Card>
                    )
                )}
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>

      <Navigation />
    </Box>
  );
}
