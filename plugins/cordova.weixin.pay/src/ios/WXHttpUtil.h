#import <Foundation/Foundation.h>

typedef void (^WXHttpCallback)(BOOL isSuccessed, NSDictionary *result);

@interface WXHttpUtil : NSObject

/**
 *  GET方法请求数据
 *
 *  @param url     请求的URL
 *  @param params  请求参数
 *  @param (BOOL isSuccessed, Result *result))callback  回调方法
 */
+ (void)doGetWithUrl:(NSString *)url path:(NSString *)path params:(NSDictionary *)params callback:(WXHttpCallback) callback;

/**
 *  请求WebService数据
 *
 *  @param baseUrl  请求的基础URL
 *  @param params   请求参数
 *  @param (BOOL isSuccessed, Result *result))callback  回调方法
 */
+ (void)doPostWithUrl:(NSString *)url path:(NSString *)path params:(NSDictionary *)params callback:(WXHttpCallback)callback;


@end
