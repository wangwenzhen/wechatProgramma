// pages/order/chooseCoupon/chooseCoupon.js
Page({
    data:{
        selectNum:0,
        coupons:{},
    },
    onLoad:function(options){
        let pages = getCurrentPages();
        let lastPage = pages[pages.length - 2];

        if(lastPage && lastPage.getPageName() === "CommitOrderPage"){
          var discountInfo = lastPage.returnData.discountInfo;
            if(discountInfo && discountInfo.coupons){
                var selectNum = 0;
                if(discountInfo.coupons && discountInfo.coupons.couponListDetail){
                    var couponListDetail = discountInfo.coupons.couponListDetail;
                    for(var index in couponListDetail){
                        selectNum += couponListDetail[index].num;
                    }
                }
                this.setData({
                    selectNum:selectNum,
                    coupons: discountInfo.coupons,
                });
            }
        }
    },
    /**
     * couponType:0 ==> 点击同享的要优惠券
     * couponType:1 ==> 点击不同享的要优惠券
     */
    tapCoupons:function(event){
       
        var index = event.currentTarget.dataset.index;
        var couponType = event.currentTarget.dataset.couponType;

        
        var clickItem = null;
        if(couponType==="0"){
            clickItem = this.data.coupons.shareCoupons[index];
        }else if(couponType==="1"){
            clickItem = this.data.coupons.unShareCoupons[index];
        }
        if(!clickItem){
            return; 
        }
         if(clickItem.notUse){
            return; //表示点击不可用的优惠券
         }
        var selectNum = this.data.selectNum;

        if(clickItem.recommended){ //选中
            clickItem.recommended = 0;
            --selectNum;
        }else{ //未选中
            clickItem.recommended = 1;
            ++selectNum;
        }
        
        var unShareCoupons = this.data.coupons.unShareCoupons;
        if(couponType==="1"){ //不同享的点击时要改变同组选中状态
            for(var i = 0;i<unShareCoupons.length;i++){
                if(unShareCoupons[i].notUse === 0){ //表示可用
                    if(unShareCoupons[i].marketingActivityID !== clickItem.marketingActivityID){
                        if(unShareCoupons[i].recommended === 1){
                            unShareCoupons[i].recommended = 0;
                            --selectNum;
                        }
                    }
                }                
            }
        }

        this.setData({
            selectNum:selectNum,
            coupons:this.data.coupons
        });
    },
    //点击确定
    sure:function(){
        //将已经选择的菜合并在
        var shareCoupons = this.data.coupons.shareCoupons;
        var unShareCoupons = this.data.coupons.unShareCoupons;
        var couponListDetail = {};

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
                   var couponDetail='';
                    if(couponConcat[i].couponType ===0){
                        couponDetail = couponConcat[i].couponDetail+"折优惠券";
                    }else{
                        couponDetail = couponConcat[i].couponDetail+"元代金券";
                    }
                    var curr = couponListDetail[couponDetail]
                    if(curr){//存在
                        curr.num+=1;
                    }else{
                        couponListDetail[couponDetail] = { num:1,"couponDetail":couponDetail};
                    }
                }
            }
        }
        this.data.coupons.couponListDetail = [];

        for(var i in couponListDetail){
             this.data.coupons.couponListDetail.push(couponListDetail[i]);
        }
        let pages = getCurrentPages();
        let lastPage = pages[pages.length - 2];
        lastPage.returnData.discountInfo.coupons = this.data.coupons;//
        lastPage.chooseCouponReference();
        wx.navigateBack({});
    }
})