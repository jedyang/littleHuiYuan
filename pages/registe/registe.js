const qiniuUploader = require("../../utils/qiniuUploader");
var o = require("../../utils/util.js")

function upload(e, preType, preUrl, i) {
  var n = preUrl[i];
  var uploadImgCount = 0;
  // 先获取七牛云上传的token
  wx.request({
    url: 'http://localhost:8080/api/shop/getQiniuToken',
    success: function(res) {
      console.log("getQiniuToken:" + res.data)
      var qiniuToken = res.data
      for (var i = 0, h = preUrl.length; i < h; i++) {
        let filePath = preUrl[i]
        // let postf = filePath.substring(filePath.lastIndexOf("."), filePath.length)
        // let fileName = 'shopInfoPic5:' + i + postf;
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          var u = e.data.pics;
          u.push("http://" + res.imageURL);
          e.setData({
            pics: u
          })
        }, (error) => {
          console.log('error:' + error);
          o.hideLoading(), o.showFailedToast("上传图片失败，请重试");
        }, {
          region: 'SCN',
          uploadURL: 'https://up-z2.qbox.me',
          domain: 'pdumzxy0c.bkt.clouddn.com',
          shouldUseQiniuFileName: true,
          uptoken: qiniuToken,
        });
      }
      o.hideLoading();
    }
  })
}

Page({
  data: {
    content: "",
    noteMaxLen: 200,
    noteNowLen: 0,
    showTopTips: false,
    TopTips: '',
    pics: [],
    shopInfo: {
      shopAddr: ''
    },
    btnText: '注册'
  },
  onLoad: function(res) {
    console.log("registe view onload");
    console.log(res);
    var shopId = res.shopId;
    // 如果shopid有值是修改
    if (shopId) {
      var that = this
      wx.request({
        url: 'http://localhost:8080/api/shop/queryShop?shopId=' + shopId,
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            shopInfo: res.data.result,
            pics: res.data.result.pics == null ? [] : res.data.result.pics,
            btnText: '修改'
          })

        }
      })
    }
  },
  //字数改变触发事件
  bindTextAreaChange: function(e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value,
      noteNowLen: len
    })
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
  submitForm: function(e) {
    var postUrl = 'http://localhost:8080/api/shop/add';
    var shopId = '';
    if(this.data.btnText == '修改'){
      console.log("修改。。。");
      postUrl = 'http://localhost:8080/api/shop/modify';
      shopId = this.data.shopInfo.shopId;
    }else{
      console.log("注册。。。");
    }
    
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
      url: postUrl,
      method: 'POST',
      data: {
        "shopName": shopName,
        "shopAddr": shopAddr,
        "shopDesc": shopDesc,
        "pics": that.data.pics,
        "mainPic": that.data.shopInfo.mainPic,
        "shopLatitude": that.data.shopLatitude,
        "shopLongitude": that.data.shopLongitude,
        "openId": wx.getStorageSync("openId"),
        "shopId": shopId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../shops/shops',
        })
      }
    })
  },
  chooseMainPic: function(e) {
    var that = this;

    wx.chooseImage({
      count: 1, //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        var uploadImgCount = 0;
        // 先获取七牛云上传的token
        wx.request({
          url: 'http://localhost:8080/api/shop/getQiniuToken',
          success: function(res) {
            console.log("getQiniuToken:" + res.data)
            var qiniuToken = res.data
            for (var i = 0, h = tempFilePaths.length; i < h; i++) {
              let filePath = tempFilePaths[i]
              // 交给七牛上传
              qiniuUploader.upload(filePath, (res) => {
                console.log("mainPic upload===")
                var str = 'shopInfo.mainPic'
                that.setData({
                  [str]: "http://" + res.imageURL,
                });
              }, (error) => {
                console.log('error:' + error);
              }, {
                region: 'SCN',
                uploadURL: 'https://up-z2.qbox.me',
                domain: 'pdumzxy0c.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
                // key: fileName, // 自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
                shouldUseQiniuFileName: true,
                // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
                uptoken: qiniuToken, // 由其他程序生成七牛 uptoken
                // uptokenURL: 'UpTokenURL.com/uptoken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {uptoken: 0MLvWPnyy...}
                // uptokenFunc: function () { return zxxxzaqdf; }
              });
            }
          }
        })

      }
    });
  },
  // 删除主图
  deleteMainPic: function(e) {
    var str = "shopInfo.mainPic"
    this.setData({
      [str]: '' 
    });
  },

  // 删除图片
  deleteImg: function (e) {
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    this.setData({
      pics: pics
    });
  },

  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;

    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  chooseImage: function(e) {
    var t = this,
      prePicUrl = e.currentTarget.dataset.url,
      prePicType = e.currentTarget.dataset.type,
      hasPics = this.data.pics;
    // 预览
    if (prePicUrl) {
      wx.previewImage({
        urls: "pic" == prePicType ? hasPics : [prePicUrl],
        current: prePicUrl
      });
    } else {
      // 上传
      if ("pic" == prePicType && hasPics != null && hasPics.length > 4) {
        return void o.showModelTips("图片最多只能上传5张");
      }
      var l = 5 - (hasPics == null ? 0 : hasPics.length); //还可以传的张数
      wx.chooseImage({
        count: l,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: function(e) {
          var a = e.tempFilePaths;
          t.setData({
            tempPaths: a,
            tempIndex: 0
          }), o.showLoading("上传中..."), upload(t, prePicType, a, 0);
        },
        fail: function() {
          o.hideLoading();
        }
      });
    }
  },

  chooseLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 18,
          success: function(res){
            wx.chooseLocation({
              success: function(res) {
                console.log(res)
                var shop_addr = 'shopInfo.shopAddr';
                that.setData(
                  {
                    shopLatitude: res.latitude,
                    shopLongitude: res.longitude,
                    [shop_addr]: res.address,
                  }
                );
              },
            })
          }
        })
       
      }
    })
  }
})