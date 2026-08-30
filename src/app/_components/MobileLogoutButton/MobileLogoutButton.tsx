'use client'

import { signOut } from "next-auth/react"
import { PiSignOutBold } from "react-icons/pi"

export default function MobileLogoutButton() {
       async function handleLogOut(){
            await signOut({
                redirect:false
            })
            window.location.href = '/login'
        }
  return (
    <div onClick={handleLogOut} className="flex items-center">
      <div className="bg-red-100 p-2 rounded-full">
        <PiSignOutBold className="h-5 w-5 text-red-500 transition-colors " />
      </div>
      <span className="ms-5 text-red-500 cursor-pointer">Signout</span>
    </div>
  );
}