// Eventos de movimiento
input.onButtonPressed(Button.A, function () {
    playerX = (playerX - 1 + 5) % 5
    checkStarCollision()
})
// Mueve al enemigo hacia el jugador
function moveEnemy () {
    if (enemyY < playerY) {
        enemyY += 1
    } else if (enemyY > playerY) {
        enemyY += 0 - 1
    }
    if (enemyX < playerX) {
        enemyX += 1
    } else if (enemyX > playerX) {
        enemyX += 0 - 1
    }
    // Verifica colisión con el jugador
    if (enemyX == playerX && enemyY == playerY) {
        if (!(powerUp)) {
            music.playTone(262, music.beat(BeatFraction.Half))
            playerX = Math.randomRange(0, 4)
            playerY = Math.randomRange(0, 3)
        } else {
            music.playTone(262, music.beat(BeatFraction.Half))
            enemyX = Math.randomRange(0, 4)
            enemyY = Math.randomRange(0, 3)
            // Pausa de 2 segundos para inmovilizar al enemigo
            basic.pause(2000)
        }
    }
}
// Verifica colisiones con la estrella
function checkStarCollision () {
    if (playerX == starX && playerY == starY) {
        score += 1
        basic.showNumber(score)
        music.playTone(523, music.beat(BeatFraction.Quarter))
        starX = Math.randomRange(0, 4)
        starY = Math.randomRange(0, 3)
        // Mover al enemigo hacia una nueva posición aleatoria
        enemyX = Math.randomRange(0, 4)
        enemyY = Math.randomRange(0, 4)
        // Verificar si se ha obtenido un power-up
        if (score % 10 == 0) {
            powerUp = true
            basic.showString("Power Up!")
        }
    }
}
input.onGesture(Gesture.Shake, function () {
    playerY = (playerY + 1) % 5
    checkStarCollision()
})
input.onButtonPressed(Button.AB, function () {
    playerY = (playerY - 1 + 5) % 5
    checkStarCollision()
})
input.onButtonPressed(Button.B, function () {
    playerX = (playerX + 1) % 5
    checkStarCollision()
})
let score = 0
let powerUp = false
let enemyY = 0
let enemyX = 0
let starY = 0
let starX = 0
let playerY = 0
let playerX = 0
playerX = 2
playerY = 4
starX = Math.randomRange(0, 4)
starY = Math.randomRange(0, 3)
enemyX = 2
// Bucle principal del juego
basic.forever(function () {
    basic.clearScreen()
    // Dibuja al jugador
    led.plot(playerX, playerY)
    // Dibuja la estrella
    led.plot(starX, starY)
    // Dibuja al enemigo
    led.plot(enemyX, enemyY)
    // Mueve al enemigo
    moveEnemy()
    // Pausa más larga para el movimiento lento del enemigo
    basic.pause(1000)
    if (powerUp) {
        basic.clearScreen()
        // Mostrar el mensaje de Power Up más rápido
        basic.showString("Power Up!", 100)
// Mostrar el mensaje de Power Up durante 1 segundo
        basic.pause(1000)
        powerUp = false
    }
})
