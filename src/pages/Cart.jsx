import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../hooks/useCart";
import Button from "../components/Button";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Shopping Cart
          <span className="text-gray-400 font-normal text-lg ml-2">({totalItems} items)</span>
        </h1>
        <Button variant="danger" size="sm" onClick={clearCart}>Clear Cart</Button>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center gap-4 transition-colors duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg p-2"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">{item.title}</h3>
                <p className="text-blue-600 font-bold mt-1">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 transition"
                >−</button>
                <span className="w-8 text-center font-semibold text-gray-800 dark:text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 transition"
                >+</button>
              </div>
              <p className="text-gray-800 dark:text-white font-bold w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 transition text-xl font-bold ml-2"
              >✕</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 dark:text-gray-400">Total Items:</span>
          <span className="font-semibold dark:text-white">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center mb-6 text-lg">
          <span className="font-bold text-gray-800 dark:text-white">Total Price:</span>
          <span className="font-bold text-blue-600 text-2xl">${totalPrice}</span>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="lg" onClick={() => navigate("/products")} className="flex-1">
            ← Continue Shopping
          </Button>
          <Button size="lg" onClick={() => navigate("/checkout")} className="flex-1">
            Proceed to Checkout →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;