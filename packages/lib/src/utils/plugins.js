import { E, GitError } from '../models/GitError'

class PluginCore extends Map {
  set (key, value) {
    const verifySchema = (key, value) => {
      const pluginSchemas = {
        fs: [
          'lstat',
          'mkdir',
          'readdir',
          'readFile',
          'rmdir',
          'stat',
          'unlink',
          'writeFile'
        ],
        credentialManager: ['fill', 'approved', 'rejected'],
        emitter: ['emit']
      }
      if (!pluginSchemas.hasOwnProperty(key)) {
        throw new GitError(E.PluginUnrecognized, { plugin: key })
      }
      for (let method of pluginSchemas[key]) {
        if (value[method] === undefined) {
          throw new GitError(E.PluginSchemaViolation, { plugin: key, method })
        }
      }
    }
    verifySchema(key, value)
    if (key === 'fs') {
      // There can be only one.
      super.set(key, value)
    }
    if (key === 'credentialManager') {
      // There can be only one.
      super.set(key, value)
    }
    if (key === 'emitter') {
      // There can be only one.
      super.set(key, value)
    }
  }
  get (key) {
    // Critical plugins throw an error instead of returning undefined.
    const critical = new Set(['fs', 'credentialManager'])
    if (!super.has(key) && this.critical.has(key)) {
      throw new GitError(E.PluginUndefined, { plugin: key })
    }
    return super.get(key)
  }
}

// 99.99% of the time you can simply import { plugins } instead of cores.
export const plugins = new PluginCore()

let _cores = new Map(['default', plugins])

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
