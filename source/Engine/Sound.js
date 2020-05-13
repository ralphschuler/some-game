import GameObject from './GameObject'
export default class Sound extends GameObject{
  constructor(parent, args) {
    super(parent)
  }

  onSetup() {}
  onCreate() {}
  onUpdate(deltaTime) {}
  onRender(deltaTime) {}
  onDispose() {}
}