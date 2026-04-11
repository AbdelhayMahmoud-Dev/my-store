import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.orderNumber) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state?.orderNumber) return null;

  const { orderNumber, totalItems, totalPrice } = state;

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-lg text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order is being processed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Order Number</span>
            <span className="text-sm font-bold text-blue-600">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Total Items</span>
            <span className="text-sm font-semibold text-gray-800">{totalItems}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-500">Total Paid</span>
            <span className="text-sm font-bold text-green-600">${totalPrice}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          A confirmation email will be sent to your inbox.
        </p>

        <Button
          size="lg"
          onClick={() => navigate("/products")}
          className="w-full"
        >
          Continue Shopping
        </Button>

      </div>
    </div>
  );
};

export default OrderConfirmation;