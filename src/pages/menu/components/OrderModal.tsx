
import { useState } from 'react';
import Button from '../../../components/base/Button';
import { useCart } from '../../../hooks/useCart';

interface OrderModalProps {
  item: any;
  onClose: () => void;
}

export default function OrderModal({ item, onClose }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Add item to cart with selected spice level
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      spiceLevel: item.selectedSpiceLevel || item.spiceLevel
    };
    
    addToCart(cartItem, quantity, specialInstructions);

    // Show success feedback
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 500);
  };

  const totalPrice = (parseFloat(item.price.replace('$', '')) * quantity).toFixed(2);

  const getSpiceColor = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'Mild': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hot': return 'text-orange-600 bg-orange-100';
      case 'Extra Hot': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSpiceIcon = (spiceLevel: string) => {
    switch (spiceLevel) {
      case 'Mild': return 'ri-fire-line';
      case 'Medium': return 'ri-fire-fill';
      case 'Hot': return 'ri-fire-fill';
      case 'Extra Hot': return 'ri-fire-fill';
      default: return 'ri-fire-line';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add to Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Item Details */}
        <div className="p-6">
          <div className="flex gap-6 mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover object-top rounded-xl"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <div className="flex items-center gap-4 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {item.region}
                </span>
                <div className="flex items-center text-yellow-500">
                  <i className="ri-star-fill text-sm"></i>
                  <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <i className="ri-time-line text-sm"></i>
                  <span className="text-sm ml-1">{item.cookTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.dietary.map((diet: string) => (
                  <span key={diet} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {diet}
                  </span>
                ))}
              </div>
              {/* Selected Spice Level Display */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSpiceColor(item.selectedSpiceLevel || item.spiceLevel)}`}>
                <i className={`${getSpiceIcon(item.selectedSpiceLevel || item.spiceLevel)} mr-1`}></i>
                Spice Level: {item.selectedSpiceLevel || item.spiceLevel}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Quantity:</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                <i className="ri-subtract-line"></i>
              </button>
              <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                <i className="ri-add-line"></i>
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Special Instructions (Optional):</h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests or dietary requirements..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{specialInstructions.length}/500 characters</p>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Price per item:</span>
              <span className="font-semibold">{item.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Quantity:</span>
              <span className="font-semibold">{quantity}</span>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-orange-600">${totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1"
            >
              {isAdding ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Adding...
                </>
              ) : (
                <>
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}