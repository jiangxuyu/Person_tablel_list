//
//  TableViewListForPersonCenter.m
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "TableViewListForPersonCenter.h"

#define IDENTIFIER @"TableListCell"

@implementation TableViewListForPersonCenter
{
    UITableView *_tableView;
    UIColor *_tableViewBackGroundColor;
    UIColor *_cellBackGroundColor;
    BOOL _setCellBGColor;
    CGFloat _heightForCell;
    
    NSArray *_leftImgArray;
    NSArray *_leftTitleArray;
    NSArray *_rightImgArray;
    
    NSMutableArray *_propertyArray;
    
    CGFloat _separatorLineDistanceLeft;
    CGFloat _separatorLineDistanceRight;
    UIColor *_separatorLineColor;
    
    BOOL _setSeparatorLine;
    
    UIColor *_leftTitleFontColor;
    UIColor *_rightTitleFontColor;
    UIFont *_leftTitleFont;
    UIFont *_rightTitleFont;
    
    BOOL _setCellLabel;
    
    TableListCell *_cell;
}

#pragma mark - 设置数据
- (instancetype)initWithTableViewFrame:(CGRect)frame withHeightForCell:(CGFloat)heightForCell{
    self = [super initWithFrame:frame];
    if (self) {
        _heightForCell = heightForCell;
        _propertyArray = [NSMutableArray new];
        _tableViewBackGroundColor = [UIColor colorWithRed:237.0 / 255.0f green:239.0 / 255.0f blue:242.0 / 255.0f alpha:1];
        
        [self createTableViewWithFrame:frame];
    }
    return self;
}

- (void)setTableDataWithLeftImgArray:(NSArray *)leftImgArray withLeftTitleArray:(NSArray *)leftTitleArray withRightImgArray:(NSArray *)rightImgArray withRightTitleArray:(NSArray *)rightTitleArray
{
    _leftImgArray = leftImgArray;
    _leftTitleArray = leftTitleArray;
    _rightImgArray = rightImgArray;
    _rightTitleArray = rightTitleArray;
    
    [self setProperty];
}

- (void)setTableViewBackgroundColor:(UIColor *)bGColor
{
    _tableViewBackGroundColor = bGColor;
}

- (void)setCellBackgroundColor:(UIColor *)bGColor
{
    _cellBackGroundColor = bGColor;
    
    _setCellBGColor = YES;
}

- (void)setHeaderViewAndFooterViewWithHeaderView:(UIView *)headerView withFooterView:(UIView *)footerView
{
    _tableView.tableHeaderView = headerView;
    _tableView.tableFooterView = footerView;
}

- (void)setSeparatorLineWithDistanceLeft:(CGFloat)distanceLeft withDistanceRight:(CGFloat)distanceRight withColor:(UIColor *)color
{
    _separatorLineDistanceLeft = distanceLeft;
    _separatorLineDistanceRight = distanceRight;
    _separatorLineColor = color;
    
    _setSeparatorLine = YES;
}

- (void)setCellLabelWithLeftTitleFont:(UIFont *)leftTitleFont withLeftTitleFontColor:(UIColor *)leftTitleFontColor withRightTitleFont:(UIFont *)rightTitleFont withRightTitleFontColor:(UIColor *)rightTitleFontColor{
    _leftTitleFont = leftTitleFont;
    _rightTitleFont = rightTitleFont;
    _leftTitleFontColor = leftTitleFontColor;
    _rightTitleFontColor = rightTitleFontColor;
    
    _setCellLabel = YES;
}


- (void)createTableViewWithFrame:(CGRect)frame
{
    _tableView = [[UITableView alloc] initWithFrame:frame style:UITableViewStylePlain];
    _tableView.bounces = NO;
    _tableView.showsHorizontalScrollIndicator = NO;
    _tableView.showsVerticalScrollIndicator = NO;
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    _tableView.dataSource = self;
    _tableView.delegate = self;
    _tableView.backgroundColor = _tableViewBackGroundColor;
    
    [self addSubview:_tableView];
}


#pragma mark - 将数组的数据封装进property
- (void)setProperty
{
    for (int i = 0; i < _leftTitleArray.count; i++) {
        TableListProperty *property = [[TableListProperty alloc] initWithTableDataWithLeftImg:_leftImgArray[i] withLeftTitle:_leftTitleArray[i] withRightImg:_rightImgArray[i] withRightTitle:_rightTitleArray[i]];
        [_propertyArray addObject:property];
    }
    
}

#pragma mark - TableViewDelegate&&DataSource
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return _propertyArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *str = IDENTIFIER;
    
    _cell = [tableView dequeueReusableCellWithIdentifier:str];
    
    if (_cell == nil) {
        _cell = [[TableListCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:str];
    }
    
    if (_setCellBGColor == YES) {
        _cell.backgroundColor = _cellBackGroundColor;
    }
    
    if (_setSeparatorLine == YES) {
        [_cell setSeparatorLineWithDistanceLeft:_separatorLineDistanceLeft withDistanceRight:_separatorLineDistanceRight withColor:_separatorLineColor];
    }
    
    if (_setCellLabel == YES) {
        [_cell setCellLabelWithLeftTitleFont:_leftTitleFont withLeftTitleFontColor:_leftTitleFontColor withRightTitleFont:_rightTitleFont withRightTitleFontColor:_rightTitleFontColor];
    }
    
    _cell.property = _propertyArray[indexPath.row];
    
    
    return _cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return _heightForCell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (self.tableViewListDelegate && [self.tableViewListDelegate respondsToSelector:@selector(tableView:didSelectRowAtIndexPath:)]) {
        [self.tableViewListDelegate tableView:tableView didSelectRowAtIndexPath:indexPath];
    }
}

- (void)reloadData
{
    if (_propertyArray) {
        [_propertyArray removeAllObjects];
    }
    [self setProperty];
    
    [_tableView reloadData];
}


@end
