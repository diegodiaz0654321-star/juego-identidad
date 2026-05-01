import { useState } from 'react'
import Login from './components/Login'
import Game from './components/Game'
import Podium from './components/Podium'

export default function App() {
  const [screen, setScreen] = useState('login')
  const [playerData, setPlayerData] = useState(null)
  const [finalScore, setFinalScore] = useState(0)

  const handleLogin = (data) => {
    console.log('Login recibido:', data)
    setPlayerData(data)
    setScreen('game')
  }

  const handleFinish = (score) => {
    setFinalScore(score)
    setScreen('podium')
  }

  if (screen === 'login') {
    return <Login onLogin={handleLogin} />
  }

  if (screen === 'game' && playerData) {
    return <Game playerData={playerData} onFinish={handleFinish} />
  }

  if (screen === 'podium' && playerData) {
    return <Podium playerData={playerData} finalScore={finalScore} />
  }

  return <Login onLogin={handleLogin} />
}