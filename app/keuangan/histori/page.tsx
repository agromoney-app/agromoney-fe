"use client";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navigation from "../../components/navigation2";
import TuneIcon from "@mui/icons-material/Tune";
import TopBar from "@/app/components/TopBar";
import axios from "axios";
import TransactionCard from "@/app/components/TransactionCard";

export default function Page() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYjkzMDdmNy00NGRmLTRlYTEtYWNkYy04YWI4YTBkMGIzYTAiLCJpYXQiOjE3MDA3NTI2ODksImV4cCI6MTcwMDgzOTA4OX0.LaVrCwByaDqOzQKfaoaNyP0j_AqZl-FNSy5SouqqE9g";
  const BACKEND_URL = "https://growink-api.up.railway.app/";

  const [open, setOpen] = useState("histori");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpen(newValue);
  };

  const [transactions, setTransactions] = useState();

  async function getTransactions() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  // const fetchHistory = async () => {
  //   const response = await axios.get(BACKEND_URL + "transactions/", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   console.log(response.data);
  // };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    // PAGE
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ width: "100vw", height: "100vh" }}
    >
      {/* TOP BAR */}
      <Paper
        square
        sx={{
          bgcolor: "primary.main",
          width: "100vw",
          zIndex: 50,
        }}
      >
        <Container
          maxWidth={"sm"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="text" sx={{ color: "#ffffff" }}>
            Keuangan
          </Button>
          <IconButton
            sx={{ color: "#ffffff" }}
            onClick={() => (window.location.href = "/keuangan/histori/filter")}
          >
            <TuneIcon />
          </IconButton>
        </Container>
      </Paper>

      {/* TABS */}
      <Stack width={1} maxWidth={"sm"}>
        <Tabs value={open} onChange={handleChange} variant="fullWidth">
          <Tab value="statistik" label="Statistik" disabled />
          <Tab value="histori" label="Histori" />
        </Tabs>
      </Stack>

      {/* HISTORY CONTAINER */}
      <Stack
        direction={"column"}
        gap={2}
        padding={2}
        width={1}
        height={1}
        maxWidth={"sm"}
      >
        <Typography variant="overline" marginBottom={-2}>
          Senin 23 November 2023
        </Typography>

        {/* CARD */}
        <TransactionCard />
        {/* <Paper>
          <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
            <Stack direction={"column"}>
              <Typography variant="body1">Benih dan tanaman</Typography>
              <Typography variant="caption" color={"secondary.text"}>
                Pengeluaran
              </Typography>
              <Typography variant="caption">Beli benih tanaman kopi</Typography>
            </Stack>
            <Stack justifyContent={"center"}>
              <Typography variant="body1" color={"error"}>
                -Rp45.000.000
              </Typography>
            </Stack>
          </Stack>
        </Paper> */}

        {/* CARD */}
        <Paper>
          <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
            <Stack direction={"column"}>
              <Typography variant="body1">Benih dan tanaman</Typography>
              <Typography variant="caption">Pengeluaran</Typography>
              <Typography variant="caption">Beli benih tanaman kopi</Typography>
            </Stack>
            <Stack justifyContent={"center"}>
              <Typography variant="body1" color="success">
                +Rp50.000.000
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Navigation />
    </Stack>
  );
}
