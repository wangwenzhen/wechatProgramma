// pages/order/leaveMessage/leaveMessage.js
Page({
    data:{
        defaultMessage:'',
        message:'',
        messageLength:0,
    },
    //设置默认值
    onLoad:function(options){
        if(options && options.message){
            var message = options.message;
            this.setData({ 
              defaultMessage:options.message,
              message: options.message,
              messageLength:options.message.length,
            });
        }
    },
    //根据数据文本的变化，改变界面展示
    inputMessage:function(event){
        this.setData({ 
           message: event.detail.value,
           messageLength:event.detail.value.length,
        });
        console.log(this.data.messageLength);
    },
     //将message存储并返回
    save:function(){
        let pages = getCurrentPages();
        let lastPage = pages[pages.length - 2];

        if (lastPage && lastPage.getPageName() === "CommitOrderPage"){
             lastPage.setData({'orderInfo.remark':this.data.message});
        }
        wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
        })
    }
})