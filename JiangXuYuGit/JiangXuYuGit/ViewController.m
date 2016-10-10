//
//  ViewController.m
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "ViewController.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    TableViewListForPersonCenter *tableView = [[TableViewListForPersonCenter alloc] initWithTableViewFrame:CGRectMake(0, 10, self.view.frame.size.width, self.view.frame.size.height) withHeightForCell:44];
    tableView.tableViewListDelegate = self;
    
    [self.view addSubview:tableView];
    
    NSString *str = @"0.00";
    
    NSArray *array = @[@"我的帐户",@"联系我们",@"修改密码",@"常见问题",@"服务条款"];
    NSArray *imgArray = @[@"", @"ucenter_account_balance_right_arrow", @"ucenter_account_balance_right_arrow", @"ucenter_account_balance_right_arrow", @"ucenter_account_balance_right_arrow"];
    NSArray *rightTiltle = @[str,@"",@"",@"",@""];
    NSArray *leftArray = @[@"ucenter_account", @"ucenter_account", @"ucenter_account", @"ucenter_account", @"ucenter_account"];
    
    
    UIView *headerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, 200)];
    headerView.backgroundColor = [UIColor greenColor];
    CAGradientLayer *gradientLayer = [CAGradientLayer layer];
    gradientLayer.colors = @[(__bridge id)[UIColor redColor].CGColor, (__bridge id)[UIColor yellowColor].CGColor, (__bridge id)[UIColor blueColor].CGColor];
    gradientLayer.locations = @[@0.3, @0.5, @1.0];
    gradientLayer.startPoint = CGPointMake(0, 0);
    gradientLayer.endPoint = CGPointMake(1.0, 1.0);
    gradientLayer.frame = CGRectMake(0, 0, headerView.frame.size.width, headerView.frame.size.height);
    [headerView.layer addSublayer:gradientLayer];
    
    UIView *footerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, 200)];
    footerView.backgroundColor = [UIColor greenColor];
    
    
    [tableView setTableDataWithLeftImgArray:leftArray withLeftTitleArray:array withRightImgArray:imgArray withRightTitleArray:rightTiltle];
    
    //设置tableView的tableHeaderView及tableFooterView
    [tableView setHeaderViewAndFooterViewWithHeaderView:headerView withFooterView:footerView];
//
//    //自定义分割线
//    [tableView setSeparatorLineWithDistanceLeft:0 withDistanceRight:0 withColor:[UIColor redColor]];
//    
//    //自定义cell中的字体大小及颜色
//    [tableView setCellLabelWithLeftTitleFont:[UIFont systemFontOfSize:10] withLeftTitleFontColor:[UIColor redColor] withRightTitleFont:[UIFont systemFontOfSize:10] withRightTitleFontColor:[UIColor redColor]];
    
//    str = @"big";
//    tableView.rightTitleArray = @[str,@"",@"",@"",@""];
//    [tableView reloadData];
    
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    NSLog(@"点击了第%ld个cell",(long)indexPath.row);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
