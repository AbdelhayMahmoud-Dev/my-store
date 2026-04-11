import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const handleAdd = (product) => {
    const newProduct = addProduct(product);
    setProducts((prev) => [...prev, newProduct]);
    toast.success("Product added successfully! ✅");
  };

  const handleUpdate = (id, data) => {
    updateProduct(id, data);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === Number(id)
          ? { ...p, ...data, rating: { rate: Number(data.rating), count: p.rating.count } }
          : p
      )
    );
    toast.success("Product updated! ✅");
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
    toast.error("Product deleted");
  };

  const value = { products, handleAdd, handleUpdate, handleDelete };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};