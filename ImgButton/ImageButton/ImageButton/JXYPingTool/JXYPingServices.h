//
//  JXYPingServices.h
//  ImageButton
//
//  Created by longmaster39 on 16/10/11.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SimplePing.h"

@protocol JXYPingServicesDelegate <NSObject>

@optional

- (void)getPingServicesResult:(NSString *)result forPingAddress:(NSString *)address;

@end

@interface JXYPingServices : NSObject<SimplePingDelegate>

@property(nonatomic,weak) id<JXYPingServicesDelegate>delegate;

@property(nonatomic, strong) NSString *ipAddress;

@property(nonatomic, strong) SimplePing *pinger;
@property(nonatomic, strong) SimplePing *pingerBaidu;

+ (id)sharedInstance;

@property(nonatomic, assign) float countOfReceivePingResponsePacket;
@property(nonatomic, assign) float countOfReceivePingResponsePacketForBaidu;


- (void)pingServicesWithPingAddress:(NSString *)address;

@end
