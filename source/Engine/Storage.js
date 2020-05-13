import GameObject from './GameObject'
import JSONPath from 'jsonpath'
import SafeArray from '../Utilities/SafeArray'

export default class Storage extends GameObject {
  constructor(parent, args) {
    super(parent)

    this._data = {}
    this._defaultData = {}
    this._watchers = {}
  }

  track(namespace, callback) {
    if (!this._watchers[namespace]) this._watchers[namespace] = { listeners: new SafeArray(), value: null }
    this._watchers[namespace].listeners.add(callback)
    this._watchers[namespace].value = JSONPath.value(this._data, namespace)
  }

  untrack(namespace) {
    delete _watchers[namespace]
  }

  map(namespace, method) { // emitChanges
    return JSONPath.apply(this._data, namespace, method)
  }

  query(namespace) {
    return JSONPath.query(this._data, namespace)
  }

  add(namespace, value) {
    JSONPath.value(this._data, namespace, value)
    return JSONPath.value(this._defaultData,  namespace, value)
  }

  reset(namespace) {
    const defaultValue = JSONPath.value(this._defaultValues, namespace)
    return JSONPath.value(this._data, namespace, defaultValue)
  }

  set(namespace, value) {
    return JSONPath.value(this._data,  namespace, value)
  }

  get(namespace) {
    return JSONPath.value(this._data, namespace)
  }

  onUpdate(deltaTime) {
    for (const [namespace, watcher] of Object.entries(this._watchers)) {
      const dataValue = Object.assign({}, JSONPath.value(this._data, namespace))
      if (dataValue === watcher.value) continue
      watcher.listeners.forEach((listener) => {
        listener(dataValue)
      })
      watcher.value = dataValue
    }
  }
}