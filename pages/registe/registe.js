Page({
  data: {
    content: "",
    noteMaxLen: 200,
    noteNowLen: 0,
    showTopTips: false,
    TopTips: '',
  },

  //字数改变触发事件
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value, noteNowLen: len
    })
  },

  //表单验证提示
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 2000);
  },
  submitForm: function (e) {
    console.log("注册。。。");
    var that = this;
    var shopName = e.detail.value.shopName;
    var shopAddr = e.detail.value.shopAddr;
    var shopDesc = e.detail.value.shopDesc;
    console.log(shopName + "--" + shopAddr);
    if (shopName == "") {
      this.setData({
        TopTips: '请输入店铺名'
      });
      this.showTopTips();
    } else if (shopAddr == "") {
      this.setData({
        TopTips: '请输入店铺地址'
      });
      this.showTopTips();
    }

    wx.request({
      url: 'http://localhost:8080/api/shop/add',
      method: 'POST',
      data:{
        "shopName": shopName,
        "shopAddr": shopAddr,
        "shopDesc": shopDesc,
        "openId": wx.getStorageSync("LoginSessionKey")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.switchTab({
          url: '../shops/shops',
        })
      }
    })
  }
})