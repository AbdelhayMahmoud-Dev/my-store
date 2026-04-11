import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Button from "../../components/Button";

const StatCard = ({ label, value, color }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${color}`}>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-xl font-bold text-gray-800 line-clamp-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const { products, handleDelete } = useAdmin();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (!products.length) return null;
    const categories = new Set(products.map((p) => p.category));
    const sorted = [...products].sort((a, b) => b.price - a.price);
    return {
      total: products.length,
      categories: categories.size,
      mostExpensive: sorted[0]?.title,
      cheapest: sorted[sorted.length - 1]?.title,
    };
  }, [products]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Products" value={stats?.total} color="border-blue-500" />
        <StatCard label="Categories" value={stats?.categories} color="border-green-500" />
        <StatCard label="Most Expensive" value={stats?.mostExpensive} color="border-yellow-500" />
        <StatCard label="Cheapest" value={stats?.cheapest} color="border-purple-500" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">All Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Product</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Price</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Rating</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-contain bg-gray-100 rounded-lg p-1"
                      />
                      <span className="font-medium text-gray-800 line-clamp-1 max-w-40">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{product.category}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">${product.price}</td>
                  <td className="px-4 py-3 text-yellow-500">★ {product.rating?.rate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;