//
//  TextFieldCell.h
//  ImageButton
//
//  Created by longmaster39 on 16/11/14.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TextFieldCell : UITableViewCell<UITextFieldDelegate>

@property (strong, nonatomic) NSString *title;
@property (strong, nonatomic) NSString *placeholder;
@property (assign, nonatomic) CGFloat defaultTitleWidth;


@property(copy,nonatomic) void(^textFieldClick)(NSString *inputText, BOOL isReturn);

@end
