import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import registerBg from "../images/register_img.png"; // ✅ use your own image

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
      console.log(response.data);
      setMessage("🎉 Registration successful!");
      setTimeout(() => navigate("/login"), 2000); // redirect to login page
    } catch (error) {
      console.error(error);
      setMessage("❌ Error registering user!");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${registerBg})`,
      }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-96 max-w-full">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 font-semibold ${
              message.includes("successful") ? "text-green-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-sm mt-5 text-center text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
