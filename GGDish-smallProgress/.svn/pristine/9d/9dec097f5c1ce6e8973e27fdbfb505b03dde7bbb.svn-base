var Map = require('../../utils/map.js'); 
var until = require('../../utils/util.js');
Page({
    data:{
        citys:[
            '南京市',
            '重庆市',
            '成都市',
            '北京市',
            '广州市'
        ],
        sugData:[

        ],
        content:'',
        isShowCityList : false,
        currentCity:'北京市',
    },
    onLoad:function(options){  
        this.setData({
            address:options.address,
            currentCity: wx.getStorageSync('currentCity') || '北京市'
        })
        Map.QnMap();
        this.Map.autoLocation();
    },
    POISearchForHotWords:function(e){
        this.Map.hotWordsLenovo(this.data.currentCity,e.detail.value);
        this.setData({content:e.detail.value});
    },
    cityListOperation :function(){
        this.setData({isShowCityList:!this.data.isShowCityList});
    },
    hiddenCityList:function(event){
        var choose_city = event.currentTarget.dataset.chooseCity;
        this.setData({isShowCityList:false,currentCity:choose_city});
        this.Map.hotWordsLenovo(this.data.currentCity,this.data.content);
        
    },
    focus : function (event){
        this.setData({isShowCityList:false});
    },
    reset: function(e){
        this.setData({ content : ''})
        this.Map.hotWordsLenovo(this.data.currentCity,this.data.content);
    },
    toHome:function(e){
        var lat = e.currentTarget.dataset.lat;
        var lng = e.currentTarget.dataset.lng;
        var name = e.currentTarget.dataset.regionname;
        wx.setStorageSync('longitude', lng)
        wx.setStorageSync('latitude', lat)
        wx.setStorageSync('locationRegion', name)//地区
        if (wx.getStorageSync('currentCity') != this.data.currentCity){
          wx.setStorageSync('currentCity', this.data.currentCity)//地区
        }
        wx.switchTab({
          url: '../main/home/home',
        });
        let pages = getCurrentPages();
        for(var i =0 ; i < pages.length;i++){
          let curPage = pages[i];
          if (curPage.getPageName && curPage.getPageName == 'home'){
              curPage.initData()//重新获取经纬度后刷新界面
          }
        }
    },
    catchTapEventDoNothing:function(e){/*阻断事件的传递*/},


});