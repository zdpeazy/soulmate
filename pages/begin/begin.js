var app = getApp()

Page({
  onLoad(){
    let _t = this;
    app.login(() => {
      let userInfo = wx.getStorageSync("userInfo");
      _t.getLocation(() => {
        if (userInfo) {
          app.globalData.userInfo = userInfo;
          wx.redirectTo({
            url: '../index/index',
          })
        }
      });
      
    })
  },
  setAuth(){
    let _t = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation'] || !res.authSetting['scope.userInfo']) {
          wx.showModal({
            showCancel: false,
            content: '请允许获取权限',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success() {
                    _t.getLocation(() => {
                      if (userInfo) {
                        app.globalData.userInfo = userInfo;
                        wx.redirectTo({
                          url: '../index/index',
                        })
                      }
                    });
                  }
                })
              }
            }
          })
        } else {
          _t.getLocation(() => {
            if (userInfo) {
              app.globalData.userInfo = userInfo;
              wx.redirectTo({
                url: '../index/index',
              })
            }
          });
        }
      }
    })
  },
  getLocation(cb){
    let _t = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        _t.uploadPostion(res.latitude, res.longitude, cb)
      },
      fail(){
        _t.setAuth();
      }
    })
  },
  uploadPostion(lat, lon, cb){
    let _t = this;
    app.actions.uploadPositionApi({
      userId: app.globalData.user.userId,
      lat,
      lon 
    }).then(json => {
      if(json.code * 1 == 0){
        cb && cb();
      }    
    })
  },
  getUserInfo(res){
    if(res.detail.userInfo){
      app.globalData.userInfo = res.detail.userInfo;
      wx.setStorage({
        key: 'userInfo',
        data: res.detail.userInfo,
        success(res) {
          wx.redirectTo({
            url: '../index/index',
          })
        }
      })
    }
  }
})