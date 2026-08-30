import Link from "next/link"
import { Truck, Gift, Phone, Mail, User, UserPlus } from "lucide-react"
import { getServerSession } from "next-auth"
import LogoutButton from "../LogoutButton/LogoutButton"

// Keep this in sync with the bar's actual height (h-9 = 36px below).
// Navbar.tsx imports this to know when to switch to fixed positioning.
export const TOP_BAR_HEIGHT = 36

export default async function TopBar() {
 const res = await getServerSession()
 const userName = res?.user?.name
 const isAuthenticated = !!userName
  return (
    <div className="hidden border-b border-gray-100 bg-white md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs text-gray-600 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-green-600" />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Gift className="h-3.5 w-3.5 text-green-600" />
            New Arrivals Daily
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="tel:+18001234567"
            className="hidden items-center gap-1.5 transition-colors hover:text-green-600 lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            +1 (800) 123-4567
          </a>
          <a
            href="mailto:support@freshcart.com"
            className="flex items-center gap-1.5 transition-colors hover:text-green-600"
          >
            <Mail className="h-3.5 w-3.5" />
            support@freshcart.com
          </a>
          <span className="h-4 w-px bg-gray-200" />
          {isAuthenticated ? <>
          <p
           
            className="flex items-center gap-1.5 transition-colors hover:text-green-600"
          >
            <User className="h-3.5 w-3.5" />
            {userName}
          </p>
          <LogoutButton/>
          </>: <>
          <Link
            href="/login"
            className="flex items-center gap-1.5 transition-colors hover:text-green-600"
          >
            <User className="h-3.5 w-3.5" />
            Sign In
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-1.5 transition-colors hover:text-green-600"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Sign Up
          </Link>
          </>}
        </div>
      </div>
    </div>
  )
}