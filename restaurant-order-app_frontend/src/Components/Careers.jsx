const Careers = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat text-white flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1529692236671-f1dc28a3a12b?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-65"></div>

      {/* Content */}
      <div className="relative z-10 p-10 max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">Careers</h1>

        <p className="text-lg leading-relaxed mb-6">
          At <span className="font-semibold text-yellow-300">Foodie’s Delight</span>, we believe that our team is 
          the heart of everything we do. We're always on the lookout for passionate, creative, 
          and hardworking individuals who share our love for great food and exceptional service.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Whether you're an experienced chef, a front-of-house professional, or someone eager to 
          start your journey in the culinary world, we offer a dynamic environment where you can 
          learn, grow, and thrive. 
        </p>

        <p className="text-lg leading-relaxed mb-8">
          We value teamwork, innovation, and dedication — and we reward those who bring their best 
          every day. Join us, and become a part of a brand that delights customers and inspires excellence.
        </p>

        
      </div>
    </div>
  );
};

export default Careers;


