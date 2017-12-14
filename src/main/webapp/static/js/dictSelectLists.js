var __dictSelectLists = {};
__dictSelectLists["InquiryType"] = {"items":[{"value":"goodsInquiry","text":"商品咨询"},{"value":"stockAndLogistic","text":"库存及配送"},{"value":"pays","text":"支付问题"},{"value":"invoiceAndWarranty","text":"发票及保修"},{"value":"promoteAndGift","text":"促销及赠品"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["weightUnit"] = {"items":[{"value":"kg","text":"千克"},{"value":"g","text":"克"},{"value":"mg","text":"毫克"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["authScope"] = {"items":[{"value":"sys","text":"系统"},{"value":"mall","text":"商城"},{"value":"shop","text":"店铺"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["AttrType"] = {"items":[{"value":"Text","text":"单行文本"},{"value":"MlText","text":"多行文本"},{"value":"Bool","text":"布尔"},{"value":"Int","text":"整数"},{"value":"Float","text":"浮点"},{"value":"Date","text":"日期"},{"value":"DateTime","text":"日期时间"},{"value":"Enum","text":"枚举选择"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["smsUsage"] = {"items":[{"value":"regist","text":"注册"},{"value":"logPass","text":"找回登录密码"},{"value":"pay","text":"支付"},{"value":"payPass","text":"找回支付密码"},{"value":"other","text":"其他"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["mailType"] = {"items":[{"value":"smtp","text":"POP3"},{"value":"imap","text":"IMAP"},{"value":"exchange","text":"Exchange"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["gender"] = {"items":[{"value":"X","text":"未知"},{"value":"M","text":"男"},{"value":"F","text":"女"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["appType"] = {"items":[{"value":"web","text":"Web站点"},{"value":"wap","text":"Wap站点"},{"value":"mobile","text":"移动设备"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["mailTplType"] = {"items":[{"value":"txt","text":"纯文本邮件"},{"value":"html","text":"HTML邮件"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["resType"] = {"items":[{"value":"url","text":"url"},{"value":"btn","text":"按钮"},{"value":"menu","text":"菜单"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["dataType"] = {"items":[{"value":"Text","text":"单行文本"},{"value":"MlText","text":"多行文本"},{"value":"Bool","text":"布尔"},{"value":"Int","text":"整数"},{"value":"Float","text":"浮点"},{"value":"Date","text":"日期"},{"value":"DateTime","text":"日期时间"},{"value":"Enum","text":"枚举选择"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["verfAspect"] = {"items":[{"value":"phoneNo","text":"手机号码"},{"value":"email","text":"邮箱"},{"value":"idCertNo","text":"身份证号码"},{"value":"realName","text":"真实姓名"},{"value":"birthDate","text":"出生日期"},{"value":"qq","text":"QQ号码"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["mobileOs"] = {"items":[{"value":"andPhone","text":"android手机"},{"value":"andPad","text":"android平板"},{"value":"iPhone","text":"iPhone"},{"value":"iPad","text":"iPad"},{"value":"winPhone","text":"win手机"},{"value":"winPad","text":"win平板"},{"value":"unkPhone","text":"未知手机"},{"value":"unkPad","text":"未知平板"}],"unSelectedItem":null,"defaultValue":null};
__dictSelectLists["caroAnim"] = {"items":[{"value":"fadeIn","text":"淡入淡出"},{"value":"slideLeft","text":"向左滑动"},{"value":"slideRight","text":"向右滑动"},{"value":"slideUp","text":"向上滑动"},{"value":"slideDown","text":"向下滑动"}],"unSelectedItem":null,"defaultValue":null};

//获取（用于下拉列表的）指定枚举字典信息
function getDictSelectList(name, unSelectValue, unSelectText, defaultValue) {
	var dictSelectList = __dictSelectLists[name];
	if (dictSelectList) {
		dictSelectList = merge({}, dictSelectList);
		//
		delete dictSelectList["unSelectedItem"];
		delete dictSelectList["defaultValue"];
		//
		if (unSelectText) {
			dictSelectList["unSelectedItem"] = {};
			dictSelectList["unSelectedItem"]["value"] = unSelectValue;
			dictSelectList["unSelectedItem"]["text"] = unSelectText;
		}
		if (typeof defaultValue != "undefined") {
			dictSelectList["defaultValue"] = defaultValue;
		}
	}
	return dictSelectList;
}