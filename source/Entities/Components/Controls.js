import { Vector3 } from "three"
import GameObject from '../../Engine/GameObject'
import Position from "./Position"

export default class Controls extends GameObject{
  constructor(parent, position) {
    super(parent)
    this.position = position
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}