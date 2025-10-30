import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* Logo / Brand */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold">MyBrand</h1>
          <p className="text-gray-400 mt-2">Delivering quality products since 2025.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <h2 className="font-semibold">Company</h2>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Support</h2>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Follow Us</h2>
            <ul className="mt-2 flex gap-4 text-gray-400">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        © 2025 MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
