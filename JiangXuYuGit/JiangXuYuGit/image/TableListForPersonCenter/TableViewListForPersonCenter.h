//
//  TableViewListForPersonCenter.h
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TableListProperty.h"
#import "TableListCell.h"

@protocol TableViewListProtocol <NSObject,UITableViewDelegate>



@end

@interface TableViewListForPersonCenter : UIView<UITableViewDataSource, UITableViewDelegate>

@property (weak, nonatomic) id<TableViewListProtocol> tableViewListDelegate;

@property (strong, nonatomic) NSArray *rightTitleArray;  //用于跟新右侧label数据

- (void)reloadData;


/*!
 *  以下两种方法必须进行设置
 */
- (instancetype)initWithTableViewFrame:(CGRect)frame withHeightForCell:(CGFloat)heightForCell;

- (void)setTableDataWithLeftImgArray:(NSArray *)leftImgArray withLeftTitleArray:(NSArray *)leftTitleArray withRightImgArray:(NSArray *)rightImgArray withRightTitleArray:(NSArray *)rightTitleArray;

/*!
 *  以下几种方法可选择性设置，不设置的话将采用默认样式
 */
//设置tableView的背景颜色
- (void)setTableViewBackgroundColor:(UIColor *)bGColor;


//设置cell的背景颜色
- (void)setCellBackgroundColor:(UIColor *)bGColor;


//设置tableView的tableHeaderView及tableFooterView
- (void)setHeaderViewAndFooterViewWithHeaderView:(UIView *)headerView withFooterView:(UIView *)footerView;


//自定义分割线
- (void)setSeparatorLineWithDistanceLeft:(CGFloat)distanceLeft withDistanceRight:(CGFloat)distanceRight withColor:(UIColor *)color;


//自定义cell中的字体大小及颜色
- (void)setCellLabelWithLeftTitleFont:(UIFont *)leftTitleFont withLeftTitleFontColor:(UIColor *)leftTitleFontColor withRightTitleFont:(UIFont *)rightTitleFont withRightTitleFontColor:(UIColor *)rightTitleFontColor;

@end
