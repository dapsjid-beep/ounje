
import { useState } from 'react';

const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'];
const spiceLevels = [
  { value: 'All', label: 'All Spice Levels', icon: 'ri-fire-line', color: 'gray' },
  { value: 'Mild', label: 'Mild', icon: 'ri-fire-line', color: 'green' },
  { value: 'Medium', label: 'Medium', icon: 'ri-fire-fill', color: 'yellow' },
  { value: 'Hot', label: 'Hot', icon: 'ri-fire-fill', color: 'orange' },
  { value: 'Extra Hot', label: 'Extra Hot', icon: 'ri-fire-fill', color: 'red' }
];
const priceRanges = ['All', '$10-20', '$20-30', '$30-40', '$40+'];

export default function MenuFilters() {
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [selectedSpice, setSelectedSpice] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSpiceDropdown, setShowSpiceDropdown] = useState(false);

  const getSpiceColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const selectedSpiceLevel = spiceLevels.find(level => level.value === selectedSpice) || spiceLevels[0];

  return (
    <section className="py-12 bg-white border-b">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search dishes, ingredients, or regions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none pl-14"
            />
            <i className="ri-search-line absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Dietary Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedDietary(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedDietary === option
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Spice Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Spice Level</label>
              <div className="relative">
                <button
                  onClick={() => setShowSpiceDropdown(!showSpiceDropdown)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedSpice !== 'All' 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${selectedSpiceLevel.icon} mr-2 ${getSpiceColor(selectedSpiceLevel.color).split(' ')[0]}`}></i>
                    <span className="font-medium">{selectedSpiceLevel.label}</span>
                  </div>
                  <i className={`ri-arrow-down-s-line transition-transform ${showSpiceDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                
                {showSpiceDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {spiceLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => {
                          setSelectedSpice(level.value);
                          setShowSpiceDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center cursor-pointer ${
                          selectedSpice === level.value ? 'bg-red-50' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getSpiceColor(level.color)}`}>
                          <i className={level.icon}></i>
                        </div>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          {level.value !== 'All' && (
                            <div className="text-xs text-gray-5
0">
                              {level.value === 'Mild' && 'Perfect for sensitive palates'}
                              {level.value === 'Medium' && 'Balanced heat with flavor'}
                              {level.value === 'Hot' && 'Serious spice lovers'}
                              {level.value === 'Extra Hot' && 'Only for the brave!'}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedPrice(range)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedPrice === range
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDietary !== 'All' || selectedSpice !== 'All' || selectedPrice !== 'All') && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600">Active filters:</span>
                {selectedDietary !== 'All' && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center">
                    {selectedDietary}
                    <button 
                      onClick={() => setSelectedDietary('All')}
                      className="ml-2 hover:text-orange-900 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </span>
                )}
                {selectedSpice !== 'All' && (
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getSpiceColor(selectedSpiceLevel.color)}`}>
                    <i className={`${selectedSpiceLevel.icon} mr-1`}></i>
                    {selectedSpice}
                    <button 
                      onClick={() => setSelectedSpice('All')}
                      className="ml-2 hover:opacity-75 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </span>
                )}
                {selectedPrice !== 'All' && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                    {selectedPrice}
                    <button 
                      onClick={() => setSelectedPrice('All')}
                      className="ml-2 hover:text-green-900 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedDietary('All');
                    setSelectedSpice('All');
                    setSelectedPrice('All');
                  }}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Spice Level Guide - Reduced even more */}
        <div className="bg-gradient-to-r from-green-50 via-yellow-50 via-orange-50 to-red-50 p-1.5 rounded-lg mb-8">
          <h3 className="text-xs font-bold text-gray-900 mb-1 text-center">🌶️ Spice Level Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {spiceLevels.slice(1).map((level) => (
              <div key={level.value} className="text-center">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mx-auto mb-0.5 ${getSpiceColor(level.color)}`}>
                  <i className={`${level.icon} text-xs`}></i>
                </div>
                <div className="font-semibold text-xs">{level.label}</div>
                <div className="text-xs text-gray-600">
                  {level.value === 'Mild' && 'Gentle'}
                  {level.value === 'Medium' && 'Moderate'}
                  {level.value === 'Hot' && 'Intense'}
                  {level.value === 'Extra Hot' && 'Extreme'}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
