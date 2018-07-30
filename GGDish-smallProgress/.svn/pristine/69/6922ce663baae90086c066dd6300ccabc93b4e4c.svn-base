var app = getApp();
var qnRequest = require('../../../utils/request.js');
var constants = require('../../../utils/constants.js');
var qnLoading = require('../../component/qnLoading/qnLoading.js');

var shoppingCarManager;
Page({

    data:{
        orderId:'',
        deskNo:'',  //桌位id
        deskInfo :'',

        discount:0,
        shouldPay:0,
        isChooseCoupon:false, // true:去选择了个人优惠券
        control:{
            /** 是否显示*/
            isShowMember:false,
            isShowPrivilege:true,
            isShowCoupon:false,
            /** 是否置灰*/
            memberCanUse:true,    //会员优惠是否可用
            privilegeCanUse:true,  //点菜优惠是有可用 
            couponCanUse:false,
             /** 是否选中*/
            isSelectMember:false,  //是否选中会员
            isSelectPrivilege:false, //是否选中点菜优惠
            isSelectCoupon:false, //表示选择使用个人优惠券
            /** 点了特价菜或者选了不可同享的个人优惠  */
            isShowHint:false,
        },
        orderInfo:{//订单数据

            "sumMoney":500, //总价
            "specialDiscount":100, //特价菜的优惠  （小计：sumMoney-specialDiscount）
            "payAmount":500, //还需支付的金额

            "discount":0, //优惠的金额 （应付：payAmount- disCount）
        
            "dishNum":5,   //菜品
            "stapleNum":1,//主食
            "tableWare":0,//餐具
            "tableNum":0,//桌位

            "deskInfo":'06',//桌位信息

            "grantStatus":1,
            
            "remark":"嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿",//备注
            "submitWay":0,
        },
        discountInfo: {//优惠数据 
          "specialIsShare": 1,
          "payAmount": 4600,
          "entId": "1480484337783",
          "orderPrivilegeType": 0,
          //点菜优惠
          "privileges": {
            "discount": 100,
            "uncountMoney": 100,
            "privilegeName": "满50元减10元",
            "privilegeType": 1,
            "privilegeId": "76d436dfd3554583a38f198f12d0b4ec",
            "privilegePrompt": "还差4.00元，可享受此优惠",
            "canUse": 1
          },
      
          //会员优惠
          "membersData": {
            discount: 350,
            uncountMoney: 0,
            privilegeName: '钻石会员',
            privilegeType: 0,
            privilegeId: '3a39ddf7ec1c46f8a73c15b49bd572fa',
            couponId: 'fc51724a6fca4078a2636415e4865539',
          },
          //个人优惠
          "coupons": {
                "couponsToShow": '1张可选', //后添加的
                "disCount": 1500,
                "payAmount": 1820
          }
        },
    },
    //原数据
    returnData:{
      orderInfo: {//订单数据

        "sumMoney": 500, //总价
        "specialDiscount": 100, //特价菜的优惠  （小计：sumMoney-specialDiscount）
        "payAmount": 500, //还需支付的金额

        "discount": 0, //优惠的金额 （应付：payAmount- disCount）

        "dishNum": 5,   //菜品
        "stapleNum": 1,//主食
        "tableWare": 0,//餐具
        "tableNum": 0,//桌位

        "deskInfo": '06',//桌位信息

        "grantStatus": 1,

        "remark": "嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿",
        "submitWay": 0,
      },
      discountInfo: {//优惠数据 
        "specialIsShare": 1,
        "payAmount": 4600,
        "entId": "1480484337783",
        "orderPrivilegeType": 0,
        //点菜优惠
        "privileges": {
          "discount": 100,
          "uncountMoney": 100,
          "privilegeName": "满50元减10元",
          "privilegeType": 1,
          "privilegeId": "76d436dfd3554583a38f198f12d0b4ec",
          "privilegePrompt": "还差4.00元，可享受此优惠",
          "canUse": 1
        },
        //会员优惠
        "membersData": {
          discount: 350,
          uncountMoney: 0,
          privilegeName: '钻石会员',
          privilegeType: 0,
          privilegeId: '3a39ddf7ec1c46f8a73c15b49bd572fa',
          couponId: 'fc51724a6fca4078a2636415e4865539',
        },
        //个人优惠
        "coupons": {
          "shareCoupons": [
            {
              "consumeAmountLimit": 1,
              "couponDetail": "1",
              "couponType": 1,
              "endTime": "2017-08-20",
              "id": "c7fba4dded3e495393cdfc057f776ec0",
              "marketingActivityID": "d645d6c6b99e47f9977e7b7b5566b8ba",
              "notUse": 0,
              "recommended": 1,
              "shareable": 1,
              "timeType": 0,
              "useLimit": 1
            },
            {
              "consumeAmountLimit": 1,
              "couponDetail": "2",
              "couponType": 1,
              "endTime": "2018-03-20",
              "id": "7e3b375c766d4d8c8591342f6033ecbe",
              "marketingActivityID": "2c99d18397bf4abda92754e439d33211",
              "notUse": 0,
              "recommended": 1,
              "shareable": 1,
              "timeType": 0,
              "useLimit": 1
            },
            {
              "consumeAmountLimit": 1,
              "couponDetail": "10",
              "couponType": 1,
              "endTime": "2017-10-20",
              "id": "42c7446404834c22b7ba26a4678c72a0",
              "marketingActivityID": "545ef387362f4946870e39fec70aa779",
              "notUse": 0,
              "recommended": 1,
              "shareable": 1,
              "timeType": 0,
              "useLimit": 1
            }
          ],
          "unShareCoupons": [
            {
              "consumeAmountLimit": 1,
              "couponDetail": "1",
              "couponType": 1,
              "endTime": "2017-09-20",
              "id": "f4fa562c0d924123951b16cd728e8ca3",
              "marketingActivityID": "ac5bd0366b7346f28d682f7484ea2719",
              "notUse": 0,
              "recommended": 1,
              "shareable": 0,
              "timeType": 0,
              "useLimit": 0
            },
            {
              "consumeAmountLimit": 1,
              "couponDetail": "1",
              "couponType": 1,
              "endTime": "2017-09-20",
              "id": "a12c99f1c86b41c99fd22cff21a664a9",
              "marketingActivityID": "ac5bd0366b7346f28d682f7484ea2719",
              "notUse": 0,
              "recommended": 1,
              "shareable": 0,
              "timeType": 0,
              "useLimit": 0
            },
            {
              "consumeAmountLimit": 10,
              "couponDetail": "10",
              "couponType": 1,
              "endTime": "2017-09-20",
              "id": "35ba2e1fe7d8430a975d4a9ef714f50d",
              "marketingActivityID": "f8ce7f2ce5ff45e3ba7b64284b311549",
              "notUse": 0,
              "recommended": 0,
              "shareable": 0,
              "timeType": 0,
              "useLimit": 0
            },
            {
              "consumeAmountLimit": 10,
              "couponDetail": "10",
              "couponType": 1,
              "endTime": "2017-09-20",
              "id": "fb5f98ead028423a82a257209b45e858",
              "marketingActivityID": "f8ce7f2ce5ff45e3ba7b64284b311549",
              "notUse": 1,
              "recommended": 0,
              "shareable": 0,
              "timeType": 0,
              "useLimit": 0
            }
          ],
          "couponListDetail": [
            {
              "couponDetail": "1元代金券",
              "num": 1
            },
            {
              "couponDetail": "2元代金券",
              "num": 1
            },
            {
              "couponDetail": "10元代金券",
              "num": 1
            },
            {
              "couponDetail": "1元代金券",
              "num": 2
            }
          ],
          "couponsToShow": '', //后添加的
          "isExistMarketingAct": 1,
          "disCount": 1500,
          "payAmount": 1820
        }
      },
      returnCouponData: { //返券数据

      },
    },

    //options包含orderId数据
    onLoad(options){
        shoppingCarManager = app.getShoppingCarManager(); //获取购物车管理类
        if (options.resourceId){
          this.setData({ resourceId: options.resourceId})
        }
        console.log("======确认下单页======");
        console.log(options && options.shopId);
        qnLoading.loading();
        app.toast();

        var orderId = '';
        if(options&& options.shopId){
            this.setData({orderId:options.shopId});
            orderId = options.shopId;
        }
        
        if (options && options.deskNo) {
          this.setData({ deskNo: options.deskNo });
        }
        if (options && options.deskInfo) {
          this.setData({ deskInfo: options.deskInfo });
        }
  
        this.initData();
        // this.test();
       
    },
    initData:function(){
      var that = this;
        qnRequest.request({
            url: constants.IP + constants.URL_orderDishInfo,
            data:{orderId:that.data.orderId},
            success:function(res){
                console.log(res);
                if(res.data.returnCode==="00"){
                    console.log('获取优惠以及订单信息成功');
                    that.returnData = res.data;
                    if (!res.data.orderInfo.deskInfo && that.data.deskInfo) {
                        res.data.orderInfo.deskInfo = that.data.deskInfo;
                    }
                    that.data.orderInfo = res.data.orderInfo;
                    that.data.discountInfo = res.data.discountInfo;
                    
                    that.formatData();
                }else{
                  console.log('获取优惠以及订单信息失败');
                  that.qnLoading.loadError();
                }
                console.log(res.data);
            },
            fail:function(res){
              console.log('获取优惠以及订单信息————fail');
              that.qnLoading.loadError();
            },
            complete:function(res){
              that.qnLoading.hide();
            }
        });
    },
    test:function(){
      this.qnLoading.hide();
       //使用假数据模拟返回的优惠情况

        this.formatData();
    },
    //处理优惠相关的数据并展示
    formatData:function(){

        var control = this.data.control;
        var orderInfo = this.data.orderInfo;
        var discountInfo = this.returnData.discountInfo;

        //
        if(discountInfo.specialIsShare === 0){
            discountInfo.privilegeHint = '您已点特价菜，特价菜不与其他优惠同享';
            this.data.control.isShowHint = true;
        }else if(this.isChooseUnShareCoupons()){
             discountInfo.privilegeHint = '您已选择使用不与其他优惠同享的优惠券';
             if(this.data.control.isSelectCoupon){ //表示选择使用优惠券
                 this.data.control.isShowHint = true;
             }
        }
     
        //是否显示优惠
        control.isShowMember = discountInfo.membersData?true:false; //是否有会员优惠
        control.isShowPrivilege = discountInfo.privileges &&discountInfo.privileges.privilegeId?true:false;//是否有点菜优惠
        //优惠是否可用
        if(discountInfo && discountInfo.specialIsShare === 0){ //表示有特价菜
            control.memberCanUse = false; 
            control.privilegeCanUse = false;
            control.couponCanUse = false;
            
            control.isSelectMember = false;
            control.isSelectPrivilege = false;
            control.isSelectCoupon = false;
        }else{// 没有特价菜
            //点菜优惠数据整合
            if(control.isShowPrivilege){
                var privilege =  discountInfo.privileges;
                if(privilege.canUse){
                     control.privilegeCanUse = true;
                     //不参与优惠的金额信息
                     if(privilege.uncountMoney){
                         privilege.uncountMoneyToShow = "不参与优惠金额：¥"+privilege.uncountMoney/100;
                     }
                }else{
                     control.privilegeCanUse = false;
                }
            }
             //会员数据整合
            if(control.isShowMember){  //有会员优惠就表示会员优惠可用
                control.memberCanUse = true;
            }
            //个人优惠数据整合 
            var couponsToShow="";
            if(this.hasUseableCoupon(discountInfo.coupons)){
                 control.couponCanUse = true;
                 var count = this.getCanUseCouponCount();
    
                  if(count>0){
                      var discount = this.getCouponDiscount();
                      this.data.discountInfo.coupons.disCount = discount;
                      couponsToShow =  '- ¥' + (discount / 100);

                  }else{
                      couponsToShow = '无可用优惠券';
                  }
                 discountInfo.coupons.couponsToShow = couponsToShow;
                
            }else{
                //无可用优惠券
                control.couponCanUse = false;
            }
        }
        //默认选择

        this.setData({
            control:control,
            orderInfo:orderInfo,
            discountInfo:discountInfo,
        });
        this.calculatePrice();
    },
    //获取是否有可用的个人优惠券
    hasUseableCoupon:function(coupons){
        if(!coupons){
             return false;
        }
         if(coupons.couponListDetail && coupons.couponListDetail.length>0) {
            return true;
        }
        if(coupons.shareCoupons &&coupons.shareCoupons.length>0) {
            for( var info in coupons.shareCoupons) {
                if(info.notUse !== 1) { //表示有可用的
                    return true;
                }
            }
        }
        if(coupons.unShareCoupons && coupons.unShareCoupons.length>0) {
            for( var info in coupons.unShareCoupons) {
                if(info.notUse !== 1) { //表示有可用的
                    return true;
                }
            }
        }
        return false;
    },
    //获取是否选择了优惠券
    hasSelectedCoupon:function(){
      var coupons = this.returnData.discountInfo && this.returnData.discountInfo.coupons;
        var shareCoupons = coupons && coupons.shareCoupons;
        var unShareCoupons = coupons && coupons.unShareCoupons;

        var couponConcat = [];
        if(shareCoupons && unShareCoupons){
             couponConcat = shareCoupons.concat(unShareCoupons);
        }else if(shareCoupons){
            couponConcat = shareCoupons;
        }else if(unShareCoupons){
             couponConcat = unShareCoupons;
        }
        if(couponConcat && couponConcat.length>0){
            for(var i = 0;i<couponConcat.length;i++ ){
                if(couponConcat[i].recommended){//选中，看是否已经存在
                    return true;
                }
            }
        }
        return false;
    },
    //是否选择了不可同享的优惠券
    isChooseUnShareCoupons:function(){
       
        if(this.data.discountInfo){
          var coupons = this.returnData.discountInfo.coupons;
             if(coupons && coupons.unShareCoupons && coupons.unShareCoupons.length>0){
                 for(var i in  coupons.unShareCoupons){
                     if(coupons.unShareCoupons[i].recommended === 1){ //选中
                         return true;
                     }
                 }
             }
        }
        return false;
    },
    //获取可用优惠券张数
    getCanUseCouponCount:function(){
      var coupons = this.returnData.discountInfo && this.returnData.discountInfo .coupons;
        var shareCoupons = coupons && coupons.shareCoupons;
        var unShareCoupons = coupons && coupons.unShareCoupons;

        var couponConcat = [];
        if(shareCoupons && unShareCoupons){
             couponConcat = shareCoupons.concat(unShareCoupons);
        }else if(shareCoupons){
            couponConcat = shareCoupons;
        }else if(unShareCoupons){
             couponConcat = unShareCoupons;
        }
        if(couponConcat && couponConcat.length>0){
            var count = 0;
            for(var i = 0;i<couponConcat.length;i++ ){
                if(!couponConcat[i].notUse){
                   ++count
                }
            }
        }
        return count;
    },
    //获取个人优惠的优惠金额
    getCouponDiscount:function(){
        //将coupons中的deiscount赋值
      var coupons = this.returnData.discountInfo && this.returnData.discountInfo.coupons;
        var shareCoupons = coupons && coupons.shareCoupons;
        var unShareCoupons = coupons && coupons.unShareCoupons;

        var couponConcat = [];
        if(shareCoupons){
            for(var i = 0;i<shareCoupons.length;i++ ){
                if(shareCoupons[i].recommended){
                    couponConcat.push(shareCoupons[i]);
                }
            }
        }
        if(unShareCoupons){
             for(var i = 0;i<unShareCoupons.length;i++ ){
                if(unShareCoupons[i].recommended){
                    couponConcat.push(unShareCoupons[i]);
                }
            }
        }
        var discount = 0;
        if(couponConcat && couponConcat.length>0){
            
            for(var i = 0;i<couponConcat.length;i++ ){
                if(couponConcat[i].couponType === 1){
                    discount += parseInt(couponConcat[i].couponDetail) *100;
                }else{
                    discount = (10 - parseInt(couponConcat[i].couponDetail))/10 * coupons.discount;
                }
            }
        }
        this.data.discountInfo.coupons.discount = discount;
        this.setData({discountInfo:this.data.discountInfo});

        return discount;
    },
    //获取选择的所有的activityId拼接后的结果
    getCouponIds:function(){
      //将coupons中的deiscount赋值
      var coupons = this.returnData.discountInfo && this.returnData.discountInfo.coupons;
      var shareCoupons = coupons && coupons.shareCoupons;
      var unShareCoupons = coupons && coupons.unShareCoupons;

      var couponConcat = [];
      if (shareCoupons) {
        for (var i = 0; i < shareCoupons.length; i++) {
          if (shareCoupons[i].recommended) {
            couponConcat.push(shareCoupons[i]);
          }
        }
      }
      if (unShareCoupons) {
        for (var i = 0; i < unShareCoupons.length; i++) {
          if (unShareCoupons[i].recommended) {
            couponConcat.push(unShareCoupons[i]);
          }
        }
      }
      var actIds = '';
      if (couponConcat && couponConcat.length > 0) {

        for (var i = 0; i < couponConcat.length; i++) {

          actIds += couponConcat[i].id+'、';
        }
        actIds = actIds.substring(0, actIds.length-1);
      }
     
      return actIds;
    },
    //选择优惠券后调用此方法刷新数据
    chooseCouponReference:function(){
        this.data.isChooseCoupon = false;
        if(!this.data.control.couponCanUse){  //
            return;
        }
        if(!this.hasSelectedCoupon()){  //没有选择优惠券
            this.data.control.isSelectCoupon = false;
            this.setData({
                control:this.data.control,
            });
            this.formatData();
            this.calculatePrice();
            return;
        }
        this.data.control.isSelectCoupon = true;
        var discount = this.getCouponDiscount();
        this.data.discountInfo.coupons.disCount = discount;
        this.data.discountInfo.coupons.couponsToShow = '- ¥'+(discount/100);
        this.setData({
            isChooseCoupon: this.data.isChooseCoupon,
            control:this.data.control,
            discountInfo:this.data.discountInfo
        });
        this.calculatePrice();
    },
    //修改已选菜品
    changeDish:function(){
      var that = this;
      var entId = that.data.orderInfo.entId || that.data.discountInfo.entId;
        wx.navigateTo({
          url: '../../menu/menu?entId=' + entId,
        })
        
    },
    //给商家留言
    tapLeaveMessage:function(){
        wx.navigateTo({
            url: '../leaveMessage/leaveMessage?message='+this.data.orderInfo.remark,
        })
    },
    //优惠券
    tapCoupons:function(){
        //不可用的时候不跳转
        if(this.data.control.couponCanUse){
            wx.navigateTo({
                url: '../chooseCoupon/chooseCoupon',
            })
        }
    },
    //选择会员优惠
    tapMember:function(){
         if(this.data.control.memberCanUse){ //会员优惠可用
            this.setData({
                'control.isSelectMember':!this.data.control.isSelectMember,
                'control.isSelectPrivilege':false,
                'control.isSelectCoupon': false,
                
            });
        }
         this.calculatePrice();
    },
    //选择点菜优惠
    tapPrivilege:function(){
        if(this.data.control.privilegeCanUse){ //点菜优惠可用
            this.setData({
                'control.isSelectMember':false,
                'control.isSelectCoupon': false,
                'control.isSelectPrivilege':!this.data.control.isSelectPrivilege
            });
        }
        this.calculatePrice();
    },
    //选择使用个人优惠
    tapCoupon:function(){
        if (this.data.control.couponCanUse) { //会员优惠可用
          this.setData({
            'control.isSelectCoupon': !this.data.control.isSelectCoupon,
            'control.isSelectPrivilege': false,
            'control.isSelectMember': false,

          });
        }
        this.calculatePrice();
    },
    //计算 已优惠 应付
    calculatePrice:function(){
        var discount = 0;
       
        var shouldPay = 0;
        if(this.data.discountInfo && this.data.discountInfo.specialIsShare === 0){ //特价菜
             shouldPay = (this.data.orderInfo.sumMoney - this.data.orderInfo.specialDiscoun);
        }else{
            if(this.data.control.isSelectMember){ //选择了会员优惠
              discount = this.data.discountInfo.membersData.discount;
            }else if(this.data.control.isSelectPrivilege){ //点菜优惠
                discount = this.data.discountInfo.privileges.discount;
            }
            if(this.data.control.isSelectCoupon){ //个人优惠
                discount += this.data.discountInfo.coupons.discount;
            }
        
            if(this.data.orderInfo.payAmount -discount <=0){
                shouldPay = 0; 
            }else{
                shouldPay = (this.data.orderInfo.payAmount - discount);
            }
        }
        this.setData({
             discount:discount,
             shouldPay:shouldPay,
        });
    },
    //立即下单
    takeOrderNow:function(){
      this.Toast.showAlways({ toastContent: '数据加载中', toastType: this.Toast.LOAD_IMT_TYPE ,alwayShow:true});

         var that = this;
         var control = that.data.control;
         var discountInfo = that.data.discountInfo;
          discountInfo.membersData
        // 判断该当前选择的优惠类型
        // privilegeId 点菜优惠与会员优惠的privilegeId
        // 选择使用个人优惠的话 actKeyId 的处理
        var privilegeType = 0;
        var privilegeId = '';
        var actKeyId = '';
       
        if (control.isSelectMember){
            privilegeType = 3;
            privilegeId = discountInfo.membersData.privilegeId;
          
        } else if (control.isSelectPrivilege){
            privilegeType = 2;
            privilegeId = discountInfo.privileges.privilegeId;
           
        } else if (control.isSelectCoupon){
            privilegeType = 1;
            actKeyId = that.getCouponIds();
        }
        //1.调用确认下单接口
         wx.request({
            url: constants.IP + constants.URL_PlaceOrder,
            data:{
                'openId':app.getOpenId(),
                'PayOrigin':'4',
                'orderId':that.data.orderId,
                'privilegeType': privilegeType,
                'privilegeId': privilegeId,
                'actKeyId': actKeyId,

                'remark': that.data.orderInfo.remark,
                'deskNum': that.data.resourceId, //是座位信息
            },
            success:function(res){
               
              
                if(res.data.returnCode==="00"){
                  that.Toast.hide();    
                  console.log('立即下单_成功');
                  console.log(res);
                      that.toPay(res);
                    
                }else{
                    //有错误
               
                  console.log('立即下单_失败');
                  console.log(res);
                  that.Toast.showTipAuto({ toastContent: '下单失败', toastType: that.Toast.WARN_IMG_TYPE });

                }
                that.refreshHomePageOnGoingOrder();

            },
            fail:function(res){
                console.log('立即下单fail');
                that.Toast.showTipAuto({ toastContent: '下单失败', toastType: that.Toast.WARN_IMG_TYPE });
                console.log(res);
            },
            complete:function(res){

                console.log('立即下单complete');
            }
        });
    },
    /**
     * 刷新首页正在进行中的订单
     */

    refreshHomePageOnGoingOrder:function(){
        let pages = getCurrentPages();
        for(var i = 0;i < pages.length ; i++){
          var page = pages[i];
          if (page.getPageName && page.getPageName() == 'home'){
              page.requestOnGoingOrder()
              break;
          }
        }
    },
    //弹起支付框
    toPay:function(options){
        var that = this;
        var entId = that.data.orderInfo.entId || that.data.discountInfo.entId;
        wx.requestPayment({
              
                'timeStamp': options.data.prepayInfo.timeStamp,
                'nonceStr': options.data.prepayInfo.nonceStr,
                'package': options.data.prepayInfo.package,
                'signType': 'MD5',
                'paySign': options.data.prepayInfo.paySign,
                'success':function(res){
                       console.log("支付成功");
                       that.toPlaceOrder({
                           payId:options.data.payId,
                           orderId:options.data.orderId,
                           entId: entId
                       });
                       //清空购物车中此商家的数据
                       shoppingCarManager.clear(entId);
                },
                'fail':function(res){
                      console.log('支付失败或取消支付');
                      that.toDishDetail(options.data.orderId);
                      console.log(res);
              }
        })
    },
    toDishDetail:function(orderId){
        
        console.log('取消支付后的orderId：' + orderId);
        wx.navigateTo({
          url: '../orderDetail/orderDetail?orderId=' + orderId,
        })
    },
    toPlaceOrder:function(options){
        console.log('跳转下单成功页');
          // 进入下单成功页
        wx.navigateTo({
            url: '../placeOrder/placeOrder?payId='+options.payId+'&orderId='+options.orderId+'&entId='+options.entId,
        })
    },
    getPageName:function(){
        return "CommitOrderPage";
    }
})