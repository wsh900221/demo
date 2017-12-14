/**
 * @description 提供常用的 jquery 对话框
 * @author Hu Changwei
 * @date : 2011-12-01
 * @depends on jquery, jquery-ui(jquery.dialog), jquery.msgdlg.css
 */
var MsgDlg = new function() {
    // 包含各种图标的images的上级路径
    var uniqueId = "" + new Number(new Date());
    // 消息对话框 --------------------------------------------
    var msgDlgIds = {};
    var msgDlgDiv = null;
    var msgDlgObj = null;
    function generateMsgDlg(uniqueId) {
        if (msgDlgDiv == null) {
            msgDlgIds.div = "jq-msg-dlg-div-" + uniqueId;
            msgDlgIds.tbl = "jq-msg-dlg-tbl-" + uniqueId;
            msgDlgIds.img = "jq-msg-dlg-icon-" + uniqueId;
            msgDlgIds.msg = "jq-msg-dlg-content-" + uniqueId;
            var html = '<div id="' + msgDlgIds.div
                    + '" style="cursor:default;display:none;">';
            html += '<table id="'
                    + msgDlgIds.tbl
                    + '" style="cursor:default;border-collapse:collapse;table-layout:fixed;width:100%" cellpadding="0" cellspacing="0" border="0">';
            html += '<tr>';
            html += '<td width="50" style="cursor:default;text-align:left; vertical-align:middle;">';
            html += '<div id="'
                    + msgDlgIds.img
                    + '" style="float:left;width:47px;height:35px;">&nbsp;</div>';
            html += '</td>';
            html += '<td style="cursor:default;margin:0px;word-break:break-all;word-wrap:break-word;width:auto;">';
            html += '<p id="' + msgDlgIds.msg
                    + '" style="width:100%;margin:0;font-size:12pt;">';
            html += '</p>';
            html += '</td>';
            html += '</tr>';
            html += '</table>';
            html += '</div>';
            //
            var tmpDiv = document.createElement("div");
            document.body.appendChild(tmpDiv);
            tmpDiv.innerHTML = html;
            msgDlgDiv = document.getElementById(msgDlgIds.div);
            tmpDiv.removeChild(msgDlgDiv);
            tmpDiv.parentNode.removeChild(tmpDiv);
            //
            msgDlgObj = $(msgDlgDiv).dialog({
                minWidth : 400,
                minHeight : 200,
                width : 500,
                modal : true,
                title : "提示对话框",
                autoOpen : false,
                buttons : {
                    "关闭" : function() {
                        $(this).dialog("close");
                    }
                }
            });
        }
        var dlgWidget = msgDlgObj.dialog("widget").get(0);
        $('div a.ui-dialog-titlebar-close', dlgWidget).remove();// 去掉关闭按钮
    }
    // 弹出信息提示框
    this.info = function(msg, isHtmlMsg, closeDelayOrCallBack, callbackParams,
            lockPage) {
        isHtmlMsg = isHtmlMsg === true;
        generateMsgDlg(uniqueId);
        $('#' + msgDlgIds.img).get(0).className = "msg-info-icon";
        msgDlgObj.dialog("open");
        if (isHtmlMsg) {
            $('#' + msgDlgIds.msg).html(msg);
        } else {
            $('#' + msgDlgIds.msg).text(msg);
        }
        // 自动延迟关闭
        if (typeof (closeDelayOrCallBack) == "number") {
            setTimeout((function() {
                var dlg = msgDlgObj;
                return function() {
                    if (dlg != null) {
                        dlg.dialog("close");
                    }
                };
            })(), closeDelayOrCallBack);
        } else if (typeof (closeDelayOrCallBack) == "function") {
            if (lockPage == true) {// 强制锁屏
                try {
                    closeDelayOrCallBack(callbackParams);
                } catch (err) {
                }
                //
                msgDlgObj.dialog("option", "buttons", {});
            } else {
                msgDlgObj.dialog("option", "buttons", {
                    "关闭" : function() {
                        $(this).dialog("close");
                        try {
                            closeDelayOrCallBack(callbackParams);
                        } catch (err) {
                        }
                        //
                        msgDlgObj.dialog("option", "buttons", {
                            "关闭" : function() {
                                $(this).dialog("close");
                            }
                        });
                    }
                });
            }
        }
    };
    // 弹出警告提示框
    this.warning = function(msg, isHtmlMsg, closeCallBack, callbackParams,
            lockPage) {
        isHtmlMsg = isHtmlMsg === true;
        generateMsgDlg(uniqueId);
        $('#' + msgDlgIds.img).get(0).className = "msg-warning-icon";
        msgDlgObj.dialog("open");
        if (isHtmlMsg) {
            $('#' + msgDlgIds.msg).html(msg);
        } else {
            $('#' + msgDlgIds.msg).text(msg);
        }
        //
        if (typeof (closeCallBack) == "function") {
            if (lockPage == true) {// 强制锁屏
                try {
                    closeCallBack(callbackParams);
                } catch (err) {
                }
                //
                msgDlgObj.dialog("option", "buttons", {});
            } else {
                msgDlgObj.dialog("option", "buttons", {
                    "关闭" : function() {
                        $(this).dialog("close");
                        try {
                            closeCallBack(callbackParams);
                        } catch (err) {
                        }
                        //
                        msgDlgObj.dialog("option", "buttons", {
                            "关闭" : function() {
                                $(this).dialog("close");
                            }
                        });
                    }
                });
            }
        }
    };
    // 弹出错误提示框
    this.error = function(msg, isHtmlMsg, closeCallBack, callbackParams,
            lockPage) {
        isHtmlMsg = isHtmlMsg === true;
        generateMsgDlg(uniqueId);
        $('#' + msgDlgIds.img).get(0).className = "msg-error-icon";
        msgDlgObj.dialog("open");
        if (isHtmlMsg) {
            $('#' + msgDlgIds.msg).html(msg);
        } else {
            $('#' + msgDlgIds.msg).text(msg);
        }
        //
        if (typeof (closeCallBack) == "function") {
            if (lockPage == true) {
                try {
                    closeCallBack(callbackParams);
                } catch (err) {
                }
                //
                msgDlgObj.dialog("option", "buttons", {});
            } else {
                msgDlgObj.dialog("option", "buttons", {
                    "关闭" : function() {
                        $(this).dialog("close");
                        try {
                            closeCallBack(callbackParams);
                        } catch (err) {
                        }
                        //
                        msgDlgObj.dialog("option", "buttons", {
                            "关闭" : function() {
                                $(this).dialog("close");
                            }
                        });
                    }
                });
            }
        }
    };
    // 确认对话框 --------------------------------------------
    var confirmDlgIds = {};
    var confirmDlgDiv = null;
    var confirmDlgObj = null;
    var confirmDlgResult = null;// close => null, ok => ture, cancel => false
    var confirmDlgHandler = function() {
        alert("你未指定 确认对话框的结果 处理函数！");
    };
    var confirmDlgExtraData = null;
    function generateConfirmDlg(uniqueId) {
        if (confirmDlgDiv == null) {
            confirmDlgIds.div = "jq-confirm-dlg-div-" + uniqueId;
            confirmDlgIds.tbl = "jq-confirm-dlg-tbl-" + uniqueId;
            confirmDlgIds.img = "jq-confirm-dlg-icon-" + uniqueId;
            confirmDlgIds.msg = "jq-confirm-dlg-content-" + uniqueId;
            var html = '<div id="' + confirmDlgIds.div
                    + '" style="cursor:default;display:none;">';
            html += '<table id="'
                    + confirmDlgIds.tbl
                    + '" style="cursor:default;border-collapse:collapse;table-layout:fixed;width:100%" cellpadding="0" cellspacing="0" border="0">';
            html += '<tr>';
            html += '<td width="50" style="cursor:default;text-align:left; vertical-align:middle;">';
            html += '<div id="'
                    + confirmDlgIds.img
                    + '" style="float:left;width:47px;height:35px;">&nbsp;</div>';
            html += '</td>';
            html += '<td style="cursor:default;margin:0px;word-break:break-all;word-wrap:break-word;width:auto;">';
            html += '<p id="' + confirmDlgIds.msg
                    + '" style="width:100%;margin:0;font-size:12pt;">';
            html += '</p>';
            html += '</td>';
            html += '</tr>';
            html += '</table>';
            html += '</div>';
            //
            var tmpDiv = document.createElement("div");
            document.body.appendChild(tmpDiv);
            tmpDiv.innerHTML = html;
            confirmDlgDiv = document.getElementById(confirmDlgIds.div);
            tmpDiv.removeChild(confirmDlgDiv);
            tmpDiv.parentNode.removeChild(tmpDiv);
            //
            confirmDlgObj = $(confirmDlgDiv).dialog({
                minWidth : 400,
                minHeight : 200,
                width : 500,
                modal : true,
                title : "确认对话框",
                autoOpen : false,
                buttons : {
                    "确定" : function() {
                        confirmDlgResult = true;
                        $(this).dialog("close");

                    },
                    "取消" : function() {
                        confirmDlgResult = false;
                        $(this).dialog("close");
                    }
                },
                close : function() {
                    confirmDlgHandler(confirmDlgResult, confirmDlgExtraData);
                }
            });
        }
    }
    // 弹出确认对话框
    this.confirm = function(msg, handler, isHtmlMsg, extraData) {
        confirmDlgResult = null;
        isHtmlMsg = isHtmlMsg === true;
        generateConfirmDlg(uniqueId);
        $('#' + confirmDlgIds.img).get(0).className = "msg-question-icon";
        if (typeof handler == "function") {
            confirmDlgHandler = handler;
            confirmDlgExtraData = extraData;
        }
        confirmDlgObj.dialog("open");
        if (isHtmlMsg) {
            $('#' + confirmDlgIds.msg).html(msg);
        } else {
            $('#' + confirmDlgIds.msg).text(msg);
        }
    };
    // 等待对话框 --------------------------------------------
    var waitDlgIds = {};
    var waitDlgDiv = null;
    var waitDlgObj = null;
    function generateWaitDlg(uniqueId) {
        if (waitDlgDiv == null) {
            waitDlgIds.div = "jq-wait-dlg-div-" + uniqueId;
            waitDlgIds.tbl = "jq-wait-dlg-tbl-" + uniqueId;
            waitDlgIds.img = "jq-wait-dlg-icon-" + uniqueId;
            waitDlgIds.msg = "jq-wait-dlg-content-" + uniqueId;
            var html = '<div id="' + waitDlgIds.div
                    + '" style="cursor:default;display:none;">';
            html += '<table id="'
                    + waitDlgIds.tbl
                    + '" style="cursor:default;border-collapse:collapse;table-layout:fixed;width:100%" cellpadding="0" cellspacing="0" border="0">';
            html += '<tr>';
            html += '<td width="50" style="cursor:default;text-align:left; vertical-align:middle;">';
            html += '<div id="'
                    + waitDlgIds.img
                    + '" style="float:left;width:47px;height:35px;">&nbsp;</div>';
            html += '</td>';
            html += '<td style="cursor:default;margin:0px;word-break:break-all;word-wrap:break-word;width:auto;">';
            html += '<p id="' + waitDlgIds.msg
                    + '" style="width:100%;margin:0;font-size:12pt;">';
            html += '</p>';
            html += '</td>';
            html += '</tr>';
            html += '</table>';
            html += '</div>';
            //
            var tmpDiv = document.createElement("div");
            document.body.appendChild(tmpDiv);
            tmpDiv.innerHTML = html;
            waitDlgDiv = document.getElementById(waitDlgIds.div);
            tmpDiv.removeChild(waitDlgDiv);
            tmpDiv.parentNode.removeChild(tmpDiv);
            //
            waitDlgObj = $(waitDlgDiv).dialog({
                minWidth : 200,
                minHeight : 50,
                maxWidth : 800,
                width : 500,
                modal : true,
                title : "提示对话框",
                autoOpen : false,
                buttons : {/* 不显示按钮 */}
            });
            // 不显示标题栏
            $('.ui-dialog-titlebar', waitDlgObj.dialog("widget")).hide();
        }
    }
    // 弹出等待对话框
    this.showWait = function(msg, isHtmlMsg) {
        isHtmlMsg = isHtmlMsg === true;
        generateWaitDlg(uniqueId);
        $('#' + waitDlgIds.img).get(0).className = "msg-wait-icon";
        waitDlgObj.dialog("open");
        waitDlgObj.dialog("widget").fadeTo('fast', 0.8);
        if (isHtmlMsg) {
            $('#' + waitDlgIds.msg).html(msg);
        } else {
            $('#' + waitDlgIds.msg).text(msg);
        }
    };
    this.hideWait = function() {
        waitDlgObj.dialog("close");
        $('#' + waitDlgIds.msg).html("");
    };
    
    // 进度对话框 --------------------------------------------
	var progressDlgIds = {};
	var progressDlgDiv = null;
	var progressDlgObj = null;
	function generateProgressDlg(uniqueId) {
		if(progressDlgDiv == null) {
			progressDlgIds.div = "jq-progress-dlg-div-" + uniqueId;
			progressDlgIds.tbl = "jq-progress-dlg-tbl-" + uniqueId;
			progressDlgIds.img = "jq-progress-dlg-icon-" + uniqueId;
			progressDlgIds.msg = "jq-progress-dlg-content-" + uniqueId;
			var html = '<div id="' + progressDlgIds.div + '" style="cursor:default;display:none;">';
			html += '<table id="' + progressDlgIds.tbl + '" style="cursor:default;border-collapse:collapse;table-layout:fixed;width:100%" cellpadding="8px" cellspacing="0" border="0">';
			html += '<tr>';
			html += '<td width="100%" style="cursor:default;vertical-align:middle;">';
			html += '<div id="' + progressDlgIds.img + '" style="height:35px;"></div>';
			html += '</td></tr>';
			html += '<tr><td style="cursor:default;margin:0;word-break:break-all;word-wrap:break-word;width:auto;text-align:center;">';
			html += '<p id="' + progressDlgIds.msg + '" style="width:100%;margin:0;font-size:12pt;">';
			html += '</p>';
			html += '</td>';
			html += '</tr>';
			html += '</table>';
			html += '</div>';
			//
			var tmpDiv = document.createElement("div");
			document.body.appendChild(tmpDiv);
			tmpDiv.innerHTML = html;
			progressDlgDiv = document.getElementById(progressDlgIds.div);
			tmpDiv.removeChild(progressDlgDiv);
			tmpDiv.parentNode.removeChild(tmpDiv);
			//
			$("#"+progressDlgIds.img).progressbar({
				value : 0
			});
			progressDlgObj = $(progressDlgDiv).dialog({
				minWidth : 200,
				minHeight : 50,
				maxWidth : 800,
				width : 500,
				modal : true,
				title : "进度提示",
				autoOpen : false,
				buttons : {/* 不显示按钮 */}
			});
			// 不显示标题栏
			//$('.ui-dialog-titlebar', progressDlgObj.dialog("widget")).hide();
		}
	}

	function isNum(obj) {
		return obj != null && ( typeof obj == "number" || obj instanceof Number) && !isNaN(obj) && isFinite(obj);
	}

	//从当前值和总值计算出100分的值
	function toProgressValue(value, totalValue) {
		totalValue = parseFloat(totalValue);
		value = parseFloat(value);
		if(!isNum(value) || value <= 0) {
			return 0;
		}
		if(isNum(totalValue)) {
			if(totalValue <=0) {
				if(value < 1) {
					value = value * 100;
				}
			}
			else {
				value = value * 100 / totalValue;
			}			
		} else if(value < 1) {
			value = value * 100;
		}
		value = Math.round(value);
		return value;
	}
	
	// 弹出进度对话框（如果是小数将自动x100）
	this.showProgress = function(msg, isHtmlMsg) {
		isHtmlMsg = isHtmlMsg === true;
		generateProgressDlg(uniqueId);
		$('#' + progressDlgIds.img).progressbar({
			value : 0
		});
		progressDlgObj.dialog("open");
		//progressDlgObj.dialog("widget").fadeTo('fast', 0.8);
		if( typeof msg == "string") {
			if(isHtmlMsg) {
				$('#' + progressDlgIds.msg).html(msg);
			} else {
				$('#' + progressDlgIds.msg).text(msg);
			}
		}
	};	
	//设置与100相比的进度值
	this.setProgressValue = function(value){
		generateProgressDlg(uniqueId);
		$('#' + progressDlgIds.img).progressbar({
			value : value
		});
	};
	//设置当前值与总值（百分比进度会自动计算）
	this.setProgressValue2 = function(value, totalValue){
		var valuex = toProgressValue(value, totalValue);
		this.setProgressValue(valuex);
	};
	//设置进度提示消息
	this.setProgressMsg = function(msg, isHtmlMsg){
		generateProgressDlg(uniqueId);
		if( typeof msg == "string") {
			if(isHtmlMsg) {
				$('#' + progressDlgIds.msg).html(msg);
			} else {
				$('#' + progressDlgIds.msg).text(msg);
			}
		}
	};
	//隐藏进度对话框
	this.hideProgress = function() {
		generateProgressDlg(uniqueId);
		progressDlgObj.dialog("close");
		$('#' + progressDlgIds.msg).html("");
		$('#' + progressDlgIds.img).progressbar({
			value : 0
		});
	};
	
    // 初始化常用对话框
    this.init = function() {
        generateWaitDlg(uniqueId);
        //
        setTimeout(function() {
            generateMsgDlg(uniqueId);
        }, 3000);
        setTimeout(function() {
            generateConfirmDlg(uniqueId);
        }, 4000);
        setTimeout(function() {
            generateProgressDlg(uniqueId);
        }, 5000);
    };
}();