const HelpCenter = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat text-white flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1604147706283-62c9c83b1a0b?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 p-10 max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
          Help Center
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          Welcome to the <span className="font-semibold text-yellow-300">Foodie’s Delight Help Center</span> — 
          your one-stop destination for support and information. Whether you need help with an order, 
          a reservation, or menu details, we’re here to make your dining experience smooth and enjoyable.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Here you’ll find answers to frequently asked questions, tips on using our website, and 
          guidance for common issues such as tracking your order, modifying bookings, and payment queries.
          We believe great food should always come with great service — both in person and online.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Still can’t find what you’re looking for? Our customer care team is always ready to assist. 
          Reach out anytime — we’re just a message away!
        </p>

        
      </div>
    </div>
  );
};

export default HelpCenter;


