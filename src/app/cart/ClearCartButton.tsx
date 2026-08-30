'use client'
import { Button } from "@/components/ui/button";
import { handleClearCartItems } from "./cart.actions";
import { toast } from "sonner";

export default function ClearCartButton() {
  
    async function handleClearCart(){
        const res = await handleClearCartItems()
        if(res === 0){
            toast.success("Cart Cleared Successfully" , {position:"top-center"})
        }
    }
    return (
    
    <Button onClick={handleClearCart} className="cursor-pointer" variant={'destructive'}>Clear Cart</Button>
    
  )
}
