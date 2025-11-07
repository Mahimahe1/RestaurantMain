import React from "react";
import heroImg from "../images/image.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const box1Images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
];


  const box2Images = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330",
];


  const box3Images = [
  "https://images.unsplash.com/photo-1543353071-10c8ba85a904",
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
];


  return (
    <div className="relative  h-[30vh]">  {/* Add mt-16 and height */}

  {/* Overlay */}
  <div className="absolute inset-0 rounded-xl "></div>

  {/* 3 Boxes with Image Carousels */}
  <div className="relative z-10 flex w-full h-full px-4 py-4">
      
    {/* Box 1 */}
    <div className="w-1/3 h-full flex flex-col rounded-xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
        className="w-full h-full"
      >
        {box1Images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Box 2 */}
    <div className="w-1/3 h-full flex flex-col ml-4 rounded-xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
      >
        {box2Images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center rounded-xl "
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Box 3 */}
    <div className="w-1/3 h-full flex flex-col ml-4 mr-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true} 
        className="w-full h-full"
      >
        {box3Images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  </div>
</div>
  );
};
export default Hero;