//app.js
var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function() {
    console.log("APP onLaunch");
    //获取用户的登录信息
    user.checkLogin().then(
      // 已登录，将之保存到本地
      res => {
        console.log('已登录')
        this.globalData.shopUserId = wx.getStorageSync('shopUserId');
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        this.globalData.token = wx.getStorageSync('token');
        this.globalData.memberId = wx.getStorageSync('memberId');
      },
      // 未登录，提示登录
      res => {
        console.log('未登录:' + res)
        user.loginByWeixin()

      }

    ).catch(() => {

    });

    // 登录
    // 先从存储拿
    /*
    if (wx.getStorageSync('MemberId') || wx.getStorageSync('ShopUserId')) {
      console.log("onLaunch get storeInfo");
      return;
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/api/appUser/onLogin',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              if (res.data.success) {
                console.log("login success:" + res.data.result);
                wx.setStorageSync('LoginSessionKey', res.data.result.loginSessionKey);
                wx.setStorageSync('isShopUser', res.data.result.isShopUser);
                wx.setStorageSync('isMember', res.data.result.isMember);
                if (res.data.result.isShopUser) {
                  wx.setStorageSync('ShopUserId', res.data.result.shopUserId);
                }
                if (res.data.result.isMember) {
                  wx.setStorageSync('MemberId', res.data.result.memberId);

                }
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    */
  },

  onShow: function() {
    // Do something when show.
    console.log("APP onShow");
  },
  onHide: function() {
    // Do something when hide.
    console.log("APP onHide");
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: {
      nickname: 'Hi,游客',
      username: '点击去登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
    shopUserId: '',
    memberId: '',
  }
})