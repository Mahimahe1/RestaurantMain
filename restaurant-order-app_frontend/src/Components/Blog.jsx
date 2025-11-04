const Blog = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat text-white flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Blog Content */}
      <div className="relative z-10 p-10 max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
          Our Food Stories & Insights
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          Welcome to the <span className="font-semibold text-yellow-300">Foodie’s Delight Blog</span> — 
          your go-to place for culinary inspiration, recipes, and stories from our kitchen. 
          Here, our chefs share their favorite dishes, cooking secrets, and food philosophy that
          shape every item on our menu.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          From exploring seasonal ingredients to celebrating local farmers, our blog dives deep 
          into what makes great food truly special. You’ll also get behind-the-scenes looks at our 
          events, new menu launches, and chef interviews that highlight the passion and creativity 
          behind every meal we serve.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Whether you're a food lover, a home cook, or someone looking for the next great dining 
          experience — there’s always something exciting cooking here!
        </p>

       
      </div>
    </div>
  );
};

export default Blog;
