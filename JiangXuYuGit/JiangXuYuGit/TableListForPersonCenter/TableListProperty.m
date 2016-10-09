//
//  TableListProperty.m
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "TableListProperty.h"

@implementation TableListProperty

- (id)initWithTableDataWithLeftImg:(NSString *)leftImg withLeftTitle:(NSString *)leftTitle withRightImg:(NSString *)rightImg withRightTitle:(NSString *)rightTitle
{
    if (self = [super init]) {
        _leftImg = leftImg;
        _leftTitle = leftTitle;
        _rightImg = rightImg;
        _rightTitle = rightTitle;
    }
    return self;
}

- (void)dealloc
{
    self.leftImg = nil;
    self.leftTitle = nil;
    self.rightImg = nil;
    self.rightTitle = nil;
}

@end
