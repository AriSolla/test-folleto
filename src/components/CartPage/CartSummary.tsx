import { Box, Typography, Divider } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useFlyer } from "../../context/FlyerContext";
import { formatCurrency } from "../../utils/formatPrice";

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
  const {flyer} = useFlyer()

  const getDiscount = () =>{
    return (getTotalPrice() * (1 - (flyer.notice.generalpromo.percent/100)))
  }
  const getAhorrado = () =>{
    return (getTotalPrice() - getDiscount())
  }

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
        <Typography variant="h6" gutterBottom fontWeight={600}>
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
                ${formatCurrency(getTotalPrice())}
              </Typography>
            </Box>

            <Box onClick={openForm} sx={{...CustomButton, textAlign:'center', cursor:'pointer'}}>
              <Typography variant="subtitle1" fontWeight="bold">Realizar pedido</Typography>
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 3,
          backgroundColor: "#fafafa",
          mt:2
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          <span style={{ color: 'white',
                          fontSize: '150%',
                          borderRadius: '15px',
                          background: 'red',
                          padding: '2%' }}>
            {flyer.notice.generalpromo?.percent}% OFF!
          </span>
        </Typography>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          pagando con {flyer.notice.generalpromo.type}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Ahorrado</Typography>
          <Typography fontWeight="bold">${formatCurrency(getAhorrado())}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Total con descuento</Typography>
          <Typography fontWeight="bold" color="red">${formatCurrency(getDiscount())}</Typography>
        </Box>

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
