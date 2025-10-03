
import Button from '../../../components/base/Button';

interface CheckoutFormProps {
  customerInfo: any;
  setCustomerInfo: (info: any) => void;
  onNext: () => void;
}

export default function CheckoutForm({ customerInfo, setCustomerInfo, onNext }: CheckoutFormProps) {
  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid = () => {
    return customerInfo.firstName && 
           customerInfo.lastName && 
           customerInfo.email && 
           customerInfo.phone && 
           customerInfo.address && 
           customerInfo.city && 
           customerInfo.state && 
           customerInfo.zipCode;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
      
      {/* Delivery Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Type</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('deliveryType', 'delivery')}
            className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-colors ${
              customerInfo.deliveryType === 'delivery'
                ? 'border-orange-600 bg-orange-50 text-orange-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <i className="ri-truck-line text-2xl mb-2"></i>
            <div className="font-medium">Delivery</div>
            <div className="text-sm text-gray-500">30-45 mins</div>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('deliveryType', 'pickup')}
            className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-colors ${
              customerInfo.deliveryType === 'pickup'
                ? 'border-orange-600 bg-orange-50 text-orange-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <i className="ri-store-line text-2xl mb-2"></i>
            <div className="font-medium">Pickup</div>
            <div className="text-sm text-gray-500">15-20 mins</div>
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={customerInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={customerInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
        <input
          type="text"
          value={customerInfo.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            value={customerInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            value={customerInfo.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
          <input
            type="text"
            value={customerInfo.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={!isFormValid()}
        className="w-full"
      >
        Continue to Payment
        <i className="ri-arrow-right-line ml-2"></i>
      </Button>
    </form>
  );
}
