angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicLoading) {

  $scope.alipay = function(){
    alert("alipay demo");
    var myDate = new Date();
    var tradeNo = myDate.getTime();
    var alipayClass = navigator.alipay;
    var rsa = "";
    alipayClass.pay({
      "partner":"",
      "rsa_private":rsa,
      "rsa_public":rsa,
      "seller":"",
      "subject":"测试文件",
      "body":"alipay demo",
      "price":"0.01",
      "tradeNo":tradeNo,
      "timeout":"30m",
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
