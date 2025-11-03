import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🔍 Handle search request
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/items/?search=${searchQuery}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <>
      <nav className="bg-red-600 text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">Book My Order</div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 🔍 Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white rounded-full px-3 py-1 shadow-inner focus-within:ring-2 focus-within:ring-red-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 p-1 text-gray-800 bg-transparent outline-none placeholder-gray-400 w-40 focus:w-56 transition-all"
              />
              <button
                type="submit"
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
              >
                Search
              </button>
            </form>

            {/* Other Links */}
            <Link  to="/profit" className="hover:underline">Profit</Link>
            <Link to="/upload" className="hover:underline">Upload</Link>
            <Link to="/view" className="hover:underline">View</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to='/logout' className="hover:underline">Logout</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-start bg-red-700 p-4 space-y-3">
            {/* Search bar mobile */}
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 py-1 shadow-inner w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 p-1 text-gray-800 bg-transparent outline-none placeholder-gray-400 w-full"
              />
              <button
                type="submit"
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
              >
                Search
              </button>
            </form>
            <Link to="/profit" className="block hover:underline">Profit</Link>
            <Link to="/upload" className="block hover:underline">Upload</Link>
            <Link to="/view" className="block hover:underline">View</Link>
            <Link to="/login" className="block hover:underline">Login</Link>
            <Link to="/register" className="block hover:underline">Register</Link>
            <Link to='/logout' className="block hover:underline">Logout</Link>
            <Link to="/cart" className="block hover:underline">Cart</Link>
          </div>
        )}
      </nav>

      {/* 🔽 Search Results */}
      {results.length > 0 && (
        <div className="bg-gray-50 shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Search Results:
          </h3>
          <ul className="space-y-2">
            {results.map((item) => (
              <li
                key={item.id}
                className="bg-white p-3 rounded shadow hover:bg-gray-100"
              >
                <p className="font-semibold text-red-600">{item.name}</p>
                <p className="text-gray-600">₹{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
