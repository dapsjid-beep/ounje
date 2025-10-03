
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/base/Button';

const backgroundImages = [
  {
    url: 'https://readdy.ai/api/search-image?query=Beautiful%20African%20kitchen%20scene%20with%20traditional%20cooking%20pots%2C%20colorful%20spices%2C%20fresh%20vegetables%2C%20and%20warm%20lighting%20creating%20an%20inviting%20atmosphere%20for%20authentic%20African%20cuisine%2C%20professional%20food%20photography%20style%20with%20rich%20earth%20tones%20and%20vibrant%20colors&width=1920&height=1080&seq=hero-bg-1&orientation=landscape',
    alt: 'Traditional African Kitchen'
  },
  {
    url: 'https://readdy.ai/api/search-image?query=Delicious%20Nigerian%20jollof%20rice%20with%20grilled%20chicken%2C%20fried%20plantains%2C%20and%20traditional%20Nigerian%20spices%2C%20vibrant%20orange%20rice%20with%20beautiful%20presentation%20on%20elegant%20plates%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20appetizing%20presentation&width=1920&height=1080&seq=hero-bg-2&orientation=landscape',
    alt: 'Nigerian Jollof Rice Feast'
  },
  {
    url: 'https://readdy.ai/api/search-image?query=African%20grilled%20specialties%20featuring%20suya%20beef%20skewers%2C%20grilled%20tilapia%20fish%2C%20and%20barbecue%20chicken%20with%20traditional%20spices%2C%20outdoor%20grilling%20scene%20with%20flames%20and%20smoke%2C%20authentic%20African%20street%20food%20atmosphere&width=1920&height=1080&seq=hero-bg-3&orientation=landscape',
    alt: 'African Grilled Specialties'
  },
  {
    url: 'https://readdy.ai/api/search-image?query=Traditional%20African%20feast%20with%20pounded%20yam%2C%20egusi%20soup%2C%20pepper%20soup%2C%20assorted%20meat%2C%20and%20colorful%20African%20vegetables%20arranged%20beautifully%20on%20wooden%20table%2C%20authentic%20Nigerian%20dining%20experience%20with%20traditional%20bowls%20and%20utensils&width=1920&height=1080&seq=hero-bg-4&orientation=landscape',
    alt: 'Traditional African Feast'
  },
  {
    url: 'https://readdy.ai/api/search-image?query=African%20spices%20and%20ingredients%20display%20with%20colorful%20peppers%2C%20palm%20oil%2C%20melon%20seeds%2C%20dried%20fish%2C%20traditional%20African%20seasonings%20arranged%20artistically%20with%20warm%20lighting%2C%20vibrant%20colors%20showcasing%20authentic%20African%20cooking%20ingredients&width=1920&height=1080&seq=hero-bg-5&orientation=landscape',
    alt: 'African Spices and Ingredients'
  }
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleOrderNow = () => {
    navigate('/menu');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images with Sliding Effect */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${image.url}')`
            }}
          />
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-orange-500 w-6 md:w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="w-full max-w-4xl">
          <div className="text-white text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              Authentic African
              <span className="block text-orange-500">Flavors Delivered</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed px-4 md:px-0">
              Experience the rich culinary heritage of Africa with our curated selection of traditional dishes, 
              personal chef services, and authentic grill specialties.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 px-4 md:px-0 items-center justify-center md:justify-start">
              <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 whitespace-nowrap w-full sm:w-auto" onClick={handleOrderNow}>
                <i className="ri-restaurant-line mr-2"></i>
                Order Now
              </Button>
              <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-white text-white hover:bg-white hover:text-gray-900 whitespace-nowrap w-full sm:w-auto">
                <i className="ri-play-circle-line mr-2"></i>
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10">
        <i className="ri-arrow-down-line text-xl md:text-2xl"></i>
      </div>

      {/* Current Image Title Overlay - Hidden on mobile */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 text-white z-10 hidden md:block">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 md:px-4 py-2">
          <p className="text-xs md:text-sm font-medium">{backgroundImages[currentImageIndex].alt}</p>
        </div>
      </div>
    </section>
  );
}
