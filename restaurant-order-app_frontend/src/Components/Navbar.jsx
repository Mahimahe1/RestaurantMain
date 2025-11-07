import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImg from "../images/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem("user");
      const superUser = localStorage.getItem("is_superuser");
      if (userData) setUser(JSON.parse(userData));
      setIsSuperUser(superUser === "true" || superUser === true || superUser === "1");
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // 🔍 Live search on typing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/items/?search=${searchQuery}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_superuser");
    setUser(null);
    setIsSuperUser(false);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-red-600 text-white px-4 py-3 shadow-md">
        <div className="max-w-1xl mx-auto flex justify-between items-center">
          {/* Logo + Text */}
          <div className="flex items-center space-x-1">
            <img src={logoImg} alt="Restaurant Logo" className="h-10 w-auto rounded-xl" />
            <span className="text-2xl font-bold">Book My Order</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 p-2 text-gray-800 rounded-full outline-none w-56 focus:w-64 transition-all"
              />

              {/* Search Results Dropdown */}
              {results.length > 0 && (
                <ul className="absolute mt-1 bg-white text-gray-800 w-full rounded shadow-lg max-h-60 overflow-y-auto z-50">
                  {results.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 hover:bg-red-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/item/${item.id}`); // Navigate to item page
                        setResults([]);
                        setSearchQuery("");
                      }}
                    >
                      {item.name} - ₹{item.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="hover:underline">
              <i className="fa fa-shopping-cart" style={{ fontSize: "22px" }}></i>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center font-semibold hover:bg-gray-200 cursor-pointer transition"
              >
                {user ? user.full_name.charAt(0).toUpperCase() : "P"}
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                  {!user ? (
                    <>
                      <Link to="/register" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Register</Link>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Login</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/view" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Home</Link>
                      {isSuperUser && (
                        <>
                          <Link to="/profit" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Profit</Link>
                          <Link to="/upload" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowDropdown(false)}>Upload</Link>
                        </>
                      )}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-red-600 text-white px-4 py-3 space-y-2">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-full text-gray-800 w-full outline-none"
            />
            {results.length > 0 && (
              <ul className="bg-white text-gray-800 rounded shadow-lg max-h-60 overflow-y-auto">
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="p-2 hover:bg-red-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/item/${item.id}`);
                      setResults([]);
                      setSearchQuery("");
                      setIsOpen(false);
                    }}
                  >
                    {item.name} - ₹{item.price}
                  </li>
                ))}
              </ul>
            )}

            <Link to="/cart" className="block">Cart</Link>

            {!user ? (
              <>
                <Link to="/register" className="block" onClick={() => setIsOpen(false)}>Register</Link>
                <Link to="/login" className="block" onClick={() => setIsOpen(false)}>Login</Link>
              </>
            ) : (
              <>
                <Link to="/view" className="block" onClick={() => setIsOpen(false)}>Home</Link>
                {isSuperUser && (
                  <>
                    <Link to="/profit" className="block" onClick={() => setIsOpen(false)}>Profit</Link>
                    <Link to="/upload" className="block" onClick={() => setIsOpen(false)}>Upload</Link>
                  </>
                )}
                <button onClick={handleLogout} className="block w-full text-left">Logout</button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
