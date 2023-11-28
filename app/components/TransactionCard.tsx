import { Paper, Stack, Typography } from "@mui/material";
import { Transaction } from "../interfaces/interface";

export default function TransactionCard(props: { transaction: Transaction }) {
  function formatRupiah(number: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  return (
    <Paper>
      <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography variant="body1">Benih dan tanaman</Typography>
          <Typography variant="caption">
            {props.transaction.description}
          </Typography>
          {/* <Typography variant="caption">Beli benih tanaman kopi</Typography> */}
        </Stack>
        <Stack justifyContent={"center"}>
          <Typography
            variant="body1"
            color={
              props.transaction.type == "EXPENSE" ? "error" : "success.main"
            }
          >
            {props.transaction.type == "EXPENSE" ? "-" : "+"}{" "}
            {formatRupiah(props.transaction.amount)}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
