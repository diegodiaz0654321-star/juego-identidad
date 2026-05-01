export default function Avatar({ config, size = 60 }) {
  const { skin = '#FDBCB4', hair = '#4A2C17', hairStyle = 'short', shirt = '#E94560', accessory = 'none' } = config || {}
  
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" style={{ imageRendering: 'pixelated' }}>
      {/* Cuerpo/camisa */}
      <rect x="18" y="45" width="24" height="25" fill={shirt} rx="2" />
      <rect x="16" y="48" width="4" height="15" fill={shirt} />
      <rect x="40" y="48" width="4" height="15" fill={shirt} />
      
      {/* Brazos (piel) */}
      <rect x="15" y="60" width="5" height="8" fill={skin} />
      <rect x="40" y="60" width="5" height="8" fill={skin} />
      
      {/* Piernas */}
      <rect x="20" y="70" width="8" height="12" fill="#2C3E50" />
      <rect x="32" y="70" width="8" height="12" fill="#2C3E50" />
      
      {/* Zapatos */}
      <rect x="19" y="80" width="10" height="4" fill="#000" rx="1" />
      <rect x="31" y="80" width="10" height="4" fill="#000" rx="1" />
      
      {/* Cabeza */}
      <circle cx="30" cy="30" r="14" fill={skin} />
      
      {/* Cabello según estilo */}
      {hairStyle === 'short' && (
        <path d="M 16 26 Q 16 14 30 14 Q 44 14 44 26 L 44 22 Q 30 18 16 22 Z" fill={hair} />
      )}
      {hairStyle === 'long' && (
        <>
          <path d="M 16 26 Q 16 14 30 14 Q 44 14 44 26 L 44 22 Q 30 18 16 22 Z" fill={hair} />
          <path d="M 14 28 Q 14 42 20 45 L 18 28 Z" fill={hair} />
          <path d="M 46 28 Q 46 42 40 45 L 42 28 Z" fill={hair} />
        </>
      )}
      {hairStyle === 'curly' && (
        <>
          <circle cx="20" cy="18" r="5" fill={hair} />
          <circle cx="28" cy="14" r="5" fill={hair} />
          <circle cx="36" cy="14" r="5" fill={hair} />
          <circle cx="42" cy="18" r="5" fill={hair} />
        </>
      )}
      {hairStyle === 'spiky' && (
        <>
          <polygon points="18,22 20,10 24,20" fill={hair} />
          <polygon points="24,20 28,8 32,20" fill={hair} />
          <polygon points="32,20 36,8 40,20" fill={hair} />
          <polygon points="38,22 42,10 44,22" fill={hair} />
        </>
      )}
      {hairStyle === 'bald' && null}
      
      {/* Ojos */}
      <circle cx="25" cy="30" r="2" fill="#000" />
      <circle cx="35" cy="30" r="2" fill="#000" />
      <circle cx="25.5" cy="29.5" r="0.8" fill="#fff" />
      <circle cx="35.5" cy="29.5" r="0.8" fill="#fff" />
      
      {/* Boca */}
      <path d="M 26 36 Q 30 39 34 36" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Accesorios */}
      {accessory === 'glasses' && (
        <>
          <circle cx="25" cy="30" r="4" fill="none" stroke="#000" strokeWidth="1.5" />
          <circle cx="35" cy="30" r="4" fill="none" stroke="#000" strokeWidth="1.5" />
          <line x1="29" y1="30" x2="31" y2="30" stroke="#000" strokeWidth="1.5" />
        </>
      )}
      {accessory === 'hat' && (
        <>
          <rect x="14" y="12" width="32" height="4" fill="#8B0000" rx="1" />
          <rect x="18" y="4" width="24" height="10" fill="#8B0000" rx="2" />
        </>
      )}
      {accessory === 'mustache' && (
        <path d="M 24 35 Q 27 37 30 35 Q 33 37 36 35" stroke="#4A2C17" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {accessory === 'cap' && (
        <>
          <rect x="14" y="18" width="32" height="5" fill="#0066CC" rx="2" />
          <ellipse cx="30" cy="16" rx="16" ry="6" fill="#0066CC" />
          <rect x="10" y="20" width="10" height="3" fill="#0066CC" />
        </>
      )}
    </svg>
  )
}