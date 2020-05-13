import Chunk from './Chunk'
import GameObject from '../GameObject'
import TerrainWorker from './Terrain.worker'

export default class World extends GameObject {
  constructor(parent) {
    super(parent)
    this._size = this.Game.storage.get('$.world.size')
    this._chunkSize = this.Game.storage.get('$.world.chunk.size')
    this._chunkHeight = this.Game.storage.get('$.world.chunk.height')
    this._seed = this.Game.storage.get('$.world.seed')

    this._terrainWorker = new TerrainWorker()

    this.generate()
  }

  get Chunks() {
    return this.gameObjects.filter((gameObject) => {
      return typeof gameObject === Chunk
    })
  }

  generate() {
    for (let x = -(this._size/2); x < (this._size/2); x++) {
      for (let y = -(this._size/2); y < (this._size/2); y++) {
        const chunk = new Chunk(this, {
          offset: {
            x: x,
            y, y
          },
          size: this._chunkSize,
          height: this._chunkHeight,
          seed: this._seed,
          worker: this._terrainWorker
        })
        this.gameObjects.add(chunk)
      }
    }
  }

  onDispose() {}

  onUpdate(deltaTime) {}
}