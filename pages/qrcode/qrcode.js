//cards.js
const app = getApp();
Page({
  data: {
    userId: wx.getStorageSync("ShopUserId")
  },
  onLoad: function (res) {
  
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/shop/getAccessToken',
      method: 'GET',
      success: function (accessCode) {
        console.log('go to getQrCode：', accessCode)
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + accessCode,
          method: 'POST',
          data: {
            'scene': 'shopId'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            that.setData({ qrcode: res })
          }
        })
      }
    })
  },
 
})
