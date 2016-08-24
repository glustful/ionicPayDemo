angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicLoading) {

  $scope.alipay = function(){
    alert("alipay demo");
    var myDate = new Date();
    var tradeNo = myDate.getTime();
    var alipayClass = navigator.alipay;
            var rsa = "";
            var pubRsa="";
            alipayClass.pay({
                            "partner":"",    //商户ID
                            "rsa_private":rsa,               //私钥
                            "rsa_public":pubRsa,                //公钥
                            "seller":"",    //收款支付宝账号或对应的支付宝唯一用户号
                            "subject":"车11111",             //商品名称
                            "body":"支付宝支付",        //商品详情
                            "price":"0.01",                  //金额
                            "tradeNo":tradeNo,             
                            "timeout":"30m",                 //超时设置
                            "notifyUrl":"http://www.baidu.com"
    },function(resultStatus){
      $ionicLoading.show({
        template:"支付宝测试返回结果＝" + resultStatus,
        noBackdrop: true,
        duration: 500
      });
    },function(message){
      $ionicLoading.show({
        template:"支付宝支付失败＝" + message,
        noBackdrop: true,
        duration: 500
      });
    });
  };
  $scope.wxpay = function(){
    alert("wxpay demo");
    
    var weixin = navigator.weixin;
    weixin.sendPayReq({
        "appid":"wxb4ba3c02aa476ea1",
        "urlString":"http://wxpay.weixin.qq.com/pub_v2/app/app_pay.php?plat=ios",
        "method":"get",
        "data":{}
    },function(retcode){
        
        alert("success:"+retcode);
    },function(message){
        alert("sendPayReq:"+ message);
    });
  };
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
