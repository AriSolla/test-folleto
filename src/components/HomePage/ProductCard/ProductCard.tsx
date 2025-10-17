import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import NormalPriceBadge from "./Badges/NormalPriceBadge";
import ProductImage from "./ProductImage";
import type { Product } from "../../../models/Flyer";
import { fetchProductImage } from "../../../utils/fetchProductImage";
import { formatCurrency } from "../../../utils/formatPrice";
import { useFlyer } from "../../../context/FlyerContext";
import { readMeta } from "../../../services/metaService";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

// Definir el tamaño fijo de la tarjeta
const StyledCard = styled("div")({
  width: "250px", // Ancho fijo para todas las tarjetas
  position: "relative",
  display: "flex", // Para organizar los elementos horizontalmente
  flexDirection: "column", // Alineación horizontal
  justifyContent: "flex-start", // Alineación de los elementos en la fila
  padding: "10px", // Añadir un poco de padding al contenedor
  paddingRight: "0px",
  cursor: "pointer",
  ":hover": {
    transform: "scale(1.1)", // Aumenta el tamaño al 105% (puedes ajustar este valor)
    transition: "transform 0.15s ease-in-out", // Hace que la transición sea suave
  },
});

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [image, setImage] = React.useState<string | undefined>(undefined);
  const [imageLoading, setImageLoading] = React.useState<boolean>(true);
  const {business, meta} = useFlyer()
  const showNetPrice = business.ivaCondition != "Monotributo"

  
  React.useEffect(() => {
      const fetchUrlMeta = async () => {
        let metaData: any = await readMeta();
        if(!metaData) metaData = meta
        return metaData
      };
  
        const fetchImage = async (ean: string) => {
          setImageLoading(true);
          const meta = await fetchUrlMeta();
          const img = await fetchProductImage(ean, meta);
          if (img) setImage(img);
        setImageLoading(false);
      };
      fetchImage(product.productPLU);
    }, []);
    
  return (
    <StyledCard onClick={onClick}>
      <Box sx={{ position: "relative" }}>
        {/* Imagen */}
        <ProductImage
          image={image}
          productName={product.productName}
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
        />

        {/* Contenedor con precio y detalles */}
        <NormalPriceBadge product={product} />

        {/* Nombre */}
        <div style={{ marginBottom: "20px" }}>
          <h5
            style={{
              fontSize: "0.9rem",
              color: "black",
              margin: "0px",
              fontWeight: "700",
              padding: "0px 3px",
              marginBottom: "0",
            }}
          >
            {product.productName}
          </h5>
          {showNetPrice && (
            <Typography variant="subtitle2" color="text.secondary">
              Precio sin IVA: ${formatCurrency(product.NetPrice)}
            </Typography>
          )}
        </div>
      </Box>
    </StyledCard>
  );
};

export default ProductCard;
