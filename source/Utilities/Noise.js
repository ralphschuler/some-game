import noise from 'noisejs-ilmiont'
import pseudoRandom from 'pseudo-random'

export default class Noise {
  static generateNoiseMap(offset, size, seed, args) {
    if (args.scale <= 0) args.scale = 0.0001
    if (args.octaves <= 0) args.octaves = 1
    if (args.lacunarity <= 0) args.lacunarity = 1
    if (size <= 0) size = 1

    const noiseMap = [[]]
    const octavesOffsets = []

    const prng = pseudoRandom(seed)
    noise.seed(seed)

    for (let o = 0; o < args.octaves; o++) {
      const offsetX = ((prng.random() * 100000) * 2) - 100000 + (offset.x * size.x)
      const offsetY = ((prng.random() * 100000) * 2) - 100000 + (offset.y * size.y)
      octavesOffsets.push(new Vector2(offsetX, offsetY))
    }

    for (let x = 0; x < size; x++) {
      if (!noiseMap[x]) noiseMap[x] = []
      for (let y = 0; y < size; y++) {
        let noiseHight = 0
        let amplitude = args.amplitude
        let frequency = args.frequency

        for (let o = 0; o < args.octaves; o++) {
          const sampleX = (x - size / 2 + octavesOffsets[o].x) / args.scale * frequency
          const sampleY = (y - size / 2 + octavesOffsets[o].y) / args.scale * frequency

          const perlinValue = noise.perlin2(sampleX, sampleY) / 2 + 0.5

          noiseHight += perlinValue * amplitude

          amplitude *= args.persistance / args.octaves
          frequency *= args.lacunarity
        }
        noiseMap[x][y] = noiseHight
      }
    }
    return noiseMap
  }
}