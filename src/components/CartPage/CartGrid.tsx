import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
} from "@mui/material";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "../../context/CartContext";
import React from "react";
import EmptyCartPlaceholder from "./EmptyCartPlaceholder";

export default function CartGrid() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { cartItems } = useCart();

  const [openForm, setOpenForm] = React.useState(false);
  const handleOpenForm = ()=>{
    setOpenForm(true)
    console.log("DADSASD");
    
  }

  return (
    <Container maxWidth="xl" sx={{ position: "absolute", padding: 0 }}>
      {cartItems.length !== 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              gap: 4,
              alignItems: "flex-start",
              pr: isDesktop ? 5 : 2,
              pl: isDesktop ? 5 : 2,
            }}
          >
            <Box sx={{ width: isDesktop ? "65%" : "100%" }}>
              <CartItems products={cartItems} />
            </Box>

            <Box
              sx={{
                width: isDesktop ? "35%" : "100%",
                position: "sticky",
                top: "70px",
              }}
            >
              <CartSummary openForm={handleOpenForm} isDesktop={isDesktop}/>
            </Box>
          </Box>

          {/* Formulario*/}
          <Dialog
            open={openForm}
            onClose={() => setOpenForm(false)}
            fullWidth
            maxWidth="sm"
            BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.5)" } }}
          >
            <DialogContent>
              <CheckoutForm onClose={() => setOpenForm(false)} isDesktop={isDesktop}/>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <EmptyCartPlaceholder/>
      )}
    </Container>
  );
}
