import React from "react";
import { useNavigate } from "react-router-dom";
import Backcomp from "./Backcomp";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToReady = () => {
    navigate("/login");
  };

  return (
    <>
     <div className="absolute top-4 left-4 z-50">
        <Backcomp />
      </div>
    <div className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')" }}>
      
      <div className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-white mb-5 drop-shadow-lg">
          Welcome to Our Restaurant
        </h1>
        <p className="text-white mb-8 text-lg drop-shadow-md">
          Delicious food delivered with love
        </p>

        <button
          onClick={goToReady}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full shadow-lg transition-transform hover:scale-110"
        >
          Login
        </button>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
