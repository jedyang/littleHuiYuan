//cards.js
const app = getApp();
Page({
  data: {
    showTopTips: false
  },
  onLoad: function(res) {
    this.setData({
      cardId: res.cardId
    });
    console.log("detail memberID:" + res.memberId + ",shopId:" + res.shopId + ",cardId:" + res.cardId);
    var that = this
   
    // 查询卡片信息
    wx.request({
      url: 'http://localhost:8080/api/cards/cardInfo?cardId=' + that.data.cardId,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          baseInfo: res.data.result
        })
      }
    });
  },
  // 表单提交
  formSubmit: function(e) {
    console.log("表单提交：" + e.detail.value.useMoney);
    var that = this;
    var useMoney = e.detail.value.useMoney,
      usePoint = e.detail.value.usePoint;
    if (useMoney > that.data.baseInfo.money) {
      this.setData({
        TopTips: '超过可用余额'
      });
      this.showTopTips();
    } else if (usePoint > that.data.baseInfo.point) {
      this.setData({
        TopTips: '超过可用积分'
      });
      this.showTopTips();
    } else if (useMoney <0 || usePoint < 0 || (useMoney == 0 && usePoint == 0)){
      this.setData({
        TopTips: '支付金额异常'
      });
      this.showTopTips();
    } 
    else {

      wx.request({
        url: "http://localhost:8080/api/cards/pay",
        method: 'POST',
        data: {
          "usePoint": usePoint,
          "useMoney": useMoney,
          "cardId": that.data.cardId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          // 弹出成功
          if(res.data.success){
            wx.navigateTo({
              url: 'msg_success?id=' + res.data.result.logId + '&money=' + res.data.result.money + '&points=' + res.data.result.points + '&cardId=' + res.data.result.cardId
            })
          }else{
            wx.navigateTo({
              url: 'msg_fail?msg=' + res.data.msg
            })
          }

        }
      });
    }

  },
  //表单验证提示
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 2000);
  },
 
})