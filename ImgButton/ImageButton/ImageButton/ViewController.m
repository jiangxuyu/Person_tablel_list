//
//  ViewController.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/10.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "ViewController.h"
#import "ImageButton.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
//    typedef enum {
//        ButtonStyleForTopImgBottomTitle = 0,      //上图下字
//        ButtonStyleForTopTitleBottomImg,          //上字下图
//        ButtonStyleForLeftImgRightTitle,          //左图右字
//        ButtonStyleForRightImgLeftTitle           //左字右图
//    }ButtonStyle;
    ImageButton *button = [[ImageButton alloc] initButtonWithFrame:CGRectMake(100, 100, 100, 100) withImage:[UIImage imageNamed:@"ucenter_account"] withTitle:@"我的账户" withTitleTextFont:[UIFont systemFontOfSize:15] withTitleColor:[UIColor redColor] withSpaceBetweenImgAndTitle:10 withButtonStyle:ButtonStyleForTopImgBottomTitle];
    [self.view addSubview:button];
    
    ImageButton *button1 = [[ImageButton alloc] initButtonWithFrame:CGRectMake(210, 100, 100, 100) withImage:[UIImage imageNamed:@"ucenter_account"] withTitle:@"我的账户" withTitleTextFont:[UIFont systemFontOfSize:15] withTitleColor:[UIColor redColor] withSpaceBetweenImgAndTitle:10 withButtonStyle:ButtonStyleForTopTitleBottomImg];
    [self.view addSubview:button1];
    
    ImageButton *button2 = [[ImageButton alloc] initButtonWithFrame:CGRectMake(100, 210, 100, 100) withImage:[UIImage imageNamed:@"ucenter_account"] withTitle:@"我的账户" withTitleTextFont:[UIFont systemFontOfSize:15] withTitleColor:[UIColor redColor] withSpaceBetweenImgAndTitle:10 withButtonStyle:ButtonStyleForLeftImgRightTitle];
    [self.view addSubview:button2];
    
    ImageButton *button3 = [[ImageButton alloc] initButtonWithFrame:CGRectMake(210, 210, 100, 100) withImage:[UIImage imageNamed:@"ucenter_account"] withTitle:@"我的账户" withTitleTextFont:[UIFont systemFontOfSize:15] withTitleColor:[UIColor redColor] withSpaceBetweenImgAndTitle:10 withButtonStyle:ButtonStyleForRightImgLeftTitle];
    [self.view addSubview:button3];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
