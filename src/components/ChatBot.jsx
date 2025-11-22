import { useEffect, useRef, useState } from 'react'
import { Mic, Send, X } from 'lucide-react'
import { useAppStore, genId } from '../stores/appStore'
import { sendChatMessage } from '../services/api'

export default function ChatBot() {
  const isOpen = useAppStore((s) => s.isChatOpen)
  const toggleChat = useAppStore((s) => s.toggleChat)
  const messages = useAppStore((s) => s.messages)
  const addMessage = useAppStore((s) => s.addMessage)
  const patientId = useAppStore((s) => s.patientId)

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  if (!isOpen) return null

  const onSend = async () => {
    if (!input.trim()) return
    const content = input
    setInput('')
    addMessage({ id: genId('msg'), role: 'user', content })
    setLoading(true)
    const res = await sendChatMessage(patientId, content)
    setLoading(false)
    if (res?.response) {
      addMessage({ role: 'assistant', content: res.response })
    } else {
      addMessage({ role: 'assistant', content: res?.error || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="fixed right-5 bottom-5 z-50 w-[400px] h-[600px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-24px)]">
      <div className="h-full rounded-2xl overflow-hidden bg-[rgba(26,32,44,0.6)] backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(102,126,234,0.4)] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 grid place-items-center">🤖</div>
            <div>
              <div className="font-semibold">MIMIQ AI Assistant</div>
              <div className="text-xs opacity-80">Online • Always here to help</div>
            </div>
          </div>
          <button onClick={toggleChat} className="p-1 rounded hover:bg-white/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-[0_0_20px_rgba(102,126,234,0.4)]'
                    : 'bg-white/5 text-slate-200 border border-white/10'
                }`}
              >
                <div>{m.content}</div>
                <div className="text-[10px] opacity-60 mt-1">
                  {new Date(m.timestamp || Date.now()).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-slate-300">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-300/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-300/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-300/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              Typing...
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10">
              <Mic className="w-5 h-5" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={onSend}
              disabled={!input.trim() || loading}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
