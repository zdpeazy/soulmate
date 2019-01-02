const app = getApp();

Page({
  data: {
    imgheight: '',
    imgwidth: 750,
    imgUrls: [
      'http://jenny.oss-cn-beijing.aliyuncs.com/U5c223f9b9bb4cc195800eac4/1.png',
      'http://jenny.oss-cn-beijing.aliyuncs.com/U5c223f9b9bb4cc195800eac4/1.png',
      'http://jenny.oss-cn-beijing.aliyuncs.com/U5c223f9b9bb4cc195800eac4/1.png'
    ],
  },
  onLoad() {
    app.editTabBar();
  },
  imageLoad(e) {
    let imgwidth = e.detail.width;
    this.setData({
      imgwidth: imgwidth,
      imgheight: imgwidth
    })
  },
  bindchange(e) {
    this.setData({
      current: e.detail.current
    })
  }
  
})