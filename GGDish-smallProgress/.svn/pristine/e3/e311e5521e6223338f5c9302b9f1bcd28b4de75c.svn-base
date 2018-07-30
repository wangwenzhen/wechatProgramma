// pages/templateMessage/templateMessage.js

var app = getApp();
Page({

  data: {

    access_token:'',
    
  },

  onLoad: function (options) {
    var that = this;
      console.log('测试模板页');
      wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/token',
          method:'GET',
          data:{
              grant_type:'client_credential',
              appid:'wx2bbb5a2ebb85d6b7',
              secret:'eb97f33ffb508a90f09d02703e00801f',
          },
          success:function(res){

              console.log(res);
              //var access_token = 
              that.data.access_token = res.data.access_token;
              // this.sendMessage(access_token);

          },
          fail:function(res){
              console.log(res);
          }

      })
  },
  sendMessage:function(data){
    //发送模板消息
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.access_token,
      method: 'POST',
      data: {

        "touser": app.getOpenId(),
        "template_id": "LUFLmSVi1RyFHq1CvpN8MYvTMhbLovGeJJc7gxv5RLo",
        "page": "pages/main/home/home",
        "form_id": data.formId,
        "data": {
          "keyword1": {
            "value": "10010110101001",
            // "color": "#173177"
          },
          "keyword2": {
            "value": "2017年05月24日 14:37",
            // "color": "#173177"
          },
          "keyword3": {
            "value": "青牛饭店",
            // "color": "#173177"
          },
          "keyword4": {
            "value": "北京市海淀区裕惠大厦啦啦啦",
            // "color": "#173177"
          },
          "keyword5":{
            "value":"这是备注，哈哈哈哈哈哈哈"
          }
        },
        // "emphasis_keyword": "keyword1.DATA"
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
    console.log(e);
    this.sendMessage({
      formId: e.detail.formId,

    });


  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
})