//cards.js
const app = getApp();
Page({
  data: {
    userId: wx.getStorageSync("ShopUserId")
  },
  onLoad: function (res) {
  
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/shop/getQrCode?shopId=15',
      method: 'GET',
      success: function (picUrl) {
        console.log('get picUrl', picUrl)
        that.setData({ qrCodeUrl: picUrl.data })
      }
    })
  },
 
})
