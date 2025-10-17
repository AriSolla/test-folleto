export interface Flyer {
  flyer_id: string;
  hashtag: string;
  expired_date: string; 
  valid_date: string;   
  comment: string;
  notice?: any;
  banners: Banners | null;

}

//Banners
export interface Banners {
  desktop: BannerPlacement;
  mobile: BannerPlacement;
}

export interface BannerPlacement {
  horizontalBanners: BannerImages;
  verticalBanners: BannerImages;
}

export interface BannerImages {
  images: string[];
  position: 'up' | 'down' | 'left' | 'right';
}


//Business
export interface Business {
  business_id: string;  // Viene como string en tu JSON
  store_id: string;     // Igual, string
  address: string;
  phone: string;
  email: string;
  name: string;
  working_hour: any; // object
  socialMedia: SocialMedia | null;
  active_flyer: boolean;
  includePluWsp?: boolean,
  ivaCondition?: string,
  price_default?: string,
  logo_image: string;   // 
}

export interface SocialMedia {
  facebook: string | null;
  instagram: string | null;
  x: string | null; // Twitter/X
}

//Department
export interface Department {
  departCode: number;
  name: string;
}

//Group
export interface Group {
  group_id: string;         // Es string porque viene como "01"
  name_id: string;
  background: string | null;
  icon: string | null;
  departments: Department[]; // Es un array de departamentos
}

//Products
export interface Product {
  productPLU: string;
  productName: string;
  productDesc: string;
  updatedAt: string;         
  precioVenta: number;
  departCode: number;
  precioPromo: number;
  precioWeb: number;
  group_id: string[];
  style?: ProductStyle;
  promoDetails?: any;
  cartQuantity?: number;
  typeUnit: string,
  quantity: number,
  priceunit: number,
  NetPrice: number, //precio sin Iva

}

export interface ProductStyle {
  grouped: string; // Viene como "true" → podrías mapearlo a boolean si querés
  groupPosition: Position;
  price: PriceStyle;
  promo: PriceStyle;
  imagePos: string; // e.g. "middle"
}

export interface Position {
  verticalPos: 'top' | 'middle' | 'bottom';
  horizontalPos: 'left' | 'center' | 'right';
}


export interface PriceStyle {
  color: string;
  colorText: string; 
  verticalPos: 'top' | 'middle' | 'bottom';
  horizontalPos: 'left' | 'center' | 'right';
}

export type PromoDetails =
  | PromoDiscount
  | PromoPromo
  | PromoAmountPrice
  | PromoStrikePrice;

export interface PromoDiscount {
  type: 'discount';
  promo: any[]; // Si sabés estructura, tipala
  discount: Discount;
  amountPrice: any[];
}

export interface PromoPromo {
  type: 'promo';
  promo: Promo;
  discount: any[];
  amountPrice: any[];
}

export interface PromoAmountPrice {
  type: 'amountPrice';
  promo: any[];
  discount: any[];
  amountPrice: AmountPrice;
}

export interface PromoStrikePrice {
  type: 'strikePrice';
  promo: any[];
  discount: any[];
  amountPrice: any[];
}

export interface Discount {
  discountPercentage: number;
  unitsApplied: number;
  price: number;
  unitPrice: number | null;
}

export interface Promo {
  requiredQuantity: number;
  payableQuantity: number;
  price: number;
  unitPrice: number | null;
}

export interface AmountPrice {
  requiredQuantity: number;
  payableQuantity: number | null;
  price: number;
  unitPrice: number | null;
}



export interface FlyerData {
  flyer: Flyer;
  business: Business[];
  groups: Group[];
  products: Product[];
  departments: Department[];
}
