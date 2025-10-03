
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import ChatWidget from '../../components/feature/ChatWidget';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    deliveryType: 'delivery',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {currentStep === 1 ? (
                <CheckoutForm 
                  customerInfo={customerInfo}
                  setCustomerInfo={setCustomerInfo}
                  onNext={handleNextStep}
                />
              ) : (
                <PaymentForm 
                  paymentInfo={paymentInfo}
                  setPaymentInfo={setPaymentInfo}
                  customerInfo={customerInfo}
                  onPrevious={handlePreviousStep}
                />
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
