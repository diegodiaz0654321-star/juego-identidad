import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { GameScene } from './GameScene'
import { QUESTIONS } from '../questions'
import { db } from '../firebase'
import { ref, set } from 'firebase/database'

const sanitizeKey = (str) => String(str).replace(/[.#$[\$/]/g, '_').trim() || 'anon'
const MAX_LIVES = 7
const QUESTION_TIME = 15

export default function Game({ playerData, onFinish }) {
  const gameRef = useRef(null)
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(new Set())
  const [feedback, setFeedback] = useState(null)
  const [lives, setLives] = useState(MAX_LIVES)
  const [coins, setCoins] = useState(0)
  const [showGameOver, setShowGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const answeredRef = useRef(new Set())
  const scoreRef = useRef(0)
  const timerRef = useRef(null)
  const safeKey = sanitizeKey(playerData.code)

  const initGame = () => {
    if (!containerRef.current) return
    if (gameRef.current) { gameRef.current.destroy(true); gameRef.current = null }

    const handleQuestionReach = (idx) => {
      if (!answeredRef.current.has(idx)) {
        setCurrentQuestion(idx)
      }
    }

    class MyScene extends GameScene {}

    const config = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      parent: containerRef.current,
      physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
      scene: MyScene,
      pixelArt: false,
      antialias: true
    }

    const game = new Phaser.Game(config)
    gameRef.current = game

    game.scene.start('GameScene', {
      playerData,
      onQuestionReach: handleQuestionReach,
      onLifeChange: (l) => setLives(l),
      onCoinCollect: (c) => {
        setCoins(c)
        scoreRef.current += 5
        setScore(scoreRef.current)
      },
      onGameOver: (preservedScore) => {
        if (preservedScore !== undefined && preservedScore !== null) {
          scoreRef.current = preservedScore
          setScore(preservedScore)
        }
        try {
          set(ref(db, `players/${safeKey}`), {
            name: playerData.name,
            avatarConfig: playerData.avatarConfig || {},
            code: playerData.code,
            score: scoreRef.current,
            bossDefeated: false
          })
        } catch (err) { console.error('Firebase:', err) }
        setShowGameOver(true)
      },
      getScore: () => scoreRef.current,
      onBossDefeated: () => {
        scoreRef.current += 100
        setScore(scoreRef.current)
        try {
          set(ref(db, `players/${safeKey}`), {
            name: playerData.name,
            avatarConfig: playerData.avatarConfig || {},
            code: playerData.code,
            score: scoreRef.current,
            bossDefeated: true
          })
        } catch (err) { console.error('Firebase:', err) }
        setTimeout(() => onFinish(scoreRef.current), 500)
      }
    })

    setTimeout(() => {
      sceneRef.current = game.scene.getScene('GameScene')
    }, 500)
  }

  useEffect(() => {
    initGame()
    try {
      set(ref(db, `players/${safeKey}`), {
        name: playerData.name,
        avatarConfig: playerData.avatarConfig || {},
        code: playerData.code,
        score: 0
      })
    } catch (err) { console.error('Firebase:', err) }
    return () => {
      if (gameRef.current) { gameRef.current.destroy(true); gameRef.current = null }
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // ⏸️ PAUSAR JUEGO + CRONÓMETRO al mostrar pregunta
  useEffect(() => {
    if (currentQuestion !== null && !feedback) {
      if (sceneRef.current) {
        sceneRef.current.physics.pause()
        if (sceneRef.current.input && sceneRef.current.input.keyboard) {
          sceneRef.current.input.keyboard.enabled = false
        }
        // 🔧 Detener jugador al pausar (evita que siga moviéndose)
        if (sceneRef.current.player && sceneRef.current.player.body) {
          sceneRef.current.player.body.setVelocityX(0)
        }
      }
      setTimeLeft(QUESTION_TIME)
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            handleTimeout()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentQuestion, feedback])

  const handleTimeout = () => {
    const q = QUESTIONS[currentQuestion]
    setFeedback({ correct: false, correctAnswer: q.correct, selected: -1, timeout: true })
    if (sceneRef.current?.cambiarColorBloque) {
      sceneRef.current.cambiarColorBloque(currentQuestion, false)
    }
    setTimeout(() => {
      finalizarPregunta(false)
    }, 1800)
  }

  const finalizarPregunta = (isCorrect) => {
    const newScore = isCorrect ? scoreRef.current + 10 : scoreRef.current
    scoreRef.current = newScore
    setScore(newScore)
    const newAnswered = new Set(answeredRef.current)
    newAnswered.add(currentQuestion)
    answeredRef.current = newAnswered
    setAnswered(newAnswered)
    try {
      set(ref(db, `players/${safeKey}`), {
        name: playerData.name,
        avatarConfig: playerData.avatarConfig || {},
        code: playerData.code,
        score: newScore
      })
    } catch (err) { console.error('Firebase:', err) }
    setCurrentQuestion(null)
    setFeedback(null)
    setTimeLeft(QUESTION_TIME)
    // ✅ REANUDAR juego + RESETEAR teclas + DETENER jugador
    if (sceneRef.current) {
      sceneRef.current.physics.resume()
      if (sceneRef.current.input && sceneRef.current.input.keyboard) {
        sceneRef.current.input.keyboard.enabled = true
        // 🔧 Reset de TODAS las teclas (fix movimiento pegado)
        sceneRef.current.input.keyboard.resetKeys()
      }
      // 🔧 Detener el jugador completamente
      if (sceneRef.current.player && sceneRef.current.player.body) {
        sceneRef.current.player.body.setVelocityX(0)
      }
    }
  }

  const handleRestart = () => {
    setScore(0)
    scoreRef.current = 0
    setAnswered(new Set())
    answeredRef.current = new Set()
    setLives(MAX_LIVES)
    setCoins(0)
    setCurrentQuestion(null)
    setFeedback(null)
    setShowGameOver(false)
    setTimeLeft(QUESTION_TIME)
    if (timerRef.current) clearInterval(timerRef.current)
    initGame()
  }

  const handleAnswer = (optionIdx) => {
    if (feedback) return
    if (timerRef.current) clearInterval(timerRef.current)
    const q = QUESTIONS[currentQuestion]
    const isCorrect = optionIdx === q.correct
    setFeedback({ correct: isCorrect, correctAnswer: q.correct, selected: optionIdx })
    if (sceneRef.current?.cambiarColorBloque) {
      sceneRef.current.cambiarColorBloque(currentQuestion, isCorrect)
    }
    setTimeout(() => {
      finalizarPregunta(isCorrect)
    }, 1800)
  }

  const getButtonStyle = (i) => {
    if (!feedback) return { background: '#0d1117', color: '#fff' }
    if (i === feedback.correctAnswer) return { background: '#4CAF50', color: '#fff', transform: 'scale(1.02)' }
    if (i === feedback.selected && !feedback.correct) return { background: '#F44336', color: '#fff' }
    return { background: '#0d1117', color: '#666' }
  }

  const renderHearts = () => {
    let hearts = ''
    for (let i = 0; i < MAX_LIVES; i++) hearts += i < lives ? '❤️' : '🖤'
    return hearts
  }

  const getTimerColor = () => {
    if (timeLeft > 10) return '#4CAF50'
    if (timeLeft > 5) return '#FFA500'
    return '#F44336'
  }

  return (
    <div style={{ position:'relative', width:'100vw', height:'100vh', background:'#0d1117', display:'flex', justifyContent:'center', alignItems:'center', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:10, left:10, color:'#fff', fontSize:16, background:'#16213e', padding:'8px 16px', borderRadius:8, zIndex:10, boxShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
        👤 <strong>{playerData.name}</strong> — ⭐ {score}
      </div>

      <div style={{ position:'absolute', top:10, right:10, display:'flex', gap:8, zIndex:10 }}>
        <div style={{ color:'#fff', fontSize:14, background:'#16213e', padding:'8px 12px', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
          {renderHearts()}
        </div>
        <div style={{ color:'#fff', fontSize:14, background:'#16213e', padding:'8px 12px', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
          🪙 {coins}
        </div>
        <div style={{ color:'#fff', fontSize:14, background:'#16213e', padding:'8px 12px', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
          📚 {answered.size}/{QUESTIONS.length}
        </div>
      </div>

      <div ref={containerRef} style={{ width:1280, height:720, maxWidth:'100vw', maxHeight:'100vh' }} />

      {currentQuestion !== null && (
        <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.88)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 }}>
          <div style={{
            background:'#16213e',
            padding:30,
            borderRadius:16,
            width:620,
            maxWidth:'92%',
            color:'#fff',
            boxShadow:'0 10px 40px rgba(233,69,96,0.3)',
            border: feedback ? (feedback.correct ? '3px solid #4CAF50' : '3px solid #F44336') : '3px solid #e94560',
            position: 'relative'
          }}>
            {!feedback && (
              <div style={{
                position: 'absolute',
                top: -30,
                right: 20,
                background: getTimerColor(),
                color: '#fff',
                padding: '10px 20px',
                borderRadius: 50,
                fontSize: 24,
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                border: '3px solid #fff',
                minWidth: 60,
                textAlign: 'center',
                animation: timeLeft <= 5 ? 'pulse 0.5s infinite' : 'none'
              }}>
                ⏱️ {timeLeft}s
              </div>
            )}

            {!feedback && (
              <div style={{
                width: '100%',
                height: 8,
                background: '#0d1117',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 16
              }}>
                <div style={{
                  width: `${(timeLeft / QUESTION_TIME) * 100}%`,
                  height: '100%',
                  background: getTimerColor(),
                  transition: 'width 1s linear, background 0.3s'
                }} />
              </div>
            )}

            <h2 style={{
              color: feedback ? (feedback.correct ? '#4CAF50' : '#F44336') : '#e94560',
              marginTop: 0,
              marginBottom: 16
            }}>
              {feedback
                ? (feedback.timeout
                    ? '⏱️ ¡Tiempo agotado!'
                    : (feedback.correct ? '✓ ¡Correcto!' : '✗ Incorrecto (-1 vida)'))
                : `Pregunta ${currentQuestion + 1}`}
            </h2>
            <p style={{ fontSize:18, marginBottom:20, lineHeight:1.4 }}>
              {QUESTIONS[currentQuestion].q}
            </p>
            {QUESTIONS[currentQuestion].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={!!feedback}
                style={{
                  display:'block',
                  width:'100%',
                  padding:12,
                  margin:'8px 0',
                  borderRadius:8,
                  border:'none',
                  fontSize:15,
                  cursor: feedback ? 'default' : 'pointer',
                  textAlign:'left',
                  transition:'all 0.3s',
                  fontWeight:'bold',
                  ...getButtonStyle(i)
                }}>
                <strong>{String.fromCharCode(65 + i)})</strong> {opt}
                {feedback && i === feedback.correctAnswer && ' ✓'}
                {feedback && i === feedback.selected && !feedback.correct && ' ✗'}
              </button>
            ))}
            {feedback && (
              <p style={{ textAlign:'center', marginTop:16, fontSize:14, color:'#aaa' }}>
                {feedback.timeout
                  ? 'Perdiste 1 vida por no responder a tiempo ⏰'
                  : (feedback.correct ? '¡Ganaste 10 puntos! 🎉' : 'Perdiste 1 vida ❤️➖')}
              </p>
            )}
          </div>
        </div>
      )}

      {showGameOver && (
        <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.92)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:200 }}>
          <div style={{
            background:'linear-gradient(135deg, #8B0000, #4A0000)',
            padding:40,
            borderRadius:20,
            textAlign:'center',
            boxShadow:'0 20px 60px rgba(255,0,0,0.4)',
            border:'4px solid #FFD700',
            minWidth:400
          }}>
            <h1 style={{ fontSize:64, color:'#FFD700', margin:0, textShadow:'4px 4px 0 #000', letterSpacing:3 }}>
              💀 GAME OVER
            </h1>
            <p style={{ fontSize:20, color:'#fff', marginTop:20 }}>
              Te has quedado sin vidas
            </p>
            <div style={{
              display:'flex',
              gap:20,
              justifyContent:'center',
              marginTop:10,
              marginBottom:20,
              fontSize:16,
              color:'#fff'
            }}>
              <div>⭐ Puntaje: <strong>{score}</strong></div>
              <div>🪙 Monedas: <strong>{coins}</strong></div>
              <div>📚 {answered.size}/{QUESTIONS.length}</div>
            </div>
            <button
              onClick={handleRestart}
              style={{
                padding:'14px 32px',
                fontSize:18,
                fontWeight:'bold',
                borderRadius:10,
                border:'none',
                background:'linear-gradient(135deg, #4CAF50, #2E7D32)',
                color:'#fff',
                cursor:'pointer',
                boxShadow:'0 4px 15px rgba(76,175,80,0.5)',
                marginRight:10
              }}>
              🔄 Reintentar
            </button>
            <button
              onClick={() => onFinish(score)}
              style={{
                padding:'14px 32px',
                fontSize:18,
                fontWeight:'bold',
                borderRadius:10,
                border:'none',
                background:'linear-gradient(135deg, #e94560, #8B0000)',
                color:'#fff',
                cursor:'pointer',
                boxShadow:'0 4px 15px rgba(233,69,96,0.5)'
              }}>
              🏆 Ver Podio
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}