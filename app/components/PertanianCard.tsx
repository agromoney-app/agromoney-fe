import { Button, Card, Paper, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { time } from "console";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
}

interface Yield {
  id: number;
  productId: number;
  product: string;
  plantingTime: string;
  harvestTime: any;
  description: string;
  quantity: number;
  isHarvested: boolean;
}

export default function PertanianCard(props: { yields: Yield }) {
  const route = useRouter();

  // CONVERT TO READABLE DATE
  const isoDateString = props.yields.harvestTime;
  const isoDate = new Date(isoDateString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const readableDate = isoDate.toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions
  );

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

  return (
    <Card
      onClick={() => route.push(`/pertanian/update-catatan/${props.yields.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <Stack
        direction={"row"}
        padding={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* LEFT SIDE */}
        <Stack>
          {/* CATEGORY */}
          <Typography variant="body1">Name</Typography>
          {/* DESCRIPTION */}
          <Typography variant="caption">{props.yields.description}</Typography>
          {/* HARVEST DATE */}
          <Typography
            variant="caption"
            color={
              timeDifference(props.yields.harvestTime) == 0 ||
              props.yields.isHarvested ||
              props.yields.quantity > 0
                ? "primary"
                : "warning.main"
            }
          >
            Panen {readableDate}
          </Typography>
        </Stack>
        <Stack>
          {props.yields.quantity > 0 ? (
            <Typography variant="body1" color={"primary"}>
              {props.yields.quantity} kg
            </Typography>
          ) : timeDifference(props.yields.harvestTime) > 0 ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<AccessTimeIcon />}
              color="warning"
            >
              {timeDifference(props.yields.harvestTime)} HARI
            </Button>
          ) : (
            <Button size="small" variant="contained" color="primary">
              PANEN
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
