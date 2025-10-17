import type { Product } from "../models/Flyer"

export const getPriceSelected = (item: Product, priceDefault?:string): number => {

    const finalPriceKey = priceDefault?.trim() ? priceDefault : "precioVenta";
    let precio = 0

    if(item){
        if(finalPriceKey == 'precioVenta') precio = item.precioVenta    
        
    } 

  
    return precio
}