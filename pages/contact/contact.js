//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function (options) {
    app.editTabBar();
    setTimeout(() => {
      wx.redirectTo({
        url: '../talking/talking',
      })
    }, 1000)
  }
})
