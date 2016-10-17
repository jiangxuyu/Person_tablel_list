//
//  JXYPingServicesView.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/13.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "JXYPingServicesView.h"
#import "STDebugFoundation.h"
#import "STDPingServices.h"

@implementation JXYPingServicesView
{
    UIButton *_pingButton;
    UIButton *_pingBaiduButton;
    
    STDebugTextView *_textView;
    STDebugTextView *_textView1;
    
    STDPingServices *_pingServices;
    STDPingServices *_pingServices1;

}

- (instancetype)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        _pingButton = [UIButton buttonWithType:UIButtonTypeCustom];
        _pingButton.frame = CGRectMake(0, 0, CGRectGetWidth(self.frame), 30);
        [_pingButton setTitle:@"PingServicesForSelf" forState:UIControlStateNormal];
        [_pingButton setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
        [_pingButton addTarget:self action:@selector(pingActionFired:) forControlEvents:UIControlEventTouchUpInside];
        _pingButton.tag = 10001;
        [self addSubview:_pingButton];
        
        _textView = [[STDebugTextView alloc] initWithFrame:CGRectZero];
        _textView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _textView.editable = NO;
        _textView.hidden = YES;
        [self addSubview:_textView];
        
        _pingBaiduButton = [UIButton buttonWithType:UIButtonTypeCustom];
        _pingBaiduButton.frame = CGRectMake(0, _pingButton.frame.origin.y + CGRectGetHeight(_pingButton.frame), CGRectGetWidth(self.frame), 30);
        [_pingBaiduButton setTitle:@"PingBaiduServices" forState:UIControlStateNormal];
        [_pingBaiduButton setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
        [_pingBaiduButton addTarget:self action:@selector(pingBaiduActionFired:) forControlEvents:UIControlEventTouchUpInside];
        _pingBaiduButton.tag = 10003;
        [self addSubview:_pingBaiduButton];
        
        _textView = [[STDebugTextView alloc] initWithFrame:CGRectZero];
        _textView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _textView.editable = NO;
        _textView1.hidden = YES;
        [self addSubview:_textView];
        
    }
    return self;
}

- (void)pingActionFired:(UIButton *)button
{
    if (button.tag == 10001) {
        [UIView animateWithDuration:0.5 animations:^{
            _textView.frame = CGRectMake(_pingButton.frame.origin.x, _pingButton.frame.origin.y + CGRectGetHeight(_pingButton.frame), CGRectGetWidth(_pingButton.frame), 200);
            _textView.hidden = NO;
            
        }];
        [button setTitle:@"Stop" forState:UIControlStateNormal];
        button.tag = 10002;
        _pingServices = [STDPingServices startPingAddress:@"test.iosask.cn" callbackHandler:^(STDPingItem *pingItem, NSArray *pingItems) {
            if (pingItem.status != STDPingStatusFinished) {
                [_textView appendText:pingItem.description];
            } else {
                [_textView appendText:[STDPingItem statisticsWithPingItems:pingItems]];
                [button setTitle:@"Ping" forState:UIControlStateNormal];
                button.tag = 10001;
                _pingServices = nil;
            }
        }];
    } else {
        [_pingServices cancel];
    }

}

- (void)pingBaiduActionFired:(UIButton *)button
{
    
}

@end
