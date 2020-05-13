export default class SafeArray {
  constructor() {
    this.array = []
    this.addQueue = []
    this.removeQueue = []
  }

  get isEmpty() {
    return this.addQueue.length + this.array.length > 0
  }

  add(element) {
    this.addQueue.push(element)
  }

  remove(element) {
    this.removeQueue.push(element)
  }

  filter(fn) {
    const result = []
    this.forEach((element) => {
      if (fn(element))
        result.push(element)
    })
  }

  forEach(fn) {
    this._addQueued()
    this._removeQueued()
    for (const element of this.array) {
      if (this.removeQueue.includes(element)) continue
      fn(element)
    }
    this._removeQueued()
  }

  _addQueued() {
    if (this.addQueue.length) {
      this.array.splice(this.array.length, 0, ...this.addQueue)
      this.addQueue = []
    }
  }

  _removeQueued() {
    if (this.removeQueue.size) {
      this.array = this.array.filter((element) => {return !this.removeQueue.has(element)})
      this.removeQueue.clear()
    }
  }
}