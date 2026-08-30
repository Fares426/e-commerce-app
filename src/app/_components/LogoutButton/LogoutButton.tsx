'use client'
import { UserPlus } from "lucide-react"
import { signOut } from "next-auth/react"
export default function LogoutButton() {
   async function handleLogOut(){
        await signOut({
            redirect:false
        })
        window.location.href = '/login'
    }
  return (
    <span className="flex items-center gap-1.5 transition-colors hover:text-green-600 cursor-pointer" onClick={handleLogOut}> <UserPlus className="h-3.5 w-3.5" />Sign out</span>
  )
}