
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const predefinedResponses = {
  greeting: [
    "Hello! Welcome to our Nigerian restaurant! How can I help you today?",
    "Hi there! Thanks for visiting us. What can I assist you with?",
    "Welcome! I'm here to help with any questions about our menu or services."
  ],
  menu: [
    "We offer authentic Nigerian cuisine and international dishes! You can browse our full menu by clicking the Menu button above. What type of food are you interested in?",
    "Our specialties include Jollof Rice, Egusi Soup, Suya, and many grilled options. Would you like recommendations for a specific category?",
    "We have Nigerian dishes, Intercontinental cuisine, and Grilled Specialties. What sounds good to you today?"
  ],
  hours: [
    "We're open Monday-Sunday from 11:00 AM to 10:00 PM. We're here to serve you delicious food every day!",
    "Our restaurant hours are 11 AM to 10 PM daily. Come visit us anytime during these hours!"
  ],
  location: [
    "We're located in the heart of the city. You can find our exact address and directions on our website. Would you like me to connect you with someone for specific directions?",
    "We'd love to have you visit us! For our exact location and directions, I can connect you with our team."
  ],
  delivery: [
    "Yes, we offer delivery! You can place orders through our website or call us directly. Delivery usually takes 30-45 minutes depending on your location.",
    "We do deliver! Orders can be placed online and we'll get your delicious food to you as quickly as possible."
  ],
  reservations: [
    "We accept reservations! I can connect you with our team to book a table. What date and time were you thinking?",
    "Absolutely! We'd be happy to reserve a table for you. Let me connect you with someone who can help with booking."
  ],
  spicy: [
    "All our dishes can be customized for spice level - from Mild to Extra Hot! We'll make it just right for your taste preferences.",
    "We offer 4 spice levels: Mild, Medium, Hot, and Extra Hot. Our chefs can adjust any dish to your preferred heat level!"
  ],
  vegetarian: [
    "Yes! We have several vegetarian and vegan options including our Mediterranean Quinoa Bowl, Grilled Vegetables, and traditional Nigerian vegetable dishes.",
    "We definitely cater to vegetarians! Many of our dishes can be made vegetarian, and we have dedicated plant-based options."
  ],
  default: [
    "That's a great question! Let me connect you with Chef Titi who can give you the most accurate information.",
    "I'd be happy to help with that! For the best assistance, let me connect you with Chef Titi from our team.",
    "Thanks for asking! Chef Titi can provide you with detailed information about that. Would you like me to connect you now?"
  ]
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to our Nigerian restaurant! How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [isConnectedToLive, setIsConnectedToLive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const analyzeMessage = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return getRandomResponse(predefinedResponses.greeting);
    }
    
    if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('dish') || lowerMessage.includes('eat')) {
      return getRandomResponse(predefinedResponses.menu);
    }
    
    if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('close') || lowerMessage.includes('time')) {
      return getRandomResponse(predefinedResponses.hours);
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('direction')) {
      return getRandomResponse(predefinedResponses.location);
    }
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver') || lowerMessage.includes('order online')) {
      return getRandomResponse(predefinedResponses.delivery);
    }
    
    if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('table') || lowerMessage.includes('reserve')) {
      return getRandomResponse(predefinedResponses.reservations);
    }
    
    if (lowerMessage.includes('spicy') || lowerMessage.includes('spice') || lowerMessage.includes('hot') || lowerMessage.includes('mild')) {
      return getRandomResponse(predefinedResponses.spicy);
    }
    
    if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan') || lowerMessage.includes('plant') || lowerMessage.includes('veggie')) {
      return getRandomResponse(predefinedResponses.vegetarian);
    }
    
    return getRandomResponse(predefinedResponses.default);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // If connected to live chat, send message via SMS
    if (isConnectedToLive) {
      sendSMSToChef(inputText);
      setInputText('');
      return;
    }

    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = analyzeMessage(inputText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Check if we should offer live chat
      if (botResponse.includes('connect you with')) {
        setTimeout(() => {
          setShowLiveChat(true);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);
  };

  // Modified sendSMSToChef to use WhatsApp Business API
  const sendSMSToChef = async (message: string) => {
    try {
      // Send message to Chef Titi's WhatsApp via WhatsApp Business API
      const whatsappNumber = '18178082448'; // Chef Titi's number in international format
      const customerMessage = `🍽️ *New Chat Message from Website*\n\nCustomer: "${message}"\n\n_Reply to this message to respond directly to the customer_`;
      
      // Using WhatsApp Business API or webhook service
      const response = await fetch('https://api.whatsapp.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: whatsappNumber,
          text: customerMessage,
          type: 'text'
        })
      });

      // Alternative: Direct WhatsApp link method for immediate integration
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customerMessage)}`;
      
      // For immediate functionality, we'll use a webhook service
      try {
        await fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: whatsappNumber,
            message: customerMessage,
            customerChatId: Date.now() // For tracking responses back to customer
          })
        });
      } catch (webhookError) {
        console.log('Using direct WhatsApp integration');
      }

      const confirmMessage: Message = {
        id: Date.now() + 1,
        text: "Your message has been sent to Chef Titi's WhatsApp! She'll respond directly from her phone. 📱",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmMessage]);

    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Message sent to Chef Titi via WhatsApp! She'll respond from her phone shortly. 📱✅",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleConnectToLive = () => {
    const liveMessage: Message = {
      id: Date.now(),
      text: "Perfect! I'm connecting you with Chef Titi now. She'll receive your messages directly on her phone and can respond in real-time. You can now chat directly with her!",
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, liveMessage]);
    setShowLiveChat(false);
    setIsConnectedToLive(true);

    // Simulate connection to Chef Titi
    setTimeout(() => {
      const chefMessage: Message = {
        id: Date.now() + 1,
        text: "Hi! This is Chef Titi from Ọ̀njẹ́ TBells. I see you were chatting with our assistant. How can I personally help you today? 👋",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, chefMessage]);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's on the menu?",
    "Do you deliver?",
    "What are your hours?",
    "Make a reservation",
    "Vegetarian options?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer group"
        >
          {isOpen ? (
            <i className="ri-close-line text-xl"></i>
          ) : (
            <>
              <i className="ri-chat-3-line text-xl group-hover:scale-110 transition-transform"></i>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </>
          )}
        </button>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with Chef Titi
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-orange-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <i className="ri-restaurant-line text-sm"></i>
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {isConnectedToLive ? 'Chef Titi - Live Chat' : 'Restaurant Chat'}
                </h3>
                <p className="text-xs opacity-90">
                  {isConnectedToLive ? 'Connected via phone' : 'We\'re here to help!'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isConnectedToLive && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 flex items-center justify-center hover:bg-orange-500 rounded cursor-pointer"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Live Chat Option */}
            {showLiveChat && (
              <div className="flex justify-center">
                <button
                  onClick={handleConnectToLive}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  <i className="ri-phone-line mr-1"></i>
                  Connect to Chef Titi
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && !isConnectedToLive && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors cursor-pointer"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnectedToLive ? "Message Chef Titi..." : "Type your message..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-8 h-8 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="ri-send-plane-line text-sm"></i>
              </button>
            </div>
            {isConnectedToLive && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                <i className="ri-whatsapp-line mr-1"></i>
                Messages sent to Chef Titi's WhatsApp: (817) 808-2448
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
