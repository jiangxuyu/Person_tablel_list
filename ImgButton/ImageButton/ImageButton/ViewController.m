//
//  ViewController.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/10.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "ViewController.h"
#import "JXYImageButton.h"


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
    UIWebView *view = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, 200, 400)];
    view.delegate = self;
    view.backgroundColor = [UIColor grayColor];
    NSURL *url = [NSURL URLWithString:@"http://10.254.33.109/help/question_pad.html"];
    [view loadRequest: [NSURLRequest requestWithURL:url]];
    [self.view addSubview:view];
}



@end
