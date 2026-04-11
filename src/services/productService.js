let MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Wireless Headphones Pro",
    price: 99.99,
    category: "electronics",
    rating: { rate: 4.5, count: 120 },
    image: "/images/headphones.jpg",
    description: "High quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    title: "Smart Watch Series X",
    price: 149.99,
    category: "electronics",
    rating: { rate: 4.2, count: 89 },
    image: "/images/watch.jpg",
    description: "Smart watch with health tracking and GPS.",
  },
  {
    id: 3,
    title: "Running Shoes Ultra",
    price: 79.99,
    category: "clothing",
    rating: { rate: 4.7, count: 200 },
    image: "/images/shoes.jpg",
    description: "Lightweight running shoes for professional athletes.",
  },
  {
    id: 4,
    title: "Casual Backpack",
    price: 59.99,
    category: "accessories",
    rating: { rate: 4.3, count: 150 },
    image: "/images/backpack.jpg",
    description: "Durable backpack for everyday use.",
  },
  {
    id: 5,
    title: "Men's Slim Fit Shirt",
    price: 39.99,
    category: "clothing",
    rating: { rate: 4.1, count: 95 },
    image: "/images/shirt.jpg",
    description: "Classic slim fit shirt for formal occasions.",
  },
  {
    id: 6,
    title: "Women's Jacket",
    price: 89.99,
    category: "clothing",
    rating: { rate: 4.6, count: 180 },
    image: "/images/jacket.jpg",
    description: "Warm and stylish jacket for winter.",
  },
  {
    id: 7,
    title: "Gold Bracelet",
    price: 199.99,
    category: "jewelery",
    rating: { rate: 4.8, count: 60 },
    image: "/images/bracelet.jpg",
    description: "Elegant gold bracelet for special occasions.",
  },
  {
    id: 8,
    title: "USB-C Hard Drive",
    price: 64.99,
    category: "electronics",
    rating: { rate: 4.4, count: 110 },
    image: "/images/harddrive.jpg",
    description: "Portable hard drive with fast USB-C connection.",
  },
];

export const getAllProducts = async () => [...MOCK_PRODUCTS];

export const getProductById = async (id) =>
  MOCK_PRODUCTS.find((p) => p.id === Number(id)) || null;

export const getCategories = async () =>
  [...new Set(MOCK_PRODUCTS.map((p) => p.category))];

export const getProductsByCategory = async (category) =>
  MOCK_PRODUCTS.filter((p) => p.category === category);

export const addProduct = (product) => {
  const newProduct = {
    ...product,
    id: Date.now(),
    rating: { rate: Number(product.rating) || 0, count: 0 },
  };
  MOCK_PRODUCTS = [...MOCK_PRODUCTS, newProduct];
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  MOCK_PRODUCTS = MOCK_PRODUCTS.map((p) =>
    p.id === Number(id)
      ? {
          ...p,
          ...updatedData,
          rating: { rate: Number(updatedData.rating) || p.rating.rate, count: p.rating.count },
        }
      : p
  );
};

export const deleteProduct = (id) => {
  MOCK_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.id !== Number(id));
};