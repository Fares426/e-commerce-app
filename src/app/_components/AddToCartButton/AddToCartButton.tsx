'use client'
import { CartContextType } from "@/api/services/types";
import { useCart } from "@/app/_providers/cartContextProvider";
import { AddToCart } from "@/app/cart/cart.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import { toast } from "sonner";

interface AddToCartProps {
productId:string,
className?:string,
children:ReactNode,
navigate?:boolean
}
export default function AddToCartButton({productId , className ='' , children , navigate = false} : AddToCartProps) {
    const {updateNumberOfCartItems , numberOfCartItems} = (useCart() as CartContextType)
    const router = useRouter()
    async function handleClick(e:MouseEvent){
        e.preventDefault()
        const newItemsCount = await AddToCart(productId)
        if(newItemsCount != false){
           updateNumberOfCartItems(newItemsCount)
           toast.success(`Product Added Successfully` , {position:'top-center'})
          }else{
            
            toast.error(`Error ocurred while adding product` , {position:'top-center'})
        }
        if(navigate){
          router.push('/cart')
        }
    }
  return (
     <Button className={className} onClick={handleClick}>
      {children}
     </Button>
  )
}
