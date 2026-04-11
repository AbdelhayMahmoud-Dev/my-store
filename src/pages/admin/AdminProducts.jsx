import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Button from "../../components/Button";
import Input from "../../components/Input";

const AdminProducts = () => {
  const { products, handleDelete } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Button onClick={() => navigate("/admin/add-product")}>
          ➕ Add New Product
        </Button>
      </div>

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Product</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Price</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-contain bg-gray-100 rounded-lg p-1"
                      />
                      <span className="font-medium text-gray-800 line-clamp-1 max-w-48">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{product.category}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600">${product.price}</td>
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

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;