import type { Product } from '../../../../models/Flyer'
import NormalPriceBadge from './NormalPriceBadge'
// import PromoAndPriceBadge from './PromoAndPriceBadge'

export interface PriceBadgeProp {
  product: Product
  cents: number
}

const ProductPriceBadge = (props:PriceBadgeProp) => {
  return (
        <>
        <NormalPriceBadge {...props}/>
        </>
    )
}

export default ProductPriceBadge