import GameObject from '../Engine/GameObject'
import Name from './Components/Name'
import Health from './Components/Health'
import Position from './Components/Position'
import Appearance from './Components/Appearance'
import Contols from './Components/Controls'
import { Vector3 } from 'three'

export default class Player extends GameObject {
  constructor(parent, args) {
    super(parent)

    this.gameObjects.add(new Name(this, 'Unkown Player'))
    this.gameObjects.add(new Health(this, 20))
    this.gameObjects.add(new Position(this, Vector3.Zero))
    this.gameObjects.add(new Appearance(this, null))
    this.gameObjects.add(new Contols(this))
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}