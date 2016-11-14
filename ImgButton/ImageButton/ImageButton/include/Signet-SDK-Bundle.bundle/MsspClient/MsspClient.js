//////////////////////////////与手机原生交互接口/////////////////////

//调用IOS时方法的延时
timeDelay = 0;

//>>>>>>>>>>>>>>>>>>>>>>> Chenfy适配JS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//全部文档，最新文档点击事件
//function scroll_list_wd(obj){
//	$("."+obj).show();
//	$("."+obj).parent().children("img").attr("src","image/xljt02.png");
//	
//}
//function scroll_list_zxwd(obj){
//	alert(obj)
//	$("."+obj).hide();
//	$("."+obj).parent().children("img").attr("src","image/xljt01.png");
//	
//}
//$(document).ready(function(){
//	$(".scroll_list_wd_l li").click(function(){alert(this.index())});
//});

//底层菜单图标选中变化
function toON(i){
	 
	   $(".justified a").removeClass("on");
	   $(".justified a").eq(i).addClass("on");
}
function AlertWarning(msg)
{
    request('signet','alertWarnig',msg);
    //alert(msg);
}
  function AlertErr(msg)
  {

/* 	CloseWait();
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.alertTitle='详细信息';
	scope.errormsg=msg;
	scope.$apply();
	scope.$apply(function ()
		{
		  scope.Ui.turnOn('modalAlert');
		});
 */
      //alert(msg);
      request('signet','alertError',msg);
	
   }


	function CloseWait()
  {
	request('signet','stopProgressDialog','');
   }


  function ShowWait()
  {
	 request('signet','showProgressDialog','');

   }


  function request(sp ,invoke ,myJSONText)
  {
	// 1 android 2 ios
		try {
			window.signet.transmit(sp,invoke,myJSONText);
		} catch(Excep) {
			 window.location.href = "#/signet?" + invoke + ":?" + myJSONText;
		}
}

//Chenfy--为了解决调用多个函数冲突的问题，添加了num项，避免冲突

	Date.prototype.format = function (format) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		}
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}

	function getFormatDate(date, pattern) {
		if (date == undefined) {
			date = new Date();
		}
		if (pattern == undefined) {
			pattern = "yyyy-MM-dd ";
		}
		return date.format(pattern);
	}

	function compareDate(startTime,endTime){

		var remind_time=endTime-startTime;  //时间差的毫秒数
		if(remind_time<0){
			return "DOCU_OVERDUE";
		}

		var days=Math.floor(remind_time/(24*3600*1000));  //未过期则先计算出相差天数
		if(days!=0){                                      //非当天过期,则显示天数
			return "剩余"+days+"天";
		}

		var leave1=remind_time%(24*3600*1000);    //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000));    //一天内过期,则计算剩余小时数
		if(hours!=0){
			return "剩余"+hours+"小时";
		}

		var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000));    //一小时内过期,则计算剩余分钟数

		if(minutes!=0){
			return "剩余"+minutes+"分钟";
		}

		return "DOCU_OVERDUE";

	}

	function signSettingBack(){
	var scope = angular.element(document.getElementById("app-content")).scope();
	if(scope.signImage=="data:image/png;base64,null"){
		showNullImgErr();
		return;
	}
    //request('signet', 'pageback', '');
	request('signet','signSettingBack','');
	//history.go(-1);
	//void(0);

}
	
function pageBack(){
    request('signet', 'pageback', '');
}
//$scope.serverAddr="https://mssp.isignet.cn:443/MSSPServer/m/";

function showToast(msg){

	request('signet','showToast',msg);
}
	function testChangeServ(url){
		var scope=angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function(){
			scope.serverAddr=url;
		});
	}
	
	function back()
	{

	   var scope = angular.element(document.getElementById("app-content")).scope();
	   scope.$apply(function ()
	   {
		 scope.navHideBottom=false;
		 scope.navHideTop=false;
	   });
	  history.go(-1);
	 }
	 function showNullImgErr(){
		 request('signet','showNullImgErr','');
	 }

	 function loadIndexInfoCallBack(){
		 console.log("loadIndexInfoCallBack");
		 var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () 
		{   
			 scope.loadIndexInfoFunc();
		});
	 }

	function disPlaySMS(otp){
		
		var obj=document.getElementById("otp")
		obj.value=otp;
		
		var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () 
		{   
			  //中止倒计时
				scope.active_isDisabled = false;
		});
		
		
	}
	function userGetDeviceListCallBack(sResult,servURL){

		var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () {
			scope.userGetDeviceListCallBackFunc(sResult,servURL);
		});
	}

	function singDocuFinishCallBack(mDocuId){
		var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () 
		{
			scope.singDocuFinishCallBackFunc(mDocuId);
			
			
		});
	}

	function scanActiveCallBack(code){
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
	scope.login_active(true,code);
	});

	}

	function revertScreenCallBackIn(){
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
	scope.navHideBottom=false;
	scope.navHideTop=false;
	});
	}

	function revertScreenCallBackAndroid(sign_img){
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.signImage=sign_img;
	scope.$apply(function () {
				  scope.revertScreenCallBackFunc();
				 });
	}


	function revertScreenCallBack(){
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {

				 setTimeout(function(){
							scope.revertScreenCallBackFunc();
							},500);
				 });
}

	function captureIdCardCallBack(idCardStr,posPath,negPath){
		var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () {
			scope.idcardimg01=posPath;
			scope.idcardimg02=negPath;
			
			scope.captureIdCardCallBackFunc(idCardStr);
		});
	}
	
	function UploadIdPicFinishCallBack(posFileId,negFileId,appId,devInfoStr){
		var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () {
			scope.UploadIdPicFinishCallBackFunc(posFileId,negFileId,appId,devInfoStr);
		});
	}
	

 function userRegiestCallBack(sResult,servURL)
	{

	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
	scope.userRegiestCallBackFunc(sResult,servURL);
	});

  }

 function userActiveCallBack(sResult,servURL){

	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
	scope.userActiveCallBackFunc(sResult,servURL);
	});

 }

function userRequestCertCallBack(sResult,servURL){

		var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
	scope.userRequestCertCallBackFunc(sResult,servURL);
	});

}

	 function getSignImageFromPage(){
		  var scope = angular.element(document.getElementById("app-content")).scope();
		  return scope.signImage;
	 }
	 function saveSignImageInPage(imageCode){
		  var scope = angular.element(document.getElementById("app-content")).scope();
		  scope.updatepersonalsealFunc(imageCode);
	 }

function userEncPinCallBack(encPinObj){
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function(){
		scope.oldUserVerifyCallMSSP2(encPinObj);
	});
}

function revertClientScreen(){
	var scope = angular.element(document.getElementById("app-content")).scope();
		scope.$apply(function () {
		scope.revertScreen();
	});
}
function setUserDevInfoCallBack(devInfo, appVersion, app_id )
{
    var scope = angular.element(document.getElementById("app-content")).scope();
    if( appVersion != 'undefined ')
        scope.appVersion=appVersion;
    if( app_id != 'undefined ')
        scope.appId=app_id;
    scope.userDevInfo=devInfo;
    scope.deviceObject=JSON.parse(devInfo);
    var dev_name=scope.deviceObject.deviceName;
    scope.deviceObject.deviceName=dev_name;
    scope.localDeviceList.push(scope.deviceObject);
    
    //scope.$apply(function () {
    //             scope.registerOlderForshenzhen();
    //});
}

function getUserDevInfoCallBack(devInfo,appVersion,app_id){
	var scope = angular.element(document.getElementById("app-content")).scope();
    if( appVersion != 'undefined ')
        scope.appVersion=appVersion;
	if( app_id != 'undefined ')
        scope.appId=app_id;
	scope.userDevInfo=devInfo;
	scope.deviceObject=JSON.parse(devInfo);
	var dev_name=scope.deviceObject.deviceName;
	scope.deviceObject.deviceName=dev_name;
	scope.localDeviceList.push(scope.deviceObject);
	if(scope.needAutoLogin==1){
        scope.autoLoginFunc();
	}
}

function getUserBaseInfoCallBack(userBaseInfo){
	var scope = angular.element(document.getElementById("app-content")).scope();

	var baseInfoBean=JSON.parse(userBaseInfo);

	if(baseInfoBean.userSignImage!=null){
		scope.signImage=baseInfoBean.userSignImage;
	}

	console.log("getUserBaseInfoCallBack "+JSON.stringify(userBaseInfo));
	scope.userName=baseInfoBean.userName;
	scope.userMobile=baseInfoBean.userMobile;
	//lhk  给userMobile_hide赋值
	$scope.userMobile_hide=String($scope.userMobile).replace(String($scope.userMobile).substring(3,7),"****");
	
	scope.msspID=baseInfoBean.msspID;
	scope.appId=baseInfoBean.appId;
	if( baseInfoBean.checkFinger == '1')
	{
		scope.fingerVerify = true;
		$("#fingerid").addClass("active");
	}
}

function findBackPwdCallBack(){
	var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
		scope.findBackPwdCallBackFunc();
	});
}

function pdfviewIniCallBack(localPath){

	var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
		scope.pdfview_IniCallBackFunc(localPath);
	});
}

function delDeviceCallBack(del_dev){
	var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function () {
		scope.delDeviceCallBackFunc(del_dev);
	});
}

function signDataCallBack(param){
	console.log("signDataCallBack:"+param);
	var signDataBean=JSON.parse(param);
	var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function(){
		scope.signDataParam=param;
		if(signDataBean.uiType=="AUTH"){
			scope.uiType="确认登录";
			scope.authTitle="安全登录";
		}else{
			scope.uiType="确认签名";
			scope.authTitle="安全签名";
		}
		
		scope.appIconUrl=signDataBean.appIconURL;
		scope.appURL=signDataBean.appURL;
		scope.clientName=signDataBean.clientName;
		scope.appMemo=signDataBean.memo;
	});
}

function signDataFinishCallBack(){
	console.log("signDataFinishCallBack");
	var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function(){
		scope.signDataFinishCallBackFunc();
	});
}

function auth_page_ini(){
	console.log("auth_page_ini");
		var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function(){
	scope.navHideBottom=true;
	scope.navHideTop=false;
	});  
}

function checkOldUserCallBack(oldUserInfo,dev_info,app_version,app_id){
	
	
	var user=JSON.parse(oldUserInfo);
	var scope=angular.element(document.getElementById("app-content")).scope();
	
	scope.userDevInfo=dev_info;
	scope.appId=app_id;
	scope.appVersion=app_version;
	
	var DeviceInfo=eval("("+scope.userDevInfo+")");

	var Request=new Object();
	Request.name=user.name;
	scope.userName=user.name;
	Request.idCard=user.paperid;
	Request.idCardType='SF';
	Request.deviceInfo=DeviceInfo;
	Request.appId=scope.appId;
	//4 调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
	var msspurl=scope.serverAddr+"activeDevice";
	
	scope.checkOldUserCallBackFunc(msspurl,Request);
}

function delDevResultCallBack(del_dev){

	var delDevObj=JSON.parse(del_dev);
	
	var scope=angular.element(document.getElementById("app-content")).scope();
	
	scope.$apply(function(){
		for(var item in scope.deviceList){
							if(scope.deviceList[item].id==delDevObj.id){
								var index = scope.deviceList.indexOf(scope.deviceList[item]);
								if (index > -1) {
								scope.deviceList.splice(index, 1);
							}
						}
					}
	});
	
}

function GotoUserSetting()
{
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function()
	{
		scope.fingertosetting();
	})
}

/*add by kevin for fingerprint check callback*/
function FingerAlert(status)
{
	switch( status) {
		case '0':
		  showToast("验证成功");
		  break;
		case '1':
		  AlertErr("验证失败");
		  break;
		case '2':
		  AlertErr("设备不支持指纹验证");
		  break;
		case '3':
		  AlertErr("系统指纹不可用，请恢复");
		  break;
		case '4':
		  AlertErr("设备没有指纹");
		  break;
		case '5':
		  showToast("取消指纹验证");
		  break;
		default:
		  showToast(result);
		  break;
	}
}

function FingerCheckCallBack(status)
{
	FingerAlert(status);
	var scope = angular.element(document.getElementById("app-content")).scope();
	if( status != '0' ){
		scope.$apply(function () {
		  scope.removeFinger();
	   });
	}
}

function FingerSetCallBack(status)
{
	FingerAlert(status);
	var scope = angular.element(document.getElementById("app-content")).scope();

	if( status == '0' ){
		//check finger success,now check pin
		//alert("校验ｐｉｎ码");
		/*scope.$apply(function () {
		$("#fingerid").addClass("active");
		});
		*/
		request("signet", "setfinger", null );
	}else{
		//showToast("系统错误，请重试");
		scope.$apply(function () {
		  scope.removeFinger();
	   });
	}

}

function FingerSetPinCallBack( RequestStr )
{
	//alert(RequestStr);
	var scope = angular.element(document.getElementById("app-content")).scope();
	
	if( null == RequestStr ){
		AlertErr("获取口令失败");
		scope.$apply(function () {
          	scope.removeFinger();
	   });
		 
	}else{
		scope.pinVerifyCallMSSP(RequestStr);
	}

}

function FingerCancelCallBack(status)
{
	FingerAlert(status);
	var scope = angular.element(document.getElementById("app-content")).scope();

	if( status == '0' ){
		scope.$apply(function () {
           scope.removeFinger();
    	});
		//
		showToast("指纹签名设置已移除");
	}else{
		scope.fingerVerify = true;
		scope.$apply(function () {
		  $("#fingerid").addClass("active");
	   });
		
	}
}

function updatepersonalseal(imageCode){
	var scope=angular.element(document.getElementById("app-content")).scope();
	scope.$apply(function(){
		scope.updatepersonalsealFunc(imageCode);
	});
}

function showfingersetting( paramStr )
{
	//document.getElementById(objname).style.display="border-style:none;padding:14px 0 0;";
	//alert(paramStr);
	var scope = angular.element(document.getElementById("app-content")).scope();
	scope.$apply( function()
	{
	   scope.showfingerSettingDiv( paramStr );
	});
}
//register function call
function registerUser( username, userCardID, userDevInfo, userAppID )
{
    
    var scope = angular.element(document.getElementById("app-content")).scope();
    scope.$apply( function()
    {
        scope.oldUserCheckUserByApp( username, userCardID, userDevInfo, userAppID );
        
    });
    
}
//back for sdk
//function backframe(){
//    alert("into back");
//    var scope = angular.element(document.getElementById("app-content")).scope();
//    scope.$apply( function()
//    {
//        scope.localpageback();
//    });
//}
function setAccessToken( accessTokenStr ){
    var scope=angular.element(document.getElementById("app-content")).scope();
    scope.accessToken = accessTokenStr;
}
function setSignImageStr( imageStr ){
    var scope=angular.element(document.getElementById("app-content")).scope();
    scope.signImage = imageStr;
}
//function for 深圳卫生call
function checkOldUserCallBack(username,userCardID,dev_info,app_version,app_id, userPinStr){
    
    
    //var user=JSON.parse(oldUserInfo);
    var scope=angular.element(document.getElementById("app-content")).scope();
    
    scope.userDevInfo=dev_info;
    scope.appId=app_id;
    scope.appVersion=app_version;
    
    var DeviceInfo=eval("("+scope.userDevInfo+")");
    
    var Request=new Object();
    Request.name=username;
    scope.userName=username;
    Request.idCard=userCardID;
    Request.idCardType='SF';
    Request.deviceInfo=DeviceInfo;
    Request.appId=scope.appId;
    //4 调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
    var msspurl=scope.serverAddr+"activeDevice";
//    var inputpin = angular.element(document.getElementById("userpin2"));
//    //alert(inputpin);
//    inputpin.value="111111";
//    alert("ok");
    //alert(userPinStr);
    if( undefined == typeof(userPinStr) ){
        scope.shenzhensetpin="";
    }else{
        scope.shenzhensetpin="111111";
    }
    
    scope.checkOldUserCallBackFunc(msspurl,Request);
}
// Here is how to define your module
// has dependent on mobile-angular-ui

var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/home',          {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/olduser',       {templateUrl: 'olduser.html', reloadOnSearch: false});
  $routeProvider.when('/usersetting',   {templateUrl: 'usersetting.html', reloadOnSearch: false});
  $routeProvider.when('/pdfview',       {templateUrl: 'pdfview.html', reloadOnSearch: false});
  $routeProvider.when('/signdocu',      {templateUrl: 'signdocu.html', reloadOnSearch: false});
  $routeProvider.when('/active',        {templateUrl: 'active.html', reloadOnSearch: false});
  $routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false});
  $routeProvider.when('/signSetting',{templateUrl: 'signSetting.html', reloadOnSearch: false});
  $routeProvider.when('/device',{templateUrl: 'device.html', reloadOnSearch: false});
  $routeProvider.when('/olduser',     {templateUrl: 'olduser.html', reloadOnSearch: false});
  $routeProvider.when('/login',     {templateUrl: 'login.html', reloadOnSearch: false});
  $routeProvider.when('/preActive',     {templateUrl: 'preActive.html', reloadOnSearch: false});
  $routeProvider.when('/about',        {templateUrl: 'about.html', reloadOnSearch: false});
  $routeProvider.when('/finger',        {templateUrl: 'finger.html', reloadOnSearch: false});
  $routeProvider.when('/newuser',       {templateUrl: 'newuser.html', reloadOnSearch: false});
  $routeProvider.when('/auth',       {templateUrl: 'auth.html', reloadOnSearch: false});
  $routeProvider.when('/help',        {templateUrl: 'help.html', reloadOnSearch: false});
  $routeProvider.when('/qrcodehelp',        {templateUrl: 'qrcodehelp.html', reloadOnSearch: false});
  $routeProvider.when('/docuhelp',        {templateUrl: 'docuhelp.html', reloadOnSearch: false});
  $routeProvider.when('/passhelp',        {templateUrl: 'passhelp.html', reloadOnSearch: false});
  $routeProvider.when('/log',        {templateUrl: 'log.html', reloadOnSearch: false});
  $routeProvider.when('/usersetting_sz',        {templateUrl: 'usersetting_sz.html', reloadOnSearch: false});
  $routeProvider.when('/security',        {templateUrl: 'security.html', reloadOnSearch: false});
  $routeProvider.when('/identity',        {templateUrl: 'identity.html', reloadOnSearch: false});
  $routeProvider.when('/fileDetails',        {templateUrl: 'fileDetails.html', reloadOnSearch: false});

});


//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
	restrict: 'A',
	compile: function(elem, attrs) {
	  var dismissFn = $parse(attrs.dragToDismiss);
	  return function(scope, elem, attrs){
		var dismiss = false;

		$drag.bind(elem, {
		  constraint: {
			minX: 0,
			minY: 0,
			maxY: 0
		  },
		  move: function(c) {
			if( c.left >= c.width / 4) {
			  dismiss = true;
			  elem.addClass('dismiss');
			} else {
			  dismiss = false;
			  elem.removeClass('dismiss');
			}
		  },
		  cancel: function(){
			elem.removeClass('dismiss');
		  },
		  end: function(c, undo, reset) {
			if (dismiss) {
			  elem.addClass('dismitted');
			  $timeout(function() {
				scope.$apply(function() {
				  dismissFn(scope);
				});
			  }, 400);
			} else {
			  reset();
			}
		  }
		});
	  };
	}
  };
});

//20160614
var zhangjian_name;
//验证军官证首字母
var officer_start=new Array("南","北","沈","兰","成","济","广","参","政","后","装","海","空");
//验证护照首字母
var password_start=new Array("G","P","S","D","g","p","s","d");
var officer_p=false;
var password_p=false;
//验证军官证
function idId_officer(num){	
	$("#id_officer").show();
	var officer_check=/[字第]{2}\d{8}号$/;//例子：政字第00111206号
    var scope=angular.element(document.getElementById("app-content")).scope();
	
    if(officer_check.test(num)&&officer_p){
    	$("#paperid").attr("maxlength",12);
    	scope.$apply(function(){
			scope.card_panduan=true;
		});
		zhangjian_name="JG";
		$(".changecard").hide();
    }else{    	
    	scope.$apply(function(){
			scope.card_panduan=false;
		}); 
    }
    
}

//验证中国护照
function isIdPassport(num){
	$("#id_password").show();
	var pw_check=/\d{8}$/;//护照号码：以G,P,S,D开头，后面是8位数字的正则表达式　
    var scope=angular.element(document.getElementById("app-content")).scope();
	
    if(pw_check.test(num)&&password_p){
    	
    	$("#paperid").attr("maxlength",9);
    	scope.$apply(function(){
			scope.card_panduan=true;
		});
		zhangjian_name="HZ";
		$(".changecard").hide();
    }else{
    	scope.$apply(function(){
			scope.card_panduan=false;
		}); 
    }
    
}

function name_id_change(){
    if($("#paperid").val()==""){
        var scope=angular.element(document.getElementById("app-content")).scope();
        
        scope.$apply(function(){
                     scope.card_panduan=false;
                     });
    }
}

function ywq_id_change(){
	var card_content=$("#paperid").val();
	var scope=angular.element(document.getElementById("app-content")).scope();
			
	scope.$apply(function(){
		scope.card_panduan=false;
	}); 
	password_p=false;
	officer_p=false;
	$("#paperid").attr("maxlength",18);
	
	for(i=0;i<officer_start.length;i++){
		if(card_content.charAt(0)==officer_start[i]){
			officer_p=true;
			password_p=false;
		}
	}	
	for(i=0;i<password_start.length;i++){
		if(card_content.charAt(0)==password_start[i]){
			
			password_p=true;
			officer_p=false;
		}
	}
	$(".changecard").hide();
	if(officer_p){
		idId_officer(card_content)
	}else if(password_p){
		isIdPassport(card_content);		 
	}else{
		$("#idcard").show();
		
		if(isIdCardNo(card_content)){
			scope.$apply(function(){
				scope.card_panduan=true;
			}); 
			zhangjian_name="SF";
		}else{
			scope.$apply(function(){
				scope.card_panduan=false;
			});
		}
	}
}


function isIdCardNo(num)
{
    if( typeof(num) == undefined )
        return false;
    if( num == null )
        return false;
	var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
	var error;
	var varArray = new Array();
	var intValue;
	var lngProduct = 0;
	var intCheckDigit;
	var intStrLen = num.length;
	var idNumber = num;
	// initialize
	if (intStrLen != 18) {

		return false;
	}
	// check and set value
	for(i=0;i<intStrLen;i++) {
		varArray[i] = idNumber.charAt(i);
		if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {

			return false;
		} else if (i < 17) {
			varArray[i] = varArray[i]*factorArr[i];
		}
	}
	if (intStrLen == 18) {
		//check date
		var date8 = idNumber.substring(6,14);
		if (checkDate(date8) == false) {

			return false;
		}
		// calculate the sum of the products
		for(i=0;i<17;i++) {
			lngProduct = lngProduct + varArray[i];
		}
		// calculate the check digit
		intCheckDigit = 12 - lngProduct % 11;
		switch (intCheckDigit) {
			case 10:
				intCheckDigit = 'X';
				break;
			case 11:
				intCheckDigit = 0;
				break;
			case 12:
				intCheckDigit = 1;
				break;
		}
		// check last digit
		if (varArray[17].toUpperCase() != intCheckDigit) {

			return false;
		}
	}
	else{        //length is 15
		//check date
		var date6 = idNumber.substring(6,12);
		if (checkDate(date6) == false) {

			return false;
		}
	}
	return true;
}

function checkDate(date)
{
	return true;
}

app.directive('userValidator', ['$log', function($log) {
	  return {
		  restrict: 'A',
		  require: 'ngModel',
		  link: function($scope, $element, $attrs, $ngModelCtrl) {

			  $ngModelCtrl.$parsers.push(function(input) {

				  var validity = isIdCardNo(input);
				  $ngModelCtrl.$setValidity('defined', validity);
				  return validity ? input : false;
			  });
			  $ngModelCtrl.$formatters.push(function(input) {
				  var validity = isIdCardNo(input);
				  $ngModelCtrl.$setValidity('defined', validity);
				  return validity ? input : false;
			  })
		  }
	  }
	}]);

//
// For this trivial demo we have just a unique MainController
// for everything

app.controller('MainController', function($rootScope, $scope,$timeout,$location){

	//$scope.serverAddr="http://192.168.132.218:8080/MSSPServer/m/";
	//$scope.serverAddr="http://192.168.136.191:8080/MSSPServer/m/";
	//$scope.serverAddr="http://101.201.171.106:80/MSSPServer/m/";
	//$scope.serverAddr="http://192.168.132.189:8080/MSSPServer/m/";
	$scope.serverAddr="http://dev.isignet.cn:8080/MSSPServer/m/";
//	$scope.serverAddr="https://mssp.isignet.cn:443/MSSPServer/m/";
	//$scope.serverAddr="http://dev.isignet.cn:8080/MSSPServer/m/";
//	$scope.serverAddr="http://mssp.isignet.cn:80/MSSPServer/m/";
	$scope.autoLoginAjax;
	$scope.msspAjax;
	$scope.TimeOut=60000;
	$scope.oldPinEncBack;
	$scope.signDataParam;
	$scope.appVersion;
	$scope.msspID;
	$scope.appId;
	$scope.accessToken;
	$scope.fileCount=0;
	$scope.step=20;
	$scope.count=10;
	$scope.msg= "发送短信验证码";
	$scope.doculistURL;
	$scope.signImage;
	$scope.userName;
	$scope.userMobile;
	$scope.userDevInfo;
	$scope.localDeviceList=new Array();
	$scope.deviceObject;
	$scope.needAutoLogin=1;  //1表示需要自动登录,2标识不需要
	$scope.uiType="";
	$scope.appURL;
	$scope.appIconUrl;
	$scope.clientName;
	$scope.appMemo;
	$scope.authTitle;
	$scope.unsignedDocuNum=0;
	$scope.signedDocuNum=0;
	$scope.menuHide=true;
	$scope.oldphone="";
	$scope.olddevice="";
	$scope.oldUser_msg= "发送短信验证码";
	$scope.oldUser_count=60;
	$scope.active_accessToken;
	$scope.active_phone;
	$scope.reactive_phone;
	$scope.active_count;
	$scope.originSignImage;
	$scope.scrollItemshead = new Array();
	$scope.scrollItems = new Array();
	$scope.firstActive=false;
	$scope.reqDocuType="";
	$scope.isAnswerTrue=false;
	$scope.rememberMe = false;
  $scope.infome= true;
  $scope.isPrivate=true;
	$scope.isUserpin=false;
               $scope.shenzhensetpin="";
  	//lhk
  	$scope.scroll_all_file= "全部文档";
  	$scope.scroll_zx_file= "最新";
  	$scope.scroll_up_img1='1';
  	$scope.scroll_up_img2='1';
  	$scope.userMobile_hide;
  	$scope.search_model;
  	$scope.search_show=false;
		$scope.idcardimg01;
  	$scope.idcardimg02;
  	$scope.idcard_name;  	
  	$scope.idcard_numb;
  	$scope.idcard_val;	
	
	$scope.posImgFileId;
	$scope.negImgFileId;
	$scope.card_panduan=false;
  
  
	
	$scope.auth_ini=function(){
	$scope.navHideBottom=true;
	$scope.navHideTop=false;
	}


    $scope.NoTop_Ini=function() 
	{	
	 $scope.navHideBottom=false;
  	 $scope.navHideTop=true;
	}

	$scope.TopBottom_Ini=function()
	{
	 $scope.navHideBottom=false;
	 $scope.navHideTop=false;
	}

	$scope.NoBottom_Ini=function()
	{
	  $scope.navHideBottom=true;
	  $scope.navHideTop=false;
  request('signet','stopProgressDialog','');
	}


	$scope.login_newoser=function()
	{
			$scope.NoBottom_Ini();
		  $location.path('/newuser');
	}
	

	 $scope.home_Ini=function()
	{
    $scope.menuHide=false;
		$scope.navHideBottom=false;
	  $scope.navHideTop=true;
	  $scope.loadIndexInfoFunc();
		//$scope.$apply($location.path('/'));
    $location.path('/');
    //window.location.reload();
		toON(0);
		
	}
	
	$scope.scroll_Ini=function(docuType) 
	{	
		 $scope.ShowDocuList(docuType);
		 $scope.TopBottom_Ini();
		 //$scope.$apply($location.path('/scroll'));
     $location.path('/scroll');
     //window.location.reload();
		 toON(1);
		 
	}
	
	$scope.usersetting_Ini=function()
	{ 
		 $scope.TopBottom_Ini();
		 $scope.loadSignImg();
		 //$scope.$apply($location.path('/usersetting'));
     $location.path('/usersetting');
    
	   toON(2);
	 	 		
	}
			
  $scope.SetMenu=function(type)
  {
  	  
	 //request('signet','clearHistory','');
  	 if(type==0)
  	{
  		$scope.menuHide=false;
  		$scope.navHideBottom=false;
	    $scope.navHideTop=true;
  		//$scope.$apply($location.path('/'));
               $location.path('/');
        //window.location.reload();
		if($scope.userName==null||$scope.userMobile==null||$scope.msspID==null)
	   {
			request('signet','getUserBaseInfo','');
	   }
		
		if($scope.signImage==null||$scope.userDevInfo==null){
			request('signet','getUserDeviceInfo','');
		}
  	}
  	
  	else if(type==1)
  	{
  		$scope.TopBottom_Ini();
  		//$scope.$apply($location.path('/scroll'));
               $location.path('/scroll');
        //window.location.reload();
  	}
  	
  	else if(type==2)
 		{
 		 $scope.TopBottom_Ini();	
  	 //$scope.$apply($location.path('/usersetting'));
          //window.location.reload();
               $location.path('/usersetting');
		 var getDevListObject=new Object();
		getDevListObject.accessToken=$scope.accessToken;
		var sResult=JSON.stringify(getDevListObject);
		var servURL=$scope.serverAddr+"getdevicelist";
		$scope.userGetDeviceListCallBackFunc(sResult,servURL);

		 

 		}
  	  
   
    toON(type);
  }


	
	$scope.signdocu_Ini=function(){

	$scope.navHideBottom=true;
	$scope.navHideTop=false;
	$scope.loadSignImg();
	}


		$scope.device_Ini=function(){

		$scope.navHideBottom=true;
		$scope.navHideTop=false;

	}


	$scope.pdfview_Ini=function(url,status){
	$scope.navHideBottom=true;
	$scope.navHideTop=false;
	
	var paramObj=new Object();
	paramObj.docuURL=url;
	paramObj.docuStatus=status;
	
	var paramData=JSON.stringify(paramObj);
               console.log("start call local downloadfile, param is:"+paramData );
	request('signet','downloadfile',paramData);
	}


	$scope.finger_Ini=function(){

		$scope.navHideBottom=true;
		$scope.navHideTop=false;
		if(( $scope.fingerVerify == null )||($scope.fingerVerify == undefined )){
			//alert("into undefined");
			request('signet','getUserBaseInfo','');
		}
		if( $scope.fingerVerify == true ){
			$("#fingerid").addClass("active");
		}else{
			$("#fingerid").removeClass("active");
		}
	}

	$scope.signsetting_Ini=function(){

		$scope.navHideBottom=true;
		$scope.navHideTop=false;
	}

	$scope.about_Ini=function(){

		$scope.navHideBottom=true;
	$scope.navHideTop=false;

	}


               $scope.registerOlderForshenzhen=function(){
               request('signet', 'shenzhenRegister', '');
               }
	$scope.pdfview_IniCallBackFunc=function(url)
	{
               
               //var iframe=document.getElementById('pdfviewframe');
               //$scope.$apply($("#pdfviewframe").attr("src", "../jspdf/web/viewer.html?file="+url));
	             //$("#pdfviewframe").attr("src", "../jspdf/web/viewer.html?file="+url);
               $scope.fileurl = "../jspdf/web/viewer.html?file="+url;
               console.log("begin pdfview callback func,get iframe:"+$scope.fileurl );
               //$location.path('/pdfview');
               $location.path('/fileDetails');
	}

	$scope.stopProgressDialog=function(){
		request('signet','stopProgressDialog','');
	}
	//wzh
	$scope.singDocuFinishCallBackFunc=function(mDocuId){
		//$scope.$apply($location.path('/'));
		//$scope.autoLoginFunc();
		$scope.userDocuDetail.showSignBtn=false;
		//$scope.loadIndexInfoFunc();
		//$scope.getDocuNumberCallBackFunc();
		
		//更新列表状态
			for(var item in $scope.ShowItems)
				{
					if ($scope.ShowItems[item].id==mDocuId)
					{
						$scope.ShowItems[item].state="SIGN_FINISH"
					}
				}
			
				for(var item in $scope.scrollItemshead)
				{
					if ($scope.scrollItemshead[item].id==mDocuId)
					{
						$scope.scrollItemshead[item].state="SIGN_FINISH"
					}
				}
				
				$scope.unsignedDocuNum=$scope.unsignedDocuNum-1;
		
		

	}

	  $scope.revertScreenCallBackFunc=function(){

		$scope.navHideBottom=true;
	  $scope.navHideTop=false;
	  $scope.$apply($location.path('/signSetting'));
   }


	///////////////////User login 用户登录页面/////////////////////////////////////////////////////////////////////

	$scope.login_Ini=function()
	{

		$scope.navHideBottom=true;
	$scope.navHideTop=true;

	  $scope.active_isDisabled=false;
	  $scope.menuHide=true;
	}



	$scope.login_active=function(isValid,activecode)
	{


		var codeBean=JSON.parse(activecode);
		$scope.userDevInfo=JSON.stringify(codeBean.devInfo);
		var codeObj=codeBean.qrCode;
		
		if(isValid)
		{


			var DeviceInfo=eval("("+$scope.userDevInfo+")");
			var paramObj=new Object();
			paramObj.authCode=codeObj.authCode;
			paramObj.appId=codeObj.appId;
			$scope.appId=codeObj.appId;
			paramObj.mobile="";
			paramObj.deviceInfo=DeviceInfo;

			var paramData=JSON.stringify(paramObj);

			ShowWait();
               //alert($scope.serverAddr);
			try{
				if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
			$scope.msspAjax=jQuery.ajax({
				type: "post",
				data: paramData,
				timeout:$scope.TimeOut,
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				url:$scope.serverAddr+"precheck",
				success: function (preCheckResponse) {
				CloseWait();
/* 				if(preCheckResponse==null||typeof(preCheckResponse)=='undefined'){
					AlertErr("服务器连接失败,请稍后再次尝试");
					return;
				} */	
                    console.log("check active code response=:"+preCheckResponse);
					if(preCheckResponse.status=="COVER_OLD_DEVICE"){
						AlertErr("您已注册,请通过老用户找回激活设备");
						//$location.path('/olduser');
						return;
					}

					if(preCheckResponse.errCode!="0"){
                        console.log("preCheckResponse errCode=:"+preCheckResponse.errCode);
						AlertErr("异常: "+preCheckResponse.errMsg);
						return;
					}else{
						var Request=eval("("+JSON.stringify(codeBean.qrCode)+")");
						Request.deviceInfo=DeviceInfo;
						var msspurl=$scope.serverAddr+"regwithauthcode";
						$scope.RegWithAuthCodeCallMssp(msspurl,Request);
						return;

					}
				},
				error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
                        console.log("errResponse=:"+errResponse);
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
					AlertErr("连接服务异常: "+textStatus);
				}
			});
			}catch(Error){
				AlertErr("异常,请稍后尝试");
			}
		}
	}

	$scope.login_qrscan=function()
	{

	 request('signet','scanActiveCode','');
	}

	$scope.login_oldoser=function()
	{
		$scope.NoBottom_Ini();
	  $location.path('/olduser');
    //window.location.reload();
	}


   $scope.openPage = function(page) 
  {
    $scope.NoBottom_Ini();
    $location.path(page);
      
  };


	 $scope.RegWithAuthCodeCallMssp=function(msspurl,Request)
   {

		 ShowWait();

		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax= jQuery.ajax({
		 type: "post",
		 data: JSON.stringify(Request),
		 dataType: 'json',
		 timeout:$scope.TimeOut,
		 contentType: 'application/json;charset=utf-8',
		 url:msspurl,
		 success: function (Response) {
		 CloseWait();
			if(Response==null||typeof(Response)=='undefined'){
				AlertErr("服务器连接失败,请稍后再次尝试");
				return;
			}
           
		  $scope.$apply($scope.Response=JSON.stringify(Response));
		  $scope.RegWithAuthCodeCallback(JSON.stringify(Response));

	   },
		error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
		   AlertErr("连接服务异常: "+textStatus);
		   $scope.$apply($scope.Response=JSON.stringify(errResponse));
		 }

	 });
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}

   }
	$scope.RegWithAuthCodeCallback=function(Response)
	{
//               alert("RegWithAuthCodeCallback");
		 console.log("RegWithAuthCodeCallback:"+Response);
		 //处理服务返回结果
		 var resJson=JSON.parse(Response);

		 //1 判断用户是否有效
		 if(resJson.errCode!="0")
		 {
               //alert(resJson.errCode);
               console.log("resJson errCode="+resJson.errCode );
               if( resJson.errCode == 0x80000009 ){
                    //老用户可以继续处理
                    AlertErr(resJson.errMsg);
               }else{
                    AlertErr("异常1: "+resJson.errMsg);
               }
            $scope.$apply($location.path('/olduser'));
			return;
		 }
		//2 保存 accessToken 用于后续激活
              //alert("RegWithAuthCodeCallback get accessToken: "+resJson.accessToken);
	   $scope.active_accessToken=resJson.accessToken;
	   $scope.active_phone=resJson.mobile;
	   $scope.userName=resJson.name;
	   $scope.msspID=resJson.msspID;

	   //3 跳转至激活页面
	   $scope.NoBottom_Ini();
	   $scope.$apply($location.path('/active'));
  }


///////////////////User register 用户找回页面/////////////////////////////////////////////////////////////////////
  
  $scope.findBackPwdCallBackFunc=function(){
	  	 $scope.navHideBottom=true;
		 $scope.navHideTop=false;
		 $location.path('/olduser');
		 request('signet','olduserPageFlag','');
  }
               $scope.newuser_Ini=function()
               {
               
               $scope.navHideBottom=true;
               $scope.navHideTop=false;
               }
               
 $scope.olduser_Ini=function()
 {

	 $scope.navHideBottom=true;
   $scope.navHideTop=false;

	 $scope.active_isDisabled=false;
   $scope.menuHide=true;
   $scope.olduser_UserCheck=false;
   $scope.olduser_userMobile=false;
   $scope.olduser_checkValid=false;
	 $scope.olduser_UserPhoneList=null;

	 $scope.active_accessToken="";
	 $scope.msspID="";
	 $scope.reactive_phone="";


	document.getElementById('name').focus();
	$scope.needAutoLogin=2;
        //if(($scope.userDevInfo == 'undefined')||( $scope.userDevInfo == "" ))
   request('signet','getUserDeviceInfo','');

 }
               
               $scope.localpageback=function()
               {
               request('signet', 'pageback', '');
               }
               
$scope.oldUserCheckUserByApp=function( username, userCardID, userDevInfo, userAppID ){
               var Request=new Object();
               Request.name=username;
               $scope.userName=username;
               Request.idCard=userCardID;
               Request.idCardType='SF';
               Request.deviceInfo=eval("("+userDevInfo+")");
               $scope.userDevInfo=userDevInfo;
               Request.appId=userAppID;
               $scope.appId = userAppID;
               console.log("Request.appId:"+Request.appId);
               console.log("$scope.appId:"+$scope.appId);
               //4 调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
               var msspurl=$scope.serverAddr+"activeDevice";
               console.log(" oldUserRequestCallMssp Request:"+JSON.stringify(Request));
               $scope.checkOldUserCallBackFunc(msspurl,Request);
}
//用户触发：检测用户有效性
$scope.oldUserCheckUser=function(isValid,user)
  {
	 //1判断输入有效性
	 if (!isValid)
	{
	  return;
	}

    
	 //2 获取 硬件设备信息
	//var str='{"channelID":null,"date":null,"deviceName":"HUAWEI G730-C00","id":null,"imei":"IMEI","imsi":"AlUAwfYVf3ZGiFZZDVruer7cW3Q=","location":null,"mobileID":null,"osVersion":"Android 4.1.2","wifiSSID":""}'
	var DeviceInfo=eval("("+$scope.userDevInfo+")");

	//3 生成请求
	var Request=new Object();
	Request.name=user.name;
	$scope.userName=user.name;
	Request.idCard=user.paperid;
	Request.idCardType='SF';
	Request.deviceInfo=DeviceInfo;
	Request.appId=$scope.appId;
	console.log("Request.appId:"+Request.appId);
	console.log("$scope.appId:"+$scope.appId);
	//4 调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
	var msspurl=$scope.serverAddr+"activeDevice";
	console.log(" oldUserRequestCallMssp Request:"+JSON.stringify(Request));
	//$scope.oldUserRequestCallMssp(msspurl,Request);
    $scope.checkOldUserCallBackFunc(msspurl,Request);
  }

               //for 深圳卫生 function
               $scope.checkOldUserCallBackFunc=function(msspurl,Request){
               ShowWait();
               //alert(msspurl);
               //alert(JSON.stringify(Request));
               jQuery.ajax({
                           type: "post",
                           data: JSON.stringify(Request),
                           timeout:$scope.TimeOut,
                           dataType: 'json',
                           contentType: 'application/json;charset=utf-8',
                           url:msspurl,
                           success: function (Response) {
                           CloseWait();
                           if(Response==null||typeof(Response)=='undefined'){
                           AlertErr("服务器连接失败,请稍后再次尝试");
                           return;
                           }
                           $scope.checkOldUserRequestCallback(JSON.stringify(Response));
                           
                           },
                           error: function(XMLHttpRequest, textStatus, errResponse)
                           {	
                           CloseWait();
                           if(textStatus=='timeout'){
                           AlertErr("请求超时,请稍后再次尝试");
                           return;
                           }
                           AlertErr("连接服务异常: "+textStatus);
                           $scope.$apply($scope.Response=JSON.stringify(errResponse));
                           }
                           
                           });
               }
               //深圳卫生
               $scope.checkOldUserRequestCallback=function(Response)
               {
               //处理服务返回结果
               var resJson=JSON.parse(Response);
               //1 判断用户是否有效
               if(resJson.errCode!="0")
               {
               AlertErr("未找到有效账户"+'\n'+"请确认身份证号码是否正确");
               return;
               }
               
               
               //(2)保存 ticket 用于后续交互
               $scope.olduser_ticket=resJson.ticket;
               
               //(3)保存 设备类型 是否为新设备 用于后续交互
               
               if( resJson.result=='OLD_DEVICE')
               {
               $scope.olduser_OldDevice=true;
               }
               else
               {
               $scope.olduser_OldDevice=false;
               }
               
               //(4) 保存用户手机号列表
               
               var DeviceMap = resJson.deviceMap;
               var Develist= new Array();
               for (var key in DeviceMap)
               {
               var item= new Object();
               item.phone=DeviceMap[key];
               item.id=key;
               
               Develist.push(item);
               }
               $scope.olduser_UserPhoneList =Develist;
               // 设置检测用户成功
               $scope.olduser_UserCheck=true;
               // 设置用户默认选项:  使用旧手机激活
               $scope.$apply($scope.checkoldUserOldNumber());
               }
               
               $scope.checkoldUserOldNumber=function()
               {
               $("#oldnumber").attr("checked","checked");
               $("#newnumber").removeAttr("checked");
               
               $scope.olduser_userNewPhone=false;
               
               $scope.olduser_UseOldNum=true;
               
               
               if($scope.olduser_UserPhoneList.length==1) // 当只有一个用户手机时  无需显示列表 直接进入下一步
               {
               $scope.olduser_userMobile=false;
               }
               else if($scope.olduser_UserPhoneList.length>1)
               {
               $scope.olduser_userMobile=true;
               }
               
               $scope.olduser_validType=false;//无需选择验证方式
               
               if($scope.olduser_OldDevice)  //硬件改变需要校验Pin
               {
               $scope.olduser_oldPin=false;
               $scope.olduser_oldotp=false;
               }
               else
               {
               $scope.olduser_oldPin=true;
               $scope.olduser_oldotp=false;
               }
               
               $timeout(function()
                        {
                        $scope.oldphone=$scope.olduser_UserPhoneList[0].phone;
                        $scope.olddevice=$scope.olduser_UserPhoneList[0].id;
                        //document.getElementById($scope.oldphone).checked=true;
                        
//                        if ($scope.olduser_UserPhoneList.length==1) // 当只有一个用户手机时 直接执行下一步
//                        {                                                                      //由active页回退,则不自动执行身份检测
                        $scope.checkValid();
//                        }
                        
                        },100);
               }
               
   $scope.oldUserRequestCallMssp=function(msspurl,Request)
   {
       
	  ShowWait();

	  try{
		  if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax= jQuery.ajax({
	 type: "post",
	 data: JSON.stringify(Request),
	   timeout:$scope.TimeOut,
	 dataType: 'json',
	 contentType: 'application/json;charset=utf-8',
	   url:msspurl,
	 success: function (Response) {
	 CloseWait();
	 if(Response==null||typeof(Response)=='undefined'){
		 AlertErr("服务器连接失败,请稍后再次尝试");
		 return;
	 }
	 console.log("oldUserRequestCallMssp Response:"+JSON.stringify(Response));
	 $scope.oldUserRequestCallback(JSON.stringify(Response));
     $location.path('/active');
	 $scope.$apply($scope.Response=JSON.stringify(Response));
     console.log("olduser_userMobile ="+$scope.olduser_userMobile+", olduser_userNewPhone="+$scope.olduser_userNewPhone+",olduser_checkValid="+$scope.olduser_checkValid);
      },
	 error: function(XMLHttpRequest, textStatus, errResponse)
				{
                    
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
					AlertErr("连接服务异常: "+textStatus);
					$scope.$apply($scope.Response=JSON.stringify(errResponse));
	 }

	 });
   }catch(Error){
	   AlertErr("异常,请稍后尝试");
   }

   }

   //信步云服务回调: 检测用户有效回调函数
 $scope.oldUserRequestCallback=function(Response)
{
	//处理服务返回结果
	var resJson=JSON.parse(Response);
	
               
	//1 判断用户是否有效
	if(resJson.errCode!="0")
	{
	 AlertErr("未找到有效账户"+'\n'+"请确认身份证号码是否正确");
	 return;
	}


	 //(2)保存 ticket 用于后续交互
       //        alert(Response);
	  $scope.olduser_ticket=resJson.ticket;
               //alert(resJson.ticket);
               //$scope.active_accessToken = resJson.ticket;
	 //(3)保存 设备类型 是否为新设备 用于后续交互

	  if( resJson.result=='OLD_DEVICE')
	  {
	   $scope.olduser_OldDevice=true;
	  }
	  else
	  {
	  $scope.olduser_OldDevice=false;
	  }

	 //(4) 保存用户手机号列表

	  var DeviceMap = resJson.deviceMap;
	  var Develist= new Array();
	 for (var key in DeviceMap)
	 {
	 var item= new Object();
	 item.phone=DeviceMap[key];
	 item.id=key;
	 Develist.push(item);
	 }
               //返回设备列表为空，为新用户？？？
//               if( Develist.length == 0 ){
//                    console.log("no avalible devlist, so go to newuser");
//                    AlertErr("账户状态异常请重新注册");
//                    $location.path('/newuser');
//                    //window.location.reload();
//               }
//               
	  $scope.olduser_UserPhoneList =Develist;

	 // 设置检测用户成功
	  $scope.olduser_UserCheck=true;
              
	  // 设置用户默认选项:  使用旧手机激活
	  $scope.$apply($scope.oldUserOldNumber());

}

  //页面初始化：手机列表选择 由页面data-ng-init调用
$scope.olduser_checkIni=function()
{
// $timeout(function()
// {
//  $scope.oldphone=$scope.olduser_UserPhoneList[0].phone;
//  $scope.olddevice=$scope.olduser_UserPhoneList[0].id;
//  document.getElementById($scope.oldphone).checked=true;
//
//  if ($scope.olduser_UserPhoneList.length==1) // 当只有一个用户手机时 直接执行下一步
//  {                                                                      //由active页回退,则不自动执行身份检测
//	$scope.checkValid();
//  }
//
//  },100);
}

//用户触发：设置为 使用旧手机号激活
$scope.oldUserOldNumber=function()
{
  //$("#oldnumber").attr("checked","checked");
  //$("#newnumber").removeAttr("checked");

  $scope.olduser_userNewPhone=false;

  $scope.olduser_UseOldNum=true;


  if($scope.olduser_UserPhoneList.length==1) // 当只有一个用户手机时  无需显示列表 直接进入下一步
  {
	$scope.olduser_userMobile=false;
  }
  else if($scope.olduser_UserPhoneList.length>1)
  {
	$scope.olduser_userMobile=true;
  }

  $scope.olduser_validType=false;//无需选择验证方式

  if($scope.olduser_OldDevice)  //硬件改变需要校验Pin
  {
  $scope.olduser_oldPin=false;
  $scope.olduser_oldotp=false;
  }
  else
  {
  $scope.olduser_oldPin=true;
  $scope.olduser_oldotp=false;
  }
  
}
//用户触发：设置为 使用新手机号激活
$scope.oldUserNewNumber=function()
{

  $("#newnumber").attr("checked","checked");
  $("#oldnumber").removeAttr("checked");

  $scope.olduser_userNewPhone=true;

  $scope.olduser_UseOldNum=false;
  $scope.olduser_userMobile=true;

  if($scope.olduser_OldDevice)
  {
   $scope.olduser_validType=true;
   $("#oldPinVerify").attr("checked","checked");

   $scope.olduser_oldotp=false;  //显示oldOTP校验
   $scope.olduser_oldPin=true; //隐藏oldPin校验
  }
  else
  {
   $scope.olduser_validType=false;
   $scope.olduser_oldPin=true;
   $scope.olduser_oldotp=true;
  }


}
//用户触发：设置为OTP校验
$scope.oldNumberOtpVerify=function()
{
  $("#oldNumberOtpVerify").attr("checked","checked");
  $("#oldPinVerify").removeAttr("checked");

  $scope.olduser_oldotp=true;
  $scope.olduser_oldPin=false;

}
//用户触发：设置为旧Pin校验
$scope.oldPinVerify=function()
{
  $("#oldPinVerify").attr("checked","checked");
  $("#oldNumberOtpVerify").removeAttr("checked");

  $scope.olduser_oldotp=false;
  $scope.olduser_oldPin=true;

}

//用户触发：选择用户旧手机
$scope.oldUserSelectNum=function(phone)
{
 for (var i = 0; i < $scope.olduser_UserPhoneList.length; i++)
  {

   if ( phone!= $scope.olduser_UserPhoneList[i].phone)
   {
	var id=$scope.olduser_UserPhoneList[i].phone
	 document.getElementById(id).checked=false;

	 }
	 else
	  {
	   $scope.oldphone=$scope.olduser_UserPhoneList[i].phone;
	   $scope.olddevice=$scope.olduser_UserPhoneList[i].id;
	  }

	}
}
//用户触发： 进行用户有效性检测（第一步）
 $scope.checkValid=function()
 {
               //alert("checkValid");
//判断必须选择 旧手机
if($scope.oldphone=="")
{
AlertErr("请选择您之前注册的手机");
return;
}
//设定激活号码为旧手机
$scope.active_phone= $scope.oldphone;

//if(($scope.olduser_OldDevice)&&(!$scope.olduser_userNewPhone))//硬件未变 使用旧手机号码 直接验证激活
if(!$scope.olduser_userNewPhone)//使用旧手机号码 直接验证激活
{
//调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
	var Request=new Object();
	Request.ticket=$scope.olduser_ticket;
	Request.deviceId=$scope.olddevice;
	Request.otp="";
	Request.oldPin="";
	Request.newMobile="";

	var msspurl=$scope.serverAddr+"checkidentity";
	ShowWait();
               //alert(msspurl);
               //alert(JSON.stringify(Request));
	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
	 type: "post",
	 data: JSON.stringify(Request),
	 dataType: 'json',
	 timeout:$scope.TimeOut,
	 contentType: 'application/json;charset=utf-8',
	   url:msspurl,
	 success: function (Response) {

	  CloseWait();
	  if(Response==null||typeof(Response)=='undefined'){
		  AlertErr("服务器连接失败,请稍后再次尝试");
		  return;
	  }
	  $scope.oldUserVerifyCallback(JSON.stringify(Response));
	  $scope.$apply($scope.Response=JSON.stringify(Response));

   },
	error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
	   AlertErr("连接服务异常: "+textStatus);
	   $scope.$apply($scope.Response=JSON.stringify(errResponse));
	 }

	 });
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}

}
else////硬件改变 或 使用新手机号码  需要增加校验处理
{
$scope.olduser_checkValid=true; //显示验证相关表单信息
$scope.oldUser_msg= "向"+$scope.oldphone+"发送短信";
$scope.olduser_userMobile=false;  //隐藏列表信息
}
               }

   //用户触发： 进行用户有效性检测（第二步）
  $scope.checkValid2=function(OtpisValid,OldPinisValid,NewPhoneisValid,user)
 {
  // 1 根据不同情况判断输入参数有效性
  var Request=new Object();
  Request.otp="";
  Request.newMobile="";
  Request.ticket="";
  Request.deviceId="";
  Request.oldPin="";

  if($scope.olduser_oldotp)
  {
   if(!OtpisValid) {return;}
   Request.otp=user.otp;

  }


   if($scope.olduser_userNewPhone)
  {
   if(!NewPhoneisValid) {return;}
	Request.newMobile=user.newephone;

   //设定激活号码为新手机
	$scope.active_phone= user.newephone;
  }



//2 调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
  Request.ticket=$scope.olduser_ticket;
  Request.deviceId=$scope.olddevice;

  //WX
   if($scope.olduser_oldPin)
  {
   if(!OldPinisValid) {return;}
   Request.oldPin=user.oldpass;
	request('signet','userEncPin',JSON.stringify(Request));
  }
  else{
  $scope.oldUserVerifyCallMSSP(Request);
  }

 }

 $scope.oldUserVerifyCallMSSP2=function(endPinParam){

  var msspurl=$scope.serverAddr+"checkidentity";
	ShowWait();
	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
	 type: "post",
	 data: endPinParam,
	 timeout:$scope.TimeOut,
	 dataType: 'json',
	 contentType: 'application/json;charset=utf-8',
	   url:msspurl,
	 success: function (Response) {

	  CloseWait();
	  	  if(Response==null||typeof(Response)=='undefined'){
		  AlertErr("服务器连接失败,请稍后再次尝试");
		  return;
	  }
	  $scope.oldUserVerifyCallback(JSON.stringify(Response));
	  $scope.$apply($scope.Response=JSON.stringify(Response));

   },
	 error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
	   AlertErr("连接服务异常: "+textStatus);
	   $scope.$apply($scope.Response=JSON.stringify(errResponse));
	 }

	 });
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}
 }


 $scope.oldUserVerifyCallMSSP=function(Request){
  var msspurl=$scope.serverAddr+"checkidentity";
	ShowWait();
	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
	 type: "post",
	 data: JSON.stringify(Request),
	 timeout:$scope.TimeOut,
	 dataType: 'json',
	 contentType: 'application/json;charset=utf-8',
	   url:msspurl,
	 success: function (Response) {
	  if(Response==null||typeof(Response)=='undefined'){
		  AlertErr("服务器连接失败,请稍后再次尝试");
		  return;
	  }
	  CloseWait();
	  $scope.oldUserVerifyCallback(JSON.stringify(Response));
	  $scope.$apply($scope.Response=JSON.stringify(Response));

   },
	error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
	   AlertErr("连接服务异常: "+textStatus);
	   $scope.$apply($scope.Response=JSON.stringify(errResponse));
	 }

	 });
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}
 }

  //信步云服务回调: 验证用户可行回调函数
  $scope.oldUserVerifyCallback=function(Response)
  {
	//处理服务返回结果
               //alert("oldUserVerifyCallback");
	var resJson=JSON.parse(Response);

	$scope.Response=Response;

	//1 判断用户是否有效
	if(resJson.errCode!="0")
	{
	 AlertErr("异常: "+resJson.errMsg);
	 $scope.active_accessToken="accessToken";
	 return;
	}

               //alert(resJson.accessToken);
	  //2 保存 accessToken与msspID 用于后续激活
	$scope.active_accessToken=resJson.accessToken;
               //alert("oldUserVerifyCallback get accessToken: "+resJson.accessToken);
	  $scope.msspID=resJson.msspID;
	if($scope.olduser_userNewPhone)
	 {
	 $scope.reactive_phone=$scope.active_phone
	 }
	 else
	 {
	   $scope.reactive_phone=resJson.mobile;
	 }
	  //3 跳转至激活页面 使用旧手机激活
	  $scope.NoBottom_Ini();
	  //$scope.$apply($location.path('/active'));
               $location.path('/active');
      //window.location.reload();
  }

 //用户出发 ： 上一步回退
 $scope.checkValidBack=function()
 {
	$scope.olduser_checkValid=false; //显示验证相关表单信息
	$scope.olduser_userMobile=true;  //隐藏列表信息
 }

  //系统触发：短信倒计时函数
var oldUser_updateclock=function()
 {
	   $scope.oldUser_count--;
   $scope.oldUser_msg= ""+$scope.oldUser_count +"秒后重新获取";
	   if($scope.oldUser_count==0)
	   {
		$scope.oldUser_isDisabled = false;
		$scope.oldUser_msg="向"+$scope.oldphone+"获取验证码";
		$scope.oldUser_count=60;
		}
   $timeout(function(){ if($scope.oldUser_isDisabled) oldUser_updateclock();},1000);

 };
//用户触发：短信发送
$scope.oldUser_sendmsg=function()
  {

	$scope.oldUser_isDisabled = true;

	 //调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息
	var Request=new Object();
	Request.ticket=$scope.olduser_ticket;
	Request.deviceId=$scope.olddevice;
	var msspurl=$scope.serverAddr+"sendotp";
	ShowWait();
	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
	 type: "post",
	 data: JSON.stringify(Request),
	 dataType: 'json',
	 timeout:$scope.TimeOut,
	 contentType: 'application/json;charset=utf-8',
	   url:msspurl,
	 success: function (Response) {

	  CloseWait();
	  	  if(Response==null||typeof(Response)=='undefined'){
		  AlertErr("服务器连接失败,请稍后再次尝试");
		  return;
	  }
	  $scope.oldUserSendMsgCallback(JSON.stringify(Response));
	  $scope.$apply($scope.Response=JSON.stringify(Response));

   },
	 error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
	  $scope.oldUser_isDisabled = false;
	  $scope.$apply($scope.Response=JSON.stringify(errResponse));
	   AlertErr("连接服务异常: "+textStatus);
	 }

	 });
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}

  }

  //信步云回调： 短信发送回调函数
   $scope.oldUserSendMsgCallback=function(Response)
  {
	//处理服务返回结果
	var resJson=JSON.parse(Response);
	$scope.Response=Response;

	//1 判断用户是否有效
	if(resJson.errCode!="0")
	{
	 $scope.oldUser_isDisabled = false;
	 AlertErr("异常: "+resJson.errMsg);
	 return;
	}
	// 触发倒计时更新
	 oldUser_updateclock();

 }


  ///////////////////////////////////////////激活页面//////////////////////////////////////////////////////////////////



  //页面初始化： 激活页面初始化
$scope.active_Ini=function()
	{
               //alert("active_ini");
		$scope.navHideBottom=true;
        $scope.navHideTop=false;

		document.getElementById('otp').focus();
        // var setuserpin1  =  document.getElementById("userpin1");
		$scope.active_count=60;
		$scope.userMobile=$scope.active_phone;
		$scope.active_msg= "重新获取验证码";

//               if( $scope.shenzhensetpin !="" ){
//                    //alert("into");
//                    var userpin1div = document.getElementById("userPass1div");
//                    var userpin2div = document.getElementById("userPass2div");
//                    userpin1div.style.display = "none";
//                    userpin2div.style.display = "none";
//               }

               //               //alert(scope.$$childTail);
//               $('userpin2').attribute($valid, true);
//               $('userpin1').attribute($valid, true);
		var paramObj=new Object();
		paramObj.name=$scope.userName;
		paramObj.mobile=$scope.userMobile;
		paramObj.accessToken=$scope.active_accessToken;

		var paramData = JSON.stringify(paramObj);
               
		request('signet','setUserRegProperty',paramData);

		//触发倒计时
		 $scope.active_isDisabled = true;
		 active_updateclock();
	}

  //系统触发：短信倒计时函数
var active_updateclock=function()
  {

	   $scope.active_count--;
	   $scope.active_msg=$scope.active_count +"秒后重新获取";
		if($scope.active_count==0)
		{
		$scope.active_isDisabled = false;
		$scope.active_msg="获取验证码";
		$scope.active_count=60;
		}
		$timeout(function(){if($scope.active_isDisabled) active_updateclock();},1000);
	};
	//用户触发：激活短信发送OTP
	 $scope.active_sendmsg=function()
  {
	 if($scope.active_msg!="获取验证码")
	 {
			 return;
	 }

	$scope.active_isDisabled = true;
	  active_updateclock();

	//调用服务端ajax交互 提交  姓名 + 证件号码+ 硬件信息

	var Request=new Object();
	Request.mobile=$scope.active_phone;
		if($scope.active_phone.indexOf("**")>0)
	{
		Request.mobile=$scope.reactive_phone;
	}


	  Request.appId=$scope.appId;
	  Request.msspID=$scope.msspID;
	  Request.deviceInfo=JSON.parse($scope.userDevInfo);
	var msspurl=$scope.serverAddr+"reactive";

	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
		 type: "post",
		 data: JSON.stringify(Request),
		 dataType: 'json',
		 timeout:$scope.TimeOut,
		 contentType: 'application/json;charset=utf-8',
		 url:msspurl,
		 success: function (Response) {
			CloseWait();
	  if(Response==null||typeof(Response)=='undefined'){
		  AlertErr("服务器连接失败,请稍后再次尝试");
		  return;
	  }
			$scope.activeSendMsgCallback(JSON.stringify(Response));
		  $scope.Response=JSON.stringify(Response);

	   },
		 error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
		  //$scope.active_isDisabled = false;
		  $scope.active_count==0;
		  AlertErr("连接服务异常: "+textStatus);
		  $scope.Response=JSON.stringify(errResponse);
		 }

	 });
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}
  }

   //信步云回调：短信发送回调函数
   $scope.activeSendMsgCallback=function(Response)
	 {
		 //处理服务返回结果
		 var resJson=JSON.parse(Response);
		 $scope.Response=Response;

		 //1 判断用户是否有效
		 if(resJson.errCode!="0")
		 {
			//$scope.active_isDisabled = false;
			$scope.active_count==0;
			AlertErr("异常: "+resJson.errMsg);
			return;
		 }
		  $scope.active_accessToken=resJson.accessToken;
		 // 触发倒计时更新
		 avtive_updateclock();

	 }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$scope.showDocuDetail=function(user)
	{
		//AlertErr(user);
	}
 ///////////////////////user finger 用户指纹设置页面////////////////////////////////////////////////////////////
 //$scope.bfinger = false;
	$scope.pinVerifyCallMSSP=function(endPinParam){
   //alert(endPinParam);
   	 var msspurl=$scope.serverAddr+"checkpin";
	 ShowWait();
	 try{
		 if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax= jQuery.ajax({
	  type: "post",
	  data: endPinParam,
	  timeout:$scope.TimeOut,
	  dataType: 'json',
	  contentType: 'application/json;charset=utf-8',
	  url:msspurl,
	  success: function (Response)
	  {
	   //alert(Response);
	   	CloseWait();
	   	if(Response==null||typeof(Response)=='undefined'){
		  AlertErr("服务器连接失败,请稍后再次尝试");
		  $scope.removeFinger();
		  return;
	  	}
	   	$scope.pinVerifyCallback(JSON.stringify(Response));
	   	$scope.$apply($scope.Response=JSON.stringify(Response));
	  },
	  error: function(XMLHttpRequest, textStatus, errResponse)
	  {
		  CloseWait();
		if(textStatus=='timeout'){
			AlertErr("请求超时,请稍后再次尝试");
		}else{
			AlertErr("连接服务异常"+JSON.stringify(errResponse));
		}
		$scope.removeFinger();
	  }

	  });
	 }catch(Error){
		 AlertErr("异常,请稍后尝试");
	 }
   }
	/*
	$scope.fingertosetting = function()
	{
		$location.path('/usersetting');
	};
	*/
	$scope.userfingersetting = function()
	{
		//request("signet","checkfingersensor", null);
		$location.path('/finger')
	};

	$scope.openSystemFingerSetting=function()
	{
		request("signet","openSystemFingerSetting", null);
	}

	$scope.changeFinger=function()
	{
	   	$scope.fingerVerify =$("#fingerid").hasClass("active");
	   	//alert(flag);
	  
	   	if($scope.fingerVerify)
		{
		// have active class, means from set to noset,so cancel finger
			request('signet','checkFinger', 'FingerCancelCallBack');
		}else{
			request('signet', 'checkFinger', 'FingerSetCallBack');
		}
	}
 /*
	 $scope.openFinger=function(fingerset)
	 {
	   if( fingerset == true ){
		   alert("check finger");
		   request('signet','checkFinger','FingerCheckCallBack');
			return;
	   }else{
		  alert("不使用指纹签名");
	   }
	}

	 $scope.closefinger=function()
	 {
		 //$scope.fingerVerify = true;
		 alert($scope.fingerVerify);
		 //$scope.apply();
	 }
 */
	$scope.showfingerpage=function(fingerid)
	{
		//alert(fingerid);
		document.getElementById(fingerid).style.display="none";
		
		//var	flag=$("#fingerid").hasClass("active");

		if($scope.fingerVerify == true )
		{
			document.getElementById(fingerid).style.display="";
		}else{
			request('signet','checkfingersensor',fingerid);
		}
	}


   $scope.showfingerSettingDiv = function(fingerid)
   {
	 //alert(fingerid);
	 fingerid.style.display="";
   }

   $scope.pinVerifyCallback=function(Response)
   {
	 //处理服务返回结果

	 var resJson=JSON.parse(Response);

	 $scope.Response=Response;
	 $scope.fingerVerify = true;
	 //1 判断用户是否有效
	 if(resJson.errCode!="0")
	 {
	   //alert(resJson.errMsg);
	   AlertErr("口令验证失败,请重试");
	   removeFinger();
	 }else{
	   showToast("指纹签名设置成功");
	   request('signet','setPinResult',$scope.fingerVerify );
	   $("#fingerid").addClass("active");
	 }
   }

   $scope.removeFinger=function()
   {
   	   $("#fingerid").removeClass("active");
   	   $scope.fingerVerify = false;
   	   //request('signet','setPinResult',$scope.fingerVerify );
        request('signet','cancelfinger', null );
   }
	///////////////////User register 用户注册页面//////////////////////////////////////////////////////////////

	$scope.revertScreen=function(){
	 // alert('revertScreen');

	  if($scope.firstActive){
		  $scope.firstActive=false;
		  request('signet','revertScreen','NO_SIGN_IMG');
	  }else{
		  request('signet','revertScreen','HAS_SIGN_IMG');
	  }

	}
	$scope.updatepersonalsealFunc=function(imgCode){
		var paramObj=new Object();
		paramObj.accessToken=$scope.accessToken;

		paramObj.image=imgCode.replace("data:image/png;base64,","");
		var paramData=JSON.stringify(paramObj);

		 ShowWait();
		 try{
			 if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:"post",
			data:paramData,
			dataType:'json',
			timeout:$scope.TimeOut,
			contentType: 'application/json;charset=utf-8',
			url:$scope.serverAddr+"updatepersonalseal",
			success:function(updataSealResponse){
			CloseWait();
			   if(updataSealResponse==null||typeof(updataSealResponse)=='undefined'){
				  request("signet","showUpdateSealError",imgCode);
				  return;
			   }
				if(updataSealResponse.errCode!=0){
					AlertErr("异常: "+updataSealResponse.errMsg);
					return;
				}
				
				
				$scope.signImage=imgCode;
				$scope.$apply(function ()
				{
				$scope.navHideBottom=false;
				$scope.navHideTop=false;
				});
				history.go(-1);

				request('signet','setUserSignImage',imgCode);
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
				AlertErr("连接服务端异常: "+textStatus);
			}
		 });
		 }catch(Error){
			 AlertErr("异常,请稍后尝试");
		 }
	}

	$scope.loadSignImg=function()
	{

		if($scope.signImage!=null){
			var image=document.getElementById('signImg');
			if( null != image )
				image.src = $scope.signImage;
		}
	}

	  $scope.register=function(user)
	 {

		 var paramObj=new Object();

		 paramObj.name=user.name;
		 paramObj.mobile=user.mobilephone;
		 paramObj.idCardNum=user.paperid;

		 var paramData = JSON.stringify(paramObj);

		request('signet','userRegiest',paramData);

	 }

	$scope.loadDeviceInfoFunc=function(){

		request('signet','getUserDeviceInfo','');
	}

	 $scope.autoLoginFunc=function(){

		 var autoLoginParam=new Object();
		 autoLoginParam.mobile=$scope.userMobile;
		 autoLoginParam.otp="";
		 autoLoginParam.deviceInfo=JSON.parse($scope.userDevInfo);
		 autoLoginParam.version="1.0";
		 autoLoginParam.msspID=$scope.msspID;

		 var autoLoginData=JSON.stringify(autoLoginParam);
               //alert(autoLoginData);
		try{
/* 			if($scope.autoLoginAjax){
			
			$scope.autoLoginAjax.abort();
			} */
		$scope.autoLoginAjax=jQuery.ajax({
			 type:"post",
			data:autoLoginData,
			dataType:'json',
			timeout:$scope.TimeOut,
			contentType: 'application/json;charset=utf-8',
			url:$scope.serverAddr+"userlogin",
			success:function(autoLoginResponse){
				CloseWait();
				console.log(JSON.stringify(autoLoginResponse));
				if(autoLoginResponse==null||typeof(autoLoginResponse)=='undefined'){
					AlertErr("服务器连接失败,请稍后再次尝试");
					return;
				}
				if(autoLoginResponse.errCode!=0){
					//AlertErr("异常: "+autoLoginResponse.errMsg);
					request('signet','removeInfo',autoLoginResponse.errMsg);
					return;
				}

				$scope.accessToken=autoLoginResponse.accessToken;
				$scope.originSignImage=autoLoginResponse.signImage;
				$scope.signImage="data:image/png;base64,"+autoLoginResponse.signImage;
				$scope.userName=autoLoginResponse.userName;
				request('signet','setUserAutoLoginResponse',JSON.stringify(autoLoginResponse));

				$scope.getDocuNumberCallBackFunc();
				$scope.reqDocuType=""; 
				
				
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
				AlertErr("连接服务端异常: "+textStatus);
			}
		 });
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}
		 $scope.needAutoLogin=2;

	 }

	 //Index页加载时需要从服务端或本地获取的内容 wzh
	//$scope.afterReg=false;
 		$scope.loadIndexInfoFunc=function()
 		
 		{
 					               
		   console.log("loadIndexInfoFunc");
		   if($scope.userName==null||$scope.userMobile==null||$scope.msspID==null)
		   {
				request('signet','getUserBaseInfo','');
		   }
				   
		   if($scope.userDevInfo==null)
		   {
		   $scope.needAutoLogin=1;
		   request('signet','getUserDeviceInfo','');
		   }
		   $scope.autoLoginFunc(); 

		}


	 $scope.userSignDocu=function(){
		
	  var paramObj=new Object();
	  paramObj.id=$scope.userDocuDetail.id;
	  paramObj.agentImg=$scope.userDocuDetail.agentImg;
	  var paramData=JSON.stringify(paramObj);
	  request('signet','userSignDocu',paramData);
	}


	 $scope.qrscan=function(){
		request('signet','userQRScan','');
		
	 }
	
	$scope.signData=function(){
		console.log("$scope.signData"+$scope.signDataParam);
		request('signet','userSignData',$scope.signDataParam);
	}
               $scope.signDataCancelCallBackFunc=function(){
                    request('signet','cancelSign', '');
               }
               
	$scope.signDataFinishCallBackFunc=function(){
			
		$scope.menuHide=false;
		$scope.navHideBottom=false;
        $scope.navHideTop=true;
		//$scope.$apply();
               //$location.path('/');
		//toON(0);
		
//		setTimeout(function(){
//			window.location.reload();
//		},100);
		
	}
	
	 $scope.ShowDocuList=function(type){

		 $scope.ShowItems=new Array();
		 
		 if(type==1)
		 {
			if ($scope.unsignedDocuNum==0){
				 return;
			}else{
				$scope.reqDocuType="WAITING_SIGN";
				console.log("$scope.reqDocuType scroll_Ini:"+$scope.reqDocuType+"type:"+type);
				$scope.userGetUnSignedDocuListCallBackFunc(
				
				function(){  
        $scope.ShowItems=$scope.scrollItems;
       $scope.$apply($location.path('/scroll'));
		   toON(1);
	     });
			
			}
				
		 }
		 else if(type==2)
		 {
			if ($scope.signedDocuNum==0) return;

			for(var item in $scope.scrollItems)
				{
					if ($scope.scrollItems[item].state=='SIGN_FINISH')
					{
					 $scope.ShowItems.push($scope.scrollItems[item])
				  }
				}
				
			$scope.$apply($location.path('/scroll'));
		   toON(1);
		 }

		 else if(type==0)
		 {
		 	 	$scope.reqDocuType="";
			 	$scope.userGetUnSignedDocuListCallBackFunc(
				function(){  
        $scope.ShowItems=$scope.scrollItems;
        $scope.$apply($location.path('/scroll'));
		    toON(1);
	     });
		  }
      
    
	 }

	$scope.activeuser=function(bindinfo)
	{
	var otpCode=document.getElementById("otp").value;
	if(otpCode.length!=6){
		AlertWarning("请输入正确验证码");
		return ;
	}
	if(isNaN(bindinfo.userpin1)||isNaN(bindinfo.userpin2)){

		AlertWarning("请输入数字口令");
		return;
	} 
//    if( $scope.shenzhensetpin !="" ){
//               bindinfo.userpin1 = $scope.shenzhensetpin;
//               bindinfo.userpin2 = $scope.shenzhensetpin;
//    }
               if(bindinfo.userpin1!=bindinfo.userpin2)
               {
               AlertWarning("两次密码输入不一致，请重新输入");
               return;
               }
//               if( bindinfo.userpin1.length <6 ){
//                    AlertWarning("请输入有效的密码");
//                    return;
//               }
	
	//停止倒计时
	$scope.active_isDisabled = false;

	var paramObj=new Object();

	paramObj.pin=bindinfo.userpin1;
	paramObj.otp=otpCode;
	paramObj.token	=$scope.active_accessToken;
	paramObj.msspID=$scope.msspID;


	var paramData = JSON.stringify(paramObj);
	request('signet','userActive',paramData);

	}


	$scope.getDocuNumberCallBackFunc=function(){

		var getDocuNumObject =new Object();
		getDocuNumObject.accessToken=$scope.accessToken;
		var servURL=$scope.serverAddr+"welcome"
		var sResult=JSON.stringify(getDocuNumObject);
		console.log("getDocuNumberCallBackFunc sResult:"+sResult);
		//ShowWait();
		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:"post",
			data:sResult,
			dataType:'json',
			timeout:$scope.TimeOut,
			contentType: 'application/json;charset=utf-8',
			url:servURL,
			success:function(getDocuNumResponse){
				CloseWait();
			if(getDocuNumResponse==null||typeof(getDocuNumResponse)=='undefined'){
		     AlertErr("服务器连接失败,请稍后再次尝试");
		    return;
	        }
				console.log("getDocuNumResponse:"+JSON.stringify(getDocuNumResponse));
				if(getDocuNumResponse.errCode!=0){
					AlertErr(getDocuNumResponse.errMsg);
					return;
				}
				$scope.unsignedDocuNum=getDocuNumResponse.newDocuCount;
				$scope.signedDocuNum=getDocuNumResponse.signedDocuCount;
				$scope.userGetUnSignedDocuListCallBackFunc(function(){ });
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
				AlertErr("连接服务端异常: "+textStatus);
			}
		});
		}catch(Error){
			AlertErr("异常,请稍后再次尝试");
		}

	}

	$scope.userRequestCertCallBackFunc=function(sResult,servURL){

	//ShowWait();
	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
	type: "post",
	data: sResult,
	timeout:$scope.TimeOut,
	dataType: 'json',
	contentType: 'application/json;charset=utf-8',
	url:servURL,
	success: function (reqCertResponse) {
	//CloseWait();
			if(reqCertResponse==null||typeof(reqCertResponse)=='undefined'){
		     AlertErr("服务器连接失败,请稍后再次尝试");
		    return;
	        }	
	
	
	$scope.userMobile=reqCertResponse.mobile;
	$scope.menuHide=true;
	if (reqCertResponse.errCode!='0'){
			$scope.stopProgressDialog();
			AlertErr("连接失败，请重试");
		return;
	}

	var paramData = JSON.stringify(reqCertResponse);
	$scope.needAutoLogin=1;
	request('signet','setUserCertProperty',paramData);

	},
	error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						$scope.stopProgressDialog();
						AlertErr("请求超时,请稍后再次尝试");

						return;
					}
				//http status code，超时 408
				$scope.stopProgressDialog();
		  AlertErr("连接服务端异常: "+textStatus);
  }
});
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}

	}

	$scope.userActiveCallBackFunc=function(sResult,servURL){

	//ShowWait();
               //alert(sResult);
	try{
		if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
	type: "post",
	data: sResult,
	dataType: 'json',
	timeout:$scope.TimeOut,
	contentType: 'application/json;charset=utf-8',
	url:servURL,
	success: function (activeResponse) {
                //alert(activeResponse);
	if(activeResponse==null||typeof(activeResponse)=='undefined'){
		 AlertErr("服务器连接失败,请稍后再次尝试");
         $scope.stopProgressDialog();
		 return;
	 }
	
	if (activeResponse.errCode!='0'){
        $scope.stopProgressDialog();
                                    //alert(activeResponse.errCode);
                                    //alert(activeResponse.errMsg);
                                    AlertErr("异常:"+activeResponse.errMsg);
		//AlertErr("连接失败，请重试");
		return;
	}

	var arr=new Array();

	var paramObj=new Object();

	paramObj.msspID=$scope.msspID;
	paramObj.pin=document.getElementById("userpin1").value;
	paramObj.rsaTBSCertReq=activeResponse.rsaTBSCertReq;
	paramObj.rsaServerSign=activeResponse.rsaServerSign;
	paramObj.rsaSignAlg=activeResponse.rsaSignAlg;
	paramObj.rsaPubKey=activeResponse.rsaPubKey;
	paramObj.sm2TBSCertReq=activeResponse.sm2TBSCertReq;
	paramObj.sm2ServerPubKey=activeResponse.sm2ServerPubKey;
	paramObj.sm2ServerSign=activeResponse.sm2ServerSign;
	paramObj.rsaTBSCertReq_login=activeResponse.rsaTBSCertReq_login;
	paramObj.rsaServerSign_login=activeResponse.rsaServerSign_login;
	paramObj.rsaSignAlg_login=activeResponse.rsaSignAlg_login;
	paramObj.rsaPubKey_login=activeResponse.rsaPubKey_login;
	paramObj.sm2TBSCertReq_login=activeResponse.sm2TBSCertReq_login;
	paramObj.sm2ServerSign_login=activeResponse.sm2ServerSign_login;
	paramObj.sm2ServerPubKey_login=activeResponse.sm2ServerPubKey_login;

	var paramData = JSON.stringify(paramObj);

	request('signet','userRequestCert',paramData);
	},
	error: function(XMLHttpRequest, textStatus, errResponse)
	{
                 CloseWait();
					if(textStatus=='timeout'){
						$scope.stopProgressDialog();
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
			$scope.stopProgressDialog();
				//http status code，超时 408
		  AlertErr("连接服务端异常: "+textStatus);
  }
});
	}catch(Error){
		AlertErr("异常,请稍后尝试");
	}


	}

	$scope.userGetDeviceListCallBackFunc=function(sResult,servURL){
			//ShowWait();
			try{
				if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:'POST',
			timeout:$scope.TimeOut,
			contentType:'application/json;charset=utf-8',
			url:servURL,
			data:sResult,
			dataType:'json',
			success:function(devicelistResponse){
				$scope.deviceList=new Array();
				CloseWait();
		if(devicelistResponse==null||typeof(devicelistResponse)=='undefined'){
			AlertErr("服务器连接失败,请稍后再次尝试");
			return;
		}				
				if(devicelistResponse.errCode!='0'){
					AlertErr("异常: "+devicelistResponse.errMsg);
					return;
				}else{
					for(var item in devicelistResponse.devices){
						var paramObj=new Object();
						paramObj.deviceName=devicelistResponse.devices[item].deviceName;
						paramObj.imei=devicelistResponse.devices[item].imei;
						paramObj.id=devicelistResponse.devices[item].id;
						paramObj.osVersion=devicelistResponse.devices[item].osVersion;
						paramObj.mobile=devicelistResponse.devices[item].mobile;
						console.log("$scope.deviceObject.imei:"+$scope.deviceObject.imei);
						if(paramObj.imei!=$scope.deviceObject.imei){
							$scope.deviceList.push(paramObj);
						}
						console.log("DeviceList Device:"+JSON.stringify(paramObj));
						$scope.deviceList.push(paramObj);
					}
					$scope.$apply();
				}
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
						AlertErr("连接服务端异常: "+textStatus);
					}
		});
			}catch(Error){
				AlertErr("异常,请稍后尝试");
			}
	}

	$scope.userGetUnSignedDocuListCallBackFunc=function(callback){

		console.log("$scope.reqDocuType userGetUnSignedDocuListCallBackFunc:"+$scope.reqDocuType);
		var paramObj=new Object();
		paramObj.accessToken=$scope.accessToken;
		paramObj.docuStatus=$scope.reqDocuType;
		paramObj.start="0";
		paramObj.step="10";
		paramObj.version="1.0";
		$scope.fileCount=0;
		
		
		var paramData=JSON.stringify(paramObj);
		console.log("userGetUnSignedDocuListCallBackFunc request:"+paramData);
		var servURL=$scope.serverAddr+"getdoculist";
		$scope.doculistURL=servURL;

		//ShowWait();
		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:'POST',
			timeout:$scope.TimeOut,
			contentType:'application/json;charset=utf-8',
			url:servURL,
			data:paramData,
			dataType:'json',
			success:function(doculistResponse){
				CloseWait();
			if(doculistResponse==null||typeof(doculistResponse)=='undefined'){
				AlertErr("服务器连接失败,请稍后再次尝试");
				return;
			}
				console.log("doculistResponse:"+JSON.stringify(doculistResponse));
				if(doculistResponse.errCode!='0'){
					AlertErr("异常: "+doculistResponse.errMsg);
					return;
				}else{
					var newestCount=0;
					 $scope.scrollItemshead=new Array();
					 $scope.scrollItems=new Array();
					for(var item in doculistResponse.signDocuInfos)
					{

					 var paramObj=new Object();

					 paramObj.showTime=getFormatDate(new Date(doculistResponse.signDocuInfos[item].createDate),"yyyy-MM-dd hh:mm:ss");
					 paramObj.name=doculistResponse.signDocuInfos[item].fileName.replace(".pdf","");

					 if(paramObj.name.length>=10){
						 paramObj.showName=paramObj.name.substr(0,10)+"...";
					 }else{
						 paramObj.showName=paramObj.name;
					 }
					 paramObj.time=getFormatDate(new Date(doculistResponse.signDocuInfos[item].createDate),"yyyy-MM-dd hh:mm:ss");
					// alert(paramObj.des)
					 paramObj.des=doculistResponse.signDocuInfos[item].fileDesc;
					 paramObj.viewURL=doculistResponse.signDocuInfos[item].viewURL;
					// var url=doculistResponse.signDocuInfos[item].viewURL;
					// paramObj.viewURL=url.replace("http://192.168.136.116:8080","file:///android_asset");
					 paramObj.id=doculistResponse.signDocuInfos[item].id;
					 paramObj.agentName=doculistResponse.signDocuInfos[item].agentName;
					 //paramObj.agentName=getFormatDate(new Date(doculistResponse.signDocuInfos[item].lastDate),"yyyy-MM-dd hh:mm:ss");
					 paramObj.state=doculistResponse.signDocuInfos[item].docuStatus;
					 paramObj.agentImg=doculistResponse.signDocuInfos[item].agentImg;
					 if(paramObj.state=="WAITING_SIGN")
					 {
						 paramObj.showSignBtn=true;
					 }else{
						 paramObj.showSignBtn=false;
					 }


					//paramObj.logo='image/bjca.png';
					paramObj.logo=doculistResponse.signDocuInfos[item].agentImg;

					$scope.scrollItems.push(paramObj);
					 $scope.fileCount++;
					var nowTime=new Date();
					 var finishTime=doculistResponse.signDocuInfos[item].lastDate;

					var remindTime=compareDate(nowTime,finishTime);

					if(paramObj.state=="SIGN_FINISH"){
						paramObj.showRemindTime="文档已签署";
						paramObj.showSignBtn=false;
					}else if(remindTime=="DOCU_OVERDUE"){
						paramObj.showRemindTime="文档已过期";
						paramObj.showSignBtn=false;
						}else{
						  paramObj.showRemindTime=remindTime;
						  paramObj.showSignBtn=true;
						}


					 if(newestCount!=2)
					 {
						 $scope.scrollItemshead.push(paramObj);
						 newestCount++;
					 }

					}
					$scope.$apply();
					callback.call();

					if(($scope.originSignImage==null)&&($scope.signImage==null)){
						$scope.firstActive=true;
						$scope.openSignSetting();
					}
					
				}
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
						AlertErr("连接服务端异常: "+textStatus);
					}
		});
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}
	}

	$scope.openPdf = function(url) {
        $scope.pdfview_Ini($scope.userDocuDetail.viewURL,$scope.userDocuDetail.state);
		//$location.path('/pdfview');
        //window.location.reload();
	}


	$scope.showDocuDetail = function(id) {

	$scope.scrollItems.forEach(function(v, i, _) {
	  if (v.id == id) {

	 $scope.NoBottom_Ini();
		 $scope.userDocuDetail=v;
		 $location.path('/signdocu');

	  }
	});
  };

	  $scope.userRegiestCallBackFunc=function(sResult,servURL)
	{


		ShowWait();
		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
				type: 'POST',
				contentType:'application/json; charset=utf-8',
				url: servURL,
				data: sResult,
				timeout:$scope.TimeOut,
				dataType: 'json',
				success: function(regResponse){
				CloseWait();
			if(regResponse==null||typeof(regResponse)=='undefined'){
				AlertErr("服务器连接失败,请稍后再次尝试");
				return;
			}				
		   if (regResponse.errCode!='0'){
						AlertErr("异常: "+regResponse.errMsg);
						return;
					}

				  var paramObj=new Object();

				  paramObj.name=document.getElementById("name").value;
				  paramObj.mobile=document.getElementById("mobilephone").value;
				  paramObj.accessToken=regResponse.accessToken;

				  var paramData = JSON.stringify(paramObj);
                                    //alert("userRegiestCallBackFunc");
				  request('signet','setUserRegProperty',paramData);
				   $scope.isOTP=true;  //显示OTP
					   $scope.sendmsg();   //发送短信并倒计时

				},
			   error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
						AlertErr("连接服务端异常: "+textStatus);
					}
				});
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}
  }



	$scope.questionOptions =
	[
	  { id: '-1', label:'请选择安全问题' },
	{ id: '您童年记忆最深的电话号码是什么？', label:'您童年记忆最深的电话号码是什么？' },
	{ id: '您小时候最喜欢去的地方是哪里？',  label:'您小时候最喜欢去的地方是哪里？' },
	{ id: '您最喜哪位演员、艺术家或音乐人是谁？',  label:'您最喜哪位演员、艺术家或音乐人是谁？' },
	{ id: '您儿时最好的朋友是谁？',  label:'您儿时最好的朋友是谁？' },
	{ id: '您第一位老师是谁？',  label:'您第一位老师是谁？' },
	{ id: '您第一份工作的经理是谁? ',  label:'您第一份工作的经理是谁?' }

  ];



	var updateclock=function()
  {

	   $scope.count--;
		   $scope.msg= ""+$scope.count +"秒";
		if($scope.count==0)
		{
		$scope.isDisabled = false;
		$scope.msg="再次发送";
		$scope.count=10;
		}

		   $timeout(function(){	if($scope.isDisabled) updateclock();},1000);

	};

	  $scope.sendmsg=function()
  {

	$scope.isDisabled = true;
	AlertErr( "发送短信");
	updateclock();
   }


	 $scope.updateStop=function()
  {
	 $scope.isDisabled = false;
	 $scope.msg="发送短信验证码";
	 $scope.count=60;
   }

	 /////////////////////////////////////////////////////////////////////////////////////////////



	 $scope.updateregister=function()
  {
	$scope.isDisabled = true;
   }

	$scope.checkotp=function()
  {
	$scope.isChecked = true;
	updateStop();
   }


   //
  // 'modalQusetion' screen
  //



   $scope.checkAnswer=function()
  {
	$scope.isAnswerTrue = true;
   }



  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
	$rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
	$rootScope.loading = false;
  });

 
 $scope.topReached=function(){
 }
 
$scope.bottomReached = function() {
	
	  console.log("$scope.reqDocuType bottomReached:"+$scope.reqDocuType);
		var requestObj=new Object();
		requestObj.start=$scope.fileCount;
		requestObj.step=$scope.step;
		requestObj.docuStatus=$scope.reqDocuType;
		requestObj.accessToken=$scope.accessToken;
		requestObj.version='1.0';

		var requestData=JSON.stringify(requestObj);
		console.log("bottomReached requestData:"+requestData);
		
		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:'POST',
			timeout:$scope.TimeOut,
			contentType:'application/json;charset=utf-8',
			url:$scope.doculistURL,
			data:requestData,
			dataType:'json',
			success:function(doculistResponse)
			{
			console.log("bottomReached doculistResponse:"+JSON.stringify(doculistResponse));

			if(doculistResponse==null||typeof(doculistResponse)=='undefined'){
				showToast("服务器连接失败,请稍后再次尝试");
				return;
			}	
				if(doculistResponse.errCode!='0'){
					showToast("异常: "+doculistResponse.errMsg);
					return;
				}else
			{
				 if(doculistResponse.count==$scope.fileCount)
			  {
				 showToast("已加载所有文档");
				 return;
			  }	
			   
			 for(var item in doculistResponse.signDocuInfos)
					{
					 var paramObj=new Object();

					 paramObj.time=getFormatDate(new Date(doculistResponse.signDocuInfos[item].createDate),"yyyy-MM-dd hh:mm:ss");
					 paramObj.des=doculistResponse.signDocuInfos[item].fileDesc;
					 paramObj.viewURL=doculistResponse.signDocuInfos[item].viewURL;
					 paramObj.name=doculistResponse.signDocuInfos[item].fileName;

					 paramObj.id=doculistResponse.signDocuInfos[item].id;
					 paramObj.agentName=doculistResponse.signDocuInfos[item].agentName;
					 paramObj.state=doculistResponse.signDocuInfos[item].docuStatus;
					 paramObj.agentImg=doculistResponse.signDocuInfos[item].agentImg;
					
					 
					var nowTime=new Date();
					 var finishTime=doculistResponse.signDocuInfos[item].lastDate;

					var remindTime=compareDate(nowTime,finishTime);

					if(paramObj.state=="SIGN_FINISH"){
						paramObj.showRemindTime="文档已签署";
						paramObj.showSignBtn=false;
					}else if(remindTime=="DOCU_OVERDUE"){
						paramObj.showRemindTime="文档已过期";
						paramObj.showSignBtn=false;
						}else{
						  paramObj.showRemindTime=remindTime;
						  paramObj.showSignBtn=true;
						}
						
					 //$scope.scrollItems.push(paramObj);
					 $scope.ShowItems.push(paramObj);
					 $scope.fileCount++;
					}
									
					$scope.$apply();
				}
			  
				
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						showToast("请求超时,请稍后再次尝试");
						return;
					}
						showToast("连接服务端异常: "+textStatus);
					}
		});
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}

  }


$scope.AddsignDocuList = function(signDocuList)
{


     	for(var item in signDocuList)
					{
					 var paramObj=new Object();

					 paramObj.time=getFormatDate(new Date(signDocuList[item].createDate),"yyyy-MM-dd hh:mm:ss");
					 paramObj.des=signDocuList[item].fileDesc;
					 paramObj.viewURL=signDocuList[item].viewURL;
					 paramObj.name=signDocuList[item].fileName;
					 paramObj.id=signDocuList[item].id;
					 paramObj.agentName=signDocuList[item].agentName;
					 paramObj.state=signDocuList[item].docuStatus;
					 paramObj.agentImg=signDocuList[item].agentImg;
			 
					 $scope.scrollItems.push(paramObj);
					 $scope.ShowItems.push(paramObj);
					  
					$scope.fileCount++;
					var nowTime=new Date();
					 var finishTime=signDocuList[item].lastDate;

					var remindTime=compareDate(nowTime,finishTime);

					if(paramObj.state=="SIGN_FINISH"){
						paramObj.showRemindTime="文档已签署";
						paramObj.showSignBtn=false;
					}else if(remindTime=="DOCU_OVERDUE"){
						paramObj.showRemindTime="文档已过期";
						paramObj.showSignBtn=false;
						}else{
						  paramObj.showRemindTime=remindTime;
						  paramObj.showSignBtn=true;
						}
					}
			$scope.$apply();
}
	

  
   $scope.active = function()
   {
	 $window.location.herf="#/active"
	};


  $scope.login = function()
  {
	AlertErr('You submitted the login form');
  };



   $scope.setUserpin = function()
   {
	 $scope.isUserpin=true;
	 $scope.isPrivate=false;

	};

	$scope.openSignSetting = function()
  {
	//alert("openSignSetting")
	 $scope.navHideBottom=true;
	 $scope.navHideTop=false;
	 $scope.revertScreen();
  };

  $scope.openCaptureSign=function()
  {
	  request('signet','openCaptureSign','');
  }

  $scope.openAbout = function()
  {
	$location.path('/about')

  };

  $scope.userExit=function()
  {
	//request('signet','removeInfo','');
    request('sigent', 'userExit', '');
	//$location.path('/login');
  };

  $scope.openDeviceManage=function(){
		$location.path('/device');
	};

	$scope.versionCheck=function(){

		request('signet','versionCheck','');

	};
	$scope.showAboutInfo=function(){
		request('signet','showVersionInfo','');
	}
	$scope.addTestDocu=function(){
		
		ShowWait();
		var paramObj=new Object();
		paramObj.accessToken=$scope.accessToken;
		paramObj.version="1.0";
		
		var paramData=JSON.stringify(paramObj);
		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:'POST',
			timeout:$scope.TimeOut,
			contentType:'application/json;charset=utf-8',
			url:$scope.serverAddr+'newtestdoc',
			data:paramData,
			dataType:'json',
			success:function(addTestDocuResponse){
				CloseWait();
				if(addTestDocuResponse.errCode=='0'){
					AlertErr("添加测试文档成功");
					$scope.unsignedDocuNum=$scope.unsignedDocuNum+1;
				}else{
					AlertErr("添加测试文档失败");
				}
			},
			error: function(XMLHttpRequest, textStatus, errResponse){
				CloseWait();
				if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
						AlertErr("连接服务端异常: "+textStatus);
			}
		});
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}
	}

   $scope.setPrivate = function()
   {
	 $scope.isPrivate=true;
	 $scope.isUserpin=false;
   };


  $scope.deleteDevice = function(device)
  {

	console.log("device:"+JSON.stringify(device));
	var paramObj=new Object();
	paramObj.id=device.id;
	paramObj.deviceName=device.deviceName;
	
	
	request('signet','userDelDevice',JSON.stringify(paramObj));
	
	 };
	 
	 $scope.delDeviceCallBackFunc=function(del_dev){
		 
	var delDevObj=JSON.parse(del_dev);	
	var paramObj=new Object();
	paramObj.accessToken=$scope.accessToken;
	paramObj.deviceID=delDevObj.id;
	
	var paramData=JSON.stringify(paramObj);
	var removeDeviceAddr=$scope.serverAddr+"removeuserdevice";
		   // ShowWait();
		try{
			if($scope.msspAjax){
			$scope.msspAjax.abort();
			}
		$scope.msspAjax=jQuery.ajax({
			type:'POST',
			timeout:$scope.TimeOut,
			contentType:'application/json;charset=utf-8',
			url:removeDeviceAddr,
			data:paramData,
			dataType:'json',
			success:function(removeDeviceResponse){

			CloseWait();
			if(removeDeviceResponse==null||typeof(removeDeviceResponse)=='undefined'){
				AlertErr("服务器连接失败,请稍后再次尝试");
				return;
			}	
				if(removeDeviceResponse.errCode!='0'){
					AlertErr("异常: "+removeDeviceResponse.errMsg);
					return;
				}else{
					
					request('signet','delDevResult',del_dev);
					
				}
			},
			error: function(XMLHttpRequest, textStatus, errResponse)
				{
					CloseWait();
					if(textStatus=='timeout'){
						AlertErr("请求超时,请稍后再次尝试");
						return;
					}
						AlertErr("连接服务端异常: "+textStatus);

				}
		});
		}catch(Error){
			AlertErr("异常,请稍后尝试");
		}
	 }

	//lhk_new 文档列表页搜索下的切换
	

	$scope.show_all_file=function($event){
		
		$("#scroll_zx_files").addClass("hidden");
		$scope.scroll_up_img2='1';
		if($("#scroll_all_files").hasClass("hidden")){
			$("#scroll_all_files").removeClass("hidden");
			$scope.scroll_up_img1='2';
			$("#scroll_black").show();
			$("#search_diva1").addClass("blue007");
		}else{
			$("#scroll_all_files").addClass("hidden");
			$scope.scroll_up_img1='1';
			$("#scroll_black").hide();
			$("#search_diva1").removeClass("blue007");
		}
		
	}
	$scope.scroll_zuixin_file=function($event){
		$("#search_diva1").removeClass("blue007");
		$("#scroll_all_files").addClass("hidden");
		$scope.scroll_up_img1='1';
		if($("#scroll_zx_files").hasClass("hidden")){
			$("#scroll_zx_files").removeClass("hidden");
			$scope.scroll_up_img2='2';
			$("#scroll_black").show();
			$("#search_diva2").addClass("blue007");
		}else{
			$("#scroll_zx_files").addClass("hidden");
			$scope.scroll_up_img2='1';
			$("#scroll_black").hide();
			$("#search_diva2").removeClass("blue007");
		}
		
	}
	
	$scope.click_scroll=function(con){
		$("#search_diva1").removeClass("blue007");
		$("#search_diva2").removeClass("blue007");
		$("#scroll_black").hide();
		$scope.scroll_up_img1='1';
		//$scope.scroll_all_file=con;
		
		textemp1=$("#scroll_all_wenzi").html();
		$("#scroll_all_wenzi").html($("#scroll_daiqianshu"+con).html());
		$("#scroll_daiqianshu"+con).html(textemp1);
		
		$("#scroll_all_files").addClass("hidden");
		$("#scroll_zx_files").addClass("hidden");
	}
	$scope.click_scroll01=function(con){
		$("#search_diva1").removeClass("blue007");
		$("#search_diva2").removeClass("blue007");
		$("#scroll_black").hide();
		$scope.scroll_up_img2='1';
		//$scope.scroll_zx_file=con;
		
		textemp2=$("#scroll_zx_wenzi").text();
		$("#scroll_zx_wenzi").text($("#scroll_daiqianshua"+con).text());
		$("#scroll_daiqianshua"+con).text(textemp2);
		
		$("#scroll_all_files").addClass("hidden");
		$("#scroll_zx_files").addClass("hidden");
	}
	$scope.scroll_all_zx=function(){
		$scope.scroll_up_img1='1';
		$scope.scroll_up_img1='1';
		$("#scroll_black").hide();
		$("#search_diva1").removeClass("blue007");
		$("#search_diva2").removeClass("blue007");
		if(!$("#scroll_all_files").hasClass("hidden")){
			$("#scroll_all_files").addClass("hidden");
		}
		if(!$("#scroll_zx_files").hasClass("hidden")){
			$("#scroll_zx_files").addClass("hidden");
		}
	
	}
	
	
	
	$scope.logchang=function(n){
		$("#log_zh1").removeClass("on");$("#log_zh2").removeClass("on");
		$("#log_zh"+n).addClass("on");
	}
	
	$scope.search_change=function(){
		$("#search_l_img").attr("src","image/1-12.png");
		$scope.search_show=true;
	}
	
	$scope.search_qingkong=function(){
		$("#search_input").val("")
		$scope.search_model="";
		$scope.search_show=false;
		$("#search_l_img").attr("src","image/search.png")
	}
	
	$scope.search_right_btn=function(){
		$scope.search_show=false;
	}
	
});
