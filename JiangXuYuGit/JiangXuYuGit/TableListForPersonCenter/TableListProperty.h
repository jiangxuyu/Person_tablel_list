//
//  TableListProperty.h
//  TableList
//
//  Created by longmaster39 on 16/9/30.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TableListProperty : NSObject

@property (nonatomic, strong) NSString *leftImg;

@property (nonatomic, strong) NSString *leftTitle;

@property (nonatomic, strong) NSString *rightImg;

@property (nonatomic, strong) NSString *rightTitle;

- (id)initWithTableDataWithLeftImg:(NSString *)leftImg withLeftTitle:(NSString *)leftTitle withRightImg:(NSString *)rightImg withRightTitle:(NSString *)rightTitle;

@end
