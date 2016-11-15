//
//  TableViewForTextField.h
//  ImageButton
//
//  Created by longmaster39 on 16/11/14.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TextFieldCell.h"

@interface TableViewForTextField : UIView<UITableViewDelegate,UITableViewDataSource>


@property (strong, nonatomic) NSMutableArray *titleArray;
@property (strong, nonatomic) NSMutableArray *placeholderArray;

@property(copy,nonatomic) void(^textFieldClick)(NSString *inputText, NSInteger index);

- (instancetype)initWithFrame:(CGRect)frame withTitles:(NSArray *)titleArray withPlaceholders:(NSArray *)placeholderArray;

- (void)setTitleArray:(NSArray *)titleArray withPlaceholderArray:(NSArray *)placeholderArray;

@end
