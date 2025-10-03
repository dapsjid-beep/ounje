
import { useCart } from '../../../hooks/useCart';

export default function OrderSummary() {
  const { cartItems, getTotalPrice } = useCart();

  const getSpiceColor = (spiceLevel?: string) => {
    switch (spiceLevel) {
      case 'Mild': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hot': return 'text-orange-600 bg-orange-100';
      case 'Extra Hot': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const subtotal = getTotalPrice();
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
      
      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${item.spiceLevel}-${index}`} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover object-top rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
              {item.spiceLevel && (
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSpiceColor(item.spiceLevel)}`}>
                  {item.spiceLevel}
                </div>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                <span className="font-medium text-orange-600">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-xl text-orange-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="mt-6 p-3 bg-orange-50 rounded-xl">
        <div className="flex items-center text-orange-600">
          <i className="ri-time-line mr-2"></i>
          <span className="text-sm font-medium">Estimated Delivery: 30-45 mins</span>
        </div>
      </div>
    </div>
  );
}
