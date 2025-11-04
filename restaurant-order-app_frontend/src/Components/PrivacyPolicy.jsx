const PrivacyPolicy = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat text-white flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 p-10 max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
          Privacy Policy
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          At <span className="font-semibold text-yellow-300">Foodie’s Delight</span>, 
          your privacy is our priority. We are committed to protecting your personal information 
          and ensuring transparency in how we collect, use, and safeguard your data.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          We collect only the information necessary to provide you with the best possible 
          dining experience — such as your name, contact details, and order preferences. 
          This data helps us personalize your experience and improve our services.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Your data is stored securely and never shared with third parties without your consent, 
          except when required by law. We use modern encryption and safety protocols to ensure 
          your information remains protected at all times.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          By using our services, you agree to this policy and our commitment to maintaining 
          confidentiality and trust. If you have any questions or requests regarding your data, 
          please contact our support team anytime.
        </p>

       
      </div>
    </div>
  );
};

export default PrivacyPolicy;

