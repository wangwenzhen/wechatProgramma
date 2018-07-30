function QnLoading(){
    function qnLoading(){
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        this.__page = curPage;
        curPage.qnLoading = this;
        
        return this;
    }
    qnLoading.prototype.show = function(){
        let page = this.__page;
        page.setData({
            endLoadingData:false,
            loadError : false
        });
    }
    qnLoading.prototype.hide = function(){
        let page = this.__page;
        page.setData({
            endLoadingData:true
        });
    }
    qnLoading.prototype.loadError = function(){
        let page = this.__page;
        page.setData({
            endLoadingData:true,
            loadError : true
        });
    }
 

    return new qnLoading();
}
module.exports = {
    loading: QnLoading
}