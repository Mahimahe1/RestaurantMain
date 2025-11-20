import React from "react";
import Backcomp from "./Backcomp";
const AboutUs = () => {
  return (
    <>
     
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964091-0e32e19b8d7c?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute top-4 left-4 z-50">
        <Backcomp />
      </div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 p-12 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8 text-yellow-400 drop-shadow-lg">
          About Us
        </h1>

        <p className="text-xl leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-yellow-300">Foodie's Delight</span> — 
          where passion meets flavor! Our mission is to create an unforgettable dining experience 
          through fresh ingredients, authentic flavors, and heartwarming hospitality.
        </p>

        <p className="text-xl leading-relaxed mb-6">
          Our chefs craft every dish with love and creativity, drawing inspiration from cuisines 
          around the world. Whether you’re stopping by for a quick bite or celebrating a special 
          occasion, we make sure every meal is a delightful experience.
        </p>

        <p className="text-xl leading-relaxed">
          We believe in quality, freshness, and satisfaction — because you deserve nothing less 
          than the best. Come, savor the taste of perfection with us!
        </p>
      </div>
    </div>
    </>
  );
};

export default AboutUs;

