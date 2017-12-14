//URL地址...
var webSocketUrl = null;
//
var retryOnClose = true;
var retryTimer = null;
var retryInterval = 10 * 1000;
var webSocket = null;
//自定义协议请求代码（代表请求何种数据...）
var requestCode = {

};
//自定义协议结果代码（可联合使用requestCode...）
var resultCode = {
	appNodeInfo : 1601
};
//打开WebSocket连接并注册结果处理函数
function openWebSocket() {
	if (getWebSocket() == null) {
		Layer.msgWarning("当前浏览器不支持 WebSocket，请更换浏览器");
		return null;
	} else if (webSocket != null) {
		return webSocket;
	}
	var serverBase = getServerBase();
	var wsServerBase = null;
	if (serverBase.startsWith("https://")) {
		wsServerBase = replaceStr(serverBase, "https://", "wss://");
	} else {
		wsServerBase = replaceStr(serverBase, "http://", "ws://");
	}
	console.log("Server Base >> " + wsServerBase);
	//
	webSocket = new WebSocket(wsServerBase + getAppUrl(webSocketUrl));
	webSocket.onopen = function(evt) {
		clearTimeout(retryTimer);
		//
		Toast.show("WebSocket连接已打开", 2000);
		//
		console.log("WebSocket连接已打开");
	};
	webSocket.onclose = function(evt) {
		webSocket = null;
		//
		console.log("WebSocket连接已关闭");
		//
		if (retryOnClose) {
			retryTimer = setTimeout(openWebSocket, retryInterval);
		}
	};
	webSocket.onerror = function(msg) {
		webSocket = null;
		//
		Toast.show("WebSocket连接发生错误", 5000, "warn");
		//
		console.log("WebSocket连接发生错误");
	};
	//结果数据处理（...）-----------------------------------------------
	webSocket.onmessage = function(evt) {
		var result = JSON.decode(evt.data);
		if (result != null) {
			if (result.type == "info") {
				var data = result.data;
				if (result.code == resultCode.appNodeInfo) {

					//
					console.log(data);
				} else {
					//var request = {};
					//webSocket.send(JSON.encode(request));
					//
					console.log(JSON.encode(data));
				}
			} else {
				Toast.show(result.message, 5000, "warn");
			}
		} else {
			console.log("结果无数据");
		}
	};
}