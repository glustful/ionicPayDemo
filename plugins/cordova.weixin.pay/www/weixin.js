/**
	

**/
var exec = require('cordova/exec');

module.exports = {
    sendPayReq: function(param,onSuccess,onError){
        exec(onSuccess, onError,"Weixin","sendPayReq",[param]);
    }
};