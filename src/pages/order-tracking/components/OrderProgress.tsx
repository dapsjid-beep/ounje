
interface OrderProgressProps {
  currentStatus: string;
  deliveryType: string;
}

export default function OrderProgress({ currentStatus, deliveryType }: OrderProgressProps) {
  const getSteps = () => {
    const baseSteps = [
      { 
        id: 'received', 
        title: 'Order Received', 
        description: 'We have received your order',
        icon: 'ri-check-line'
      },
      { 
        id: 'preparing', 
        title: 'Preparing', 
        description: 'Our chefs are cooking your meal',
        icon: 'ri-restaurant-line'
      },
      { 
        id: 'packing', 
        title: 'Packing', 
        description: 'Your order is being packed',
        icon: 'ri-box-3-line'
      }
    ];

    if (deliveryType === 'pickup') {
      return [
        ...baseSteps,
        { 
          id: 'ready', 
          title: 'Ready for Pickup', 
          description: 'Your order is ready for collection',
          icon: 'ri-store-line'
        },
        { 
          id: 'completed', 
          title: 'Order Complete', 
          description: 'Thank you for your order!',
          icon: 'ri-trophy-line'
        }
      ];
    } else {
      return [
        ...baseSteps,
        { 
          id: 'ready', 
          title: 'Out for Delivery', 
          description: 'Your order is on the way',
          icon: 'ri-truck-line'
        },
        { 
          id: 'completed', 
          title: 'Delivered', 
          description: 'Your order has been delivered',
          icon: 'ri-home-smile-line'
        }
      ];
    }
  };

  const steps = getSteps();
  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-green-600 border-green-600 text-white',
          line: 'bg-green-600',
          title: 'text-green-600',
          description: 'text-gray-600'
        };
      case 'current':
        return {
          circle: 'bg-orange-600 border-orange-600 text-white animate-pulse',
          line: 'bg-gray-300',
          title: 'text-orange-600 font-semibold',
          description: 'text-gray-700'
        };
      default:
        return {
          circle: 'bg-white border-gray-300 text-gray-400',
          line: 'bg-gray-300',
          title: 'text-gray-400',
          description: 'text-gray-400'
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Progress</h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const styles = getStepStyles(status);
          
          return (
            <div key={step.id} className="flex items-start">
              {/* Step Circle */}
              <div className="flex flex-col items-center mr-4">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${styles.circle}`}>
                  <i className={`${step.icon} text-lg`}></i>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-12 mt-2 ${styles.line}`}></div>
                )}
              </div>
              
              {/* Step Content */}
              <div className="flex-1 pb-6">
                <h4 className={`font-medium ${styles.title}`}>{step.title}</h4>
                <p className={`text-sm ${styles.description}`}>{step.description}</p>
                
                {status === 'current' && (
                  <div className="mt-2 flex items-center text-orange-600">
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                )}
                
                {status === 'completed' && (
                  <div className="mt-2 flex items-center text-green-600">
                    <i className="ri-check-line mr-1"></i>
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Updates */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center">
          <i className="ri-notification-3-line text-blue-600 text-xl mr-3"></i>
          <div>
            <div className="font-medium text-blue-800">Live Updates</div>
            <div className="text-sm text-blue-600">We'll notify you when your order status changes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
