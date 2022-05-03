// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    isLike:true,
    timer:null,
    blurNum: 0,
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  changeLike() {
    if (this.data.timer) {
      return false
    }
    let count = this.data.blurNum
    let timer = null
    if (!this.data.blurNum) {
      timer = setInterval(item=>{
        if (count<8) {
          count+=1
          this.setData({
            blurNum: count
          })
        } else {
          clearInterval(this.data.timer)
          this.setData({
            timer: null,
            isLike: false
          })
        }
      },100)
    } else {
      timer = setInterval(item=>{
        if (count>0) {
          count-=1
          this.setData({
            blurNum: count
          })
        } else {
          clearInterval(this.data.timer)
          this.setData({
            timer: null,
            isLike: true
          })
        }
      },100)
    }
    this.setData({
      timer: timer
    })
  },
  onHide() {
    if (this.data.timer) {
      this.setData({
        timer: null,
        isLike: true
      })
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    // console.log('log', wx.getUserProfile);
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log('getUserInfo',e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
