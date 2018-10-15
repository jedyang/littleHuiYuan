//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    })
  },

  onShow: function() {
    // 查询附近店铺
    // 需要等经纬度有值
    if (typeof(this.data.longitude) == "undefined" || typeof(this.data.latitude) == "undefined") {
      var that = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
          that.getNearShops();
        }
      })
    } else {
      this.getNearShops();
    }

  },

  getNearShops: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/api/shop/getNearShops?longitude=' + this.data.longitude + "&latitude=" + this.data.latitude,
      method: 'GET',
      success: function(res) {
        that.setData({
          'shops': res.data.result
        });
      }
    })
  },

  getLocation: function() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        }
      });
    });
  }
})