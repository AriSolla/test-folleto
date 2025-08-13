import type { Product } from '../../../../models/Flyer'
import NormalPriceBadge from './NormalPriceBadge'
import PromoAndPriceBadge from './PromoAndPriceBadge'

export interface PriceBadgeProp {
  product: Product
  cents: number
}

const ProductPriceBadge = (props:PriceBadgeProp) => {
    const {product} = props
  return (
        <>
            {product.promoDetails?.type === "promo" ? (
              <PromoAndPriceBadge {...props}/>
          
          ) : product.promoDetails?.type === "discount" ? (
            product.promoDetails.discount.unitsApplied === undefined || product.promoDetails.discount.unitsApplied === null ? (
              <DiscountBadgeComponent {...props}/>
            ) : (
              <DiscountAndPromoBadgeComponent product={product} badge_style={style} promoDetails={promoDetails} cents={cents}/>
            )
          ) : promoDetails?.type === "strikePrice" ? (
              <StrikethroughPriceBadge product={product} badge_style={style} promoDetails={promoDetails} cents={cents}/>
      
          ) : promoDetails?.type === "amountPrice" ? (
              <PromoBadgeComponent product={product} badge_style={style} promoDetails={promoDetails} cents={cents}/>
          
          ) :(
            <NormalPriceBadge {...props}/>
          )}
        </>
    )
}

export default ProductPriceBadge