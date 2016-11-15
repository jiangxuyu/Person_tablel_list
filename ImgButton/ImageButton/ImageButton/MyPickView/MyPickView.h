//
//  MyPickView.h
//  ImageButton
//
//  Created by longmaster39 on 16/11/11.
//  Copyright © 2016年 longmaster39. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MyPickView : UIView<UITableViewDelegate,UITableViewDataSource,UIGestureRecognizerDelegate>

@property (strong, nonatomic) NSArray *titleArray;
@property(copy,nonatomic) void(^pickviewClick)(NSString *result);

@end
