import { Box, Button, Container, Typography } from "@mui/material";
import emptyCartImg from "../../assets/shopping-bag.png";
import { useNavigate } from "react-router-dom";

const EmptyCartPlaceholder = () => {
    const navigate = useNavigate()
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* Título */}
      <Typography variant="h4" gutterBottom>
        Tu carrito está vacío
      </Typography>

      {/* Subtítulo + botón */}
      <Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Empieza tu compra ahora mismo
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={()=> navigate('/')}
          sx={{
            backgroundColor:'#8c00ffff',
            color:'white',
            px: 4,
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "#500091ff",
              transform: "scale(1.03)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Seguir comprando
        </Button>
      </Box>
      {/* Imagen al fondo */}
      <Box
        component="img"
        src={emptyCartImg}
        alt="Carrito vacío"
        sx={{
          width: "70%",
          maxWidth: 300,
          mb: 4,
        }}
      />
    </Container>
  );
};

export default EmptyCartPlaceholder;
