import { useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import Input from "../components/Input";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { getAllProducts, getCategories } from "../services/productService";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
};

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchProducts = useCallback(() => getAllProducts(), []);
  const fetchCategories = useCallback(() => getCategories(), []);

  const { data: products, loading, error } = useFetch(fetchProducts);
  const { data: categories } = useFetch(fetchCategories);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];
    if (debouncedSearch.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
      );
    }
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, debouncedSearch, selectedCategory, sortBy]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Products</h1>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {loading ? "Loading..." : `${filteredProducts.length} results`}
        </span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 transition-colors duration-300">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition bg-white"
        >
          <option value="all">All Categories</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition bg-white"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">⚠️ Failed to load products</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No products found</h2>
          <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
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
    </div>
  );
};

export default Products;