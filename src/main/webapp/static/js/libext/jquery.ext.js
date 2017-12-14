//$id("abc")  == $("#abc") , $id("a.b.c") == $("[id='a.b.c']")
var __alphaPrefixReg = /^[a-zA-Z0-9_-].*/i;
var __noneAlphaReg = /[^a-zA-Z0-9_-]+/i;
function $id(selector) {
	if ( typeof selector == "string") {
		if (__alphaPrefixReg.test(selector)) {
			if (__noneAlphaReg.test(selector)) {
				return $('[id="' + selector + '"]');
			} else {
				return $("#" + selector);
			}
		}
	}
	return $(selector);
}

//$attr("a-b", "x.y.z") == $("[a-b='x.y.z']")
//$attr("div[a-b]", "x.y.z") == $("div[a-b='x.y.z']")
//$attr("a-b", "x.y.z" [, arg1, arg2]) == $("[a-b='x.y.z']" [, arg1, arg2])
function $attr(attrName, attrVal) {
	var prefix = "[";
	var suffix = "]";
	if (attrName.indexOf("[") != -1 && attrName.indexOf("]") != -1) {
		var xIndex = attrName.indexOf("[");
		var yIndex = attrName.indexOf("]");
		prefix = attrName.substring(0, xIndex + 1);
		suffix = attrName.substring(yIndex);
		attrName = attrName.substring(xIndex + 1, yIndex);
	}
	//
	var newArgs = [prefix + attrName + '="' + attrVal + '"' + suffix];
	if (arguments.length > 2) {
		newArgs = newArgs.concat(Array.prototype.slice.call(arguments, 2));
	}
	return $.apply(window, newArgs);
}

var $window = $(window);

//窗口大小变更监视器
function __WinSizeMonitor() {
	var taskDelayer = TaskDelayer.newOne();
	var taskDelayTime = 200;
	//
	var jqWindow = $(window);
	var __callback = null;
	var __forMobile = false;
	var __landscape = false;
	var __winPortHeight = -1;
	var __winLandHeight = -1;
	//
	function __delegateResize() {
		var winWidth = jqWindow.width();
		var winHeight = jqWindow.height();
		if (__landscape) {
			__winLandHeight = Math.max(__winLandHeight, winHeight);
			console.log("window size : " + winWidth + " x " + winHeight + ( __forMobile ? " :: " + __winLandHeight : ""));
		} else {
			__winPortHeight = Math.max(__winPortHeight, winHeight);
			console.log("window size : " + winWidth + " x " + winHeight + ( __forMobile ? " :: " + __winPortHeight : ""));
		}

		//
		if (__callback) {
			try {
				__callback(winWidth, winHeight, __landscape, __landscape ? __winLandHeight : __winPortHeight);
			} catch (ex) {
				//
			}
		}
	}

	function __resizeHandler() {
		taskDelayer.delay(__delegateResize, taskDelayTime);
	}

	function __initForOrientation() {
		__forMobile = true;
		//
		__landscape = (window.orientation / 90) % 2 != 0;
		console.log("window orientation : " + ( __landscape ? "landscape" : "portrait"));
		//
		__resizeHandler();
		//
		return this;
	};

	//
	this.start = function(callback, delayTime) {
		if (isFunction(callback)) {
			__callback = callback;
		}
		if (isNum(delayTime)) {
			taskDelayTime = delayTime;
		}
		//
		$(window).resize(__resizeHandler);
		//
		if (Object.hasOwnProperty.call(window, "orientation")) {
			$(window).on("orientationchange", __initForOrientation);
			__initForOrientation();
		} else {
			__resizeHandler();
		}
		//
		console.log("WinSizeMonitor started...");
		//
		return this;
	};
	//
	this.getSizeDelayTime = function() {
		return taskDelayTime;
	};
	//
	return this;
}

//全局预定义对象
var winSizeMonitor = new __WinSizeMonitor();
//

// 获取当前页面最大的z-index
function getMaxZIndex() {
	var zIndex = 0;
	$('[style*="z-index"]').each(function(i, el) {
		var tmpZIndex = el.style.zIndex;
		zIndex = Math.max(zIndex, tmpZIndex);
	});
	return zIndex;
}

// Ajax 类
// Ajax.baseUrl = baseUrl;
// Ajax.post("/url").params({}).data({}).done(function(data, jqXHR){}).go();
// Ajax.post("/url").params({}).data({}).done(function(data,
// jqXHR){}).fail(function(status, error, jqXHR){}).go();
declare("Ajax.core");
Ajax.core.fn = function() {
	var _cache = false;
	var _async = true;
	var _type = "GET";
	var _url = "";
	// 发送的数据类型: contentType
	var _contentType = "application/json";
	// 返回的数据类型: dataType
	var _resultType = "json";
	//
	var _params = {};
	var _data = {};
	//
	var _beforeSendCallback = null;
	var _doneHandler = null;
	var _failHandler = null;
	var _failMessage = null;
	var _statusHandler = {};
	var _statusMessage = {};
	//
	var _alwaysHandler = null;
	//
	// var logger = console && console.log ? console.log : null;
	//
	this.get = function(url) {
		_type = "GET";
		//
		_url = url;
		//
		return this;
	};
	this.post = function(url) {
		_type = "POST";
		//
		_url = url;
		//
		return this;
	};
	this.put = function(url) {
		_type = "PUT";
		//
		_url = url;
		//
		return this;
	};
	this.params = function(params) {
		_params = params;
		//
		return this;
	};
	this.data = function(data) {
		_data = data;
		//
		return this;
	};
	this.sync = function() {
		_async = false;
		//
		return this;
	};
	this.cache = function() {
		_cache = true;
		//
		return this;
	};
	// 发送内容格式
	this.asJson = function() {
		_contentType = "application/json";
		//
		return this;
	};
	this.asForm = function() {
		_contentType = "application/x-www-form-urlencoded";
		//
		return this;
	};
	// 接收内容格式
	this.forJson = function() {
		_resultType = "json";
		//
		return this;
	};
	this.forHtml = function() {
		_resultType = "html";
		//
		return this;
	};
	this.forText = function() {
		_resultType = "text";
		//
		return this;
	};
	this.forXml = function() {
		_resultType = "xml";
		//
		return this;
	};
	this.beforeSend = function(callback) {
		_beforeSendCallback = callback;
		//
		return this;
	};
	// 结果处理
	this.done = function(callback) {
		_doneHandler = callback;
		//
		return this;
	};
	this.fail = function(callback) {
		if (isString(callback)) {
			_failMessage = callback;
		} else {
			_failHandler = callback;
		}
		//
		return this;
	};
	this.always = function(callback) {
		_alwaysHandler = callback;
		//
		return this;
	};
	this.onStatus = function(status, callback) {
		if (isString(callback)) {
			_statusMessage[status] = callback;
		} else {
			_statusHandler[status] = callback;
		}
		//
		return this;
	};
	this.on401 = function(callback) {
		return this.onStatus(401, callback);
	};
	this.on404 = function(callback) {
		return this.onStatus(404, callback);
	};
	this.on500 = function(callback) {
		return this.onStatus(500, callback);
	};
	//
	function sendRequest() {
		var url = _url;
		if (Ajax.baseUrl && !url.startsWith("http")) {
			url = Ajax.baseUrl + url;
		}
		url = makeUrl(url, _params, true);
		var ajax = null;
		if (_type == "GET") {
			var ajaxConf = {
				cache : _cache,
				async : _async,
				type : _type,
				url : url,
				dataType : _resultType,
				data : _data
			};
			if ( typeof _beforeSendCallback == "function") {
				ajaxConf.beforeSend = function(jqXHR) {
					_beforeSendCallback(jqXHR);
				};
			}
			ajax = $.ajax(ajaxConf);
		} else {
			var data = _data;
			if (_contentType.endsWith("/json")) {
				data = JSON.encode(data);
			}
			var ajaxConf = {
				cache : _cache,
				async : _async,
				type : _type,
				url : url,
				dataType : _resultType,
				data : data,
				contentType : _contentType
			};
			if ( typeof _beforeSendCallback == "function") {
				ajaxConf.beforeSend = function(jqXHR) {
					_beforeSendCallback(jqXHR);
				};
			}
			ajax = $.ajax(ajaxConf);
		}
		//
		ajax.done(function(data, type, jqXHR) {
			if ( typeof _doneHandler == "function") {
				_doneHandler(data, jqXHR);
			}
		});
		//
		ajax.fail(function(jqXHR, type, statusText) {
			var errInfo = {};
			errInfo.type = "error";
			errInfo.message = statusText;
			try {
				errInfo = JSON.decode(jqXHR.responseText);
				if (!errInfo.message) {
					errInfo.message = statusText;
				}
			} catch (ex) {
				//
			}
			var status = jqXHR.status;
			var statusHandler = _statusHandler[status];
			var continueNext = true;
			if (statusHandler != null) {
				var statusMessage = _statusMessage[status];
				if (statusMessage) {
					errInfo.message = statusMessage;
				}
				var handleResult = statusHandler(errInfo, jqXHR, status);
				continueNext = handleResult !== false;
			}
			if (continueNext && _failHandler != null) {
				if (_failMessage) {
					errInfo.message = _failMessage;
				}
				_failHandler(errInfo, jqXHR, status);
			}
		});
		//
		if (_alwaysHandler != null) {
			ajax.always(function(result, type, jqXHR) {
				_alwaysHandler(result, jqXHR);
			});
		}
	}

	//
	this.go = function() {
		sendRequest();
	};
	// 默认处理函数
	this.fail(function(errInfo, jqXHR, status) {
		var errMsg = errInfo.message || "处理失败";
		Layer.msgWarning(errMsg);
	});
	this.on401(function(errInfo, jqXHR, status) {
		var errMsg = errInfo.message || "未认证或权限不足";
		Layer.msgWarning(errMsg);
	});
	this.on404(function(errInfo, jqXHR, status) {
		var errMsg = errInfo.message || "未找到请求的资源";
		Layer.msgWarning(errMsg);
	});
	this.on500(function(errInfo, jqXHR, status) {
		var errMsg = errInfo.message || "服务器繁忙";
		Layer.msgWarning(errMsg);
	});
	//
	return this;
};
//
Ajax.newOne = function() {
	return new Ajax.core.fn();
};
Ajax.get = function(url) {
	return Ajax.newOne().get(url);
};
Ajax.post = function(url) {
	return Ajax.newOne().post(url);
};
Ajax.put = function(url) {
	return Ajax.newOne().put(url);
};

// 文件下载---------------------------------------------------------
var __fileDownloaderCtrlPrefix = "-file-downloader-ctrl-";
//
function downloadFile(linkCtrlOrUrl, params) {
	if (linkCtrlOrUrl == null) {
		return false;
	}
	var targetIframeDivId = __fileDownloaderCtrlPrefix + "div";
	var targetIframeDiv = document.getElementById(targetIframeDivId);
	if (targetIframeDiv == null) {
		targetIframeDiv = document.createElement("div");
		targetIframeDiv.style.display = "none";
		targetIframeDiv.id = targetIframeDivId;
		targetIframeDiv.style.position = "absolute";
		targetIframeDiv.style.left = "-9999";
		targetIframeDiv.style.top = "-9999";
		targetIframeDiv.style.width = "1px";
		targetIframeDiv.style.height = "1px";
		targetIframeDiv = document.body.appendChild(targetIframeDiv);
	}
	targetIframeDiv.style.display = "none";
	//
	var targetIframeName = __fileDownloaderCtrlPrefix + "iframe";
	var targetIframe = document.getElementById(targetIframeName);
	if (targetIframe == null) {
		var html = "<iframe id='" + targetIframeName + "' name='" + targetIframeName + "' src='about:blank' style='display:none;position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;'></iframe>";
		targetIframeDiv.innerHTML = html;
		targetIframe = document.getElementById(targetIframeName);
	} else {
		targetIframe.src = "about:blank";
	}
	//
	var baseUrl = null;
	var linkCtrl = linkCtrlOrUrl;
	//
	if ( typeof linkCtrlOrUrl == "string") {
		linkCtrl = document.getElementById(linkCtrlOrUrl);
	}
	if (linkCtrl == null) {
		baseUrl = linkCtrlOrUrl;
	} else {
		baseUrl = linkCtrl.href;
		linkCtrl.target = targetIframeName;
	}
	params = params || {};
	//强制下载文本标记
	if ( typeof params["downloadText"] == "undefined") {
		params["downloadText"] = true;
	}
	if (params["failMsgCallback"] == null) {
		params["failMsgCallback"] = "showFailDownloadMsg";
	}
	var fullUrl = concatUrlParams(baseUrl, params);
	targetIframe.src = fullUrl;
	//
	return false;
}

//下载资源专用===========================================>>>
function showFailDownloadMsg(failMsgInfo) {
	Layer.msgWarning("" + failMsgInfo.message);
}

function downloadLink(link) {
	return downloadFile(link, {
		failMsgCallback : "showFailDownloadMsg"
	});
}

//
function centerInView(domId, targetView, vtAdjust) {
	var refView = targetView || window;
	var jqRefView = $id(refView);
	if (jqRefView.length != 1) {
		throw "居中参考对象必须有而且只能有一个！";
	}
	refView = jqRefView.get(0);
	vtAdjust = vtAdjust || 0;
	//
	var refLeft, refTop, refWid, refHgt;
	if (refView == window) {
		var jqDoc = $(document);
		refLeft = jqDoc.scrollLeft();
		refTop = jqDoc.scrollTop();
		refWid = jqRefView.width();
		refHgt = jqRefView.height();
	} else {
		var refOffset = jqRefView.offset();
		refLeft = refOffset.left;
		refTop = refOffset.top;
		refWid = jqRefView.width();
		refHgt = jqRefView.height();
	}
	var jqDom = $id(domId);
	var jqWid = jqDom.width();
	var jqHgt = jqDom.height();
	var offset = {
		left : refLeft + (refWid - jqWid) / 2,
		top : refTop + (refHgt - jqHgt) / 2 + vtAdjust
	};
	jqDom.css("left", "");
	jqDom.css("top", "");
	jqDom.offset(offset);
}

// 焦点标示
function __FocusMarker() {
	this.mark = function(selector, subSelector, focusClass) {
		var xFocusClass = focusClass || "focus";
		var target = $id(selector);
		target.on("mousedown", function() {
			$(this).addClass(xFocusClass);
		});
		target.on("mouseup", function() {
			$(this).removeClass(xFocusClass);
		});
		//
		return this;
	};
};
var focusMarker = new __FocusMarker();

// Toast 提示
declare("Toast.core");
Toast.core.fn = function() {
	var THIS = this;
	var html = '<div class="toast"><span data-role="content" class="content info"></span></div>';
	var jqDom = null;
	var jqDomEl = null;
	var jqContent = null;
	var theTimer = null;
	var theCallback = null;
	//
	function createDom() {
		if (jqDom == null) {
			jqDom = $(html).appendTo(document.body);
			jqDomEl = jqDom.get(0);
			jqDom.css("display", "none");
			jqContent = jqDom.find('>span[data-role="content"]');
			//
			$(document).on("mousedown", function(event) {
				if (event.target != jqDomEl && !$.contains(jqDomEl, event.target)) {
					if ($(jqDomEl).is(":visible")) {
						THIS.hide();
					}
				}
			});
		}
	}

	//iconClass : info, warning, error
	this.show = function(msg, duration, iconClass, callback) {
		createDom();
		//
		clearTimeout(theTimer);
		//
		callback = callback || null;
		if ( typeof iconClass == "function") {
			callback = iconClass;
			iconClass = null;
		}
		theCallback = callback;
		//
		iconClass = iconClass || "info";
		msg = msg || "";
		duration = duration || 2000;
		//
		jqContent.text(msg);
		jqContent.removeClass("info warning error");
		jqContent.addClass("content");
		jqContent.addClass(iconClass);
		//
		centerInView(jqDom, window, -20);
		//
		jqDom.show();
		//
		theTimer = setTimeout(function() {
			THIS.hide();
		}, duration);
		//
		return this;
	};
	this.hide = function() {
		clearTimeout(theTimer);
		//
		if (jqDom != null) {
			jqDom.fadeOut("fast");
		}
		if ( typeof theCallback == "function") {
			try {
				theCallback();
			} catch (ex) {
				//
			}
		}
		//
		return this;
	};
	//
	return this;
};
// 单一对象
var Toast = new Toast.core.fn();

/**
 * 弹出层绑定代理
 */
declare("PopupProxy.core");
PopupProxy.core.fn = function() {
	var noop = function() {
		//
	};
	var targetHandler = null;
	var popupHanlder = null;
	//
	this.popup = null;
	this.target = null;
	// 自定义处理函数
	this.onPopupShow = noop;
	this.onPopupHide = noop;
	//
	this.triggerPopupShow = function() {
		this.onPopupShow(this);
	};
	this.triggerPopupHide = function() {
		this.onPopupHide(this);
	};
	this.adjustPopupBottom = function(alignWhat) {
		var popup = this.getPopup();
		//
		var alignTarget = $id(alignWhat);
		var alignOffset = alignTarget.offset();
		var targetBottom = alignOffset.top + alignTarget.height();
		//
		var popupTop = targetBottom;
		var popupBottom = popupTop + popup.height();
		var scrollBottom = $(window).height();
		if (popupBottom > scrollBottom - 6) {
			popupTop -= (popupBottom - scrollBottom) + 6;
		} else {
			popupTop += 6;
		}
		var popupOffset = $(popup).offset();
		popup.offset({
			left : popupOffset.left,
			top : popupTop
		});
	};
	// popup, target, alignTo, hrAlign, byEnterEvent
	this.bind = function(config) {
		config = config || {};
		this.popup = $id(config.popup);
		this.target = $id(config.target);
		//
		this.popup.hide();
		this.popup.css("position", "absolute");
		if (this.popup.width() > $(window).width()) {
			this.popup.width($(window).width());
		}
		//
		var popupEl = this.popup.get(0);
		var targetEl = this.target.get(0);
		var alignToEl = (config.alignTo == null) ? null : $id(config.alignTo).get(0);
		var hrAlign = config.hrAlign || "left";
		if (hrAlign === true) {
			hrAlign = "center";
		}
		var hrOffset = config.hrOffset || 0;
		var popupProxy = this;
		//
		// var byEnterEvent = config.byEnterEvent ===true;
		//
		this.target.unbind("click", targetHandler);
		targetHandler = function(event) {
			event.stopPropagation();
			//
			var alignWhat = alignToEl != null ? alignToEl : targetEl;
			//
			if ($(popupEl).is(":hidden")) {
				$(document).triggerHandler("click");
				//
				var disabled = $(targetEl).is(":disabled") || $(targetEl).prop("disabled") == true;
				if (!disabled) {
					$(popupEl).css("z-index", getMaxZIndex() + 1);
					$(popupEl).slideDown(200);
					if (hrAlign.isIn("left", "center", "right")) {
						var posInfo = {
							my : (hrAlign == "center" ? "center top" : (hrAlign == "right" ? "right top" : "left top")),
							at : (hrAlign == "center" ? ("center" + ( hrOffset ? hrOffset : "") + " bottom") : (hrAlign == "right" ? ("right" + ( hrOffset ? hrOffset : "") + " bottom") : ("left" + ( hrOffset ? hrOffset : "") + " bottom"))),
							of : alignWhat,
							collision : "fit"
						};
						$(popupEl).position(posInfo);
					}
					popupProxy.triggerPopupShow();
				}
				$(document).one("click", function(event) {
					if (event.target != popupEl && !$.contains(popupEl, event.target)) {
						if ($(popupEl).is(":visible")) {
							$(popupEl).slideUp(200);
							popupProxy.triggerPopupHide();
						}
					}
				});
			} else {
				$(popupEl).slideUp(200);
				popupProxy.triggerPopupHide();
			}
			popupProxy.adjustPopupBottom(alignWhat);
		};
		this.target.bind("click", targetHandler);
		//
		this.popup.unbind("click", popupHanlder);
		popupHanlder = function(event) {
			event.stopPropagation();
			//
			$(document).one("click", function(event) {
				if (event.target != popupEl && !$.contains(popupEl, event.target)) {
					if ($(popupEl).is(":visible")) {
						$(popupEl).slideUp(200);
						popupProxy.triggerPopupHide();
					}
				}
			});
		};
		this.popup.bind("click", popupHanlder);
		//
		return this;
	};
	this.getPopup = function() {
		return this.popup;
	};
	this.getTarget = function() {
		return this.target;
	};
	//
	return this;
};

PopupProxy.newOne = function() {
	return new PopupProxy.core.fn();
};
/**
 * 简单下拉弹出菜单
 *
 */
function DropdownMenu() {
	var popupProxy = null;
	var theMenu = null;
	var theMenuItems = [];
	var theMenuItemClickHandler = null;
	//
	function createMenu(menuWidth) {
		if (theMenu == null) {
			menuWidth = menuWidth || null;
			var menuHtml = '<ul class="simple-dropdown-menu"></ul>';
			theMenu = $(menuHtml).appendTo(document.body);
			if (menuWidth) {
				theMenu.css("width", menuWidth);
			}
			theMenu.on("mouseenter", "> li.item", function() {
				$(this).addClass("active");
			});
			theMenu.on("mouseleave", "> li.item", function() {
				$(this).removeClass("active");
			});
			//
			theMenu.on("mousedown", "> li.item", function(event) {
				$(this).addClass("active");
				//
				popupProxy.getPopup().slideUp(200);
				//
				if (theMenuItemClickHandler != null) {
					var menuItem = $(this);
					theMenuItemClickHandler(menuItem.data("data"), menuItem.text());
				}
			});
		}
	}

	function createMenuItems() {
		theMenu.empty();
		//
		var menuItemCount = theMenuItems.length;
		for (var i = 0; i < menuItemCount; i++) {
			var tmpItem = theMenuItems[i];
			var itemText = isString(tmpItem) ? tmpItem : tmpItem.text;
			if (itemText == "-") {
				var itemHtml = '<li class="divider"></li>';
				var menuItem = $(itemHtml).appendTo(theMenu);
			} else {
				if (itemText != null) {
					var itemHtml = '<li class="item"></li>';
					var menuItem = $(itemHtml).appendTo(theMenu);
					menuItem.text(itemText);
					menuItem.data("data", tmpItem);
				} else if (( itemText = tmpItem.html) != null) {
					var itemHtml = '<li class="item"></li>';
					var menuItem = $(itemHtml).appendTo(theMenu);
					menuItem.html(itemText);
					menuItem.data("data", tmpItem);
				}
			}
		}
	}

	//
	this.init = function(triggerId, hrRight, menuWidth) {
		createMenu(menuWidth);
		//
		theMenu.css("display", "none");
		theMenu.addClass("boxShadow");
		hrRight = hrRight || false;
		$id(triggerId).addClass("dropdown trigger");
		//popup, target, alignTo, hrAlign, byEnterEvent
		var config = {};
		config.popup = theMenu;
		config.target = triggerId;
		config.alignTo = null;
		config.hrOffset = null;
		config.hrAlign = hrRight ? "right" : "left";
		popupProxy = PopupProxy.newOne().bind(config);
		//
		return this;
	};
	this.setMenuItemClickHandler = function(clickHandler) {
		theMenuItemClickHandler = clickHandler;
		//
		return this;
	};
	this.setMenuItems = function(menuItems) {
		theMenuItems = menuItems || [];
		//
		createMenuItems();
		//
		return this;
	};
	//
	return this;
}

DropdownMenu.newOne = function() {
	return new DropdownMenu();
};
//---------------------------------------------------------------------------
function bindToPopup(target, popup, alignTo, hrAlgin) {
	// //popup, target, alignTo, hrAlign, byEnterEvent
	var config = {};
	config.popup = popup;
	config.target = target;
	config.alignTo = alignTo || null;
	config.hrAlign = hrAlgin || "x";
	popupProxy = PopupProxy.newOne().bind(config);
	return popupProxy;
}

//-------------------------------- 上下文菜单  -------------------------------------
//menuInfo :: {title, width, itemDataList, itemHtmlRenderer, itemClickHandler}
function ContextMenu() {
	var theMenuInfo = null;
	var theTargetInfo = null;
	//
	var theWrapper = null;
	var theMenu = null;
	//
	function createMenu() {
		if (theWrapper == null) {
			var menuTitle = theMenuInfo.title || "上下文菜单";
			var menuWidth = theMenuInfo.width || null;
			//
			var wrapperHtml = '<div style="width:auto;height:auto;display:none;border-radius:4px;"></div>';
			theWrapper = $(wrapperHtml).appendTo(document.body);
			theWrapper.addClass("boxShadow");
			theWrapper.css("position", "absolute");
			if (menuWidth) {
				theWrapper.css("width", menuWidth);
			} else {
				theWrapper.css("width", "auto");
			}
			var headerHtml = '<div style="width:100%;cursor:default;height:40px;padding:4px;background-color: #EEE;color:#666;line-height:32px;">' + menuTitle + '</div>';
			$(headerHtml).appendTo(theWrapper);
			var menuHtml = '<ul class="simple-dropdown-menu"></ul>';
			theMenu = $(menuHtml).appendTo(theWrapper);
			theMenu.css("border-radius", 0);

			theMenu.on("mouseenter", "> li.item", function() {
				$(this).addClass("active");
			});
			theMenu.on("mouseleave", "> li.item", function() {
				$(this).removeClass("active");
			});
			//
			theMenu.on("mousedown", "> li.item", function(event) {
				$(this).addClass("active");
				//
				theWrapper.slideUp(200);
				//
				if (theMenuInfo.itemClickHandler != null) {
					theMenuInfo.itemClickHandler(theTargetInfo, $(this).data("data"));
				}
			});
		}
		//
		theWrapper.css("left", "");
		theWrapper.css("top", "");
		//
		createMenuItems();
	}

	function defaultItemHtmlRenderer(targetInfo, menuItemData) {
		var itemText = isString(menuItemData) ? menuItemData : menuItemData.text;
		if (itemText == "-") {
			return '<li class="divider"></li>';
		} else {
			return '<li class="item">{0}</li>'.format(itemText);
		}
	}

	function createMenuItems() {
		theMenu.empty();
		//
		var itemDataList = theMenuInfo.itemDataList;
		if ( typeof itemDataList == "function") {
			itemDataList = theMenuInfo.itemDataList(theTargetInfo) || [];
		}
		var itemHtmlRenderer = theMenuInfo.itemHtmlRenderer || defaultItemHtmlRenderer;
		var menuItemCount = itemDataList.length;
		for (var i = 0; i < menuItemCount; i++) {
			var tmpItem = itemDataList[i];
			var itemHtml = itemHtmlRenderer(theTargetInfo, tmpItem);
			var menuItem = $(itemHtml).appendTo(theMenu);
			if (!menuItem.hasClass("divider")) {
				menuItem.data("data", tmpItem);
			}
		}
	}

	//
	this.init = function(menuInfo) {
		theMenuInfo = menuInfo;
		//
		return this;
	};

	this.show = function(pageX, pageY, targetInfo) {
		theTargetInfo = targetInfo;
		//
		createMenu();
		//...
		theWrapper.offset({
			left : pageX,
			top : pageY
		});
		//
		var wrapperDom = theWrapper.get(0);
		$(document).one("click", function(event) {
			if (event.target != wrapperDom && !$.contains(wrapperDom, event.target)) {
				theWrapper.slideUp(200);
			}
		});
		//
		theWrapper.slideDown(200);
	};
	//
	this.hide = function() {
		theWrapper.slideUp(200);
	};
	//
	this.destory = function() {

	};
	//
	return this;
}

ContextMenu.newOne = function() {
	return new ContextMenu();
};

/* ---  开关按钮  --- */
function SwitchButton(selector) {
	var THIS = this;
	var jqButton = ( typeof $id == "function") ? $id(selector) : $(selector);
	//
	function init() {
		if (jqButton.data("x-rendered") != true) {
			jqButton.data("x-rendered", true);
			//
			jqButton.empty();
			//
			jqButton.addClass("switch button");
			jqButton.append('<div class="off circle">✘</div>');
			jqButton.append('<div class="on circle">✔</div>');
			//
			jqButton.addClass("off");
			//
			jqButton.bind("click", function() {
				if (THIS.isDisabled()) {
					return;
				}
				if (THIS.isOn()) {
					THIS.off();
				} else {
					THIS.on();
				}
				var changeCallback = jqButton.data("changeCallback");
				if (changeCallback) {
					changeCallback(THIS.isOn(), THIS.value());
				}
			});
		}
	}

	//
	this.on = function(triggerEvent) {
		jqButton.removeClass("off");
		jqButton.addClass("on");
		//
		if (triggerEvent == true) {
			var changeCallback = jqButton.data("changeCallback");
			if (changeCallback) {
				changeCallback(THIS.isOn(), THIS.value());
			}
		}
		//
		return this;
	};
	//
	this.off = function(triggerEvent) {
		jqButton.removeClass("on");
		jqButton.addClass("off");
		//
		if (triggerEvent == true) {
			var changeCallback = jqButton.data("changeCallback");
			if (changeCallback) {
				changeCallback(THIS.isOn(), THIS.value());
			}
		}
		//
		return this;
	};
	//
	this.isOn = function() {
		return jqButton.hasClass("on");
	};
	//
	this.isOff = function() {
		return jqButton.hasClass("off");
	};
	//
	this.enable = function() {
		jqButton.prop("disabled", false);
		jqButton.removeClass("disabled");
		//
		return this;
	};
	this.disable = function() {
		jqButton.prop("disabled", true);
		jqButton.addClass("disabled");
		//
		return this;
	};
	//
	this.setDisabled = function(disabled) {
		if (disabled == true) {
			this.disable();
		} else {
			this.enable();
		}
		//
		return this;
	};
	//
	this.isDisabled = function() {
		return jqButton.prop("disabled") == true;
	};
	//
	this.value = function(value) {
		if ( typeof value != "undefined") {
			jqButton.data("value", value);
			//
			return this;
		} else {
			return jqButton.data("value");
		}
	};
	//
	this.onChange = function(callback) {
		if (callback) {
			jqButton.data("changeCallback", callback);
		}
		//
		return this;
	};
	//
	init();
	//
	return this;
}

SwitchButton.newOne = function(selector) {
	return new SwitchButton(selector);
};

// 气泡提示--------------------------------
var __tipConfigMap = {
	normal : {
		position : {
			my : "bottom left ",
			at : "top left",
			adjust : {
				scroll : true,
				y : -4
			}
		},
		classes : "qtip qtip-default qtip-shadow qtip-rounded qtip-normal-color"
	},
	error : {
		position : {
			my : "left center",
			at : "right center",
			adjust : {
				scroll : true,
				x : 4
			}
		},
		classes : "qtip qtip-default qtip-shadow qtip-rounded qtip-error-color"
	}
};
function getQuickTipConfig() {
	return {
		content : {
			text : ''
		},
		position : merge({}, __tipConfigMap.normal.position),
		style : {
			classes : __tipConfigMap.normal.classes
		},
		show : {
			event : "mouseenter"
		},
		hide : {
			event : "mouseleave"
		}
	};
}

function getErrorTipConfig() {
	return {
		content : {
			text : ''
		},
		position : merge({}, __tipConfigMap.error.position),
		style : {
			classes : __tipConfigMap.error.classes
		},
		show : {
			event : null
		},
		hide : {
			event : null
		}
	};
}

function setQuickTip(domId, text) {
	var tipConfig = getQuickTipConfig();
	tipConfig.content.text = text || "";
	$id(domId).qtip(tipConfig);
}

function showErrorTip(domId, text) {
	var tipConfig = getErrorTipConfig();
	tipConfig.content.text = text;
	$id(domId).qtip(tipConfig).qtip("show");
}

function hideMiscTip(domId) {
	$id(domId).qtip("hide");
}

// ------------------------------------- 表单代理
declare("FormProxy.core");
// text , radio, checkbox, single, multiple, date, datetime, int, float, bool
FormProxy.fieldAccessors = {
	"text" : {
		// <input type="text" , <textarea
		get : function(id) {
			var val = $id(id).val();
			return val === undefined ? null : val;
		},
		set : function(id, value) {
			$id(id).val(value);
		}
	},
	"radio" : {
		// <input type="radio"
		get : function(name) {
			var val = $('input:radio[name="' + name + '"]:checked').val();
			return typeof val == "undefined" ? null : val;
		},
		set : function(name, value) {
			$('input:radio[name="' + name + '"]').each(function() {
				this.checked = value != null && this.value == value;
			});
		}
	},
	"checkbox" : {
		// <input type="checkbox"
		get : function(name) {
			var vals = [];
			$('input:checkbox[name="' + name + '"]').each(function() {
				if (this.checked) {
					vals.add(this.value);
				}
			});
			return vals.length > 0 ? vals : null;
		},
		set : function(name, value) {
			var vals = value;
			if (value == null) {
				vals = [];
			} else if (!isArray(value)) {
				vals = [];
				vals.add(value);
			}
			$('input:checkbox[name="' + name + '"]').each(function() {
				this.checked = vals.contains(this.value);
			});
		}
	},
	"single" : {
		// <select
		get : function(id) {
			var val = $id(id).val();
			return typeof val == "undefined" ? null : val;
		},
		set : function(id, value) {
			$id(id).val(value);
		}
	},
	"multiple" : {
		// <select multiple="multiple"
		get : function(id) {
			var vals = $id(id).val();
			return vals;
		},
		set : function(id, value) {
			var vals = value;
			if (value == null) {
				vals = [];
			} else if (!isArray(value)) {
				vals = [];
				vals.add(value);
			}
			$id(id).val(vals);
		}
	},
	"int" : {
		get : function(id, asRawVal) {
			asRawVal = asRawVal === true;
			var strVal = $id(id).val();
			if (asRawVal) {
				return strVal;
			}
			var val = ParseInt(strVal);
			return isNum(val) ? val : null;
		},
		set : function(id, value) {
			var strVal = value;
			if (value == null) {
				strVal = "";
			} else if (isNum(value)) {
				strVal = ParseInt(value);
			} else {
				var val = ParseInt(value);
				strVal = isNum(val) ? val : "";
			}
			$id(id).val(strVal);
		}
	},
	"float" : {
		get : function(id, asRawVal) {
			asRawVal = asRawVal === true;
			var strVal = $id(id).val();
			if (asRawVal) {
				return strVal;
			}
			var val = ParseFloat(strVal);
			return isNum(val) ? val : null;
		},
		set : function(id, value) {
			var strVal = value;
			if (value == null) {
				strVal = "";
			} else if (isNum(value)) {
				strVal = ParseFloat(value);
			} else {
				var val = ParseFloat(value);
				strVal = isNum(val) ? val : "";
			}
			$id(id).val(strVal);
		}
	},
	"bool" : {
		// <input type="checkbox"
		get : function(id) {
			return $id(id).prop("checked") ? true : false;
		},
		set : function(id, value) {
			$id(id).prop("checked", value);
		}
	},
	"date" : {
		get : function(id, asRawVal) {
			asRawVal = asRawVal === true;
			var strVal = $id(id).val();
			if (asRawVal) {
				return strVal;
			}
			return Date.isValidDate(strVal) ? Date.parseAsDate(strVal).format('yyyy-MM-dd') : null;
		},
		set : function(id, value) {
			if (isDate(value)) {
				$id(id).val(value.format('yyyy-MM-dd'));
			} else {
				if (Date.isValidDate(value)) {
					$id(id).val(Date.parseAsDate(value).format('yyyy-MM-dd'));
				} else {
					$id(id).val("");
				}
			}
		}
	},
	"datetime" : {
		get : function(id, asRawVal) {
			asRawVal = asRawVal === true;
			var strVal = $id(id).val();
			if (asRawVal) {
				return strVal;
			}
			return Date.isValidDate(strVal) ? Date.parseAsDate(strVal).format('yyyy-MM-dd HH:mm') : null;
		},
		set : function(id, value) {
			if (isDate(value)) {
				$id(id).val(value.format('yyyy-MM-dd HH:mm'));
			} else {
				if (Date.isValidDate(value)) {
					$id(id).val(Date.parseAsDate(value).format('yyyy-MM-dd HH:mm'));
				} else {
					$id(id).val("");
				}
			}
		}
	}
};
//--------------------------------- get && set -----------------------------------
//input[text],textarea  :: by id
var textGet = FormProxy.fieldAccessors["text"].get;
var textSet = FormProxy.fieldAccessors["text"].set;
//input[radio] :: by name
var radioGet = FormProxy.fieldAccessors["radio"].get;
var radioSet = FormProxy.fieldAccessors["radio"].set;
//input[checkbox] :: by name
var checkboxGet = FormProxy.fieldAccessors["checkbox"].get;
var checkboxSet = FormProxy.fieldAccessors["checkbox"].set;
//select :: by id
var singleGet = FormProxy.fieldAccessors["single"].get;
var singleSet = FormProxy.fieldAccessors["single"].set;
//select[multiple] :: by id
var multipleGet = FormProxy.fieldAccessors["multiple"].get;
var multipleSet = FormProxy.fieldAccessors["multiple"].set;
//input:text :: by id
var intGet = FormProxy.fieldAccessors["int"].get;
var intSet = FormProxy.fieldAccessors["int"].set;
//input[text] :: by id
var floatGet = FormProxy.fieldAccessors["float"].get;
var floatSet = FormProxy.fieldAccessors["float"].set;
//input[checkbox] :: by id
var boolGet = FormProxy.fieldAccessors["bool"].get;
var boolSet = FormProxy.fieldAccessors["bool"].set;
//input[text] :: by id ，注意提交前在 !=null 的情况下使用 {variable}.format('yyyy-MM-dd') 转成字符串
var dateGet = FormProxy.fieldAccessors["date"].get;
var dateSet = FormProxy.fieldAccessors["date"].set;
//input[text] :: by id ，注意提交前在 !=null 的情况下使用 {variable}.format('yyyy-MM-dd HH:mm') 转成字符串
var datetimeGet = FormProxy.fieldAccessors["datetime"].get;
var datetimeSet = FormProxy.fieldAccessors["datetime"].set;
//----------------------------------------------------------------------------------
// 表单字段验证规则
FormProxy.validateRules = {
	required : function(value) {
		// 是否为空白字符串
		return value != null && trim(value + "") != '';
	},
	eqLength : function(value, eqLen) {
		// 文本长度是否相等
		eqLen = ParseInt(eqLen);
		return (value != null) ? (value.length == eqLen) : false;
	},
	minLength : function(value, minLen) {
		// 是否满足最小长度
		minLen = ParseInt(minLen);
		return (value != null) ? (value.length >= minLen) : false;
	},
	maxLength : function(value, maxLen) {
		// 是否满足最小长度
		maxLen = ParseInt(maxLen);
		return (value != null) ? (value.length <= maxLen) : false;
	},
	rangeLength : function(value, minLen, maxLen) {
		// 长度是否在给定的范围内（如：[6,16]）
		var minLen = ParseInt(minLen);
		var maxLen = ParseInt(maxLen);
		return (value != null) ? (value.length >= minLen && value.length <= maxLen) : false;
	},
	minValue : function(value, minVal) {
		// 是否满足最小值
		value = ParseFloat(value);
		minVal = ParseFloat(minVal);
		return isNum(value) ? value >= minVal : false;
	},
	maxValue : function(value, maxVal) {
		// 是否满足最大值
		value = ParseFloat(value);
		maxVal = ParseFloat(maxVal);
		return isNum(value) ? value <= maxVal : false;
	},
	rangeValue : function(value, minVal, maxVal) {
		// 数值是否在给定的范围内（如：[-20, 100]）
		value = ParseFloat(value);
		minVal = ParseFloat(minVal);
		maxVal = ParseFloat(maxVal);
		return isNum(value) ? (value >= minVal && value <= maxVal) : false;
	},
	isDate : function(value) {
		// 是否为日期时间格式
		return Date.isValidDate(value);
	},
	isTime : function(value) {
		// 是否为时间格式
		if (!isString(value)) {
			return false;
		}
		var nowDateStr = new Date().format("yyyy-MM-dd");
		var timeStr = nowDateStr + " " + value;
		return Date.isValidDate(timeStr);
	},
	minDate : function(value, minDate) {
		// 日期是否满足最小日期
		var isDate = Date.isValidDate(value);
		if (!isDate) {
			return false;
		} else {
			var date = Date.parseAsDate(value);
			minDate = Date.parseAsDate(minDate);
			return date >= minDate;
		}
	},
	maxDate : function(value, maxDate) {
		// 日期是否满足最大日期
		var isDate = Date.isValidDate(value);
		if (!isDate) {
			return false;
		} else {
			var date = Date.parseAsDate(value);
			maxDate = Date.parseAsDate(maxDate);
			return date <= maxDate;
		}
	},
	rangeDate : function(value, minDate, maxDate) {
		// 日期是否满足给定日期范围
		var isDate = Date.isValidDate(value);
		if (!isDate) {
			return false;
		} else {
			var date = Date.parseAsDate(value);
			minDate = Date.parseAsDate(minDate);
			maxDate = Date.parseAsDate(maxDate);
			return date >= minDate && date <= maxDate;
		}
	},
	rangeTime : function(value, minTime, maxTime) {
		// 时间是否满足给定日期范围
		var nowDateStr = new Date().format("yyyy-MM-dd");
		var date = Date.parseAsDate(nowDateStr + " " + value);
		var minDate = Date.parseAsDate(nowDateStr + " " + minTime);
		var maxDate = Date.parseAsDate(nowDateStr + " " + maxTime);
		return date >= minDate && date <= maxDate;
	},
	inList : function(value, items) {
		// 是否为列表项之一
		return (value != null) ? value.isIn(items) : false;
	},
	isMobile : function(value) {
		// 是否为手机号码
		return isMobile(value) || app.consts.sysAdminName == value;
	},
	isTel : function(value) {
		// 是否为座机号码
		return isTelNo(value);
	},
	isPhone : function(value) {
		// 是否为手机或座机号码
		return this.mobile(value) || this.tel(value);
	},
	isMoney : function(value, allowSign) {
		// 是否为金额字符串
		allowSign = (allowSign == null) ? false : (allowSign == true);
		return isMoneyStr(value, allowSign);
	},
	isNatual : function(value) {
		// 是否为自然数
		return isNatualStr(value);
	},
	isDigits : function(value) {
		// 是否为数字字符串
		return isDigitsStr(value);
	},
	isDigitsOrHyphen : function(value) {
		// 是否为数字和-组成的字符串
		return isDigitsOrHyphenStr(value);
	},
	isEmail : function(value) {
		// 是否为邮箱
		return isValidEmail(value);
	},
	isHexColor : function(value) {
		//是否为16进制颜色值
		return isHexColor(value);
	},
	isNum : function(value) {
		//是否为数值字符串
		var numVal = ParseFloat(value);
		return isNum(numVal);
	},
	isPwd : function(value, strict) {
		strict = strict == "true";
		//验证密码
		return checkPassword(value, strict) == null;
	}
};
// 表单字段验证错误消息
FormProxy.validateMessages = {
	required : "此为必须提供项",
	eqLength : "长度必须为{0}个字符",
	minLength : "长度最少为{0}个字符",
	maxLength : "长度最多为{0}个字符",
	rangeLength : "长度必须在{0}到{1}个字符之间",
	minValue : "必须大于或等于{0}",
	maxValue : "必须小于或等于{0}",
	rangeValue : "必须大于或等于{0}并且小于等于{1}",
	isDate : "必须为日期格式",
	isTime : "必须为时间格式",
	minDate : "日期必须大于或等于{0}",
	maxDate : "日期必须小于或等于{0}",
	rangeDate : "日期必须大于或等于{0}并且小于等于{1}",
	rangeTime : "时间必须大于或等于{0}并且小于等于{1}",
	inList : "取值必须在[{0}]中",
	isMobile : "必须是手机号码",
	isTel : "必须是座机号码",
	isPhone : "必须是手机或座机号码",
	isMoney : "必须是金额数字",
	isNatual : "必须是自然数",
	isDigits : "必须是数字字符串",
	isDigitsOrHyphen : "数字和-组成的字符串",
	isEmail : "必须是邮箱",
	isHexColor : "必须是#开头的16进制颜色值",
	isNum : "必须是数值串",
	isPwd : "密码必须为6~16位由（非纯）字母、数字和下划线组成的字符串"
};
//
FormProxy.core.fn = function() {
	var THIS = this;
	var fieldsInfoMap = KeyMap.from({});
	var fieldsKeyMap = KeyMap.from({});
	var fieldsErrorMsgMap = KeyMap.from({});
	var errorMsgTargetMap = KeyMap.from({});
	var showingErrors = false;
	//
	function parseRule(rule) {
		if (rule == null) {
			return null;
		}
		if (isString(rule)) {
			var ruleName = null;
			var ruleParams = [];
			var idx = rule.indexOf("[");
			if (idx == -1) {
				ruleName = rule.trim();
			} else {
				ruleName = rule.left(idx).trim();
				var idx2 = rule.indexOf("]");
				ruleParams = rule.substring(idx + 1, idx2).trim().split(",");
			}
			return {
				name : ruleName,
				params : ruleParams
			};
		} else if (isFunction(rule)) {
			return rule;
		} else {
			return null;
		}
	}

	//
	function parseFieldRule(fieldRule) {
		var retFieldRule = {};
		if (isPlainObject(fieldRule)) {
			var ruleInfo = parseRule(fieldRule.rule);
			var ruleMsg = fieldRule.message;
			if (ruleMsg == null && isPlainObject(ruleInfo)) {
				ruleMsg = FormProxy.validateMessages[ruleInfo.name];
			}
			retFieldRule.ruleInfo = ruleInfo;
			retFieldRule.ruleMsg = ruleMsg;
		} else {
			var ruleInfo = parseRule(fieldRule);
			var ruleMsg = FormProxy.validateMessages[ruleInfo.name];
			retFieldRule.ruleInfo = ruleInfo;
			retFieldRule.ruleMsg = ruleMsg;
		}
		retFieldRule.ruleMsg = retFieldRule.ruleMsg || "验证不通过";
		return retFieldRule;
	}

	//
	function guessFieldType(idOrName) {
		var ctrl = getById(idOrName);
		if (ctrl == null) {
			var jqDoms = $('[name=' + idOrName + ']');
			if (jqDoms.size() > 0) {
				ctrl = jqDoms.get(0);
			} else {
				return null;
			}
		}
		var tagName = ctrl.tagName;
		if (tagName == null) {
			return null;
		}
		tagName = tagName.toUpperCase();
		if (tagName == "INPUT") {
			var type = ctrl.type || "text";
			if (type.isIn("text", "hidden", "password")) {
				return "text";
			} else if (type == "radio") {
				return "radio";
			} else if (type == "checkbox") {
				return "checkbox";
			} else {
				return null;
			}
		} else if (tagName == "SELECT") {
			return ctrl.multiple != null ? "multiple" : "single";
		} else if (tagName == "TEXTAREA") {
			return "text";
		} else {
			return null;
		}
	}

	function guessErrorMsgTargetId(idOrName) {
		var ctrl = getById(idOrName);
		if (ctrl == null) {
			var jqDoms = $('[name=' + idOrName + ']');
			var count = jqDoms.size();
			if (count > 0) {
				ctrl = jqDoms.get(count - 1);
				if (isNoB(ctrl.id)) {
					ctrl.id = "random-" + genUniqueStr();
				}
				return ctrl.id;
			} else {
				return null;
			}
		} else {
			return idOrName;
		}
	}

	//
	this.removeField = function(idOrName) {
		var fieldInfo = fieldsInfoMap.get(idOrName);
		if (fieldInfo == null) {
			return;
		}
		fieldsInfoMap.remove(idOrName);
		//
		var fieldKey = fieldInfo.key;
		fieldsKeyMap.remove(fieldKey);
		//
		var msgTargetId = errorMsgTargetMap.get(idOrName);
		hideMiscTip(msgTargetId);
		errorMsgTargetMap.remove(idOrName);
	};
	// { id : "birthDateNew", type : "date", key : "birthDate",  rules : ["required", "isDate",
	// "rangeDate[2015-05-20,2015-06-01]"], messageTargetId : "xxxxId" }
	this.addField = function(fieldInfo) {
		fieldInfo = fieldInfo || {};
		if (isString(fieldInfo)) {
			fieldInfo = {
				id : fieldInfo
			};
		}
		var idOrName = fieldInfo.id || fieldInfo.name;
		if (idOrName) {
			fieldInfo.type = fieldInfo.type || guessFieldType(idOrName) || "text";
			var key = fieldInfo.key = fieldInfo.key || idOrName;
			fieldsKeyMap.set(key, idOrName);
			var rules = fieldInfo.rules;
			var ruleCount = rules != null ? rules.length : 0;
			var toBeValidated = false;
			if (ruleCount > 0) {
				toBeValidated = true;
				//
				for (var i = 0; i < ruleCount; i++) {
					rules[i] = parseFieldRule(rules[i]);
				}
				// 从规则中挑出required
				for (var i = 0; i < ruleCount; i++) {
					var tmpRule = rules[i];
					var ruleInfo = tmpRule.ruleInfo;
					if (isPlainObject(ruleInfo)) {
						if (ruleInfo.name == "required") {
							fieldInfo.required = true;
							fieldInfo.requiredMessage = tmpRule.ruleMsg;
							rules.removeAt(i);
							break;
						}
					}
				}
			}
			if (fieldInfo.required == true) {
				toBeValidated = true;
				//
				if (fieldInfo.requiredMessage == null) {
					fieldInfo.requiredMessage = FormProxy.validateMessages["required"];
				}
			}
			//
			fieldsInfoMap.set(idOrName, fieldInfo);
			//
			if (toBeValidated) {
				// 注册错误信息提示目标id
				var errorMsgTargetId = fieldInfo.messageTargetId || guessErrorMsgTargetId(idOrName);
				errorMsgTargetMap.set(idOrName, errorMsgTargetId);
				if (idOrName == fieldInfo.id) {
					$id(idOrName).change(function() {
						THIS.validate(idOrName);
					});
				} else {
					$('[name=' + idOrName + ']').change(function() {
						THIS.validate(idOrName);
					});
				}
			}
		}
		//
		return this;
	};
	this.setFields = function(fieldsInfo) {
		for (var i = 0, len = fieldsInfo.length; i < len; i++) {
			this.addField(fieldsInfo[i]);
		}
		//
		return this;
	};
	// field get(idOrName, type, curData, asRawVal)
	this.getValue = function(idOrName, curData, asRawVal) {
		asRawVal = asRawVal === true;
		curData = curData || {};
		var value;
		var fieldInfo = fieldsInfoMap.get(idOrName);
		if (fieldInfo != null) {
			var type = fieldInfo.type;
			var getter = fieldInfo.get;
			if (isFunction(getter)) {
				value = getter(idOrName, type, curData, asRawVal);
			} else {
				getter = FormProxy.fieldAccessors[type].get;
				value = getter(idOrName, asRawVal);
			}
		}
		return value;
	};
	this.getValues = function(includeNullVals) {
		includeNullVals = includeNullVals === true;
		var curData = {};
		var idOrNames = fieldsInfoMap.keys();
		for (var i = 0, len = idOrNames.length; i < len; i++) {
			var idOrName = idOrNames[i];
			var value = this.getValue(idOrName, curData);
			if (value === null) {
				if (includeNullVals) {
					curData[idOrName] = null;
				}
			} else {
				curData[idOrName] = value;
			}
		}
		return curData;
	};
	//
	this.getValue2 = function(key, curData) {
		var asRawVal = false;
		var idOrName = fieldsKeyMap.get(key);
		return this.getValue(idOrName, curData, asRawVal);
	};
	this.getValues2 = function(includeNullVals) {
		includeNullVals = includeNullVals === true;
		var curData = {};
		var keys = fieldsKeyMap.keys();
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			var value = this.getValue2(key, curData);
			if (value === null) {
				if (includeNullVals) {
					curData[key] = null;
				}
			} else {
				curData[key] = value;
			}
		}
		return curData;
	};

	// field set(idOrName, type, value)
	this.setValue = function(idOrName, value) {
		var fieldInfo = fieldsInfoMap.get(idOrName);
		if (fieldInfo != null) {
			var type = fieldInfo.type;
			var setter = fieldInfo.set;
			if (isFunction(setter)) {
				setter(idOrName, type, value);
			} else {
				setter = FormProxy.fieldAccessors[type].set;
				setter(idOrName, value);
			}
		}
		//
		return this;
	};
	this.setValues = function(newData) {
		newData = newData || {};
		var idOrNames = fieldsInfoMap.keys();
		for (var i = 0, len = idOrNames.length; i < len; i++) {
			var idOrName = idOrNames[i];
			var value = newData[idOrName];
			if ( typeof value != "undefined") {
				this.setValue(idOrName, value);
			}
		}
		//
		return this;
	};

	this.setValue2 = function(key, value) {
		var idOrName = fieldsKeyMap.get(key);
		return this.setValue(idOrName, value);
	};
	this.setValues2 = function(newData) {
		newData = newData || {};
		var keys = fieldsKeyMap.keys();
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			var value = newData[key];
			if ( typeof value != "undefined") {
				this.setValue2(key, value);
			}
		}
		//
		return this;
	};

	// field > rules > rule(idOrName, type, rawValue, curData)
	this.validate = function(idOrName, curData) {
		var fieldInfo = fieldsInfoMap.get(idOrName);
		if (fieldInfo == null) {
			return true;
		}
		//
		var asRawVal = true;
		curData = curData || this.getValues(true);
		//
		var vldResult = true;
		fieldsErrorMsgMap.remove(idOrName);
		showingErrors = true;
		//
		var requiredCall = FormProxy.validateRules["required"];
		var value = this.getValue(idOrName, curData, asRawVal);
		curData[idOrName] = typeof value == "undefined" ? null : value;
		var required = fieldInfo.required;
		var hasValue = requiredCall(value);
		var msgTargetId = errorMsgTargetMap.get(idOrName);
		hideMiscTip(msgTargetId);
		if (required && !hasValue) {
			vldResult = false;
			//
			var msgTpl = fieldInfo.requiredMessage;
			var errMsg = msgTpl;
			fieldsErrorMsgMap.set(idOrName, errMsg);
			showErrorTip(msgTargetId, errMsg);
			return vldResult;
		}
		var rules = fieldInfo.rules;
		var ruleCount = rules != null ? rules.length : 0;
		if (ruleCount > 0) {
			var type = fieldInfo.type;
			for (var i = 0; i < ruleCount; i++) {
				var tmpRule = rules[i];
				var ruleMsg = tmpRule.ruleMsg;
				var ruleInfo = tmpRule.ruleInfo;
				var errMsg = null;
				if (isFunction(ruleInfo)) {
					//有自定义函数
					var ruleCall = ruleInfo;
					if (!ruleCall(idOrName, type, value, curData)) {
						var formatArgs = [];
						ruleMsg.nulAs = "";
						formatArgs.add(ruleMsg);
						formatArgs = formatArgs.concat(curData);
						errMsg = formatStr.apply(window, formatArgs);
					}
				} else {
					if (!required && !hasValue) {
						continue;
					}
					var ruleCall = FormProxy.validateRules[ruleInfo.name];
					var execArgs = [];
					execArgs.add(value);
					execArgs = execArgs.concat(ruleInfo.params || []);
					if (!ruleCall.apply(window, execArgs)) {
						var formatArgs = [];
						formatArgs.add(ruleMsg);
						formatArgs = formatArgs.concat(ruleInfo.params || []);
						errMsg = formatStr.apply(window, formatArgs);
					}
				}
				if (errMsg != null) {
					vldResult = false;
					fieldsErrorMsgMap.set(idOrName, errMsg);
					showErrorTip(msgTargetId, errMsg);
					return vldResult;
				}
			}
		}
		//
		return vldResult;
	};
	//
	this.validateAll = function(resultWithMsgMap) {
		resultWithMsgMap = resultWithMsgMap === true;
		//
		var vldResult = true;
		fieldsErrorMsgMap.clear();
		showingErrors = true;
		//
		var curData = {};
		var idOrNames = fieldsInfoMap.keys();
		for (var i = 0, len = idOrNames.length; i < len; i++) {
			var idOrName = idOrNames[i];
			vldResult = this.validate(idOrName, curData) && vldResult;
		}
		//
		return resultWithMsgMap ? {
			ok : vldResult,
			msgMap : fieldsErrorMsgMap
		} : vldResult;
	};
	//
	this.hideMessages = function() {
		var idOrNames = errorMsgTargetMap.keys();
		for (var i = 0; i < idOrNames.length; i++) {
			var idOrName = idOrNames[i];
			var msgTargetId = errorMsgTargetMap.get(idOrName);
			hideMiscTip(msgTargetId);
		}
		//
		return this;
	};
	//
	return this;
};
//
FormProxy.newOne = function() {
	return new FormProxy.core.fn();
};

//获取上传的文件列表结果
function getFileInfoList(resultInfo) {
	var files = [];
	resultInfo = resultInfo || null;
	if (resultInfo != null) {
		var data = resultInfo["data"] || {};
		files = data["files"] || [];
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
		}
	}
	return files;
};
//上传的文件列表显示
function showFileInfoList(containerId, resultInfo) {
	var jqContainer = $id(containerId);
	jqContainer.empty();
	//
	resultInfo = resultInfo || null;
	if (resultInfo == null) {
		return;
	}
	var html = String.builder();
	html.append('<ul class="file list">');
	html.append('<li class="text item"><div class="text">&nbsp;</div><div class="icon close" title="隐藏列表信息"></div></li>');
	var data = resultInfo["data"] || null;
	var totalFileSizeStr = null;
	var files = null;
	if (data != null) {
		files = data["files"] || [];
		for (var i = 0; i < files.length; i++) {
			html.append('<li class="file item info"><div class="icon"></div><div class="name">&nbsp;</div><div class="actions"><button class="delete">删除</button></div></li>');
		}
		totalFileSizeStr = data["totalFileSizeStr"] || null;
	}
	html.append('</ul>');
	jqContainer.html(html.value);
	var jqFileList = jqContainer.find("ul.file.list");
	//
	var type = resultInfo["type"] || "info";
	var msg = resultInfo["message"] || "文件上传完成（无提示）";
	jqFileList.find(">li.text.item>.text").text(msg);
	jqFileList.find(">li.text.item>.icon.close").click(function() {
		jqFileList.remove();
	});
	//
	if (files != null) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var type = file["type"] || "info";
			var originalFileName = file["originalFileName"];
			var fileName = file["fileName"] || originalFileName;
			var fileUuid = file["fileUuid"];
			var fileBrowseUrl = file["fileBrowseUrl"];
			var fileDeleteUrl = file["fileDeleteUrl"];
			//
			var jqFileItem = jqFileList.find(">li.file.item:eq(" + i + ")");
			jqFileItem.attr("name", fileUuid);
			jqFileItem.addClass(type);
			var jqFileName = jqFileItem.find(">.name");
			jqFileName.text(originalFileName);
			if (fileName != originalFileName) {
				jqFileName.attr("title", "保存的文件名为：" + fileName);
			}
			var jqDeleteBtn = jqFileItem.find(">.actions>button.delete");
			jqDeleteBtn.attr("data-uuid", fileUuid);
			jqDeleteBtn.attr("data-delete-url", fileDeleteUrl);
			jqDeleteBtn.attr("data-file-name", originalFileName);
			//
			if (type == "info") {
				jqDeleteBtn.click(function() {
					var xUuid = $(this).attr("data-uuid");
					var xDeleteUrl = $(this).attr("data-delete-url");
					var xFileName = $(this).attr("data-file-name");
					var ajax = Ajax.get(xDeleteUrl);
					ajax.done(function(result) {
						if (result.type == "info") {
							jqFileList.find(">li.text.item>.text").text(xFileName + " 已删除");
							jqFileList.find(">li.file.item[name='" + xUuid + "']").remove();
							//
							if (jqFileList.find(">li.file.item").length == 0) {
								jqFileList.remove();
							}
						} else {
							Layer.msgWarning(xFileName + " 删除失败！" + result.message);
						}
					});
					ajax.go();
				});
				//
				if (isImageFile(fileName)) {
					setQuickTip(jqFileName, '<img style="border:1px solid #FEFEFE" src="' + fileBrowseUrl + '" width="100" height="100" />');
				}
			}
		}
	}
};

//
var smallLoadingImageUrl = ( typeof getAppUrl == "function" ? getAppUrl("/static/") : "") + "image/loading-small.gif";
var loadingImageUrl = ( typeof getAppUrl == "function" ? getAppUrl("/static/") : "") + "image/loading.gif";
//
var __hideLayoutTogglersDelayer = null;
function hideLayoutTogglers() {
	if (__hideLayoutTogglersDelayer == null) {
		__hideLayoutTogglersDelayer = TaskDelayer.newOne();
	}
	__hideLayoutTogglersDelayer.delay(function() {
		$(".ui-layout-resizer").find(">.ui-layout-toggler").hide();
	});
}