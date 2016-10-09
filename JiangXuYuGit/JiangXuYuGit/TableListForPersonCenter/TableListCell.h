//
//  TableListCell.h
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TableListProperty.h"

@interface TableListCell : UITableViewCell

@property (nonatomic, strong) UIImageView *leftImg;

@property (nonatomic, strong) UILabel *leftTitle;

@property (nonatomic, strong) UIImageView *rightImg;

@property (nonatomic, strong) UILabel *rightTitle;

@property (nonatomic, strong) UIView *separatorLine;

@property (nonatomic, strong) TableListProperty *property;

@property (nonatomic, assign) CGFloat leftDistanceX;

@property (nonatomic, assign) CGFloat rightDistanceX;

@property (nonatomic, assign) CGFloat leftCenterWidth;

@property (nonatomic, assign) CGFloat rightCenterWidth;

- (void)setSeparatorLineWithDistanceLeft:(CGFloat)distanceLeft withDistanceRight:(CGFloat)distanceRight withColor:(UIColor *)color;

- (void)setCellLabelWithLeftTitleFont:(UIFont *)leftTitleFont withLeftTitleFontColor:(UIColor *)leftTitleFontColor withRightTitleFont:(UIFont *)rightTitleFont withRightTitleFontColor:(UIColor *)rightTitleFontColor;

@end
