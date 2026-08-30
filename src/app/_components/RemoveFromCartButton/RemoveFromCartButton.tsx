'use client'
import { Cart } from "@/api/services/types";
import { useCart } from "@/app/_providers/cartContextProvider";
import { handleDeleteProduct } from "@/app/cart/cart.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RemoveFromCartButton({productId} : {productId:string}) {
   const {updateNumberOfCartItems} = useCart() 

async function handleRemoveProduct(){
   const res = await handleDeleteProduct(productId)
   if(res === null){
    toast.error("Error occured while deleting")
   } else {
    updateNumberOfCartItems(res)
    toast.success("Product Removed from Cart")
   }
}
    

  return (
    <Button onClick={handleRemoveProduct} className="mt-5 cursor-pointer" variant={"destructive"}>Remove</Button>
  )
}
