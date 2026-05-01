import { useState } from 'react'
import Avatar from './Avatar'

const SKINS = ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524']
const HAIR_COLORS = ['#4A2C17', '#000000', '#D4AF37', '#B22222', '#FFFFFF']
const HAIR_STYLES = ['short', 'long', 'curly', 'spiky', 'bald']
const SHIRTS = ['#E94560', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0']
const ACCESSORIES = ['none', 'glasses', 'hat', 'mustache', 'cap']
const ACCESSORY_LABELS = { none: 'Ninguno', glasses: '🕶️ Gafas', hat: '🎩 Sombrero', mustache: '👨 Bigote', cap: '🧢 Gorra' }
const HAIR_LABELS = { short: 'Corto', long: 'Largo', curly: 'Rizado', spiky: 'Puntiagudo', bald: 'Calvo' }

export default function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [skin, setSkin] = useState(SKINS[0])
  const [hair, setHair] = useState(HAIR_COLORS[0])
  const [hairStyle, setHairStyle] = useState('short')
  const [shirt, setShirt] = useState(SHIRTS[0])
  const [accessory, setAccessory] = useState('none')
  const [error, setError] = useState('')

  const avatarConfig = { skin, hair, hairStyle, shirt, accessory }

  const handleStart = () => {
    if (!name.trim()) return setError('Escribe tu nombre')
    if (!code.trim()) return setError('Escribe tu código de alumno')
    onLogin({ name: name.trim(), code: code.trim(), avatarConfig })
  }

  const Option = ({ active, onClick, children, color }) => (
    <div onClick={onClick} style={{
      cursor: 'pointer', padding: 6, borderRadius: 8,
      background: color || (active ? '#e94560' : '#0d1117'),
      border: active ? '2px solid #fff' : '2px solid #333',
      minWidth: 30, minHeight: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, color: '#fff', fontWeight: 'bold'
    }}>
      {children}
    </div>
  )

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: 20 }}>
      <div style={{ background:'#16213e', borderRadius:16, padding:30, width:'100%', maxWidth:700, boxShadow:'0 10px 40px rgba(0,0,0,0.5)', display:'flex', gap:30, flexWrap:'wrap' }}>
        
        {/* Preview del avatar */}
        <div style={{ flex:'0 0 220px', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <h3 style={{ color:'#e94560', margin:0 }}>Tu Avatar</h3>
          <div style={{ background:'linear-gradient(180deg, #87CEEB, #98D8E8)', borderRadius:12, padding:20, boxShadow:'inset 0 -20px 30px rgba(0,0,0,0.1)' }}>
            <Avatar config={avatarConfig} size={140} />
          </div>
        </div>

        {/* Formulario */}
        <div style={{ flex:1, minWidth:280 }}>
          <h1 style={{ fontSize:22, marginTop:0, marginBottom:8, color:'#e94560' }}>🎮 Juego de Identidad</h1>
          <p style={{ fontSize:13, color:'#aaa', marginBottom:16 }}>Personaliza tu avatar y entra al juego</p>

          <label style={{ fontSize:12, color:'#ccc' }}>Nombre</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Tu nombre..."
            style={{ width:'100%', padding:'8px 12px', borderRadius:8, border:'1px solid #333', background:'#0d1117', color:'#fff', marginTop:4, marginBottom:10, boxSizing:'border-box' }} />

          <label style={{ fontSize:12, color:'#ccc' }}>Código de alumno</label>
          <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Ej: 2024001"
            style={{ width:'100%', padding:'8px 12px', borderRadius:8, border:'1px solid #333', background:'#0d1117', color:'#fff', marginTop:4, marginBottom:14, boxSizing:'border-box' }} />

          <label style={{ fontSize:12, color:'#ccc' }}>Color de piel</label>
          <div style={{ display:'flex', gap:6, marginTop:4, marginBottom:10 }}>
            {SKINS.map(s => <Option key={s} active={skin===s} onClick={()=>setSkin(s)} color={s} />)}
          </div>

          <label style={{ fontSize:12, color:'#ccc' }}>Estilo de cabello</label>
          <div style={{ display:'flex', gap:6, marginTop:4, marginBottom:6, flexWrap:'wrap' }}>
            {HAIR_STYLES.map(s => <Option key={s} active={hairStyle===s} onClick={()=>setHairStyle(s)}>{HAIR_LABELS[s]}</Option>)}
          </div>

          <label style={{ fontSize:12, color:'#ccc' }}>Color de cabello</label>
          <div style={{ display:'flex', gap:6, marginTop:4, marginBottom:10 }}>
            {HAIR_COLORS.map(c => <Option key={c} active={hair===c} onClick={()=>setHair(c)} color={c} />)}
          </div>

          <label style={{ fontSize:12, color:'#ccc' }}>Color de camisa</label>
          <div style={{ display:'flex', gap:6, marginTop:4, marginBottom:10 }}>
            {SHIRTS.map(c => <Option key={c} active={shirt===c} onClick={()=>setShirt(c)} color={c} />)}
          </div>

          <label style={{ fontSize:12, color:'#ccc' }}>Accesorio</label>
          <div style={{ display:'flex', gap:6, marginTop:4, marginBottom:14, flexWrap:'wrap' }}>
            {ACCESSORIES.map(a => <Option key={a} active={accessory===a} onClick={()=>setAccessory(a)}>{ACCESSORY_LABELS[a]}</Option>)}
          </div>

          {error && <p style={{ color:'#e94560', fontSize:13, margin:'0 0 10px' }}>{error}</p>}

          <button onClick={handleStart} style={{ width:'100%', padding:'12px', borderRadius:8, background:'linear-gradient(135deg, #e94560, #c1324a)', color:'#fff', border:'none', fontSize:15, fontWeight:'bold', cursor:'pointer', boxShadow:'0 4px 12px rgba(233,69,96,0.4)' }}>
            ¡Entrar al juego!
          </button>
        </div>
      </div>
    </div>
  )
}