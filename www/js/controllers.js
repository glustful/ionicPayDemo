angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicLoading) {

  $scope.alipay = function(){
    alert("weixin demo");
    var myDate = new Date();
    var tradeNo = myDate.getTime();

    var alipayClass = navigator.alipay;
    var rsa ="MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAN2G9VHLDQyeogKbaHSPf89a9u8symYSKM1ucaGlGRf0vUxO2SWn0YCFF0Z3c1cx0kISQRtzH2r1vb0FGsEwoQuEXq0FCEbbxQ1/E/ehTX0wPxrfADz5pVWvWzehQT7DS/IWbsSQOnUxMHKcN2Q3Uy3R02JrErSaJMj5gxCq1B/bAgMBAAECgYAQV9uTbDqLOszTCmobZ1bTkm9zV8ea3i4acdJ6TXbbeJfaoFqO16GyLJ95+GgO/8L2UuhwwP6JYpXb8xt1M0Q+NSK6b/QZLCEla+7qXoeEHJ2SAe56doK+QL34sI74inGHuYXFogT/vZN78f+f6wX6XQfS7OvTuicL66T7tabx0QJBAPEkexGhnxiuyt66kGp/LvuPe1rFtYv6zFt8qVL7lQ+YioU0AAHz9cfI4OvzoIG2Y0qy4p2d6T90dWzNh/PSvTMCQQDrLRY5KDlNULzgm/6sMi7ao7rdGfIQku85s5fBWDBuSH7BYqD8emYSjyVixc6wKhY98aSq14G0qHx+hju/tQK5AkEAiEQfL4VvTBlqFpbCiQu51vnrsQ3MW3+r/37giD4Wq6t9i2wpHPFpUC5Zu7v+VY5laY7QtFTJu8vpl0RFsSjDNQJAbYxTDczu5FT3pqkDuLKnoLEkGlo7p/zJ8tb1mdq6tKSQZwTKeNGLOpnzkE8UOHtiYPhu/CXnBYB2fXmJ24M2AQJALqxMOoK5m8ycrQr6onx3Q5TFsTvGoRX+SVtDzh2ON5J3MfL2FqnFx1bpNOtsMGKgP2/hgU1H47U9eywxXNHviA==";
    var pubRsa="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDI6d306Q8fIfCOaTXyiUeJHkrIvYISRcc73s3vF1ZT7XN8RNPwJxo8pWaJMmvyTn9N4HQ632qJBVHf8sxHi/fEsraprwCtzvzQETrNRwVxLO5jVmRGi60j8Ue1efIlzPXV9je9mkjzOmdssymZkh2QhUrCmZYI/FCEa3/cNMW0QIDAQAB";
    alipayClass.pay({
      "partner":"xxxxxxxxxxxxxxx",    //商户ID
      "rsa_private":rsa,               //私钥
      "rsa_public":pubRsa,                //公钥
      "seller":"xxxxxxxxxxxxxx",    //收款支付宝账号或对应的支付宝唯一用户号
      "subject":"共享停车",             //商品名称
      "body":"共享停车支付宝支付",        //商品详情
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
        "appid":"wx321a79afb040b14f",
        "urlString":"http://91tkp.com:3001/wxSign",
        "method":"post",
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
