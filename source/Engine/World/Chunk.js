import GameObject from '../GameObject'
import Terrain from './Terrain'
import { BufferGeometry, MeshLambertMaterial, BufferAttribute, Mesh } from 'three'

export default class Chunk extends GameObject {
  constructor(parent, args) {
    super(parent)

    this._offset = args.offset
    this._size = args.size
    this._height = args.height
    this._seed = args.seed

    this._worker = args.worker
    this._worker.addEventListener('message', this.onTerrainData.bind(this), false)

    this.generateTerrain()
  }

  generateTerrain() {
    this._worker.postMessage({
      offset: this._offset,
      size: this._size,
      seed: this._seed,
      height: this._height
    })
  }

  onTerrainData(event) {
    const {positions, normals, indices} = event.data
    const geometry = new BufferGeometry()
    const material = new MeshLambertMaterial({
      color: 'green'
    })

    const positionNumComponents = 3
    const normalNumComponents = 3
    geometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(positions), positionNumComponents)
    )
    geometry.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(normals), normalNumComponents)
    )
    geometry.setIndex(indices)

    const mesh = new Mesh(geometry, material)
    this.Game.renderer.scene.add(mesh)
  }
}