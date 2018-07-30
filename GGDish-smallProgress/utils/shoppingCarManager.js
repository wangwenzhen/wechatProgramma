//购物车管理类，所有的购物数据都集中在此，所有的针对于购物车的操作全部集中在此

function ShoppingCarManager(){
   
    /**  ================= */

    //已选菜品
    this.entId="";

    this.addDishList = {
        // "6029e30718de17f88cb0bbca33e95fe5":{                        
        //     dishType:0,
        //     dishId:"59874bb9ee614f469c18ce12fa528011",
        //     dishName:"乌江鱼",
        //     price:5800,
        //     dishUnit:"份",
        //     comboDishName:"",//套餐名称
        //     sideDishData:[
        //         {
        //             dishName:"香菇",
        //             price:1000,
        //             num:1
        //         }
        //     ],
        //     "groupType":0,
        //     "isSpecial":1,   //是否为特价菜                     
        //     "originalPrice":7800,
        //     "presentPrice":5800,                        
        //     "totalPrice":11000,
        //     "sideDishStr":"香菇、金针菇、土豆片、豆皮x3",
        //     "attrCombo":"2斤|鱼香",
        //     "showName":"乌江鱼(2斤 鱼香)",
        //     "dishMd5":"6029e30718de17f88cb0bbca33e95fe5",
        //     "num":1,
        //     "sideDishPrice":5200,
        //     "originalTotalPrice":13000,
        //     "specialNum":1//特价菜数量
        // },

        
    }

    this.setEntId = function(entId){
        this.entId = entId;
        this.addDishList = {};
        this.formatAddDishListFromStorage();
    }
    /** 向已选菜品中添加菜品 */
    this.addDish = function(dish){
        if(!dish){
            return;
        }
        var dishMd5 = '';
        if (typeof dish == 'string') { //表示传过来的是个Md5
          dishMd5 = dish;
          var currDish = this.addDishList[dishMd5];
          if (currDish) {  //2. 如果已经存在，那么数量+1

            currDish.num += 1;
            //判断是否为特价菜
            if (currDish.isSpecial) {
              var specialDishTotalNum = this.getDishTotalSpecialNum(currDish.dishId);//特价的已点的总数量
              if (currDish.maxSalesNum == 0 || specialDishTotalNum < currDish.maxSalesNum) { //表示当前的这个可以是+1的特价菜
                currDish.specialNum += 1;
              }
            }
          } else {  //  如果不存在，将此菜品存到addDishList

            this.addDishList[dishMd5] = dish;
          }

        }else{
          dishMd5 = dish.dishMd5;
          this.addDishList[dishMd5] = dish;

        }
        //3.调用saveDishListToStorage更新storage
        this.saveDishListToStorage();
    }

  
    /** 从已选菜品中减少1 */
    this.subDish = function(dishMd5){
      if (!dishMd5){
            return;
        }
           
        var currDish = this.addDishList[dishMd5];
        if(currDish){
            
            if (currDish.isSpecial) {  //判断是否为特价菜
                var totalNum = this.getDishTotalNum(currDish.dishId);//已点的总数量
                var specialDishTotalNum = this.getDishTotalSpecialNum(currDish.dishId);//特价的已点的总数量
                if (specialDishTotalNum == totalNum) { //表示特价菜中享受特价的数量可以减1
                    currDish.specialNum -= 1;
                }
            }
            currDish.num -= 1;
            //如果数量为0 则移除此已选菜品
            if (currDish.num === 0) {
              delete this.addDishList[dishMd5];
            }


        }
        
        if(0===this.count(this.addDishList)){
              let pages = getCurrentPages();
              let curPage = pages[pages.length - 1];
              curPage.hintShoppingCart();
        }
        
        //3.调用saveDishListToStorage更新storage
        this.saveDishListToStorage();
    }

    /** 清空已选菜品 */
    this.clear =  function(){
        var entId = arguments[0];
        if (entId){ //表示清空指定商家的购物车数据
            try {
                wx.removeStorageSync(entId)
            } catch (e) {}
        }else{//表示清空当前购物车的数据
        
            //1. 清空 addDishList
            this.addDishList = {};
            //2. 调用 saveDishListToStorage更新storage
            this.saveDishListToStorage();
        }
       

    }

    /** 获取Page中用于显示的统计数据*/
    this.getShoppingDishInfo = function(){
        var result = {
            totalPrice:0, //已选菜品总价 
            originalPrice:0, //已选菜品原价 的总价
            totalNum:0,  //已选菜品总数
            dishNum:0,   //普通菜数量
            stapleNum:0, //主食数量
            tableWare:0, //餐具数量
            tableNum:0,  //餐位数量
           
            addDishes:this.addDishList, //所有已选菜品
        }
        //经过对addDishList的计算 为result中的统计数据赋值
        for(var dishMd5 in  this.addDishList ){
            var dish = this.addDishList[dishMd5];
            //菜品总数
            result.totalNum += dish.num;
            switch(dish.groupType){
               case 1: //主食 
                    result.stapleNum+= dish.num;
               break;
               case 2: //餐位
                   result.tableNum+= dish.num;
               break;
               case 4: //餐具
                   result.tableWare+= dish.num;
               break;
               default: //菜
                   result.dishNum+= dish.num;
               break;
            }
            
            if(dish.isSpecial){ //特价菜
                //菜品总金额
                result.totalPrice += dish.originalTotalPrice * (dish.num - dish.specialNum) + dish.totalPrice * dish.specialNum;
                //菜品总原价
                result.originalPrice += dish.originalTotalPrice * dish.num;
           }else{ //普通菜
                //菜品总金额
                result.totalPrice += dish.totalPrice * dish.num;
                result.originalPrice += dish.totalPrice * dish.num;
           }
          
        }        
      
        return result;
    }
    //获取给定dishId下的所有菜品的specialNum总数
    this.getDishTotalSpecialNum = function(dishId){
        var specialDishTotalNum = 0;
        for(var dishMd5 in  this.addDishList ){
            if(this.addDishList[dishMd5].dishId === dishId){
                if(this.addDishList[dishMd5].specialNum){
                    specialDishTotalNum += this.addDishList[dishMd5].specialNum;
                }
            }
        }
        return specialDishTotalNum;
    }
    //获取给定dishId下的所有菜品的num总数
    this.getDishTotalNum = function(dishId){
        var totalNum = 0;
        for(var dishMd5 in  this.addDishList ){
            if(this.addDishList[dishMd5].dishId === dishId){
                if(this.addDishList[dishMd5].num){
                    totalNum+= this.addDishList[dishMd5].num;
                }
            }
        }
        return totalNum;
    }
    //获取给定dishId下 isSpecial==true的 num总数
     this.getSpecialDishTotalNum = function(dishId){
        var specialDishTotalNum = 0;
        for(var dishMd5 in  this.addDishList ){
            if(this.addDishList[dishMd5].dishId === dishId){
                if(this.addDishList[dishMd5].isSpecial){
                    specialDishTotalNum += this.addDishList[dishMd5].num;
                }
            }
        }
        return specialDishTotalNum;
    }



    /** 将addDishList中的数据存入storage*/
     this.saveDishListToStorage = function(){
       wx.setStorageSync(this.entId, JSON.stringify(this.addDishList))
    }

    /** 将storage中的数据取出并放入addDishList*/
     this.formatAddDishListFromStorage = function(){
       var data = wx.getStorageSync(this.entId);
       if (data){
         this.addDishList = JSON.parse(data);
       } 
    }
    this.count= function count(o){
        var t = typeof o;
        if(t == 'string'){
                return o.length;
        }else if(t == 'object'){
                var n = 0;
                for(var i in o){
                        n++;
                }
                return n;
        }
        return false;
    }
}

module.exports = {
  ShoppingCarManager: ShoppingCarManager
}