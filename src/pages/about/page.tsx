
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ChatWidget from '../../components/feature/ChatWidget';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Ọ̀unjẹ́ TBells
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Bringing authentic African flavors to your table with passion, tradition, and love
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Ọ̀unjẹ́ TBells was born from a simple yet powerful vision: to share the incredible diversity and richness of African cuisine with food lovers everywhere. Our journey began in 2020 when our founder, Chef Titi, noticed the lack of authentic African restaurants in the area.
                </p>
                <p>
                  Growing up in Lagos, Nigeria, Chef Titi learned the art of cooking from her grandmother, who passed down recipes that had been in the family for generations. These weren't just recipes – they were stories, traditions, and a connection to heritage that transcended borders.
                </p>
                <p>
                  Today, Ọ̀unjẹ́ TBells serves authentic dishes from across the African continent, from the spicy jollof rice of West Africa to the aromatic tagines of North Africa, all prepared with the freshest ingredients and traditional cooking methods.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20African%20chef%20in%20modern%20kitchen%20preparing%20traditional%20dishes%20with%20colorful%20spices%20and%20ingredients%2C%20warm%20lighting%2C%20authentic%20cooking%20scene%20with%20traditional%20African%20cooking%20utensils%20and%20modern%20equipment%2C%20professional%20food%20photography%20style&width=600&height=400&seq=about-chef&orientation=landscape"
                alt="Chef preparing African cuisine"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Mission & Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-line text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We honor traditional recipes and cooking methods passed down through generations, ensuring every dish tells its authentic story.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-leaf-line text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-600">
                  We source the finest ingredients, from premium spices imported from Africa to fresh, local produce for the best flavors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  Food brings people together. We're building a community that celebrates African culture and connects people through shared meals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <img 
                  src="https://static.readdy.ai/image/498db38d60e5e09c4bebbb1ed11634a9/96d16bfa42d44abdd96c42b5665b934f.jfif"
                  alt="Chef Titi"
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg border-4 border-orange-600"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chef Titi Bello</h3>
                <p className="text-orange-600 mb-3">Head Chef & Founder</p>
                <p className="text-gray-600 text-sm">
                  25+ years of culinary experience specializing in West African cuisine. Trained in Lagos and London.
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20African%20male%20chef%20in%20chef%20uniform%2C%20friendly%20expression%2C%20modern%20kitchen%20background%2C%20professional%20headshot%20style%2C%20warm%20lighting&width=300&height=300&seq=chef-kwame&orientation=squarish"
                  alt="Chef Kwame"
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chef Kwame Asante</h3>
                <p className="text-orange-600 mb-3">Sous Chef</p>
                <p className="text-gray-600 text-sm">
                  Expert in East African cuisine with a passion for grilled meats and traditional spice blends.
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20African%20female%20restaurant%20manager%20in%20business%20attire%2C%20welcoming%20smile%2C%20elegant%20restaurant%20background%2C%20professional%20headshot%20style%2C%20warm%20lighting&width=300&height=300&seq=manager-zara&orientation=squarish"
                  alt="Zara"
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Zara Mwangi</h3>
                <p className="text-orange-600 mb-3">Operations Manager</p>
                <p className="text-gray-600 text-sm">
                  Ensures every customer experience is exceptional, from ordering to delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Sustainability</h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe in responsible sourcing and supporting communities both locally and in Africa.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-plant-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Sourcing</h3>
                <p className="text-gray-600">
                  We partner with local farmers and suppliers to reduce our carbon footprint while supporting the local economy.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-recycle-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Eco-Friendly Packaging</h3>
                <p className="text-gray-600">
                  All our delivery containers are made from biodegradable materials, keeping our planet green.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Authentic African Cuisine?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our community of food lovers and discover the incredible flavors of Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/menu" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              View Our Menu
            </a>
            <a 
              href="tel:+18178082448" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors cursor-pointer"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
