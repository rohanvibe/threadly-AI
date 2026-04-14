'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'
import { 
  Plus, 
  Send, 
  Settings, 
  MessageSquare, 
  Menu, 
  ChevronRight, 
  ChevronLeft,
  X,
  History,
  Command,
  Zap,
  Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Types
type Message = {
  id: string
  chat_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

type Chat = {
  id: string
  title: string
  created_at: string
}

type Prompt = {
  id: string
  title: string
  template: string
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showPrompts, setShowPrompts] = useState(false)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [modelType, setModelType] = useState<'default' | 'byok'>('default')
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
      } else {
        setUser(user)
        fetchChats(user.id)
        fetchPrompts(user.id)
      }
    }
    checkUser()
  }, [])

  useEffect(() => {
    if (currentChatId) {
      fetchMessages(currentChatId)
    } else {
      setMessages([])
    }
  }, [currentChatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchChats = async (userId: string) => {
    const { data } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) setChats(data)
  }

  const fetchMessages = async (chatId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  const fetchPrompts = async (userId: string) => {
    const { data } = await supabase
      .from('prompts')
      .select('*')
      .eq('user_id', userId)
    if (data) setPrompts(data)
  }

  const createNewChat = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from('chats')
      .insert([{ user_id: user.id, title: 'New Chat' }])
      .select()
      .single()
    
    if (data) {
      setChats([data, ...chats])
      setCurrentChatId(data.id)
    }
  }

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || loading || !user) return

    let chatId = currentChatId
    if (!chatId) {
      // Create chat if none exists
      const { data } = await supabase
        .from('chats')
        .insert([{ user_id: user.id, title: input.slice(0, 30) }])
        .select()
        .single()
      if (data) {
        chatId = data.id
        setCurrentChatId(chatId)
        setChats([data, ...chats])
      } else return
    }

    const userMessage = input
    setInput('')
    setLoading(true)

    // Optimistically add user message
    const tempUserMsg: Message = {
      id: Math.random().toString(),
      chat_id: chatId!,
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    }
    setMessages(prev => [...prev, tempUserMsg])

    // Save user message to DB
    await supabase.from('messages').insert([{ chat_id: chatId, role: 'user', content: userMessage }])

    try {
      let assistantResponse = ''
      
      if (modelType === 'default') {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage, chatId })
        })
        const data = await res.json()
        assistantResponse = data.content
      } else {
        // BYOK Logic (simplified for now, will implement properly later)
        const keys = JSON.parse(localStorage.getItem('threadly_keys') || '{}')
        if (!keys.openai) {
          assistantResponse = "Please set your OpenAI API key in settings for BYOK mode."
        } else {
          // Call OpenAI directly
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${keys.openai}`
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: userMessage }]
            })
          })
          const data = await res.json()
          assistantResponse = data.choices[0].message.content
        }
      }

      // Save assistant message to DB
      const { data: assistantMsgData } = await supabase
        .from('messages')
        .insert([{ chat_id: chatId, role: 'assistant', content: assistantResponse }])
        .select()
        .single()

      if (assistantMsgData) {
        setMessages(prev => [...prev, assistantMsgData])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const scrollToMessage = (msgId: string) => {
    const el = document.getElementById(`message-${msgId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setHighlightedMessageId(msgId)
      setTimeout(() => setHighlightedMessageId(null), 2000)
    }
  }

  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Left Navigation (Chats) */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 border-r border-[#27272a] flex flex-col bg-[#09090b]"
          >
            <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
              <h1 className="font-bold text-xl flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Threadly
              </h1>
              <Button variant="ghost" size="sm" onClick={() => setIsNavOpen(false)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-3">
              <Button className="w-full flex items-center gap-2" onClick={createNewChat}>
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
              {chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChatId(chat.id)}
                  className={`w-full text-left p-3 rounded-md text-sm transition-colors flex items-center gap-3 ${
                    currentChatId === chat.id ? 'bg-[#27272a] text-white' : 'text-gray-400 hover:bg-[#18181b]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-[#27272a] space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setShowPrompts(true)}>
                <Command className="w-4 h-4" />
                Prompts
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <div className="pt-2 flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isNavOpen && (
        <button 
          onClick={() => setIsNavOpen(true)}
          className="p-4 hover:text-blue-500 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative glass">
        {/* Header */}
        <header className="h-16 border-b border-[#27272a] flex items-center justify-between px-6 bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex bg-[#18181b] rounded-full p-1 border border-[#27272a] shadow-inner">
              <button 
                onClick={() => setModelType('default')}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${modelType === 'default' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
              >
                SambaNova
              </button>
              <button 
                onClick={() => setModelType('byok')}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${modelType === 'byok' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
              >
                BYOK
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={isSidebarOpen ? 'text-blue-500 bg-blue-500/10' : ''}>
                <History className="w-5 h-5" />
             </Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-hide">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-80">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl glow">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="max-w-md space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Threadly</h2>
                <p className="text-gray-400">The high-performance AI workspace. Securely powered by SambaNova and your custom keys.</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-10 py-10">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  id={`message-${msg.id}`}
                  className={`flex gap-6 group transition-all duration-700 rounded-xl p-4 -m-4 ${
                    highlightedMessageId === msg.id ? 'highlight-bg border border-blue-500/30' : 'border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                    msg.role === 'assistant' ? 'bg-blue-600 text-white glow' : 'bg-[#27272a] text-gray-400'
                  }`}>
                    {msg.role === 'assistant' ? <Zap className="w-5 h-5" /> : <Plus className="w-5 h-5 rotate-45" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm tracking-wide uppercase text-gray-500">
                        {msg.role === 'assistant' ? 'Assistant' : 'Member'}
                      </span>
                      <span className="text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-[15px]">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-6 border-t border-[#27272a]">
           <form onSubmit={sendMessage} className="max-w-3xl mx-auto relative">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Threadly..."
                className="pr-12 py-6 bg-[#18181b] border-[#27272a] focus:border-blue-500"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
           </form>
           <p className="text-[10px] text-center mt-3 text-gray-500 uppercase tracking-widest font-medium">
             SambaNova LLaMA 3.1 8B • Enterprise AI
           </p>
        </div>
      </div>

      {/* Right Sidebar (Navigation) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-72 border-l border-[#27272a] flex flex-col bg-[#09090b]"
          >
            <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
              <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500">Navigation</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.filter(m => m.role === 'user').map((msg, idx) => (
                <button
                  key={msg.id}
                  onClick={() => scrollToMessage(msg.id)}
                  className="w-full text-left p-3 rounded-lg border border-[#27272a] hover:bg-[#18181b] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-blue-500 font-bold">{idx + 1}.</span>
                    <span className="text-sm truncate text-gray-300 group-hover:text-white">{msg.content}</span>
                  </div>
                </button>
              ))}
              {messages.filter(m => m.role === 'user').length === 0 && (
                <p className="text-center text-gray-500 text-sm py-10">No user messages yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals placeholders - to be implemented next */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showPrompts && <PromptManager userId={user?.id} onClose={() => setShowPrompts(false)} onSelect={(p) => setInput(p)} />}
    </div>
  )
}

// Sub-components (Simplified for now)
function SettingsModal({ onClose }: { onClose: () => void }) {
  const [keys, setKeys] = useState({ openai: '', anthropic: '' })

  useEffect(() => {
    const saved = localStorage.getItem('threadly_keys')
    if (saved) setKeys(JSON.parse(saved))
  }, [])

  const save = () => {
    localStorage.setItem('threadly_keys', JSON.stringify(keys))
    onClose()
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md border-[#27272a]">
        <CardHeader>
          <CardTitle>BYOK Settings</CardTitle>
          <CardDescription>Your keys are saved locally in your browser.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">OpenAI API Key</label>
            <Input 
              type="password"
              value={keys.openai}
              onChange={(e) => setKeys({...keys, openai: e.target.value})}
              placeholder="sk-..."
            />
          </div>
          <p className="text-[10px] text-gray-500 italic">* These keys are never sent to the server. Requests will be made directly from your browser.</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={save}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PromptManager({ userId, onClose, onSelect }: { userId: string, onClose: () => void, onSelect: (t: string) => void }) {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [newTitle, setNewTitle] = useState('')
    const [newTemplate, setNewTemplate] = useState('')
    const supabase = createClient()

    useEffect(() => {
        if (userId) fetchPrompts()
    }, [userId])

    const fetchPrompts = async () => {
        const { data } = await supabase.from('prompts').select('*').eq('user_id', userId)
        if (data) setPrompts(data)
    }

    const savePrompt = async () => {
        if (!newTitle || !newTemplate) return
        const { data } = await supabase.from('prompts').insert([{ user_id: userId, title: newTitle, template: newTemplate }]).select().single()
        if (data) {
            setPrompts([...prompts, data])
            setNewTitle('')
            setNewTemplate('')
        }
    }

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <Card className="w-full max-w-2xl border-[#27272a] flex flex-col max-h-[80vh]">
                <CardHeader className="shrink-0">
                    <CardTitle>Saved Prompts</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {prompts.map(p => (
                            <button 
                                key={p.id}
                                onClick={() => { onSelect(p.template); onClose(); }}
                                className="p-4 rounded-lg border border-[#27272a] bg-[#18181b] hover:border-blue-500 text-left transition-colors"
                            >
                                <h4 className="font-bold text-sm mb-1">{p.title}</h4>
                                <p className="text-xs text-gray-500 line-clamp-2">{p.template}</p>
                            </button>
                        ))}
                    </div>
                    
                    <div className="p-4 rounded-lg border border-dashed border-[#27272a] space-y-3">
                        <h4 className="text-sm font-bold">Add New Prompt</h4>
                        <Input placeholder="Prompt Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                        <textarea 
                            className="w-full h-24 rounded-md border border-[#27272a] bg-[#18181b] px-3 py-2 text-sm"
                            placeholder="Prompt template..."
                            value={newTemplate}
                            onChange={e => setNewTemplate(e.target.value)}
                        />
                        <Button className="w-full" onClick={savePrompt}>Save Prompt</Button>
                    </div>
                </CardContent>
                <CardFooter className="shrink-0 justify-end">
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
