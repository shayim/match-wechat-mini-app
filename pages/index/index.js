const promisify = require('../../utils/promisify')
const login = promisify(wx.login)
const request = promisify(wx.request)
const { hasSession } = require('../../utils/auth')
Page({
  code: undefined,
  data: {
    motto: 'Hello World',
    isAuthenticated: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad () {
    hasSession.then(hasSession => {
      if (hasSession) {
        this.setData({ isAuthenticated: true })
      }
    })
  },

  getCode () {
    hasSession.then(hasSession => {
      if (hasSession) return

      this.code = login().then(code => code)
    })
  },

  getUserInfo: function (e) {
    if (!e.detail.errMsg.includes('ok')) return

    const { encryptedData, iv } = e.detail

    this.code &&
      this.code.then(({ code }) => {
        const url = 'https://match-ins.com.cn/weapp/login'
        const header = {
          'X-WX-Code': code,
          'X-WX-Encrypted-Data': encryptedData,
          'X-WX-IV': iv
        }

        request({ url: url, header: header })
          .then(result => {
            console.log(result)
            if (result.data.code === 0) this.setData({ isAuthenticated: true })
          })
          .catch(err => console.log(err))
      })
  },

  getPhoneNumber: function (e) {
    if (!e.detail.errMsg.includes('ok')) return

    const { encryptedData, iv } = e.detail

    this.code &&
      this.code.then(({ code }) => {
        console.log({ code, encryptedData, iv })
      })
  }
})
