import { useParams, useNavigate, Link } from "react-router-dom";
import { useCallback } from "react";
import useFetch from "../hooks/useFetch";
import { getProductById } from "../services/productService";
import useCart from "../hooks/useCart";
import Button from "../components/Button";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const fetchProduct = useCallback(() => getProductById(id), [id]);
  const { data: product, loading, error } = useFetch(fetchProduct, [id]);

  if (loading) return <Loader fullPage />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 text-lg font-medium mb-4">⚠️ {error}</p>
        <Button onClick={() => navigate("/products")} variant="secondary">
          ← Back to Products
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/products")} variant="secondary">
          ← Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-80">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(product.rating?.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating?.rate}
            </span>
            <span className="text-sm text-gray-400">
              ({product.rating?.count} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600">${product.price}</div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <hr className="border-gray-200" />

          <div className="flex gap-3">
            <Button
              size="lg"
              onClick={() => addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })}
              className="flex-1"
            >
              🛒 Add to Cart
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate("/products")}>
              ← Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;