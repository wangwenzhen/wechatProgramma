// pages/order/selectedDishDetail/selectedDishDetail.js
var app = getApp();
var Dialog = require('../../component/qnDialog/qnDialog.js');
var constants = require('../../../utils/constants.js');
var common = require('../common.js');
var qnLoading = require('../../component/qnLoading/qnLoading.js');
Page({
  data:{
    //  ip:"https://v.qncloud.cn/",
    //  orderInfo:{
          // entLogo:"resource/image/defaultPic/logoDF.png",
          // entName:'香缇小厨',

          // orderId:'1101203304504440',
          // userPhone:"18610773772",
          // orderNo:"3772",
          // deskNo:"007",
          // orderStatus:"01",
          // createTime:"16:33",
          // totalPrice:37400,
          // dishList:[
            // {dishName:"肉丝大拉皮",
            //   dishType:0,
            //   num:2,
            //   dishPrice:3200},
            // {dishName:"菠菜粉丝",
            //   dishType:0,
            //   num:1,
            //   dishPrice:1000},
            // {dishName:"烤鱼",
            //   dishType:0,
            //   attrCombo:"鲢鱼 麻辣",
            //   num:1,
            //   dishPrice:7800},
            // {dishName:"烤鱼",
            //   dishType:0,
            //   attrCombo:"乌江鱼 香辣",
            //   num:1,
            //   dishPrice:19200,
            //   subDish:[
            //     {dishName:"土豆",num:1},
            //     {dishName:"藕片",num:2},
            //     {dishName:"芹菜",num:1},
            //     {dishName:"地瓜",num:2},
            //     {dishName:"豆皮",num:1}
            //    ]},
            // {dishName:"烤鱼",
            //    dishType:0,
            //    attrCombo:"乌江鱼 香辣",
            //    num:1,
            //    dishPrice:19200},
            // {dishName:"套餐",
            //    dishType:1,
            //    attrCombo:"套餐小菜1 套餐小菜2 套餐小菜3 套餐小菜4",
            //    num:1,
            //    dishPrice:19200}
            //  ],
        //  },

         
  
  },
  onLoad:function(options){
      console.log('-----选好菜品页-----');
      console.log('shopId:' + options.shopId + 'entId :' + options.entId);
      qnLoading.loading();


      var shopId = options.shopId;
      var entId = options.entId;
  
      this.setData({ shopId: shopId, entId: entId })



      
      Dialog.init();
      this.Dialog.setupDialog({
        dialogTitle: '取消订单',
        dialogContent: '您确定取消订单吗？',
        cancelBtnTxt: '考虑一下',
        confirmBtnTxt: '确认取消',
      });
      this.requestOrderDetail();
      // var that = this;
      // that.changeShowDishName(this.data.orderInfo); 
  },
  requestOrderDetail:function(){
    var that = this;
    console.log('上传数据的参数：shopId '+ this.data.shopId + ' entId:'+ this.data.entId);
    wx.request({
      url: constants.IP + constants.URL_PreOrderDetail,
      data: {
        shopId: that.data.shopId,
        entId: that.data.entId
      },
      success: function (res) {
        if (res.data.returnCode === "00") {
          console.log('获取订单信息成功');
          
          that.changeShowDishName(res.data); 

          that.qnLoading.hide();
        }else{
          console.log('获取订单信息失败');
          that.qnLoading.loadError();
        }
        console.log(res.data);
      },
      fail: function (res) {
        console.log('获取订单信息__Fail');
        console.log(res);
        that.qnLoading.loadError();
      },
      complete: function (res) {

      }
    });


  },

      //将要展示的dishName封装好
    changeShowDishName(info){//info后台全部数据源
      var dishList = info.dishs;
   
      var orderInfo_chang = {};
      if(dishList !=null&& dishList.length>0){
        for(var i=0;i<dishList.length;i++){
          var dishItem = dishList[i];
          var dishName = dishItem.dishName;
          var dishType = dishItem.dishType;
          var attrCombo= dishItem.attrCombo;
          var attrCombo_toShow = dishName;
          var sideDish_toShow="";
          if(attrCombo){
             if(dishType == 0){ //普通菜
               attrCombo_toShow = attrCombo_toShow+'(' +attrCombo +')';
             }else if(dishType == 1){ //套餐
               sideDish_toShow = attrCombo;
             }
          }
          //将配菜遍历出来
          if(dishType == 0){
            var subDish = dishItem.subDishList;
             if (subDish != null && subDish.length > 0) {
               for(var j=0;j<subDish.length;j++){
                 var subDishItem = subDish[j];
                 var subDishName = subDishItem.dishName;
                 var subDishNum  = subDishItem.num;
                 if(subDishNum>1){
                   sideDish_toShow = sideDish_toShow + subDishName + '*'+subDishNum + ' ';
                 }else{
                    sideDish_toShow = sideDish_toShow + subDishName + ' ';
                 }
               }
             }
          }
          dishItem.attrCombo_toShow = attrCombo_toShow;
          dishItem.sideDish_toShow  = sideDish_toShow;
        }
        orderInfo_chang.dishList = dishList;
        orderInfo_chang.entName = info.entName;
        orderInfo_chang.entLogo = constants.IP + info.logo;
        orderInfo_chang.totalPrice = (info.orderInfo.totalPrice - info.orderInfo.specialDiscount) /100;
        this.setData({
          orderInfo: orderInfo_chang,
          orderDetail: info.orderInfo,
        });
        
      }
    },
    //跳转商家页面
    entItemClicked:function(){
        var that = this;
        wx.navigateTo({

          url: '../../menu/menu?entId=' + that.data.entId,

        })
    },
    //我要加菜
    addDisClicked:function(){

      var that = this;
      wx.navigateTo({
        url: '../../menu/menu?entId=' + that.data.entId,
      })

    },
    cancelOrder:function(){
        this.Dialog.show();
    },
    scanForSeat:function(){
      this.data.orderDetail.entId = this.data.entId;
      common.scanToSeat(this.data.orderDetail);
    },
    //确认取消订单
    dialogConfirm: function () {
      //调用取消订单接口
      var that = this;
      console.log("确认取消预订单");
      wx.request({
        url: constants.IP + constants.URL_ClearDishShoppingRecords,
        data: { shopId: this.data.shopId },
        success: function (res) {
          if (res.data.returnCode === "00") {
            console.log('取消订单成功success()');
            //成功后 收起弹窗
            that.Dialog.hide();
            
            wx.navigateBack({ delta:2});
          }
          console.log(res.data);
        },
        fail: function (res) {
          console.log('取消订单失败fail()');
          console.log(res);
        },
        complete: function (res) {

        }
      });

    },
    reloadData: function () {
      console.log('重新加载');
      this.qnLoading.show();
      this.requestOrderDetail();
    },
    
})