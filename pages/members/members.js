//cards.js
const app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  onLoad: function (res) {
    this.setData({
      shopId: res.shopId,
    });
    console.log(res.shopId);
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/member/allMember?shopId=' + that.data.shopId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ members: res.data.result })
      }
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    // 随时动态查询会员
    var words = e.detail.value
    var that = this
    wx.request({
      url: 'http://localhost:8080/api/member/allMember?shopId=' + that.data.shopId + '&words=' + words,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
      
        that.setData({ members: res.data.result })
      }
    })
  }
})
