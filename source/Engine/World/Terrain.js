import GameObject from '../GameObject'
import { MathUtils } from 'three'
import Voxel from './Voxel'

export default class Terrain {
  constructor(size, seed) {
    this._chunkSize = size
    this._seed = seed

    this._chunks = {}
  }

  getChunkForVoxel(x, y, z) {
    const chunkX = Math.floor(x / this._chunkSize)
    const chunkY = Math.floor(y / this._chunkSize)
    const chunkZ = Math.floor(z / this._chunkSize)

    if (chunkX !== 0 || chunkY !== 0 || chunkZ !== 0) {
      return null
    } else {
      return this._voxels
    }
  }

  computeVoxelId(x, y, z) {
    const voxelX = Math.floor(x)
    const voxelY = Math.floor(y)
    const voxelZ = Math.floor(z)

    return `${voxelX},${voxelY},${voxelZ}`
  }

  computeChunkId(x, y, z) {
    const chunkX = Math.floor(x / this._chunkSize)
    const chunkY = Math.floor(y / this._chunkSize)
    const chunkZ = Math.floor(z / this._chunkSize)

    return `${chunkX},${chunkY},${chunkZ}`
  }

  getVoxel(x, y, z) {
    let voxels = this.getChunkForVoxel(x, y, z)
    if (!voxels) voxels = this.addChunkForVoxel(x, y, z)
    const voxelOffset = this.computeVoxelOffset(x, y, z)

    return voxels[voxelOffset]
  }

  setVoxel(x, y, z, v) {
    let voxels = this.getChunkForVoxel(x, y, z)
    if (!voxels) voxels = []

    const voxelOffset = this.computeVoxelOffset(x, y, z)
    voxels[voxelOffset] = v
  }

  generateGeometryDataForChunk(chunkX, chunkY, chunkZ) {
    const positions = []
    const normals = []
    const indices = []

    const startX = chunkX * this._chunkSize
    const startY = chunkY * this._chunkSize
    const startZ = chunkZ * this._chunkSize

    for (let x = 0; x < this._chunkSize; x++) {
      const voxelX = startX + x
      for (let y = 0; y < this._chunkSize; y++) {
        const voxelY = startY + y
        for (let z = 0; z < this._chunkSize; z++) {
          const voxelZ = startZ + z
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ)
          if (!voxel) continue
          for (const {dir, corners} of Voxel.Faces) {
            const neighbor = this.getVoxel(
              voxelX + dir[0],
              voxelY + dir[1],
              voxelZ + dir[2]
            )
            if (!neighbor) {
              const ndx = positions.length / 3
              for (const pos of corners) {
                positions.push(
                  pos[0] + x,
                  pos[1] + y,
                  pos[2]+ z
                )
                normals.push(...dir)
              }
              indices.push(
                ndx, ndx + 1, ndx + 2,
                ndx + 2, ndx + 1, ndx + 3
              )
            }
          }
        }
      }
    }

    return {
      positions,
      normals,
      indices
    }
  }

  addChunkForVoxel(x, y, z) {
    const chunkId = this.computeChunkId(x, y, z)
    let chunk = this._chunks[chunkId]
    if (!chunk) {
      chunk = {}
      this._chunks[chunkId] = chunk
    }
    return chunk
  }

  computeVoxelOffset(x, y, z) {
    const voxelX = MathUtils.euclideanModulo(x, this._size) || 0
    const voxelY = MathUtils.euclideanModulo(y, this._height) || 0
    const voxelZ = MathUtils.euclideanModulo(z, this._size) || 0

    return (
      voxelY * this._size * this._height +
      voxelZ * this._size +
      voxelX
    )
  }

  toJSON() {
    return Object.assign({}, this)
  }

  fromJSON(data) {
    Object.assign(this, data)
  }

  static fromJSON(data) {
    const terrain = new Terrain(data._size, data._height, data._seed)
    terrain.fromJSON(data)
    return terrain
  }
}