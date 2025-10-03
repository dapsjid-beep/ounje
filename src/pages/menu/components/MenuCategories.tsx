
import { useState } from 'react';

interface MenuCategoriesProps {
  onCategorySelect?: (category: string) => void;
}

const categories = [
  {
    id: 1,
    name: 'Nigerian',
    description: 'Authentic Nigerian cuisine with traditional flavors',
    image: 'https://readdy.ai/api/search-image?query=Delicious%20Nigerian%20cuisine%20featuring%20jollof%20rice%2C%20pounded%20yam%20with%20egusi%20soup%2C%20grilled%20suya%2C%20fried%20plantains%2C%20and%20pepper%20soup%20in%20colorful%20bowls%2C%20vibrant%20presentation%20with%20traditional%20Nigerian%20dining%20setup%20and%20warm%20lighting&width=400&height=300&seq=nigerian-cuisine&orientation=landscape',
    dishCount: 20,
    popular: true
  },
  {
    id: 2,
    name: 'Intercontinental',
    description: 'International favorites with global appeal',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20intercontinental%20cuisine%20featuring%20grilled%20salmon%2C%20pasta%20dishes%2C%20Caesar%20salad%2C%20steak%2C%20and%20international%20fusion%20foods%2C%20sophisticated%20restaurant%20presentation%20with%20modern%20plating%20and%20professional%20lighting&width=400&height=300&seq=intercontinental-cuisine&orientation=landscape',
    dishCount: 20,
    popular: false
  },
  {
    id: 3,
    name: 'Grilled Specialties',
    description: 'Perfectly grilled meats and seafood',
    image: 'https://readdy.ai/api/search-image?query=Grilled%20specialties%20featuring%20barbecue%20chicken%2C%20beef%20steak%2C%20grilled%20fish%2C%20and%20seafood%20on%20open%20flames%2C%20outdoor%20grilling%20atmosphere%20with%20smoky%20presentation%20and%20appetizing%20char%20marks&width=400&height=300&seq=grilled-specialties&orientation=landscape',
    dishCount: 12,
    popular: true
  },
  {
    id: 4,
    name: 'Soups & Stews',
    description: 'Hearty Nigerian soups and international stews',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Nigerian%20soups%20including%20egusi%2C%20pepper%20soup%2C%20bitter%20leaf%20soup%2C%20and%20international%20stews%20in%20clay%20pots%20and%20modern%20bowls%2C%20rich%20colors%20and%20traditional%20serving%20presentation%20with%20steam%20rising&width=400&height=300&seq=soups-stews&orientation=landscape',
    dishCount: 10,
    popular: false
  },
  {
    id: 5,
    name: 'Rice & Grains',
    description: 'Jollof rice, fried rice, and grain-based dishes',
    image: 'https://readdy.ai/api/search-image?query=Various%20rice%20dishes%20including%20Nigerian%20jollof%20rice%2C%20coconut%20rice%2C%20fried%20rice%2C%20and%20international%20grain%20dishes%2C%20colorful%20presentation%20with%20garnishes%20and%20traditional%20accompaniments%20in%20elegant%20serving%20dishes&width=400&height=300&seq=rice-grains&orientation=landscape',
    dishCount: 10,
    popular: true
  },
  {
    id: 6,
    name: 'Desserts & Drinks',
    description: 'Sweet treats and refreshing beverages',
    image: 'https://readdy.ai/api/search-image?query=Nigerian%20and%20international%20desserts%20including%20chin%20chin%2C%20puff%20puff%2C%20ice%20cream%2C%20cakes%2C%20and%20tropical%20drinks%2C%20colorful%20presentation%20with%20fresh%20fruits%20and%20elegant%20plating%20on%20modern%20serving%20dishes&width=400&height=300&seq=desserts-drinks&orientation=landscape',
    dishCount: 14,
    popular: false
  }
];

export default function MenuCategories({ onCategorySelect }: MenuCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
    
    // Smooth scroll to menu items section
    const menuItemsSection = document.querySelector('[data-menu-items]');
    if (menuItemsSection) {
      menuItemsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`group cursor-pointer transition-all duration-300 ${
                selectedCategory === category.name ? 'scale-105' : ''
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                selectedCategory === category.name ? 'ring-4 ring-orange-500 shadow-xl' : ''
              }`}>
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/60 transition-all duration-300 cursor-pointer"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-semibold bg-orange-600 px-3 py-1 rounded-full">
                      {category.dishCount} items
                    </span>
                  </div>
                  {category.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Popular
                      </span>
                    </div>
                  )}
                  {selectedCategory === category.name && (
                    <div className="absolute inset-0 bg-orange-600/20 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <i className="ri-check-line text-2xl text-orange-600"></i>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${
                    selectedCategory === category.name 
                      ? 'text-orange-600' 
                      : 'text-gray-900 group-hover:text-orange-600'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="flex items-center text-orange-600 font-semibold">
                    <span>
                      {selectedCategory === category.name ? 'Selected' : 'Explore Menu'}
                    </span>
                    <i className={`ml-2 transition-transform ${
                      selectedCategory === category.name 
                        ? 'ri-check-line' 
                        : 'ri-arrow-right-line group-hover:translate-x-2'
                    }`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-6 py-3 rounded-full">
              <i className="ri-information-line mr-2"></i>
              <span className="font-semibold">
                Showing {selectedCategory} dishes below
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
