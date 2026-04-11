import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SIDEBAR_LINKS = [
  { to: "/admin/dashboard", label: "📊 Dashboard" },
  { to: "/admin/products", label: "📦 Products" },
  { to: "/admin/add-product", label: "➕ Add Product" },
];

const AdminLayout = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-sm flex flex-col py-8 px-4 gap-2 fixed h-full">
        <h2 className="text-lg font-bold text-blue-600 mb-6 px-2">
          ⚙️ Admin Panel
        </h2>
        {SIDEBAR_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-56 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;