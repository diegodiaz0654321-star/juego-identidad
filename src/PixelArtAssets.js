/**
 * 🎨 PIXEL ART PROFESIONAL - Generador de Texturas
 * Estilo: Caverna mágica oscura con efectos de fuego y gemas
 */

export function createPixelArtTextures(scene) {
  // 🏕️ CAMPAMENTO (tienda pixel art)
  if (!scene.textures.exists('tent')) {
    const canvas = scene.textures.createCanvas('tent', 96, 96)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.fillRect(10, 75, 76, 8)
    
    // Triángulo tienda
    ctx.fillStyle = '#D4A574'
    ctx.fillRect(20, 50, 56, 30)
    ctx.fillStyle = '#A0835A'
    ctx.fillTriangle(20, 50, 48, 15, 76, 50)
    
    // Palo central
    ctx.fillStyle = '#8B5A2B'
    ctx.fillRect(46, 15, 4, 35)
    
    // Entrada
    ctx.fillStyle = '#4A3020'
    ctx.fillRect(38, 65, 20, 15)
    
    // Detalles
    ctx.fillStyle = '#C2834A'
    ctx.fillRect(24, 62, 3, 18)
    ctx.fillRect(68, 62, 3, 18)
    
    canvas.refresh()
  }

  // 🔥 HOGUERA (fuego pixel art mejorado)
  if (!scene.textures.exists('campfire')) {
    const canvas = scene.textures.createCanvas('campfire', 80, 100)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Leños
    ctx.fillStyle = '#3D2817'
    ctx.fillRect(15, 60, 50, 8)
    ctx.fillRect(20, 68, 40, 6)
    
    // Fuego - capas de color
    const fireColors = [
      {color: '#8B0000', y: 58, h: 18},
      {color: '#FF4500', y: 50, h: 16},
      {color: '#FFA500', y: 42, h: 14},
      {color: '#FFD700', y: 35, h: 12},
      {color: '#FFFF00', y: 30, h: 10}
    ]
    
    fireColors.forEach(fire => {
      ctx.fillStyle = fire.color
      ctx.fillRect(20, fire.y, fire.h, fire.h)
      ctx.fillRect(30, fire.y - 5, fire.h - 5, fire.h + 5)
      ctx.fillRect(40, fire.y, fire.h, fire.h)
    })
    
    // Chispas
    ctx.fillStyle = '#FFFF00'
    ctx.fillRect(18, 28, 3, 3)
    ctx.fillRect(55, 32, 3, 3)
    ctx.fillRect(25, 22, 2, 2)
    ctx.fillRect(48, 25, 2, 2)
    
    canvas.refresh()
  }

  // 💎 PIEDRA PRECIOSA (brilla)
  if (!scene.textures.exists('gem')) {
    const canvas = scene.textures.createCanvas('gem', 64, 64)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Base azul/púrpura
    ctx.fillStyle = '#6B46C1'
    ctx.fillRect(16, 16, 32, 32)
    
    // Facetas
    ctx.fillStyle = '#7C3AED'
    ctx.fillRect(16, 16, 16, 16)
    ctx.fillRect(32, 32, 16, 16)
    
    ctx.fillStyle = '#A78BFA'
    ctx.fillRect(32, 16, 16, 16)
    ctx.fillRect(16, 32, 16, 16)
    
    // Brillo
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(20, 20, 8, 8)
    ctx.fillRect(36, 36, 8, 8)
    
    canvas.refresh()
  }

  // 🪨 ROCA/PIEDRA
  if (!scene.textures.exists('rock')) {
    const canvas = scene.textures.createCanvas('rock', 80, 60)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    ctx.fillStyle = '#666666'
    ctx.fillRect(10, 10, 60, 40)
    
    ctx.fillStyle = '#555555'
    ctx.fillRect(10, 10, 20, 20)
    ctx.fillRect(40, 25, 25, 25)
    
    ctx.fillStyle = '#777777'
    ctx.fillRect(30, 10, 20, 15)
    
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.fillRect(10, 45, 60, 8)
    
    canvas.refresh()
  }

  // 🌳 ÁRBOL MUERTO (caverna)
  if (!scene.textures.exists('dead_tree')) {
    const canvas = scene.textures.createCanvas('dead_tree', 120, 200)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Tronco
    ctx.fillStyle = '#2C1810'
    ctx.fillRect(50, 80, 20, 100)
    
    // Ramas
    ctx.fillStyle = '#1A0F08'
    ctx.fillRect(30, 90, 20, 8)
    ctx.fillRect(70, 100, 20, 8)
    ctx.fillRect(35, 130, 15, 8)
    ctx.fillRect(70, 140, 18, 8)
    
    // Detalles musgo/hongos
    ctx.fillStyle = '#3D7D1F'
    ctx.fillRect(48, 75, 24, 8)
    ctx.fillStyle = '#FF6347'
    ctx.fillRect(32, 85, 8, 8)
    
    canvas.refresh()
  }

  // ⚔️ ESPADA PIXEL
  if (!scene.textures.exists('pixel_sword')) {
    const canvas = scene.textures.createCanvas('pixel_sword', 64, 96)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Hoja
    ctx.fillStyle = '#C0C0C0'
    ctx.fillRect(24, 10, 16, 50)
    ctx.fillStyle = '#A9A9A9'
    ctx.fillRect(24, 10, 8, 50)
    
    // Punta
    ctx.fillStyle = '#C0C0C0'
    ctx.fillRect(20, 55, 24, 15)
    ctx.fillRect(24, 70, 16, 10)
    
    // Protector
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(20, 58, 24, 6)
    
    // Empuñadura
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(26, 64, 12, 20)
    
    // Pomelo
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(24, 84, 16, 8)
    
    canvas.refresh()
  }

  // 🛡️ ESCUDO PIXEL
  if (!scene.textures.exists('pixel_shield')) {
    const canvas = scene.textures.createCanvas('pixel_shield', 80, 100)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Escudo
    ctx.fillStyle = '#C41E3A'
    ctx.fillRect(15, 10, 50, 60)
    
    // Borde dorado
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(13, 8, 54, 64)
    
    // Detalle central
    ctx.fillStyle = '#8B0000'
    ctx.fillRect(30, 25, 20, 30)
    
    // Cruz en el centro
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(35, 30, 10, 20)
    ctx.fillRect(30, 35, 20, 10)
    
    canvas.refresh()
  }

  // 🏆 ANTORCHA (luz de caverna)
  if (!scene.textures.exists('torch')) {
    const canvas = scene.textures.createCanvas('torch', 40, 100)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Palo
    ctx.fillStyle = '#2C1810'
    ctx.fillRect(14, 40, 12, 60)
    
    // Fuego pequeño
    ctx.fillStyle = '#FF4500'
    ctx.fillRect(10, 25, 20, 15)
    ctx.fillStyle = '#FFA500'
    ctx.fillRect(12, 20, 16, 12)
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(14, 15, 12, 10)
    
    // Brillo
    ctx.fillStyle = '#FFFF00'
    ctx.fillRect(16, 12, 8, 6)
    
    canvas.refresh()
  }

  // 🏆 COFRE CON MONEDAS
  if (!scene.textures.exists('treasure_chest')) {
    const canvas = scene.textures.createCanvas('treasure_chest', 100, 80)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.fillRect(15, 70, 70, 8)
    
    // Cuerpo del cofre
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(20, 40, 60, 35)
    ctx.fillStyle = '#6B3410'
    ctx.fillRect(20, 40, 60, 8)
    
    // Tapa
    ctx.fillStyle = '#A0522D'
    ctx.fillRect(18, 25, 64, 20)
    ctx.fillStyle = '#8B3A1A'
    ctx.fillRect(18, 25, 64, 5)
    
    // Cierre dorado
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(45, 42, 10, 8)
    ctx.fillRect(42, 37, 16, 6)
    
    // Monedas dentro
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(30, 50, 8, 8)
    ctx.fillRect(42, 52, 8, 8)
    ctx.fillRect(54, 50, 8, 8)
    
    canvas.refresh()
  }
}

/**
 * 🎨 Efectos de partículas para pixel art
 */
export function createPixelEffects(scene) {
  // Polvo pixel
  if (!scene.textures.exists('dust_pixel')) {
    const canvas = scene.textures.createCanvas('dust_pixel', 16, 16)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = '#D2B48C'
    ctx.fillRect(6, 6, 4, 4)
    ctx.fillRect(4, 8, 3, 3)
    ctx.fillRect(9, 7, 3, 3)
    canvas.refresh()
  }

  // Chispa mágica
  if (!scene.textures.exists('magic_spark')) {
    const canvas = scene.textures.createCanvas('magic_spark', 20, 20)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = '#00FFFF'
    ctx.fillRect(8, 2, 4, 4)
    ctx.fillRect(4, 8, 4, 4)
    ctx.fillRect(12, 8, 4, 4)
    ctx.fillRect(8, 14, 4, 4)
    canvas.refresh()
  }

  // Llama pequeña
  if (!scene.textures.exists('flame_small')) {
    const canvas = scene.textures.createCanvas('flame_small', 20, 24)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(8, 12, 4, 12)
    ctx.fillStyle = '#FF6600'
    ctx.fillRect(6, 8, 8, 8)
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(8, 6, 4, 4)
    canvas.refresh()
  }

  // Energía azul
  if (!scene.textures.exists('blue_energy')) {
    const canvas = scene.textures.createCanvas('blue_energy', 24, 24)
    const ctx = canvas.getContext()
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = '#00FFFF'
    ctx.fillRect(8, 8, 8, 8)
    ctx.fillStyle = '#0088FF'
    ctx.fillRect(6, 6, 12, 12)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(10, 10, 4, 4)
    canvas.refresh()
  }
}

/**
 * 🌙 Fondo para caverna oscura
 */
export function createCavernBackground(scene) {
  // Fondo gradiente oscuro (caverna)
  const graphics = scene.add.graphics()
  const gradient = graphics.canvas.getContext().createLinearGradient(0, 0, 0, 720)
  
  gradient.addColorStop(0, '#2a1a4a')
  gradient.addColorStop(0.5, '#1a1a3a')
  gradient.addColorStop(1, '#0a0a1a')
  
  graphics.clear()
}

/**
 * ✨ Crear efectos de brillo y aura
 */
export function createPixelArtEffects(scene) {
  createPixelArtTextures(scene)
  createPixelEffects(scene)
}
