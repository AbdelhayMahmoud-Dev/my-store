import { Link, NavLink, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          MyStore
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }
            >
              Products
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <Link
            to="/cart"
            className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="text-sm bg-gray-800 dark:bg-gray-600 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition"
              >
                ⚙️ Admin
              </Link>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                👋 {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;