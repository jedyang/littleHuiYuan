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
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // 查询用户信息
    var shopUserId = wx.getStorageSync("shopUserId");
    var memberId = wx.getStorageSync("memberId");
    console.log(" wx.getStorageSync(shopUserId):" + shopUserId);
    console.log(" wx.getStorageSync(memberId):" + memberId);
    this.setData({
      shopUserId: shopUserId,
      memberId: memberId
    })
    /*
    if (wx.getStorageSync("isShopUser")) {
      // 是老板，去到我的店铺页面
      wx.request({
        url: 'http://localhost:8080/api/shop/myShops?userId=' + wx.getStorageSync("ShopUserId"),
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log("index:");
          console.log(res.data)
          // 如果只有一个店铺直接展示店铺详情
          // if(res.data.result.length == 1){
          //   wx.navigateTo({
          //     url: '../shopDetail/shopDetail?shopId=' + res.data.result[0].shopId,
          //   })
          // }else{
          //   wx.switchTab({
          //     url: '../shops/shops',
          //   })
          // }
         
        }
      })
    } else if (wx.getStorageSync("isMember")) {
      // 是顾客，渠道会员卡页面
      // wx.request({
      //   url: 'http://localhost:8080/api/shop/myShops?userId=' + wx.getStorageSync("ShopUserId"),
      //   method: 'GET',
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function(res) {
      //       wx.switchTab({
      //         url: '../cards/cards',
      //       })
      //   }
      // })
    }
*/
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
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  // doRegiste: function() {
  //   wx.redirectTo({
  //     url: '../registe/registe',
  //   })
  // },

  // doAddMember: function() {
  //   wx.redirectTo({
  //     url: '../registe/registe',
  //   })
  // }
})