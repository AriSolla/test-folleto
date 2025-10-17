import type { Product } from "../models/Flyer";


export const getUnidad = (
  item: Product,
): string => {
    const unit = item.typeUnit

    if(unit == "KG" || unit == "GR" || unit == "G" ) return 'Kg'
    if(unit == "L" || unit == "ML" || unit == "CC" ) return 'L'
    if(unit == "M" || unit == "CM" || unit == "MM") return 'M'
    if(unit == "U" || unit == "UN" ) return 'Un'

  return 'null'
};
