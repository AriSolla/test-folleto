// CartItems.tsx

import { Box, Typography } from "@mui/material";
import CartItem from "./CartItem";
import type { Product } from "../../models/Flyer";

interface Props{
  products: Product[]
}

export default function CartItems({products}: Props) {

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        overflow: "hidden",
        position: "sticky",
        top: 100,
      }}
    >
      <Box sx={{ backgroundColor: "#f1f1f1", py: 2, px: 3 }}>
        <Typography variant="h6">Tu envío</Typography>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        {products.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </Box>
    </Box>
  );
}
