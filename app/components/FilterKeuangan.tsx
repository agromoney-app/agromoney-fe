import { useEffect, useState } from "react";
import React from "react";

import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TransactionCategory } from "../interfaces/interface";

export default function FilterKeuangan(props: {
  categories: TransactionCategory[];
  selectedCategory: string;
  setSelectedCategory: any;
  getFilteredTransaction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      {/* BUTTON */}
      <IconButton sx={{ color: "#ffffff" }} onClick={handleClickOpen}>
        <TuneIcon />
      </IconButton>
      {/* DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Filter"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DialogContentText>Tanggal</DialogContentText>
          <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Dari" />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Hingga" />
            </LocalizationProvider>
          </Stack>

          <DialogContentText>Kategori</DialogContentText>
          <Select
            value={props.selectedCategory}
            label="Jenis pengeluaran"
            placeholder="Jenis"
          >
            {props.categories.map((category) => (
              <MenuItem
                key={category.id}
                onClick={() => props.setSelectedCategory(category.name)}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose;
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              handleClose;
              props.getFilteredTransaction;
            }}
            autoFocus
          >
            Terapkan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
