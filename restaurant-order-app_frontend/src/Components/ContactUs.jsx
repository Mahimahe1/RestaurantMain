const ContactUs = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat text-white flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 p-10 max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
          Contact Us
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          We'd love to hear from you! Whether you have a question, feedback, or want to make a reservation,
          our team at <span className="font-semibold text-yellow-300">Foodie’s Delight</span> is here to help.
          Your satisfaction is our top priority.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          📞 <span className="font-semibold">Phone:</span> +91 6309483917 <br />
          📧 <span className="font-semibold">Email:</span> konagalasekhar6@gmail.com <br />
          🕒 <span className="font-semibold">Hours:</span> Mon–Sun, 10:00 AM – 10:00 PM
        </p>

        <p className="text-lg leading-relaxed mb-8">
          You can also visit us at our restaurant to enjoy our hospitality in person or fill out our online
          contact form to get a quick response from our team.
        </p>

        
      </div>
    </div>
  );
};

export default ContactUs;


