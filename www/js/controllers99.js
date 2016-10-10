angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicLoading) {

  $scope.alipay = function(){
    alert("weixin demo");
    var myDate = new Date();
    var tradeNo = myDate.getTime();
    var alipayClass = navigator.alipay;
            var rsa = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAOSGOMKP+HBAv+ZzslMt1YQ0PvpyZ6XJTCaQVosEK3GW9UQxuLmQJXp+FoEsRltC5LfFHEChdXVQ0mI8HSAtCTuInmn0Tb/stFGv+X0FdTHosSzW07zuqRkMu6UvEXVh2RgvJ9kcCvR92Z3Q1cfrqDBvV7mBBpZXwFOQKyX+ajdbAgMBAAECgYAzvxDrPZ6MDJ1nmZsvqplGrm30WCOQLtzHfreaEv+jYQN4xamGm1VhP1vpNBVaZPNViZS0LdtjDUIWbHZL6ubD3sjcAZbyGpqe8zAWg2wvNk8LqhQ4GvFj9tqbLtSW3OC69qllaALmXIVB5ezCP6wsjlpwf+89hrlhhQ1Vu2JfAQJBAPO6WTEZGxixAjGG0qbiH1YjP1lBF9iJ0M8w9/viyEpgjX5ZEBWnMCmILxqk4zdoGX/VO4YBSD3/9s+FnvuQK2sCQQDwB+YTnKLejs6ie+Hsz7/dPtEKwR1xCrz9HitP5DFp3fp8Sl4vO+lTJtDqp/0xT3km3gJsvdyx/X6XQ8WD4o/RAkABprWL+5uPY0OciklLECUeNEbtl99NfEGJ5c8ISdUJi/XpcTkGrIdLAL0w9QUFDxN9JjitA701jlJhvYoCMkvZAkACCj8lWYZ018ffz6e66IUb70W9jqieZlX23MPHeQwGd1GCrusgAaVZBJJv/B+FxMQl1Ws122M9zAbAaF4MYeeRAkBKMZfAyW50O2E2p4G3NUQ7SU+Z8btgzzN8oWh7EIH2au+d8ySGS/F/6Qmy3WVpMTDOXnGFkKdSv6C+sDRw2AsL";
            var pubRsa="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkhjjCj/hwQL/mc7JTLdWEND76cmelyUwmkFaLBCtxlvVEMbi5kCV6fhaBLEZbQuS3xRxAoXV1UNJiPB0gLQk7iJ5p9E2/7LRRr/l9BXUx6LEs1tO87qkZDLulLxF1YdkYLyfZHAr0fdmd0NXH66gwb1e5gQaWV8BTkCsl/mo3WwIDAQAB";
            alipayClass.pay({
                            "partner":"2088121651201573",    //商户ID
                            "rsa_private":rsa,               //私钥
                            "rsa_public":pubRsa,                //公钥
                            "seller":"heroisland@hi-coffice.com",    //收款支付宝账号或对应的支付宝唯一用户号
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
