//
//  MyPickView.m
//  ImageButton
//
//  Created by longmaster39 on 16/11/11.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "MyPickView.h"
#define IDENTIFIER @"MyPickCell"
#define CELL_HEIGHT 60
#define COUNT_SHOW_CELL 5
#define SELECT_INFO_LABEL_LEFT 20
#define SELECT_INFO_LABEL_HEIGHT 18
#define SELECT_INFO_LABEL_FONT 18

@implementation MyPickView
{
    CGRect _oldFrame;
    NSArray *_titleArray;
    UITableView *_tableView;
    BOOL isShowList;
    UITapGestureRecognizer *_disMissTap;
    UIView *_viewDisMiss;
    
    NSInteger _cellCount;
    
    UILabel *_selectCellInfoLabel;
}


- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _oldFrame= frame;
        _cellCount = 0;
        _tableView = [self tableview];
        [self addSubview:_tableView];
        
        [self touchOtherDisMiss];
    }
    return self;
}


- (void)layoutSubviews{
    [super layoutSubviews];
    _tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;  // 解决模拟器上分割线不显示问题
    [self.superview insertSubview:_viewDisMiss belowSubview:self];
}

- (void)setTitleArray:(NSArray *)titleArray
{
    _titleArray = titleArray;
    _cellCount = _titleArray.count;
    if (_selectCellInfoLabel) {
        _selectCellInfoLabel.text = _titleArray[0];
    }
    
    if (self.pickviewClick) {
        self.pickviewClick(_titleArray[0]);
    }
}

- (UITableView *)tableview
{
    UITableView *tableview  = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height) style:UITableViewStylePlain];
    tableview.bounces = NO;
    tableview.showsHorizontalScrollIndicator = NO;
    tableview.showsVerticalScrollIndicator = NO;
    tableview.dataSource = self;
    tableview.delegate = self;
    tableview.layer.borderWidth = 0.5;
    tableview.layer.borderColor = [[UIColor grayColor] CGColor];
    
    if ([tableview respondsToSelector:@selector(setSeparatorInset:)]) {
        [tableview setSeparatorInset:UIEdgeInsetsZero];
    }
    if ([tableview respondsToSelector:@selector(setLayoutMargins:)]) {
        [tableview setLayoutMargins:UIEdgeInsetsZero];
    }
    
    return tableview;
}

- (UIView *)tableHeaderView
{
    UIView *tableHeaderView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height)];
    tableHeaderView.backgroundColor = [UIColor whiteColor];
    tableHeaderView.layer.borderWidth = 0.5;
    tableHeaderView.layer.borderColor = [[UIColor grayColor] CGColor];
    
    _selectCellInfoLabel = [[UILabel alloc] initWithFrame:CGRectMake(SELECT_INFO_LABEL_LEFT, (_oldFrame.size.height - SELECT_INFO_LABEL_HEIGHT) / 2, _oldFrame.size.width - SELECT_INFO_LABEL_LEFT, SELECT_INFO_LABEL_HEIGHT)];
    _selectCellInfoLabel.font = [UIFont systemFontOfSize:SELECT_INFO_LABEL_FONT];
    if (_titleArray) {
        _selectCellInfoLabel.text = _titleArray[0];
    }
    
    
    [tableHeaderView addSubview:_selectCellInfoLabel];
    UITapGestureRecognizer* singleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleSingleTap:)];
    [tableHeaderView addGestureRecognizer:singleTap];
    
    return tableHeaderView;
}


- (void)touchOtherDisMiss
{
    CGRect frame = [UIScreen mainScreen].bounds;
    _viewDisMiss = [[UIView alloc] initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
    _viewDisMiss.backgroundColor = [UIColor clearColor];
    _viewDisMiss.hidden = YES;
    _viewDisMiss.userInteractionEnabled = YES;
    _disMissTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onTapGesture:)];
    _disMissTap.delegate = self;
    [_viewDisMiss addGestureRecognizer:_disMissTap];
}


-(void)onTapGesture:(UITapGestureRecognizer *)tap{
    isShowList = NO;
    [self showList];
}


- (void)handleSingleTap:(UITapGestureRecognizer *)sender
{
    isShowList = !isShowList;
    [self showList];
}

- (void)showList
{
    if (isShowList) {
        _tableView.scrollEnabled = YES;
        [UIView animateWithDuration:0.5 animations:^{
            _viewDisMiss.hidden = NO;
            self.frame = CGRectMake(_oldFrame.origin.x, _oldFrame.origin.y, _oldFrame.size.width, _oldFrame.size.height + CELL_HEIGHT * _titleArray.count);
            if (_titleArray.count > COUNT_SHOW_CELL) {
                _tableView.frame = CGRectMake(0, 0, _oldFrame.size.width, _oldFrame.size.height + CELL_HEIGHT * (COUNT_SHOW_CELL + 1));
            } else {
                _tableView.frame = CGRectMake(0, 0, _oldFrame.size.width, _oldFrame.size.height + CELL_HEIGHT * _titleArray.count);
            }
        }];
    } else {
        _tableView.scrollEnabled = NO;
        [UIView animateWithDuration:0.5 animations:^{
            _viewDisMiss.hidden = YES;
            self.frame = _oldFrame;
            _tableView.frame = CGRectMake(0, 0, _oldFrame.size.width, _oldFrame.size.height);
        }];
    }
    
}

#pragma mark - TableViewDelegate&&DataSource
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return _cellCount;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *str = IDENTIFIER;
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:str];
    
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:str];
    }
    cell.textLabel.text = _titleArray[indexPath.row];
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return CELL_HEIGHT;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    _selectCellInfoLabel.text = _titleArray[indexPath.row];
    if (self.pickviewClick) {
        self.pickviewClick(_titleArray[indexPath.row]);
    }
    isShowList = NO;
    [self showList];
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    UIView *tableHeaderView = [self tableHeaderView];
    return tableHeaderView;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
    return self.frame.size.height;
}

- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
    if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
        [cell setSeparatorInset:UIEdgeInsetsZero];
    }
    
    if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
        [cell setLayoutMargins:UIEdgeInsetsZero];
    }
}


@end
