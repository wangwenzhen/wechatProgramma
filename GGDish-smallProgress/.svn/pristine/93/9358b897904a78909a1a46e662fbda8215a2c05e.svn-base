// pages/queryEnt/queryEnt.js
/******注意
 * 原查询指定商铺页 ，现舍弃，home 页直接集成该该功能
 */
var common = require('./common/common.js')
var qnLoading = require('../../component/qnLoading/qnLoading.js')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      searchValue:'',//搜索名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      qnLoading.loading();
      common.setUpEntListData();
      this.requestEntListInfo(true);
  },
  /**
   * 搜索商家
   */
  searchEnt:function(e){
    var entName = e.detail.value;
    this.setData({ searchValue:entName})
    /**
     * 查询商家
     */
    this.requestEntListInfo(true);
  },
  reset: function (e) {
    this.setData({ searchValue: '' })
    this.requestEntListInfo(true);
  },
    
})