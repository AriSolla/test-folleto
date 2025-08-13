import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import NormalPriceBadge from "./Badges/NormalPriceBadge";
import ProductImage from "./ProductImage";
import type { Product } from "../../../models/Flyer";

interface ProductCardProps {
  product: Product
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
  paddingRight:'0px',
  cursor:'pointer',
  ":hover": {
    transform: "scale(1.1)", // Aumenta el tamaño al 105% (puedes ajustar este valor)
    transition: "transform 0.15s ease-in-out", // Hace que la transición sea suave
  },
});

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  
  const [image, setImage] = React.useState<string>('');
  const [imageLoading, setImageLoading] = React.useState<boolean>(true); 
  
  React.useEffect(() => {
    const ean = product.productPLU;
    const fetchImage = async () => {
      setImageLoading(true)
      try {
        const response = await fetch(`https://pf.rtitec.com.ar/image/image.php?image&ean=${ean}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const imagenData = data[0];            
            const base64Image = imagenData.image;
            setImage(base64Image);
          } else {
            // console.error(`No se encontro la imagen para el codigo ${ean}`);
          }
        } else {
          console.error(`Error al cargar la imagen con ean ${ean}: `, response.status);
        }
      } catch (error) {
        console.error(`Error en la solicitud para el ean ${ean}:`, error);
      } finally{
        setImageLoading(false)
      }
    };
    fetchImage();
  }, []);

  return (
    <StyledCard onClick={onClick}>
      <Box sx={{ position: "relative" }}>
        {/* Imagen */}
        <ProductImage image={image} productName={product.productName} imageLoading={imageLoading} setImageLoading={setImageLoading}/>
      
        {/* Contenedor con precio y detalles */}
        <NormalPriceBadge product={product}/>
        
        {/* Nombre */}
        <div>
            <h5 style={{
              fontSize: '0.9rem', 
              color: 'black', 
              margin: '0px', 
              fontWeight: '700',
              padding: '0px 3px', 
              marginBottom:'30px'
              }}>
                {product.productName}
              </h5>
        </div>
      </Box>
    </StyledCard>
  );
};

export default ProductCard;
