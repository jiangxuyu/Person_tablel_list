//
//  ImageButton.m
//  ImageButton
//
//  Created by longmaster39 on 16/10/10.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "ImageButton.h"

@implementation ImageButton
{
    ButtonStyle _buttonStyle;
    UIImageView *_btnImageView;
    UIImage *_btnImage;
    UILabel *_btnTitle;
    UIColor *_titleTextColor;
    UIFont *_titleFont;
    NSString *_btnTitleString;
    CGFloat _spaceBetweenImgAndTitle;
}

- (instancetype)initButtonWithFrame:(CGRect)frame withImage:(UIImage *)image withTitle:(NSString *)title withTitleTextFont:(UIFont *)font withTitleColor:(UIColor *)color withSpaceBetweenImgAndTitle:(CGFloat)distance withButtonStyle:(ButtonStyle)buttonStyle{
    self = [super initWithFrame:frame];
    if (self) {
        _btnImage = image;
        _btnTitleString = title;
        _titleFont = font;
        _titleTextColor = color;
        _buttonStyle = buttonStyle;
        _spaceBetweenImgAndTitle = distance;
        self.backgroundColor = [UIColor grayColor];
        
        [self initSubView];
    }
    return self;
}

- (void)initSubView
{
    _btnImageView  = [[UIImageView alloc] initWithFrame:CGRectZero];
    _btnImageView.image = _btnImage;
    [self addSubview:_btnImageView];
    
    _btnTitle = [[UILabel alloc] initWithFrame:CGRectZero];
    _btnTitle.text = _btnTitleString;
    _btnTitle.textColor = _titleTextColor;
    _btnTitle.font = _titleFont;
    [self addSubview:_btnTitle];
    
    [self setFrame];
}

- (void)setFrame
{
    CGSize imgSize = _btnImageView.image.size;
    CGSize titleSize = [_btnTitle.text sizeWithAttributes:[NSDictionary dictionaryWithObjectsAndKeys:_btnTitle.font,NSFontAttributeName, nil]];
    
    switch (_buttonStyle) {
        case ButtonStyleForTopImgBottomTitle:
        {
            _btnImageView.frame = (CGRect){self.frame.size.width / 2 - imgSize.width / 2, (self.frame.size.height - imgSize.height - titleSize.height - _spaceBetweenImgAndTitle) / 2, imgSize.width, imgSize.height};
            
            _btnTitle.frame = (CGRect){self.frame.size.width / 2 - titleSize.width / 2, _btnImageView.frame.origin.y + imgSize.height + _spaceBetweenImgAndTitle, titleSize.width, titleSize.height};

        }
            break;
            
        case ButtonStyleForTopTitleBottomImg:
        {
            _btnTitle.frame = (CGRect){self.frame.size.width / 2 - titleSize.width / 2, (self.frame.size.height - imgSize.height - titleSize.height - _spaceBetweenImgAndTitle) / 2, titleSize.width, titleSize.height};
            
            _btnImageView.frame = (CGRect){self.frame.size.width / 2 - imgSize.width / 2, _btnTitle.frame.origin.y + titleSize.height + _spaceBetweenImgAndTitle, imgSize.width, imgSize.height};
            
        }
            break;
            
            
        case ButtonStyleForLeftImgRightTitle:
        {
            _btnImageView.frame = (CGRect){(self.frame.size.width - imgSize.width - titleSize.width - _spaceBetweenImgAndTitle) / 2, self.frame.size.height / 2 - imgSize.height / 2, imgSize.width, imgSize.height};
            
            _btnTitle.frame = (CGRect){_btnImageView.frame.origin.x + imgSize.width + _spaceBetweenImgAndTitle, self.frame.size.height / 2 - titleSize.height / 2, titleSize.width, titleSize.height};
            
        }
            break;
            
            
        case ButtonStyleForRightImgLeftTitle:
        {
            _btnTitle.frame = (CGRect){(self.frame.size.width - imgSize.width - titleSize.width - _spaceBetweenImgAndTitle) / 2, self.frame.size.height / 2 - titleSize.height / 2, titleSize.width, titleSize.height};
            
            _btnImageView.frame = (CGRect){_btnTitle.frame.origin.x + titleSize.width + _spaceBetweenImgAndTitle, self.frame.size.height / 2 - imgSize.height / 2, imgSize.width, imgSize.height};

            
        }
            break;
            
        default:
            break;
    }
    
}



@end
