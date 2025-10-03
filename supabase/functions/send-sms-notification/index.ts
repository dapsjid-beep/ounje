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

  try {
    const { customerName, message, conversationId } = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get Twilio credentials from Supabase secrets
    const twilioSid = Deno.env.get('TWILIO_SID')
    const twilioToken = Deno.env.get('TWILIO_TOKEN')
    const twilioPhone = Deno.env.get('TWILIO_PHONE')
    const chefPhone = Deno.env.get('CHEF_PHONE') || '+18178082448' // Chef Titi's phone number

    console.log(`New chat message from ${customerName}: "${message}"`)
    console.log(`Conversation ID: ${conversationId}`)
    console.log(`Reply interface: ${supabaseUrl}/functions/v1/chef-chat-interface?conversation=${conversationId}`)

    // Send SMS if Twilio is configured
    if (twilioSid && twilioToken && twilioPhone) {
      try {
        const smsBody = `🍽️ New customer message from ${customerName}: "${message.substring(0, 100)}${message.length > 100 ? '...' : ''}" Reply at: ${supabaseUrl}/functions/v1/chef-chat-interface?conversation=${conversationId}`

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(`${twilioSid}:${twilioToken}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: twilioPhone,
            To: chefPhone,
            Body: smsBody
          })
        })

        const result = await response.json()
        
        if (response.ok) {
          console.log('SMS sent successfully:', result.sid)
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'SMS notification sent to Chef Titi',
              smsId: result.sid 
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200 
            }
          )
        } else {
          console.error('Twilio error:', result)
          throw new Error(`Twilio error: ${result.message}`)
        }

      } catch (smsError) {
        console.error('SMS sending failed:', smsError)
        // Continue without SMS - still log the notification
      }
    } else {
      console.log('Twilio not configured - SMS notification skipped')
      console.log('Required: TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE in Supabase secrets')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification logged (SMS requires Twilio setup)',
        replyUrl: `${supabaseUrl}/functions/v1/chef-chat-interface?conversation=${conversationId}`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in SMS notification function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})