import React from 'react';
import heroImg from '../images/image.png'; // ✅ import the image

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center h-80 flex flex-col justify-center items-center text-white relative"
      style={{
        backgroundImage: `url(${heroImg})`, // use the imported variable
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content here */}
    </div>
  );
};

export default Hero;

