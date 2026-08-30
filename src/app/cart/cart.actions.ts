'use server'

import { revalidatePath } from "next/cache";
import { decodeToken } from "../utils";
import { CashOrder } from "@/api/services/types";

export async function AddToCart(productId:string){
   const token = await decodeToken()
   if(token){
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "post",
        body: JSON.stringify({ productId: productId }),
        headers: {
          token: token,
          "content-type": "application/json",
        },
      });

      const finalRes = await res.json();
      console.log("finalRes for product added to cart", finalRes);
      if(res.ok){
        return finalRes.numOfCartItems  
      }else {
        return false
      }
    } catch (error) {
      console.log("error when adding product to cart ", error);
    }
   }
   else {
    return new Error("Session Ended. Login Again")
   }
    
}


export async function handleDeleteProduct(productId:string){
  const token = await decodeToken()
  if(token){
    try {

      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}` , {
        method :'delete',
        headers:{
          token:token
        }
      })

      if(res.ok){
        const finalRes = await res.json()
        revalidatePath('/cart')
        return finalRes.numOfCartItems
      } else {
        return null
      }
  } catch (error) {
    console.log("err" , error);
    
  }
  }
  else {
    return new Error("Session Ended Please Login Again")
  }
}
export async function handleUpdateCartCount(productId:string , count:number){
  const token = await decodeToken()
  if(token){
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}` , {
        method :'put',
        headers:{
          token:token,
          'Content-Type' : "application/json"
        },
        body:JSON.stringify({count:count})
      })

      if(res.ok){
        const finalRes = await res.json()
        revalidatePath('/cart')
        return finalRes.numOfCartItems
      } else {
        return null
      }
    } catch (error) {
    console.log("err" , error);
    
  }
  }
  else {
    return new Error("Session Ended Please Login Again")
  }
}

export async function handleClearCartItems(){
  const token = await decodeToken()
  if(token){
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart` , {
        method :'delete',
        headers:{
          token:token
        }
      })
      
      if(res.ok){
        const finalRes = await res.json()
        revalidatePath('/cart')
        return finalRes.numOfCartItems
      } else {
        return null
      }
    } catch (error) {
      console.log("err" , error);
      
    }
  }
  else {
    return new Error("Session Ended Please Login Again")
  }
}
export async function handleCashOrderAction(cartId:string , shippingAddressObject : CashOrder){
  const token = await decodeToken()
  if(token){
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}` , {
        method :'post',
        headers:{
          token:token,
          'Content-Type' : "application/json"
        },
        body:JSON.stringify(shippingAddressObject)
      })

      if(res.ok){
        const finalRes = await res.json()
        console.log("Create Cash Order",finalRes);
        return true
        
      } else {
        return false
      }
    } catch (error) {
    console.log("err" , error);
    
  }
  }
  else {
    return new Error("Session Ended Please Login Again")
  }
}
export async function handleOnlineOrderAction(cartId:string , shippingAddressObject : CashOrder){
  const token = await decodeToken()
  if(token){
    try {
      
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
        method :'post',
        headers:{
          token:token,
          'Content-Type' : "application/json"
        },
        body:JSON.stringify(shippingAddressObject)
      })

      if(res.ok){
        const finalRes = await res.json()
        console.log("Create Online Order",finalRes);
        return finalRes.session.url
        
      } else {
        return false
      }
    } catch (error) {
    console.log("err" , error);
    
  }
  }
  else {
    return new Error("Session Ended Please Login Again")
  }
}