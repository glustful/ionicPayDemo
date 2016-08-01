/
//  PayOrder.h
//  X5
//
//  Created by 007slm on 12/4/14.
//
//

#import <Foundation/Foundation.h>

@interface PayOrder : NSObject

@property (nonatomic,strong)NSString *accessToken;
@property NSString *nonceStr;
@property NSString *packageValue;
@property NSString *timeStamp;
@property NSString *productArgs;
@property NSString *prepayId;
@end
