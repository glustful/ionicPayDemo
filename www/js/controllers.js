angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicLoading) {

  $scope.alipay = function(){
    alert("alipay demo");
    var myDate = new Date();
    var tradeNo = myDate.getTime();
    var alipayClass = navigator.alipay;
    var rsa = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMXAqtjyjgaYxlAu0gV8yRCzmpZ1/a5p+pS7QGk0UN8GtKehze3lz32ZiGiTzm1egnKSBhYnQVnORIIPVR6etyCOjH68B8bzI1z4qjrQSWun27xyzBrcx6E7MDScqSyTftxgLLxcqbeowom8VI9nBqjMpNbbK5Krg9XmdMVEUk8jAgMBAAECgYA1/+6nX1S5KG6+5oojRXgCP4kvHPkw72+lvZxRHiAXRtV+EQkStXZ7bbl6FSKBaxVkA8v1sLJ/u3upqFYuDlki5+aahz/9wDLk7QMJQ8SkCrwsaDn4STZ3JUICeZAbzN0iCpr9F1aaoN4ER44dbgGN7AKVEZNsEXXlRLowsK4GgQJBAONxJ+Lj+auEqJE8GoIEe6uyTosABqzKM0senJTCZFSJ1LRKmC1DYMYFlS0i1I9yHBsX8dJIVZJ5vjphtYPav6sCQQDelS6YrLa7iZMahxk6Rb3BVk06N2pQgixs57aI86MYuJ8xP0yMgA9eb/qLf3ogCOC6AvrykKW9WIBYp/vMYxZpAkEAvRnC2PFFD2cvo/k97OX/UQTiKs2tvxIqzYU5GLH7KxKh5/ixR8jieCICItH3uwBb/+bLp1N+2lcgY3gDrAo/GwJAJTyn8vrSB0XYylNXsRwBxtp9SQQEUTu12vJY40h/PJ+GYmLIl6jE6XOqYrQM5lcV4YimGvaAA9FOh4Zy5ZqeIQJBAMniFdq0DhQFOFqdpZGHbkpyBXY1vsqSU+VaHQVzXgJF83i5WRuEx97q7Knj+6UVGHLW++81G2+hWyHpe6YGjm4=";
    alipayClass.pay({
      "partner":"2088121342639696",
      "rsa_private":rsa,
      "rsa_public":rsa,
      "seller":"yncysuper@163.com",
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
