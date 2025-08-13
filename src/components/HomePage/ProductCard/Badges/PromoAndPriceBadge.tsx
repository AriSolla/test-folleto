import styled from "@emotion/styled";
import { Contenedor } from "./Styles/Contenedor";
import { Etiqueta } from "./Styles/Etiqueta";
import type { PriceBadgeProp } from "./ProductPriceBadge";

const SmallText = styled("span")({
    fontSize: "0.8rem", // Tamaño pequeño para el texto
    fontWeight: "600",
});


const PromoAndPriceBadge = ({product}:PriceBadgeProp) => {
    
  return (
    <Contenedor badge_style={product.style}>
      <Etiqueta badge_style={product.style} is_row={"false"}>
        <SmallText>
          Llevando {product.promoDetails.promo.requiredQuantity} iguales
        </SmallText>
        <div style={{ display: "flex", alignItems: "center", lineHeight: "35px", fontSize: "3rem", marginBottom:'4px'}}>
          <span>{product.promoDetails.promo.requiredQuantity}</span>
          <span style={{ margin: "0px 5px" }}>x</span>
          <span>{product.promoDetails.promo.payableQuantity}</span>
        </div>
        <SmallText>
          Pagás {product.promoDetails.promo.payableQuantity}
        </SmallText>
      </Etiqueta>
    </Contenedor>
  );
};

export default PromoAndPriceBadge;
