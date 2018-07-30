var app = getApp();
var constants = require('../../../utils/constants.js');
var qnRequest = require('../../../utils/request.js');
Page({

    data:{
         isShowAll:false, //是否显示全部优惠券
        // userName:'SMouse',
        // userPhone:'183****2685',
        // avatarUrl:'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL9uW8lPF6ib64sHxOzibiaydGmKo6Cc06p3YLMLdLibFJlJfqHtfia6s3HPz1ic0UZliaft4Sy3xbmYAvNQ/0',
       
        // coupons:[
        //     {
        //         coupon_detail:2000,
        //         privilege_type:1,
        //         consume_amount_limit:10000,
        //         end_time:"2017-2-17"
        //     },
        //     {
        //         coupon_detail:850,
        //         privilege_type:2,
        //         consume_amount_limit:10000,
        //         end_time:"2017-2-17"
        //      },
        //      {
        //         coupon_detail:3000,
        //         privilege_type:1,
        //         consume_amount_limit:10000,
        //         end_time:"2017-2-17"
        //     },
        //     {
        //       coupon_detail: 3000,
        //       privilege_type: 1,
        //       consume_amount_limit: 10000,
        //       end_time: "2017-2-17"
        //      },
        //      {
        //        coupon_detail: 3000,
        //        privilege_type: 1,
        //        consume_amount_limit: 10000,
        //        end_time: "2017-2-17"
        //      }
        // ],
       
    },
    /**
      * 生命周期函数--监听页面显示
      */
    onShow: function () {
      this.loadUserData();
      this.loadCouponData(); 
    },

    onLoad:function(options){
        console.log("页面——我");
       
    },
    //获取用户数据
    loadUserData:function(){
      var that = this;
      
      if (!this.data.userName || !this.data.avatarUrl){
          wx.getUserInfo({
              success: function (userResult) {
                if(userResult.userInfo){
                   that.setData({
                      userName: userResult.userInfo.nickName,
                      avatarUrl: userResult.userInfo.avatarUrl,
                  });
                }
              },
          });
      }
       var phone = wx.getStorageSync("userPhone");
       this.setData({
          userPhone: phone,
       });
    },
    //获取优惠券数据
    loadCouponData:function(){
      var that = this;
      console.log('获取我的优惠券_____start');
      qnRequest.request({
           
            url: constants.IP + constants.URL_UserCouponList,
            data: { pageNow:0,pageSize:0},
            success:function(res){
              console.log('获取我的优惠券_____success');
                console.log(res);
                if (res.data.returnCode === constants.RETURN_OK){
                  if (res.data && res.data.returnData ){
                    that.setData({
                      coupons: res.data.returnData.data,
                    });
                  }
                }
            },
            fail:function(res){
              console.log('获取我的优惠券_____fail');
                console.log(res);
            },
        })
    },
    //更换手机号
    changePhone:function(){
        wx.navigateTo({
          url: '../../login/login',
        })
    },
    //绑定手机号
    bindPhone:function(){
      wx.navigateTo({
        url: '../../login/login',
      })
    },
    //优惠券详情
    toCouponDetail:function(event){
        var couponIndex = event.currentTarget.dataset.couponIndex;
        var couponStr = JSON.stringify(this.data.coupons[couponIndex]);
        wx.setStorageSync('couponStr', couponStr);

        wx.navigateTo({
          url: '../../coupon/coupon',
        })
    },
    //我的收藏
     toMyCollection:function(event){
         wx.navigateTo({
            url: '../../myCollection/myCollection',
         })
     },
     //我的卡包
     toMyCard:function(event){
          wx.navigateTo({
            url: '../../myCard/myCard?userPhone=' + this.data.userPhone,
         })
     },
     showAll:function(){
       this.setData({
         isShowAll:true
       });
     }
})