'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function CustomSwiper({ slides }: { slides: Slide[] }) {
  return (
    <Swiper
      className="mySwiper"
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      loop
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: true }}
      pagination={{
        clickable: true,
        renderBullet: (_, className) => `<span class="${className}"></span>`,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-green-600/70" />

            <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 whitespace-pre-line leading-tight">
                {slide.title}
              </h2>
              <p className="mb-4 sm:mb-6 max-w-md sm:max-w-xl text-sm sm:text-base">
                {slide.description}
              </p>
              <div className="flex gap-3 sm:gap-4">
                <Link href={"/shop"} className="bg-white text-green-600 cursor-pointer px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium hover:bg-neutral-100 transition-colors">
                  {slide.primaryBtn}
                </Link>
                <Link href={'/shop'} className="border cursor-pointer border-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-white/10 transition-colors">
                  {slide.secondaryBtn}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}