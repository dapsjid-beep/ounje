
import { useState } from 'react';
import Button from '../../../components/base/Button';
import ChefBookingModal from './ChefBookingModal';

const chefServices = [
  {
    id: 1,
    title: 'Personal Chef Service',
    description: 'Professional chef comes to your home to prepare authentic African meals for your family or guests',
    price: 'Starting from $150/event',
    duration: '3-4 hours',
    serves: 'Up to 8 people',
    image: 'https://readdy.ai/api/search-image?query=Professional%20African%20chef%20cooking%20in%20modern%20home%20kitchen%2C%20wearing%20chef%20uniform%2C%20preparing%20traditional%20Nigerian%20dishes%20with%20fresh%20ingredients%2C%20warm%20lighting%20and%20elegant%20kitchen%20setting%2C%20professional%20culinary%20service%20atmosphere&width=400&height=300&seq=personal-chef-service&orientation=landscape',
    features: [
      'Menu consultation & planning',
      'Fresh ingredient shopping',
      'Professional cooking at your location',
      'Kitchen cleanup included',
      'Customizable spice levels',
      'Dietary restrictions accommodated'
    ],
    popular: true
  },
  {
    id: 2,
    title: 'Cooking Classes',
    description: 'Learn to cook authentic African dishes with our experienced chefs in hands-on cooking sessions',
    price: 'Starting from $75/person',
    duration: '2-3 hours',
    serves: 'Up to 6 students',
    image: 'https://readdy.ai/api/search-image?query=African%20cooking%20class%20with%20chef%20instructor%20teaching%20students%20how%20to%20prepare%20traditional%20Nigerian%20dishes%2C%20hands-on%20learning%20experience%20in%20professional%20kitchen%2C%20students%20wearing%20aprons%20and%20learning%20cooking%20techniques&width=400&height=300&seq=cooking-classes&orientation=landscape',
    features: [
      'Hands-on cooking experience',
      'Traditional cooking techniques',
      'Recipe cards to take home',
      'All ingredients provided',
      'Small group sessions',
      'Certificate of completion'
    ],
    popular: false
  },
  {
    id: 3,
    title: 'Event Catering',
    description: 'Full-service catering for weddings, parties, corporate events with authentic African cuisine',
    price: 'Starting from $25/person',
    duration: 'Full event service',
    serves: '20+ people',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20African%20catering%20setup%20for%20wedding%20or%20corporate%20event%2C%20beautifully%20arranged%20traditional%20Nigerian%20dishes%20on%20buffet%20tables%2C%20professional%20presentation%20with%20decorative%20elements%20and%20warm%20lighting&width=400&height=300&seq=event-catering&orientation=landscape',
    features: [
      'Custom menu design',
      'Professional service staff',
      'Complete setup & cleanup',
      'Elegant presentation',
      'Dietary accommodations',
      'Event coordination support'
    ],
    popular: true
  }
];

export default function ChefServices() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookService = (service: any) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Chef Services
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              Bring the authentic taste of Africa to your home, event, or learn to cook with our professional chef services. 
              Experience personalized culinary excellence tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {chefServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Service Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {service.duration}
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">{service.description}</p>

                  {/* Service Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                    <div className="text-lg md:text-xl font-bold text-orange-600">{service.price}</div>
                    <div className="text-sm text-gray-500">Serves {service.serves}</div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">What's Included:</h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5 flex-shrink-0"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-sm text-orange-600 font-medium">
                          +{service.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Book Service Button */}
                  <Button
                    onClick={() => handleBookService(service)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                  >
                    <i className="ri-calendar-line mr-2"></i>
                    Book This Service
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 md:mt-12 text-center">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Why Choose Our Chef Services?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-award-line text-xl md:text-2xl text-orange-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Certified Chefs</h4>
                  <p className="text-xs md:text-sm text-gray-600">Professional culinary experts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-leaf-line text-xl md:text-2xl text-orange-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Fresh Ingredients</h4>
                  <p className="text-xs md:text-sm text-gray-600">Locally sourced quality ingredients</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-heart-line text-xl md:text-2xl text-orange-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Authentic Recipes</h4>
                  <p className="text-xs md:text-sm text-gray-600">Traditional family recipes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-customer-service-line text-xl md:text-2xl text-orange-600"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Full Service</h4>
                  <p className="text-xs md:text-sm text-gray-600">Complete event management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Booking Modal */}
      {showBookingModal && selectedService && (
        <ChefBookingModal 
          service={selectedService}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedService(null);
          }} 
        />
      )}
    </>
  );
}
