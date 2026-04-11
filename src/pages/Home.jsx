import { useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import { getAllProducts } from "../services/productService";

const Home = () => {
  const fetchProducts = useCallback(() => getAllProducts(), []);
  const { data: products, loading, error } = useFetch(fetchProducts);

  const featuredProducts = products?.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyStore 🛍️</h1>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          Discover the best products at unbeatable prices. Shop now and enjoy free shipping!
        </p>
        <Link to="/products">
          <Button variant="secondary" size="lg">Shop Now</Button>
        </Link>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline text-sm">
            View All →
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-center py-8">⚠️ Failed to load products</p>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating?.rate}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Home;