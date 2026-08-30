"use client"
import * as React from "react"
import Link from "next/link"
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  Headphones,
  Phone,
  Mail,
  User,
  UserPlus,
  Package,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CgProfile } from "react-icons/cg";
import { useSession } from "next-auth/react"
import MobileLogoutButton from "../MobileLogoutButton/MobileLogoutButton"
import {useCart } from "@/app/_providers/cartContextProvider"
import { TOP_BAR_HEIGHT } from "../TopBar/TopBar"
import { CartContextType, Category } from "@/api/services/types"
const categories: { title: string; href: string }[] = [
  {
    title: "All Categories",
    href: "/categories",
  },
  {
    title: "Electronics",
    href: "/categories",
  },
  {
    title: "Women's Fashion",
    href: "/categories",
  },
  {
    title: "Men's Fashion",
    href: "/categories",
  },
  {
    title: "Beauty & Health",
    href: "/categories",
  },
]

interface NavbarProps {
  cartCount?: number
  wishlistCount?: number,
  categories: Category[]
}

export default function Navbar({ cartCount = 0, wishlistCount = 0  ,  categories}: NavbarProps) {

  const {numberOfCartItems} = (useCart() as CartContextType)
  const {data , status} = useSession()
  const userName = data?.user?.name
  const [isFixed, setIsFixed] = React.useState(false)
  const isUserAuthenticated = status === "authenticated"

  React.useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY >= TOP_BAR_HEIGHT)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="w-full bg-white">     

      {/* Reserves space so content doesn't jump when the bar below switches to fixed */}
      {isFixed && <div className="h-16" />}

      {/* Pinned to the viewport top via JS instead of CSS sticky, since sticky breaks
          if any ancestor has overflow or a transform set - fixed positioning sidesteps that */}
      <div
        className={`z-50 border-b border-gray-200 bg-white ${
          isFixed ? "fixed top-0 left-0 w-full" : "relative"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-1.5">
            <ShoppingCart className="h-6 w-6 text-green-600" strokeWidth={2.5} />
            <span className="text-xl font-bold text-gray-900">FreshCart</span>
          </Link>

          {/* Search - desktop */}
          <div className="hidden max-w-xl flex-1 lg:flex">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for products, brands and more..."
                className="h-10 w-full rounded-full border-gray-300 pl-4 pr-12 focus-visible:ring-green-600"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Primary nav - desktop */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/shop"
                    className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
                  >
                    Shop
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 data-[state=open]:text-green-600">
                  Categories
                </NavigationMenuTrigger>
              <NavigationMenuContent>
  <ul className="grid w-70 gap-1 p-3">
    <li>
      <NavigationMenuLink asChild>
        <Link
          href="/categories"
          className="block rounded-md p-2 text-sm font-medium text-green-600 hover:bg-gray-50"
        >
          All Categories
        </Link>
      </NavigationMenuLink>
    </li>
    {categories.map((category) => (
      <li key={category._id}>
        <NavigationMenuLink asChild>
          <Link
            href={`/shop?category=${category._id}`}
            className="block rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            {category.name}
          </Link>
        </NavigationMenuLink>
      </li>
    ))}
  </ul>
</NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/brands"
                    className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
                  >
                    Brands
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/orders"
                    className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
                  >
                    Orders
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            {/* Support - desktop only */}
            <Link href="/support" className="hidden items-center gap-2 lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Headphones className="h-4 w-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] text-gray-400">Support</span>
                <span className="text-xs font-semibold text-gray-900">24/7 Help</span>
              </span>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative hidden sm:block" aria-label="Wishlist">
              <Heart className="h-5 w-5 text-gray-700 transition-colors hover:text-green-600" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-4 min-w-4 justify-center rounded-full bg-green-600 p-0 text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </Link>


            {/* Cart */}
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5 text-gray-700 transition-colors hover:text-green-600" />
               {isUserAuthenticated && !!numberOfCartItems &&<Badge className="absolute -right-2 -top-2 h-4 min-w-4 justify-center rounded-full bg-green-600 p-0 text-[10px]">
                  {numberOfCartItems}
                </Badge>}
            </Link>

            {/* Sign in - desktop only */}
            {isUserAuthenticated ? <Link href={'/profile'}><CgProfile className="h-5 w-5 text-gray-700 transition-colors hover:text-green-600" /></Link> : <Button
              asChild
              className="hidden items-center gap-2 rounded-full bg-green-600 px-5 hover:bg-green-700 lg:flex"
            >
              <Link href="/login">
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </Button>}

            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full bg-green-600 hover:bg-green-700 lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-90">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-1.5">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                    FreshCart
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-4 flex flex-col gap-6 px-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="h-10 rounded-full pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>

                  <nav className="flex flex-col gap-1">
                    <Link href="/" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Home
                    </Link>
                    <Link href="/shop" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Shop
                    </Link>
                    <Link href="/brands" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Brands
                    </Link>
                    <Link href="/orders" className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Orders
                    </Link>
                  </nav>

                 {/* Mobile sheet version */}
<div>
  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
    Categories
  </p>
  <div className="flex flex-col gap-1">
    <Link href="/categories" className="rounded-md px-2 py-2 text-sm font-medium text-green-600 hover:bg-gray-50">
      All Categories
    </Link>
    {categories.map((category) => (
      <Link
        key={category._id}
        href={`/shop?category=${category._id}`}
        className="rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        {category.name}
      </Link>
    ))}
  </div>
</div>


                  {isUserAuthenticated ? <>
                  <div>
                    <div className="flex  items-center">
                      <div className="bg-slate-200 p-2 rounded-full">
                      <CgProfile className="h-5 w-5 text-gray-700 transition-colors "/>
                      </div>
                      <p className="ms-5">{userName}</p>
                    </div>
                  </div>
                  <div>
                      <MobileLogoutButton/>
                    
                  </div>
                  </> : <div className="flex gap-2">
                    <Button asChild className="flex-1 rounded-full bg-green-600 hover:bg-green-700">
                      <Link href="/login">
                        <User className="h-4 w-4" />
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 rounded-full">
                      <Link href="/register">
                        <UserPlus className="h-4 w-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </div>}

                  <Link href="/support" className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <Headphones className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[11px] text-gray-400">Support</span>
                      <span className="text-xs font-semibold text-gray-900">24/7 Help</span>
                    </span>
                  </Link>

                  

                  <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <a href="tel:+18001234567" className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      +1 (800) 123-4567
                    </a>
                    <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      support@freshcart.com
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}