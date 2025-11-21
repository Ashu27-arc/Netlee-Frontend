import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-3xl font-bold text-red-600">
          STREAMNOVA
        </Link>
        <nav className="flex space-x-6 text-white">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <Link to="/search" className="hover:text-red-600 transition">Search</Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4 text-white">
        {user ? (
          <>
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="User avatar"
              className="w-10 h-10 rounded"
            />
            <button
              onClick={logout}
              className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
