#import "CDVWeixin.h"
#import "WXHttpUtil.h"

@implementation CDVWeixin



#pragma mark "API"

-(void)pluginInitialize{
}


-(void) prepareForExec:(CDVInvokedUrlCommand *)command{
    [WXApi registerApp:self.app_id];
    self.currentCallbackId = command.callbackId;
    if (![WXApi isWXAppInstalled])
    {
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"未安装微信"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        [self endForExec];
        return;
    }
}

-(NSDictionary *)checkArgs:(CDVInvokedUrlCommand *) command{
    // check arguments
    NSDictionary *params = [command.arguments objectAtIndex:0];
    if (!params)
    {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"参数错误"] callbackId:command.callbackId];
        
        [self endForExec];
        return nil;
    }
    return params;
}



-(void) endForExec{
    self.currentCallbackId = nil;
}




- (void)sendPayReq:(CDVInvokedUrlCommand *)command{
    NSDictionary *params = [self checkArgs:command];
    if(params == nil){
        return;
    }
    self.app_id = [params objectForKey:@"appid"];
    NSString *urlString = [params objectForKey:@"urlString"];
    NSString *method = [params objectForKey:@"method"];
    NSDictionary *postDict = [params objectForKey:@"data"];
    if (method == nil)
    {
        return;
    }
    method = [method lowercaseString];
    [self prepareForExec:command];
    if ([method isEqualToString:@"post"])
    {
        [WXHttpUtil doPostWithUrl:urlString
                       path:@""
                     params:postDict
                         callback:^(BOOL success,NSDictionary *dict){
                             [self dealWith:success dict:dict];
                         }];
    }else{
        [WXHttpUtil doGetWithUrl:urlString
                       path:@""
                     params:postDict
                        callback:^(BOOL success,NSDictionary *dict){
                            [self dealWith:success dict:dict];
                        }];
    }
    
   
}

-(void)dealWith:(BOOL) isSuccessed dict:(NSDictionary *)dict{
if(isSuccessed){
                           
        if(dict != nil){
            NSMutableString *retcode = [dict objectForKey:@"retcode"];
                if (retcode.intValue == 0){
                    NSMutableString *stamp  = [dict objectForKey:@"timestamp"];
                    
                    //调起微信支付
                    PayReq* req             = [[PayReq alloc] init];
                    req.partnerId           = [dict objectForKey:@"partnerid"];
                    req.prepayId            = [dict objectForKey:@"prepayid"];
                    req.nonceStr            = [dict objectForKey:@"noncestr"];
                    req.timeStamp           = stamp.intValue;
                    req.package             = [dict objectForKey:@"package"];
                    req.sign                = [dict objectForKey:@"sign"];
                    [WXApi sendReq:req];
                    //日志输出
                    NSLog(@"appid=%@\npartid=%@\nprepayid=%@\nnoncestr=%@\ntimestamp=%ld\npackage=%@\nsign=%@",[dict objectForKey:@"appid"],req.partnerId,req.prepayId,req.nonceStr,(long)req.timeStamp,req.package,req.sign );
                    return;
                }
            }
        }
                           
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"支付失败"];
        [self.commandDelegate sendPluginResult:result callbackId:self.currentCallbackId];
                      
        [self endForExec];
}



- (void)onResp:(BaseResp *)resp{
    CDVPluginResult *result = nil;
    if ([resp isKindOfClass:[PayResp class]])
    {
        
        PayResp *response = (PayResp *)resp;
        CDVPluginResult *result = nil;
        switch (response.errCode) {
            case WXSuccess:
                  result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"%d",response.errCode]];
                
                break;
                
            default:
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"%d",response.errCode]];
                
                break;
        }

       [self.commandDelegate sendPluginResult:result callbackId:[self currentCallbackId]];
        
    }
    [self endForExec];
}

#pragma mark "CDVPlugin Overrides"
- (void)handleOpenURL:(NSNotification *)notification{
    NSURL* url = [notification object];
    if ([url isKindOfClass:[NSURL class]] && [url.scheme isEqualToString:self.app_id])
    {
        [WXApi handleOpenURL:url delegate:self];
    }
}



@end
