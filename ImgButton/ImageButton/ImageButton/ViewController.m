//
//  ViewController.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/10.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "ViewController.h"
#import "JXYImageButton.h"
#import "JXYPingServicesView.h"




@interface ViewController ()
{
    NSDate *_startDate;
    NSTimer *_timer;
    int _timesCount;
}

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    JXYImageButton *button = [[JXYImageButton alloc] initButtonWithFrame:CGRectMake(100, 100, 100, 100) withImage:[UIImage imageNamed:@"ucenter_account"] withTitle:@"ping start" withTitleTextFont:[UIFont systemFontOfSize:15] withTitleColor:[UIColor redColor] withSpaceBetweenImgAndTitle:10 withButtonStyle:ButtonStyleForTopImgBottomTitle];
    [button addTarget:self action:@selector(doSomething) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
    
}


- (void)doSomething
{
//    JXYPingServicesView *pingview = [[JXYPingServicesView alloc] initWithFrame:CGRectMake(0, 400, CGRectGetWidth(self.view.frame), CGRectGetHeight(self.view.frame))];
//    [self.view addSubview:pingview];
//    
//    self.simplePing = [[STSimplePing alloc] initWithHostName:@"test.iosask.cn"];
//    self.simplePing.addressStyle = STSimplePingAddressStyleAny;
//    self.simplePing.delegate = self;
//    
//    [self.simplePing start];
//    self.pinger = [[SimplePing alloc] initWithHostName:@"test.iosask.cn"];
//    self.pinger.addressStyle = STSimplePingAddressStyleAny;
//    self.pinger.delegate = self;
//    
//    self.pingerBaidu = [[SimplePing alloc] initWithHostName:@"www.baidu.com"];
//    self.pingerBaidu.addressStyle = STSimplePingAddressStyleAny;
//    self.pingerBaidu.delegate = self;
//    _timesCount = 0;
//    _timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(pingAddress) userInfo:nil repeats:YES];
//    
//    dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
//    dispatch_source_set_timer(timer, DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC, 0 * NSEC_PER_SEC);
//    dispatch_source_set_event_handler(timer, ^{
//        [self pingAddress];
//        [self pingBaiduAddress];
//        if (_timesCount >= 10) {
//            dispatch_cancel(timer);
//        }
//    });
//    dispatch_resume(timer);
    
//    dispatch_source_t timer1 = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, dispatch_get_main_queue());
//    dispatch_source_set_timer(timer1, DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC, 0 * NSEC_PER_SEC);
//    dispatch_resume(timer1);
//    dispatch_source_set_event_handler(timer1, ^{
//        [self pingBaiduAddress];
//        if (_timesCount >= 10) {
//            dispatch_cancel(timer1);
//        }
//
//    });
    JXYPingServices *pinger = [JXYPingServices sharedInstance];
    pinger.delegate = self;
    [pinger pingServicesWithPingAddress:@"test.iosask.cn"];

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
        ip = @"test.iosask.cn";
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
        ip = @"test.iosask.cn";
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }

    NSLog(@"Ping %@ Failed, Error is %@", ip, error);
}

- (void)simplePing:(SimplePing *)pinger didSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = @"test.iosask.cn";
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    NSLog(@"Send Packet Successed:ip=%@  sequenceNumber=%hu", ip, sequenceNumber);
}


- (void)simplePing:(SimplePing *)pinger didFailToSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber error:(NSError *)error
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = @"test.iosask.cn";
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    NSLog(@"Send Packet Failed:ip=%@  sequenceNumber=%hu error=%@", ip, sequenceNumber, error);
}



- (void)simplePing:(SimplePing *)pinger didReceivePingResponsePacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber
{
    NSString *ip;
    if (pinger == self.pinger) {
        ip = @"test.iosask.cn";
    } else if (pinger == self.pingerBaidu) {
        ip = @"www.baidu.com";
    }
    
    NSTimeInterval timeInterval = [[NSDate date] timeIntervalSinceDate:_startDate];
    NSLog(@"Receive Ping Response Packet:ip=%@ sequenceNumber=%hu timeInterval=%fms length=%lu", ip, sequenceNumber, timeInterval*1000, (unsigned long)packet.length);
    
}


- (void)simplePing:(SimplePing *)pinger didReceiveUnexpectedPacket:(NSData *)packet
{
//    NSString *ip;
//    if (pinger == self.pinger) {
//        ip = @"test.iosask.cn";
//    } else if (pinger == self.pingerBaidu) {
//        ip = @"www.baidu.com";
//    }
//    NSLog(@"Receives An Unmatched Packet:ip=%@  length=%lu", ip, (unsigned long)packet.length);

}


@end
