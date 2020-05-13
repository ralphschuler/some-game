import Noise from '../../Utilities/Noise'
import heightMapSetting from '../../Core/Noise/Height.json'
import heatMapSettings from '../../Core/Noise/Heat.json'
import moistureMapSettings from '../../Core/Noise/Moisture.json'
import treesMapSettings from '../../Core/Noise/Trees.json'
import Terrain from './Terrain'
import Voxel from './Voxel'

self.onmessage = (event) => {
  generateTerrain(event.data)
}

function generateTerrain(args) {
  const terrain = new Terrain(args.size, args.height, args.seed)

  const heightMap = Noise.generateNoiseMap(args.offset, args.size, args.seed, heightMapSetting)
  const heatMap = Noise.generateNoiseMap(args.offset, args.size, args.seed, heatMapSettings)
  const moistureMap = Noise.generateNoiseMap(args.offset, args.size, args.seed, moistureMapSettings)
  const treesMap = Noise.generateNoiseMap(args.offset, args.size, args.seed, treesMapSettings)

  for (let y = 0; y < args.height; ++y) {
    for (let z = 0; z < args.size; ++z) {
      for (let x = 0; x < args.size; ++x) {
        const height = (Math.sin(x / args.size * Math.PI * 2) + Math.sin(z / args.size * Math.PI * 3)) * (args.size / 6) + (args.size / 2)
        if (y < height) {
          terrain.setVoxel(x, y, z, 1)
        }
      }
    }
  }

  self.postMessage(terrain.generateGeometryDataForChunk(args.offset.x, 0, args.offset.y))
}