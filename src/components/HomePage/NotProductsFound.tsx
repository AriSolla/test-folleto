import React from "react";
import { Box, Typography } from "@mui/material";
import notFoundImage from "../../assets/audit.png";

interface NotProductsFoundProps {
  query: string;
}

const NotProductsFound: React.FC<NotProductsFoundProps> = ({ query }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        px: 2,
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      {query ? (
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Lo sentimos, no encontramos ningún resultado para "{query}"
        </Typography>
      ) : (
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Lo sentimos, no encontramos ningún resultado para esta categoria
        </Typography>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
        Por favor, intenta de nuevo la búsqueda: comprueba que no hay ningún
        error tipográfico o prueba con otras palabras similares.
      </Typography>

      <Box
        component="img"
        src={notFoundImage}
        alt="Sin resultados"
        sx={{
          width: "100%",
          maxWidth: "10rem",
          height: "auto",
          mx: "auto",
        }}
      />
    </Box>
  );
};

export default NotProductsFound;
