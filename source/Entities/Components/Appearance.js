import GameObject from "../../Engine/GameObject"

export default class Appearance extends GameObject {
  constructor(parent, args) {
    super(parent)
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}