//////////////////////////////与手机原生交互接口/////////////////////
 function initMethod(DevTypeParam) 
{
   //alert("初始化函数被调用！");
   window.DevType = DevTypeParam;
}

 function request(sp ,invoke ,myJSONText) 
{
    
   // var myJSONText = JSON.stringify(paramArray);
    if(window.DevType == null || window.DevType == '1') 
    {
             
        window.signet.transmit(sp,invoke,myJSONText);
        return;    
    }
    if(window.DevType == "2") {
        var type = "IOS";
        
        window.location.href = "signet?" + invoke + ":?" + myJSONText;
    }
   
}

function disPlaySMS(otp){
	
	document.getElementById("otp").value=otp
}

 function userRegiestCallBack(sResult,servURL)
	{

    //调用Angular内部处理 进行数据交互  
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

function userReActiveCallBack(sResult,servURL){
		var scope = angular.element(document.getElementById("app-content")).scope();
 	scope.$apply(function () {
    scope.userReActiveCallBackFunc(sResult,servURL);
    });

}

////////////////身份证校验与手机号校验/////////////////////////////////////////////////////////////
 
 function isMobileNo(mobile)
 {
 	var num=String(mobile);
 		 if(num.length!=11) 
       { 
           return false; 
       }
         
       var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
       if(!myreg.test(num)) 
       { 

           return false; 
       }else{
       	return true;
       }  
 
 }
 
function isIdCardNo(num)  
{ 
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
        //error = "输入身份证号码长度不对！"; 
        //alert(error); 
        //frmAddUser.txtIDCard.focus(); 
        return false; 
    }     
    // check and set value 
    for(i=0;i<intStrLen;i++) { 
        varArray[i] = idNumber.charAt(i); 
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) { 
            //error = "错误的身份证号码！."; 
            //alert(error); 
            //frmAddUser.txtIDCard.focus(); 
            return false; 
        } else if (i < 17) { 
            varArray[i] = varArray[i]*factorArr[i]; 
        } 
    } 
    if (intStrLen == 18) { 
        //check date 
        var date8 = idNumber.substring(6,14); 
        if (checkDate(date8) == false) { 
            //error = "身份证中日期信息不正确！."; 
            //alert(error); 
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
            //error = "身份证效验位错误!...正确为： " + intCheckDigit + "."; 
            //alert(error); 
            return false; 
        } 
    }  
    else{        //length is 15 
        //check date 
        var date6 = idNumber.substring(6,12); 
        if (checkDate(date6) == false) { 
            //alert("身份证日期信息有误！."); 
            return false; 
        } 
    } 
    //alert ("Correct."); 
    return true; 
} 
 
function checkDate(date) 
{ 
    return true; 
} 
////////////////////////////////////////////////////////////////////////////

   

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
  $routeProvider.when('/',              {templateUrl: 'register1.html', reloadOnSearch: false});
  $routeProvider.when('/register1',     {templateUrl: 'register1.html', reloadOnSearch: false});

 

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

app.directive('idnumberValidator', ['$log', function($log) {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function($scope, $element, $attrs, $ngModelCtrl) {
                /*
              var verifyRule = [/^\d+$/, /^[a-z]+$/, /^[A-Z]+$/];
              var verify = function(input) {
                  return !(verifyRule[0].test(input) || 
                           verifyRule[1].test(input) || 
                           verifyRule[2].test(input));
              };
               */
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
 
 app.directive('mobileValidator', ['$log', function($log) {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function($scope, $element, $attrs, $ngModelCtrl) {
				
			               $ngModelCtrl.$parsers.push(function(input) {
                  var validity = isMobileNo(input);
                  $ngModelCtrl.$setValidity('formatter', validity);
                  return validity ? input : false;
              });
              $ngModelCtrl.$formatters.push(function(input) {
                  var validity = isMobileNo(input);
                  $ngModelCtrl.$setValidity('formatter', validity);
                  return validity ? input : false;
              })
          }
      }
    }]);

//
// For this trivial demo we have just a unique MainController 
// for everything
  
app.controller('MainController', function($rootScope, $scope,$timeout){
	
	///////////////////User register 用户注册页面//////////////////////////////////////////////////////////////
	  $scope.register=function(user)
	 {
	 	
	 	 var paramObj=new Object();
	 	 
	 	 paramObj.name=user.name;
	 	 paramObj.mobile=user.mobilephone;
	 	 paramObj.idCardNum=user.paperid;
	 	 
	 	 var paramData = JSON.stringify(paramObj);

        request('signet','userRegiest',paramData);
 	 	 
	 }
	
	 $scope.activeuser=function(bindinfo){
		
 if(bindinfo.userpin1!=bindinfo.userpin2)
 {
 	 alert("两次输入不一致，请重新输入");
 	 return;
 }
 	var paramObj=new Object();
 	
 	paramObj.pin=bindinfo.userpin1;
 	//paramObj.otp=bindinfo.otpCode;
	paramObj.otp=document.getElementById("otp").value;
	
	paramObj.token=$scope.accessToken;
	 var paramData = JSON.stringify(paramObj);
		
	request('signet','userActive',paramData);

}

	$scope.userRequestCertCallBackFunc=function(sResult,servURL){
	
	jQuery.ajax({
	type: "post",
	data: sResult,
	dataType: 'json',
	contentType: 'application/json;charset=utf-8',
 	url:servURL,
	success: function (reqCertResponse) {
	if (reqCertResponse.errCode!='0'){
	alert(regResponse.errCode);
		return;
	}
	
		
	var paramData = JSON.stringify(reqCertResponse);

	request('signet','setUserCertProperty',paramData);
	
	},
	error:function(error) {
     			//http status code，超时 408
          alert("错误码:"+error.status+",错误信息:"+error.statusText);
  }
});
	
	}
	
	$scope.userActiveCallBackFunc=function(sResult,servURL){
		
	jQuery.ajax({
	type: "post",
	data: sResult,
	dataType: 'json',
	contentType: 'application/json;charset=utf-8',
 	url:servURL,
	success: function (activeResponse) {
		
	if (activeResponse.errCode!='0'){
		alert(activeResponse.errMsg);
		return;
	}
	
	var arr=new Array();
	
	var paramObj=new Object();	
	
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
	error:function(error) {
     			//http status code，超时 408
          alert("错误码:"+error.status+",错误信息:"+error.statusText);
  }
});
	
	
	}
	
	$scope.userReActiveCallBackFunc=function(sResult,servURL){
	
			jQuery.ajax({  
                type: 'POST',  
                contentType:'application/json; charset=utf-8', 
                url: servURL,  
                data: sResult,  
                dataType: 'json',  
                success: function(regActiveResponse){  
				
           if (regActiveResponse.errCode!='0'){
						alert(regActiveResponse.errMsg);
						return;
					}
					
                  var paramObj=regActiveResponse.accessToken;
                 
	           		
     			  request('signet','setUserReActiveProperty',paramObj);
	               $scope.isOTP=true;  //显示OTP
	 	 	           //$scope.sendmsg();   //发送短信并倒计时
                                 
	            },  
	            error: function(regResponse)
	                {  
	                    alert("error"+JSON.stringify(regActiveResponse));  
	                }  
	            }); 
	
	}
	
	
	  $scope.userRegiestCallBackFunc=function(sResult,servURL)
	{

		jQuery.ajax({  
                type: 'POST',  
                contentType:'application/json; charset=utf-8', 
                url: servURL,  
                data: sResult,  
                dataType: 'json',  
                success: function(regResponse){  
				
           if (regResponse.errCode!='0'){
						alert(regResponse.errTrace);
						return;
					}
					
                  var paramObj=new Object();
				  
				  paramObj.name=document.getElementById("name").value;
	              paramObj.mobile=document.getElementById("mobilephone").value;
				  paramObj.accessToken=regResponse.accessToken;
				  $scope.accessToken=regResponse.accessToken;
                 
	           	  var paramData = JSON.stringify(paramObj);
	           		
     			  request('signet','setUserRegProperty',paramData);
	               $scope.isOTP=true;  //显示OTP
	 	 	           $scope.timeback();   //发送短信并倒计时
                                 
	            },  
	            error: function(regResponse)
	                {  
	                    alert("error"+JSON.stringify(regResponse));  
	                }  
	            }); 
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
	
	
	$scope.selectQuestionAction = function() 
	{
   // alert($scope.questionOption);
  };
   
  	
	// User Active Page
	$scope.accessToken;
	  $scope.count=30;
    $scope.msg= "发送短信验证码";
		//$scope.isDisabled = true;
        
    var updateclock=function()
  {
  	
   	   $scope.count--;
		   $scope.msg= "还剩"+$scope.count +"秒";
      	if($scope.count==0)
      	{
        $scope.isDisabled = false;
        $scope.msg="再次发送";
        $scope.count=30;
        }
		
		   $timeout(function(){	if($scope.isDisabled) updateclock();},1000);
		 
	};	
			 
	  $scope.sendmsg=function()
  {
  	
    $scope.isDisabled = true;
    request('signet','userReActive',"");
   	updateclock();
   }

	$scope.timeback=function(){
	$scope.isDisabled = true;
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
   
});