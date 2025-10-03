
import { useState } from 'react';
import Button from '../../../components/base/Button';
import OrderModal from '../../menu/components/OrderModal';

const cuisines = [
  {
    id: 1,
    name: 'Nigerian',
    description: 'Authentic Nigerian cuisine with traditional flavors',
    image: 'https://readdy.ai/api/search-image?query=Delicious%20Nigerian%20cuisine%20featuring%20jollof%20rice%2C%20pounded%20yam%20with%20egusi%20soup%2C%20grilled%20suya%2C%20fried%20plantains%2C%20and%20pepper%20soup%20in%20colorful%20bowls%2C%20vibrant%20presentation%20with%20traditional%20Nigerian%20dining%20setup%20and%20warm%20lighting&width=400&height=300&seq=nigerian-featured&orientation=landscape',
    dishes: [
      {
        id: 1,
        name: 'Jollof Rice with Grilled Chicken',
        price: '$18.99',
        description: 'Aromatic jollof rice served with perfectly grilled chicken, fried plantains and coleslaw',
        image: 'https://readdy.ai/api/search-image?query=Delicious%20Nigerian%20jollof%20rice%20with%20perfectly%20grilled%20chicken%2C%20served%20with%20fried%20plantains%20and%20coleslaw%2C%20vibrant%20orange%20rice%20with%20traditional%20Nigerian%20spices%2C%20professional%20food%20photography%20with%20warm%20lighting&width=300&height=200&seq=nigerian-jollof&orientation=landscape',
        rating: 4.9,
        cookTime: '25 mins',
        dietary: ['Gluten-Free', 'Halal'],
        ingredients: ['Basmati Rice', 'Chicken', 'Tomatoes', 'Plantains', 'Nigerian Spices'],
        region: 'Nigerian'
      },
      {
        id: 2,
        name: 'Pounded Yam & Egusi Soup',
        price: '$22.99',
        description: 'Traditional pounded yam served with rich egusi soup containing melon seeds and spinach',
        image: 'https://readdy.ai/api/search-image?query=Traditional%20Nigerian%20pounded%20yam%20with%20rich%20egusi%20soup%20containing%20melon%20seeds%2C%20spinach%2C%20assorted%20meat%20and%20fish%2C%20authentic%20presentation%20in%20clay%20bowls%20with%20traditional%20Nigerian%20dining%20setup&width=300&height=200&seq=pounded-yam-egusi&orientation=landscape',
        rating: 4.8,
        cookTime: '35 mins',
        dietary: ['Gluten-Free', 'Halal'],
        ingredients: ['Yam', 'Melon Seeds', 'Spinland', 'Assorted Meat', 'Palm Oil'],
        region: 'Nigerian'
      },
      {
        id: 3,
        name: 'Nigerian Suya Platter',
        price: '$16.99',
        description: 'Spicy grilled beef skewers with traditional yaji spice blend, served with onions and tomatoes',
        image: 'https://readdy.ai/api/search-image?query=Nigerian%20suya%20beef%20skewers%20with%20traditional%20yaji%20spice%20coating%20on%20wooden%20sticks%2C%20served%20with%20sliced%20onions%2C%20tomatoes%2C%20and%20cucumber%20on%20banana%20leaves%2C%20authentic%20street%20food%20presentation&width=300&height=200&seq=nigerian-suya&orientation=landscape',
        rating: 4.9,
        cookTime: '15 mins',
        dietary: ['Halal'],
        ingredients: ['Beef', 'Yaji Spice', 'Onions', 'Tomatoes', 'Cucumber'],
        region: 'Nigerian'
      }
    ],
    popular: true,
    spiceLevels: ['Mild', 'Medium', 'Hot'],
    defaultSpice: 'Medium'
  },
  {
    id: 2,
    name: 'Intercontinental',
    description: 'International favorites with global appeal',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20intercontinental%20cuisine%20featuring%20grilled%20salmon%2C%20pasta%20dishes%2C%20Caesar%20salad%2C%20steak%2C%20and%20international%20fusion%20foods%2C%20sophisticated%20restaurant%20presentation%20with%20modern%20plating%20and%20professional%20lighting&width=400&height=300&seq=intercontinental-cuisine&orientation=landscape',
    dishes: [
      {
        id: 7,
        name: 'Grilled Salmon with Lemon Butter',
        price: '$28.99',
        description: 'Fresh Atlantic salmon grilled to perfection with lemon butter sauce and seasonal vegetables',
        image: 'https://readdy.ai/api/search-image?query=Elegant%20grilled%20salmon%20fillet%20with%20golden%20lemon%20butter%20sauce%2C%20colorful%20roasted%20vegetables%2C%20and%20fluffy%20rice%20pilaf%2C%20fine%20dining%20presentation%20on%20white%20porcelain%20plate%20with%20professional%20lighting&width=300&height=200&seq=grilled-salmon&orientation=landscape',
        rating: 4.8,
        cookTime: '20 mins',
        dietary: ['Gluten-Free', 'Keto'],
        ingredients: ['Atlantic Salmon', 'Lemon', 'Butter', 'Vegetables', 'Herbs'],
        region: 'Intercontinental'
      },
      {
        id: 8,
        name: 'Chicken Alfredo',
        price: '$24.99',
        description: 'Creamy fettuccine pasta with grilled chicken in rich alfredo sauce',
        image: 'https://readdy.ai/api/search-image?query=Creamy%20chicken%20alfredo%20pasta%20with%20fettuccine%20noodles%2C%20grilled%20chicken%20strips%2C%20rich%20white%20sauce%2C%20parmesan%20cheese%2C%20and%20fresh%20parsley%2C%20elegant%20Italian%20restaurant%20presentation&width=300&height=200&seq=chicken-alfredo&orientation=landscape',
        rating: 4.7,
        cookTime: '18 mins',
        dietary: ['Contains Dairy'],
        ingredients: ['Fettuccine', 'Chicken', 'Cream', 'Parmesan', 'Garlic'],
        region: 'Intercontinental'
      },
      {
        id: 9,
        name: 'Beef Steak',
        price: '$32.99',
        description: 'Premium beef sirloin steak with mushroom sauce, mashed potatoes and grilled asparagus',
        image: 'https://readdy.ai/api/search-image?query=Juicy%20beef%20sirloin%20steak%20with%20creamy%20mushroom%20sauce%2C%20smooth%20mashed%20potatoes%2C%20and%20grilled%20asparagus%2C%20upscale%20steakhouse%20presentation%20on%20black%20slate%20plate%20with%20elegant%20garnish&width=300&height=200&seq=beef-steak-mushroom&orientation=landscape',
        rating: 4.9,
        cookTime: '25 mins',
        dietary: ['Gluten-Free', 'Keto'],
        ingredients: ['Beef Sirloin', 'Mushrooms', 'Potatoes', 'Asparagus', 'Herbs'],
        region: 'Intercontinental'
      }
    ],
    spiceLevels: ['Mild', 'Medium'],
    defaultSpice: 'Mild'
  },
  {
    id: 3,
    name: 'Grilled Specialties',
    description: 'Perfectly grilled meats and seafood',
    image: 'https://readdy.ai/api/search-image?query=Grilled%20specialties%20featuring%20barbecue%20chicken%2C%20beef%20steak%2C%20grilled%20fish%2C%20and%20seafood%20on%20open%20flames%2C%20outdoor%20grilling%20atmosphere%20with%20smoky%20presentation%20and%20appetizing%20char%20marks&width=400&height=300&seq=grilled-specialties&orientation=landscape',
    dishes: [
      {
        id: 52,
        name: 'Grilled Tilapia Fish',
        price: '$24.99',
        description: 'Fresh tilapia fish grilled with Nigerian spices, served with jollof rice and plantains',
        image: 'https://readdy.ai/api/search-image?query=Grilled%20Nigerian%20tilapia%20fish%20with%20traditional%20spices%2C%20served%20on%20elegant%20white%20plate%20with%20jollof%20rice%20and%20fried%20plantains%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=300&height=200&seq=grilled-tilapia-nigerian&orientation=landscape',
        rating: 4.8,
        cookTime: '20 mins',
        dietary: ['Gluten-Free', 'Halal'],
        ingredients: ['Tilapia Fish', 'Nigerian Spices', 'Jollof Rice', 'Plantains', 'Pepper'],
        region: 'Grilled Specialties'
      },
      {
        id: 53,
        name: 'Grilled Chicken Nigerian Style',
        price: '$22.99',
        description: 'Whole chicken marinated in Nigerian spices and grilled to perfection, served with rice',
        image: 'https://readdy.ai/api/search-image?query=Nigerian%20grilled%20chicken%20marinated%20in%20traditional%20spices%2C%20golden%20brown%20color%2C%20served%20on%20white%20plate%20with%20coconut%20rice%20and%20vegetables%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=300&height=200&seq=grilled-chicken-nigerian&orientation=landscape',
        rating: 4.7,
        cookTime: '30 mins',
        dietary: ['Gluten-Free', 'Halal'],
        ingredients: ['Chicken', 'Nigerian Curry', 'Coconut Rice', 'Vegetables', 'Ginger'],
        region: 'Grilled Specialties'
      },
      {
        id: 54,
        name: 'Grilled Beef Kebab (Tsire)',
        price: '$18.99',
        description: 'Tender beef chunks marinated and grilled on skewers with traditional Hausa spices',
        image: 'https://readdy.ai/api/search-image?query=Nigerian%20beef%20kebab%20tsire%20on%20wooden%20skewers%20with%20traditional%20Hausa%20spices%2C%20served%20on%20white%20plate%20with%20sliced%20onions%20and%20tomatoes%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20background&width=300&height=200&seq=beef-kebab-tsire&orientation=landscape',
        rating: 4.6,
        cookTime: '18 mins',
        dietary: ['Halal'],
        ingredients: ['Beef', 'Tsire Spice', 'Onions', 'Tomatoes', 'Ginger'],
        region: 'Grilled Specialties'
      }
    ],
    popular: true,
    spiceLevels: ['Medium', 'Hot', 'Extra Hot'],
    defaultSpice: 'Hot'
  }
];

const spiceLevels = [
  { value: 'Mild', label: 'Mild', icon: 'ri-fire-line', color: 'green' },
  { value: 'Medium', label: 'Medium', icon: 'ri-fire-fill', color: 'yellow' },
  { value: 'Hot', label: 'Hot', icon: 'ri-fire-fill', color: 'orange' },
  { value: 'Extra Hot', label: 'Extra Hot', icon: 'ri-fire-fill', color: 'red' }
];

export default function FeaturedCuisines() {
  const [selectedCuisine, setSelectedCuisine] = useState(cuisines[0]);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(selectedCuisine.defaultSpice);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const getSpiceColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100 border-green-300';
      case 'yellow': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'orange': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'red': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const handleCuisineSelect = (cuisine: any) => {
    setSelectedCuisine(cuisine);
    setSelectedSpiceLevel(cuisine.defaultSpice);
  };

  const handleAddToCart = (dish: any) => {
    const dishWithSpice = {
      ...dish,
      selectedSpiceLevel: selectedSpiceLevel,
      spiceLevel: selectedSpiceLevel
    };
    setSelectedItem(dishWithSpice);
    setShowOrderModal(true);
  };

  return (
    <>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Explore our Special Cuisines
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
              Discover the perfect blend of authentic Nigerian flavors and beloved international dishes. 
              Each cuisine offers a unique culinary journey crafted with passion and tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
            {/* Cuisine Selection */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6 md:mb-8">
                {cuisines.map((cuisine) => (
                  <div
                    key={cuisine.id}
                    onClick={() => handleCuisineSelect(cuisine)}
                    className={`relative p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedCuisine.id === cuisine.id
                        ? 'bg-orange-600 text-white shadow-xl scale-105'
                        : 'bg-white text-gray-900 hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    {cuisine.popular && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-bold mb-2">{cuisine.name}</h3>
                    <p className={`text-sm ${selectedCuisine.id === cuisine.id ? 'text-orange-100' : 'text-gray-600'}`}>
                      {cuisine.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Selected Cuisine Details */}
              <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {selectedCuisine.name} Specialties
                </h3>
                
                {/* Spice Level Selector */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Choose Spice Level:</h4>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                    {spiceLevels
                      .filter(level => selectedCuisine.spiceLevels.includes(level.value))
                      .map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setSelectedSpiceLevel(level.value)}
                        className={`px-3 py-2 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedSpiceLevel === level.value
                            ? `border-${level.color}-400 ${getSpiceColor(level.color)}`
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <i className={`${level.icon} mr-1 text-sm`}></i>
                        <span className="text-sm font-medium">{level.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dishes List with Add to Cart */}
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {selectedCuisine.dishes.map((dish: any) => (
                    <div key={dish.id} className="flex flex-col sm:flex-row items-start sm:items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-full sm:w-16 h-32 sm:h-16 rounded-lg overflow-hidden mb-3 sm:mb-0 sm:mr-4 flex-shrink-0">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h5 className="font-bold text-gray-900 mb-1">{dish.name}</h5>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{dish.description}</p>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                          <span className="text-lg font-bold text-orange-600">{dish.price}</span>
                          <div className="flex items-center text-yellow-500">
                            <i className="ri-star-fill text-sm"></i>
                            <span className="text-sm font-medium text-gray-700 ml-1">{dish.rating}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            spiceLevels.find(level => level.value === selectedSpiceLevel) ? 
                            getSpiceColor(spiceLevels.find(level => level.value === selectedSpiceLevel)?.color || 'gray') :
                            'text-gray-600 bg-gray-100'
                          }`}>
                            <i className={`${spiceLevels.find(level => level.value === selectedSpiceLevel)?.icon || 'ri-fire-line'} mr-1`}></i>
                            {selectedSpiceLevel}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(dish)}
                        className="w-full sm:w-auto sm:ml-4 flex-shrink-0"
                      >
                        <i className="ri-shopping-cart-line mr-1"></i>
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={selectedCuisine.image}
                  alt={selectedCuisine.name}
                  className="w-full h-64 md:h-96 object-cover object-top transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                  <h4 className="text-xl md:text-2xl font-bold mb-2">{selectedCuisine.name}</h4>
                  <p className="text-orange-200 mb-2 text-sm md:text-base">{selectedCuisine.description}</p>
                  {/* Show selected spice level on image */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    spiceLevels.find(level => level.value === selectedSpiceLevel) ? 
                    getSpiceColor(spiceLevels.find(level => level.value === selectedSpiceLevel)?.color || 'gray') :
                    'text-gray-600 bg-gray-100'
                  }`}>
                    <i className={`${spiceLevels.find(level => level.value === selectedSpiceLevel)?.icon || 'ri-fire-line'} mr-1`}></i>
                    Spice Level: {selectedSpiceLevel}
                  </div>
                </div>
              </div>
            </div>
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
