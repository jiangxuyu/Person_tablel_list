//
//  ViewController.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/10.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "ViewController.h"
#import "JXYImageButton.h"
#import "MyPickView.h"
#import "TableViewForTextField.h"


@interface ViewController ()
{
    NSDate *_startDate;
    NSTimer *_timer;
    int _timesCount;
    TableViewForTextField *_table;
    
    MyPickView *_pickView;
}

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    JXYImageButton *button = [[JXYImageButton alloc] initButtonWithFrame:CGRectMake(0, 300, 100, 100) withImage:[UIImage imageNamed:@"ucenter_account"] withTitle:@"ping start" withTitleTextFont:[UIFont systemFontOfSize:15] withTitleColor:[UIColor redColor] withSpaceBetweenImgAndTitle:10 withButtonStyle:ButtonStyleForTopImgBottomTitle];
    [button addTarget:self action:@selector(doSomething) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
    _pickView = [[MyPickView alloc] initWithFrame:CGRectMake(10, 10, self.view.frame.size.width - 20, 40)];
    _pickView.pickviewClick = ^(NSString *result){
        NSLog(@"%@",result);
    };
    _pickView.titleArray = @[@"1",@"2",@"3"];
    [self.view addSubview:_pickView];
    
    _table = [[TableViewForTextField alloc] initWithFrame:CGRectMake(0, 200, self.view.frame.size.width, 120) withTitles:@[@"123",@"234"] withPlaceholders:@[@"123",@"234"]];
    _table.textFieldClick = ^(NSString *inputText, NSInteger index){
        NSLog(@"%@ ,index = %ld",inputText,index);
    };
    [self.view addSubview:_table];
    
}


- (void)doSomething
{
    [_table setTitleArray:@[@"变了吧",@"吧"] withPlaceholderArray:@[@"吧",@"吧"]];
}



@end
