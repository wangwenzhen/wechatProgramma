//logs.js
var util = require('../../utils/util.js');
var qnLoading = require('../component/qnLoading/qnLoading.js') 
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    qnLoading.loading();
    
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    
    
    wx.getLocation({
      success: function (res) {
        console.log('获取当前位置');
        console.log(res);
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
          wx.openLocation({
            longitude: Number(value.longitude),
            latitude: Number(value.latitude),
            name: value.name,
            address: value.address
          })
      }
    })


  },
  userInfo:function(){
    wx.navigateTo({
      url: '../userInfo/userInfo'
    })
  },
  bigImg:function(){
     wx.navigateTo({
      url: '../bigImg/bigImg'
    })
  },
  superImg:function(){
      wx.navigateTo({
      url: '../superImg/superImg'
    })
  },
  reloadData : function(){
      console.log('重新加载');
  }
})
