Page({
  data: {

  },
  onLoad: function(res) {
    this.setData({
      id: res.id,
      cardId: res.cardId,
      money: res.money,
      points: res.points
    });
  },
  goTarget: function(){
    wx.navigateTo({
      url: '../detail/detail?cardId=' + this.data.cardId,
    })
  }
});