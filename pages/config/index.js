// pages/config/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxLength: -1,
    focus:true,
    option:''
  },
  getFocus(){
    this.setData({
      focus:true
    })
  },
  clear() {
    let that = this;
    if (that.data.option.length) {
      wx.showModal({
        title: '提示',
        content: '要把选项扔到外太空?',
        success (res) {
          if (res.confirm) {
            that.setData({
              option: ''
            })
          }
        }
      })
    }
  },
  saveData(event) {
    this.setData({
      option: event.detail.value
    })
  },
  save() {
    let optionList = []
    optionList = this.data.option.split(' ')
    optionList = optionList.filter(i=>i && i.trim())
    wx.setStorage({
          data: optionList,
          key: 'option',
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 500,
      success:(()=>{
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/mine/index'
          })
        },800)
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.getStorage({
      key: 'option',
    }).then(res=>{
      const item = res.data
      if (item&&item.length) {
        this.setData({
          option: item.join(' ')
        })
      }

    }).catch(res=>{
      console.log("404，没有找到缓存")
      this.setData({
        optionList: []
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})