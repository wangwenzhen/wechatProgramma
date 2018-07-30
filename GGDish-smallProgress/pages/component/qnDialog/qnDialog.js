var Utils = require('../../../utils/util.js');

function QnDialog() {

    var defaults={
        dialogTitle:'',
        dialogContent:'',
        cancelBtnTxt:'',
        confirmBtnTxt:'',
    }

    function Dialog() {
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        this.__page = curPage;
        curPage.Dialog = this;
        return this;
    }

    Dialog.prototype.setupDialog = function (content) {
        let page = this.__page;
        var param =  Utils.deepCopy(defaults);
        param = content;
        page.setData(param);
        page.hideDialog = function(){
            page.setData({
                showDialog:false
            });
        };
        page.catchEventToDoNothing = function(){};
      
    }
    /**
     * 展示 对话框
     */
    Dialog.prototype.show=function(){
        let page = this.__page;
        page.setData({
            showDialog:true
        });
    }
    /**
     * 隐藏 对话框
     */
    Dialog.prototype.hide=function(){
        let page = this.__page;
        page.setData({
            showDialog:false
        });
    }
    return new Dialog();
};

module.exports = {
    init: QnDialog
}