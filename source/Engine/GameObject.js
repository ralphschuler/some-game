import GUID from '../Utilities/GUID'
import SafeArray from '../Utilities/SafeArray'

export default class GameObject {
  constructor(parent) {
    this._id = new GUID()
    this._visibility = true
    this._parent = parent
    this.gameObjects = new SafeArray()
    this._disposeables = new SafeArray()
  }

  get Game() {
    if (this.constructor.name === 'Game') {
      return this
    }
    else return this._parent.Game
  }

  get Parent() {
    return this._parent !== null ? this._parent : this
  }

  get isVisible() {
    if (this._parent && !this._parent.isVisible) return false
    return this._visibility
  }

  set visible(visibility) {
    this._visibility = visibility
  }

  update(deltaTime) {
    if (this.onUpdate) this.onUpdate(deltaTime)

    this.gameObjects.forEach((gameObject) => {
      if (gameObject.update)
        gameObject.update(deltaTime)
    })
  }

  render(deltaTime) {
    if (!this.isVisible) return
    if (this.onRender) this.onRender(deltaTime)

    this.gameObjects.forEach((gameObject) => {
      if (gameObject.render)
        gameObject.render(deltaTime)
    })
  }

  disposeable(object) {
    if (object.dispose)
      this._disposeables.add(object)
    return object
  }

  dispose() {
    if (this.onDispose) this.onDispose()

    this.gameObjects.forEach((gameObject) => {
      if (gameObject.dispose)
        gameObject.dispose()
      this.gameObjects.remove(gameObject)
    })

    this._disposeables.forEach((object) => {
      if (object.dispose)
        object.dispose()
      this._disposeables.remove(object)
    })
  }
}
