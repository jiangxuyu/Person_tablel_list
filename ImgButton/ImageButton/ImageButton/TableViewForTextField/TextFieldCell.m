//
//  TextFieldCell.m
//  ImageButton
//
//  Created by longmaster39 on 16/11/14.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import "TextFieldCell.h"
#define LABELTITLE_LEFT 20
#define LABELTITLE_DISTANCE_TEXTFIELD 5
#define TEXT_FONT 18

@implementation TextFieldCell{
    UITextField *_cellTextField;
    UILabel *_labelTitle;
}


- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    
    if (self) {
        _labelTitle = [[UILabel alloc] initWithFrame:CGRectZero];
        _labelTitle.font = [UIFont systemFontOfSize:TEXT_FONT];
        [self addSubview:_labelTitle];
        
        _cellTextField = [[UITextField alloc] initWithFrame:CGRectZero];
        _cellTextField.font = _labelTitle.font;
        _cellTextField.delegate = self;
        [self addSubview:_cellTextField];
    }
    
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    [self refeshCell];
}

- (void)refeshCell
{
    [self setCtlFrame];
    [self setData];
}

- (void)setCtlFrame
{
    _labelTitle.frame = CGRectMake(LABELTITLE_LEFT, 0, self.defaultTitleWidth, self.frame.size.height);
    _cellTextField.frame = CGRectMake(_labelTitle.frame.origin.x + _labelTitle.frame.size.width + LABELTITLE_DISTANCE_TEXTFIELD, 0, self.frame.size.width - (_labelTitle.frame.origin.x + _labelTitle.frame.size.width + LABELTITLE_DISTANCE_TEXTFIELD), self.frame.size.height);
}

- (void)setData{
    _labelTitle.text = self.title;
    _cellTextField.placeholder = self.placeholder;
}

- (void)textFieldDidEndEditing:(UITextField *)textField
{
    if (textField == _cellTextField && self.textFieldClick) {
        self.textFieldClick(_cellTextField.text, NO);
    }
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    [textField resignFirstResponder];
    
    if (textField == _cellTextField && self.textFieldClick) {
        self.textFieldClick(_cellTextField.text, YES);
    }
    
    return YES;
}


- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
