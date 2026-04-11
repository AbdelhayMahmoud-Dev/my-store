import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Input from "../../components/Input";
import Button from "../../components/Button";

const CATEGORIES = ["electronics", "clothing", "accessories", "jewelery"];

const EditProduct = () => {
  const { id } = useParams();
  const { products, handleUpdate } = useAdmin();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      navigate("/admin/products");
      return;
    }
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category,
      description: product.description,
      image: product.image,
      rating: String(product.rating?.rate),
    });
  }, [id, products, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (form.rating === "" || isNaN(form.rating) || Number(form.rating) < 0 || Number(form.rating) > 5)
      newErrors.rating = "Rating must be between 0 and 5";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleUpdate(id, { ...form, price: Number(form.price) });
    navigate("/admin/products");
  };

  if (!form) return null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={errors.title}
          />
          <Input
            label="Price ($)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={errors.price}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            error={errors.description}
          />
          <Input
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            error={errors.image}
          />
          <Input
            label="Rating (0-5)"
            name="rating"
            type="number"
            value={form.rating}
            onChange={handleChange}
            error={errors.rating}
          />

          <div className="flex gap-3 mt-2">
            <Button type="submit" size="lg" className="flex-1">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;