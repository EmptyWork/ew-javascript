/**
 * @type {HTMLCanvasElement}
 *
 * Copyright (C) 2020 EmptyWork
 * Site <https://emptywork.netlify.app>
 *
 *
 *                       ,,.
 *                    ,lxNNk;
 *                   .,lkNMMNk;
 *         .',,.   ;d;   :O0kkOx;
 *         :XWWk',kNNc .'dKk;.:XNx'
 *         cNMMO:kMMWkx0XMMMNxdXMNc
 *         cNMMOcOMMMMMMMWWMMMOlkKc
 *         cNMMOcOMMMMWN0lkWMMx..,.
 *         cNMNOONMMM0c'. oWMMx.
 *         cXO::0MMMNc    oWMNl
 *         c0l.'0MWXo.    oXk;
 *         cNNklokd'      ',
 *         cNMMk'.
 *         cNXd'
 *         ,l'
 *
 *
 * @package {Ew-Javascript}
 * @brief Learning the best way to approach any problem with Modern JavaScript
 *
 * Repo link: <https://github.com/EmptyWork/ew-javascript/tree/gh-pages>
 * Live Demo: <https://emptywork.github.io/ew-javascript>
 *  */

/**
 * Extra.js
 * is a file that handle all the animation that occur in the <ew-javascript>
 *
 * right now its contains the script for animation logic and the behavior patters
 * for the Crawler in the homepage.
 */

/* Getting the canvas by its id <#canvas> and set into a scene */
const scene = canvas
/* Setting the context of the said scene to 2 dimentional (2d) */
const ctx = scene.getContext("2d")

// ======
// SCENE INITIALIZATION
// ======

/* Declaring the default width of the scene based on the innerWidth of the window */
SCENE_WIDTH = scene.width = innerWidth
/* Declaring the default height of the scene based on the innerHeight of the window */
SCENE_HEIGHT = scene.height = innerHeight
/* Declaring the global frame for the Scene */
SCENE_FRAME = 0

// ======
// GLOBAL ENVIORMENT VARIABLE
// ======

/* This object can be replace by .env if you are using node.js */
ENV = {
  /* Enable this option to show the outline of each figure */
  debug: false,
}

// ======
// ASSETS
// ======

/* Creating a new Image object */
const CrawlerImage = new Image()
/* Giving the CrawlerImage its source */
CrawlerImage.src = "./assets/image/spritesheet.png"

class Figure {
  constructor(_x, _y, _debug = null) {
    this.x = _x
    this.y = _y
    this.debug = _debug

    this.width = 200
    this.height = 200

    this.frame = 0
  }

  draw(_debug = null) {
    if (!_debug) _debug == this.debug

    if (_debug) {
      ctx.strokeRect(
        // NOTE: x coordinate
        this.x + this.width,
        // NOTE: y coordinate
        this.y - this.height, 
        // NOTE: the size of the Figure
        this.width, 
        // NOTE: the size of the Figure 
        this.height 
      )
    }
  }

  update() {
    if (SCENE_FRAME % 2 === 0)
      this.frame == 20 ? (this.frame = 0) : this.frame++
    this.draw()
  }
}

class Crawler extends Figure {
  constructor(_x, _y, _debug = null) {
    super(_x, _y, _debug)

    this.spriteWidth = 1216
    this.spriteHeight = 789

    this.figureRezise(_x, _y)
  }

  draw(_debug = null) {
    super.draw(this.debug)

    ctx.drawImage(
      CrawlerImage,
      // NOTE: the start width of the Sprite
      this.frame * this.spriteWidth, 
      // NOTE: the start height of the Sprite
      0, 
      // NOTE: the width of the Sprite
      this.spriteWidth, 
      // NOTE: the height of the Sprite
      this.spriteHeight, 
      // NOTE: x coordinate
      this.x + this.width,
      // NOTE: y coordinate
      this.y - this.height,
      // NOTE: the size of the Figure
      this.width, 
      // NOTE: the size of the Figure
      this.height 
    )
  }

  figureRezise(width, height) {
    this.minSize = width * 0.005

    if (this.minSize > 90) this.minSize = 20
    if (this.minSize < 5) this.minSize = 7
    this.width = (this.spriteWidth * this.minSize) / 100
    this.height = (this.spriteHeight * this.minSize) / 100

    this.y = height + (this.height * 12) / 100
  }

  update() {
    super.update()

    this.x < -this.width * 2
      ? (this.x = SCENE_WIDTH + this.width)
      : (this.x -= Math.floor(this.width * 0.02))
  }
}

const crawler = new Crawler(SCENE_WIDTH, SCENE_HEIGHT, ENV.debug)

const animate = () => {
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT)

  crawler.update()

  SCENE_FRAME++
}

window.addEventListener("resize", () => {
  SCENE_WIDTH = scene.width = innerWidth
  SCENE_HEIGHT = scene.height = innerHeight

  let oldWidth = SCENE_WIDTH

  crawler.x -= oldWidth - SCENE_WIDTH

  crawler.figureRezise(SCENE_WIDTH, SCENE_HEIGHT)

  if (ENV.debug) {
    console.group("Object")
    console.log(crawler)
    console.log(`Old Width: ${oldWidth}`)
    console.log(`New Width: ${SCENE_WIDTH}`)
    console.log(`OW-NW: ${oldWidth - SCENE_WIDTH}`)
    console.log(`Player x: ${crawler.x}`)
    console.log(`New Player x: ${crawler.x - (oldWidth - SCENE_WIDTH)}`)
    console.groupEnd()
  }
})

animate()
