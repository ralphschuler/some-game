import GameObject from "../../Engine/GameObject"

export default class Health extends GameObject{
  constructor(parent, health) {
    super(parent)
    this.health = health
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}