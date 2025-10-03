
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import MenuCategories from './components/MenuCategories';
import MenuFilters from './components/MenuFilters';
import MenuItems from './components/MenuItems';
import ChatWidget from '../../components/feature/ChatWidget';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover authentic Nigerian flavors and international cuisine crafted with love and tradition
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <MenuCategories 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      {/* Menu Filters */}
      <MenuFilters />

      {/* Menu Items */}
      <MenuItems selectedCategory={selectedCategory} />

      <Footer />
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
