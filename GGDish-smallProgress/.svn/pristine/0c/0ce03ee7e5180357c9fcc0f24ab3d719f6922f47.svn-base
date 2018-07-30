var util = require('../../utils/util.js')
var constants = require('../../utils/constants.js')

//扫码
function scan(orderInfo){
  
    var that = this;
   
      wx.scanCode({

        success: function (res) {
          // success
          console.log(res);
          var resourceId = util.urlSearch(res.result, 'deskNum');
          console.log(resourceId);

          getDeskInfo(resourceId,orderInfo);
        },
        fail: function (res) {
          // 扫码失败
          console.log(res);
        },
        complete: function (res) {
          // complete

        }
      })


}
//获取桌位信息
var getDeskInfo=function (resourceId,orderInfo) {
    var that = this;
    wx.request({
      url: constants.IP + constants.URL_GetDeskInfoById,
      data: {
        entId: orderInfo.entId,
        resourceId: resourceId,
      },
      success: function (res) {
        //获取 桌位类型  桌位号
        var deskType = res.data.deskType;
        var deskNo = res.data.deskNumber;

        if (res.data.returnCode === constants.RETURN_OK) {

          console.log('获取桌位信息__成功');
          console.log(res);
          if (orderInfo.entId === res.data.entId) {

            if (deskType && deskNo) {

              if (deskType === "包间" || deskType === "1") {

                userArrive(resourceId,"1", deskNo, orderInfo);

              } else if (deskType == "散台" || deskType === "2") {

                userArrive(resourceId,"2", deskNo, orderInfo);

              }

            } else if (!deskType && !deskNo) {

              userArrive(resourceId,"", "", orderInfo);

            }

          } else {
            console.log("二维码错误!");

          }

        } else {
          console.log('获取桌位信息失败');
        }

      },
      fail: function (res) {
        //获取桌位信息失败
        console.log('获取桌位信息失败');
      },
    })
  }
//调用入座接口

var userArrive = function (resourceId,deskType, deskNo, orderInfo) {

  var that = this;
  console.log('start__开始执行入座');

  wx.request({
    url: constants.IP + constants.URL_SetOrderDeskInfo,
    data: {
      shopId: orderInfo.shopId,
      deskType: deskType,
      deskNo: deskNo,
    },
    success: function (res) {
      //入座成功 刷新数据
      if (res.data.returnCode === constants.RETURN_OK) {

        toCommitDetail(orderInfo.shopId, resourceId, getDeskInfoToShow(deskNo, deskType));

        console.log('入座__成功');
        
        console.log(res);
      } else {
        //入座失败
        console.log('入座__失败');
        console.log(res);
      }
    },
    fail: function (res) {
      //失败
      console.log('入座__fail()');
      console.log(res);
    }

  });

}  
var getDeskInfoToShow = function (deskType, deskNo) {
  var deskInfo = '';
  if (deskType == 1) {
    deskInfo = "包间" + deskNo; //包间
  } else if (deskType == 2) {
    deskInfo = "" + deskNo; //大厅
  }
  return deskInfo;
}

/**
 * deskNo:扫码得到的resourceId
 * deskInfo：拼接好的桌位信息
 */
var toCommitDetail = function (shopId,deskNo,deskInfo){
  wx.navigateTo({ url: '../commitOrder/commitOrder?shopId=' + shopId + "&deskNo=" + deskNo + "&deskInfo=" + deskInfo})

}


module.exports = {
  scanToSeat: scan,
}
