import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
  min = 0,
  max = Infinity,
  disabled = false,
}: Props) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        px: 1,
        py: 0.5,
        gap: 1,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={!canDecrease || disabled}
        sx={{ p: 0.5}}
      >
        <Remove fontSize="small"/>
      </IconButton>

      <Typography
        variant="body2"
        sx={{textAlign: "center", fontWeight: 500 }}
      >
        {value}
      </Typography>

      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={!canIncrease || disabled}
        sx={{ p: 0.5 }}
      >
        <Add fontSize="small" style={{color: "dodgerblue"}}/>
      </IconButton>
    </Box>
  );
}
