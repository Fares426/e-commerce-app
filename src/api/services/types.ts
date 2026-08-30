export interface Product {
  id:string,
  title:string,
  imageCover:string,
  images:string[]
  description:string,
  quantity:number,
  price:number,
  priceAfterDiscount?:number,
  ratingsAverage:number,
  ratingsQuantity:number,
  category:Category,
  brand:Brand,
  subcategory?: { name: string }[],
  reviews?: Review[]
}
export interface Category {
  _id:string,
  name:string,
  slug:string,
  image:string
}
export interface Brand {
  _id:string,
  name:string,
  slug?:string,
  image?:string
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  profileImg?: string;
}

export interface Address {
  _id?: string;
  details: string;
  city: string;
  phone: string;
  postalCode?: string;
}

export interface WishlistItem {
  _id?: string;
  id?: string;
  title?: string;
  imageCover?: string;
  images?: string[];
  price?: number;
  category?: Category;
  brand?: Brand;
}

export interface Order {
  _id: string;
  cartItems?: Item[];
  totalOrderPrice?: number;
  shippingAddress?: ShippingAddress;
  paymentMethodType?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  createdAt?: string;
  user?: User;
}

export interface Cart {
  _id:string,
  cartOwner:string,
  products:Item[],
  totalCartPrice:string,

}

export interface Item {
  count: number,
  _id: string,
  product: Product,
  price: number
}

export interface BrandProps {
  _id: string;
  name: string;
  image: string;
}
export interface CartContextType {
  numberOfCartItems: number,
  updateNumberOfCartItems:(num:number)=>void
}


export interface CashOrder {
    shippingAddress : ShippingAddress
}


export interface ShippingAddress {
    details: string,
    phone: string,
    city: string,
    postalCode?: string
}

export type ProductTabsProps = {
  productId : string,
  description?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  reviews?: Review[];
};


export type Review = {
  _id: string;
  rating: number;
  review: string;
  createdAt: string;
  user: {
    name: string;
  };
};


export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string; 
}

export interface ApiResponse<T> {
  status: string;
  results?: number;
  message?: string;
  data: T;
}