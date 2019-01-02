//获取应用实例
const app = getApp()

Page({
  onLoad: function (options) {
    app.editTabBar();

  },
  contact(){
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  lookDetail(){
    wx.navigateTo({
      url: '../personalCenter/personalCenter',
    })
  }
})
