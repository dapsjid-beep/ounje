
interface OrderDetailsProps {
  orderData: any;
}

export default function OrderDetails({ orderData }: OrderDetailsProps) {
  const getSpiceColor = (spiceLevel?: string) => {
    switch (spiceLevel) {
      case 'Mild': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hot': return 'text-orange-600 bg-orange-100';
      case 'Extra Hot': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-3">
          {orderData.items.map((item: any, index: number) => (
            <div key={`${item.id}-${item.spiceLevel}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
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
                {item.specialInstructions && (
                  <p className="text-xs text-gray-500 mt-1">Note: {item.specialInstructions}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {orderData.customerInfo.deliveryType === 'pickup' ? 'Pickup' : 'Delivery'} Information
        </h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-600">Name:</span>
            <p className="font-medium">{orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Phone:</span>
            <p className="font-medium">{orderData.customerInfo.phone}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Email:</span>
            <p className="font-medium">{orderData.customerInfo.email}</p>
          </div>
          {orderData.customerInfo.deliveryType === 'delivery' && (
            <div>
              <span className="text-sm text-gray-600">Address:</span>
              <p className="font-medium">
                {orderData.customerInfo.address}<br />
                {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${(orderData.total - 3.99 - (orderData.total - 3.99) * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">$3.99</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${((orderData.total - 3.99) * 0.08).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-xl text-orange-600">${orderData.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-xl">
          <div className="flex items-center text-green-600">
            <i className="ri-check-line mr-2"></i>
            <span className="text-sm font-medium">Payment Confirmed - {orderData.paymentInfo.cardNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
