// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    result:'随便一下',
    optionList: [],
    defaultImg: 'https://636c-cloud1-8ggcglhp1a0a58e2-1311032621.tcb.qcloud.la/logo.png?sign=edd75c0b2a64b6aba59769ada387564f&t=1651163474',
    hasUserInfo:false,
    loading: false,
    timer: null
  },
  startRandom() {
    let that = this;
    if (this.data.optionList.length && !this.data.loading) {
      this.setData({
        loading: true,
      })
      const randomNum = Math.round(Math.random()*(this.data.optionList.length-1))
      let timer = null
      timer = setTimeout(()=>{
        that.setData({
          result: that.data.optionList[randomNum],
          loading: false,
          timer: null
        })
      },1500)
      that.setData({
        timer: timer,
      })
    }
  },
  goConfig() {
    wx.navigateTo({
      url: '/pages/config/index'
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorage({
          data: res.userInfo.avatarUrl,
          key: 'avatarUrl',
        })
        this.setData({
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      result: '随便一下',
      loading:false
    })
    wx.getStorage({
      key: 'option',
    }).then(res=>{
      const item = res.data
        this.setData({
          optionList: item||[]
        })
    }).catch(res=>{
      console.log("404，没有找到缓存")
      this.setData({
        optionList: []
      })
    })
    wx.getStorage({
      key: 'avatarUrl',
    }).then(res=>{
      const item = res.data
      if (item&&item.length) {
        this.setData({
          avatarUrl: item
        })
      }
    }).catch(res=>{
      console.log("404，没有找到缓存")
      this.setData({
        avatarUrl: ''
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
      this.setData({
        timer: null,
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})