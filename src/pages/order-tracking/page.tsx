
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import OrderProgress from './components/OrderProgress';
import OrderDetails from './components/OrderDetails';
import ChatWidget from '../../components/feature/ChatWidget';

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [showOrder, setShowOrder] = useState(false);

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      setShowOrder(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>
          
          <div className="space-y-8">
            {/* Order Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <OrderProgress />
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <OrderDetails />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
