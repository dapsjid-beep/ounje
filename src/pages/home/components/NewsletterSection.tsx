
import { useState, useEffect } from 'react';
import Button from '../../../components/base/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitAddr, setSubmitAddr] = useState('');

  useEffect(() => {
    // Get form URL when component mounts
    const getFormUrl = async () => {
      try {
        const response = await fetch('/api/get-form-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'newsletter-subscription' }),
        });
        const data = await response.json();
        if (data.submitAddr) {
          setSubmitAddr(data.submitAddr);
        }
      } catch (error) {
        console.error('Error getting form URL:', error);
      }
    };

    getFormUrl();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubmitMessage('Please enter your email address');
      return;
    }

    if (!submitAddr) {
      setSubmitMessage('Form not ready. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await fetch(submitAddr, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (response.ok) {
        setSubmitMessage('Thank you for subscribing! You\'ll receive our latest updates and special offers.');
        setEmail('');
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-orange-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Connected with Ọ̀njẹ́ TBells
            </h2>
            <p className="text-base md:text-xl text-orange-100 max-w-2xl mx-auto px-4 md:px-0">
              Subscribe to our newsletter and be the first to know about new menu items, 
              special offers, cooking tips, and exclusive chef services.
            </p>
          </div>

          {/* Newsletter Form */}
          <form 
            id="newsletter-form"
            data-readdy-form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-6 md:mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 text-sm md:text-base"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap text-sm md:text-base"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line mr-2 animate-spin"></i>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <i className="ri-mail-send-line mr-2"></i>
                    Subscribe
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`mb-6 p-3 rounded-lg text-sm md:text-base ${
              submitMessage.includes('Thank you') 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-white">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                <i className="ri-restaurant-line text-xl md:text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">New Menu Items</h3>
              <p className="text-xs md:text-sm text-orange-100 text-center">Be first to try our latest dishes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                <i className="ri-price-tag-3-line text-xl md:text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">Exclusive Offers</h3>
              <p className="text-xs md:text-sm text-orange-100 text-center">Special discounts for subscribers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                <i className="ri-lightbulb-line text-xl md:text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">Cooking Tips</h3>
              <p className="text-xs md:text-sm text-orange-100 text-center">Learn authentic African cooking</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                <i className="ri-calendar-event-line text-xl md:text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">Events & Classes</h3>
              <p className="text-xs md:text-sm text-orange-100 text-center">Cooking classes and special events</p>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs md:text-sm text-orange-200 mt-6 md:mt-8 px-4 md:px-0">
            We respect your privacy. Unsubscribe at any time. No spam, just delicious updates!
          </p>
        </div>
      </div>
    </section>
  );
}
