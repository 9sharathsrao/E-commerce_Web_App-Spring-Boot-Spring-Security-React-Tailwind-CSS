import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md px-10">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ClinkNBuy
      </Link>
      <div className="space-x-6 font-medium flex items-center">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>

        {user ? (
          <>
            {/* Show Cart and My Orders ONLY if role is ROLE_USER */}
            {user.role === "ROLE_USER" && (
              <>
                <Link to="/cart" className="hover:text-blue-500">
                  Cart
                </Link>
                <Link to="/orders" className="hover:text-blue-500">
                  My Orders
                </Link>
              </>
            )}

            {/* Show link ONLY if role is ROLE_SELLER */}
            {user.role === "ROLE_SELLER" && (
              <Link
                to="/seller/dashboard"
                className="text-orange-600 font-bold hover:underline"
              >
                Seller Hub
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
