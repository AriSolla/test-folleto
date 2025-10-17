import type { Product } from '../../../../models/Flyer'
import { Contenedor } from './Styles/Contenedor'
import { Etiqueta } from './Styles/Etiqueta'
import { formatCurrency } from '../../../../utils/formatPrice'
import { getPriceSelected } from '../../../../utils/getPriceSelected'
import { useFlyer } from '../../../../context/FlyerContext'

interface NormalPriceBadgeProp {
  product: Product
}

const NormalPriceBadge = ({product}:NormalPriceBadgeProp) => {
  const {business} = useFlyer()
    const precioDefault = getPriceSelected(product, business.price_default)
  
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
        <span>{formatCurrency(precioDefault)}</span>
        </Etiqueta>
    </Contenedor>
  )
}

export default NormalPriceBadge