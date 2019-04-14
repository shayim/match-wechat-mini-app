const promisify = require('./promisify')

const settings = (key, data) => {
  if (typeof key !== 'string') throw new Error('localStorage key should be string')

  if (!data) {
    return promisify(wx.getStorage)({ key: key })
      .then(settings => settings.data)
      .catch(_ => undefined)
  }

  return promisify(wx.setStorage)({ key: key, data: data }).catch(() => {})
}

module.exports = settings
