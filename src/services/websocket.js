import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

socket.on('connect', () => {
  console.log('Connected to MIMIQ backend')
})

socket.on('disconnect', () => {
  console.log('Disconnected from backend')
})

export function subscribeToPatient(patientId) {
  socket.emit('subscribe', { patient_id: patientId })
}

export function onAgentUpdate(callback) {
  socket.on('agent_update', callback)
}

export function onAnalysisComplete(callback) {
  socket.on('analysis_complete', callback)
}

export default socket
