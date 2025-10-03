
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import FeaturedCuisines from './components/FeaturedCuisines';
import GrillSpecials from './components/GrillSpecials';
import ChefServices from './components/ChefServices';
import NewsletterSection from './components/NewsletterSection';
import ChefBookingModal from './components/ChefBookingModal';
import ChatWidget from '../../components/feature/ChatWidget';

export default function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Cuisines */}
      <FeaturedCuisines />

      {/* Grill Specials */}
      <GrillSpecials />

      {/* Chef Services */}
      <ChefServices />

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />

      {/* Chef Booking Modal */}
      {isBookingModalOpen && (
        <ChefBookingModal onClose={() => setIsBookingModalOpen(false)} />
      )}

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
