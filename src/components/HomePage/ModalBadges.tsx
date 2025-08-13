import type { Product } from "../../models/Flyer";
import ModalNormalPrice from "./ModalBadges/ModalNormalPrice"

export interface ModalBadgesProps{
    product: Product;
    cents: number;
}

const ModalBadges = (props:ModalBadgesProps) => {
  return (
    <div>
        <ModalNormalPrice {...props}/>  
    </div>
  )
}

export default ModalBadges