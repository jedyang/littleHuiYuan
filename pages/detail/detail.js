//cards.js
const app = getApp();
Page({
  data: {
  },
  onLoad: function (res) {
    this.setData({
      memberId: res.memberId,
    });
    console.log("detail memberID:" + res.memberId);
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/member/detail?memberId=' + that.data.memberId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ member: res.data.result })
      }
    })
  },
})
