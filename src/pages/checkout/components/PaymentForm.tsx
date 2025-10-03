
import Button from '../../../components/base/Button';

interface PaymentFormProps {
  paymentInfo: any;
  setPaymentInfo: (info: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PaymentForm({ paymentInfo, setPaymentInfo, onNext, onPrev }: PaymentFormProps) {
  const handleInputChange = (field: string, value: string) => {
    setPaymentInfo({ ...paymentInfo, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const isFormValid = () => {
    return paymentInfo.cardNumber.replace(/\s/g, '').length >= 16 && 
           paymentInfo.expiryDate.length >= 5 && 
           paymentInfo.cvv.length >= 3 && 
           paymentInfo.cardName;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
      
      {/* Payment Methods */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border-2 border-orange-600 bg-orange-50 rounded-xl text-center">
            <i className="ri-bank-card-line text-2xl text-orange-600 mb-2"></i>
            <div className="font-medium text-orange-600">Credit Card</div>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-xl text-center opacity-50">
            <i className="ri-paypal-line text-2xl text-gray-400 mb-2"></i>
            <div className="font-medium text-gray-400">PayPal</div>
            <div className="text-xs text-gray-400">Coming Soon</div>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-xl text-center opacity-50">
            <i className="ri-smartphone-line text-2xl text-gray-400 mb-2"></i>
            <div className="font-medium text-gray-400">Apple Pay</div>
            <div className="text-xs text-gray-400">Coming Soon</div>
          </div>
        </div>
      </div>

      {/* Card Information */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
        <div className="relative">
          <input
            type="text"
            value={paymentInfo.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            maxLength={19}
            required
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <i className="ri-bank-card-line text-gray-400"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
          <input
            type="text"
            value={paymentInfo.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
            placeholder="MM/YY"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            maxLength={5}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
          <input
            type="text"
            value={paymentInfo.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
            placeholder="123"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            maxLength={4}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
        <input
          type="text"
          value={paymentInfo.cardName}
          onChange={(e) => handleInputChange('cardName', e.target.value)}
          placeholder="John Doe"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <div className="flex items-center">
          <i className="ri-shield-check-line text-green-600 text-xl mr-3"></i>
          <div>
            <div className="font-medium text-green-800">Secure Payment</div>
            <div className="text-sm text-green-600">Your payment information is encrypted and secure</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          <i className="ri-arrow-left-line mr-2"></i>
          Back to Delivery
        </Button>
        <Button 
          type="submit" 
          disabled={!isFormValid()}
          className="flex-1"
        >
          Review Order
          <i className="ri-arrow-right-line ml-2"></i>
        </Button>
      </div>
    </form>
  );
}
