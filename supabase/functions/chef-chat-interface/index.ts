import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const conversationId = url.searchParams.get('conversation')

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseKey)

  if (req.method === 'GET') {
    // Serve the chat interface HTML
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chef Titi - Customer Chat</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="max-w-md mx-auto bg-white min-h-screen shadow-lg">
            <!-- Header -->
            <div class="bg-orange-500 text-white p-4 flex items-center">
                <i class="ri-restaurant-line text-2xl mr-3"></i>
                <div>
                    <h1 class="font-bold text-lg">Chef Titi's Kitchen</h1>
                    <p class="text-orange-100 text-sm">Customer Chat</p>
                </div>
            </div>

            <!-- Chat Messages -->
            <div id="messages" class="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto">
                <div class="text-center text-gray-500 text-sm">Loading conversation...</div>
            </div>

            <!-- Reply Form -->
            <div class="border-t p-4 bg-white">
                <form id="replyForm" class="flex space-x-2">
                    <input 
                        type="text" 
                        id="replyMessage" 
                        placeholder="Type your reply..." 
                        class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    >
                    <button 
                        type="submit" 
                        class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                    >
                        <i class="ri-send-plane-line"></i>
                    </button>
                </form>
            </div>
        </div>

        <script>
            const conversationId = '${conversationId}';
            const messagesContainer = document.getElementById('messages');
            const replyForm = document.getElementById('replyForm');
            const replyMessage = document.getElementById('replyMessage');

            // Load conversation
            async function loadConversation() {
                try {
                    const response = await fetch(\`${supabaseUrl}/functions/v1/chef-chat-interface?conversation=\${conversationId}&action=get_messages\`);
                    const data = await response.json();
                    
                    if (data.conversation && data.messages) {
                        displayMessages(data.conversation, data.messages);
                    }
                } catch (error) {
                    console.error('Error loading conversation:', error);
                    messagesContainer.innerHTML = '<div class="text-center text-red-500 text-sm">Error loading conversation</div>';
                }
            }

            function displayMessages(conversation, messages) {
                const customerInfo = \`
                    <div class="bg-blue-50 p-3 rounded-lg mb-4">
                        <h3 class="font-semibold text-blue-800">Customer: \${conversation.customer_name}</h3>
                        <p class="text-blue-600 text-sm">\${conversation.customer_email}</p>
                        <p class="text-blue-600 text-sm">\${conversation.customer_phone || 'No phone provided'}</p>
                    </div>
                \`;

                const messageElements = messages.map(msg => {
                    const isChef = msg.sender_type === 'chef';
                    const time = new Date(msg.created_at).toLocaleTimeString();
                    
                    return \`
                        <div class="flex \${isChef ? 'justify-end' : 'justify-start'}">
                            <div class="\${isChef ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'} max-w-xs px-3 py-2 rounded-lg">
                                <p class="text-sm">\${msg.message}</p>
                                <p class="\${isChef ? 'text-orange-100' : 'text-gray-500'} text-xs mt-1">\${time}</p>
                            </div>
                        </div>
                    \`;
                }).join('');

                messagesContainer.innerHTML = customerInfo + messageElements;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            // Send reply
            replyForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const message = replyMessage.value.trim();
                if (!message) return;

                try {
                    const response = await fetch(\`${supabaseUrl}/functions/v1/chef-chat-interface\`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: 'send_reply',
                            conversationId,
                            message
                        })
                    });

                    if (response.ok) {
                        replyMessage.value = '';
                        loadConversation(); // Reload to show new message
                    }
                } catch (error) {
                    console.error('Error sending reply:', error);
                    alert('Error sending message. Please try again.');
                }
            });

            // Auto-refresh every 10 seconds
            setInterval(loadConversation, 10000);
            
            // Initial load
            loadConversation();
        </script>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html' }
    });
  }

  if (req.method === 'POST') {
    try {
      const { action, conversationId, message } = await req.json();

      if (action === 'send_reply') {
        // Add chef's reply to messages
        const { error } = await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            sender_type: 'chef',
            sender_name: 'Chef Titi',
            message: message
          });

        if (error) throw error;

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
  }

  // Handle GET request for messages
  if (url.searchParams.get('action') === 'get_messages') {
    try {
      // Get conversation details
      const { data: conversation } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      // Get messages
      const { data: messages } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      return new Response(
        JSON.stringify({ conversation, messages }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
  }

  return new Response('Not found', { status: 404 });
})