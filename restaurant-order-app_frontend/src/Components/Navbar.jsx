import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">Book my Order</div>
      <div>
        <button className="mr-4">Search Items</button>
        <input type="text" placeholder="Search" className="p-1 rounded" />
        <Link to="/upload" className="ml-4">Upload</Link>
        <Link to="/view" className="ml-4">View</Link>
        <Link to="/login" className="ml-4">Login</Link>
        <Link to="/register" className="ml-4">Register</Link>
        <Link to="/cart" className="ml-4">
          cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
