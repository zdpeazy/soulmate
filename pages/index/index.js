//获取应用实例
const app = getApp()

Page({
  data: {
    angle: -88,
    timer: null,
    chatMatchCount: 0,
    nickName: '',
    icon: ''
  },

  onLoad(options) {
    let _t = this;
    app.editTabBar();
    _t.getUserInfo();
    _t.drawRadar.init(_t.data.angle);
  },
  getUserInfo(){
    let _t = this;
    app.actions.getUserInfoApi(app.globalData.user.userId)
      .then(json => {
        if(json.code == 0){
          _t.setData({
            chatMatchCount: json.data.chatMatchCount,
            nickName: json.data.nickName,
            icon: json.data.icon
          })
        }
      })
  },
  searchFriend() {
    let _t = this;
    if (!_t.data.nickName || !_t.data.icon){
      wx.showModal({
        showCancel: false,
        content: '请完善个人资料',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../edit/edit',
            })
          }
        }
      })
    } else {
      _t.stopAnima();
      _t.createAnima();
      _t.matchChat()
    }

  },
  onUnload(){
    this.stopAnima();
  },
  matchChat(){
    let _t = this;
    setTimeout(() => {
      app.actions.chartStart(app.globalData.user.userId, '').then((json) => {
        console.log(json)
        if (json.code * 1 != 0) {
          _t.stopAnima();
          wx.showModal({
            showCancel: false,
            content: json.message
          })
        }
      })
    }, 5000)
  },
  drawRadar: {
    radius: 80,
    perDeg: 1,
    init(angle) {
      let _dr = this;
      const ctx = wx.createCanvasContext('canvasArcCir');
      _dr.cover(ctx);
      _dr.drawPosLine(ctx);
      _dr.drawRadar(ctx, angle);
     
    },
    cover(ctx) {
      let _dr = this;
      ctx.fillStyle = 'rgba(0,50,0,1)';
      ctx.translate(_dr.radius, _dr.radius);
      ctx.arc(0, 0, _dr.radius, 0, 2 * Math.PI);
      ctx.fill();
    },
    drawPosLine (ctx) {
      let _dr = this;
      ctx.strokeStyle = 'rgba(0,255,0,1)';
      ctx.beginPath();
      ctx.moveTo(0, -_dr.radius);
      ctx.lineTo(0, _dr.radius);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-_dr.radius, 0);
      ctx.lineTo(_dr.radius, 0);
      ctx.closePath();
      ctx.stroke();

      ctx.moveTo(_dr.radius, _dr.radius);
      ctx.beginPath();
      ctx.arc(0, 0, 25, 0 * Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();

      ctx.moveTo(_dr.radius, _dr.radius);
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0 * Math.PI, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();

    },
    drawRadar(ctx, angle) {
      let _dr = this;
      ctx.fillStyle = 'rgba(0,200,0,.7)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, _dr.radius, (-3 * _dr.perDeg + angle) / 180 * Math.PI, (0 + angle) / 180 * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.draw();
    }
  },
  createAnima(){
    let _t = this;
    _t.data.angle ++;
    _t.drawRadar.init(_t.data.angle)
    _t.data.timer = setTimeout(() => {
      _t.createAnima();
    }, 10)
  },
  stopAnima(){
    let _t = this;
    _t.data.timer && clearTimeout(_t.data.timer);
  }
})