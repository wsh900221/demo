//初始化文件上传控件
function initFileUpload(fileCtrl, domIdToShowFiles, maxWidth) {
	var theCtrlId = $id(fileCtrl).attr("id");
	if (isNoE(theCtrlId)) {
		theCtrlId = genUniqueStr();
		$id(fileCtrl).attr("id", theCtrlId);
	}
	var wrapperId = "wrapper-" + theCtrlId;
	var jqWrapper = $id(wrapperId);
	if (jqWrapper.length == 0) {
		jqWrapper = $("<div id='" + wrapperId + "' style='display:inline-block;'><button class='normal button'>选择文件</button><label style='padding-left:4px;color:navy;'></label></div>").insertAfter($id(theCtrlId));
		jqWrapper.append($id(theCtrlId));
		$id(theCtrlId).css("padding", 0);
		$id(theCtrlId).css("border", 0);
		$id(theCtrlId).width(0);
		$id(theCtrlId).height(0);
		jqWrapper.find('button').click(function(event) {
			$id(theCtrlId).trigger("click");
		});
	}
	if(!maxWidth){
		maxWidth = 280;
	}
	jqWrapper.css("width", maxWidth);
	var initConfig = {
		limitConcurrentUploads : 5,
		autoUpload : false,
		replaceFileInput : false,
		change : function(e, data) {
			// 缓存当前选择的文件
			var files = data.files;
			var fileCount = files.length;
			$id(theCtrlId).prop("curFiles", files);
			//
			console && console.log("文件数 : " + fileCount);
			var fileName = "";
			$.each(files, function(index, file) {
				if (index == 0) {
					fileName = file.name;
				}
				console && console.log('文件名 : ' + file.name);
			});
			if (fileCount > 1) {
				fileName = fileCount + "个文件";
			}
			jqWrapper.find('label').text(fileName);
		}
	};
	//
	$id(theCtrlId).fileupload(initConfig);
}

// 发送文件上传请求
function sendFileUpload(fileCtrl, callbacks) {
	callbacks = callbacks || {};
	var theCtrlId = $id(fileCtrl).attr("id");
	var wrapperId = "wrapper-" + theCtrlId;
	var jqWrapper = $id(wrapperId);
	// 检查是否已初始化
	var curFiles = $id(theCtrlId).prop("curFiles") || [];
	if (curFiles.length < 1) {
		if ( typeof callbacks["noFilesHandler"] == "function") {
			try {
				callbacks["noFilesHandler"]();
			} catch(ex) {
				//
			}
		}
		return;
	}
	if ( typeof callbacks["fileNamesChecker"] == "function") {
		var fileNames = [];
		for (var i = 0; i < curFiles.length; i++) {
			fileNames.add(curFiles[i].name);
		}
		if (!callbacks["fileNamesChecker"](fileNames)) {
			return;
		}
	}

	var doneCallback = callbacks["done"] || null;
	delete callbacks["done"];
	var sendConfig = {
		done : function(e, result) {
			$id(theCtrlId).val("");
			// 清除当前选择的文件
			$id(theCtrlId).prop("curFiles", null);
			$('label', jqWrapper).text("");
			// done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
			// 注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
			// 返回的数据在result.result中，假设我们服务器返回了一个json对象
			if (doneCallback != null) {
				doneCallback(e, result);
			}
		}
	};
	sendConfig = merge(sendConfig, callbacks);
	//
	$id(theCtrlId).fileupload(sendConfig);
	//
	$id(theCtrlId).fileupload("send", {
		files : curFiles
	});
}