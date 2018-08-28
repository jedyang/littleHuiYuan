//cards.js
const app = getApp();
Page({
  data: {
    userId: wx.getStorageSync('shopUserId')
  },
  onLoad: function (res) {
    console.log("shops view onLoad");
  },
  onShow: function(res){
    console.log("shops view onShow");
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/shop/myShops?userId=' + this.data.userId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': { "sessionId": this.data.sessionId }
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ shops: res.data.result })
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var words = e.detail.value
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/member/allMember?' + 'shopId=1234' + '&words=' + words,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ members: res.data.data })
      }
    })
  },
})
