
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../base/Button';
import { CartItem, useCart } from '../../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Navigate to checkout page
    setTimeout(() => {
      setIsCheckingOut(false);
      onClose();
      navigate('/checkout');
    }, 500);
  };

  const getSpiceColor = (spiceLevel?: string) => {
    switch (spiceLevel) {
      case 'Mild': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hot': return 'text-orange-600 bg-orange-100';
      case 'Extra Hot': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSpiceIcon = (spiceLevel?: string) => {
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
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.spiceLevel}-${index}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover object-top rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-orange-600 font-bold">{item.price}</p>
                    {item.spiceLevel && (
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getSpiceColor(item.spiceLevel)}`}>
                        <i className={`${getSpiceIcon(item.spiceLevel)} mr-1`}></i>
                        {item.spiceLevel}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <p className="text-sm text-gray-600 mt-1">Note: {item.specialInstructions}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.spiceLevel, item.specialInstructions)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.spiceLevel, item.specialInstructions)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.spiceLevel, item.specialInstructions)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-orange-600">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={clearCart}
                className="flex-1"
              >
                Clear Cart
              </Button>
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="flex-1"
              >
                {isCheckingOut ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="ri-secure-payment-line mr-2"></i>
                    Proceed to Checkout
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
