import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import Avatar from './Avatar'

export default function Podium({ playerData, finalScore }) {
  const [top3, setTop3] = useState([])

  useEffect(() => {
    const playersRef = ref(db, 'players')
    const unsubscribe = onValue(playersRef, (snap) => {
      const data = snap.val() || {}
      const list = Object.values(data).sort((a, b) => b.score - a.score).slice(0, 3)
      setTop3(list)
    })
    return () => unsubscribe()
  }, [])

  const medals = ['🥇', '🥈', '🥉']
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32']

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: 20 }}>
      <h1 style={{ fontSize: 40, color: '#FFD700', marginBottom: 30, textShadow: '3px 3px 0 #000' }}>🏆 Podio Final</h1>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' }}>
        {top3.length === 0 ? <p>Cargando...</p> : top3.map((p, i) => (
          <div key={i} style={{ background: '#16213e', padding: 20, borderRadius: 12, textAlign: 'center', width: 180, border: `4px solid ${colors[i]}`, boxShadow: `0 0 30px ${colors[i]}55` }}>
            <div style={{ fontSize: 48 }}>{medals[i]}</div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
              <Avatar config={p.avatarConfig || {}} size={80} />
            </div>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>{p.name}</div>
            <div style={{ color: '#e94560', fontSize: 24, marginTop: 4, fontWeight: 'bold' }}>{p.score} pts</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, background: '#16213e', padding: 20, borderRadius: 12, textAlign: 'center', border: '2px solid #e94560' }}>
        <p style={{ color: '#aaa', fontSize: 14, margin: 0 }}>Tu resultado</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <Avatar config={playerData.avatarConfig || {}} size={60} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{playerData.name}</div>
            <div style={{ color: '#e94560', fontSize: 24, fontWeight: 'bold' }}>{finalScore} puntos</div>
          </div>
        </div>
      </div>
    </div>
  )
}