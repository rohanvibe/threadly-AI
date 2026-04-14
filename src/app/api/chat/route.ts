import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, chatId, skipSave, stream: requestedStream = true } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SAMBANOVA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3.1-8B-Instruct',
        messages: [{ role: 'user', content: message }],
        stream: requestedStream
      })
    })

    if (!response.ok) {
        return NextResponse.json({ error: 'SambaNova Error' }, { status: 500 })
    }

    if (!requestedStream) {
        const data = await response.json()
        const assistantContent = data.choices[0].message.content
        return NextResponse.json({ content: assistantContent })
    }

    // Set up streaming response
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        let fullAssistantContent = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.trim() === '' || line.trim() === 'data: [DONE]') continue
              
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))
                  const content = data.choices[0]?.delta?.content || ''
                  if (content) {
                    fullAssistantContent += content
                    controller.enqueue(encoder.encode(content))
                  }
                } catch (e) {
                  // Ignore parse errors for partial chunks
                }
              }
            }
          }
        } catch (error) {
          controller.error(error)
        } finally {
          // Save assistant message to DB after stream ends (unless it's a utility call like title generation)
          if (fullAssistantContent && !skipSave) {
             await supabase.from('messages').insert([{ 
                chat_id: chatId, 
                role: 'assistant', 
                content: fullAssistantContent 
             }])
          }
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })

  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
