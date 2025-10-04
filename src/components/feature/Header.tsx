
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../base/Button';
import { useCart } from '../../hooks/useCart';
import CartModal from './CartModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Initialize cart count and listen for updates
  useEffect(() => {
    const updateCartCount = () => {
      const count = getTotalItems();
      setCartCount(count);
    };

    // Initial count
    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Also listen for storage changes in case cart is updated from another tab
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [getTotalItems]);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleMenuCategoryClick = (path: string) => {
    setShowMenuDropdown(false);
    navigate(path);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setShowMenuDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowMenuDropdown(false);
    }, 150); // 150ms delay before closing
  };

  const menuCategories = [
    { name: 'All Menu', path: '/menu', description: 'View all menu items' },
    { name: 'Nigerian', path: '/menu?category=Nigerian', description: 'Authentic Nigerian cuisine' },
    { name: 'Intercontinental', path: '/menu?category=Intercontinental', description: 'International favorites' },
    { name: 'Grilled Specialties', path: '/menu?category=Grilled', description: 'Perfectly grilled meats' },
    { name: 'Soups & Stews', path: '/menu?category=Soups', description: 'Hearty soups and stews' },
    { name: 'Rice & Grains', path: '/menu?category=Rice', description: 'Rice and grain dishes' },
    { name: 'Desserts & Drinks', path: '/menu?category=Desserts', description: 'Sweet treats and beverages' }
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://static.readdy.ai/image/498db38d60e5e09c4bebbb1ed11634a9/f6174c9791dc49171efbe4263a41832e.jfif" 
                alt="Onje TBells Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full mr-2 md:mr-3"
              />
              <span className="text-lg md:text-2xl font-bold text-orange-600" style={{ fontFamily: '"Pacifico", serif' }}>
                Onje TBells
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
                Home
              </Link>
              
              {/* Menu Dropdown */}
              <div 
                ref={menuContainerRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                  className="text-orange-600 hover:text-orange-700 font-bold transition-colors flex items-center cursor-pointer"
                >
                  Menu
                  <i className="ri-arrow-down-s-line ml-1"></i>
                </button>
                
                {showMenuDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Browse Our Menu</h3>
                      <div className="space-y-2">
                        {menuCategories.map((category, index) => (
                          <button
                            key={index}
                            onClick={() => handleMenuCategoryClick(category.path)}
                            className="w-full text-left block px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                          >
                            <div className="font-semibold text-gray-900 hover:text-orange-600">
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {category.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about" className="text-orange-600 hover:text-orange-700 font-bold transition-colors">
                About
              </Link>
            </nav>

            {/* Social Media Icons & Cart - Desktop */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {/* Social Media Icons */}
              <div className="flex items-center space-x-2 lg:space-x-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-base lg:text-lg"></i>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <i className="ri-instagram-line text-base lg:text-lg"></i>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <i className="ri-twitter-fill text-base lg:text-lg"></i>
                </a>
              </div>

              {/* Cart Button */}
              <Button onClick={handleCartClick} className="whitespace-nowrap cursor-pointer relative text-sm lg:text-base px-3 lg:px-4 py-2">
                <i className="ri-shopping-cart-line mr-1 lg:mr-2"></i>
                <span className="hidden lg:inline">{cartCount > 0 ? `Cart (${cartCount})` : 'Cart'}</span>
                <span className="lg:hidden">{cartCount}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Cart & Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              {/* Mobile Cart Button */}
              <Button onClick={handleCartClick} className="whitespace-nowrap cursor-pointer relative text-sm px-3 py-2">
                <i className="ri-shopping-cart-line"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-orange-600 cursor-pointer"
              >
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-orange-600 hover:text-orange-700 font-bold transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile Menu Categories */}
                <div className="pl-2">
                  <div className="text-orange-600 font-bold mb-2">Menu Categories:</div>
                  <div className="grid grid-cols-1 gap-1">
                    {menuCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleMenuCategoryClick(category.path);
                          setIsMenuOpen(false);
                        }}
                        className="text-left py-2 px-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors cursor-pointer"
                      >
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Link 
                  to="/about" 
                  className="text-orange-600 hover:text-orange-700 font-bold transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>

                {/* Mobile Social Media Icons */}
                <div className="flex items-center space-x-4 pt-2 px-2">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-facebook-fill text-lg"></i>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-instagram-line text-lg"></i>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-twitter-fill text-lg"></i>
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
