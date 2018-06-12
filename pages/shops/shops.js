//cards.js
const app = getApp();
Page({
  data: {
    memberId: wx.getStorageSync("MemberId")
  },
  onLoad: function (res) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/shop/myShops?userId=' + this.data.memberId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': {"sessionId" : this.data.sessionId}
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ members: res.data.data })
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
