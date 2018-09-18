//cards.js
const app = getApp();
Page({
  data: {
  },
  onLoad: function (res) {
    this.setData({
      cardId: res.cardId
    });
    console.log("detail memberID:" + res.memberId + ",shopId:" + res.shopId + ",cardId:" + res.cardId);
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/member/consumeLogs?cardId=' + that.data.cardId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ logs: res.data.result })
      }
    });
    // 查询卡片信息
    wx.request({
      url: 'http://localhost:8080/api/cards/cardInfo?cardId=' + that.data.cardId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ baseInfo: res.data.result })
      }
    });
  },
})
