 #ionicPayDemo
##cordova 支付插件，支付宝与微信支付
目前支持支付宝支付的安卓端与ios端，微信的ios端

使用方法：
支付宝：在调用时传入必要参数就可调起支付，无需修改其他配置文件，传参参考：controllers.js文件
常见问题：报String.length()调用空指针问题，检查rsa_private是否正确，是否是pkcs8格式

微信：
传参参考：controllers.js,另外修改plugin.xml里微信app_id,schema修改为app_id
安卓版：修改工程目录下config.xml中id为android项目实际包名，修改plugin.xml中的
target-dir="src/com/sharedParking/mz/wxapi"，
把其中com/sharedParking/zm改为自己的 包名。
再有 修改插件下WxPayEntryActivity.java中的包名，同上面两处一 致

