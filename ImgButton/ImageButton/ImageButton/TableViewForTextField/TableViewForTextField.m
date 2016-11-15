//
//  TableViewForTextField.m
//  ImageButton
//
//  Created by longmaster39 on 16/11/14.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "TableViewForTextField.h"

#define IDENTIFIER @"TableViewForTextFieldCell"
#define CELL_HEIGHT 60
#define LABEL_FONT 18


@implementation TableViewForTextField
{
    UITableView *_tableView;
    CGRect _selfFrame;
}

- (instancetype)initWithFrame:(CGRect)frame withTitles:(NSArray *)titleArray withPlaceholders:(NSArray *)placeholderArray
{
    self = [super initWithFrame:frame];
    if (self) {
        _titleArray = [NSMutableArray arrayWithArray:titleArray];
        _placeholderArray = [NSMutableArray arrayWithArray:placeholderArray];

        _tableView = [self tableview];
        [self setUpForDismissKeyboard];
        [self addSubview:_tableView];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(upViews:) name:UIKeyboardWillShowNotification object:nil];
        
    }
    return self;
}

- (void)setTitleArray:(NSArray *)titleArray withPlaceholderArray:(NSArray *)placeholderArray
{
    if (_titleArray) {
        [_titleArray removeAllObjects];
    } else {
        _titleArray = [NSMutableArray new];
    }
    
    if (_placeholderArray) {
        [_placeholderArray removeAllObjects];
    } else {
        _placeholderArray = [NSMutableArray new];
    }
    
    _titleArray = [NSMutableArray arrayWithArray:titleArray];
    _placeholderArray = [NSMutableArray arrayWithArray:placeholderArray];
    
    [_tableView reloadData];
    [self changSubviewFrame];
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    _tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;  // 解决模拟器上分割线不显示问题
}

- (void)changSubviewFrame
{
    self.frame = CGRectMake(_selfFrame.origin.x, _selfFrame.origin.y, _selfFrame.size.width, _titleArray.count * CELL_HEIGHT);
    _tableView.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
}

- (CGFloat)calculateTitleWidthForCell:(NSMutableArray *)array
{
    CGSize labelSize = [array[0] sizeWithAttributes:[NSDictionary dictionaryWithObjectsAndKeys:[UIFont systemFontOfSize:LABEL_FONT],NSFontAttributeName, nil]];
    for (int i = 0; i < array.count; i++) {
        CGSize newSize = [array[i] sizeWithAttributes:[NSDictionary dictionaryWithObjectsAndKeys:[UIFont systemFontOfSize:LABEL_FONT],NSFontAttributeName, nil]];
        if (newSize.width > labelSize.width) {
            labelSize = newSize;
        }
    }
    return labelSize.width;
}

- (UITableView *)tableview
{
    UITableView *tableview  = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height) style:UITableViewStylePlain];
    tableview.bounces = NO;
    tableview.showsHorizontalScrollIndicator = NO;
    tableview.showsVerticalScrollIndicator = NO;
    tableview.dataSource = self;
    tableview.delegate = self;
    tableview.scrollEnabled = NO;
    tableview.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
    tableview.layer.borderWidth = 0.5;
    tableview.layer.borderColor = [[UIColor grayColor] CGColor];

    if ([tableview respondsToSelector:@selector(setSeparatorInset:)]) {
        [tableview setSeparatorInset:UIEdgeInsetsZero];
    }
    if ([tableview respondsToSelector:@selector(setLayoutMargins:)]) {
        [tableview setLayoutMargins:UIEdgeInsetsZero];
    }
    
    [self addSubview:tableview];
    
    return tableview;
}

#pragma mark - TableViewDelegate&&DataSource
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return _titleArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *str = IDENTIFIER;
    
    TextFieldCell *cell = [tableView dequeueReusableCellWithIdentifier:str];
    
    if (cell == nil) {
        cell = [[TextFieldCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:str];
    }
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    cell.title = _titleArray[indexPath.row];
    cell.placeholder = _placeholderArray[indexPath.row];
    cell.defaultTitleWidth = [self calculateTitleWidthForCell:_titleArray];
    cell.textFieldClick = ^(NSString *inputText, BOOL isReturn){
        if (isReturn) {
            [self tapAnywhereToDismissKeyboard:nil];
        } else {
            if (self.textFieldClick) {
                self.textFieldClick(inputText,indexPath.row);
            }
        }
    };
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return CELL_HEIGHT;
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
    if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
        [cell setSeparatorInset:UIEdgeInsetsZero];
    }
    
    if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
        [cell setLayoutMargins:UIEdgeInsetsZero];
    }
}

#pragma mark - 键盘相关处理
-(void)upViews:(NSNotification *) notification{
    CGFloat kbHeight = [[notification.userInfo objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue].size.height;
    double duration = [[notification.userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
    CGFloat offset = (_tableView.frame.origin.y + _tableView.frame.size.height) - (self.superview.frame.size.height - kbHeight) + 5;
    
    if (offset > 0) {
        [UIView animateWithDuration:duration animations:^{
            self.superview.frame = CGRectMake(0.0f, -offset, self.superview.frame.size.width, self.superview.frame.size.height);
        }];
    }
}

- (void)setUpForDismissKeyboard {
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    UITapGestureRecognizer *singleTapGR =
    [[UITapGestureRecognizer alloc] initWithTarget:self
                                            action:@selector(tapAnywhereToDismissKeyboard:)];
    NSOperationQueue *mainQuene =[NSOperationQueue mainQueue];
    [nc addObserverForName:UIKeyboardWillShowNotification
                    object:nil
                     queue:mainQuene
                usingBlock:^(NSNotification *note){
                    [self.superview addGestureRecognizer:singleTapGR];
                }];
    [nc addObserverForName:UIKeyboardWillHideNotification
                    object:nil
                     queue:mainQuene
                usingBlock:^(NSNotification *note){
                    [self.superview removeGestureRecognizer:singleTapGR];
                }];
}

- (void)tapAnywhereToDismissKeyboard:(UIGestureRecognizer *)gestureRecognizer
{
    CGRect viewFrame = self.superview.frame;
    viewFrame.origin.y = 0;
    self.superview.frame = viewFrame;
    
    [self.superview endEditing:YES];
}


@end
