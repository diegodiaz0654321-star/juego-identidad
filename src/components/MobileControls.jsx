import { useEffect, useRef, useState } from 'react'
import './MobileControls.css'

export default function MobileControls() {
  const [isMobile, setIsMobile] = useState(false)
  const buttonsRef = useRef({})

  useEffect(() => {
    const checkMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth < 1024
    setIsMobile(checkMobile || isTouchDevice || isSmallScreen)
  }, [])

  const getKeyCode = (key) => {
    const codes = {
      'ArrowLeft': 37,
      'ArrowUp': 38,
      'ArrowRight': 39,
      'ArrowDown': 40,
      ' ': 32,
      'x': 88,
      'X': 88
    }
    return codes[key] || 0
  }

  const pressKey = (key, isDown) => {
    const code = getKeyCode(key)
    const event = new KeyboardEvent(isDown ? 'keydown' : 'keyup', {
      key: key,
      code: key === ' ' ? 'Space' : key,
      keyCode: code,
      which: code,
      bubbles: true,
      cancelable: true
    })
    window.dispatchEvent(event)
    document.dispatchEvent(event)
  }

  // Configurar listeners con { passive: false } manualmente
  useEffect(() => {
    if (!isMobile) return

    const buttons = buttonsRef.current
    const cleanup = []

    Object.keys(buttons).forEach(key => {
      const btn = buttons[key]
      if (!btn) return

      const handleStart = (e) => {
        e.preventDefault()
        pressKey(key, true)
      }
      const handleEnd = (e) => {
        e.preventDefault()
        pressKey(key, false)
      }

      btn.addEventListener('touchstart', handleStart, { passive: false })
      btn.addEventListener('touchend', handleEnd, { passive: false })
      btn.addEventListener('touchcancel', handleEnd, { passive: false })
      btn.addEventListener('mousedown', handleStart)
      btn.addEventListener('mouseup', handleEnd)
      btn.addEventListener('mouseleave', handleEnd)

      cleanup.push(() => {
        btn.removeEventListener('touchstart', handleStart)
        btn.removeEventListener('touchend', handleEnd)
        btn.removeEventListener('touchcancel', handleEnd)
        btn.removeEventListener('mousedown', handleStart)
        btn.removeEventListener('mouseup', handleEnd)
        btn.removeEventListener('mouseleave', handleEnd)
      })
    })

    return () => cleanup.forEach(fn => fn())
  }, [isMobile])

  if (!isMobile) return null

  return (
    <div className="mobile-controls">
      <div className="controls-left">
        <button
          ref={el => buttonsRef.current['ArrowLeft'] = el}
          className="control-btn move-btn"
        >
          ◀️
        </button>
        <button
          ref={el => buttonsRef.current['ArrowRight'] = el}
          className="control-btn move-btn"
        >
          ▶️
        </button>
      </div>

      <div className="controls-right">
        <button
          ref={el => buttonsRef.current[' '] = el}
          className="control-btn attack-btn"
        >
          ⚔️
        </button>
        <button
          ref={el => buttonsRef.current['ArrowUp'] = el}
          className="control-btn jump-btn"
        >
          ⬆️
        </button>
      </div>
    </div>
  )
}