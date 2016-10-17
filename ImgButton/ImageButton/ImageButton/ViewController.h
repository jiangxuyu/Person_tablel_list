//
//  ViewController.h
//  ImageButton
//
//  Created by longmaster39 on 16/10/10.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JXYPingServices.h"
#import "STSimplePing.h"
#import "SimplePing.h"


@interface ViewController : UIViewController<JXYPingServicesDelegate, STSimplePingDelegate, SimplePingDelegate>

@property(nonatomic, strong) STSimplePing *simplePing;

@property(nonatomic, strong) SimplePing *pinger;
@property(nonatomic, strong) SimplePing *pingerBaidu;



@end

