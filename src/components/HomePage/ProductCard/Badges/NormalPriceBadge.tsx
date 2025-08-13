import type { Product } from '../../../../models/Flyer'
import { Contenedor } from './Styles/Contenedor'
import { Etiqueta } from './Styles/Etiqueta'

interface NormalPriceBadgeProp {
  product: Product
}

const NormalPriceBadge = ({product}:NormalPriceBadgeProp) => {
  return (
    <Contenedor badge_style={product.style}>
        <Etiqueta badge_style={product.style} is_row={"true"}>
        <div
            style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "10px",
            marginRight: "5px",
            }}
        >
            <span style={{ fontSize: "20px" }}>$</span>
            <span>c/u</span>
        </div>
        <span>{product.precioVenta.toFixed(0)}</span>
        </Etiqueta>
    </Contenedor>
  )
}

export default NormalPriceBadge