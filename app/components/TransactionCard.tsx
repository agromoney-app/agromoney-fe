import { Paper, Stack, Typography } from "@mui/material";
import { Transaction } from "../interfaces/interface";

export default function TransactionCard(props: {
  transaction: Transaction;
  yesterday?: Transaction | undefined;
}) {
  function formatRupiah(number: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  const today = new Date(props.transaction.transactionTime);
  const yesterday = props.yesterday
    ? new Date(props.yesterday.transactionTime)
    : undefined;

  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "UTC",
  };
  const todayString = today.toLocaleDateString("id-ID", options);
  const yesterdayString = yesterday
    ? yesterday.toLocaleDateString("id-ID", options)
    : undefined;

  return (
    <>
      <Typography variant="overline" marginBottom={-2}>
        {todayString !== yesterdayString && todayString}
      </Typography>
      <Paper>
        <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
          <Stack direction={"column"}>
            <Typography variant="body1">
              {props.transaction.transactionCategory?.name &&
                props.transaction.transactionCategory?.name}
            </Typography>
            <Typography variant="caption">
              {props.transaction.description}
            </Typography>
            <Typography variant="caption">
              {/* {toLocaleDateString} */}
            </Typography>
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
    </>
  );
}
