import { create } from 'zustand'

function nowISO() {
  return new Date().toISOString()
}

function genId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`
}

export const useAppStore = create((set, get) => ({
  // Navigation
  currentScreen: 'home', // 'home' | 'dashboard' | 'upload' | 'about'

  // User
  user: null,
  isLoggedIn: false,

  // Chat
  isChatOpen: false,
  messages: [
    {
      id: genId('msg'),
      role: 'assistant',
      content: "👋 Hi! I'm MIMIQ. Tell me what's going on, and I'll help assess your symptoms.",
      timestamp: nowISO(),
    },
  ],

  // Upload
  uploadedFiles: [],

  // Patient
  patientId: `patient_${Date.now()}`,

  // Actions
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  toggleChat: () => set({ isChatOpen: !get().isChatOpen }),
  addMessage: (message) => set({ messages: [...get().messages, { ...message, id: message.id || genId('msg'), timestamp: message.timestamp || nowISO() }] }),
  clearMessages: () => set({ messages: [] }),

  addFile: (file) => set({ uploadedFiles: [...get().uploadedFiles, file] }),
  updateFileProgress: (id, progress) => set({
    uploadedFiles: get().uploadedFiles.map((f) => (f.id === id ? { ...f, progress } : f)),
  }),
  updateFileStatus: (id, status) => set({
    uploadedFiles: get().uploadedFiles.map((f) => (f.id === id ? { ...f, status } : f)),
  }),
  removeFile: (id) => set({ uploadedFiles: get().uploadedFiles.filter((f) => f.id !== id) }),
}))

export { genId, nowISO }
