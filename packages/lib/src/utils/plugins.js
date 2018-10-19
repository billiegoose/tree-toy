import { E, GitError } from '../models/GitError'
import { PluginCore } from '../models/PluginCore.js'

let _cores = new Map()

export const cores = {
  // 'get' validates that a core has been registered
  get (key) {
    if (_cores.has(key)) {
      return _cores.get(key)
    } else if (key === 'default') {
      // Instantiate on first use
      _cores.set('default', new PluginCore())
      return _cores.get(key)
    } else {
      throw new GitError(E.CoreNotFound, { core: key })
    }
  },
  // 'create' works just like get but will create the core if it doesn't exist yet
  create (key) {
    if (_cores.has(key)) {
      return _cores.get(key)
    } else {
      _cores.set(key, new Map())
      return _cores.get(key)
    }
  }
}

// 99.99% of the time you can simply import { plugins } instead of cores.
export const plugins = () => cores.get('default')
