declare("app.consts");
//
app.consts = {
	sysAdminName : 'sysadmin'
};

// 是否认证失败
function isAuthenFail(result) {
	var authenFailCode = 3101;
	return result.type != "info" && result.code == authenFailCode;
}

// 是否鉴权失败
function isAuthorFail(result) {
	var authorFailCode = 3201;
	return result.type != "info" && result.code == authorFailCode;
}

//显示图片原图查看box
function showImageViewBox(imgSrc) {
	if (!$.colorbox) {
		return;
	}
	var imgHtml = '<img src="{0}"  />'.format(imgSrc);
	var maxWidth = $(window).width() - 40;
	var maxHeight = $(window).height() - 40;
	$.colorbox({
		html : imgHtml,
		maxWidth : maxWidth,
		maxHeight : maxHeight
	});
}

/* ul li 列表辅助类：支持拖放排序、单选、多选等 */
function FluidListHelper() {
	var defaultSelectMode = "multi";
	//
	this.asSortable = function(listSelector, axis, indexChangeCallback) {
		var jqList = $(listSelector);
		axis = axis || 'xy';
		//
		jqList.sortable({
			items : 'li',
			axis : axis,
			cursor : 'move',
			opacity : 0.6,
			revert : 150,
			start : function(evnt, ui) {
				var jqLi = ui.item;
				var index = jqList.find(">li").index(jqLi);
				jqLi.data("index", index);
			},
			stop : function(evnt, ui) {
				var jqLi = ui.item;
				var newIndex = jqList.find(">li").index(jqLi);
				var oldIndex = jqLi.data("index");
				jqLi.data("index", newIndex);
				//
				if (oldIndex != newIndex) {
					var indexChanges = [];
					indexChanges.add({
						"old" : oldIndex,
						"new" : newIndex
					});
					//console.log(indexChanges);
					if (indexChangeCallback) {
						indexChangeCallback(jqList, indexChanges);
					}
				}
			}
		});
		//
		return this;
	};
	//selectMode : single | multi
	this.asSelectable = function(listSelector, selectMode) {
		var jqList = $(listSelector);
		jqList.addClass("selectable");
		//
		selectMode = selectMode || defaultSelectMode;
		jqList.data("selectMode", selectMode);
		//
		jqList.attr("title", (selectMode == "multi" ? "Ctrl+单击 或 " : "") + "直接双击可选中/去选某一项");
		jqList.on("click", ">li", function(evnt) {
			if (selectMode == "multi" && evnt.ctrlKey) {
				var target = $(this);
				if (target.hasClass("selected")) {
					target.removeClass("selected");
				} else {
					target.addClass("selected");
				}
			}
		});
		jqList.on("dblclick", ">li", function() {
			var target = $(this);
			if (target.hasClass("selected")) {
				target.removeClass("selected");
			} else {
				if (selectMode == "single") {
					jqList.find(">li").removeClass("selected");
				}
				target.addClass("selected");
			}
		});
		//
		return this;
	};
	//
	this.getSelected = function(listSelector) {
		var jqList = $(listSelector);
		var selectMode = jqList.data("selectMode") || defaultSelectMode;
		if (selectMode == "single") {
			var jqSelected = jqList.find(">li.selected");
			return jqSelected.length > 0 ? jqSelected.data("itemData") : null;
		} else {
			var retList = [];
			jqList.find(">li.selected").each(function() {
				retList.add($(this).data("itemData"));
			});
			return retList;
		}
		//
		return undefined;
	};
	//
	this.removeSelected = function(listSelector) {
		var jqList = $(listSelector);
		var jqSelected = jqList.find(">li.selected");
		var aniDelay = 200;
		jqSelected.fadeOut(aniDelay, function() {
			$(this).remove();
		});
	};
	//
	this.getAll = function(listSelector) {
		var jqList = $(listSelector);
		var retList = [];
		jqList.find(">li").each(function() {
			retList.add($(this).data("itemData"));
		});
		return retList;
		//
		return undefined;
	};
	//
	this.moveSelected = function(listSelector, where, indexChangeCallback) {
		var jqList = $(listSelector);
		var jqLiDomArray = [];
		var indices = [];
		//
		var jqLiDoms = jqList.find(">li");
		var jqSelected = jqList.find(">li.selected");
		jqSelected.each(function() {
			var index = jqLiDoms.index($(this));
			indices.add(index);
		});
		//console.log(">> 选中的索引位置：" + indices.join(","));
		if (indices.length == 0) {
			return;
		}
		//
		for (var i = jqLiDoms.length - 1; i >= 0; i--) {
			var jqLiDom = $(jqLiDoms.get(i));
			if (jqLiDom.hasClass("selected")) {
				jqLiDom.hide();
			}
			//console.log(jqLiDom.data("itemData").name);
			jqLiDomArray.add(jqLiDom.detach());
		}
		jqLiDomArray.reverse();
		//
		var indexChanges = moveArrayElementsAt(jqLiDomArray, indices, where);
		if (indexChanges != null) {
			//console.log(indexChanges);
			if (indexChangeCallback) {
				indexChangeCallback(jqList, indexChanges);
			}
		}
		for (var i = 0, j = jqLiDomArray.length; i < j; i++) {
			var jqLiDom = jqLiDomArray[i];
			jqList.append(jqLiDom);
			if (jqLiDom.hasClass("selected")) {
				var aniDelay = 500;
				jqLiDom.fadeIn(aniDelay, function() {
					$(this).show();
				});
			}
		}
		//
		return this;
	};
	//
	this.clearItems = function(listSelector) {
		var jqList = $(listSelector);
		jqList.empty();
		//
		return this;
	};
	//
	this.setItems = function(listSelector, itemDataList, itemHtmlRenderer, appendMode) {
		var jqList = $(listSelector);
		appendMode = appendMode === true;
		if (!appendMode) {
			this.clearItems(jqList);
		}
		//
		itemDataList = itemDataList || [];
		for (var i = 0; i < itemDataList.length; i++) {
			var itemData = itemDataList[i];
			var itemHtml = itemHtmlRenderer(itemData);
			var itemDom = $(itemHtml).appendTo(jqList);
			var jqLiDom = $(itemDom);
			jqLiDom.data("itemData", itemData);
			var aniDelay = (jqList.size()) * 500 + 500;
			jqLiDom.fadeIn(aniDelay, function() {
				$(this).show();
			});
		}
		//
		return this;
	};
	//
	this.addItems = function(listSelector, itemDataList, itemHtmlRenderer) {
		return this.setItems(listSelector, itemDataList, itemHtmlRenderer, true);
	};

	//
	this.setContextMenuInfo = function(listSelector, contextMenuInfo) {
		var jqList = $(listSelector);
		var contextMenu = ContextMenu.newOne().init(contextMenuInfo);
		//
		jqList.on("contextmenu", ">li", function(evnt) {
			var pageX = evnt.pageX;
			var pageY = evnt.pageY;
			var itemData = $(this).data("itemData");
			var targetInfo = {
				data : itemData,
				item : this
			};
			contextMenu.show(pageX, pageY, targetInfo);
			//
			event.preventDefault();
		});
	};
	//
	this.setItemBtnClickHanlder = function(listSelector, clickHandler) {
		var jqList = $(listSelector);
		//
		jqList.on("click", ">li >.action.bar >.button", function(evnt) {
			var jqBtn = $(this);
			var jqLi = jqBtn.parents("li");
			var itemData = jqLi.data("itemData");
			var itemInfo = {
				data : itemData,
				item : jqLi.get(0)
			};
			clickHandler && clickHandler(itemInfo, jqBtn.attr("name"));
		});
	};
	//isFunc();
	this.findItemsByData = function(listSelector, isFunc) {
		var jqList = $(listSelector);
		//
		var retItems = [];
		jqList.find(">li").each(function() {
			var itemData = $(this).data("itemData");
			if (isFunc(itemData) == true) {
				retItems.add(this);
			}
		});
		return retItems;
	};
	this.findItemByData = function(listSelector, isFunc) {
		var jqList = $(listSelector);
		//
		var retItem = null;
		jqList.find(">li").each(function() {
			var itemData = $(this).data("itemData");
			if (isFunc(itemData) == true) {
				retItem = this;
				return false;
			}
		});
		return retItem;
	};
	//
	return this;
}

//
FluidListHelper.newOne = function() {
	return new FluidListHelper();
};

/* 资源图片上传、浏览对话框 */
function RepoImageDlg() {
	var THIS = this;
	//
	var _minImageWidth = 50;
	var _minImageHeight = 50;
	var _config = {};
	var _dlgDomId = "imagex-select-dlg";
	var _liTplHtml = '<li style="display:none;"><i class="flag">√</i><img class="content" src="{0}" /><div class="action bar"><a name="viewOriginal" style="display:none;float:left;margin-left:4px;" href="javascript:;" class="button">查看原图</a><a name="delete" style="display:none;" href="javascript:;" class="button">删除</a></div></li>';
	var _hintHtml = '<span style="float:left;line-height:40px;color:red;" name="imagex-hint"></span>';
	var _initFlag = false;
	var jqDlgDom, jqListDom, jqDlg, jqHint;
	//
	function toggleImageSelection() {
		var target = $(this);
		if (target.hasClass("selected")) {
			target.removeClass("selected");
		} else {
			if (_config.singleSelect) {
				jqListDom.find(">li").removeClass("selected");
			}
			target.addClass("selected");
		}
	}

	function makeDlgDomHtml() {
		var html = String.builder();
		html.append('<div style="display:none;">');
		html.append('  <table class="fixed" style="table-layout:fixed;border-collapse:collapse;width:100%;height:100%;border-spacing:1px;">');
		html.append('    <tr name="imagex-upload-row" height="30" style="border-bottom: 1px dotted #EEE;">');
		html.append('      <td width="180" style="padding: 0;">如果没有合适的图片，可以</td>');
		html.append('      <td><input class="hidden file" name="imagex-file" type="file" multiple="multiple" /></td>');
		html.append('      <td align="right" style="padding:0;">然后&nbsp;<button class="normal button" name="imagex-uploader">上传</button></td>');
		html.append('    </tr>');
		html.append('    <tr height="90%">');
		html.append('      <td colspan="3" style="padding:0;"><ul name="imagex-items" class="fluid list selectable">&nbsp;</ul></td>');
		html.append('    </tr>');
		html.append('  </table>');
		html.append('</div>');
		return html.value;
	}

	//
	function showHintText(hintMsg) {
		jqHint.text(hintMsg || "");
		jqHint.effect("pulsate", {
			times : 3
		}, 2500);
		//
		setTimeout(function() {
			jqHint.fadeOut(2500);
		}, 3000);
	}

	//
	function clearImageItems() {
		jqListDom.empty();
	}

	function addImageItem(imageItemData) {
		if (imageItemData == null) {
			return;
		}
		// fileRelPath,fileBrowseUrl,fileDeleteUrl
		var fileBrowseUrl = imageItemData["fileBrowseUrl"];
		var liHtml = _liTplHtml.format(fileBrowseUrl);
		var liDom = $(liHtml).appendTo(jqListDom);
		var jqLiDom = $(liDom);
		jqLiDom.data("itemData", imageItemData);
		if (_config.imageWidth) {
			jqLiDom.find("img.content").css("width", _config.imageWidth);
		}
		if (_config.imageHeight) {
			jqLiDom.find("img.content").css("height", _config.imageHeight);
		}
		var jqActionBar = jqLiDom.find(".action.bar");
		if ($.colorbox) {
			jqActionBar.find("[name='viewOriginal']").css("display", "");
		}
		var deletable = _config.deleteHanlder || false;
		if (deletable) {
			jqActionBar.find("[name='delete']").css("display", "");
		}
		var aniDelay = (jqListDom.size()) * 500 + 500;
		jqLiDom.fadeIn(aniDelay, function() {
			$(this).show();
		});
	}

	// 获取图片信息列表
	function toFetchImages() {
		clearImageItems();
		//
		var url = _config.fetchUrl;
		//
		if (isFunction(url)) {
			var fileInfoList = url();
			fileInfoList = fileInfoList || [];
			for (var i = 0; i < fileInfoList.length; i++) {
				var fileInfo = fileInfoList[i];
				addImageItem(fileInfo);
			}
			return;
		}
		//
		var params = _config.fetchParams;
		var ajax = Ajax.post(url).data(params);
		ajax.done(function(result, jqXhr) {
			if (result.type == "info") {
				var fileInfoList = result.data || [];
				for (var i = 0; i < fileInfoList.length; i++) {
					var fileInfo = fileInfoList[i];
					addImageItem(fileInfo);
				}
			} else {
				//console.log(result.message);
				showHintText(result.message);
			}
		});
		ajax.fail(function(result, jqXhr) {
			result = result || {};
			var message = result.message || "图片获取失败";
			showHintText(message);
		});
		ajax.go();
	}

	//
	this.show = function(config) {
		config = config || {};
		_config = merge(_config, config);
		//
		_config.title = _config.title || "选择资源图片";
		_config.singleSelect = _config.singleSelect || false;
		//
		var imageWidth = _config["imageWidth"];
		if (imageWidth) {
			imageWidth = ParseInt(imageWidth);
			if (isNum(imageWidth)) {
				imageWidth = Math.max(imageWidth, _minImageWidth);
				_config["imageWidth"] = imageWidth;
			} else {
				delete _config["imageWidth"];
			}
		}
		var imageHeight = _config["imageHeight"];
		if (imageHeight) {
			imageHeight = ParseInt(imageHeight);
			if (isNum(imageHeight)) {
				imageHeight = Math.max(imageHeight, _minImageHeight);
				_config["imageHeight"] = imageHeight;
			} else {
				delete _config["imageHeight"];
			}
		}
		//
		if (!_initFlag) {
			_initFlag = true;
			//
			var dlgDom = $(makeDlgDomHtml()).appendTo(document.body);
			jqDlgDom = $(dlgDom);
			//
			var jqUploadRow = jqDlgDom.find("table tr[name='imagex-upload-row']");
			if (_config.uploadUrl) {
				jqUploadRow.show();
				//
				var jqFileCtrl = jqUploadRow.find("[name='imagex-file']");
				var jqFileCtrlId = genUniqueStr();
				jqFileCtrl.attr("id", jqFileCtrlId);
				initFileUpload(jqFileCtrlId);
				var jqUploadBtn = jqUploadRow.find("[name='imagex-uploader']");
				jqUploadBtn.click(function() {
					var uploadUrl = ( typeof getAppUrl == "function") ? getAppUrl(_config.uploadUrl) : _config.uploadUrl;
					sendFileUpload(jqFileCtrlId, {
						url : uploadUrl,
						dataType : "json",
						// 自定义数据
						formData : _config.uploadParams || {},
						done : function(e, result) {
							// done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
							// 注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
							// 返回的数据在result.result中，假设我们服务器返回了一个json对象
							var resultInfo = result.result;
							// 后端返回的信息
							console && console.log(resultInfo);
							// 单独提取文件信息列表
							var fileInfoList = getFileInfoList(resultInfo);
							for (var i = 0; i < fileInfoList.length; i++) {
								addImageItem(fileInfoList[i]);
							}
							if (_config.uploadCallback) {
								_config.uploadCallback(THIS, fileInfoList);
							}
						},
						fail : function(e, data) {
							console.log(data);
							showHintText("图片上传失败");
						},
						noFilesHandler : function() {
							showHintText("请选择或更换图片");
						},
						fileNamesChecker : function(fileNames) {
							fileNames = fileNames || [];
							for (var i = 0; i < fileNames.length; i++) {
								if (!isImageFile(fileNames[i])) {
									showHintText("只能上传图片文件");
									return false;
								}
							}
							return true;
						}
					});
				});
			} else {
				jqUploadRow.hide();
			}
			//
			jqListDom = jqDlgDom.find("ul[name='imagex-items']");
			jqListDom.on("click", ">li", toggleImageSelection);
			jqListDom.on("click", ">li>.action.bar", function(event) {
				event.stopPropagation();
			});
			jqListDom.on("click", ">li>.action.bar>.button", function(event) {
				var jqBtn = $(this);
				var actionName = jqBtn.attr("name");
				var jqLiDom = jqBtn.parents("li");
				var imageItem = jqLiDom.data("itemData");
				//
				if (actionName == "viewOriginal") {
					if ($.colorbox) {
						showImageViewBox(imageItem["fileBrowseUrl"]);
					}
				} else if (actionName == "delete") {
					if (_config.deleteHanlder) {
						var result = _config.deleteHanlder(THIS, imageItem);
						if (result == true) {
							jqLiDom.fadeOut('slow', function() {
								$(this).remove();
							});
						}
					}
				}
			});
		}
		//
		jqDlg = jqDlgDom.dialog({
			title : _config.title + " ( " + (_config.singleSelect ? "单选" : "可多选") + " )",
			width : Math.min(_config.width || 980, $window.width()),
			height : Math.min(_config.height || 600, $window.height()),
			modal : true,
			open : function(event, ui) {
				//
				var jqButtonPane = jqDlgDom.siblings(".ui-dialog-buttonpane");
				jqHint = jqButtonPane.find("[name='imagex-hint']");
				if (jqHint.length == 0) {
					jqHint = $($(_hintHtml).appendTo(jqButtonPane));
				}
				jqHint.empty();
				//
				toFetchImages();
			},
			buttons : {
				"确定" : function() {
					var selected = THIS.getSelected();
					if (isArray(selected)) {
						selected = selected.length > 0 ? selected : null;
					}
					if (selected) {
						if (_config.okClickHandler) {
							_config.okClickHandler(THIS);
						}
						$(this).dialog("close");
					} else {
						//
						showHintText("您没有选择任何图片");
					}
				},
				"取消" : function() {
					$(this).dialog("close");
				}
			}
		});
		//
		return this;
	};
	// 刷新数据及界面
	this.refresh = function() {
		toFetchImages();
		//
		return this;
	};
	// 返回选中的图片信息
	this.getSelected = function() {
		if (_config.singleSelect) {
			var jqSelected = jqListDom.find(">li.selected");
			return jqSelected.length > 0 ? jqSelected.data("itemData") : null;
		} else {
			var retList = [];
			jqListDom.find(">li.selected").each(function() {
				retList.add($(this).data("itemData"));
			});
			return retList;
		}
	};
	//
	this.destroy = function() {
		_initFlag = false;
		//
		if (jqDlgDom) {
			jqDlgDom.remove();
		}
		jqDlgDom = jqListDom = jqDlg = null;
		//
		return this;
	};

	//
	return this;
}

/* zTree 相关  */
RepoImageDlg.newOne = function() {
	return new RepoImageDlg();
};

//中文转拼音
var __chsToPinyinPath = "/pinyin.do";
function setChsToPinyinPath(chsToPinyinPath) {
	__chsToPinyinPath = chsToPinyinPath;
}

function chsToPinyin(chsStr, asJianpin, callback) {
	var ajax = Ajax.get(__chsToPinyinPath).params({
		chsStr : chsStr,
		asJianpin : asJianpin || false
	});
	ajax.done(callback);
	ajax.fail(callback);
	ajax.go();
}

//
var __defaultTreeSetting = {
	view : {
		dblClickExpand : true,
		showLine : true,
		selectedMulti : false
	},
	data : {
		keep : {
			parent : true
		},
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "parentId",
			rootPId : -1
		}
	},
	callback : {
	}
};

//
function getTreeSetting() {
	return merge({}, __defaultTreeSetting);
}

function loadTreeNodes(theTree, parentNode, nodeList) {
	if (isString(theTree)) {
		var treeId = theTree;
		theTree = $.fn.zTree.getZTreeObj(treeId);
	}
	nodeList = nodeList || [];
	if (parentNode == null) {
		var treeSetting = theTree.setting;
		$.fn.zTree.init($id(treeSetting.treeId), treeSetting, nodeList);
	} else {
		parentNode.icon = "";
		theTree.updateNode(parentNode);
		//
		theTree.addNodes(parentNode, nodeList, true);
	}
}