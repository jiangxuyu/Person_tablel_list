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
        [self touchOtherDisMiss];
        [self addSubview:_tableView];
    }
    return self;
}

- (void)layoutSubviews{
    [super layoutSubviews];
    [self.superview insertSubview:_viewDisMiss belowSubview:self];
}

- (void)setTitleArray:(NSArray *)titleArray
{
    _titleArray = titleArray;
    _cellCount = _titleArray.count;
    _selectCellInfoLabel.text = _titleArray[0];
    self.selectResult = _selectCellInfoLabel.text;
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
    
    tableview.tableHeaderView = [self tableHeaderView];
    
    [self addSubview:tableview];
    
    return tableview;
}

- (UIView *)tableHeaderView
{
    UIView *tableHeaderView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height)];
    tableHeaderView.layer.borderWidth = 0.5;
    tableHeaderView.layer.borderColor = [[UIColor grayColor] CGColor];
    
    _selectCellInfoLabel = [[UILabel alloc] initWithFrame:CGRectMake(SELECT_INFO_LABEL_LEFT, (_oldFrame.size.height - SELECT_INFO_LABEL_HEIGHT) / 2, _oldFrame.size.width - SELECT_INFO_LABEL_LEFT, SELECT_INFO_LABEL_HEIGHT)];
    _selectCellInfoLabel.font = [UIFont systemFontOfSize:SELECT_INFO_LABEL_FONT];
    
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
        [UIView animateWithDuration:0.5 animations:^{
            _viewDisMiss.hidden = NO;
            self.frame = CGRectMake(_oldFrame.origin.x, _oldFrame.origin.y, _oldFrame.size.width, _oldFrame.size.height + CELL_HEIGHT * _titleArray.count);
            _tableView.frame = CGRectMake(0, 0, _oldFrame.size.width, _oldFrame.size.height + CELL_HEIGHT * _titleArray.count);
        }];
    } else {
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
        cell.textLabel.text = _titleArray[indexPath.row];
    }
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return CELL_HEIGHT;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    _selectCellInfoLabel.text = _titleArray[indexPath.row];
    self.selectResult = _selectCellInfoLabel.text;
    isShowList = NO;
    [self showList];
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
    if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
        [cell setSeparatorInset:UIEdgeInsetsZero];
    }
    
    if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
        [cell setLayoutMargins:UIEdgeInsetsZero];
    }
}


@end
