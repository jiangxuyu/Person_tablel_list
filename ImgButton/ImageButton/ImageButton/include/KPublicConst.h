//
//  KPublicConst.h
//  BjcaSignSDK
//
//  Created by Chenfy on 16/7/11.
//  Copyright © 2016年 Chenfy. All rights reserved.
//

#ifndef KPublicConst_h
#define KPublicConst_h

/** 业务类型 */
typedef NS_ENUM(NSInteger ,BusinessSignetType) {
    /** 非证书相关业务 */
    BusinessSignetTypeNull,
    /** 用户注册 */
    BusinessSignetTypeRegist,
    /** 用户登录 */
    BusinessSignetTypeLogin,
    /** 用户找回 */
    BusinessSignetTypeFindBack,
    /** 用户签名 */
    BusinessSignetTypeSignData,
    /** 用户设置签章 */
    BusinessSignetTypeSetStamp
};
/** 证书类型 */
typedef NS_ENUM(NSInteger ,CertType) {
    /** RSA登录证书 */
    CertTypeLoginRSA,
    /** SM2登录证书 */
    CertTypeLoginSM2,
    /** RSA签名证书 */
    CertTypeSignRSA,
    /** SM2签名证书 */
    CertTypeSignSM2,
};
/** 用户信息类型 */
typedef NS_ENUM(NSInteger ,UserInfoTypeYWQ) {
    /** 证书下发机构分配的AppId */
    UserInfoTypeYWQAppId,
    /** 签名业务MsspId */
    UserInfoTypeYWQMsspId,
    /** 证书唯一标识OpenId */
    UserInfoTypeYWQOpenId,
    /** 证书用户名 */
    UserInfoTypeYWQUserName,
    /** 用户对应的ClientId */
    UserInfoTypeYWQClientId
};

/**
 *  业务回调函数
 *
 *  @param businessType 业务码
 *  @param sucess       操作结果
 *  @param errorMessage 错误消息
 *  @param backData     返回数据
 *  @param Pkcs7Sign    pkcs7签名
 */
typedef void(^SignetResponseBlock)(BusinessSignetType businessType,
                                   BOOL sucess,
                                   NSString *errorMessage,
                                   NSDictionary *result);
/**
 *  绑定回调block
 *
 *  @param sucess   返回绑定结果
 *  @param errorMsg 返回信息
 */
typedef void (^SignBindedBlock)(BOOL sucess ,NSString *errorMessage);

#endif /* KPublicConst_h */
