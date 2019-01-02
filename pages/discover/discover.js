const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://jenny.oss-cn-beijing.aliyuncs.com/U5c23aad79bb4cc09542e9abe/1.png',
      'http://jenny.oss-cn-beijing.aliyuncs.com/U5c23aad79bb4cc09542e9abe/2.png',
      'http://jenny.oss-cn-beijing.aliyuncs.com/U5c23aad79bb4cc09542e9abe/3.png'
    ]
  },
  onLoad() {
    app.editTabBar();
  }
})
