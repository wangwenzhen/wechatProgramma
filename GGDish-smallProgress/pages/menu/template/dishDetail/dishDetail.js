/**
 * 菜品详情页
 */
function dishDetailInit(){

    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];

    //隐藏菜品详情
    curPage.hintDishDetail = function(e){
        this.setData({'menu.showDishDetail':false})
    }
}
module.exports = {
  dishDetailInit : dishDetailInit,
}
