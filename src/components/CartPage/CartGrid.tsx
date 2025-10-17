import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "../../context/CartContext";
import React from "react";
import EmptyCartPlaceholder from "./EmptyCartPlaceholder";
import { useNavigate } from "react-router-dom";

export default function CartGrid() {
  const theme = useTheme();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { cartItems } = useCart();

  const [openForm, setOpenForm] = React.useState(false);
  
  const [outdatedFlyer, setOutdatedFlyer] = React.useState<boolean>(false);
  const [expiredFlyer, setExpiredFlyer] = React.useState<boolean>(false);

  const getTitle = () => {
    if (expiredFlyer) return "Folleto vencido";
    if (outdatedFlyer) return "Folleto desactualizado";
    return "";
  };

  const getContent = () => {
    if (expiredFlyer) return "Este folleto está vencido, contacte con el local";
    if (outdatedFlyer) return "El folleto está desactualizado, actualice la pagina para obtener los ultimos cambios.\nSu carrito podría contener cambios.";
    return "";
  };

  const actualizarFolleto = () => {
    setExpiredFlyer(false)
    setOutdatedFlyer(false)
    navigate("/");        // te lleva a la home
    window.location.reload(); // fuerza el refresh
  }

  const handleOpenForm = ()=>{
    setOpenForm(true)
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

          {/* Finalizar compra*/}
          <Dialog
            open={openForm}
            onClose={() => setOpenForm(false)}
            fullWidth
            maxWidth="sm"
            BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.5)" } }}
          >
            <DialogContent>
              <CheckoutForm onClose={() => setOpenForm(false)} isDesktop={isDesktop} setOutdatedFlyer={setOutdatedFlyer} setExpiredFlyer={setExpiredFlyer}/>
            </DialogContent>
          </Dialog>
          
          {/* Error al finalizar compra*/}
          <Dialog
            open={outdatedFlyer || expiredFlyer}
            onClose={() => {}}
            fullWidth
            maxWidth="sm"
            BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.5)" } }}
          >
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContent>
              <p>{getContent()}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={actualizarFolleto} variant="contained" color="primary">
                Actualizar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <EmptyCartPlaceholder/>
      )}
    </Container>
  );
}
