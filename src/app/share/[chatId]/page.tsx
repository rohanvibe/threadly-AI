import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Zap, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SharePage({ params }: { params: { chatId: string } }) {
  const supabase = await createClient()
  
  // Fetch chat
  const { data: chat, error: chatError } = await supabase
    .from('chats')
    .select('*')
    .eq('id', params.chatId)
    .single()

  if (chatError) {
    console.error("Shared Chat Fetch Error:", chatError)
  }

  if (!chat) notFound()

  // Fetch messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', params.chatId)
    .order('created_at', { ascending: true })

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-blue-500/30">
      {/* Aesthetic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 grain-texture" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Zap className="w-5 h-5 text-white fill-current" />
             </div>
             <span className="font-black text-xl tracking-tighter uppercase">Threadly</span>
          </div>
          <Link href="/" className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 group">
             Try Threadly <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-16 space-y-4">
           <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{chat.title}</h1>
           <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">Shared Artifact • Created with Threadly AI</p>
        </div>

        <div className="space-y-16">
          {messages?.map((msg) => (
            <div key={msg.id} className="flex gap-6 md:gap-10 group animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'assistant' ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-white/5 text-gray-500'
               }`}>
                 {msg.role === 'assistant' ? <Zap className="w-5 h-5" /> : <Plus className="w-5 h-5 rotate-45" />}
               </div>
               <div className="flex-1 space-y-4 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[10px] tracking-[0.3em] uppercase text-gray-500">
                      {msg.role === 'assistant' ? 'Assistant·AI' : 'Member·Space'}
                    </span>
                  </div>
                  <div className="text-gray-200 leading-relaxed text-[16px] prose prose-invert prose-sm max-w-none prose-p:leading-[1.8] prose-pre:rounded-2xl prose-code:text-blue-400 wrap-break-word whitespace-pre-wrap">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Footer Viral CTA */}
        <div className="mt-24 p-12 rounded-3xl border border-white/5 bg-white/1 text-center space-y-8 relative overflow-hidden group">
           <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight">Experience high-speed intelligence.</h2>
              <p className="text-gray-400 max-w-md mx-auto">Threadly is a next-gen workspace designed for thinkers and builders. Navigate massive threads in milliseconds.</p>
              <Link href="/" className="inline-flex h-14 items-center justify-center px-10 rounded-2xl bg-blue-600 font-bold text-white hover:bg-blue-500 shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all active:scale-95">
                 Get Started — It's Free
              </Link>
              <div className="pt-4">
                 <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">threadly.app</span>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
