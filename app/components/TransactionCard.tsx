import { Paper, Stack, Typography } from "@mui/material";

export default function TransactionCard() {
  return (
    <Paper>
      <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="body1">Benih dan tanaman</Typography>
          <Typography variant="caption">Pengeluaran</Typography>
          <Typography variant="caption">Beli benih tanaman kopi</Typography>
        </Stack>
        <Stack justifyContent={"center"}>
          <Typography variant="body1" color={"error"}>
            -Rp45.000.000
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
