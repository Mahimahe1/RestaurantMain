import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImg from "../images/logo1.png"; // 🔹 Add your custom logo here

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const navigate = useNavigate();

  // ✅ Load user info dynamically
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

  // 🔍 Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/items/?search=${searchQuery}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_superuser");
    setUser(null);
    setIsSuperUser(false);
    setShowDropdown(false);
    navigate("/login");
  };

  // 🔹 Safely get first letter of user name
  const displayLetter = user?.full_name?.charAt(0)?.toUpperCase() || "P";

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
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white rounded-full px-3 py-1 shadow-inner focus-within:ring-2 focus-within:ring-red-400 transition"
            >
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
                {displayLetter}
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
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-red-600 text-white px-4 py-3 space-y-2">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white rounded-full px-3 py-1 shadow-inner focus-within:ring-2 focus-within:ring-red-400 transition"
            >
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 p-1 text-gray-800 bg-transparent outline-none placeholder-gray-400 w-full focus:w-full transition-all"
              />
              <button
                type="submit"
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
              >
                Search
              </button>
            </form>

            <Link to="/cart" className="block hover:underline">Cart</Link>

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

      {/* Search Results */}
      {results.length > 0 && (
        <div className="bg-gray-50 shadow-md p-4 mt-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Search Results:</h3>
          <ul className="space-y-2">
            {results.map(item => (
              <li key={item.id} className="bg-white p-3 rounded shadow hover:bg-gray-100 cursor-pointer" onClick={() => {
                navigate(`/item/${item.id}`);
                setResults([]);
                setSearchQuery("");
              }}>
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
