import { Box, Typography, Divider } from "@mui/material";
import { useCart } from "../../context/CartContext";

const CustomButton = {
  background: "#ffd633",
  borderRadius: "2rem",
  padding: "10px",
};

interface Props {
  openForm: () => void;
  isDesktop: boolean;
}

export default function CartSummary({ openForm, isDesktop }: Props) {
  const { getTotalQuantity, getTotalPrice } = useCart();

  return (
    <>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Resumen del pedido
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Cantidad de productos</Typography>
          <Typography fontWeight="bold">{getTotalQuantity()}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {isDesktop && (
          <>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${getTotalPrice().toFixed(0)}
              </Typography>
            </Box>

            <Box onClick={openForm} sx={{...CustomButton, textAlign:'center'}}>
              <Typography variant="subtitle1" fontWeight="bold">Realizar pedido</Typography>
            </Box>
          </>
        )}
      </Box>

      {!isDesktop && (
        <>
          {/* Espaciador invisible para evitar que el botón tape contenido */}
          <Box sx={{ height: 100 }} />
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1.5rem 9px",
              zIndex: 9999,
              backgroundColor: "rgba(242, 242, 242, 1)",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            }}
          >
            <Box
              onClick={openForm}
              sx={{
                ...CustomButton,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle2">Realizar pedido</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${getTotalPrice().toFixed(0)}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
