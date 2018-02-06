// pages/foodselector/foodselector.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localfoodlist: [
      "万利达",
      "老板娘",
      "蒸菜",
      "煲大人",
      "馄饨",
      "湘悦名苑",
      "巴陵会馆",
      "骇客",
      "冒菜",
      "金拱门",
      "永和大王",
      "兰州拉面",
      "烤鱼"
    ],
    foodlist: "",
    selectedIndex: 0,
    foodname: "",
    foodcloud: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    nextfoodid: 0,
    timer: "",
    stoped: false,

    INTERVAL: 50,
    MAXOPACITY: 0.3
  },

  beginSelect: function() {
    var thiz = this

    this.updateData()

    var timer = setInterval(function () {
      thiz.nextfood()
      thiz.stepCloud()

      if (thiz.data.stoped)
        thiz.tryCancelInterval()
    }, thiz.data.INTERVAL)

    thiz.setData({
      timer: timer,
      stoped: false
    })
  },

  stopSelect: function() {
    var foodcloud = this.data.foodcloud

    for (var i = 0; i < foodcloud.length; ++i) {
      foodcloud[i]["delaysecs"] = 0
    }

    this.setData({
      foodcloud: foodcloud,
      stoped: true
    })
  },

  tryCancelInterval: function() {
    var foodcloud = this.data.foodcloud

    for (var i = 0; i < foodcloud.length; ++i) {
      if (foodcloud[i]["opacity"] > 0 || foodcloud[i]["zoomin"]) {
        return
      }
    }

    clearInterval(this.data.timer)
  },

  nextfood: function() {
    if (this.data.stoped)
      return

    var index = this.data.selectedIndex
    index++
    if (index >= this.data.foodlist.length)
      index = 0

    this.setData({
      selectedIndex: index,
      foodname: this.data.foodlist[index],
    })
  },

  stepCloud: function() {
    var foodcloud = this.data.foodcloud

    for (var i=0; i<foodcloud.length; ++i) {
      foodcloud[i] = this.stepCloudFood(foodcloud[i])
    }

    this.setData({
      foodcloud: foodcloud
    })
  },

  stepCloudFood: function(food) {
    if (food == 0) {
      food = this.makeFood()
    }

    var delaysecs = food["delaysecs"];
    if (delaysecs > 0) {
      delaysecs -= this.data.INTERVAL / 1000.0
      food["delaysecs"] = delaysecs;
      return food;
    }

    var OPACITY = this.data.MAXOPACITY
    var opacityStep = OPACITY / (food["zoomsecs"] / 2.0 * 1000.0 / this.data.INTERVAL)

    if (food["zoomin"]) {
      food["opacity"] += opacityStep
      if (food["opacity"] >= OPACITY) {
        food["opacity"] = OPACITY
        food["zoomin"] = false
      }
    } else {
      food["opacity"] -= opacityStep
      if (food["opacity"] <= 0) {
        food["opacity"] = 0
        food["zoomin"] = true
        this.resetFood(food)
      }
    }

    if (this.data.stoped) {
      food["opacity"] = 0
      food["zoomin"] = false
    }

    return food
  },

  makeFood: function() {
    var food = {}
    this.resetFood(food)

    var id = this.data.nextfoodid
    food["id"] = id

    food["delaysecs"] = id % 4

    this.setData({
      nextfoodid: id + 1
    })

    return food
  },

  resetFood: function(food) {
    var fontList = [12, 14, 16, 18, 20]
    var colorList = ["#880", "#aa0", "#cc0", "#808", "#a0a", "#c0c", "#088", "#0aa", "0cc"]
    var systemInfo = wx.getSystemInfoSync()
    var foodIndex = Math.ceil(Math.random() * this.data.foodlist.length)
    food["name"] = this.data.foodlist[foodIndex]
    food["left"] = this.randomLeft()
    food["top"] = this.randomTop()
    food["opacity"] = 0
    food["zoomin"] = true
    food["zoomsecs"] = this.randomInRange(1, 2)
    food["delaysecs"] = 0.0
    food["fontsize"] = fontList[Math.ceil(Math.random() * fontList.length)]
    food["color"] = colorList[Math.ceil(Math.random() * colorList.length)]
  },

  randomLeft: function() {
    var systemInfo = wx.getSystemInfoSync()
    var screenWidth = systemInfo.screenWidth * systemInfo.pixelRatio
    var centerX = screenWidth / 2
    return this.randomInRange(10, screenWidth - 100)
  },

  randomTop: function () {
    return this.randomInRange(10, 500)
  },

  randomInRange: function(min, max) {
    return min + Math.random() * (max - min)
  },

  randomInRange: function (min, max) {
    return min + Math.random() * (max - min)
  },

  updateData: function () {
    var foodlist = getApp().globalData.foodlist

    if (foodlist == undefined) {
      console.log("use local foodlist")
      foodlist = this.data.localfoodlist
    } else {
      console.log("use online foodlist")
    }

    this.setData({
      foodlist: foodlist
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.beginSelect()
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
    this.stopSelect()
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
