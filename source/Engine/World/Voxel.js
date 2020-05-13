import GameObject from '../GameObject'

export default class Voxel {
  static Faces(){ return [
    { // left
      dir: [ -1,  0,  0 ],
      corners: [
        [ 0, 1, 0 ],
        [ 0, 0, 0 ],
        [ 0, 1, 1 ],
        [ 0, 0, 1 ]
      ]
    },
    { // right
      dir: [  1,  0,  0 ],
      corners: [
        [ 1, 1, 1 ],
        [ 1, 0, 1 ],
        [ 1, 1, 0 ],
        [ 1, 0, 0 ]
      ]
    },
    { // bottom
      dir: [  0, -1,  0 ],
      corners: [
        [ 1, 0, 1 ],
        [ 0, 0, 1 ],
        [ 1, 0, 0 ],
        [ 0, 0, 0 ]
      ]
    },
    { // top
      dir: [  0,  1,  0 ],
      corners: [
        [ 0, 1, 1 ],
        [ 1, 1, 1 ],
        [ 0, 1, 0 ],
        [ 1, 1, 0 ]
      ]
    },
    { // back
      dir: [  0,  0, -1 ],
      corners: [
        [ 1, 0, 0 ],
        [ 0, 0, 0 ],
        [ 1, 1, 0 ],
        [ 0, 1, 0 ]
      ]
    },
    { // front
      dir: [  0,  0,  1 ],
      corners: [
        [ 0, 0, 1 ],
        [ 1, 0, 1 ],
        [ 0, 1, 1 ],
        [ 1, 1, 1 ]
      ]
    }
  ]}

  constructor() {}
}