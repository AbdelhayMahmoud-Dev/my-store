import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import Button from "./Button";

const Card = ({ id, image, title, price, rating }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, image, title, price });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
      onClick={() => navigate(`/products/${id}`)}
    >
      <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <img src={image} alt={title} className="h-full object-contain" />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-xs text-gray-500">{rating}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-blue-600 font-bold text-lg">${price}</span>
          <Button size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;