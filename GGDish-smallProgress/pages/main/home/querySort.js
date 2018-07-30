var common = require('./common/common.js')
var qnLoading = require('../../component/qnLoading/qnLoading.js')
Page({
  data:{
  },
  onLoad: function (options) {
      common.setUpScreenData();
      this.setData({ selectIndex: options.selectIndex})
      if (options.subIndex != 'undefined' && options.subIndex) {//选中的是 二级筛选条
        var sortZone_chang = this.data.sortZone;
        sortZone_chang[options.selectIndex].subIndex = options.subIndex;
        
        if(options.selectIndex == 0){//第一个分区 
          sortZone_chang[options.selectIndex].optionName = this.data.allQuery[options.subIndex].optionName;
          this.setData({ industryId: this.data.allQuery[options.subIndex].optionId})

        } 
        else if (options.selectIndex == 1){//第二个分区
          sortZone_chang[options.selectIndex].optionName = this.data.smartSort[options.subIndex];
        }
        else{//第三个分区
          sortZone_chang[options.selectIndex].optionName = this.data.screening[options.subIndex];
        }
        this.setData({ sortZone: sortZone_chang,});
      } else{//选中的是 一级筛选条
        this.setData({ showToastBg: true})
      }
      qnLoading.loading();
      common.setUpEntListData();
      this.setUpBasiData();
      this.requestEntListInfo(true);
  },
  setUpBasiData:function(){
      var containerW = wx.getSystemInfoSync().windowWidth;
      
      var sortBlockW = (containerW - 10 * 7) / 4;
      this.setData({ sortBlockW: sortBlockW})
  },
  closeBg:function(){
    this.setData({ showToastBg: false})
  },
  
  querySort:function(e){
    if (this.data.selectIndex == e.currentTarget.dataset.querytype && this.data.showToastBg){
      this.closeBg();
      return;
    }
    this.setData({ selectIndex: e.currentTarget.dataset.querytype, showToastBg: true})
 
  },
  /**
   *  点击条件后 获取商铺
   */
  tapOption:function(e){
    var index = e.currentTarget.dataset.tapIndex;
    var subIndex = e.currentTarget.dataset.tapSubindex;
    /**
     *  构造sortZone
     */
    var opionName_chang = index == 0 ? this.getOptionNameAndIndex(this.data.allQuery, subIndex,true) : (index == 1 ? this.getOptionNameAndIndex(this.data.smartSort,subIndex,false) : this.getOptionNameAndIndex(this.data.screening,subIndex,false));
    var sortZone_chang = this.data.sortZone;
    sortZone_chang[index].optionName = opionName_chang;
    sortZone_chang[index].subIndex = subIndex;
    /**
     * 获取遍历的条件
     */
    this.setData({
       sortZone:sortZone_chang,
       industryId: this.data.allQuery[subIndex].optionId,
       sortType: sortZone_chang[1].subIndex,
       privilege: sortZone_chang[2].subIndex
    })
    this.closeBg();
 
    /**
     * 重新加载数据
     */
    this.qnLoading.show();
    this.requestEntListInfo(true);


  },
  getOptionNameAndIndex: function (optionList, subIndex, isIndustryId){
    for(var i = 0; i< optionList.length;i++){
      let obj = optionList[i];
      if (isIndustryId && i == subIndex){return obj.optionName}
      if(i == subIndex) return obj;
    }
    return "";
  },
  doNothingForCatch:function(){return}

})