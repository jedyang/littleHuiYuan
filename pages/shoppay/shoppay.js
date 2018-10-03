// pages/shoppay/shoppay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 表单提交
  formSubmit: function (e) {
    console.log("表单提交：" + e.detail.value.useMoney);
    var that = this;
    var useMoney = e.detail.value.useMoney,
      usePoint = e.detail.value.usePoint;
   if (useMoney < 0 || usePoint < 0 || (useMoney == 0 && usePoint == 0)) {
      this.setData({
        TopTips: '支付金额设置异常'
      });
      this.showTopTips(2000);
    }
    else {
      // 获取accessToken
      wx.request({
        url: "http://localhost:8080/api/shop/getAccessToken",
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.success) {
            wx.request({
              url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.result,
              method: 'POST',
              header: {
                encoding: null 
              },
              data: {
                'scene': '12345',
                'page': ''// TODO,上线后再加
              },
              success: function(res){
                console.log(res)
                // 显示图片
                that.setData({
                  imgUrl: wx.arrayBufferToBase64(res.data)
                })
              }
            })
          } else {
            that.setData({
              TopTips: '生成支付二维码异常，请稍后重试。或由消费者发起支付'
            });
            that.showTopTips(4000);
          }

        }
      });
    }

  },
  //表单验证提示
  showTopTips: function (time) {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, time);
  },
})