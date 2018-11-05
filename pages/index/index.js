//index.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: [],
    // userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {

  },
  getIndexData: function() {
    let that = this;
    util.request(api.IndexUrl).then(function(res) {
      if (res.status === 0) {
        that.setData({
          banner: res.data
        });
      }
    });
  },
  onLoad: function() {
    console.log("view Index onLoad");
    this.getIndexData();
    // 查询用户信息
    var shopUserId = wx.getStorageSync("shopUserId");
    var memberId = wx.getStorageSync("memberId");
    console.log(" wx.getStorageSync(shopUserId):" + shopUserId);
    console.log(" wx.getStorageSync(memberId):" + memberId);
    this.setData({
      shopUserId: shopUserId,
      memberId: memberId
    })
  },
  onReady: function() {
    // Do something when page ready.
    console.log("view Index onReady");
  },
  onShow: function() {
    // Do something when page show.
    console.log("view Index onShow");
  },
  onHide: function() {
    // Do something when page hide.
    console.log("view Index onHide");
  },
  onUnload: function() {
    // Do something when page close.
    console.log("view Index onUnload");
  },
})