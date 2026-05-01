import Phaser from 'phaser'

function drawAvatar(ctx, config, frame = 'idle') {
  const { skin='#FDBCB4', hair='#4A2C17', hairStyle='short', shirt='#E94560', accessory='none' } = config
  ctx.save(); ctx.scale(1.4, 1.4); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  let legFrontX=28, legFrontY=60, legFrontRot=0, legBackX=24, legBackY=60, legBackRot=0
  let armFrontX=30, armFrontY=42, armFrontRot=0, armBackX=22, armBackY=42, armBackRot=0
  let bodyBob=0, headBob=0
  if (frame==='walk1') { legFrontX=34;legFrontY=58;legFrontRot=20;legBackX=22;legBackY=62;legBackRot=-15;armFrontX=32;armFrontY=40;armFrontRot=-25;armBackX=20;armBackY=42;armBackRot=20;bodyBob=-1;headBob=-1 }
  else if (frame==='walk2') { legFrontX=28;legFrontY=60;legFrontRot=0;legBackX=26;legBackY=60;legBackRot=0;armFrontX=30;armFrontY=42;armFrontRot=0;armBackX=22;armBackY=42;armBackRot=0 }
  else if (frame==='walk3') { legFrontX=22;legFrontY=62;legFrontRot=-15;legBackX=34;legBackY=58;legBackRot=20;armFrontX=28;armFrontY=40;armFrontRot=25;armBackX=24;armBackY=44;armBackRot=-20;bodyBob=-1;headBob=-1 }
  else if (frame==='jump') { legFrontX=30;legFrontY=54;legFrontRot=15;legBackX=22;legBackY=54;legBackRot=-15;armFrontX=32;armFrontY=32;armFrontRot=-40;armBackX=20;armBackY=32;armBackRot=40;headBob=-2 }
  ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(28,72,14,3,0,0,Math.PI*2); ctx.fill()
  ctx.save(); ctx.translate(legBackX, legBackY-2); ctx.rotate(legBackRot*Math.PI/180)
  ctx.fillStyle='#2C3E50'; ctx.strokeStyle='#000'; ctx.lineWidth=1.2
  ctx.beginPath(); ctx.roundRect(-3,0,6,13,3); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#2C1810'; ctx.beginPath(); ctx.ellipse(1,14,5,2.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.restore()
  ctx.save(); ctx.translate(armBackX, armBackY); ctx.rotate(armBackRot*Math.PI/180)
  ctx.fillStyle=shirt; ctx.strokeStyle='#000'; ctx.lineWidth=1.2
  ctx.beginPath(); ctx.roundRect(-2.5,0,5,10,2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(0,11,2.5,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.restore()
  ctx.fillStyle=shirt; ctx.strokeStyle='#000'; ctx.lineWidth=1.5
  ctx.beginPath(); ctx.moveTo(20,36+bodyBob); ctx.lineTo(32,36+bodyBob); ctx.lineTo(33,50+bodyBob); ctx.lineTo(19,50+bodyBob); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#2C3E50'
  ctx.beginPath(); ctx.moveTo(19,50+bodyBob); ctx.lineTo(33,50+bodyBob); ctx.lineTo(32,58+bodyBob); ctx.lineTo(20,58+bodyBob); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#1A1A1A'; ctx.fillRect(19,49+bodyBob,14,2)
  ctx.fillStyle='#FFD700'; ctx.fillRect(25,49+bodyBob,2,2)
  ctx.save(); ctx.translate(legFrontX, legFrontY-2); ctx.rotate(legFrontRot*Math.PI/180)
  ctx.fillStyle='#2C3E50'; ctx.strokeStyle='#000'; ctx.lineWidth=1.3
  ctx.beginPath(); ctx.roundRect(-3,0,6,13,3); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#2C1810'; ctx.beginPath(); ctx.ellipse(1,14,6,3,0,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.restore()
  const headX=26, headY=22+headBob
  ctx.fillStyle=skin; ctx.strokeStyle='#000'; ctx.lineWidth=1.5
  ctx.beginPath(); ctx.ellipse(headX,headY,11,12,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(headX-9,headY+1,2,3,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.strokeStyle='#000'; ctx.lineWidth=1.3
  ctx.beginPath(); ctx.moveTo(headX+10,headY+1); ctx.quadraticCurveTo(headX+13,headY+3,headX+10,headY+5); ctx.stroke()
  ctx.fillStyle=hair; ctx.strokeStyle='#000'; ctx.lineWidth=1.5
  if (hairStyle==='short') {
    ctx.beginPath(); ctx.moveTo(headX-10,headY-2); ctx.quadraticCurveTo(headX-11,headY-11,headX,headY-13)
    ctx.quadraticCurveTo(headX+11,headY-11,headX+9,headY-4); ctx.lineTo(headX+7,headY-2); ctx.closePath(); ctx.fill(); ctx.stroke()
  } else if (hairStyle==='long') {
    ctx.beginPath(); ctx.moveTo(headX-10,headY+8); ctx.lineTo(headX-11,headY-10)
    ctx.quadraticCurveTo(headX,headY-14,headX+10,headY-10); ctx.lineTo(headX+8,headY-4)
    ctx.lineTo(headX+7,headY-2); ctx.lineTo(headX-10,headY-2); ctx.closePath(); ctx.fill(); ctx.stroke()
  } else if (hairStyle==='curly') {
    ;[[headX-9,headY-8],[headX-4,headY-12],[headX+3,headY-12],[headX+8,headY-8]].forEach(([x,y]) => {
      ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill(); ctx.stroke()
    })
  } else if (hairStyle==='spiky') {
    ctx.beginPath(); ctx.moveTo(headX-10,headY-2); ctx.lineTo(headX-8,headY-10); ctx.lineTo(headX-4,headY-4)
    ctx.lineTo(headX-1,headY-12); ctx.lineTo(headX+2,headY-4); ctx.lineTo(headX+5,headY-12)
    ctx.lineTo(headX+8,headY-4); ctx.lineTo(headX+9,headY-10); ctx.lineTo(headX+10,headY-2); ctx.closePath(); ctx.fill(); ctx.stroke()
  }
  ctx.fillStyle='rgba(255,120,130,0.5)'; ctx.beginPath(); ctx.arc(headX+5,headY+4,2.5,0,Math.PI*2); ctx.fill()
  if (frame==='blink') {
    ctx.strokeStyle='#000'; ctx.lineWidth=1.3
    ctx.beginPath(); ctx.arc(headX+4,headY,2.5,0.2,Math.PI-0.2); ctx.stroke()
  } else {
    ctx.fillStyle='#fff'; ctx.strokeStyle='#000'; ctx.lineWidth=1
    ctx.beginPath(); ctx.ellipse(headX+4,headY,3,3.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
    ctx.fillStyle='#1a1a1a'
    ctx.beginPath(); ctx.arc(headX+4.5,headY+0.3,1.5,0,Math.PI*2); ctx.fill()
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(headX+5,headY-0.5,0.8,0,Math.PI*2); ctx.fill()
  }
  ctx.strokeStyle='#2C1810'; ctx.lineWidth=1.3
  if (frame==='jump') {
    ctx.fillStyle='#8B0000'; ctx.beginPath(); ctx.ellipse(headX+7,headY+6,1.5,1.8,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  } else {
    ctx.beginPath(); ctx.moveTo(headX+5,headY+6); ctx.quadraticCurveTo(headX+7,headY+8,headX+9,headY+6); ctx.stroke()
  }
  ctx.save(); ctx.translate(armFrontX, armFrontY); ctx.rotate(armFrontRot*Math.PI/180)
  ctx.fillStyle=shirt; ctx.strokeStyle='#000'; ctx.lineWidth=1.3
  ctx.beginPath(); ctx.roundRect(-2.5,0,5,10,2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(0,11,2.8,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.restore()
  if (accessory==='hat') {
    ctx.fillStyle='#8B0000'; ctx.strokeStyle='#000'; ctx.lineWidth=1.3
    ctx.beginPath(); ctx.roundRect(headX-12,headY-14,22,4,2); ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.roundRect(headX-8,headY-22,16,9,3); ctx.fill(); ctx.stroke()
  } else if (accessory==='glasses') {
    ctx.strokeStyle='#000'; ctx.lineWidth=1.3
    ctx.beginPath(); ctx.arc(headX+4,headY,4,0,Math.PI*2); ctx.stroke()
  } else if (accessory==='mustache') {
    ctx.strokeStyle='#2C1810'; ctx.lineWidth=2
    ctx.beginPath(); ctx.moveTo(headX+4,headY+5); ctx.quadraticCurveTo(headX+7,headY+7,headX+10,headY+5); ctx.stroke()
  } else if (accessory==='cap') {
    ctx.fillStyle='#0066CC'; ctx.strokeStyle='#000'; ctx.lineWidth=1.3
    ctx.beginPath(); ctx.ellipse(headX,headY-9,12,5,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  }
  ctx.restore()
}

function createAvatarFrames(scene, config, keyPrefix) {
  ['idle','walk1','walk2','walk3','jump','blink'].forEach(frame => {
    const key = `${keyPrefix}_${frame}`
    if (scene.textures.exists(key)) return
    const canvas = scene.textures.createCanvas(key, 85, 120)
    drawAvatar(canvas.getContext(), config, frame); canvas.refresh()
  })
}

function drawGoomba(ctx, frame='walk1') {
  ctx.save(); ctx.scale(1.5,1.5); ctx.lineCap='round'
  ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(28,54,24,4,0,0,Math.PI*2); ctx.fill()
  ctx.fillStyle='#2C1810'; ctx.strokeStyle='#000'; ctx.lineWidth=2
  if (frame==='walk1') { ctx.beginPath(); ctx.ellipse(10,49,11,5,0,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(45,52,9,4,0,0,Math.PI*2); ctx.fill(); ctx.stroke() }
  else { ctx.beginPath(); ctx.ellipse(11,52,9,4,0,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(46,49,11,5,0,0,Math.PI*2); ctx.fill(); ctx.stroke() }
  const bg = ctx.createRadialGradient(22,38,3,28,42,22); bg.addColorStop(0,'#A66742'); bg.addColorStop(1,'#6B3410')
  ctx.fillStyle=bg; ctx.strokeStyle='#000'; ctx.lineWidth=2.5
  ctx.beginPath(); ctx.ellipse(28,42,20,10,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.fillRect(12,34,32,3)
  const hg = ctx.createRadialGradient(22,12,3,28,22,22); hg.addColorStop(0,'#E0A070'); hg.addColorStop(0.6,'#A0522D'); hg.addColorStop(1,'#703418')
  ctx.fillStyle=hg; ctx.strokeStyle='#000'; ctx.lineWidth=2.8
  ctx.beginPath(); ctx.arc(28,22,22,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.ellipse(18,12,7,4,-0.4,0,Math.PI*2); ctx.fill()
  ctx.strokeStyle='#1a0F08'; ctx.lineWidth=4
  ctx.beginPath(); ctx.moveTo(11,14); ctx.lineTo(24,20); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(32,20); ctx.lineTo(45,14); ctx.stroke()
  ctx.fillStyle='#fff'; ctx.strokeStyle='#000'; ctx.lineWidth=2
  ctx.beginPath(); ctx.ellipse(19,25,7,8,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(37,25,7,8,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#1a1a1a'
  ctx.beginPath(); ctx.arc(20,27,3.5,0,Math.PI*2); ctx.fill()
  ctx.beginPath(); ctx.arc(36,27,3.5,0,Math.PI*2); ctx.fill()
  ctx.strokeStyle='#1a0F08'; ctx.lineWidth=2.5
  ctx.beginPath(); ctx.moveTo(22,34); ctx.lineTo(34,34); ctx.stroke()
  ctx.fillStyle='#fff'; ctx.strokeStyle='#000'; ctx.lineWidth=1
  ctx.beginPath(); ctx.moveTo(24,34); ctx.lineTo(26,38); ctx.lineTo(27,34); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(29,34); ctx.lineTo(30,38); ctx.lineTo(32,34); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.restore()
}

function createGoombaFrames(scene) {
  ['walk1','walk2'].forEach(frame => {
    const key = `goomba_${frame}`
    if (scene.textures.exists(key)) return
    const canvas = scene.textures.createCanvas(key, 85, 90)
    drawGoomba(canvas.getContext(), frame); canvas.refresh()
  })
}

function drawSkeleton(ctx, frame='walk1') {
  ctx.save(); ctx.scale(1.3,1.3); ctx.lineCap='round'
  ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(30,82,16,3,0,0,Math.PI*2); ctx.fill()
  ctx.fillStyle='#F5F5DC'; ctx.strokeStyle='#000'; ctx.lineWidth=1.5
  const legOff = frame==='walk1'?2:-2
  ctx.beginPath(); ctx.roundRect(22,55,5,22,2); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.roundRect(32+legOff,55,5,22,2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#E8E8CC'
  ctx.beginPath(); ctx.ellipse(24,78,5,3,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.ellipse(34+legOff,78,5,3,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#F5F5DC'
  ctx.beginPath(); ctx.roundRect(20,48,20,8,3); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.roundRect(19,30,22,18,4); ctx.fill(); ctx.stroke()
  const armOff = frame==='walk1'?-3:3
  ctx.beginPath(); ctx.roundRect(14,32+armOff,5,18,2); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.roundRect(41,32-armOff,5,18,2); ctx.fill(); ctx.stroke()
  const sg = ctx.createRadialGradient(25,10,2,30,18,18); sg.addColorStop(0,'#FFF'); sg.addColorStop(1,'#DDDDC8')
  ctx.fillStyle=sg; ctx.strokeStyle='#000'; ctx.lineWidth=2
  ctx.beginPath(); ctx.arc(30,18,16,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#F5F5DC'
  ctx.beginPath(); ctx.roundRect(24,26,12,6,2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#000'
  ctx.beginPath(); ctx.ellipse(24,16,3.5,4.5,0,0,Math.PI*2); ctx.fill()
  ctx.beginPath(); ctx.ellipse(36,16,3.5,4.5,0,0,Math.PI*2); ctx.fill()
  ctx.fillStyle='#FF0000'
  ctx.beginPath(); ctx.arc(24,16,1.5,0,Math.PI*2); ctx.fill()
  ctx.beginPath(); ctx.arc(36,16,1.5,0,Math.PI*2); ctx.fill()
  ctx.restore()
}

function createSkeletonFrames(scene) {
  ['walk1','walk2'].forEach(frame => {
    const key = `skeleton_${frame}`
    if (scene.textures.exists(key)) return
    const canvas = scene.textures.createCanvas(key, 78, 112)
    drawSkeleton(canvas.getContext(), frame); canvas.refresh()
  })
}

function drawBat(ctx, frame='fly1') {
  ctx.save(); ctx.scale(1.3,1.3)
  ctx.fillStyle='#2C1810'; ctx.strokeStyle='#000'; ctx.lineWidth=1.5
  if (frame==='fly1') {
    ctx.beginPath(); ctx.moveTo(18,20); ctx.lineTo(2,10); ctx.lineTo(6,22); ctx.lineTo(10,18); ctx.lineTo(14,25); ctx.closePath(); ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(38,20); ctx.lineTo(54,10); ctx.lineTo(50,22); ctx.lineTo(46,18); ctx.lineTo(42,25); ctx.closePath(); ctx.fill(); ctx.stroke()
  } else {
    ctx.beginPath(); ctx.moveTo(18,28); ctx.lineTo(2,35); ctx.lineTo(6,30); ctx.lineTo(10,33); ctx.lineTo(14,30); ctx.closePath(); ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(38,28); ctx.lineTo(54,35); ctx.lineTo(50,30); ctx.lineTo(46,33); ctx.lineTo(42,30); ctx.closePath(); ctx.fill(); ctx.stroke()
  }
  ctx.fillStyle='#3D2010'; ctx.strokeStyle='#000'; ctx.lineWidth=2
  ctx.beginPath(); ctx.ellipse(28,26,10,11,0,0,Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#FF0000'
  ctx.beginPath(); ctx.arc(24,24,1.5,0,Math.PI*2); ctx.fill()
  ctx.beginPath(); ctx.arc(32,24,1.5,0,Math.PI*2); ctx.fill()
  ctx.restore()
}

function createBatFrames(scene) {
  ['fly1','fly2'].forEach(frame => {
    const key = `bat_${frame}`
    if (scene.textures.exists(key)) return
    const canvas = scene.textures.createCanvas(key, 73, 65)
    drawBat(canvas.getContext(), frame); canvas.refresh()
  })
}

function drawDragon(ctx, frame='idle') {
  ctx.save(); ctx.scale(2.2, 2.2); ctx.lineCap='round'; ctx.lineJoin='round'
  // Aura roja alrededor
  const auraGrad = ctx.createRadialGradient(80, 80, 30, 80, 80, 110)
  auraGrad.addColorStop(0, 'rgba(255, 0, 0, 0.3)')
  auraGrad.addColorStop(0.5, 'rgba(255, 100, 0, 0.15)')
  auraGrad.addColorStop(1, 'rgba(255, 0, 0, 0)')
  ctx.fillStyle = auraGrad
  ctx.fillRect(-40, -40, 240, 240)
  // Sombra
  ctx.fillStyle='rgba(0,0,0,0.6)'
  ctx.beginPath(); ctx.ellipse(80, 125, 75, 10, 0, 0, Math.PI*2); ctx.fill()
  // Cola (ajustada para quedar dentro del canvas)
  ctx.fillStyle='#0a0000'; ctx.strokeStyle='#000'; ctx.lineWidth=3
  ctx.beginPath(); ctx.moveTo(15, 75)
  ctx.quadraticCurveTo(0, 90, -10, 110)
  ctx.quadraticCurveTo(-15, 118, -5, 118)
  ctx.lineTo(5, 112)
  ctx.quadraticCurveTo(10, 100, 22, 90)
  ctx.lineTo(22, 85); ctx.closePath(); ctx.fill(); ctx.stroke()
  // Punta flama cola
  ctx.fillStyle='#FF0000'
  ctx.beginPath(); ctx.moveTo(-5, 118); ctx.lineTo(-18, 112); ctx.lineTo(-12, 125); ctx.closePath(); ctx.fill()
  // Pata trasera
  ctx.fillStyle='#0a0000'; ctx.strokeStyle='#000'; ctx.lineWidth=2.5
  ctx.beginPath(); ctx.ellipse(50, 110, 15, 12, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke()
  ctx.fillStyle='#FF0000'
  ;[43, 50, 57, 64].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x, 115); ctx.lineTo(x+1.5, 125); ctx.lineTo(x+4, 115); ctx.closePath(); ctx.fill()
  })
  // Ala derecha
  ctx.fillStyle='#1a0505'; ctx.strokeStyle='#000'; ctx.lineWidth=3
  ctx.beginPath()
  ctx.moveTo(70, 40); ctx.lineTo(110, 5); ctx.lineTo(100, 18); ctx.lineTo(125, 10)
  ctx.lineTo(115, 28); ctx.lineTo(135, 28); ctx.lineTo(115, 42); ctx.lineTo(125, 52); ctx.lineTo(90, 45)
  ctx.closePath(); ctx.fill(); ctx.stroke()
  // Ala izquierda
  ctx.fillStyle='#2a0505'
  ctx.beginPath()
  ctx.moveTo(55, 45); ctx.lineTo(30, 8); ctx.lineTo(38, 22); ctx.lineTo(18, 18)
  ctx.lineTo(30, 32); ctx.lineTo(15, 36); ctx.lineTo(32, 45); ctx.lineTo(50, 55)
  ctx.closePath(); ctx.fill(); ctx.stroke()
  // Cuerpo
  const bodyGrad = ctx.createRadialGradient(75, 70, 10, 80, 85, 50)
  bodyGrad.addColorStop(0, '#4a0a0a'); bodyGrad.addColorStop(0.4, '#2a0505')
  bodyGrad.addColorStop(0.8, '#0a0000'); bodyGrad.addColorStop(1, '#000000')
  ctx.fillStyle = bodyGrad; ctx.strokeStyle='#000'; ctx.lineWidth=3
  ctx.beginPath(); ctx.ellipse(80, 85, 40, 30, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke()
  // Espinas en espalda
  ctx.fillStyle='#8B0000'; ctx.strokeStyle='#000'; ctx.lineWidth=1.5
  ;[50, 65, 80, 95, 110].forEach(x => {
    ctx.beginPath()
    ctx.moveTo(x, 60); ctx.lineTo(x-3, 45); ctx.lineTo(x+3, 45); ctx.closePath()
    ctx.fill(); ctx.stroke()
  })
  // Panza
  ctx.fillStyle='#8B0000'
  ctx.beginPath(); ctx.ellipse(75, 90, 15, 20, 0, 0, Math.PI*2); ctx.fill()
  // Cuello
  ctx.fillStyle='#0a0000'; ctx.strokeStyle='#000'; ctx.lineWidth=3
  ctx.beginPath()
  ctx.moveTo(110, 70); ctx.quadraticCurveTo(130, 45, 145, 35)
  ctx.lineTo(150, 50); ctx.quadraticCurveTo(125, 65, 115, 80); ctx.closePath()
  ctx.fill(); ctx.stroke()
  // Cabeza
  const headGrad = ctx.createRadialGradient(140, 30, 3, 145, 40, 28)
  headGrad.addColorStop(0, '#6a0a0a'); headGrad.addColorStop(0.5, '#3a0505'); headGrad.addColorStop(1, '#000000')
  ctx.fillStyle = headGrad; ctx.strokeStyle='#000'; ctx.lineWidth=3.5
  ctx.beginPath(); ctx.ellipse(145, 42, 28, 22, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke()
  // Hocico
  ctx.fillStyle='#0a0000'
  ctx.beginPath()
  ctx.moveTo(165, 38); ctx.lineTo(185, 42); ctx.lineTo(182, 55); ctx.lineTo(165, 52); ctx.closePath()
  ctx.fill(); ctx.stroke()
  // Cuernos
  ctx.fillStyle='#4a0000'; ctx.strokeStyle='#000'; ctx.lineWidth=2.5
  ctx.beginPath()
  ctx.moveTo(130, 22); ctx.lineTo(122, 5); ctx.lineTo(135, 18); ctx.closePath()
  ctx.fill(); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(152, 22); ctx.lineTo(160, 5); ctx.lineTo(148, 18); ctx.closePath()
  ctx.fill(); ctx.stroke()
  ctx.fillStyle='#FF0000'
  ctx.beginPath(); ctx.arc(122, 7, 2, 0, Math.PI*2); ctx.fill()
  ctx.beginPath(); ctx.arc(160, 7, 2, 0, Math.PI*2); ctx.fill()
  // Ojo brillante
  const eyeGlow = ctx.createRadialGradient(145, 35, 1, 145, 35, 10)
  eyeGlow.addColorStop(0, '#FFFFFF'); eyeGlow.addColorStop(0.3, '#FFFF00')
  eyeGlow.addColorStop(0.7, '#FF6600'); eyeGlow.addColorStop(1, '#FF0000')
  ctx.fillStyle = eyeGlow
  ctx.beginPath(); ctx.ellipse(145, 36, 7, 8, 0, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle='#000'
  ctx.beginPath(); ctx.ellipse(145, 36, 2, 6, 0, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle='#FFFFFF'
  ctx.beginPath(); ctx.arc(147, 33, 1, 0, Math.PI*2); ctx.fill()
  // Cicatriz
  ctx.strokeStyle='#8B0000'; ctx.lineWidth=4
  ctx.beginPath(); ctx.moveTo(130, 28); ctx.lineTo(155, 32); ctx.stroke()
  // Boca
  ctx.strokeStyle='#000'; ctx.lineWidth=2.5
  ctx.beginPath(); ctx.moveTo(165, 50); ctx.lineTo(185, 52); ctx.stroke()
  // Colmillos
  ctx.fillStyle='#fff'; ctx.strokeStyle='#000'; ctx.lineWidth=1.3
  ctx.beginPath(); ctx.moveTo(170, 50); ctx.lineTo(172, 57); ctx.lineTo(174, 50); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(180, 50); ctx.lineTo(182, 57); ctx.lineTo(184, 50); ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.restore()
}

function createDragonTexture(scene) {
  const key = 'dragon_main'
  if (scene.textures.exists(key)) return
  // Canvas más grande para que entre todo el dibujo
  const canvas = scene.textures.createCanvas(key, 500, 360)
  const ctx = canvas.getContext()
  // Trasladar para que las coordenadas negativas entren en el canvas
  ctx.translate(50, 30)
  drawDragon(ctx, 'idle')
  canvas.refresh()
}

function createFireballTexture(scene) {
  if (scene.textures.exists('fireball')) return
  const canvas = scene.textures.createCanvas('fireball', 64, 64)
  const ctx = canvas.getContext()
  ctx.save(); ctx.scale(2, 2)
  ctx.fillStyle='rgba(255,100,0,0.3)'
  ctx.beginPath(); ctx.arc(16,16,15,0,Math.PI*2); ctx.fill()
  const grad = ctx.createRadialGradient(16,16,2,16,16,13)
  grad.addColorStop(0,'#FFFFFF'); grad.addColorStop(0.3,'#FFD700')
  grad.addColorStop(0.6,'#FF6600'); grad.addColorStop(1,'#8B0000')
  ctx.fillStyle = grad
  ctx.beginPath(); ctx.arc(16,16,12,0,Math.PI*2); ctx.fill()
  ctx.restore()
  canvas.refresh()
}

function createCoinTexture(scene) {
  if (scene.textures.exists('coin')) return
  const canvas = scene.textures.createCanvas('coin', 48, 48)
  const ctx = canvas.getContext()
  ctx.save(); ctx.scale(1.5,1.5)
  ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(16,16,15.5,0,Math.PI*2); ctx.fill()
  const cg = ctx.createRadialGradient(12,12,2,16,16,14)
  cg.addColorStop(0,'#FFF8DC'); cg.addColorStop(0.4,'#FFD700'); cg.addColorStop(0.8,'#DAA520'); cg.addColorStop(1,'#8B6914')
  ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(16,16,14,0,Math.PI*2); ctx.fill()
  ctx.strokeStyle='#5A4A05'; ctx.lineWidth=1
  ctx.beginPath(); ctx.arc(16,16,10,0,Math.PI*2); ctx.stroke()
  ctx.fillStyle='#8B6914'; ctx.font='bold 14px Arial'; ctx.textAlign='center'
  ctx.fillText('$',16,20)
  ctx.restore(); canvas.refresh()
}

function createQuestionBlockTexture(scene) {
  if (scene.textures.exists('qblock')) return
  const canvas = scene.textures.createCanvas('qblock', 96, 96)
  const ctx = canvas.getContext()
  ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.roundRect(4,8,88,88,12); ctx.fill()
  ctx.fillStyle='#B8720A'; ctx.beginPath(); ctx.roundRect(2,2,90,90,12); ctx.fill()
  const bg = ctx.createLinearGradient(0,4,0,88)
  bg.addColorStop(0,'#FFED4E'); bg.addColorStop(0.3,'#FFD700'); bg.addColorStop(0.7,'#E8A004'); bg.addColorStop(1,'#B8720A')
  ctx.fillStyle=bg; ctx.beginPath(); ctx.roundRect(5,4,84,82,10); ctx.fill()
  ;[[14,14],[78,14],[14,74],[78,74]].forEach(([x,y]) => {
    ctx.fillStyle='#CD853F'; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill()
  })
  ctx.fillStyle='#fff'; ctx.strokeStyle='#5A3A0A'; ctx.lineWidth=4
  ctx.font='bold 52px Arial'; ctx.textAlign='center'
  ctx.strokeText('?',47,62); ctx.fillText('?',47,62)
  canvas.refresh()
}

const LEVEL_WIDTH = 8500
const GROUND_Y = 620
const WATER_Y = 680
const MAX_LIVES = 7
const DRAGON_HP = 15
const ARENA_X = LEVEL_WIDTH + 500

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.reachedPlatforms = new Set()
    this.walkTimer=0; this.walkFrame=0; this.enemyWalkTimer=0; this.enemyWalkFrame=0
    this.blinkTimer=0; this.isBlinking=false
    this.lives=MAX_LIVES; this.coins=0; this.gameOver=false
    this.inDragonArena = false; this.dragonHP = DRAGON_HP
    this.dragonAttackTimer = 0; this.bossDefeated = false
    this.scoreBeforeBoss = 0
    this.playerAttackCooldown = 0
  }

  init(data) {
    this.playerData = data.playerData || { name:'Jugador', avatarConfig:{} }
    this.onQuestionReach = data.onQuestionReach || (()=>{})
    this.onLifeChange = data.onLifeChange || (()=>{})
    this.onCoinCollect = data.onCoinCollect || (()=>{})
    this.onGameOver = data.onGameOver || (()=>{})
    this.onBossDefeated = data.onBossDefeated || (()=>{})
    this.getScore = data.getScore || (()=>0)
    this.reachedPlatforms = new Set()
    this.lives=MAX_LIVES; this.coins=0; this.gameOver=false
    this.inDragonArena=false; this.dragonHP=DRAGON_HP; this.bossDefeated=false
    this.scoreBeforeBoss = 0
    this.playerAttackCooldown = 0
  }

  drawTree(x) {
    const gs=GROUND_Y
    this.add.ellipse(x,gs+3,90,15,0x000000,0.3)
    const tg = this.add.graphics()
    tg.fillGradientStyle(0x8B5A2B,0x6B3410,0x8B5A2B,0x6B3410,1)
    tg.fillRect(x-13,gs-80,26,80)
    this.add.circle(x-25,gs-95,30,0x1B5E20,0.9)
    this.add.circle(x+25,gs-95,30,0x1B5E20,0.9)
    this.add.circle(x,gs-120,35,0x1B5E20,0.9)
    this.add.circle(x-22,gs-100,28,0x2E7D32)
    this.add.circle(x+22,gs-100,28,0x2E7D32)
    this.add.circle(x,gs-125,32,0x388E3C)
    this.add.circle(x-15,gs-105,20,0x4CAF50)
    this.add.circle(x+15,gs-110,18,0x4CAF50)
    this.add.circle(x,gs-130,22,0x66BB6A)
    this.add.circle(x-18,gs-88,4,0xD32F2F)
    this.add.circle(x+15,gs-100,4,0xD32F2F)
  }

  drawBush(x) {
    const gs=GROUND_Y
    this.add.ellipse(x,gs+2,62,8,0x000000,0.3)
    this.add.circle(x-18,gs-9,18,0x1B5E20)
    this.add.circle(x+18,gs-9,18,0x1B5E20)
    this.add.circle(x,gs-22,22,0x2E7D32)
    this.add.circle(x-15,gs-12,15,0x388E3C)
    this.add.circle(x+15,gs-12,15,0x4CAF50)
    this.add.circle(x,gs-27,18,0x66BB6A)
  }

  create() {
    this.physics.world.setBounds(0,0,LEVEL_WIDTH,800)
    this.cameras.main.setBounds(0,0,LEVEL_WIDTH,800)

    const bgSky = this.add.graphics()
    bgSky.fillGradientStyle(0xC8E0F0,0xC8E0F0,0xFFDEE8,0xFFDEE8,1)
    bgSky.fillRect(0,0,1280,720); bgSky.setScrollFactor(0)

    const sunX=1100, sunY=120
    const halo = this.add.graphics().setScrollFactor(0)
    halo.fillStyle(0xFFE87C,0.15); halo.fillCircle(sunX,sunY,120)
    halo.fillStyle(0xFFE87C,0.25); halo.fillCircle(sunX,sunY,80)
    const sunRays = this.add.graphics().setScrollFactor(0)
    sunRays.fillStyle(0xFFE87C,0.35)
    for (let a=0;a<Math.PI*2;a+=Math.PI/8) {
      sunRays.beginPath(); sunRays.moveTo(sunX,sunY)
      sunRays.arc(sunX,sunY,90,a-0.08,a+0.08); sunRays.fillPath()
    }
    this.add.circle(sunX,sunY,45,0xFFFFFF).setScrollFactor(0)
    this.add.circle(sunX,sunY,40,0xFFE87C).setScrollFactor(0)
    this.add.circle(sunX,sunY,32,0xFFF59D).setScrollFactor(0)
    this.tweens.add({targets:sunRays,angle:360,duration:40000,repeat:-1})

    const farM = this.add.graphics()
    for (let x=0;x<LEVEL_WIDTH;x+=280) {
      farM.fillGradientStyle(0xD8A8B8,0xD8A8B8,0xC890A8,0xB88090,1)
      farM.fillTriangle(x,560,x+140,280,x+280,560)
    }
    farM.setScrollFactor(0.15)

    const midM = this.add.graphics()
    for (let x=-100;x<LEVEL_WIDTH;x+=360) {
      midM.fillGradientStyle(0xE8A08C,0xD89078,0xB87060,0x906050,1)
      midM.fillTriangle(x,600,x+180,340,x+360,600)
      midM.fillStyle(0xFFFFFF,0.95)
      midM.fillTriangle(x+150,390,x+180,340,x+210,390)
    }
    midM.setScrollFactor(0.35)

    const nearM = this.add.graphics()
    for (let x=-50;x<LEVEL_WIDTH;x+=450) {
      nearM.fillGradientStyle(0xD87060,0xC86050,0xA04838,0x803020,1)
      nearM.fillTriangle(x,620,x+225,420,x+450,620)
    }
    nearM.setScrollFactor(0.55)

    for (let i=0;i<35;i++) {
      const cx=Phaser.Math.Between(50,LEVEL_WIDTH-50), cy=Phaser.Math.Between(60,280)
      const cl=this.add.graphics()
      cl.fillStyle(0xE8C8D0,0.5)
      cl.fillCircle(cx+4,cy+16,28); cl.fillCircle(cx+30,cy+8,32); cl.fillCircle(cx+58,cy+16,28)
      cl.fillGradientStyle(0xFFFFFF,0xFFFFFF,0xF0F0F5,0xF0F0F5,1)
      cl.fillCircle(cx,cy,28); cl.fillCircle(cx+28,cy-8,32); cl.fillCircle(cx+56,cy,28); cl.fillCircle(cx+28,cy+12,22)
      cl.setScrollFactor(0.25)
    }

    const segments = [
      {start:0,end:700,type:'ground'}, {start:700,end:920,type:'gap'},
      {start:920,end:1600,type:'ground'}, {start:1600,end:1820,type:'gap'},
      {start:1820,end:2500,type:'ground'}, {start:2500,end:2820,type:'gap'},
      {start:2820,end:3600,type:'ground'}, {start:3600,end:3820,type:'gap'},
      {start:3820,end:4600,type:'ground'}, {start:4600,end:4870,type:'gap'},
      {start:4870,end:5600,type:'ground'}, {start:5600,end:5850,type:'gap'},
      {start:5850,end:6700,type:'ground'}, {start:6700,end:6950,type:'gap'},
      {start:6950,end:7700,type:'ground'}, {start:7700,end:7900,type:'gap'},
      {start:7900,end:LEVEL_WIDTH,type:'ground'}
    ]

    this.platforms = this.physics.add.staticGroup()
    this.killZones = this.physics.add.staticGroup()
    const gfx = this.add.graphics()
    
    segments.forEach(seg => {
      if (seg.type==='ground') {
        const w=seg.end-seg.start, cx=seg.start+w/2
        const hb = this.add.rectangle(cx,GROUND_Y+50,w,100,0x000000,0)
        this.physics.add.existing(hb,true); this.platforms.add(hb)
        gfx.fillGradientStyle(0xA06840,0x8B5A2B,0x6B3410,0x4A2408,1)
        gfx.fillRect(seg.start,GROUND_Y+22,w,250)
        gfx.fillGradientStyle(0x66BB6A,0x4CAF50,0x388E3C,0x2E7D32,1)
        gfx.fillRect(seg.start,GROUND_Y,w,22)
        gfx.fillStyle(0x7FD96A,1); gfx.fillRect(seg.start,GROUND_Y,w,5)
        for (let x=seg.start+3;x<seg.end;x+=Phaser.Math.Between(6,12)) {
          const h=Phaser.Math.Between(5,10)
          gfx.fillStyle(0x7FD96A,1)
          gfx.fillTriangle(x,GROUND_Y,x+1,GROUND_Y-h,x+2,GROUND_Y)
        }
        for (let x=seg.start+50;x<seg.end;x+=Phaser.Math.Between(120,280)) {
          const colors=[0xFF69B4,0xFFD700,0xFF6347,0x9370DB]
          const c=Phaser.Math.RND.pick(colors)
          gfx.fillStyle(0x2E7D32,1); gfx.fillRect(x,GROUND_Y-10,2,10)
          gfx.fillStyle(c,1); gfx.fillCircle(x+1,GROUND_Y-12,4)
        }
      } else {
        const w=seg.end-seg.start
        gfx.fillGradientStyle(0x4A90C2,0x4A90C2,0x1E5A8A,0x1E5A8A,1)
        gfx.fillRect(seg.start,WATER_Y,w,140)
        gfx.fillStyle(0x7FB8DE,0.7)
        for (let x=seg.start;x<seg.end;x+=22) gfx.fillCircle(x,WATER_Y+2,6)
        gfx.fillGradientStyle(0x6B3410,0x5D3A1A,0x4A2408,0x4A2408,1)
        gfx.fillRect(seg.start,GROUND_Y,14,WATER_Y-GROUND_Y)
        gfx.fillRect(seg.end-14,GROUND_Y,14,WATER_Y-GROUND_Y)
        const kb = this.add.rectangle(seg.start+w/2,WATER_Y+25,w-24,50,0x000000,0)
        this.physics.add.existing(kb,true); this.killZones.add(kb)
      }
    })

    const bridgeGaps = [{start:700,end:920},{start:2500,end:2820},{start:5600,end:5850},{start:7700,end:7900}]
    bridgeGaps.forEach(gap => {
      const w=gap.end-gap.start
      this.add.rectangle(gap.start+5,GROUND_Y+6,10,50,0x4A2C17)
      this.add.rectangle(gap.end-5,GROUND_Y+6,10,50,0x4A2C17)
      const rg=this.add.graphics(); rg.lineStyle(4,0x4A2C17,1); rg.beginPath()
      for (let s=0;s<=12;s++) {
        const t=s/12, x=gap.start+5+(w-10)*t
        const y=GROUND_Y-18+(12)*(4*t*(1-t))
        if (s===0) rg.moveTo(x,y); else rg.lineTo(x,y)
      }
      rg.strokePath()
      for (let x=gap.start+10;x<gap.end-10;x+=26) {
        this.add.rectangle(x+12,GROUND_Y+8,24,12,0x8B5A2B).setStrokeStyle(1,0x5D3A1A)
      }
      const bh = this.add.rectangle(gap.start+w/2,GROUND_Y+12,w,10,0x000000,0)
      this.physics.add.existing(bh,true); this.platforms.add(bh)
    })

    const fp = [
      {x:1700,y:520},{x:1830,y:440},{x:1960,y:520},
      {x:4980,y:480},{x:5100,y:540},
      {x:6100,y:500},{x:6280,y:440},{x:6460,y:500}
    ]
    fp.forEach(p => {
      this.add.rectangle(p.x+4,p.y+5,90,20,0x000000,0.35)
      this.add.rectangle(p.x,p.y,90,20,0xA0724A).setStrokeStyle(1,0x5D3A1A)
      this.add.rectangle(p.x,p.y-11,90,5,0x4CAF50)
      this.add.rectangle(p.x,p.y-13,90,3,0x66BB6A)
      const pl=this.add.rectangle(p.x,p.y,86,18,0x000000,0)
      this.physics.add.existing(pl,true); this.platforms.add(pl)
      this.tweens.add({targets:pl,y:p.y-6,duration:1800,yoyo:true,repeat:-1,ease:'Sine.inOut',
        onUpdate:()=>pl.body.updateFromGameObject()})
    })

    ;[250,1150,2100,3300,4300,5400,6200,7300,8200].forEach(tx => this.drawTree(tx))
    ;[420,1380,2300,3500,4550,5650,6500,7500,8400].forEach(bx => this.drawBush(bx))

    createQuestionBlockTexture(this)
    const qxs = [300,1080,1450,2350,3050,3300,4000,4400,5350,6400,7500,8100]
    this.questionBlocks = this.physics.add.staticGroup()
    qxs.forEach((qx,i) => {
      const qy=GROUND_Y-180
      this.add.rectangle(qx+5,qy+5,90,90,0x000000,0.4)
      const block = this.add.image(qx,qy,'qblock')
      this.physics.add.existing(block,true)
      this.questionBlocks.add(block)
      block.questionIndex = i % 10
      block.answered = false
      block.baseY = qy
    })

    createCoinTexture(this)
    this.coinsGroup = this.physics.add.group({allowGravity:false,immovable:true})
    const coins = [
      {x:800,y:540},{x:830,y:520},{x:1760,y:420},{x:2600,y:540},{x:2670,y:520},
      {x:3650,y:560},{x:4700,y:540},{x:4780,y:520},{x:5700,y:540},
      {x:6800,y:540},{x:7750,y:540},{x:8100,y:540}
    ]
    coins.forEach(p => {
      const c=this.coinsGroup.create(p.x,p.y,'coin')
      c.body.setSize(36,36)
      this.tweens.add({targets:c,scaleX:0.3,duration:500,yoyo:true,repeat:-1})
      this.tweens.add({targets:c,y:p.y-12,duration:1000,yoyo:true,repeat:-1,ease:'Sine.inOut'})
    })

    this.spikes = this.physics.add.staticGroup()
    ;[1250,3100,4200,5200,6500,7400].forEach(sx => {
      this.add.rectangle(sx,GROUND_Y-5,58,12,0x505050)
      const sg=this.add.graphics()
      for (let j=0;j<3;j++) {
        const bx=sx-23+j*18
        sg.fillStyle(0xC0C0C0,1)
        sg.fillTriangle(bx,GROUND_Y-11,bx+9,GROUND_Y-35,bx+18,GROUND_Y-11)
      }
      const sh=this.add.rectangle(sx,GROUND_Y-15,50,25,0x000000,0)
      this.physics.add.existing(sh,true); this.spikes.add(sh)
    })

    createGoombaFrames(this)
    this.enemies = this.physics.add.group()
    const es = [
      {x:600,minX:480,maxX:700},{x:1400,minX:1280,maxX:1580},
      {x:2200,minX:2080,maxX:2450},{x:3300,minX:3180,maxX:3580},
      {x:4300,minX:4180,maxX:4550},{x:5450,minX:5330,maxX:5580}
    ]
    es.forEach(e => {
      const en=this.enemies.create(e.x,GROUND_Y-40,'goomba_walk1')
      en.body.setSize(65,75).setOffset(10,15)
      en.setCollideWorldBounds(true)
      en.minX=e.minX; en.maxX=e.maxX; en.dir=1
      en.body.setVelocityX(70)
    })

    createSkeletonFrames(this)
    this.skeletons = this.physics.add.group()
    ;[{x:6100,minX:5980,maxX:6250},{x:7100,minX:6980,maxX:7350},{x:8100,minX:7980,maxX:8300}]
    .forEach(e => {
      const sk=this.skeletons.create(e.x,GROUND_Y-55,'skeleton_walk1')
      sk.body.setSize(55,100).setOffset(12,10)
      sk.setCollideWorldBounds(true)
      sk.minX=e.minX; sk.maxX=e.maxX; sk.dir=1
      sk.body.setVelocityX(90)
    })

    createBatFrames(this)
    this.bats = this.physics.add.group({allowGravity:false})
    ;[{x:3800,y:400},{x:5200,y:350},{x:6800,y:380},{x:7800,y:320}].forEach(b => {
      const bat=this.bats.create(b.x,b.y,'bat_fly1')
      bat.body.setSize(55,45).setOffset(10,10)
      bat.body.setAllowGravity(false)
      this.tweens.add({targets:bat,y:b.y+50,duration:2000,yoyo:true,repeat:-1,ease:'Sine.inOut'})
      this.tweens.add({targets:bat,x:b.x+100,duration:3000,yoyo:true,repeat:-1,ease:'Sine.inOut'})
    })

    const flagX=LEVEL_WIDTH-220
    this.add.rectangle(flagX,GROUND_Y-5,38,15,0x8B6914)
    this.add.rectangle(flagX,GROUND_Y-130,8,250,0x2C2C2C)
    const flag=this.add.triangle(flagX+38,GROUND_Y-230,0,0,70,22,0,44,0xE94560)
    this.tweens.add({targets:flag,scaleX:0.85,duration:800,yoyo:true,repeat:-1})
    const portalX = flagX + 60
    this.portal = this.add.graphics()
    this.portal.fillStyle(0x8B0000, 0.8); this.portal.fillCircle(portalX, GROUND_Y - 80, 50)
    this.portal.fillStyle(0x000000, 1); this.portal.fillCircle(portalX, GROUND_Y - 80, 40)
    this.portalHitbox = this.add.rectangle(portalX, GROUND_Y - 80, 80, 100, 0x000000, 0)
    this.physics.add.existing(this.portalHitbox, true)
    this.add.text(flagX-60,GROUND_Y-290,'🏁 META: ¡Al Dragón!',{fontSize:'22px',color:'#fff',fontStyle:'bold',stroke:'#000',strokeThickness:4})
    this.tweens.add({targets:this.portal,alpha:{from:0.6,to:1},duration:800,yoyo:true,repeat:-1})

    const texPrefix = `avatar_${this.playerData.code || 'me'}`
    createAvatarFrames(this, this.playerData.avatarConfig || {}, texPrefix)
    this.texPrefix = texPrefix
    this.player = this.physics.add.sprite(150, GROUND_Y - 60, `${texPrefix}_idle`)
    this.player.setCollideWorldBounds(true)
    this.player.body.setGravityY(850)
    this.player.body.setSize(40, 95).setOffset(22, 10)
    this.spawnPoint = { x: 150, y: GROUND_Y - 60 }

    this.cameras.main.startFollow(this.player,true,0.1,0.1)
    this.cameras.main.setDeadzone(150,250)

    this.dustEmitter = this.add.particles(0,0,null,{
      lifespan:500,speed:{min:30,max:80},angle:{min:160,max:200},
      scale:{start:0.6,end:0},alpha:{start:0.8,end:0},
      tint:[0xFFE4B5,0xF5DEB3,0xD2B48C],emitting:false
    })

    for (let i=0;i<15;i++) {
      const bx=Phaser.Math.Between(400,LEVEL_WIDTH-400)
      const by=Phaser.Math.Between(180,450)
      const bf=this.add.text(bx,by,'🦋',{fontSize:'22px'})
      this.tweens.add({targets:bf,x:bx+Phaser.Math.Between(-120,120),y:by+Phaser.Math.Between(-50,50),
        duration:Phaser.Math.Between(3000,6000),yoyo:true,repeat:-1,ease:'Sine.inOut'})
    }

    this.physics.add.collider(this.player,this.platforms)
    this.physics.add.collider(this.enemies,this.platforms)
    this.physics.add.collider(this.skeletons,this.platforms)

    this.physics.add.collider(this.player,this.questionBlocks,(player,block) => {
      if (block.answered) return
      const fromBelow = player.body.blocked.up || player.body.touching.up
      const fromAbove = player.body.blocked.down || player.body.touching.down
      if ((fromBelow || fromAbove) && !this.reachedPlatforms.has(block.questionIndex)) {
        this.reachedPlatforms.add(block.questionIndex)
        block.answered = true
        this.tweens.add({targets:block,y:block.baseY-15,duration:120,yoyo:true,ease:'Quad.out'})
        for (let i=0;i<10;i++) {
          const star=this.add.text(block.x,block.y,'⭐',{fontSize:'22px'}).setOrigin(0.5)
          this.tweens.add({targets:star,x:block.x+Phaser.Math.Between(-80,80),
            y:block.y-Phaser.Math.Between(40,100),alpha:0,duration:700,onComplete:()=>star.destroy()})
        }
        this.onQuestionReach(block.questionIndex)
      }
    })

    this.physics.add.overlap(this.player,this.spikes,()=>this.damagePlayer())
    this.physics.add.overlap(this.player,this.killZones,()=>this.killPlayerWater())

    const handleEnemyHit = (player, enemy) => {
      if (this.player.isInvulnerable || !enemy.active) return
      const playerBottom = player.body.bottom
      const enemyTop = enemy.body.top
      const fallingDown = player.body.velocity.y > 30
      if (fallingDown && playerBottom <= enemyTop + 25) {
        enemy.active = false
        this.tweens.add({targets:enemy,scaleY:0.2,alpha:0,duration:300,onComplete:()=>enemy.destroy()})
        player.body.setVelocityY(-450)
        for (let i=0;i<8;i++) {
          const s=this.add.text(enemy.x,enemy.y,'✨',{fontSize:'20px'}).setOrigin(0.5)
          this.tweens.add({targets:s,x:enemy.x+Phaser.Math.Between(-50,50),y:enemy.y-50,alpha:0,duration:500,onComplete:()=>s.destroy()})
        }
        this.coins++; this.onCoinCollect(this.coins)
      } else {
        this.damagePlayer()
      }
    }
    this.physics.add.overlap(this.player,this.enemies,handleEnemyHit)
    this.physics.add.overlap(this.player,this.skeletons,handleEnemyHit)
    this.physics.add.overlap(this.player,this.bats,()=>this.damagePlayer())

    this.physics.add.overlap(this.player,this.portalHitbox,() => {
      if (!this.inDragonArena && !this.bossDefeated) this.enterDragonArena()
    })

    this.physics.add.overlap(this.player,this.coinsGroup,(player,coin) => {
      coin.destroy(); this.coins++; this.onCoinCollect(this.coins)
      const t=this.add.text(coin.x,coin.y,'+5',{fontSize:'26px',color:'#FFD700',fontStyle:'bold',stroke:'#000',strokeThickness:4}).setOrigin(0.5)
      this.tweens.add({targets:t,y:coin.y-60,alpha:0,duration:600,onComplete:()=>t.destroy()})
    })

    this.cursors = this.input.keyboard.createCursorKeys()
    this.wasd = this.input.keyboard.addKeys('W,A,S,D')
    this.attackKey = {
      SPACE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      X: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
    }
    
    this.nameTag = this.add.text(this.player.x,this.player.y-70,this.playerData.name,{
      fontSize:'14px',color:'#fff',backgroundColor:'#e94560',padding:{x:6,y:2},fontStyle:'bold'
    }).setOrigin(0.5)
    this.add.text(640,40,'← → o A/D: Mover  |  ↑ o W: Saltar',{
      fontSize:'18px',color:'#fff',backgroundColor:'#000000aa',padding:{x:14,y:7}
    }).setOrigin(0.5).setScrollFactor(0)
  }

  enterDragonArena() {
    this.inDragonArena = true
    this.scoreBeforeBoss = this.getScore()
    this.cameras.main.fadeOut(500,0,0,0)
    this.time.delayedCall(600, () => {
      this.setupDragonArena()
      this.cameras.main.fadeIn(500,0,0,0)
    })
  }

  setupDragonArena() {
    const aX = ARENA_X
    const aY = GROUND_Y
    this.physics.world.setBounds(0, 0, aX + 1600, 800)
    this.cameras.main.setBounds(aX - 100, 0, 1600, 800)
    
    const darkBg = this.add.graphics()
    darkBg.fillGradientStyle(0x3a3a48, 0x3a3a48, 0x5a5a68, 0x4a4a58, 1)
    darkBg.fillRect(aX - 100, 0, 1600, 800)
    
    const moonX = aX + 1100, moonY = 120
    const moonGlow = this.add.graphics()
    moonGlow.fillStyle(0xFFFACD, 0.2); moonGlow.fillCircle(moonX, moonY, 80)
    moonGlow.fillStyle(0xFFFACD, 0.4); moonGlow.fillCircle(moonX, moonY, 50)
    this.add.circle(moonX, moonY, 40, 0xFFFACD)
    this.add.circle(moonX, moonY, 38, 0xFFFFE0)
    
    for (let i=0;i<40;i++) {
      const sx = Phaser.Math.Between(aX - 50, aX + 1500)
      const sy = Phaser.Math.Between(30, 280)
      const st = this.add.circle(sx, sy, Phaser.Math.Between(1, 2), 0xFFFFFF, 0.9)
      this.tweens.add({targets:st, alpha:0.3, duration:Phaser.Math.Between(1000,3000), yoyo:true, repeat:-1})
    }
    
    const castleGfx = this.add.graphics()
    castleGfx.fillStyle(0x6a6a78, 1)
    castleGfx.fillRect(aX + 100, 250, 140, 350)
    for (let i=0;i<7;i++) castleGfx.fillRect(aX + 100 + i*20, 240, 12, 20)
    castleGfx.fillStyle(0x4a4a58, 1)
    castleGfx.fillTriangle(aX + 100, 250, aX + 170, 140, aX + 240, 250)
    castleGfx.fillStyle(0x6a6a78, 1)
    castleGfx.fillRect(aX + 1300, 250, 140, 350)
    for (let i=0;i<7;i++) castleGfx.fillRect(aX + 1300 + i*20, 240, 12, 20)
    castleGfx.fillStyle(0x4a4a58, 1)
    castleGfx.fillTriangle(aX + 1300, 250, aX + 1370, 140, aX + 1440, 250)
    castleGfx.fillStyle(0x7a7a88, 1)
    castleGfx.fillRect(aX + 240, 300, 1060, 300)
    castleGfx.lineStyle(1.5, 0x4a4a58, 0.7)
    for (let y=320;y<600;y+=30) {
      castleGfx.beginPath(); castleGfx.moveTo(aX + 240, y); castleGfx.lineTo(aX + 1300, y); castleGfx.strokePath()
    }
    for (let i=0;i<26;i++) castleGfx.fillRect(aX + 240 + i*40, 290, 24, 20)
    ;[350, 500, 700, 900, 1050, 1200].forEach(wx => {
      castleGfx.fillStyle(0x1a1a1a, 1)
      castleGfx.fillRect(aX + wx, 360, 30, 50)
      castleGfx.fillStyle(0x8B0000, 0.6)
      castleGfx.fillRect(aX + wx + 2, 362, 26, 46)
    })
    
    const arenaFloor = this.add.rectangle(aX + 700, aY + 50, 1500, 100, 0x3a3a48)
    arenaFloor.setStrokeStyle(3, 0x000)
    this.physics.add.existing(arenaFloor, true)
    this.platforms.add(arenaFloor)
    
    const floorGfx = this.add.graphics()
    floorGfx.fillGradientStyle(0x5a5a68, 0x5a5a68, 0x3a3a48, 0x3a3a48, 1)
    floorGfx.fillRect(aX - 100, aY, 1600, 250)
    
    for (let i=0;i<4;i++) {
      const tx = aX + 200 + i*350
      const ty = aY - 200
      this.add.rectangle(tx, ty+30, 8, 60, 0x2a1a0a)
      this.add.rectangle(tx-8, ty, 24, 12, 0x4a2a0a)
      const flame1 = this.add.circle(tx, ty-15, 14, 0xFF4500, 0.9)
      const flame2 = this.add.circle(tx, ty-18, 10, 0xFFA500, 0.9)
      const flame3 = this.add.circle(tx, ty-20, 7, 0xFFFF00, 1)
      this.add.circle(tx, ty-18, 50, 0xFFA500, 0.15)
      this.tweens.add({targets:[flame1,flame2,flame3], scaleY:{from:1, to:1.3}, duration:200+i*50, yoyo:true, repeat:-1})
    }
    
    for (let i=0;i<6;i++) {
      const bx = Phaser.Math.Between(aX + 100, aX + 1400)
      const by = Phaser.Math.Between(150, 400)
      const bat = this.add.image(bx, by, 'bat_fly1').setScale(0.6).setAlpha(0.8)
      this.tweens.add({targets:bat, x:bx+Phaser.Math.Between(-200,200), y:by+Phaser.Math.Between(-50,50),
        duration:Phaser.Math.Between(4000,8000), yoyo:true, repeat:-1, ease:'Sine.inOut'})
    }
    
    this.player.x = aX + 300
    this.player.y = aY - 100
    this.player.body.setVelocity(0, 0)
    this.player.setVisible(true)
    this.player.setDepth(100)
    
    this.cameras.main.stopFollow()
    this.cameras.main.centerOn(this.player.x, this.player.y - 100)
    this.time.delayedCall(100, () => {
      this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
    })
    
    // 🐉 Crear textura y dragón
    createDragonTexture(this)
    createFireballTexture(this)
    
    // ✅ DRAGÓN POSICIONADO CORRECTAMENTE
    const dragonX = aX + 1000
    const dragonY = aY - 280
    this.dragon = this.physics.add.sprite(dragonX, dragonY, 'dragon_main')
    this.dragon.setOrigin(0.5, 0.5)
    this.dragon.setScale(1.0)
    this.dragon.body.setAllowGravity(false)
    this.dragon.body.setImmovable(true)
    this.dragon.body.setSize(340, 240)
    this.dragon.body.setOffset(80, 60)
    this.dragon.setFlipX(true)
    this.dragon.setDepth(50)
    this.dragon.setActive(true)
    this.dragon.setVisible(true)
    this.dragon.setAlpha(1)
    this.dragonBaseX = dragonX
    this.dragonBaseY = dragonY
    
    console.log('🐉 Dragón creado:', {
      x: this.dragon.x, y: this.dragon.y,
      visible: this.dragon.visible, alpha: this.dragon.alpha,
      texture: this.dragon.texture.key, scale: this.dragon.scaleX
    })
    
    this.dragonAttackTimer = 0
    this.fireballs = this.physics.add.group({allowGravity: false})
    this.playerBullets = this.physics.add.group({allowGravity: false})
    
    this.dragonHPBar = this.add.graphics().setScrollFactor(0)
    this.dragonHPText = this.add.text(640, 80, `DRAGÓN: ${this.dragonHP}/${DRAGON_HP}`, {
      fontSize:'24px', color:'#FF0000', fontStyle:'bold', stroke:'#000', strokeThickness:5
    }).setOrigin(0.5).setScrollFactor(0)
    this.updateDragonHPBar()
    
    const title = this.add.text(640, 180, '⚔️ ¡JEFE FINAL! ⚔️\nCastillo del Dragón Negro', {
      fontSize:'38px', color:'#FF0000', fontStyle:'bold', stroke:'#000', strokeThickness:6, align:'center'
    }).setOrigin(0.5).setScrollFactor(0)
    this.tweens.add({targets:title, alpha:0, duration:4000, onComplete:()=>title.destroy()})
    
    const attackHint = this.add.text(640, 260, '⚔️ Presiona ESPACIO o X para atacar', {
      fontSize:'24px', color:'#00FFFF', fontStyle:'bold', stroke:'#000', strokeThickness:5
    }).setOrigin(0.5).setScrollFactor(0)
    this.tweens.add({targets: attackHint, alpha: 0, duration: 6000, onComplete: () => attackHint.destroy()})
    
    // ✅ COLISIÓN BALA vs DRAGÓN
    this.physics.add.overlap(this.playerBullets, this.dragon, (bullet, dragon) => {
      if (this.bossDefeated) return
      if (!bullet || !bullet.active) return
      if (bullet.alreadyHit) return
      if (dragon.lastHitTime && this.time.now - dragon.lastHitTime < 100) return
      dragon.lastHitTime = this.time.now

      bullet.alreadyHit = true
      if (bullet.body) bullet.body.enable = false

      const bx = bullet.x
      const by = bullet.y

      bullet.setActive(false)
      bullet.setVisible(false)
      bullet.destroy()

      this.dragonHP--
      console.log("HP DRAGON (BALA):", this.dragonHP)

      // 🔥 Mantener dragón vivo y visible
      if (this.dragon) {
        this.dragon.setActive(true)
        this.dragon.setVisible(true)
        this.dragon.setAlpha(1)
        if (this.dragon.body) this.dragon.body.enable = true
      }

      this.updateDragonHPBar()
      this.dragonHPText.setText(`DRAGÓN: ${this.dragonHP}/${DRAGON_HP}`)
      this.cameras.main.shake(150, 0.01)

      // Flash rojo al dragón
      if (this.dragon) {
        this.dragon.setTint(0xFF6666)
        this.time.delayedCall(150, () => {
          if (this.dragon && this.dragon.active) this.dragon.clearTint()
        })
      }

      for (let i = 0; i < 8; i++) {
        const p = this.add.text(bx, by, '⚡', { fontSize: '22px' }).setOrigin(0.5)
        this.tweens.add({
          targets: p,
          x: bx + Phaser.Math.Between(-60, 60),
          y: by + Phaser.Math.Between(-60, 60),
          alpha: 0,
          duration: 500,
          onComplete: () => p.destroy()
        })
      }
      
      if (this.dragonHP <= 0) this.defeatDragon()
    })
    
    // ✅ COLISIÓN JUGADOR vs DRAGÓN
    this.physics.add.overlap(this.player, this.dragon, (player, dragon) => {
      if (!dragon || !dragon.active) return
      if (this.player.isInvulnerable || this.bossDefeated) return
      if (dragon.lastStompTime && this.time.now - dragon.lastStompTime < 500) return
      
      const playerBottom = player.body.bottom
      const dragonTop = dragon.body.top
      const fallingDown = player.body.velocity.y > 30
      
      if (fallingDown && playerBottom <= dragonTop + 40) {
        dragon.lastStompTime = this.time.now
        this.dragonHP -= 2
        console.log("HP DRAGON (SALTO):", this.dragonHP)
        
        if (this.dragon) {
          this.dragon.setActive(true)
          this.dragon.setVisible(true)
          this.dragon.setAlpha(1)
          if (this.dragon.body) this.dragon.body.enable = true
        }
        
        this.updateDragonHPBar()
        this.dragonHPText.setText(`DRAGÓN: ${this.dragonHP}/${DRAGON_HP}`)
        player.body.setVelocityY(-700)
        player.y -= 10
        this.cameras.main.shake(300, 0.02)
        
        for (let i=0;i<20;i++) {
          const p = this.add.text(dragon.x, dragon.y, '💥', {fontSize:'28px'}).setOrigin(0.5)
          this.tweens.add({targets:p,x:dragon.x+Phaser.Math.Between(-100,100),y:dragon.y+Phaser.Math.Between(-100,40),alpha:0,duration:700,onComplete:()=>p.destroy()})
        }
        if (this.dragonHP <= 0) this.defeatDragon()
      } else {
        this.damagePlayer()
      }
    })
    
    // ✅ COLISIÓN JUGADOR vs BOLAS DE FUEGO
    this.physics.add.overlap(this.player, this.fireballs, (player, fb) => {
      if (!fb.active) return
      const fx = fb.x, fy = fb.y
      fb.destroy()
      const exp = this.add.text(fx, fy, '🔥💥', {fontSize:'36px'}).setOrigin(0.5)
      this.tweens.add({targets:exp, scale:2, alpha:0, duration:400, onComplete:()=>exp.destroy()})
      this.damagePlayer()
    })
  }

  updateDragonHPBar() {
    if (!this.dragonHPBar) return
    this.dragonHPBar.clear()
    this.dragonHPBar.fillStyle(0x000, 0.8)
    this.dragonHPBar.fillRoundedRect(390, 105, 500, 24, 12)
    const hpRatio = Math.max(0, this.dragonHP) / DRAGON_HP
    const color = hpRatio > 0.5 ? 0xFF0000 : (hpRatio > 0.25 ? 0xFF6600 : 0xFFFF00)
    this.dragonHPBar.fillStyle(color, 1)
    this.dragonHPBar.fillRoundedRect(395, 110, 490 * hpRatio, 14, 7)
  }

  dragonAttack() {
    if (!this.dragon || !this.dragon.active || this.bossDefeated) return
    for (let i=0;i<5;i++) {
      this.time.delayedCall(i*150, () => {
        if (!this.dragon || !this.dragon.active) return
        const fb = this.fireballs.create(this.dragon.x - 100, this.dragon.y + 30, 'fireball')
        fb.body.setSize(40,40)
        fb.body.setAllowGravity(false)
        fb.setScale(1.3)
        const baseAngle = Phaser.Math.Angle.Between(fb.x, fb.y, this.player.x, this.player.y)
        const spread = (i - 2) * 0.15
        const angle = baseAngle + spread
        const speed = 350
        fb.body.setVelocity(Math.cos(angle)*speed, Math.sin(angle)*speed)
        fb.setRotation(angle)
        this.time.delayedCall(3500, () => { if (fb && fb.active) fb.destroy() })
      })
    }
  }

  defeatDragon() {
    this.bossDefeated = true
    const dragonX = this.dragon ? this.dragon.x : 0
    const dragonY = this.dragon ? this.dragon.y : 0
    if (this.dragon) {
      this.tweens.add({
        targets: this.dragon, alpha:0, scaleX:0.1, scaleY:0.1, angle:720, duration:2000,
        onComplete: () => { if (this.dragon) this.dragon.destroy() }
      })
      this.cameras.main.shake(1500, 0.03)
      this.cameras.main.flash(800, 255, 200, 0)
    }
    for (let i=0;i<30;i++) {
      const s = this.add.text(dragonX, dragonY, '⭐', {fontSize:'32px'}).setOrigin(0.5).setScrollFactor(1)
      this.tweens.add({
        targets: s,
        x: dragonX + Phaser.Math.Between(-200, 200),
        y: dragonY + Phaser.Math.Between(-200, 100),
        alpha: 0, duration: 1500, onComplete: () => s.destroy()
      })
    }
    const win = this.add.text(640, 360, '🏆 ¡VICTORIA! 🏆\n¡Derrotaste al Dragón!\n+100 puntos', {
      fontSize:'48px', color:'#FFD700', fontStyle:'bold', align:'center', stroke:'#000', strokeThickness:8
    }).setOrigin(0.5).setScrollFactor(0)
    this.coins += 20
    this.onCoinCollect(this.coins)
    this.time.delayedCall(3500, () => {
      win.destroy()
      this.onBossDefeated()
    })
  }

  damagePlayer() {
    if (this.player.isInvulnerable || this.gameOver) return
    this.lives--; this.onLifeChange(this.lives)
    this.player.isInvulnerable = true
    this.player.setTint(0xff0000)
    this.player.body.setVelocityX(-300); this.player.body.setVelocityY(-400)
    this.cameras.main.shake(200,0.01)
    this.tweens.add({targets:this.player,alpha:0.3,duration:150,yoyo:true,repeat:5,
      onComplete:()=>{this.player.alpha=1;this.player.clearTint();this.player.isInvulnerable=false}})
    if (this.lives<=0) this.triggerGameOver()
  }

  loseLifeByWrongAnswer() {
    if (this.gameOver) return
    this.lives--; this.onLifeChange(this.lives)
    this.cameras.main.flash(200,255,0,0)
    if (this.lives<=0) this.triggerGameOver()
  }

  killPlayerWater() {
    if (this.gameOver) return
    this.lives--; this.onLifeChange(this.lives)
    this.cameras.main.flash(300,0,100,200)
    if (this.lives<=0) this.triggerGameOver()
    else {
      this.player.x=this.spawnPoint.x; this.player.y=this.spawnPoint.y
      this.player.body.setVelocity(0,0)
    }
  }

  triggerGameOver() {
    this.gameOver=true; this.physics.pause()
    if (this.inDragonArena && !this.bossDefeated) {
      this.onGameOver(this.scoreBeforeBoss)
    } else {
      this.onGameOver()
    }
  }

  cambiarColorBloque(questionIndex, correcto) {
    const blocks = this.questionBlocks.getChildren().filter(b => b.questionIndex === questionIndex)
    blocks.forEach(block => {
      block.setTint(correcto?0x88FF88:0xFF8888)
      const emoji = correcto?'✨':'💥'
      for (let i=0;i<12;i++) {
        const p=this.add.text(block.x,block.y,emoji,{fontSize:'26px'}).setOrigin(0.5)
        this.tweens.add({targets:p,x:block.x+Phaser.Math.Between(-100,100),y:block.y+Phaser.Math.Between(-100,30),alpha:0,duration:800,onComplete:()=>p.destroy()})
      }
    })
    if (!correcto) this.loseLifeByWrongAnswer()
  }

  update(time, delta) {
    if (!this.player||!this.player.body||this.gameOver) return
    const speed=280
    const isOnGround = this.player.body.blocked.down || this.player.body.touching.down
    const vx = this.player.body.velocity.x
    const left = this.cursors.left.isDown || this.wasd.A.isDown
    const right = this.cursors.right.isDown || this.wasd.D.isDown
    const up = this.cursors.up.isDown || this.wasd.W.isDown

    if (left) { this.player.body.setVelocityX(-speed); this.player.setFlipX(true) }
    else if (right) { this.player.body.setVelocityX(speed); this.player.setFlipX(false) }
    else this.player.body.setVelocityX(0)

    if (up && isOnGround) this.player.body.setVelocityY(-700)

    if (!isOnGround) this.player.setTexture(`${this.texPrefix}_jump`)
    else if (Math.abs(vx)>10) {
      this.walkTimer += delta
      if (this.walkTimer>150) { this.walkTimer=0; this.walkFrame=(this.walkFrame+1)%3 }
      this.player.setTexture(`${this.texPrefix}_${['walk1','walk2','walk3'][this.walkFrame]}`)
      if (Math.random()<0.3) {
        const dir = this.player.flipX?20:-20
        this.dustEmitter.emitParticleAt(this.player.x+dir, this.player.y + 50, 1)
      }
    } else {
      this.walkTimer=0
      this.blinkTimer += delta
      if (this.blinkTimer > 3000+Math.random()*2000) {
        this.blinkTimer=0; this.isBlinking=true
        this.player.setTexture(`${this.texPrefix}_blink`)
        this.time.delayedCall(150,()=>{ this.isBlinking=false; if(this.player&&!this.gameOver) this.player.setTexture(`${this.texPrefix}_idle`) })
      } else if (!this.isBlinking) this.player.setTexture(`${this.texPrefix}_idle`)
    }

    this.enemyWalkTimer += delta
    if (this.enemyWalkTimer>200) { this.enemyWalkTimer=0; this.enemyWalkFrame=this.enemyWalkFrame===0?1:0 }
    this.enemies.getChildren().forEach(en => {
      if (!en||!en.body||!en.active) return
      if (en.x>=en.maxX) { en.dir=-1; en.setFlipX(true) }
      else if (en.x<=en.minX) { en.dir=1; en.setFlipX(false) }
      en.body.setVelocityX(70*en.dir)
      en.setTexture(`goomba_walk${this.enemyWalkFrame+1}`)
    })
    this.skeletons.getChildren().forEach(sk => {
      if (!sk||!sk.body||!sk.active) return
      if (sk.x>=sk.maxX) { sk.dir=-1; sk.setFlipX(true) }
      else if (sk.x<=sk.minX) { sk.dir=1; sk.setFlipX(false) }
      sk.body.setVelocityX(90*sk.dir)
      sk.setTexture(`skeleton_walk${this.enemyWalkFrame+1}`)
    })
    this.bats.getChildren().forEach(b => {
      if (!b) return
      b.setTexture(`bat_fly${this.enemyWalkFrame+1}`)
    })

    // ✅ DRAGÓN: mantener activo, posición fija, flotación suave y atacar
    if (this.dragon && !this.bossDefeated) {
      if (!this.dragon.active) {
        this.dragon.setActive(true)
        this.dragon.setVisible(true)
        if (this.dragon.body) this.dragon.body.enable = true
      }
      this.dragon.x = this.dragonBaseX
      this.dragon.y = this.dragonBaseY + Math.sin(time / 800) * 20
      if (this.dragon.body) this.dragon.body.setVelocity(0, 0)
      this.dragon.setVisible(true)
      this.dragon.setAlpha(1)
      
      this.dragonAttackTimer += delta
      if (this.dragonAttackTimer > 2000) {
        this.dragonAttackTimer = 0
        this.dragonAttack()
      }
    }

    if (this.inDragonArena && !this.bossDefeated && this.playerBullets) {
      this.playerAttackCooldown = Math.max(0, this.playerAttackCooldown - delta)
      const spaceDown = this.attackKey && this.attackKey.SPACE && this.attackKey.SPACE.isDown
      const xDown = this.attackKey && this.attackKey.X && this.attackKey.X.isDown
      const attackPressed = spaceDown || xDown
      if (attackPressed && this.playerAttackCooldown <= 0) {
        this.playerAttackCooldown = 400
        const bullet = this.playerBullets.create(
          this.player.x + (this.player.flipX ? -40 : 40),
          this.player.y - 10,
          'fireball'
        )
        bullet.body.setAllowGravity(false)
        bullet.body.setSize(30, 30)
        bullet.setTint(0x00FFFF)
        bullet.setScale(1)
        bullet.alreadyHit = false
        const direction = this.player.flipX ? -1 : 1
        bullet.body.setVelocityX(700 * direction)
        const flash = this.add.text(
          this.player.x + (direction * 30),
          this.player.y - 10,
          '⚡',
          {fontSize:'36px', color:'#00FFFF'}
        ).setOrigin(0.5)
        this.tweens.add({
          targets: flash,
          scale: 2.5,
          alpha: 0,
          duration: 300,
          onComplete: () => flash.destroy()
        })
        this.time.delayedCall(3000, () => {
          if (bullet && bullet.active) bullet.destroy()
        })
      }
    }

    if (this.player.y>800) this.killPlayerWater()

    if (this.nameTag) {
      this.nameTag.x=this.player.x; this.nameTag.y=this.player.y-70
    }
  }
}