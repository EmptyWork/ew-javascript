/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = innerWidth
CANVAS_HEIGHT = canvas.height = innerHeight
GAME_FRAME = 0

DEBUG = false

const FigureImage = new Image()
FigureImage.src = './assets/image/spritesheet.png'

class Figure {
  constructor(_x, _y, _debug = null) {
  
    this.x = _x
    this.y = _y + 9
    this.debug = _debug

    this.width = 200
    this.height = 200

    this.frame = 0
  
  }
  
  draw(_debug = null) {
    
    if(!_debug) _debug == this.debug
    
    if(_debug) {
      ctx.strokeRect(
      this.x + this.width, 
      this.y - this.height, //? y coordinate 
      this.width, //? the size of the Figure
      this.height //? the size of the Figure
      )
    }
  
  }

  update() {
  
    if(GAME_FRAME % 2 === 0) this.frame == 20 ? this.frame = 0 : this.frame++
    this.draw()
  
  }

}

class Crawler extends Figure {
  constructor(_x, _y, _debug = null) {

    super(_x, _y, _debug)

    this.spriteWidth = 1216
    this.spriteHight = 789
    this.width = this.spriteWidth / 20
    this.height = this.spriteWidth / 20
  
  }
    
  draw(_debug = null) {

    super.draw(this.debug)
    
    ctx.drawImage(
      FigureImage,
      this.frame * this.spriteWidth, //? the start width of the Sprite
      0, //? the start height of the Sprite
      this.spriteWidth, //? the width of the Sprite
      this.spriteHight, //? the height of the Sprite
      this.x + this.width, 
      this.y - this.height, //? y coordinate
      this.width, //? the size of the Figure
      this.height //? the size of the Figure
      )
  
  }

  update() {
    
    super.update()
    
    this.x < - this.width * 2 ? this.x = CANVAS_WIDTH + this.width : this.x -= 1
  
  }
}

const crawler = new Crawler(CANVAS_WIDTH, CANVAS_HEIGHT, DEBUG)

const animate = () => {
  
  requestAnimationFrame(animate)
  
  ctx.clearRect(
    0, 
    0, 
    CANVAS_WIDTH, 
    CANVAS_HEIGHT
    )
    
  crawler.update()
  
  GAME_FRAME++

}

window.addEventListener('resize', () => {

  let oldWidth = CANVAS_WIDTH
  
  CANVAS_WIDTH = canvas.width = innerWidth
  CANVAS_HEIGHT = canvas.height = innerHeight
  
  crawler.y = CANVAS_HEIGHT + 9
  crawler.x -= (oldWidth - CANVAS_WIDTH)

  if(DEBUG) {
    console.log(
      `Old Width: ${oldWidth}`,
      `\nNew Width: ${CANVAS_WIDTH}`,
      `\nOW-NW: ${oldWidth - CANVAS_WIDTH}`,
      `\nPlayer x: ${crawler.x}`,
      `\nNew Player x: ${crawler.x - (oldWidth - CANVAS_WIDTH)}`
    );
  }

})

animate()