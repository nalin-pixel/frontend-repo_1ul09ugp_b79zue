const API_URL = 'http://localhost:5000/api'

async function jsonFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const msg = data?.error || res.statusText || 'Request failed'
      console.error('API error:', msg)
      return { error: msg }
    }
    return data
  } catch (e) {
    console.error('Network error:', e)
    return { error: String(e.message || e) }
  }
}

export async function sendChatMessage(patientId, message) {
  return jsonFetch(`${API_URL}/chat`, {
    method: 'POST',
    body: JSON.stringify({ patient_id: patientId, message }),
  })
}

export async function startAnalysis(patientId) {
  return jsonFetch(`${API_URL}/analyze`, {
    method: 'POST',
    body: JSON.stringify({ patient_id: patientId }),
  })
}

export async function getResults(patientId) {
  return jsonFetch(`${API_URL}/results/${patientId}`)
}

export async function getAgentStatus() {
  return jsonFetch(`${API_URL}/agents/status`)
}

export async function healthCheck() {
  return jsonFetch('http://localhost:5000/health')
}
