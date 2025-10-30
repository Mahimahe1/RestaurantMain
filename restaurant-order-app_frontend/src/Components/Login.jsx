import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import l_img from '../images/image1.png'; // ✅ import the image
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert("Invalid email or password!");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          `url(${l_img})`
      }}
    >
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-96 max-w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-5 text-center text-gray-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
