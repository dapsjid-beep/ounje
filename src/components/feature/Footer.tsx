
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4" style={{ fontFamily: '"Pacifico", serif' }}>
              Ọ̀njẹ́ TBells
            </h3>
            <p className="text-gray-300 mb-4">
              Authentic African cuisine delivered to your doorstep. Experience the rich flavors and traditions of Africa.
            </p>
            <div className="flex space-x-4">
              <i className="ri-facebook-fill text-xl hover:text-orange-500 cursor-pointer transition-colors"></i>
              <i className="ri-twitter-fill text-xl hover:text-orange-500 cursor-pointer transition-colors"></i>
              <i className="ri-instagram-line text-xl hover:text-orange-500 cursor-pointer transition-colors"></i>
              <i className="ri-youtube-fill text-xl hover:text-orange-500 cursor-pointer transition-colors"></i>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">Menu</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">Personal Chefs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">Grill Specials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">Catering</a></li>
              <li><a href="#" className="text-gray-300 hover:textorange-500 transition-colors cursor-pointer">About Us</a></li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Cuisines</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">West African</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">East African</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">South African</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">Central African</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">North African</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="ri-phone-line text-orange-500 mr-3"></i>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <i className="ri-mail-line text-orange-500 mr-3"></i>
                <span className="text-gray-300">hello@afrofeast.com</span>
              </div>
              <div className="flex items-start">
                <i className="ri-map-pin-line text-orange-500 mr-3 mt-1"></i>
                <span className="text-gray-300">123 Flavor Street<br />Foodie District, FD 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© 2024 Ọ̀njẹ́ TBells. All rights reserved. | 001 Tech</p>
        </div>
      </div>
    </footer>
  );
}
