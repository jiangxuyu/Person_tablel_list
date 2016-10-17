//
//  JXYPingServices.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/11.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "JXYPingServices.h"

static JXYPingServices* jxyPingServices;


@implementation JXYPingServices
{
    NSDate *_startDate;
    NSTimer *_timer;
    int _timesCount;
}

+ (id)sharedInstance
{
    @synchronized (jxyPingServices) {
        if (!jxyPingServices) {
            jxyPingServices = [[JXYPingServices alloc] init];
        }
    }
    
    return jxyPingServices;
}
- (void)pingServicesWithPingAddress:(NSString *)address
{
    self.ipAddress = address;
    
    _countOfReceivePingResponsePacketForBaidu = 0;
    _countOfReceivePingResponsePacket = 0;
    
    self.pinger = [[SimplePing alloc] initWithHostName:address];
    self.pinger.addressStyle = SimplePingAddressStyleAny;
    self.pinger.delegate = self;
    
    self.pingerBaidu = [[SimplePing alloc] initWithHostName:@"www.baidu.com"];
    self.pingerBaidu.addressStyle = SimplePingAddressStyleAny;
    self.pingerBaidu.delegate = self;
    
    dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
    dispatch_source_set_timer(timer, DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC, 0 * NSEC_PER_SEC);
    dispatch_source_set_event_handler(timer, ^{
        [self pingAddress];
        [self pingBaiduAddress];
        if (_timesCount >= 10) {
            dispatch_cancel(timer);
        }
    });
    dispatch_resume(timer);
}

- (void)pingAddress
{
    _timesCount++;
    [self.pinger stop];
    [self.pinger start];
}

- (void)pingBaiduAddress
{
    [self.pingerBaidu stop];
    [self.pingerBaidu start];
}


- (void)simplePing:(SimplePing *)pinger didStartWithAddress:(NSData *)address
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = self.ipAddress;
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    _startDate = [NSDate date];
    [pinger sendPingWithData:nil];
    NSLog(@"Ping %@", ip);
}


- (void)simplePing:(SimplePing *)pinger didFailWithError:(NSError *)error
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = self.ipAddress;
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    
    NSLog(@"Ping %@ Failed, Error is %@", ip, error);
}

- (void)simplePing:(SimplePing *)pinger didSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = self.ipAddress;
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    NSLog(@"Send Packet Successed:ip=%@  sequenceNumber=%hu", ip, sequenceNumber);
}


- (void)simplePing:(SimplePing *)pinger didFailToSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber error:(NSError *)error
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = self.ipAddress;
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    NSString *result = [NSString stringWithFormat:@"Send Packet Failed:ip=%@  sequenceNumber=%hu error=%@", ip, sequenceNumber, error];
    if (pinger == self.pinger) {
        [self returnResult:result forIPAddress:self.ipAddress];
    }

    NSLog(@"%@",result);
}



- (void)simplePing:(SimplePing *)pinger didReceivePingResponsePacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber
{
    NSString *ip;
    NSTimeInterval timeInterval = [[NSDate date] timeIntervalSinceDate:_startDate];
    if (pinger == self.pinger) {
        ip = self.ipAddress;
        _countOfReceivePingResponsePacket = _countOfReceivePingResponsePacket + 1;
        NSLog(@"Receive Ping Response Packet:ip=%@ sequenceNumber=%hu timeInterval=%fms length=%lu", ip, sequenceNumber, timeInterval*1000, (unsigned long)packet.length);
        if (_timesCount == 10) {
            float packetLossProbability = 0.00f;
            packetLossProbability = (10 - _countOfReceivePingResponsePacket) / 10;
            NSString *result = [NSString stringWithFormat:@"Result: ip=%@ 丢包率=%.2f%%", ip, packetLossProbability * 100];
            if (pinger == self.pinger) {
                [self returnResult:result forIPAddress:self.ipAddress];
            }
            NSLog(@"%@", result);
        }

    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
        _countOfReceivePingResponsePacketForBaidu = _countOfReceivePingResponsePacketForBaidu + 1;
        NSLog(@"Receive Ping Response Packet:ip=%@ sequenceNumber=%hu timeInterval=%fms length=%lu", ip, sequenceNumber, timeInterval*1000, (unsigned long)packet.length);
        if (_timesCount == 10) {
            float packetLossProbability = 0.00f;
            packetLossProbability = (10 - _countOfReceivePingResponsePacketForBaidu) / 10;
            NSString *result = [NSString stringWithFormat:@"Result: ip=%@ 丢包率=%.2f%%", ip, packetLossProbability * 100];
            NSLog(@"%@", result);
        }

    }
    
    
    
    
    
}

- (void)simplePing:(SimplePing *)pinger didReceiveUnexpectedPacket:(NSData *)packet
{
    
}


    
- (void)returnResult:(NSString *)result forIPAddress:(NSString *)address
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(getPingServicesResult:forPingAddress:)]) {
        [self.delegate getPingServicesResult:result forPingAddress:address];
    }
}


@end
