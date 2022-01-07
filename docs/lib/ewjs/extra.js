/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = innerWidth
CANVAS_HEIGHT = canvas.height = innerHeight

let gameFrame = 0

const FigureImage = new Image()
FigureImage.src = './assets/image/spritesheet.png'

class Figure{
  constructor(_x, _y, _debug = null) {
    this.x = _x
    this.y = _y + 9
    this.debug = _debug

    this.spriteWidth = 1216
    this.spriteHight = 789
    this.width = this.spriteWidth / 20
    this.height = this.spriteWidth / 20
    this.frame = 0
  }
  
  draw() {
    
    if(this.debug) {
      ctx.strokeRect(
      this.x + this.width, 
      this.y - this.height, // y coordinate 
      this.width, // the size of the Figure
      this.height // the size of the Figure
      )
    }

    ctx.drawImage(
      FigureImage,
      this.frame * this.spriteWidth,
      0, 
      this.spriteWidth, // the size of the Sprite
      this.spriteHight, // the size of the Sprite
      this.x + this.width, 
      this.y - this.height, // y coordinate
      this.width, // the size of the Figure
      this.height // the size of the Figure
      )
  }

  update() {
    if(gameFrame % 2 === 0) this.frame == 20 ? this.frame = 0 : this.frame++
    this.x < - this.width * 2 ? this.x = CANVAS_WIDTH + this.width : this.x -= 1
    this.draw()
  }
}

const player = new Figure(CANVAS_WIDTH, CANVAS_HEIGHT)

const animate = () => {
  requestAnimationFrame(animate)
  
  ctx.clearRect(
    0, 
    0, 
    CANVAS_WIDTH, 
    CANVAS_HEIGHT
    )
    
  player.update()
  gameFrame++
}


{
  animate()
}


window.addEventListener('resize', () => {
  CANVAS_WIDTH = canvas.width = innerWidth
  CANVAS_HEIGHT = canvas.height = innerHeight
  player.y = CANVAS_HEIGHT + 9
})