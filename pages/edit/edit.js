import config from '../../common/config.js';
const app = getApp()

Page({
  data: {
    wxName: '',
    userInfo: null,
    imgheights: [],
    imgUrls: [],
    current: 0,
    imgwidth: 750,
  },
  onLoad(options) {
    let _t = this;
    _t.setData({
      wxName: app.globalData.userInfo.nickName
    })
    _t.getUserInfo();
  },
  getUserInfo() {
    let _t = this;
    app.actions.getUserInfoApi(app.globalData.user.userId)
      .then(json => {
        if (json.code == 0) {
          let icon = json.data.icon, iconArr = [];
          if(icon){
            iconArr = icon.split(',')
          }
          console.log(iconArr)
          _t.setData({
            userInfo: json.data,
            imgUrls: iconArr
          })
        }
      })
  },
  uploadImg(){
    let _t = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.apiUrl + '/user/icon/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            userId: app.globalData.user.userId,
            // iconIndex: 0,
            file: tempFilePaths[0]
          },
          success: (res => {
            console.log(res)
            if (res.statusCode === 200) {
              let data = JSON.parse(res.data);
              if (data.code * 1 == 4902){
                wx.showModal({
                  showCancel: false,
                  content: data.message
                })
              } else {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1500,
                  success() {
                    _t.getUserInfo();
                  }
                })
              }
            } else {
              console.error(res)
            }
          }),
          fail: (res => {
            console.error(res)
          })
        })
      }
    })
  },
  formSubmit(e){
    let _t = this;
    app.actions.editUserInfoApi({
      userId: app.globalData.user.userId,
      nickName: e.detail.value.nickName,
      sex: app.globalData.userInfo.gender == 1 ? 'M' : 'F',
      birthday: e.detail.value.birthday,
      constellation: e.detail.value.constellation,
      height: e.detail.value.height,
      school: e.detail.value.school,
      city: e.detail.value.city,
      interest: e.detail.value.interest,
    }).then(json => {
        if (json.code == 0) {
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1500,
            success(){
              _t.getUserInfo();
            }
          })
        }
      })
  },
  imageLoad(e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      src = [],
      //宽高比
      ratio = imgwidth / imgheight;
    console.log(e.target.dataset['src'])
    src.push(e.target.dataset['src'])
    console.log(src)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    console.log(imgheights)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange(e) {
    this.setData({
      current: e.detail.current
    })
  }
})
