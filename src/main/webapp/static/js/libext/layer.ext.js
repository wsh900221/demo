declare("Layer.core");
// layer.alert/layer.confirm/layer.msg/layer.tips皆为$.layer()的二次封装
Layer.core.fn = function() {
	var THIS = this;
	var windowWidth = Math.min($(window).width(), $(document).width);
	var layerIndex = -1;
	var closeTimer = null;
	//
	var typeMap = {
		"hint" : 0, // 信息框（默认）
		"page" : 1, // 页面层
		"iframe" : 2, // iframe层
		"loader" : 3, // 加载层
		"tip" : 4
		// tips层
	};
	var inputTypeMap = {
		"single" : 0,
		"multi" : 3
	};
	function getMsgConfig() {
		return {
			type : typeMap["hint"],
			title : false,
			dialog : {
				type : -1
			},
			border : [1, 0.5, '#666'],
			shadeClose : true,
			closeBtn : [0, false]
		};
	}

	function getHtmlConfig() {
		return {
			type : typeMap["page"],
			title : false,
			area : ['auto', 'auto'],
			closeBtn : [0, false], // 去掉默认关闭按钮
			page : {
			}
		};
	}

	function getPromptConfig() {
		return {
			type : inputTypeMap["single"],
			title : "请输入",
			val : "",
			length : 100
		};
	}

	function getTipsConfig() {
		return {
			style : ['background-color:#9EDD8C; color:#000; border:1px outset #EEEEEE;', '#9EDD8C'],
			maxWidth : 200,
			time : 3
		};
	}

	function getDialogConfig() {
		return {
			type : typeMap["page"],
			closeBtn : false,
			title : "对话框",
			area : ['', '240px'],
			// offset : ['40px', ''],
			// shift : 'top',
			page : {
				// dom : '#dlgLinkInfo'
			},
			btns : 2,
			btn : ['确定', '取消']
		};
	}

	function getFrameDialogConfig() {
		return {
			type : typeMap["iframe"],
			closeBtn : false,
			title : "",
			area : ['100%', '100%'],
			offset : ['-6px', ''],
			// shift : 'top',
			iframe : {
				// src : 'about:blank',
				scrolling : 'no'
			}
		};
	}

	function filterId(domId) {
		if ( typeof domId == "string") {
			if (domId.indexOf("#") != 0) {
				domId = "#" + domId;
			}
		}
		return domId;
	}

	function adjustPanel(fullHeight) {
		var theLayer = $id("xubox_layer" + layerIndex);
		if (fullHeight) {
			theLayer.css("top", 0);
		}
		var rootWidth = theLayer.width();
		if (rootWidth > windowWidth) {
			rootWidth.width(windowWidth);
		}
		var theMain = theLayer.find("> div.xubox_main");
		var theTitle = theMain.find("> .xubox_title");
		var theBtnBar = theMain.find("> .xubox_botton");
		var theTop = theTitle.is(":visible") ? theTitle.height() + 1 : 1;
		var theBottom = theBtnBar.is(":visible") && theBtnBar.find("a").size() > 0 ? theBtnBar.height() + 1 : (theBtnBar.hide(), 1);
		var thePage = theMain.find("> .xubox_page");
		thePage.css("top", theTop);
		thePage.css("bottom", theBottom);
		thePage.css("width", "100%");
	}

	function delBtnsBar(setRoundCorner) {
		var theLayer = $id("xubox_layer" + layerIndex);
		var theMain = theLayer.find("> div.xubox_main");
		var theBtnBar = theMain.find("> .xubox_botton");
		theBtnBar.remove();
		if (setRoundCorner === true) {
			theMain.height(theMain.height() + 2);
			var height = theMain.height() / 2;
			theMain.css("border-radius", height + "px");
			theMain.css("opacity", 0.9);
		}
	}

	//
	function adjustMsgText() {
		// xubox_msg xubox_text
		var theLayer = $id("xubox_layer" + layerIndex);
		var theText = theLayer.find("> div.xubox_main > div.xubox_dialog >span.xubox_text");
		theText.css("padding-top", "50px");
	}


	this.hide = function() {
		layer.close(layerIndex);
		layerIndex = -1;
		//
		return this;
	};
	this.hidePrevious = function() {
		clearTimeout(closeTimer);
		if (layerIndex != -1) {
			this.hide();
		}
		//
		return this;
	};
	//
	this.info = function(msg, callback) {
		this.hidePrevious();
		//
		layerIndex = layer.alert(msg, "info", callback);
		//
		adjustMsgText();
		//
		return this;
	};
	this.warning = function(msg, callback) {
		this.hidePrevious();
		//
		layerIndex = layer.alert(msg, "warning", callback);
		//
		adjustMsgText();
		//
		return this;
	};
	this.error = function(msg, callback) {
		this.hidePrevious();
		//
		layerIndex = layer.alert(msg, "error", callback);
		//
		adjustMsgText();
		//
		return this;
	};
	this.progress = function(msg) {
		this.hidePrevious();
		//
		layerIndex = layer.load(msg, "default");
		//
		delBtnsBar(true);
		//
		return this;
	};
	this.confirm = function(msg, yesCallback, noCallback) {
		this.hidePrevious();
		//
		layerIndex = layer.confirm(msg, yesCallback, noCallback);
		//
		return this;
	};
	this.prompt = function(config, yesCallback, noCallback) {
		this.hidePrevious();
		//
		config = config || {};
		if ( typeof config == "string") {
			config = {
				title : config
			};
		}
		var theConfig = merge(getPromptConfig(), config);
		//
		layerIndex = layer.prompt(theConfig, yesCallback, noCallback);
		//
		return this;
	};
	this.msg = function(msg, type, callback, closeDelay) {
		this.hidePrevious();
		//
		type = type || -1;
		var config = getMsgConfig();
		//
		config = merge(config, {
			dialog : {
				type : type,
				msg : msg
			}
		});
		if ( typeof callback == "function") {
			config.end = callback;
		}
		//
		layerIndex = $.layer(config);
		//
		delBtnsBar(true);
		//
		if (closeDelay !== false) {
			closeDelay = closeDelay || 3000;
			closeTimer = setTimeout(function() {
				THIS.hidePrevious();
			}, closeDelay);
		}
		//
		return this;
	};
	this.html = function(html) {
		this.hidePrevious();
		//
		var config = getHtmlConfig();
		//
		config = merge(config, {
			page : {
				html : html
			}
		});
		//
		layerIndex = $.layer(config);
		//
		delBtnsBar();
		//
		return this;
	};
	this.tips = function(html, follow, config) {
		this.hidePrevious();
		//
		config = config || {};
		var theConfig = merge(getTipsConfig(), config);
		//
		follow = filterId(follow);
		layerIndex = layer.tips(html, follow, theConfig);
		//
		delBtnsBar();
		//
		return this;
	};
	//
	function getFrameWindow() {
		var theMain = $id("xubox_layer" + layerIndex).find("> div.xubox_main");
		var frame = theMain.find("> iframe");
		return frameObj.size() > 0 ? frame.get(0) : null;
	}


	this.dialog = function(config) {
		this.hidePrevious();
		//
		config = config || {};
		config.src = config.src || "";
		config.dom = config.dom || "";
		//
		if (config.src) {
			config.iframe = config.iframe || {};
			config.iframe.src = config.src;
			//
			var dlgConfig = merge(getFrameDialogConfig(), config);
			//
			layerIndex = $.layer(dlgConfig);
			//
			adjustPanel();
		} else {
			config.page = config.page || {};
			config.page.dom = config.page.dom || config.dom;
			config.page.dom = filterId(config.page.dom);
			//
			var fullHeight = config.area && config.area.length == 2 && config.area[1] == "100%";
			//
			var dlgConfig = merge(getDialogConfig(), config);
			//
			layerIndex = $.layer(dlgConfig);
			//
			adjustPanel(fullHeight);
		}
		//
		return this;
	};
	//
	return this;
};
//
Layer.hideAll = function() {
	layer.closeAll();
};
//
Layer.hideTips = function() {
	layer.closeTips();
};
//
Layer.newOne = function() {
	return new Layer.core.fn();
};
Layer.info = function(msg, callback) {
	return Layer.newOne().info(msg, callback);
};
Layer.warning = function(msg, callback) {
	return Layer.newOne().warning(msg, callback);
};
Layer.progress = function(msg) {
	return Layer.newOne().progress(msg);
};
Layer.loading = function(msg) {
	return Layer.newOne().progress(msg);
};
Layer.confirm = function(msg, yesCallback, noCallback) {
	return Layer.newOne().confirm(msg, yesCallback, noCallback);
};
Layer.prompt = function(config, yesCallback, noCallback) {
	return Layer.newOne().prompt(config, yesCallback, noCallback);
};
Layer.msg = function(msg, type, callback, closeDelay) {
	return Layer.newOne().msg(msg, type, callback, closeDelay);
};
Layer.msgInfo = function(msg, callback, closeDelay) {
	return Layer.newOne().msg(msg, "info", callback, closeDelay);
};
Layer.msgWarning = function(msg, callback) {
	return Layer.newOne().msg(msg, "warning", callback, false);
};
Layer.msgSuccess = function(msg, callback, closeDelay) {
	return Layer.newOne().msg(msg, "success", callback, closeDelay);
};
Layer.html = function(html) {
	return Layer.newOne().html(html);
};
Layer.tips = function(html, follow, config) {
	return Layer.newOne().tips(html, follow, config);
};
Layer.dialog = function(config) {
	return Layer.newOne().dialog(config);
}; 