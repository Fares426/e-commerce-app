'use client'
import { Button } from "@/components/ui/button";
import { handleUpdateCartCount } from "./cart.actions";
import { toast } from "sonner";
export default function UpdateCountButton({isIncrement = true , productId , count} : {isIncrement?:boolean , productId:string , count:number}) {


    async function handleUpdateCount(){
        const res = await handleUpdateCartCount(productId , count)
        if(res){
            toast.success(`Product Count ${isIncrement ? "Incremented" : "Decremented"}` , {position:'top-center'})
        } else{
            toast.error("Something went wrong try again")
        }
    }


  return (
    <Button onClick={handleUpdateCount} disabled={count <= 0} className="rounded  cursor-pointer text-2xl text-black bg-white px-2 hover:bg-white">
        {isIncrement? "+" : "-"}
    </Button>

  )
}
