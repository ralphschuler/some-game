import World from './World/World'
import GameObject from './GameObject'
import Renderer from './Renderer'
import Storage from './Storage'
import Stats from 'stats.js'

export default class Game extends GameObject{
  constructor(parent, args) {
    super(parent)

    this._then = 0
    this._stats = new Stats(1)
    document.body.appendChild(this._stats.dom)

    this.storage = new Storage(this)
    this.gameObjects.add(this.storage)
    this.setupStorage()

    this.renderer = new Renderer(this)
    this.gameObjects.add(this.renderer)

    this.world = new World(this)
    this.gameObjects.add(this.world)
  }

  setupStorage() {
    this.Game.storage.add('$.world.seed', Math.random() * 100000)
    this.Game.storage.add('$.world.size', 1)
    this.Game.storage.add('$.world.chunk.size', 128)
    this.Game.storage.add('$.world.chunk.height', 512)
  }

  start() {
    this._animationRequest = requestAnimationFrame((now) => {this._loop(now)})
  }

  stop() {
    cancelAnimationFrame(this._animationRequest)
    this.dispose()
  }

  _loop(now) {
    this._stats.begin()
    const deltaTime = ((now * 0.001) - this._then || 0)
    this._then = (now * 0.001)

    this.update(deltaTime)
    this.render(deltaTime)

    this._stats.end()
    this._animationRequest = requestAnimationFrame((now) => {this._loop(now)})
  }
}
