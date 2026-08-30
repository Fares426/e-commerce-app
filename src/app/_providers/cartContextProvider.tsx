'use client'
import type { Cart, CartContextType } from "@/api/services/types"
import { createContext, ReactNode, useContext, useState } from "react"


export const CartContext = createContext<CartContextType>({numberOfCartItems:0 , updateNumberOfCartItems() {},})
export default function CartContextProvider({children , res} : {children:ReactNode , res:Cart | undefined} ) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(()=>{
    return res === undefined ? 0 : (res as Cart).products.length
  })

  function updateNumberOfCartItems(num:number){
    setNumberOfCartItems(num)
  }

  return (
    <CartContext.Provider value={{numberOfCartItems , updateNumberOfCartItems}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const res = useContext(CartContext)
  return res ?? { numberOfCartItems: 0, updateNumberOfCartItems() {} }
}
