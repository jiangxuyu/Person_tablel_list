//
//  BjcaSignSDK.h
//  BjcaSignSDK
//
//  Created by Chenfy on 16/7/6.
//  Copyright © 2016年 Chenfy. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "KPublicConst.h"

@interface BjcaSignManager : NSObject

//证书相关操作回调block
@property(nonatomic,copy)SignetResponseBlock blockResponse;
//证书绑定回调block
@property(nonatomic,copy)SignBindedBlock blockBind;

//********************<初始化>*************************
/**
 *  初始化函数
 *
 *  @param containnerVC 所在控制器
 *
 *  @return 实例对象
 */
+ (instancetype)initWithContainnerVC:(UIViewController *)containnerVC;

//*********************************************************************
//++++++++++++ 医师sdk ++++++++++++++++
//*********************************************************************
/**
 *  推出医师SDK
 *
 *  @param clientId 厂商的ClientId
 */
- (void)startDoctor:(NSString *)clientId;

/**
 *  医网签签名
 *
 *  @param uniqueId 签名数据对应唯一标识
 *  @param block 回调block
 */
- (void)signRecipe:(NSString *)uniqueId userClientId:(NSString *)clientId response:(SignetResponseBlock)block;

//*********************************************************************
//++++++++++++ 患者sdk ++++++++++++++++
//*********************************************************************
/**
 *  推出患者SDK
 *
 *  @param clientId 厂商的ClientId
 */
- (void)startPatient:(NSString *)clientId;

/** 患者签名 */
/**
 *  患者sdk签名
 *
 *  @param uniqueId 处方唯一标识
 *  @param clientId 厂商的clientId
 *  @param block    回调函数
 */
- (void)signRequest:(NSString *)uniqueId userClientId:(NSString *)clientId response:(SignetResponseBlock)block;

/**
 *  Pkcs7验签
 *
 *  @param signedValue p7签名值
 *  @param originValue 签名原文
 *  @param isHash      是否hash
 *
 *  @return 验证结果    YES｜NO
 */
- (BOOL)verifySignP7:(NSString *)signedValue orgData:(NSString *)originValue isHash:(BOOL)isHash;

/**
 *  用户注销操作
 *
 *  clientID 用户厂商ClientID
 *
 *  @param block 回调函数
 */
- (void)revokePatient:(NSString *)clientId Response:(SignetResponseBlock)block;


//*********************************************************************
//++++++++++++ sdk 公用 ++++++++++++++++
//*********************************************************************

/**
 *  检测是否已经存在证书
 *
 *  @return 检测结果
 */
+ (BOOL)existsCert;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//*********************************************************************
//++++++++++++ sdk 私有 ++++++++++++++++
//*********************************************************************
/**
 *  检测是否安装医网签
 *
 *  @return 检测结果
 */
+ (BOOL)bjca_ywqInstalled;

//*****<证书下载 -- 根据手机号、clientId下载证书/TODO..需要调整>*************
/**
 *  医网签签发证书
 *
 *  @param phneNum  注册手机号
 *  @param clientId 厂商clientId
 *  @param block    回调函数
 */
- (void)bjca_signUserRegistPhone:(NSString *)phoneNum
                        clientId:(NSString *)clientId
                        response:(SignetResponseBlock)block;

/**
 *  医网签证书找回
 *
 *  @param phoneNum 注册手机号
 *  @param clientId 厂商clientId
 *  @param block    回调函数
 */
- (void)bjca_signFindBackPhone:(NSString *)phoneNum
                      clientId:(NSString *)clientId
                      Response:(SignetResponseBlock)block;

//*****<证书下载 -- 根据手机号下载证书/using>*************
/**
 *  医师证书新签发
 *
 *  @param appId      信步云分配的AppId
 *  @param activeCode 信步云激活码
 *  @param block      回调函数
 */
- (void)bjca_signUserRegistAppId:(NSString *)appId activeCode:(NSString *)activeCode response:(SignetResponseBlock)block;

/**
 *  医师证书找回
 *
 *  @param appId    信步云分配的appId
 *  @param userName 医师姓名
 *  @param cardNum  医师身份证号
 *  @param block    回调函数
 */
- (void)bjca_signFindBackAppId:(NSString *)appId userName:(NSString *)userName cardNum:(NSString *)cardNum response:(SignetResponseBlock)block;

//********************<3、证书绑定>******************************
//客户端下载完证书之后进行绑定
/**
 *  下载证书成功后绑定医网签－函数会自动判定是否绑定，如果已经绑定，则不会再次绑定
 *  证书找回与
 *
 *  如果绑定直接返回，不再次绑定,再次下载证书时会解绑
 *
 *  @param block 回调block
 */
- (void)bjca_BindedDoctorYWQResponse:(SignBindedBlock)block;
- (void)bjca_BindedPatientYWQResponse:(SignBindedBlock)block;

/**
 *  判定设备是否绑定
 *
 *  @return 检测结果
 */
+ (BOOL)bjca_isBinded;

//********************<医网签签名>******************************
/**
 *  医网签签名
 *
 *  @param jobId 签名业务Id <签名业务流水号>
 *  @param block 回调函数
 */
- (void)bjca_signSignJobId:(NSString *)jobId response:(SignetResponseBlock)block;
- (void)bjca_signSignJobId:(NSString *)jobId userClientId:(NSString *)clientId response:(SignetResponseBlock)block;

//*******************<6、数据获取 － 辅助功能>**************************
/**
 *  获取证书
 *
 *  @param type 证书类型
 *
 *  @return 证书base64格式string
 */
+ (NSString *)bjca_getCert:(CertType)type;

/**
 *  获取用户的一些信息
 *
 *  @param infoType 信息类型，枚举类型
 *
 *  @return 获取的信息返回值
 */
+ (NSString *)bjca_userInfo:(UserInfoTypeYWQ)infoType;

/**
 *  获取证书相关信息
 *
 *  @param certString 证书base64字符串数据
 *  @param infoType   信息类型
 *
 *  @return 返回信息
 */
+ (id)bjca_certInfo:(NSString *)certString infoType:(NSInteger)infoType;


//*********************************************************************
//++++++++++++ sdk 测试使用++++++++++++++++
//*********************************************************************
/**
 *  设置需要访问的url，内部使用,不对外开放
 *
 *  @param urlString url
 */
/** urlString Example: http://127.0.0.1:8080 */
- (BOOL)setAddress:(NSString *)urlString;



@end
