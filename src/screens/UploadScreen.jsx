import { useRef, useState } from 'react'
import { useAppStore, genId } from '../stores/appStore'

function formatSize(size) {
  if (size < 1024) return `${size} B`
  const kb = size / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

export default function UploadScreen() {
  const addFile = useAppStore((s) => s.addFile)
  const updateFileProgress = useAppStore((s) => s.updateFileProgress)
  const updateFileStatus = useAppStore((s) => s.updateFileStatus)
  const removeFile = useAppStore((s) => s.removeFile)
  const uploadedFiles = useAppStore((s) => s.uploadedFiles)

  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const id = genId('file')
      const f = {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        status: 'uploading',
        progress: 0,
      }
      addFile(f)
      // simulate upload
      let p = 0
      const timer = setInterval(() => {
        p += Math.random() * 20
        if (p >= 100) {
          p = 100
          clearInterval(timer)
          updateFileStatus(id, 'success')
        }
        updateFileProgress(id, Math.floor(p))
      }, 400)
    })
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-semibold text-white">Upload Medical Reports</h2>
      <p className="text-slate-300">Upload your medical reports, lab results, or imaging files for AI analysis</p>

      {/* Upload zone */}
      <div
        className={`mt-6 rounded-3xl p-10 border-2 border-dashed ${dragOver ? 'border-indigo-400 shadow-[0_0_30px_rgba(102,126,234,0.4)]' : 'border-white/20'} bg-[rgba(26,32,44,0.6)] backdrop-blur-xl`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-center text-slate-300">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 mb-4"></div>
          <div className="text-lg">Drop files here</div>
          <div className="opacity-70">or click to browse</div>
          <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white">Select Files</button>
          <div className="mt-2 text-xs opacity-60">Supported: .pdf, .jpg, .jpeg, .png, .dcm, .txt, .csv</div>
          <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>
      </div>

      {/* Files list */}
      <div className="mt-6 text-white">
        <div className="flex items-center justify-between">
          <div className="text-lg">Uploaded Files ({uploadedFiles.length})</div>
          <button className="px-3 py-2 rounded-lg bg-white/5 text-slate-200 border border-white/10">Analyze All Files</button>
        </div>
        <div className="mt-4 space-y-3">
          {uploadedFiles.map((f) => (
            <div key={f.id} className="rounded-2xl p-4 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <div>
                    <div className="text-slate-100 truncate max-w-[60vw]">{f.name}</div>
                    <div className="text-xs text-slate-400">{formatSize(f.size)} • {new Date(f.uploadedAt).toLocaleTimeString()}</div>
                  </div>
                </div>
                <button onClick={() => removeFile(f.id)} className="px-3 py-2 rounded-lg bg-white/5 text-slate-200 border border-white/10">Remove</button>
              </div>
              {f.status === 'uploading' && (
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" style={{ width: `${f.progress}%` }} />
                </div>
              )}
              {f.status === 'success' && (
                <div className="mt-2 text-sm text-green-400">Uploaded ✔</div>
              )}
              {f.status === 'error' && (
                <div className="mt-2 text-sm text-red-400">Error ❌</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '🔒', title: 'Secure & Private', desc: 'Your files are encrypted' },
          { icon: '🤖', title: 'AI Analysis', desc: '6 specialist agents analyze automatically' },
          { icon: '⚡', title: 'Instant Results', desc: 'Get analysis in under 30 seconds' },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl p-5 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
            <div className="text-2xl">{c.icon}</div>
            <div className="text-white font-semibold">{c.title}</div>
            <div className="text-slate-300">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
