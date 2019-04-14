const promisify = require('./promisify')

const hasAuthScope = authType =>
  promisify(wx.getSetting)().then(({ authSetting }) => !!authSetting[`scope.${authType}`])

const hasSession = hasAuthScope('userInfo').then(hasAuth => {
  if (!hasAuth) return false

  return promisify(wx.checkSession)()
    .then(_ => true)
    .catch(_ => false)
})

module.exports = { hasAuthScope, hasSession }
