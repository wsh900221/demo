// 管理同一容器内打开的iframe页面
declare("FramesManager.core");

FramesManager.core.fn = function(containerId, titleBarContainerId) {
	var THIS = this;
	//
	var initialized = false;
	var containerDom = null;
	var titleBarDom = null;
	var jqTitle = null;
	var jqRefreshBtn = null;
	var jqCloseOthersBtn = null;
	// id : {src, title, closable}
	var curFrames = KeyMap.from({});
	var curActiveFrameId = null;
	//
	function makeFrameDomId(frameId) {
		return "managedFrame-" + frameId;
	}

	// 检查frame对象是否存在
	function frameExists(frameId) {
		var frameDomId = makeFrameDomId(frameId);
		var frameDom = getById(frameDomId);
		return frameDom != null;
	}

	//
	function setFrameSrc(frameId, frameSrc) {
		var frameDomId = makeFrameDomId(frameId);
		var frameDom = getById(frameDomId);
		if (frameDom != null) {
			frameDom.src = frameSrc;
		}
	}

	function setFrameDisplay(frameId, bVisible) {
		if (frameId == null) {
			return;
		}
		var frameDomId = makeFrameDomId(frameId);
		var frameDom = getById(frameDomId);
		if (frameDom != null) {
			frameDom.style.display = bVisible ? "" : "none";
		}
	}

	//
	function createFrameDom(frameInfo) {
		var frameId = frameInfo.id;
		if (!frameExists(frameId)) {
			var frameDom = $('<iframe id="' + makeFrameDomId(frameId) + '" style="display:none;" frameborder="0" width="100%" height="99.5%" src=""></iframe>').appendTo(containerDom).get(0);
			frameDom.src = frameInfo.src;
			return true;
		}
		return false;
	}

	//
	function createTitleBarDom(titleBarContainerId) {
		var titleBarContainer = getById(titleBarContainerId);
		if (titleBarContainer == null) {
			return;
		}
		$(titleBarContainer).empty();
		//
		var titleBarDomId = "managedTitleBar-" + genUniqueStr();
		var sb = String.builder();
		sb.append('<div id="', titleBarDomId, '" class="managed-frame-title-bar" style="padding:0 4px;height:33px;line-height: 33px;">');
		sb.append('<div class="title" ></div>');
		sb.append('	<div class="buttons" ><button data-role="refresh" class="normal button icon refresh">刷新</button><span class="normal spacer"></span><button class="button" style="padding-left:4px;padding-right:4px;" data-role="close">关闭其他页面</button></div>');
		sb.append('</div>');
		titleBarDom = $(sb.value).appendTo(titleBarContainer).get(0);
		//
		jqTitle = $('> .title', titleBarDom);
		jqRefreshBtn = $('> .buttons > button[data-role=refresh]', titleBarDom);
		jqRefreshBtn.click(function() {
			THIS.refresh();
		});
		jqCloseOthersBtn = $('> .buttons > button[data-role=close]', titleBarDom);
		jqCloseOthersBtn.click(function() {
			THIS.closeOthers();
		});
		jqCloseOthersBtn.prop("disabled", true);
	}

	//
	function refreshCloseOthersButton() {
		if (titleBarDom != null) {
			var othersCount = curFrames.size();
			if (curActiveFrameId != null && curFrames.contains(curActiveFrameId)) {
				othersCount--;
			}
			var btnText = "";
			if (othersCount <= 0) {
				btnText = "关闭其他页面";
				jqCloseOthersBtn.prop("disabled", true);
			} else {
				btnText = "关闭其他 " + othersCount + " 个页面";
				jqCloseOthersBtn.prop("disabled", false);
			}
			jqCloseOthersBtn.text(btnText);
		}
	}

	// 打开一个frame
	// frameInfo : {id, src, title, closable}
	this.open = function(frameInfo) {
		var copyInfo = merge({}, frameInfo);
		var frameId = copyInfo.id;
		var isNew = createFrameDom(copyInfo);
		if (isNew) {
			curFrames.set(frameId, copyInfo);
		}
		//
		this.setActive(frameId);
		//
		return this;
	};
	this.refresh = function(newUrl) {
		if (curActiveFrameId != null) {
			if (!newUrl) {
				var frameInfo = curFrames.get(curActiveFrameId);
				if (frameInfo != null) {
					newUrl = frameInfo.src;
				}
			}
			if (newUrl) {
				setFrameSrc(curActiveFrameId, newUrl);
			}
		}
		//
		return this;
	};
	this.close = function(frameId) {
		var frameDomId = makeFrameDomId(frameId);
		var frameDom = getById(frameDomId);
		if (frameDom != null) {
			frameDom.parentNode.removeChild(frameDom);
		}
		curFrames.remove(frameId);
		if (frameId == curActiveFrameId) {
			curActiveFrameId = null;
		}
		refreshCloseOthersButton();
		//
		return this;
	};
	this.closeOthers = function() {
		// alert("close others except : " + curActiveFrameId);
		var frameIds = curFrames.keys();
		for (var i = 0, len = frameIds.length; i < len; i++) {
			var tmpFrameId = frameIds[i];
			if (tmpFrameId != curActiveFrameId) {
				this.close(tmpFrameId);
			}
		}
		//
		return this;
	};
	this.setActive = function(frameId) {
		if (!frameExists(frameId)) {
			return this;
		}
		if (curActiveFrameId == frameId) {
			return this;
		}
		setFrameDisplay(curActiveFrameId, false);
		curActiveFrameId = frameId;
		setFrameDisplay(frameId, true);
		// 更新最后访问时间
		// var frameInfo = curFrames.get(frameId);
		// frameInfo.ts = new Date().getTime();
		if (titleBarDom != null) {
			var frameInfo = curFrames.get(frameId);
			jqTitle.text(frameInfo.title);
			refreshCloseOthersButton();
		}
		//
		return this;
	};

	this.getInfo = function(frameId) {
		var frameInfo = curFrames.get(frameId);
		if (frameInfo != null) {
			return merge({
				domId : makeFrameDomId(frameId)
			}, frameInfo);
		}
		return null;
	};
	//
	this.init = function() {
		if (!initialized) {
			initialized = true;
			//
			containerDom = getById(containerId);
			$(containerDom).empty();
			//
			if (titleBarContainerId) {
				createTitleBarDom(titleBarContainerId);
			}
		}
		//
		return this;
	};
	//
	return this;
};

FramesManager.newOne = function(containerId, titleBarContainerId) {
	return new FramesManager.core.fn(containerId, titleBarContainerId);
};

// 生成功能资源（手风琴）菜单
function renderFuncMenuList(domId, funcResListData, itemClickHandler) {
	var jqDom = $id(domId);
	jqDom.empty();
	//
	funcResListData = funcResListData || [];
	var blockHeader, blockBody;
	for (var i = 0, len = funcResListData.length; i < len; i++) {
		var funcData = funcResListData[i];
		blockHeader = $($('<h3 class="block-header">' + funcData.name + '</h3>').appendTo(jqDom));
		if (i == 0) {
			blockHeader.css("border-top", 0);
		} else {
			blockHeader.css("margin-top", 4);
		}
		var sb = String.builder();
		sb.append('<ul class="block-body" style="display:none;">');
		var resListData = funcData["resources"] || [];
		for (var j = 0; j < resListData.length; j++) {
			var resData = resListData[j];
			sb.append('<li class="item" data-id="', resData.id, '" data-name="', resData.name, '" data-url="', resData.url, '" >');
			sb.append(resData.name);
			sb.append('</li>');
		}
		sb.append('</ul>');
		blockBody = $($(sb.value).appendTo(jqDom));
		var handler = (function() {
			var head = $(blockHeader);
			var body = $(blockBody);
			return function() {
				if (head.hasClass("opened")) {
					body.slideUp("fast", function() {
						body.hide();
					});
					head.removeClass("opened");
				} else {
					body.slideDown("fast", function() {
						body.show();
					});
					head.addClass("opened");
				}
			};
		})();
		//
		blockHeader.on("click", handler);
	}
	//
	itemClickHandler = itemClickHandler ||
	function(id, name, url) {
		// do nothing
	};
	$('>ul.block-body > li.item', jqDom).each(function() {
		var id = $(this).attr("data-id");
		var name = $(this).attr("data-name");
		var url = $(this).attr("data-url");
		var thisItem = $(this);
		$(this).click(function() {
			$('>ul.block-body > li.item', jqDom).removeClass("active");
			thisItem.addClass("active");
			//
			itemClickHandler && itemClickHandler(id, name, url);
		});
		//
	});
}

// 模拟点击功能资源（手风琴）菜单项
function clickFuncMenuItem(domId, funcResId) {
	var jqFuncList = $id(domId);
	var jqTargetItem = $('>ul.block-body > li.item[data-id="' + funcResId + '"]', jqFuncList);
	jqTargetItem.trigger("click");
	var jqBody = jqTargetItem.parents("ul.block-body");
	var jqHeader = jqBody.prev(".block-header");
	jqBody.show();
	jqHeader.addClass("opened");
}

// 生成（资源）模块菜单
function renderModuleMenuList(domId, moduleListData, itemClickHandler) {
	moduleListData = moduleListData || [];
	var sb = String.builder();
	sb.append('<ul class="nav-bar">');
	for (var i = 0; i < moduleListData.length; i++) {
		var moduleData = moduleListData[i];
		sb.append('<li class="item" data-id="', moduleData.id, '" data-name="', moduleData.name, '" >');
		sb.append(moduleData.name);
		sb.append('</li>');
	}
	sb.append('</ul>');
	var jqDom = $id(domId);
	jqDom.empty();
	jqDom.html(sb.value);
	//
	//
	itemClickHandler = itemClickHandler ||
	function(id, name) {
		// do nothing
	};
	$('>ul.nav-bar > li.item', jqDom).each(function() {
		var id = $(this).attr("data-id");
		var name = $(this).attr("data-name");
		var thisItem = $(this);
		$(this).click(function() {
			$('>ul.nav-bar > li.item', jqDom).removeClass("active");
			thisItem.addClass("active");
			//
			itemClickHandler && itemClickHandler(id, name);
		});
		//
	});
}

// 模拟点击模块菜单项
function clickModuleMenuItem(domId, moduleId) {
	$('>ul.nav-bar > li.item[data-id="' + moduleId + '"]', $id(domId)).trigger("click");
}