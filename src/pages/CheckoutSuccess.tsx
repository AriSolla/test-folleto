import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSnackbar } from "../context/SnackbarContext";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const {clearCart} = useCart()
  const {showMessage} = useSnackbar()

  const terminarCompra = () => {
    navigate("/")
    clearCart()
    showMessage("Gracias por su pedido!", "success")
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        ¿Hubo un problema con el pedido?
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Vuelve al carrito para intentar de nuevo o cierre esta página para
        finalizar.
      </Typography>

      <Box sx={{display:'flex', justifyContent:'space-around', width:'30%'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cart")}
        >
          Volver al carrito
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={terminarCompra}
        >
          Finalizar
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutSuccess;
