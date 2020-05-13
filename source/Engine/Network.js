import GameObject from './GameObject'
export default class Network extends GameObject{
  constructor(parent, args) {
    super(parent)
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}