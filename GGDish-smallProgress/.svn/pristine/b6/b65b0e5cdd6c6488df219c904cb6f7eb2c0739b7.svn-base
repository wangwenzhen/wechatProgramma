// pages/myCollection/myCollection.js
// 我的收藏
var app = getApp();
var constants = require('../../utils/constants.js');
var qnRequest = require('../../utils/request.js');
var getOpenId = require('../../utils/getOpenId.js');
var qnLoading = require('../component/qnLoading/qnLoading.js')
Page({
  data:{
      ip:"https://v.qncloud.cn/",
      entList:[
        // { entId:"1492659799253",
        //   entLogo:"resource/image/defaultPic/logoDF.png",
        //   entName:"谁都不要操作此店",
        //   industyName:"北京菜",
        //   privilegeMsg:"满10.00元减1.00元",
        //   recentConsume:"0天之前来过"
        // }
      ]
  },
  onShow:function(){
    this.initData();
  },
  onLoad:function(options){
      qnLoading.loading();
  },
  initData:function(){
        var that = this;
        qnRequest.request({
            url: constants.IP + constants.URL_UserCollecton,
            success: function(res){
                console.log(res);
                if(res.data&& res.data.returnCode === constants.RETURN_OK){
                    that.setData({
                        entList:res.data.entList
                    });
                }else{
                
                  console.log('获取我的收藏失败_____fail');
                  console.log(res);
                  that.qnLoading.loadError();
                }
                
            },
            fail: function(res) {
                console.log('获取我的收藏失败_____fail');
                console.log(res);
                that.qnLoading.loadError();
            },
            complete: function(res) {
                
              that.qnLoading.hide();
            }
        })
    },
    //点击商家列表item
    onEntItemClick:function(event){
        var index = event.currentTarget.dataset.index;
        console.log(index);
        var entId = this.data.entList[index].entId;
        wx.navigateTo({
           url: '../menu/menu?entId=' + entId,
         })
    },
    getOpenId:function(callback){
        getOpenId.login({
            success: function(){
                callback.success();
            },
            fail: function(){
                console.log();
            }
        })
    },
      reloadData: function () {
      console.log('重新加载');
      this.qnLoading.show();
      this.initData();
    },
})