//
//  TableListCell.m
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "TableListCell.h"

@implementation TableListCell
{
    CGFloat _separatorLineDistanceLeft;
    CGFloat _separatorLineDistanceRight;
    UIColor *_separatorLineColor;
    
    UIColor *_leftTitleFontColor;
    UIColor *_rightTitleFontColor;
    UIFont *_leftTitleFont;
    UIFont *_rightTitleFont;
}

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    
    if (self) {
        _leftImg = [[UIImageView alloc] initWithFrame:CGRectZero];
        [self addSubview:_leftImg];
        
        _leftTitle = [[UILabel alloc] initWithFrame:CGRectZero];
        _leftTitle.textColor = [UIColor redColor];
        _leftTitle.frame = CGRectMake(55, 50, 200, 25);
        [self addSubview:_leftTitle];
        
        _rightTitle = [[UILabel alloc] initWithFrame:CGRectZero];
        _rightTitle.textColor = [UIColor redColor];
        _rightTitle.font = [UIFont systemFontOfSize:15];
        _rightTitle.frame = CGRectMake(55, 50, 200, 25);
        [self addSubview:_rightTitle];
        
        _rightImg = [[UIImageView alloc] initWithFrame:CGRectZero];
        [self addSubview:_rightImg];
        
        _separatorLine = [[UILabel alloc] initWithFrame:CGRectZero];
        [self addSubview:_separatorLine];
        
        //设置默认样式的默认值
        _leftTitleFont = [UIFont systemFontOfSize:15];
        _leftTitleFontColor = [UIColor colorWithRed:51.0 / 255.0f green:51.0 / 255.0f blue:51.0 / 255.0f alpha:1];
        
        _rightTitleFont = [UIFont systemFontOfSize:15];
        _rightTitleFontColor = [UIColor colorWithRed:153.0/ 255.0f green:153.0 / 255.0f blue:153.0 / 255.0f alpha:1];
        
        _leftDistanceX = 15;
        _rightDistanceX = 15;
        _leftCenterWidth = 15;
        _rightCenterWidth = 5;
        
        _separatorLineDistanceLeft = 55;
        _separatorLineDistanceRight = 0;
        _separatorLineColor = [UIColor colorWithRed:203.0 / 255.0f green:203.0 / 255.0f blue:208.0 / 255.0f alpha:1];
     }
    
    return self;
}

- (void)setCellLabelWithLeftTitleFont:(UIFont *)leftTitleFont withLeftTitleFontColor:(UIColor *)leftTitleFontColor withRightTitleFont:(UIFont *)rightTitleFont withRightTitleFontColor:(UIColor *)rightTitleFontColor{
    _leftTitleFont = leftTitleFont;
    _rightTitleFont = rightTitleFont;
    _leftTitleFontColor = leftTitleFontColor;
    _rightTitleFontColor = rightTitleFontColor;
}

- (void)setSeparatorLineWithDistanceLeft:(CGFloat)distanceLeft withDistanceRight:(CGFloat)distanceRight withColor:(UIColor *)color
{
    _separatorLineDistanceLeft = distanceLeft;
    _separatorLineDistanceRight = distanceRight;
    
    _separatorLineColor = color;
    
}


- (void)layoutSubviews
{
    [self refeshCell];
}

- (void)refeshCell
{
    [self setData];
    [self setAllCtlFrame];
}

- (void)setData
{
    _separatorLine.backgroundColor = _separatorLineColor;
    
    _leftImg.image = [UIImage imageNamed:self.property.leftImg];
    _leftTitle.text = self.property.leftTitle;
    _leftTitle.textColor = _leftTitleFontColor;
    _leftTitle.font = _leftTitleFont;
    
    _rightImg.image = [UIImage imageNamed:self.property.rightImg];
    _rightTitle.text = self.property.rightTitle;
    _rightTitle.textColor = _rightTitleFontColor;
    _rightTitle.font = _rightTitleFont;
}

- (void)setAllCtlFrame
{
    CGSize leftImgSize = [UIImage imageNamed:self.property.leftImg].size;
    CGSize rightImgSize = [UIImage imageNamed:self.property.rightImg].size;
    CGSize leftTitleSize = [self.property.leftTitle sizeWithAttributes:[NSDictionary dictionaryWithObjectsAndKeys:_leftTitleFont,NSFontAttributeName, nil]];
    CGSize rightTitleSize = [self.property.rightTitle sizeWithAttributes:[NSDictionary dictionaryWithObjectsAndKeys:_rightTitleFont,NSFontAttributeName, nil]];
    
    _separatorLine.frame = CGRectMake(_separatorLineDistanceLeft, self.frame.size.height - 0.5, self.frame.size.width - _separatorLineDistanceRight, 0.5);
    
    if (self.property.leftImg != nil && ![self.property.leftImg isEqualToString:@""]) {
        _leftImg.frame = (CGRect){_leftDistanceX, self.frame.size.height / 2 - leftImgSize.height / 2, leftImgSize.width, leftImgSize.height};
        if (self.property.leftTitle != nil && ![self.property.leftTitle isEqualToString:@""]) {
            _leftTitle.frame = (CGRect){_leftImg.frame.origin.x + leftImgSize.width + _leftCenterWidth, self.frame.size.height / 2 - leftTitleSize.height / 2, leftTitleSize.width, leftTitleSize.height};
        } else {
            [_leftTitle removeFromSuperview];
        }
    } else {
        [_leftImg removeFromSuperview];
        if (self.property.leftTitle != nil && ![self.property.leftTitle isEqualToString:@""]) {
            _leftTitle.frame = (CGRect){_leftDistanceX, self.frame.size.height / 2 - leftTitleSize.height / 2, leftTitleSize.width, leftTitleSize.height};
        } else {
            [_leftTitle removeFromSuperview];
        }
    }
    
    if (self.property.rightImg != nil && ![self.property.rightImg isEqualToString:@""]) {
        _rightImg.frame = (CGRect){self.frame.size.width - _rightDistanceX - rightImgSize.width, self.frame.size.height / 2 - rightImgSize.height / 2, rightImgSize.width, rightImgSize.height};
        if (self.property.rightTitle != nil && ![self.property.rightTitle isEqualToString:@""]) {
            _rightTitle.frame = (CGRect){_rightImg.frame.origin.x - _rightDistanceX - rightTitleSize.width, self.frame.size.height / 2 - rightTitleSize.height / 2, rightTitleSize.width, rightTitleSize.height};
        } else {
            [_rightTitle removeFromSuperview];
        }
    } else {
        [_rightImg removeFromSuperview];
        
        if (self.property.rightTitle != nil && ![self.property.rightTitle isEqualToString:@""]) {
            _rightTitle.frame = (CGRect){self.frame.size.width - _rightDistanceX - rightTitleSize.width, self.frame.size.height / 2 - rightTitleSize.height / 2, rightTitleSize.width, rightTitleSize.height};
        } else {
            [_rightTitle removeFromSuperview];
        }

    }
    
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
