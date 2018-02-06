// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  starttap: function() {
    wx.navigateTo({url: "../foodselector/foodselector"})
  },

  fetchFoodList: function() {
    wx.request({
      url: "https://foodlist-1256048523.cos.ap-guangzhou.myqcloud.com/foodlist.txt",
      header: {
        "content-type": "application/json"
      },
      dataType: "json",
      success: this.receiveFootList
    })
  },

  receiveFootList: function(resp) {
    console.log("got foodlist: " + JSON.stringify(resp.data))
    getApp().globalData.foodlist = resp.data["foodlist"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchFoodList()
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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