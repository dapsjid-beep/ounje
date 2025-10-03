
import { useState } from 'react';
import Button from '../../../components/base/Button';
import OrderModal from '../../menu/components/OrderModal';

const grillSpecials = [
  {
    id: 52,
    name: 'Grilled Tilapia Fish',
    region: 'Grilled Specialties',
    description: 'Fresh tilapia fish grilled with Nigerian spices, served with jollof rice and plantains',
    price: '$24.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Grilled%20Nigerian%20tilapia%20fish%20with%20traditional%20spices%2C%20served%20on%20elegant%20white%20plate%20with%20jollof%20rice%20and%20fried%20plantains%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=400&height=300&seq=grilled-tilapia-nigerian&orientation=landscape',
    rating: 4.8,
    cookTime: '20 mins',
    popular: true,
    ingredients: ['Tilapia Fish', 'Nigerian Spices', 'Jollof Rice', 'Plantains', 'Pepper']
  },
  {
    id: 53,
    name: 'Nigerian Style Chicken',
    region: 'Grilled Specialties',
    description: 'Whole chicken marinated in Nigerian spices and grilled to perfection, served with rice',
    price: '$22.99',
    spiceLevel: 'Medium',
    dietary: ['Gluten-Free', 'Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20grilled%20chicken%20marinated%20in%20traditional%20spices%2C%20golden%20brown%20color%2C%20served%20on%20white%20plate%20with%20coconut%20rice%20and%20vegetables%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=400&height=300&seq=grilled-chicken-nigerian&orientation=landscape',
    rating: 4.7,
    cookTime: '30 mins',
    popular: true,
    ingredients: ['Chicken', 'Nigerian Curry', 'Coconut Rice', 'Vegetables', 'Ginger']
  },
  {
    id: 54,
    name: 'Beef Kebab',
    region: 'Grilled Specialties',
    description: 'Tender beef chunks marinated and grilled on skewers with traditional Hausa spices',
    price: '$18.99',
    spiceLevel: 'Hot',
    dietary: ['Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20beef%20kebab%20tsire%20on%20wooden%20skewers%20with%20traditional%20Hausa%20spices%2C%20served%20on%20white%20plate%20with%20sliced%20onions%20and%20tomatoes%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=400&height=300&seq=beef-kebab-tsire&orientation=landscape',
    rating: 4.6,
    cookTime: '18 mins',
    popular: false,
    ingredients: ['Beef', 'Tsire Spice', 'Onions', 'Tomatoes', 'Ginger']
  },
  {
    id: 55,
    name: 'Goat Meat Asun',
    region: 'Grilled Specialties',
    description: 'Spicy grilled goat meat with peppers and onions, a Yoruba delicacy',
    price: '$26.99',
    spiceLevel: 'Hot',
    dietary: ['Halal'],
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20asun%20grilled%20goat%20meat%20with%20hot%20peppers%20and%20onions%2C%20served%20on%20white%20plate%20with%20traditional%20Nigerian%20styling%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=400&height=300&seq=grilled-goat-asun&orientation=landscape',
    rating: 4.9,
    cookTime: '25 mins',
    popular: true,
    ingredients: ['Goat Meat', 'Hot Peppers', 'Onions', 'Nigerian Spices', 'Ginger']
  }
];

const spiceLevels = [
  { value: 'Mild', label: 'Mild', icon: 'ri-fire-line', color: 'green' },
  { value: 'Medium', label: 'Medium', icon: 'ri-fire-fill', color: 'yellow' },
  { value: 'Hot', label: 'Hot', icon: 'ri-fire-fill', color: 'orange' },
  { value: 'Extra Hot', label: 'Extra Hot', icon: 'ri-fire-fill', color: 'red' }
];

export default function GrillSpecials() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [itemSpiceLevels, setItemSpiceLevels] = useState<{[key: number]: string}>({});

  const handleAddToCart = (item: any) => {
    const selectedSpiceLevel = itemSpiceLevels[item.id] || item.spiceLevel;
    setSelectedItem({...item, selectedSpiceLevel});
    setShowOrderModal(true);
  };

  const getSpiceColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSpiceLevelChange = (itemId: number, spiceLevel: string) => {
    setItemSpiceLevels(prev => ({
      ...prev,
      [itemId]: spiceLevel
    }));
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Grill Specials</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
              Savor our expertly grilled specialties, prepared with authentic Nigerian spices and techniques
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {grillSpecials.map((item) => {
              const currentSpiceLevel = itemSpiceLevels[item.id] || item.spiceLevel;
              const spiceLevelData = spiceLevels.find(level => level.value === currentSpiceLevel) || spiceLevels[0];
              
              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Item Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                    {item.popular && (
                      <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-orange-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 flex-1 pr-2">{item.name}</h3>
                      <span className="text-lg md:text-xl font-bold text-orange-600 flex-shrink-0">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center text-yellow-500">
                        <i className="ri-star-fill text-sm"></i>
                        <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <i className="ri-time-line text-sm"></i>
                        <span className="text-sm ml-1">{item.cookTime}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                    {/* Dietary Info */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.dietary.slice(0, 2).map((diet: string) => (
                        <span key={diet} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {diet}
                        </span>
                      ))}
                    </div>

                    {/* Spice Level Selector */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Spice Level:</label>
                      <div className="grid grid-cols-2 gap-1">
                        {spiceLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() => handleSpiceLevelChange(item.id, level.value)}
                            className={`p-2 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center ${
                              currentSpiceLevel === level.value
                                ? `border-${level.color}-400 ${getSpiceColor(level.color)}`
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <i className={`${level.icon} mr-1 text-xs ${
                              currentSpiceLevel === level.value 
                                ? getSpiceColor(level.color).split(' ')[0]
                                : 'text-gray-500'
                            }`}></i>
                            <span className="text-xs font-medium">{level.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                    >
                      <i className="ri-shopping-cart-line mr-2"></i>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {showOrderModal && selectedItem && (
        <OrderModal
          item={selectedItem}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </>
  );
}
