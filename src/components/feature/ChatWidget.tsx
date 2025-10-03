
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

interface Message {
  id: string;
  sender_type: 'customer' | 'chef';
  sender_name: string;
  message: string;
  created_at: string;
}

interface Conversation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!conversation?.id) return;

    const channel = supabase
      .channel(`chat_${conversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.id]);

  const startChat = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      alert('Please provide your name and email to start chatting.');
      return;
    }

    setIsLoading(true);
    try {
      // Create new conversation
      const { data: newConversation, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          status: 'active'
        })
        .select()
        .single();

      if (convError) throw convError;

      setConversation(newConversation);
      setIsConnected(true);

      // Send welcome message
      const welcomeMessage = `Hello ${customerInfo.name}! Welcome to Chef Titi's Kitchen. How can I help you today?`;
      
      const { error: msgError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: newConversation.id,
          sender_type: 'chef',
          sender_name: 'Chef Titi',
          message: welcomeMessage
        });

      if (msgError) throw msgError;

    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Failed to start chat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversation) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      // Add customer message
      const { error: msgError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: 'customer',
          sender_name: customerInfo.name,
          message: messageText
        });

      if (msgError) throw msgError;

      // Send SMS notification to Chef Titi
      await fetch(`${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/send-sms-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerInfo.name,
          message: messageText,
          conversationId: conversation.id
        })
      });

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 cursor-pointer"
      >
        <i className="ri-message-3-line text-xl"></i>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <i className="ri-restaurant-line text-xl mr-2"></i>
                <div>
                  <h3 className="font-semibold">Chef Titi's Kitchen</h3>
                  <p className="text-orange-100 text-sm">
                    {isConnected ? 'Live Chat' : 'Start a conversation'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-orange-200 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {!isConnected ? (
              /* Customer Info Form */
              <div className="p-4 flex-1">
                <h4 className="font-semibold mb-4">Let's get started!</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email *"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your phone (optional)"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={startChat}
                    disabled={isLoading || !customerInfo.name || !customerInfo.email}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isLoading ? 'Starting Chat...' : 'Start Chat with Chef Titi'}
                  </button>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p>✓ Chat directly on our website</p>
                  <p>✓ Chef Titi will respond from her phone</p>
                  <p>✓ Real-time conversation</p>
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_type === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          message.sender_type === 'customer'
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender_type === 'customer' ? 'text-orange-100' : 'text-gray-500'
                          }`}
                        >
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-send-plane-line"></i>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Chef Titi will be notified and respond shortly
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
