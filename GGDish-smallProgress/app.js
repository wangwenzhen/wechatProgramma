//app.js
var shoppingCarManager = require('utils/shoppingCarManager.js');
var Tip = require('pages/component/qnToast/toast.js');

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //获取购物车管理示例
  getShoppingCarManager:function(){
      if(!this.globalData.shoppingCarManager){
          this.globalData.shoppingCarManager  = new shoppingCarManager.ShoppingCarManager();
      }
      return this.globalData.shoppingCarManager;
  },
  //界面提示弹窗
  toast:function(){
    return Tip.toast();
  },
  globalData:{
     shoppingCarManager:null,
  },
  getOpenId:function(){
      return wx.getStorageSync('openId');
  }
})