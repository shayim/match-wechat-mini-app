function promisify (fn) {
  return function (params = {}) {
    if (typeof params !== 'object' || Array.isArray(params)) {
      throw new Error('params should be an object')
    }

    return new Promise((resolve, reject) => {
      params['success'] = function (...args) {
        resolve(...args)
      }

      params['fail'] = function (err) {
        reject(err)
      }

      fn(params)
    })
  }
}

module.exports = promisify
