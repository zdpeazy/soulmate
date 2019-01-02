import _actions from './common/actions.js';
// var ZegoSDK = require("../../../js/jZego-wx-1.0.2.js");

App({
  onLaunch: function () {
    this.actions = new _actions();
    // this.ZegoSDK = ZegoSDK;
  },
  login(cb){
    let _t = this;
    wx.login({
      success: res => {
        if (res.code) {
          this.actions.getOpenId(res.code)
            .then(json => {
              if(json.code * 1 == 0){
                wx.setStorage({
                  key: 'user',
                  data: json.data
                });
                _t.globalData.user = json.data;
                cb && cb();
              }
            })
        }
      }
    })
  },
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },

  globalData: {
    userInfo: null,
    user: null,
    tabBar: {
      color: "#666666",
      selectedColor: "#e17b76",
      borderStyle: "#eeeeee",
      list: [
        {
          iconPath: "/images/index.png",
          selectedIconPath: "/images/index-active.png",
          pagePath: "/pages/index/index",
          text: "首页",
          clas: "menu-item",
          selected: false,

        },
        {
          iconPath: "/images/discover.png",
          selectedIconPath: "/images/discover-active.png",
          pagePath: "/pages/discover/discover",
          text: "发现",
          clas: "menu-item",
          selected: false
        },

        {
          iconPath: "/images/chat.png",
          selectedIconPath: "/images/chat-active.png",
          pagePath: "/pages/chat/chat",
          text: "聊天",
          clas: "menu-item",
          selected: false
        },

        {
          iconPath: "/images/user.png",
          selectedIconPath: "/images/user-active.png",
          pagePath: "/pages/user/user",
          text: "我的",
          clas: "menu-item",
          selected: false
        }
      ],
      position: "bottom"
    }
  }
})
