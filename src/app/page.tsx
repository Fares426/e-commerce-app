import { getAllProducts } from "@/api/services/route.services";
import ProductCard from "./_components/ProductCard/ProductCard";
import Link from "next/link";
import CustomSwiper from "./_components/Swiper/CustomSwiper";
import SwiperImage from '@images/home-slider-1.d79601a8.png'
import CategoriesSubCard from "./_components/CategoriesSubCard/CategoriesSubCard";
import { lazy, Suspense } from "react";
import CategoriesSubCardSkeleton from "./_components/CategoriesSubCard/CategoriesSubCardSkeleton";
import FeaturesBar from "./_components/FeaturesBar/FeaturesBar";

const CategoriesSubCardAsLazyLoadedComponent = lazy(()=> import("./_components/CategoriesSubCard/CategoriesSubCard"))
export default async function Home() {

  
 const allProducts = await getAllProducts()
//  console.log("allProducts" , allProducts);
 

  return <>
  
    <div className="">
      <CustomSwiper slides={[
        {
          image:SwiperImage.src,
          title:"Fresh Products Delivered\n to Your Door",
          description:"Get 20% off your first order",
          primaryBtn:'Shop Now',
          secondaryBtn:"View Deals"
        },
        {
          image:SwiperImage.src,
          title:"Premium Quality\n Guranteed",
          description:"Fresh from farm to your table",
          primaryBtn:'Shop Now',
          secondaryBtn:"View Deals"
        },
        {
          image:SwiperImage.src,
          title:"Fast & Free Delivery",
          description:"Same day delivery available",
          primaryBtn:'Shop Now',
          secondaryBtn:"View Deals"
        },
        
      ]} />

      <FeaturesBar/>
      {/* Component should be lazy loaded  */}
      {/* <CategoriesSubCard/> */}
      <Suspense fallback={<CategoriesSubCardSkeleton/>}>
        <CategoriesSubCardAsLazyLoadedComponent/>
      </Suspense>

      {/* // page.tsx (relevant part) */}
<div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10 w-full max-w-7xl mx-auto">
  <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 font-semibold">
    
    Featured <span className="text-green-500">Products</span>
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
    {allProducts?.map(product => (
      <Link key={product.id} href={`/products/${product.id}`}>
        <ProductCard product={product} />
      </Link>
    ))}
  </div>
</div>
    </div>
  
  
  </>
}
