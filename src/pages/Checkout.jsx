import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import Input from "../components/Input";
import toast from "react-hot-toast";
import Button from "../components/Button";

const initialShipping = { fullName: "", address: "", city: "", phone: "" };
const initialPayment = { cardNumber: "", expiry: "", cvv: "" };

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState(initialShipping);
  const [payment, setPayment] = useState(initialPayment);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!shipping.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shipping.address.trim()) newErrors.address = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.phone.trim()) newErrors.phone = "Phone is required";
    if (!payment.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (payment.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!payment.expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
      newErrors.expiry = "Format must be MM/YY";
    }
    if (!payment.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (payment.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }
    return newErrors;
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setPayment((prev) => ({ ...prev, cardNumber: formatted }));
    setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    setPayment((prev) => ({ ...prev, expiry: value }));
    setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // ✅ التعديل الوحيد — إضافة Toast هنا
    toast.success("Order placed successfully! 🎉");

    const orderNumber = `ORD-${Date.now()}`;
    clearCart();
    navigate("/order-confirmation", {
      state: { orderNumber, totalItems, totalPrice },
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Forms */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Shipping */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🚚 Shipping Information
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={shipping.fullName}
                onChange={handleShippingChange}
                error={errors.fullName}
              />
              <Input
                label="Address"
                name="address"
                placeholder="123 Main Street"
                value={shipping.address}
                onChange={handleShippingChange}
                error={errors.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  placeholder="Cairo"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  error={errors.city}
                />
                <Input
                  label="Phone"
                  name="phone"
                  placeholder="+20 1234567890"
                  value={shipping.phone}
                  onChange={handleShippingChange}
                  error={errors.phone}
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              💳 Payment Details
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Card Number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={payment.cardNumber}
                onChange={handleCardNumberChange}
                error={errors.cardNumber}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  name="expiry"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={handleExpiryChange}
                  error={errors.expiry}
                />
                <Input
                  label="CVV"
                  name="cvv"
                  placeholder="123"
                  value={payment.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setPayment((prev) => ({ ...prev, cvv: value }));
                    setErrors((prev) => ({ ...prev, cvv: "" }));
                  }}
                  error={errors.cvv}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right — Order Summary */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🛍️ Order Summary
            </h2>

            <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 mb-4" />

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Total Items:</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
              <span>Total:</span>
              <span className="text-blue-600">${totalPrice}</span>
            </div>

            <Button
              size="lg"
              loading={loading}
              onClick={handleSubmit}
              className="w-full"
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;