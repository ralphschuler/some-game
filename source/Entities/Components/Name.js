import GameObject from "../../Engine/GameObject"

export default class Health extends GameObject{
  constructor(parent, name) {
    super(parent)
    this.name = name
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}