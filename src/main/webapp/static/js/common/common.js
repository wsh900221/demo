/**
 * @fileOverview This js file defines common used functions or classes or extend
 *               built-in classes
 * @author Hu Changwei
 */
// ================================================================================
// ================================================================================
/**
 * 哑函数，只是为了把某些条件式语句看起来更像函数执行
 */
function Void() {
	// do nothing
}

/**
 * 判断给定对象是否是未定义(undefined)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isUndef(obj) {
	return typeof obj == "undefined";
}

/**
 * 判断给定对象是否是null（但不是未定义）
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isNull(obj) {
	return typeof obj != "undefined" && obj == null;
}

/**
 * 判断给定对象是否和null等值（但非恒等===）
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function eqNull(obj) {
	return obj == null;
}

/**
 * 转换为字符串值
 *
 * @param {Object}
 *            obj
 * @return {String}
 */
function asStr(obj) {
	return "" + obj;
}

/**
 * 检查给定的对象是否为给定类型的实例
 *
 * @param {Object}
 *            obj
 * @param {Constructor}
 *            chkClass
 * @return {Boolean}
 */
function isInstanceOf(obj, chkClass) {
	return obj != null && obj.constructor == chkClass;
}

/**
 * { "String": "[object String]", "Number": "[object Number]", "Boolean":
 * "[object Boolean]", "Date": "[object Date]", "Array": "[object Array]",
 * "Function": "[object Function]", "RegExp": "[object RegExp]", "Object":
 * "[object Object]" };
 */

/**
 * 检查给定的对象是否为字符串(string)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isString(obj) {
	return obj != null && ( typeof obj == "string" || obj instanceof String);
}

/**
 * 检查给定的对象是否为数值(number)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isNumber(obj) {
	return obj != null && ( typeof obj == "number" || obj instanceof Number);
}

/**
 * 严格 检查给定的对象是否为数值(excluding NaN and Infinity)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isNum(obj) {
	return isNumber(obj) && !isNaN(obj) && isFinite(obj);
}

/**
 * 检查给定的对象是否为 boolean 值
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isBoolean(obj) {
	return obj != null && ( typeof obj == "boolean" || obj instanceof Boolean);
}

/**
 * 检查给定的对象是否为函数(function)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isFunction(obj) {
	return obj != null && ( typeof obj == "function" || obj instanceof Function);
}

/**
 * 检查给定的对象是否为基本类型（string、number、boolean）
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isPrimitive(obj) {
	return obj != null && (isString(obj) || isNumber(obj) || isBoolean(obj));
}

/**
 * 检查给定的对象是否为日期对象(Date)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isDate(obj) {
	return obj != null && obj instanceof Date;
}

/**
 * 检查给定的对象是否为数组(Array)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isArray(obj) {
	return obj != null && Object.prototype.toString.apply(obj) == "[object Array]";
}

/**
 * 检查给定的对象是否为正则表达式(RegExp)
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isRegExp(obj) {
	return obj != null && obj instanceof RegExp;
}

/**
 * 检查给定的对象是否为普通的(json)对象
 *
 * @param {Object}
 *            obj 被检查对象
 * @param {Boolean}
 *            [bLooseCheck] 是否宽松检查
 * @return {Boolean}
 */
function isPlainObject(obj, bLooseCheck) {
	if (!obj || Object.prototype.toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval) {
		return false;
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	//
	if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
		return false;
	}

	if (bLooseCheck == true) {
		return true;
	} else {
		var key;
		for (key in obj) {
			// just pass
		}
		return key === undefined || hasOwnProperty.call(obj, key);
	}
}

/**
 * 返回给定的对象是否为空的(json)对象
 *
 * @param {Object}
 *            obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
	for (var name in obj) {
		return false;
	}
	return true;
}

// ------------------------------------------
/**
 * @private
 */
var ___STRING_LTRIM_REG = /^(\s)+/i;
/**
 * @private
 */
var ___STRING_RTRIM_REG = /(\s)+$/i;
/**
 * 返回去掉开头的空白字符后的字符串
 *
 * @param {String}
 *            str
 * @return {String} 去掉开头的空白字符后的字符串
 */
function lTrim(str) {
	return str.replace(___STRING_LTRIM_REG, "");
}

/**
 * 返回去掉结尾的空白字符后的字符串
 *
 * @param {String}
 *            str
 * @return {String} 去掉结尾的空白字符后的字符串
 */
function rTrim(str) {
	return str.replace(___STRING_RTRIM_REG, "");
}

/**
 * 返回去掉两头的空白字符后的字符串
 *
 * @param {String}
 *            str
 * @return {String} 去掉两头的空白字符后的字符串
 */
function trim(str) {
	return str.replace(___STRING_LTRIM_REG, "").replace(___STRING_RTRIM_REG, "");
}

//
function strEql(valX, valY) {
	if (valX == null) {
		return valY == null;
	} else if (valY == null) {
		return valX == null;
	} else {
		return asStr(valX) === asStr(valY);
	}
}

function strEqlAny(val /* , chkVal1, chkVal2,... */) {
	var chkCount = arguments.length - 1;
	if (chkCount <= 0) {
		return false;
	}
	if (isArray(arguments[1])) {
		var chkArray = arguments[1];
		chkCount = chkArray.length;
		for (var i = 0; i < chkCount; i++) {
			if (strEql(val, chkArray[i])) {
				return true;
			}
		}
	} else {
		chkCount++;
		for (var i = 1; i < chkCount; i++) {
			if (strEql(val, arguments[i])) {
				return true;
			}
		}
	}
	return false;
}

/**
 * extend String method
 */
String.prototype.lTrim = function() {
	return lTrim(this);
};
/**
 * extend String method
 */
String.prototype.rTrim = function() {
	return rTrim(this);
};
/**
 * extend String method
 */
String.prototype.trim = function() {
	return trim(this);
};
/**
 * extend String method
 *
 * @returns {Boolean} whether this string is empty (ie. =="")
 */
String.prototype.isEmpty = function() {
	return this == "";
};
/**
 * extend String method
 *
 * @returns {Boolean} whether this string is blank (ie. like " ")
 */
String.prototype.isBlank = function() {
	return trim(this) == "";
};
/**
 * 判断给定的对象是否为null，或者作为字符串是否为""
 *
 * @param {Object}
 *            chkStr
 * @return {Boolean}
 */
function isNullOrEmpty(chkStr) {
	return chkStr == null || asStr(chkStr).isEmpty();
}

/**
 * 判断给定的对象是否为null，或者作为字符串是否为"" 或 空白字符
 *
 * @param {Object}
 *            chkStr
 * @return {Boolean}
 */
function isNullOrBlank(chkStr) {
	return chkStr == null || asStr(chkStr).isBlank();
}

var isNoE = isNullOrEmpty;
var isNoB = isNullOrBlank;

/**
 * replace all "what" in "srcStr" by "byWhat" ( "srcStr" not affected )
 *
 * @param {String}
 *            srcStr
 * @param {String}
 *            what
 * @param {String}
 *            [byWhat=""]
 * @returns {String} result string
 */
function replaceStr(srcStr, what, byWhat) {
	if (byWhat == null) {
		byWhat = "";
	}
	var tmpStr = srcStr.split(what);
	return tmpStr.join(byWhat);
};

/**
 * replace all "what"(RegExp string) in "srcStr" by "byWhat"(RegExp string) (
 * "srcStr" not affected )
 *
 * @param {String}
 *            srcStr
 * @param {String}
 *            what
 * @param {String}
 *            byWhat
 * @returns {String} result string
 */
function replaceRegStr(srcStr, whatReg, byWhat) {
	var reg = new RegExp(whatReg, 'g');
	return srcStr.replace(reg, byWhat);
};

/**
 * return left-most (length) chars in str
 *
 * @param {String}
 *            str
 * @param {int}
 *            length
 * @returns {String} left string chars in total "length"
 */
function left(str, length) {
	if (!isString(str)) {
		return null;
	}
	var strLen = str.length;
	if (length >= strLen) {
		return str;
	} else {
		return str.substring(0, length);
	}
}

/**
 * return right-most (length) chars in str
 *
 * @param {String}
 *            str
 * @param {int}
 *            length
 * @returns {String} right string chars in total "length"
 */
function right(str, length) {
	if (!isString(str)) {
		return null;
	}
	var strLen = str.length;
	if (length >= strLen) {
		return str;
	} else {
		return str.substring(strLen - length);
	}
}

function __padString(_srcStr, len, isRight, padStr) {
	var srcStr = "" + _srcStr;
	var needLen = len - srcStr.length;
	if (needLen <= 0) {
		return srcStr;
	}
	if (padStr == null) {
		padStr = " ";
	}
	if (padStr.length <= 0) {
		throw "padStr 's length must be great than 0 !";
	}
	var appendStr = "";
	do {
		appendStr += padStr;
		if (appendStr.length >= needLen) {
			appendStr = left(appendStr, needLen);
			break;
		}
	} while (true);
	//
	return isRight == true ? srcStr + appendStr : appendStr + srcStr;
}

/**
 * return a new string by appending len * padStr string
 *
 * @param {String}
 *            _srcStr
 * @param {int}
 *            len
 * @param {String}
 *            [padStr=" "]
 * @returns {String}
 */
function padLeft(_srcStr, len, padStr) {
	return __padString(_srcStr, len, false, padStr);
}

function padRight(_srcStr, len, padStr) {
	return __padString(_srcStr, len, true, padStr);
}

/**
 * extend String method
 *
 * @param {int}
 *            length
 * @returns {String}
 */
String.prototype.left = function(length) {
	return left(this, length);
};
/**
 * extend String method
 *
 * @param {int}
 *            length
 * @returns {String}
 */
String.prototype.right = function(length) {
	return right(this, length);
};
/**
 * return a new string by duplicating refStr "count" times
 *
 * @param {String}
 *            refStr
 * @param {int}
 *            count
 * @returns {String}
 */
function dupStr(refStr, count) {
	if (!isNum(count)) {
		return null;
	}
	count = Math.floor(count);
	var resultStr = "";
	if (count <= 0) {
		return resultStr;
	}
	resultStr = refStr;
	for (var i = 1; i < count; i++) {
		resultStr += refStr;
	}
	return resultStr;
}

/**
 * check whether "srcStr" starts with the given "chkStr"
 *
 * @param {String}
 *            srcStr
 * @param {String}
 *            chkStr
 * @returns {Boolean}
 */
function strStartsWith(srcStr, chkStr) {
	if (!isString(chkStr)) {
		return false;
	}
	return (srcStr.indexOf(chkStr) === 0);
}

/**
 * check whether "srcStr" ends with the given "chkStr"
 *
 * @param {String}
 *            srcStr
 * @param {String}
 *            chkStr
 * @returns {Boolean}
 */
function strEndsWith(srcStr, chkStr) {
	if (!isString(chkStr)) {
		return false;
	}
	var lastIndex = srcStr.lastIndexOf(chkStr);
	return (lastIndex != -1) && (lastIndex == srcStr.length - chkStr.length);
}

/**
 * check whether <b>srcStr</b> contains <b>searchStr</b> with optional
 * <b>bIgnoreCase</b> param
 *
 * @param {String}
 *            srcStr
 * @param {String}
 *            searchStr
 * @param {Boolean}
 *            [bIgnoreCase=false]
 * @returns {Boolean}
 */
function strContains(srcStr, searchStr, bIgnoreCase) {
	if (!isString(searchStr)) {
		return false;
	}
	//
	bIgnoreCase === true;
	var xIndex = bIgnoreCase ? srcStr.toUpperCase().indexOf(searchStr.toUpperCase()) : srcStr.indexOf(searchStr);
	return (xIndex != -1);
}

/**
 * extend String method
 *
 * @param {String}
 *            chkStr
 * @returns {Boolean}
 */
String.prototype.startsWith = function(chkStr) {
	return strStartsWith(this, chkStr);
};
/**
 * extend String method
 *
 * @param {String}
 *            chkStr
 * @returns {Boolean}
 */
String.prototype.endsWith = function(chkStr) {
	return strEndsWith(this, chkStr);
};
/**
 * extend String method
 *
 * @param {String}
 *            searchStr
 * @param {Boolean}
 *            bIgnoreCase
 * @returns {Boolean}
 */
String.prototype.contains = function(searchStr, bIgnoreCase) {
	return strContains(this, searchStr, bIgnoreCase);
};

//形如{abc.dedss[0].zzz.(aaa.xxx).aaa}的字符串key路径
//[abc , dedss[0], zzz, aaa.xxx, aaa]
function extractTemplateHolderParts(holderStr) {
	var holder = holderStr.substring(1, holderStr.length - 1).trim();
	var holderLen = holder.length;
	var holderParts = [];
	var tmpIndex = 0;
	var tmpPart = "";
	var inKh = false;
	while (tmpIndex < holderLen) {
		var tmpChar = holder.charAt(tmpIndex);
		if (tmpChar == '(') {
			if (!inKh) {
				inKh = true;
				tmpPart = tmpPart.trim();
				if (tmpPart != "") {
					holderParts.add(tmpPart);
					tmpPart = "";
				}
			} else {
				tmpPart += tmpChar;
			}
		} else if (tmpChar == ")") {
			if (inKh) {
				tmpPart = tmpPart.trim();
				if (tmpPart != "") {
					holderParts.add(tmpPart);
					tmpPart = "";
				}
				inKh = false;
			} else {
				tmpPart += tmpChar;
			}
		} else if (tmpChar == ".") {
			if (inKh) {
				tmpPart += tmpChar;
			} else {
				tmpPart = tmpPart.trim();
				if (tmpPart != "") {
					holderParts.add(tmpPart);
					tmpPart = "";
				}
			}
		} else {
			tmpPart += tmpChar;
		}
		tmpIndex++;
	}
	tmpPart = tmpPart.trim();
	if (tmpPart != "") {
		holderParts.add(tmpPart);
		tmpPart = "";
	}
	return holderParts;
}

/**
 * 格式化字符串，形如： {0},{1}..的索引位置，或形如 {pro1}, {prop2.subprop.(a.b).c}, {prop3[0]}的对象式<br/>
 * 对于带key为形如 "a.b"的，可以使用(a.b)标记为原子key
 */
function formatStr(template) {
	if (!isString(template)) {
		return template;
	}
	var params = Array.prototype.slice.call(arguments, 1);
	var paramCount = params.length;
	if (paramCount == 0) {
		return template;
	}
	var nullAs = template.nullAs || "null";
	var resultStr = "";
	var asObject = isPlainObject(params[0]);
	if (asObject) {
		params = params[0];
		var xReg = /\{(\(?[a-zA-Z_]+(\.[a-zA-Z_]+)*\)?)+(\.(\(?[a-zA-Z_]+(\.[a-zA-Z_]+)*\)?)|\[\d+\])*\}?/mg;
		resultStr = template.replace(xReg, function(match) {
			var holderParts = extractTemplateHolderParts(match);
			var param = null;
			var curKey = "";
			for (var i = 0, len = holderParts.length; i < len; i++) {
				var tmpPart = holderParts[i];
				if (tmpPart.indexOf(".") != -1) {
					curKey += "[\"" + tmpPart + "\"]";
				} else {
					curKey += "." + tmpPart;
				}
				param = eval("params" + curKey);
				if (param == null) {
					break;
				}
			}
			// alert(match +" : "+param);
			return "" + (param == null ? nullAs : param);
		});
	} else {
		var xReg = /\{\d+}?/mg;
		resultStr = template.replace(xReg, function(m) {
			var holder = m.substring(1, m.length - 1).trim();
			var index = parseInt(holder);
			if (index >= 0 && index < paramCount) {
				var param = params[index];
				// alert(holder +" : "+param);
				return "" + (param == null ? nullAs : param);
			} else {
				return m;
			}
		});
	}
	return resultStr;
}

String.prototype.format = function() {
	var args = [this].concat(Array.prototype.slice.call(arguments, 0));
	return formatStr.apply(window, args);
};

String.prototype.isIn = function() {
	var args = [this].concat(Array.prototype.slice.call(arguments, 0));
	return strEqlAny.apply(window, args);
};
/**
 * @private
 */
var __escapeStrReg = {
	backslash : /\\/ig,
	quote : /'/ig,
	dblquote : /"/ig,
	newline : /\n/ig,
	carriage : /\r/ig,
	carriage2 : /\r\n/ig,
	formfeed : /\f/ig,
	hrtab : /\t/ig,
	foreslash : /\//ig
	// not used for json escape
};

/**
 * Escape string by filter special chars(\, ', ", \n, \r, \t etc.)
 *
 * @param {String}
 *            src original string
 * @param {Boolean}
 *            [useSingleQutoe=false] whether to use Single Qutoe
 * @returns {String} escaped string
 * @example escapeJsonStr("aaaaaa'bbb/ccc\t'ddd",true) => aaaaaa\'bbb/ccc\t\'ddd
 */
function escapeJsonStr(src, useSingleQutoe) {
	if (src == null || src == "") {
		return src;
	} else {
		useSingleQutoe = useSingleQutoe === true;
		// backslash
		__escapeStrReg.backslash.lastIndex = -1;
		src = src.replace(__escapeStrReg.backslash, "\\\\");
		if (useSingleQutoe) {
			// quote
			__escapeStrReg.quote.lastIndex = -1;
			src = src.replace(__escapeStrReg.quote, "\\'");
		} else {
			// dblquote
			__escapeStrReg.dblquote.lastIndex = -1;
			src = src.replace(__escapeStrReg.dblquote, '\\"');
		}
		// newline
		__escapeStrReg.newline.lastIndex = -1;
		src = src.replace(__escapeStrReg.newline, '\\n');
		// carriage
		__escapeStrReg.carriage.lastIndex = -1;
		src = src.replace(__escapeStrReg.carriage, '\\r');
		// carriage2
		__escapeStrReg.carriage2.lastIndex = -1;
		src = src.replace(__escapeStrReg.carriage2, '\\r\\n');
		// formfeed
		__escapeStrReg.formfeed.lastIndex = -1;
		src = src.replace(__escapeStrReg.formfeed, '\\f');
		// hrtab
		__escapeStrReg.hrtab.lastIndex = -1;
		src = src.replace(__escapeStrReg.hrtab, '\\t');
		return src;
	}
}

/**
 * extend String method
 *
 * @param {Boolean}
 *            useSingleQutoe
 * @returns {String} {@link #escapeJsonStr }
 */
String.prototype.escapeJson = function(useSingleQutoe) {
	return escapeJsonStr(this, useSingleQutoe);
};

// 公开方法
String.builder = function() {
	var obj = new String.builder.fn();
	obj.append.apply(obj, arguments);
	return obj;
};

String.builder.fn = function() {
	this.value = "";
	//
	this.append = function() {
		for (var i = 0, c = arguments.length; i < c; i++) {
			this.value = this.value + arguments[i];
		}
	};
	this.appendln = function() {
		this.append.apply(this, arguments);
		this.append("\n");
	};
	this.prepend = function() {
		for (var i = 0, c = arguments.length; i < c; i++) {
			this.value = arguments[i] + this.value;
		}
	};
	this.clear = function() {
		this.value = "";
	};
};

/**
 * 解析大小及单位
 *
 * @param dim
 * @returns
 */
function parseDimen(dim) {
	if (dim == null) {
		return null;
	}
	var ret = {};
	if (isNum(dim)) {
		ret.value = dim;
		ret.unit = "px";
	} else if (isString(dim)) {
		var rawNum = ParseFloat(dim);
		if (isNum(rawNum)) {
			ret.value = rawNum;
			var numStr = asStr(ret.value);
			var rawUnit = dim.substring(numStr.length).trim();
			ret.unit = rawUnit == "" ? "px" : rawUnit;
		}
	}
	return ret;
}

Number.prototype.round = function(frgs) {
	if (!isNum(frgs) || frgs < 0) {
		frgs = 0;
	}
	if (frgs == 0) {
		return Math.round(this);
	}
	var numStr = this + "";
	var dotIndex = numStr.indexOf(".");
	if (dotIndex != -1) {
		var intPart = numStr.substring(0, dotIndex);
		var frgPart = dotIndex == numStr.length - 1 ? "" : numStr.substring(dotIndex + 1);
		if (frgPart.length > frgs) {
			var nextDigit = new Number(frgPart.charAt(frgs));
			frgPart = frgPart.substring(0, frgs);
			if (nextDigit >= 5) {
				var lastDigit = new Number(frgPart.charAt(frgs - 1));
				frgPart = frgPart.substring(0, frgs - 1) + (lastDigit + 1);
			}
		}
		numStr = frgPart == "" ? intPart : intPart + "." + frgPart;
		return new Number(numStr);
	} else {
		return this;
	}
};

/**
 * clear all of the array elements
 */
Array.prototype.clear = function() {
	this.length = 0;
};
/**
 * add one at the end of the array
 */
Array.prototype.add = function(vItem) {
	this[this.length] = vItem;
};
//
function ParseInt(x) {
	if (isString(x)) {
		if (x.isBlank()) {
			return NaN;
		}
	}
	return parseInt(x);
}

function ParseFloat(x) {
	if (isString(x)) {
		if (x.isBlank()) {
			return NaN;
		}
	}
	return parseFloat(x);
}

/*------------------------------------------------------------------------------
 * JavaScript zArray Library
 * Version 1.1
 * by Nicholas C. Zakas, http://www.nczonline.net/
 * Copyright (c) 2004-2005 Nicholas C. Zakas. All Rights Reserved.
 */
var __arrayMethodsToCheck = ["slice", "splice", "shift", "unshift"];

/**
 * Appends any number of items onto the end of the array.
 */
Array.prototype.append = function() {
	for (var i = 0, j = this.length, k = arguments.length; i < k; i++, j++) {
		this[j] = arguments[i];
	}
};
/**
 * Prepend any number of items onto the end of the array.
 */
Array.prototype.prepend = function() {
	for (var i = 0, j = arguments.length; i < j; i++) {
		this.splice(0, 0, arguments[i]);
	}
};
/**
 * Creates a copy of the array and returns it.
 *
 * @return A copy of the array.
 */
Array.prototype.clone = function()/* :Array */
{
	return this.concat();
};
/**
 * Determines if a given item is in the array.
 *
 * @param vItem
 *            The item to insert.
 * @return True if found, false if not.
 */
Array.prototype.contains = function(vItem/* :variant */, isFunc /* : function */)/* :boolean */
{
	return this.indexOf(vItem, null, isFunc) > -1;
};
/**
 * Runs a function on each item in the array and returns a boolean result.
 *
 * @param {Function}
 *            fnTest The function to run on each value.
 * @param {Object}
 *            [context] The object that the function belongs to or null for a
 *            global function.
 * @return {Boolean} True if the function evaluates to true for each item in the
 *         array, false if even one returns false.
 */
Array.prototype.every = function(fnTest, context) {
	context = context || window;
	var bResult = true;
	for (var i = 0, len = this.length; i < len && bResult; i++) {
		bResult = bResult && fnTest.call(context, this[i], i, this);
	}
	return bResult;
};
/**
 * Runs a function on each item and returns an array.
 *
 * @param {Function}
 *            fnTest The function to run on each item.
 * @param {Object}
 *            context The object that the function belongs to or null for a
 *            global function.
 * @return {Array} An array made up of all the items that returned true for the
 *         function.
 */
Array.prototype.filter = function(fnTest, context) {
	context = context || window;
	var aResult = new Array();
	for (var i = 0, len = this.length; i < len; i++) {
		if (fnTest.call(context, this[i], i, this)) {
			aResult.push(this[i]);
		}
	}
	return aResult;
};
/**
 * Runs a function on each item and returns an array.
 *
 * @param {Function}
 *            fnTest The function to run on each item.
 * @param {Object}
 *            context The object that the function belongs to or null for a
 *            global function.
 * @return {Array} An array made up of all the items that returned false for the
 *         function.
 */
Array.prototype.reject = function(fnTest, context) {
	context = context || window;
	var aResult = new Array();
	for (var i = 0, len = this.length; i < len; i++) {
		if (!fnTest.call(context, this[i], i, this)) {
			aResult.push(this[i]);
		}
	}
	return aResult;
};
/**
 * 返回数组中对象的属性和给定的条件对象的属性相等的元素列表
 *
 * @param {Object}
 *            filterProps 条件对象
 * @return {Array} 符合条件的元素数组
 */
Array.prototype.where = function(filterProps) {
	var proxyProps = filterProps;
	var proxyKeys = [];
	var keyCount = proxyKeys.length;
	if (proxyProps != null) {
		for (var key in proxyProps) {
			proxyKeys[keyCount++] = key;
		}
		keyCount = proxyKeys.length;
	}
	var fnTest = function(vItem) {
		// 按列值完全比较
		if (vItem == proxyProps) {
			return true;
		} else if (proxyProps != null && vItem != null) {
			for (var i = 0; i < keyCount; i++) {
				var key = proxyKeys[i];
				if (proxyProps[key] != vItem[key]) {
					return false;
				}
			}
			return true;
		} else {
			return false;
		}
	};
	return this.filter(fnTest);
};
/**
 * Runs a function on each item in the array.
 *
 * @param {Function}
 *            fnExec The function to run on each value.
 * @param {Object}
 *            context The object that the function belongs to or null for a
 *            global function.
 */
Array.prototype.forEach = function(fnExec, context) {
	context = context || window;
	for (var i = 0, len = this.length; i < len; i++) {
		fnExec.call(context, this[i], i, this);
	}
};
/**
 * Returns the index of the first occurrance in the array.
 *
 * @param {Object}
 *            vItem The item to locate in the array.
 * @param {Integer}
 *            [iStart] The item to start looking from (optional).
 * @param {Function}
 *            [isFunc] Function used to just the index of vItem.
 * @return {Integer} The index of the item in the array if found or -1 if not
 *         found.
 */
Array.prototype.indexOf = function(vItem, iStart, isFunc) {
	if (iStart == null) {
		iStart = 0;
	}
	if ( typeof isFunc == "function") {
		for (var i = iStart, len = this.length; i < len; i++) {
			if (isFunc(this[i], vItem, i)) {
				return i;
			}
		}
	} else {
		for (var i = iStart, len = this.length; i < len; i++) {
			if (this[i] == vItem) {
				return i;
			}
		}
	}
	return -1;
};
/**
 * 根据提供的函数的判别结果返回第一个符合条件的元素
 */
Array.prototype.find = function(isFunc) {
	if ( typeof isFunc == "function") {
		for (var i = 0, len = this.length; i < len; i++) {
			var elem = this[i];
			if (isFunc(elem, i)) {
				return elem;
			}
		}
	}
	return null;
};

/**
 * Inserts an item into the array at the given position.
 *
 * @param {Object}
 *            vItem The item to insert.
 * @param {Integer}
 *            iIndex The index to insert the item into.
 * @return {Object} inserted
 */
Array.prototype.insertAt = function(vItem, iIndex) {
	this.splice(iIndex, 0, vItem);
	return vItem;
};
/**
 * Inserts an item into the array before the given item.
 *
 * @param {Object}
 *            vItem The item to insert.
 * @param {Object}
 *            vBeforeItem The item to insert before.
 * @return {Object} inserted
 */
Array.prototype.insertBefore = function(vItem, vBeforeItem) {
	return this.insertAt(vItem, this.indexOf(vBeforeItem));
};
/**
 * Returns the last index of the first occurrance in the array.
 *
 * @param {Object}
 *            vItem The item to locate in the array.
 * @param {Integer}
 *            [iStart] The index of the item to start at.
 * @param {Function}
 *            [isFunc] Function used to just the index of vItem.
 * @return {Integer} The last index of the item in the array if found or -1 if
 *         not found.
 */
Array.prototype.lastIndexOf = function(vItem, iStart, isFunc) {
	if (iStart == null || iStart >= this.length) {
		iStart = this.length - 1;
	}
	if ( typeof (isFunc) == "function") {
		for (var i = iStart; i >= 0; i--) {
			if (isFunc(this[i], vItem, i)) {
				return i;
			}
		}
	} else {
		for (var i = iStart; i >= 0; i--) {
			if (this[i] == vItem) {
				return i;
			}
		}
	}
	return -1;
};
/**
 * Runs a function on each item and returns an array.
 *
 * @param {Function}
 *            fnExec The function to run on each item.
 * @param {Object}
 *            [context] The object that the function belongs to or null for a
 *            global function.
 * @return {Array} An array made up of all the items that returned true for the
 *         function.
 */
Array.prototype.map = function(fnExec, context) {
	context = context || window;
	var aResult = new Array();
	for (var i = 0, len = this.length; i < len; i++) {
		aResult.push(fnExec.call(context, this[i], i, this));
	}
	return aResult;
};
/**
 * 对数组中所有对象提取给定的属性并组成一个数组
 *
 * @param {String}
 *            propName 要提取的属性名称
 * @return {Array}
 */
Array.prototype.pluck = function(propName) {
	var fnExec = function(vItem) {
		return vItem == null ? undefined : vItem[propName];
	};
	return this.map(fnExec);
};
/**
 * Removes the array item matching the given item.
 *
 * @param {Object}
 *            vItem the item to remove.
 * @param {Function}
 *            [isFunc] Function used to just the index of vItem.
 * @return {Object} The removed item.
 */
Array.prototype.remove = function(vItem, isFunc) {
	return this.removeAt(this.indexOf(vItem, null, isFunc));
};
/**
 * Removes the array item in the given position.
 *
 * @param {Integer}
 *            iIndex The index of the item to remove.
 * @return {Object} The removed item.
 */
Array.prototype.removeAt = function(iIndex) {
	var vItem = undefined;
	if (iIndex >= 0 && iIndex < this.length) {
		vItem = this[iIndex];
		this.splice(iIndex, 1);
	}
	return vItem;
};
/**
 * Runs a function on each item in the array and returns a result.
 *
 * @param {Function}
 *            fnTest The function to run on each value.
 * @param {Object}
 *            [context] The object that the function belongs to or null for a
 *            global function.
 * @param {Integer}
 *            [minCount] min count that returns true.
 * @return {Boolean} True if the function evaluates to true for some items(as
 *         minCount), false if not.
 */
Array.prototype.some = function(fnTest, context, minCount) {
	if ( typeof context == "number") {
		minCount = context || 1;
		context = window;
	} else {
		minCount = minCount || 1;
		context = context || window;
	}
	var found = 0;
	for (var i = 0, len = this.length; i < len; i++) {
		if (fnTest.call(context, this[i], i, this)) {
			found++;
			if (found >= minCount) {
				return true;
			}
		}
	}
	return false;
};
/**
 * Runs a function on each item in the array and returns a result if any true.
 *
 * @param {Function}
 *            fnTest The function to run on each value.
 * @param {Object}
 *            [context] The object that the function belongs to or null for a
 *            global function.
 * @return {Boolean} True if the function evaluates to true for any one item,
 *         false if not.
 */
Array.prototype.any = function(fnTest, context) {
	return this.some(fnTest, context, 1);
};
/**
 * Creates an array composed of the indicated items in the current array.
 *
 * @param {Integer}
 *            iStart The first item to copy.
 * @param {Integer}
 *            [iStop] The index after the last item to copy.
 * @return {Array} An array containing all items in the original array between
 *         the given indices.
 */
Array.prototype._slice = function(iStart, iStop) {
	iStop = iStop || this.length;
	var aResult = new Array();
	for (var i = iStart; i < iStop; i++) {
		aResult.push(this[i]);
	}
	return aResult;
};
/**
 * Removes the first item in the array and returns it.
 *
 * @return {Object} The first item in the array.
 */
Array.prototype._shift = function() {
	var vItem = undefined;
	if (this.length > 0) {
		vItem = this[0];
		this.splice(0, 1);
	}
	return vItem;
};
/**
 * Alters the array by removing specified items and inserting others.
 *
 * @param {Integer}
 *            iIndex The index at which to begin altering the array.
 * @param {Integer}
 *            iLength The number of items to remove.
 * @param {args...} []
 *            The items to insert in place of the removed items.
 * @return {Array} An array containing all removed items.
 */
Array.prototype._splice = function(iIndex, iLength) {
	var aResult = new Array();
	var aRemoved = new Array();
	//
	for (var i = 0; i < iIndex; i++) {
		aResult.push(this[i]);
	}
	for (var i = iIndex; i < iIndex + iLength; i++) {
		aRemoved.push(this[i]);
	}
	if (arguments.length > 2) {
		for (var i = 2; i < arguments.length; i++) {
			aResult.push(arguments[i]);
		}
	}
	for (var i = iIndex + iLength, len = this.length; i < len; i++) {
		aResult.push(this[i]);
	}
	for (var i = 0, len = aResult.length; i < len; i++) {
		this[i] = aResult[i];
	}
	this.length = aResult.length;
	//
	return aRemoved;
};
/**
 * Adds all the items in the array and returns the result.
 *
 * @param {Function}
 *            fnEval An optional function to run value on each item before
 *            adding.
 * @param {Object}
 *            context The object that the function belongs to or null for a
 *            global function.
 * @return {Object} The result of adding all of the array items together.
 */
Array.prototype.sum = function(fnEval, context) {
	context = context || window;
	var initVal = null;
	if ( typeof fnEval != "function") {
		fnEval = function(vItem) {
			return vItem;
		};
	} else {
		initVal = fnEval();
	}
	var result = initVal;
	var len = this.length;
	if (len > 0) {
		result = fnEval.call(context, this[0], 0, this);
		for (var i = 1; i < len; i++) {
			result += fnEval.call(context, this[i], i, this);
		}
	}
	return result;
};
/**
 * Places the given items at the beginning of the array.
 *
 * @param [args...]
 *            vItem[] Items to add into the
 */
Array.prototype._unshift = function() {
	var aArgs = new Array();
	for (var i = 0, len = arguments.length; i < len; i++) {
		aArgs.push("arguments[" + i + "]");
	}
	eval("this.splice(0,0," + aArgs.join(",") + ")");
};
/*
 * Assign the necessary methods.
 */
for (var i = 0, len = __arrayMethodsToCheck.length; i < len; i++) {
	var method = __arrayMethodsToCheck[i];
	if (Array.prototype[method] == null) {
		Array.prototype[method] = Array.prototype["_" + method];
	}
}
// JavaScript zArray Library end----------------------------------------------
/**
 * 对数组进行排序（可指定是否降序及比较函数） srcArray, compFunc(elA, elB), bDesc
 */
function sortArray() {
	var args = arguments;
	var xArray = args[0];
	if (!isArray(xArray)) {
		return xArray;
	}
	try {
		xArray = xArray.clone();
	} catch(ex) {
		//
	}
	var compFunc = null;
	var bDesc = false;
	if (args.length > 1) {
		if ( typeof args[1] == "boolean") {
			bDesc = args[1] == true;
			if (args.length > 2 && typeof args[2] == "function") {
				compFunc = args[2];
			}
		} else if ( typeof args[1] == "function") {
			compFunc = args[1];
			if (args.length > 2 && typeof args[2] == "boolean") {
				bDesc = args[2];
			}
		}
	}
	if (compFunc == null) {
		compFunc = function(elA, elB) {
			return elA == elB ? 0 : (elA < elB ? -1 : 1);
		};
	}
	var len = xArray.length;
	for (var i = 0; i < len - 1; i++) {
		var tmp = xArray[i];
		var indx = i;
		for (var j = i + 1; j < len; j++) {
			var tmp2 = xArray[j];
			var result = compFunc(tmp2, tmp);
			result = bDesc ? result > 0 : result < 0;
			if (result) {
				tmp = tmp2;
				indx = j;
			}
		}
		if (indx > i) {
			tmp2 = xArray[i];
			xArray[i] = tmp;
			xArray[indx] = tmp2;
		}
	}
	return xArray;
}

/**
 * 对数组进行排序（可指定是否降序及比较函数） compFunc(elA, elB), bDesc
 */
Array.prototype.sort = function() {
	var args = [this].concat(Array.prototype.slice.call(arguments, 0));
	return sortArray.apply(window, args);
};
/* 从给定的参数列表 生成一个新的数组 */
Array.from = function() {
	return Array.prototype.concat.apply([], arguments);
};
/**
 * 复制元素值或引用（从而返回一个新数组）
 */
function copyArray(srcArray) {
	var retArray = [];
	var len = srcArray.length;
	for (var i = 0; i < len; i++) {
		retArray[i] = srcArray[i];
	}
	return retArray;
}

// 声明名字空间
function declare(namespace) {
	if ( typeof namespace != "string") {
		return null;
	}
	namespace = namespace.trim();
	if (namespace == "") {
		return null;
	}
	var names = namespace.split(".");
	var ns = [];
	var nsName = "";
	for (var i = 0; i < names.length; i++) {
		ns[i] = names[i];
		nsName = ns.join(".");
		if (eval('(typeof ' + nsName + ' == "undefined")')) {
			if (i == 0) {
				eval("var " + nsName + " = window." + nsName + " = {};");
			} else {
				eval(nsName + " = {};");
			}
		}
	}
	return eval(nsName);
}

// 返回绑定后的代理（主要用于事件处理）
function makeProxy(fn, context) {
	if ( typeof context === "string") {
		var tmp = fn[context];
		context = fn;
		fn = tmp;
	}
	if (context == null) {
		context = window;
	}
	if (!isFunction(fn)) {
		return undefined;
	}
	var args = Array.prototype.slice.call(arguments, 2);
	var binded = function() {
		return fn.apply(context, args);
	};
	return binded;
}

// 判断某年是否为闰年
function isLeapYear(chkYear) {
	var theYear = null;
	if (isDate(chkYear)) {
		chkYear = chkYear.getFullYear();
	} else {
		theYear = ParseInt(chkYear);
	}
	if (!isNum(theYear)) {
		return false;
	}
	return (0 == theYear % 4 && ((theYear % 100 != 0) || (theYear % 400 == 0)));
}

// var __monthDaysAlgn = [01,02,03,04,05,06,07,08,09,10,11,12];
var __monthDaysNorm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __monthDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __weekDayChsNames = ["日", "一", "二", "三", "四", "五", "六"];
// 按逻辑月份算
function getYearMonthDays(year, month) {
	var leap = isLeapYear(year);
	var mnth = ParseInt(month);
	var monthDays = leap ? __monthDaysLeap : __monthDaysNorm;
	return monthDays[mnth - 1];
}

Date.prototype.format = function(format) {
	/* yyyy-MM-dd HH:mm:ss.SSS */
	if (format == null) {
		format = "yyyy-MM-dd";
	}
	var result = format.replace(/yyyy/, this.getFullYear());
	result = result.replace(/yy/, padLeft(this.getYear(), 2, "0"));
	//
	result = result.replace(/MM/, padLeft(this.getMonth() + 1, 2, "0"));
	result = result.replace(/M/, this.getMonth() + 1);
	//
	result = result.replace(/dd/, padLeft(this.getDate(), 2, "0"));
	result = result.replace(/d/, this.getDate());
	//
	result = result.replace(/HH/, padLeft(this.getHours(), 2, "0"));
	result = result.replace(/H/, this.getHours());
	//
	result = result.replace(/mm/, padLeft(this.getMinutes(), 2, "0"));
	result = result.replace(/m/, this.getMinutes());
	//
	result = result.replace(/ss/, padLeft(this.getSeconds(), 2, "0"));
	result = result.replace(/s/, this.getSeconds());
	//
	result = result.replace(/SSS/, padLeft(this.getMilliseconds(), 3, "0"));
	result = result.replace(/S/, this.getMilliseconds());
	//
	return result;
};

if (Date._parse == null) {
	Date._parse = Date.parse;
	//
	Date.parse = function(dateStr, strictMode) {
		if (!dateStr) {
			return null;
		}
		if (isDate(dateStr)) {
			return dateStr;
		}
		strictMode = strictMode === true;
		if (strictMode) {
			dateStr = dateStr.replace(/-/g, "/");
			return Date._parse(dateStr);
		} else {
			dateStr = dateStr.replace(/年/g, '-');
			dateStr = dateStr.replace(/月/g, '-');
			dateStr = dateStr.replace(/日/g, '');
			dateStr = dateStr.replace(/时/g, ':');
			dateStr = dateStr.replace(/点/g, ':');
			dateStr = dateStr.replace(/分/g, ':');
			dateStr = dateStr.replace(/秒/g, '');
			dateStr = dateStr.replace(/毫秒/g, '');
			dateStr = dateStr.replace(/\s{2,}/g, " ");
			dateStr = dateStr.replace(/-/g, "/");
			// 解析毫秒
			var msIndex = dateStr.indexOf(".");
			if (msIndex != -1) {
				var ms = parseInt(dateStr.substring(msIndex + 1));
				dateStr = dateStr.substring(0, msIndex);
				if (isNum(ms) && ms > 0) {
					return Date._parse(dateStr) + ms;
				} else {
					return Date._parse(dateStr);
				}
			} else {
				return Date._parse(dateStr);
			}
		}
	};
	//
	Date.parseAsDate = function(dateStr) {
		if (!dateStr) {
			return null;
		} else if (isDate(dateStr)) {
			return dateStr;
		} else if (isNum(dateStr)) {
			return new Date(dateStr);
		} else {
			return new Date(Date.parse(dateStr));
		}
	};
	//
	Date.isValidDate = function(dateStr) {
		if (isDate(dateStr)) {
			return true;
		}
		var result = Date.parse(dateStr, true);
		return result != null && !isNaN(result);
	};
};

Date.prototype.isLeapYear = function() {
	return isLeapYear(this.getFullYear());
};

Date.prototype.getMonthDays = function() {
	return getYearMonthDays(this.getFullYear(), this.getMonth() + 1);
};
// toStdDateStr
if (Date.prototype._toString == null) {
	Date.prototype._toString = Date.prototype.toString;
	Date.prototype.toString = function(format) {
		if ( typeof format == "undefined") {
			return this._toString();
		} else {
			return this.format(format);
		}
	};
}
//
Date.prototype.diff = function(that, part) {
	if (part == null) {
		part = "milliSecond";
	}
	var diffMs = this - that;
	switch (part.toLowerCase()) {
		case 'year':
			return this.getFullYear() - that.getFullYear();
		case 'month':
			return (this.getFullYear() - that.getFullYear()) * 12 + (this.getMonth() - that.getMonth());
		case 'day':
			return Math.floor(diffMs / 86400000);
		case 'hour':
			return Math.floor(diffMs / 3600000);
		case 'minute':
			return Math.floor(diffMs / 60000);
		case 'second':
			return Math.floor(diffMs / 1000);
		case 'week':
			return Math.floor(diffMs / 604800000);
		case 'quarter':
			return Math.ceil(this.diff(that, 'month') / 3);
		case 'millisecond':
			return diffMs;
		default:
			return null;
	}
};
// 返回某天是一年中的第几周(weekOfYear)
Date.prototype.getWeek = function() {
	var year1stDate = new Date(this.getFullYear(), 0, 1);
	var year1stDayOfWeek = year1stDate.getDay();
	var base = new Date(this.getFullYear(), this.getMonth(), this.getDate());
	var diffDays = base.diff(year1stDate, 'day');
	var diffWeeks = Math.floor(diffDays / 7);
	var leftDays = diffDays - diffWeeks * 7;
	return 1 + diffWeeks + Math.floor((year1stDayOfWeek + leftDays) / 7);
};
//
Date.prototype.asJSON = function() {
	var dt = {};
	dt.year = this.getFullYear();
	dt.month = this.getMonth() + 1;
	dt.day = this.getDate();
	dt.hour = this.getHours();
	dt.minute = this.getMinutes();
	dt.second = this.getSeconds();
	dt.milliSecond = this.getMilliseconds();
	dt.dayOfWeek = this.getDay();
	dt.weekOfYear = this.getWeek();
	dt.quarter = Math.ceil((this.getMonth() + 1) / 3);
	return dt;
};
//
Date.prototype.beginTime = function() {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
};
Date.prototype.endTime = function() {
	var tomorrow0 = this.addDays(1).beginTime();
	return new Date(tomorrow0.getTime() - 1);
};
//
Date.prototype.add = function(count, part) {
	if (part == null) {
		part = "milliSecond";
	}
	switch (part.toLowerCase()) {
		case 'year':
			var base = this.asJSON();
			base.year += count;
			return new Date(base.year, base.month - 1, base.day, base.hour, base.minute, base.second, base.milliSecond);
		case 'month':
			var base = this.asJSON();
			var year = Math.floor(count / 12);
			var month = count % 12;
			base.year += year;
			base.month += month;
			return new Date(base.year, base.month - 1, base.day, base.hour, base.minute, base.second, base.milliSecond);
		case 'day':
			return new Date(this.getTime() + 86400000 * count);
		case 'hour':
			return new Date(this.getTime() + 3600000 * count);
		case 'minute':
			return new Date(this.getTime() + 60000 * count);
		case 'second':
			return new Date(this.getTime() + 1000 * count);
		case 'week':
			return new Date(this.getTime() + 604800000 * count);
		case 'quarter':
			return this.add(count * 3, 'month');
		case 'millisecond':
			return new Date(this.getTime() + count);
		default:
			return null;
	}
};

Date.prototype.addYears = function(count) {
	return this.add(count, 'year');
};
Date.prototype.addMonths = function(count) {
	return this.add(count, 'month');
};
Date.prototype.addDays = function(count) {
	return this.add(count, 'day');
};
Date.prototype.addHours = function(count) {
	return this.add(count, 'hour');
};
Date.prototype.addMinutes = function(count) {
	return this.add(count, 'minute');
};
Date.prototype.addSeconds = function(count) {
	return this.add(count, 'second');
};
Date.prototype.addWeeks = function(count) {
	return this.add(count, 'week');
};
Date.prototype.addQuarters = function(count) {
	return this.add(count, 'quarter');
};
Date.prototype.getPart = function(part) {
	if (part == null) {
		part = "milliSecond";
	}
	switch (part.toLowerCase()) {
		case 'year':
			return this.getFullYear();
		case 'month':
			return this.getMonth() + 1;
		case 'day':
			return this.getDate();
		case 'hour':
			return this.getHours();
		case 'minute':
			return this.getMinutes();
		case 'second':
			return this.getSeconds();
		case 'millisecond':
			return this.getMilliseconds();
		case 'dayofweek':
			return this.getDay();
		case 'weekofyear':
			return this.getWeek();
		case 'quarter':
			return Math.ceil((this.getMonth() + 1) / 3);
		default:
			return null;
	}
};

//
function getObjAttr(_objToEval, attrName) {
	var tmpAttrName = escapeJsonStr(attrName);
	var evalStr = '( _objToEval["' + trim(tmpAttrName) + '"] )';
	// alert(evalStr);
	return eval(evalStr);
}

// ------------
var __isJSONDefined = typeof (JSON) !== "undefined" && (isFunction(JSON.parse) || isFunction(JSON.stringify));
// alert("JSON already defined ? "+__isJSONDefined);

function isJSONDefined() {
	__isJSONDefined = false;
	// force to use simple JSON object.(IGNORE browser built-in JSON)
	return __isJSONDefined;
}

//
if (!isJSONDefined()) {
	JSON = {};
}

function objFromJsonStr(jsonStr) {
	try {
		return eval('(' + jsonStr + ')');
	} catch (exp) {
		throw new TypeError("JSON parse error !");
	}
}

if (!isJSONDefined()) {//
	JSON.parse = objFromJsonStr;
};
if (isFunction(JSON.parse)) {
	JSON.decode = JSON.parse;
	//
	JSON.decodeStr = function(str) {
		return str == null ? null : decodeURIComponent(str);
	};
};

function objToJsonStr(obj) {
	var dblQuote = '"';
	var Callee = arguments.callee;
	if (obj == null || isNumber(obj) || isBoolean(obj)) {
		return obj;
	} else if (isString(obj)) {
		return dblQuote + escapeJsonStr(obj) + dblQuote;
	} else if (isDate(obj)) {
		return dblQuote + obj.format('yyyy-MM-dd HH:mm:ss') + dblQuote;
	} else if (isArray(obj)) {
		var count = obj.length;
		var elemStrs = new Array();
		for (var i = 0; i < count; i++) {
			elemStrs[i] = Callee(obj[i]);
		}
		return "[" + elemStrs.join(",") + "]";
	} else if ( typeof (obj.toJSON) == "function") {
		return obj.toJSON();
	} else// if(isPlainObject(obj)) //Strict Check ...
	{
		var attrStrs = new Array();
		var index = 0;
		var hasOwnProperty = Object.hasOwnProperty;
		for (var attr in obj) {
			if (hasOwnProperty.call(obj, attr)) {
				var value = obj[attr];
				attrStrs[index++] = Callee(attr) + ":" + Callee(value);
			}
		}
		return "{" + attrStrs.join(",") + "}";
	}
}

if (!isJSONDefined()) {//
	JSON.stringify = objToJsonStr;
};
if (isFunction(JSON.stringify)) {
	JSON.encode = JSON.stringify;
	//
	JSON.encodeStr = function(str) {
		return str == null ? null : encodeURIComponent(str);
	};
};

/**
 * @class convenient hashmap for key/value pair operations
 * @param {String}
 *            [name] keymap name (for debug usage)
 * @constructor
 */
function KeyMap(name) {
	this.name = "";
	if (name != null) {
		this.name = "" + name;
	}
	/**
	 * @private inner store object
	 */
	var __data = {};
	/**
	 * clear all key/value pairs
	 */
	this.clear = function() {
		__data = {};
		//
		return this;
	};
	//
	this.from = function(json) {
		if (json == null) {
			json = {};
		}
		__data = json;
		//
		return this;
	};
	/**
	 * save key/value pair
	 *
	 * @param {String}
	 *            key (NOTE, key string will be trimmed before saving)
	 * @param {Object}
	 *            value
	 */
	this.set = function(key, value) {
		__data[key] = value;
		//
		return this;
	};
	/**
	 * return value by given key
	 *
	 * @param {String}
	 *            key the key of the key/value pair of which the value is to be
	 *            retrieve
	 * @returns {Object} the value
	 */
	this.get = function(key) {
		return __data[key];
	};
	/**
	 * check whether contains the given key
	 *
	 * @param {String}
	 *            key
	 * @returns {Boolean}
	 */
	this.contains = function(key) {
		return typeof __data[key] != "undefined";
	};
	/**
	 * like {@link KeyMap#set} except that will not overwrite existing key/value
	 * pair with the same key
	 *
	 * @param {String}
	 *            key
	 * @param {Object}
	 *            value
	 * @returns {Boolean} whether added successfully
	 */
	this.add = function(key, value) {
		if (!this.contains(key)) {
			__data[key] = value;
			return true;
		}
		return false;
	};
	/**
	 * remove the key/value pair by given key
	 *
	 * @param {String}
	 *            key
	 * @returns {Object} the removed value (or null if not exist)
	 */
	this.remove = function(key) {
		if (this.contains(key)) {
			var retValue = __data[key];
			delete __data[key];
			return retValue;
		}
		return undefined;
	};
	/**
	 * return all the current keys
	 *
	 * @returns {Array} all the current keys
	 */
	this.keys = function() {
		var retKeys = [];
		var keyCount = retKeys.length;
		for (var xKey in __data) {
			retKeys[keyCount++] = xKey;
		}
		return retKeys;
	};
	/**
	 * return the count of current items
	 *
	 * @returns {Number}
	 */
	this.size = function() {
		var retSize = 0;
		for (xKey in __data) {
			retSize++;
		}
		return retSize;
	};
	/**
	 * clone current key/value pairs to a newly created {@link #KeyMap } object
	 *
	 * @param {String}
	 *            [newName] new keymap name
	 */
	this.clone = function(newName) {
		var newKeyMap = new KeyMap(newName);
		var _keys = this.keys();
		var _count = _keys.length;
		for (var i = 0; i < _count; i++) {
			var tmpKey = _keys[i];
			newKeyMap.set(tmpKey, this.get(tmpKey));
		}
		return newKeyMap;
	};
	//
	this.reverse = function() {
		var __dataNew = {};
		var _keys = this.keys();
		for (var i = 0, j = _keys.length - 1; j >= 0; i++, j--) {
			var key = _keys[j];
			__dataNew[key] = __data[key];
		}
		__data = __dataNew;
		//
		return this;
	};
	//
	this.toObject = function() {
		return merge({}, __data);
	};
	/**
	 * json-style toString
	 *
	 * @param {Boolean}
	 *            outputNull whether to output null value items
	 * @returns {String} json string representing current key/value info
	 */
	this.toJSON = function() {
		var _keys = this.keys();
		var _keysCount = _keys.length;
		var itemStrArray = new Array();
		var itemStrCount = 0;
		for (var i = 0; i < _keysCount; i++) {
			var tmpKey = _keys[i];
			var tmpValue = this.get(tmpKey);
			itemStrArray[itemStrCount++] = JSON.stringify(tmpKey + "") + ":" + JSON.stringify(tmpValue);
		}
		return "{" + itemStrArray.join(",") + "}";
	};
	//
	this.toString = this.toJSON;
}

KeyMap.newOne = function() {
	return new KeyMap();
};
// 静态方法，从给定的json对象包装出一个KeyMap对象
KeyMap.from = function(json) {
	var keyMap = KeyMap.newOne();
	keyMap.from(json);
	return keyMap;
};
//
function merge(original, overwrite) {
	original = original || {};
	overwrite = overwrite || {};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	for (var key in overwrite) {
		if (hasOwnProperty.call(overwrite, key)) {
			var value = overwrite[key];
			if (isPlainObject(value)) {
				var orgVal = original[key] || {};
				original[key] = merge(orgVal, value);
			} else {
				original[key] = value;
			}
		}
	}
	return original;
}

// 把json数据拆分成(key, value, jsonData)对传递给 keyValSetter 回调函数供其使用
function syncDataBy(jsonData, keyValSetter) {
	if (jsonData == null || typeof keyValSetter != "function") {
		return;
	}
	var hasOwnProperty = Object.hasOwnProperty;
	for (var key in jsonData) {
		if (hasOwnProperty.call(jsonData, key)) {
			try {
				keyValSetter(key, jsonData[key], jsonData);
			} catch (ex) {
				//
			}
		}
	}
}

/**
 * 比较两个数组，得到 theArray 相对于 refArray 的变化结果：</br> more : 多出的元素列表</br> less :
 * 减少的元素列表</br> same : 一样的的元素列表（根据eqlFunc判断）</br> different :
 * 不同的元素列表（根据eqlFunc判断）</br>
 * ==========================================================
 * 参数中的eqlFunc主要用于判断两个元素是否一样（如判断两条记录是否一样：无变化）</br>
 * 参数中的isFunc主要用于判断两个数组中的对等元素（如判断两条记录的id值是否相等）</br>
 */
function compareArrays(theArray, refArray, eqlFunc, isFunc) {
	var result = {
		more : [],
		less : [],
		same : [],
		different : []
	};
	if (refArray == null) {
		refArray = [];
	}
	if (theArray == null) {
		theArray = [];
	}
	var refCount = refArray.length;
	var theCount = theArray.length;
	if (refCount == 0) {
		result.more = theArray;
	} else if (theCount == 0) {
		result.less = refArray;
	} else {
		if ( typeof (eqlFunc) != "function") {
			eqlFunc = function(A, B) {
				return A == B;
			};
		}
		//
		theArray = copyArray(theArray);
		refArray = copyArray(refArray);
		var more = result.more;
		var less = result.less;
		var same = result.same;
		var different = result.different;
		for (var i = refCount - 1, j = theCount - 1; i >= 0 || j >= 0; ) {
			var refObj = i >= 0 ? refArray[i] : undefined;
			var theObj = j >= 0 ? theArray[j] : undefined;
			if (i >= 0) {
				var theIndex = theArray.indexOf(refObj, null, isFunc);
				if (theIndex != -1) {
					theObj = theArray[theIndex];
					if (eqlFunc(theObj, refObj)) {
						same[same.length] = theObj;
					} else {
						different[different.length] = theObj;
					}
					theArray.removeAt(theIndex);
					refArray.removeAt(i);
					i--;
					j--;
				} else {
					less[less.length] = refObj;
					refArray.removeAt(i);
					i--;
				}
			} else {
				more[more.length] = theObj;
				theArray.removeAt(j);
				j--;
			}
		}
	}
	result.more = result.more.reverse();
	result.less = result.less.reverse();
	result.same = result.same.reverse();
	result.different = result.different.reverse();
	return result;
}

/**
 * 比较两个记录组成的（数组）列表，得到 newRecords 相对于 oldRecords 的变化结果：</br> added : 新添加 的记录列表</br>
 * deleted : 新删除 的记录列表</br> modified : 新修改 的记录列表（根据recEqlFunc判断）</br>
 * ========================================================================
 * idColNameOrIdEqlFunc : id列名称 或 判断两条记录是否相等的函数（对复合键比较有用），<br/>
 * 已经提供了默认的根据给定的id列名称进行比较的函数）<br/> recEqlFunc : 判断两条记录是否相等（无变化）的函数，<br/>
 * 已经提供了默认的判断两条记录相等比较的函数）<br/>
 */
function compareRecordsById(newRecords, oldRecords, idColNameOrIdEqlFunc, recEqlFunc) {
	var idEqlFunc = null;
	if ( typeof (idColNameOrIdEqlFunc) == "function") {
		idEqlFunc = idColNameOrIdEqlFunc;
	} else {
		var idColName = idColNameOrIdEqlFunc;
		if ( typeof (idColName) == "string") {
			if (( idColName = idColName.trim()) == "") {
				idColName = "id";
			}
		} else {
			idColName = "id";
		}
		idEqlFunc = function(record1, record2) {
			// 按 idColName 标识两个列表中的同一条记录
			if (record1 == record2) {
				return true;
			} else if (record1 != null && record2 != null) {
				return record1[idColName] == record2[idColName];
			} else {
				return false;
			}
		};
	}
	//
	// var hasOwnProperty = Object.hasOwnProperty;
	if ( typeof (recEqlFunc) != "function") {
		recEqlFunc = function(record1, record2) {
			// 按列值完全比较
			if (record1 == record2) {
				return true;
			} else if (record1 != null && record2 != null) {
				for (var colName in record1) {
					// if(hasOwnProperty.call(record1, colName)) {
					if (record1[colName] != record2[colName]) {
						return false;
					}
					// }
				}
				for (var colName in record2) {
					// if(hasOwnProperty.call(record2, colName)) {
					if (record1[colName] != record2[colName]) {
						return false;
					}
					// }
				}
				return true;
			} else {
				return false;
			}
		};
	}
	//
	var _result = compareArrays(newRecords, oldRecords, recEqlFunc, idEqlFunc);
	//
	delete _result["same"];
	var result = {
		added : _result.more,
		deleted : _result.less,
		modified : _result.different
	};
	return result;
}

/**
 * 按指定的方向（where）移动指定数组(xArray)中指定索引位置(indices数组) 的元素
 * where : first, prev, next, last
 * 返回索引位置信息数组[{old : x, new : y}, ...]
 */
function moveArrayElementsAt(xArray, indices, where) {
	xArray = xArray || [];
	var len = xArray.length;
	if (len <= 1) {
		return null;
	}
	indices = indices || [];
	//console.log(">> 1 :: " + indices);
	indices = indices.sort();
	//console.log(">> 2 :: " + indices);
	if (indices.length == 0) {
		return null;
	}
	var minIndex = indices[0];
	if (minIndex == 0 && (where == "first" || where == "prev")) {
		return null;
	}
	var maxIndex = indices[indices.length - 1];
	if (maxIndex == (len - 1) && (where == "last" || where == "next")) {
		return null;
	}
	var offset = -1;
	if (where == "first") {
		offset = 0 - minIndex;
	} else if (where == "prev") {
		offset = -1;
	} else if (where == "next") {
		offset = 1;
	} else if (where == "last") {
		offset = (len - 1) - maxIndex;
	} else {
		return null;
	}
	//
	var tmpArray = [];
	for (var i = 0; i < len; i++) {
		tmpArray[i] = xArray[i];
	}
	//
	xArray.clear();
	//
	var indexChanges = [];
	for (var i = 0; i < indices.length; i++) {
		var index = indices[i];
		var indexNew = index + offset;
		xArray[indexNew] = tmpArray[index];
		indexChanges[i] = {
			"old" : index,
			"new" : indexNew
		};
	}
	//
	for (var i = 0, j = 0; i < len; i++) {
		var newElem = xArray[i];
		if ( typeof newElem == "undefined") {
			while (true) {
				if (indices.indexOf(j) == -1) {
					break;
				}
				j++;
			}
			xArray[i] = tmpArray[j++];
		}
	}
	return indexChanges;
}

//
function getClassOf(obj) {
	if (obj == null) {
		return null;
	}
	if (isFunction(obj)) {
		return Function;
	} else {
		return obj.constructor;
	}
}

function getFuncName(func) {
	if (!isFunction(func)) {
		return null;
	}
	var funcDeclRegExp = /^function(\s)+([\w\$]+?(\s)*\()/i;
	var funcStr = func.toString().trim();
	var funcDeclParts = funcStr.match(funcDeclRegExp);
	if (funcDeclParts != null && funcDeclParts.length > 0) {
		// alert(funcDeclParts.join("\n---\n"));
		var funcDecl = funcDeclParts[0].trim();
		var funcName = funcDecl.substring(8, funcDecl.length - 1);
		funcName = funcName.trim();
		// alert('"'+funcName+'"');
		return funcName;
	}
	return null;
}

function getClassNameOf(obj) {
	var objClass = getClassOf(obj);
	return objClass == null ? null : getFuncName(objClass);
}

function createFrom(obj, argx) {
	if (obj == null) {
		return undefined;
	}
	var objClass = null;
	if (!isFunction(obj)) {
		objClass = getClassOf(obj);
	} else {
		objClass = obj;
	}
	var args = arguments;
	var argCount = args.length;
	if (argCount > 1) {
		var paramStrs = new Array();
		for (var i = 0; i < argCount - 1; i++) {
			paramStrs[i] = "args[" + (i + 1) + "]";
		}
		var evalStr = "new objClass(" + paramStrs.join(", ") + ")";
		return eval(evalStr);
	} else {
		return new objClass();
	}
}

/**
 * 是否金额数字
 *
 * @param numStr
 * @param allowSign
 * @return
 */
function isMoneyStr(numStr, allowSign) {
	if (numStr == null) {
		return false;
	}
	numStr = "" + numStr;
	allowSign = allowSign == true;
	var moneyRegexp = allowSign ? /^(\+|-)?([0-9]|[1-9][0-9]*)(\.\d+)?$/ig : /^([0-9]|[1-9][0-9]*)(\.\d+)?$/ig;
	var matchStrs = numStr.match(moneyRegexp);
	return matchStrs != null && matchStrs.length == 1;
}

// 是否自然数
function isNatualStr(numStr) {
	if (numStr == null) {
		return false;
	}
	numStr = "" + numStr;
	var numRegexp = /^([0-9]|[1-9][0-9]*)$/ig;
	var matchStrs = numStr.match(numRegexp);
	return matchStrs != null && matchStrs.length == 1;
}

//
function isValidEmail(checkStr) {
	var regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return regExp.test(checkStr);
}

function isDigitsStr(checkStr) {
	var regExp = /^(\d)+$/;
	return regExp.test(checkStr);
}

function isDigitsOrHyphenStr(checkStr) {
	var regExp = /^(\d|-)+$/;
	return regExp.test(checkStr);
}

function isMobile(checkStr) {
	if (checkStr == null || checkStr.length != 11) {
		return false;
	}
	var regExp = /^1[3|4|5|7|8]\d{9}$/;
	return regExp.test(checkStr);
}

function isTelNo(checkStr) {
	if (checkStr == null || checkStr.length < 7) {
		return false;
	}
	var regExp = /(^([0][1-9][0-9]-?)?[0-9]{8}$)|(^([0][1-9]{3}-?)?[0-9]{7}$)/;
	return regExp.test(checkStr);
}

function isPhoneNumber(checkStr) {
	return isMobile(checkStr) || isTelNo(checkStr);
}

function isHexColor(checkStr) {
	if (checkStr == null || checkStr.length < 4) {
		return false;
	}
	var regExp = /^#[0-9a-fA-F]{3,6}$/;
	return regExp.test(checkStr);
}

//
function checkPassword(chkStr, strict) {
	if ( typeof chkStr != "string") {
		return "密码必须为字符串";
	}
	if (!/^[a-zA-Z_0-9]{6,16}$/ig.test(chkStr)) {
		return "密码必须为6~16位由字母、数字和下划线组成的字符串";
	}
	//
	strict = strict === true;
	if (strict) {
		if (/^[a-zA-Z]+$/ig.test(chkStr) || /^[0-9]+$/ig.test(chkStr)) {
			return "密码不能为纯字母或纯数字";
		}
	}
	return null;
}

// ------------------------- 浏览器页面专用 -------------------------
console = console || {
	log : function() {
		//do nothing
	}
};

//
function getById(id) {
	return document.getElementById(id);
}

//
function getServerBase(docLoc) {
	if ( typeof docLoc == "undefined") {
		docLoc = window.document.URL;
	}
	var slashIndex = docLoc.indexOf("://") + 3;
	slashIndex = docLoc.indexOf("/", slashIndex);
	return docLoc.substring(0, slashIndex);
}

//WebSocket
function getWebSocket() {
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	return window.WebSocket;
}

// 设置页面标题
function setPageTitle(docTitle) {
	document.title = docTitle;
}

// 更换页面url
function setPageUrl(url) {
	window.location.href = url;
}

/**
 * 重复（事件）检查类 __RepeatChecker.isValidFor("log") <br/>
 * __RepeatChecker.isValidFor("log", 1000)
 */
function __RepeatChecker() {
	var defaultInterval = 1000;
	var cachedCodeTimeMap = {};
	/**
	 * @Param {String}
	 *            uniqueCode 事件表示码
	 * @Param {int}
	 *            [interval=1000] 最小毫秒间隔
	 */
	this.isValidFor = function(uniqueCode, interval) {
		var curTime = new Date().getTime();
		var lastTime = cachedCodeTimeMap[uniqueCode];
		cachedCodeTimeMap[uniqueCode] = curTime;
		if (lastTime == null) {
			return true;
		} else {
			if ( typeof interval == "undefined") {
				interval = defaultInterval;
			}
			return curTime - lastTime >= interval;
		}
	};
}

// 全局预定义对象
var repeatChecker = new __RepeatChecker();
//
// 任务延迟器（防止任务频繁执行）
function TaskDelayer() {
	var _taskTimer = null;
	this.delay = function(taskFunc, delayTime) {
		clearTimeout(_taskTimer);
		//
		_taskTimer = setTimeout(taskFunc, delayTime);
	};
	this.cancel = function() {
		clearTimeout(_taskTimer);
	};
}

TaskDelayer.newOne = function() {
	return new TaskDelayer();
};

// ------------------------------------------------------------------
//
/**
 * 获取iframe所在的宿主窗口，如果没有宿主窗口将返回null
 */
var __cachedHostWin;
function getHostWindow() {
	if ( typeof __cachedHostWin == "undefined") {
		var hostWin = window.parent;
		if (hostWin != null && hostWin != window) {
			__cachedHostWin = hostWin.window;
		} else {
			__cachedHostWin = null;
		}
	}
	return __cachedHostWin;
}

/**
 * 判断当前页面是否有（内嵌在）宿主窗口
 *
 * @return {Boolean}
 */
function hasHostWindow() {
	return getHostWindow() !== null;
}

function getFrameWindow() {
	if (hasHostWindow()) {
		return window.frameElement;
	} else {
		return null;
	}
}

/**
 * 调用宿主窗口的函数，可传递参数<br>
 * 如：callHostFunc('test', a,b)，将执行宿主窗口的 test(a,b)
 *
 * @param {String}
 *            callback function
 */
function callHostFunc(callback) {
	var hostWin = getHostWindow();
	if (hostWin != null) {
		var callbackFunc = callback;
		if ( typeof callback == "string") {
			callbackFunc = hostWin[callback];
		}
		if ( typeof callbackFunc == "function") {
			var argCount = arguments.length;
			var args = argCount > 1 ? Array.prototype.slice.call(arguments, 1) : [];
			callbackFunc.apply(hostWin, args);
		}
	}
}

/**
 * 显馈窗口信息
 */
function __echoWindowInfo() {
	var title = window.document.title;
	var href = window.location.href;
	alert("[" + title + "]\n" + href);
}

/**
 * 显示宿主窗口信息（供调试用）
 */
function echoHostWindow() {
	callHostFunc(__echoWindowInfo);
}

// 给页面定个名字
var __pageName = null;
function setPageName(pageName) {
	__pageName = pageName;
}

function getPageName() {
	return __pageName || document.title;
}

/**
 * @param url
 * @returns {json: scheme, host, port, uri, params}
 */
function parseUrl(url) {
	if ( typeof url == "undefined") {
		url = window.document.URL;
	}
	var result = {};
	var colonIndex = url.indexOf("://");
	result.scheme = url.substring(0, colonIndex);
	//
	var slashIndex1 = colonIndex + 3;
	var slashIndex2 = url.indexOf("/", slashIndex1);
	var serverPart = url.substring(slashIndex1, slashIndex2);
	var portIndex = serverPart.indexOf(":");
	result.host = portIndex != -1 ? serverPart.substring(0, portIndex) : serverPart;
	result.port = portIndex != -1 ? parseInt(serverPart.substring(portIndex + 1)) : 80;
	var remainUrl = url.substring(slashIndex2);
	var fragIndex = remainUrl.indexOf("#");
	if (fragIndex != -1) {
		result.frags = {};
		var fragStr = remainUrl.substring(fragIndex).replace(/^[^#]*#?(.*)$/, '$1').trim();
		if (fragStr != "") {
			var frags = fragStr.split("&");
			for (var i = 0, j = frags.length; i < j; i++) {
				var nameValue = frags[i].split("=");
				result.frags[nameValue[0]] = nameValue[1];
			}
		}
		//
		remainUrl = remainUrl.substring(0, fragIndex);
	}
	//
	var flagStart = remainUrl.indexOf("?");
	result.uri = flagStart == -1 ? remainUrl : remainUrl.substring(0, flagStart);
	var paramStart = flagStart == -1 ? -1 : flagStart + 1;
	//
	result.params = {};
	if (paramStart != -1) {
		var paramStr = remainUrl.substring(paramStart).trim();
		var params = paramStr.length > 0 ? paramStr.split("&") : [];

		for (var i = 0, j = params.length; i < j; i++) {
			var nameValue = params[i].split("=");
			result.params[nameValue[0]] = nameValue[1];
		}
	}
	// alert(JSON.encode(result));
	return result;
}

// extractUrlParams("url") => {json};
function extractUrlParams(url) {
	return parseUrl(url).params;
}

/**
 * 把参数map对象追加到baseUrl后，形成新的url
 */
function concatUrlParams(baseUrl, params, toEncode) {
	if (params == null) {
		return baseUrl;
	}
	var fragStr = null;
	var fragIndex = baseUrl.indexOf("#");
	if (fragIndex != -1) {
		fragStr = baseUrl.substring(fragIndex).replace(/^[^#]*#?(.*)$/, '$1').trim();
		fragStr = fragStr == "" ? null : fragStr;
		baseUrl = baseUrl.substring(0, fragIndex);
	}
	toEncode = toEncode === true;
	var appendStr = "";
	if ( typeof params == "string") {
		appendStr = params;
	} else {
		var hasOwnProperty = Object.hasOwnProperty;
		var paramStrs = new Array();
		var index = 0;
		for (var attr in params) {
			if (hasOwnProperty.call(params, attr)) {
				var value = params[attr];
				if ( typeof value == "function") {
					value = value();
				}
				if (value == null) {
					continue;
				}
				if (isArray(value)) {
					var len = value.length;
					for (var i = 0; i < len; i++) {
						if (toEncode) {
							paramStrs[index++] = encodeURIComponent(attr) + "=" + encodeURIComponent(value[i]);
						} else {
							paramStrs[index++] = attr + "=" + value[i];
						}
					}
				} else {
					if (isDate(value)) {
						value = value.format('yyyy-MM-dd HH:mm:ss');
					} else if (isPlainObject(value)) {
						value = JSON.encode(value);
					}
					if (toEncode) {
						paramStrs[index++] = encodeURIComponent(attr) + "=" + encodeURIComponent(value);
					} else {
						paramStrs[index++] = attr + "=" + value;
					}
				}
			}
		}
		appendStr = paramStrs.join("&");
	}
	var cntStr = "";
	if (baseUrl == null) {
		baseUrl = "";
	} else if (baseUrl.indexOf("?") == -1) {
		cntStr = "?";
	} else if (!baseUrl.endsWith("?")) {
		cntStr = "&";
	}
	return baseUrl + cntStr + appendStr + (fragStr == null ? "" : "#" + fragStr);
}

function makeUrl() {
	return concatUrlParams.apply(window, arguments);
}

// json参数转成url参数
function jsonToUrlParams(jsonParams, toEncode) {
	return concatUrlParams(null, jsonParams, toEncode);
}

// 生成唯一的请求字符串参数（不慎严密）
var __uniqueRequestName = "__Unique_Request_Id";
//
function genUniqueStr() {
	var ts = new Number(new Date());
	var randomSuffix = Math.round(Math.random() * 10000) + "_" + Math.round(Math.random() * 10000);
	return ts + "_" + randomSuffix;
}

// 给url附加唯一的参数（防止对话框缓存）
function makeUniqueRequest(url) {
	return concatUrlParams(url, __uniqueRequestName + "=" + genUniqueStr());
}

// 打开模态对话框
var __screenWidth = window.screen.availWidth;
var __screenHeight = window.screen.availHeight;
//
function __showDlgBase(sURL, vArgs, vFeatures, bModal, bUnique) {
	var winDlgFunc = bModal ? window.showModalDialog : window.showModelessDialog;
	if (!winDlgFunc) {
		alert("您的浏览器不支持" + ( bModal ? "模态对话框[showModalDialog]" : "非模态对话框[showModelessDialog]") + "，请使用支持 模态对话框 的浏览器！");
		return null;
	}
	if ( typeof (vArgs) == 'undefined' || vArgs == null) {
		vArgs = window;
	}
	var dlgFeatures = {};
	if ( typeof (vFeatures) == 'undefined' || vFeatures == null) {
		vFeatures = {};
	}
	var tmpVal = null;
	if (( tmpVal = vFeatures["width"]) != null) {
		tmpVal = parseInt(tmpVal);
		tmpVal = !isNum(tmpVal) || tmpVal <= 0 ? 600 : tmpVal;
		if (tmpVal > __screenWidth) {
			tmpVal = __screenWidth;
		}
		dlgFeatures["width"] = tmpVal;
	} else {
		dlgFeatures["width"] = 800;
	}
	if (( tmpVal = vFeatures["height"]) != null) {
		tmpVal = parseInt(tmpVal);
		tmpVal = !isNum(tmpVal) || tmpVal <= 0 ? 400 : tmpVal;
		if (tmpVal > __screenHeight) {
			tmpVal = __screenHeight;
		}
		dlgFeatures["height"] = tmpVal;
	} else {
		dlgFeatures["height"] = 600;
	}
	if (( tmpVal = vFeatures["center"]) != null) {
		dlgFeatures["center"] = tmpVal != false;
	} else {
		dlgFeatures["center"] = true;
	}
	if (( tmpVal = vFeatures["scrollbars"]) != null) {
		dlgFeatures["scrollbars"] = tmpVal != true;
	} else {
		dlgFeatures["scrollbars"] = false;
	}
	if (( tmpVal = vFeatures["status"]) != null) {
		dlgFeatures["status"] = tmpVal != true;
	} else {
		dlgFeatures["status"] = false;
	}
	if (( tmpVal = vFeatures["resizable"]) != null) {
		dlgFeatures["resizable"] = tmpVal != false;
	} else {
		dlgFeatures["resizable"] = true;
	}
	if (( tmpVal = vFeatures["maximized"]) != null) {
		dlgFeatures["maximized"] = tmpVal != true;
	} else {
		dlgFeatures["maximized"] = false;
	}
	if (dlgFeatures["maximized"] == true) {
		dlgFeatures["left"] = 0;
		dlgFeatures["top"] = 0;
		dlgFeatures["width"] = __screenWidth;
		dlgFeatures["height"] = __screenHeight;
	} else if (dlgFeatures["center"] == true) {
		var left = (__screenWidth - dlgFeatures["width"]) / 2;
		dlgFeatures["left"] = left;
		var top = (__screenHeight - dlgFeatures["height"]) / 2;
		if (top < 0) {
			top = 0;
		}
		dlgFeatures["top"] = top;
	}
	//
	dlgFeatures["help"] = false;
	//
	var sFeatures = '';
	sFeatures += 'help' + ':' + (dlgFeatures["help"] ? 'yes' : 'no') + ';';
	sFeatures += 'dialogLeft' + ':' + dlgFeatures["left"] + 'px' + ';';
	sFeatures += 'dialogTop' + ':' + dlgFeatures["top"] + 'px' + ';';
	sFeatures += 'dialogWidth' + ':' + dlgFeatures["width"] + 'px' + ';';
	sFeatures += 'dialogHeight' + ':' + dlgFeatures["height"] + 'px' + ';';
	sFeatures += 'center' + ':' + (dlgFeatures["center"] ? 'yes' : 'no') + ';';
	sFeatures += 'status' + ':' + (dlgFeatures["status"] ? 'yes' : 'no') + ';';
	sFeatures += 'scrollbars' + ':' + (dlgFeatures["scrollbars"] ? 'yes' : 'no') + ';';
	sFeatures += 'resizable' + ':' + (dlgFeatures["resizable"] ? 'yes' : 'no');
	//
	// alert(sFeatures);
	bUnique = !(bUnique == false);
	if (bUnique) {
		sURL = makeUniqueRequest(sURL);
	}
	return winDlgFunc(sURL, vArgs, sFeatures);
}

/**
 * 模态对话框， 返回值为对话框页面所设置的 window.returnValue doBeforeDlgOpen
 */
function showModalDlg(sURL, vArgs, vFeatures, fnBeforeOpen, bUnique) {
	if ( typeof fnBeforeOpen == "boolean") {
		bUnique = fnBeforeOpen;
		fnBeforeOpen = null;
	}
	if (fnBeforeOpen == null && typeof doBeforeDlgOpen == "function") {
		fnBeforeOpen = doBeforeDlgOpen;
	}
	if (fnBeforeOpen != null && typeof fnBeforeOpen == "function") {
		fnBeforeOpen.call(window);
	}
	return __showDlgBase(sURL, vArgs, vFeatures, true, bUnique);
}

/**
 * 非模态对话框， 返回值为对话框窗口(window)的引用 doBeforeDlgOpen
 */
function showModelessDlg(sURL, vArgs, vFeatures, fnBeforeOpen, bUnique) {
	if ( typeof fnBeforeOpen == "boolean") {
		bUnique = fnBeforeOpen;
		fnBeforeOpen = null;
	}
	if (fnBeforeOpen == null && typeof doBeforeDlgOpen == "function") {
		fnBeforeOpen = doBeforeDlgOpen;
	}
	if (fnBeforeOpen != null && typeof fnBeforeOpen == "function") {
		try {
			fnBeforeOpen.call(window);
		} catch (ex) {
			// just ignore
		}
	}
	return __showDlgBase(sURL, vArgs, vFeatures, false, bUnique);
}

// doAfterDlgOpen
if ( typeof window.dialogArguments != "undefined" && typeof doAfterDlgOpen == "function") {
	try {
		doAfterDlgOpen.call(window);
	} catch (ex) {
		// just ignore
	}
}

// ----------
/**
 * Javascript open window http://www.webtoolkit.info/
 */
function openWindow(pageUrl, options) {
	var args = '';
	if ( typeof (options) == 'undefined') {
		var options = new Object();
	}
	if ( typeof (options.name) == 'undefined') {
		options.name = 'win' + Math.round(Math.random() * 100000);
	}
	if ( typeof (options.height) != 'undefined' && typeof (options.fullscreen) == 'undefined') {
		args += "height=" + options.height + ",";
	}
	if ( typeof (options.width) != 'undefined' && typeof (options.fullscreen) == 'undefined') {
		args += "width=" + options.width + ",";
	}
	if ( typeof (options.fullscreen) != 'undefined') {
		args += "width=" + screen.availWidth + ",";
		args += "height=" + screen.availHeight + ",";
	}
	if ( typeof (options.center) == 'undefined') {
		options.x = 0;
		options.y = 0;
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}
	if ( typeof (options.center) != 'undefined' && typeof (options.fullscreen) == 'undefined') {
		options.y = Math.floor((screen.availHeight - (options.height || screen.height)) / 2) - (screen.height - screen.availHeight);
		options.x = Math.floor((screen.availWidth - (options.width || screen.width)) / 2) - (screen.width - screen.availWidth);
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}
	if ( typeof (options.scrollbars) != 'undefined') {
		args += "scrollbars=1,";
	}
	if ( typeof (options.menubar) != 'undefined') {
		args += "menubar=1,";
	}
	if ( typeof (options.locationbar) != 'undefined') {
		args += "location=1,";
	}
	if ( typeof (options.resizable) != 'undefined') {
		args += "resizable=1,";
	}

	return window.open(pageUrl, options.name, args);
}

// ----------

// 关闭当前页面窗口
function closePageWindow() {
	window.opener = null;
	window.open("", "_self");
	window.close();
}

// 判断表单输入框是否为可编辑状态
function isEditable(input) {
	if (isString(input)) {
		input = document.getElementById(input);
	}
	return input != null && !input.readOnly && !input.disabled;
}

// 多选Select列表双向移动
function shiftSelItems(fromSelId, toSelId) {
	var selFrom = fromSelId;
	if ( typeof (fromSelId) == "string") {
		selFrom = document.getElementById(fromSelId);
	}
	var selTo = toSelId;
	if ( typeof (toSelId) == "string") {
		selTo = document.getElementById(toSelId);
	}
	var optionsFrom = selFrom.options;
	var optionsTo = selTo.options;
	for (var i = optionsFrom.length - 1; i >= 0; i--) {
		var tmpOption = optionsFrom[i];
		if (tmpOption.selected) {
			optionsTo[optionsTo.length] = new Option(tmpOption.text, tmpOption.value);
			tmpOption.parentNode.removeChild(tmpOption);
		}
	}
}

// 获取给定表单中给定名字的控件列表
function getFormElementsByName(formId, elName) {
	var theForm = null;
	if (formId == null) {
		return null;
	} else {
		theForm = formId;
		if ( typeof (formId) == "string") {
			theForm = document.getElementById(formId);
		}
		if (theForm.tagName != "FORM") {
			return null;
		}
	}
	var retElems = [];
	var elems = copyArray(theForm.elements);
	var elemCount = elems.length;
	for (var i = 0, j = 0; i < elemCount; i++) {
		var elem = elems[i];
		if (elem != null && elem.name == elName) {
			retElems[j++] = elem;
		}
	}
	return retElems;
}

// 返回给定名称的radio组的值（单值，可能为空：没有被选项）
function getRadioGroupValue(groupName, container) {
	if (container == null) {
		container = document;
	}
	if (groupName != null && groupName.name != null) {
		groupName = groupName.name;
	}
	var radios = [];
	if (container.getElementsByName) {
		radios = container.getElementsByName(groupName);
	} else if (container.tagName == "FORM") {
		radios = getFormElementsByName(container, groupName);
	} else {
		radios = document.getElementsByName(groupName);
	}
	var len = radios.length;
	if (len <= 0) {
		return null;
	}
	for (var i = 0; i < len; i++) {
		var tmpCtrl = radios[i];
		if (tmpCtrl.checked) {
			return tmpCtrl.value;
		}
	}
	return null;
}

// 设置给定名称的radio组的值（单值，可能为空：没有被选项）
function setRadioGroupValue(groupName, value, container) {
	if (container == null) {
		container = document;
	}
	if (groupName != null && groupName.name != null) {
		groupName = groupName.name;
	}
	var radios = [];
	if (container.getElementsByName) {
		radios = container.getElementsByName(groupName);
	} else if (container.tagName == "FORM") {
		radios = getFormElementsByName(container, groupName);
	} else {
		radios = document.getElementsByName(groupName);
	}
	var len = radios.length;
	if (len <= 0) {
		return;
	}
	for (var i = 0; i < len; i++) {
		var tmpCtrl = radios[i];
		tmpCtrl.checked = value == tmpCtrl.value;
	}
}

// 返回给定名称的checkbox组的值（数组）
function getCheckGroupValue(groupName, container) {
	if (container == null) {
		container = document;
	}
	if (groupName != null && groupName.name != null) {
		groupName = groupName.name;
	}
	var checks = [];
	if (container.getElementsByName) {
		checks = container.getElementsByName(groupName);
	} else if (container.tagName == "FORM") {
		checks = getFormElementsByName(container, groupName);
	} else {
		checks = document.getElementsByName(groupName);
	}
	var len = checks.length;
	if (len <= 0) {
		return null;
	}
	var retVals = [];
	for (var i = 0, j = 0; i < len; i++) {
		var tmpCtrl = checks[i];
		if (tmpCtrl.checked) {
			retVals[j++] = tmpCtrl.value;
		}
	}
	return retVals.length > 0 ? retVals : null;
}

// 设定给定名称的checkbox组的值（数组）
function setCheckGroupValue(groupName, value, container) {
	if (container == null) {
		container = document;
	}
	if (groupName != null && groupName.name != null) {
		groupName = groupName.name;
	}
	var checks = [];
	if (container.getElementsByName) {
		checks = container.getElementsByName(groupName);
	} else if (container.tagName == "FORM") {
		checks = getFormElementsByName(container, groupName);
	} else {
		checks = document.getElementsByName(groupName);
	}
	var len = checks.length;
	if (len <= 0) {
		return;
	}
	if (!isArray(value)) {
		value = [];
	}
	for (var i = 0; i < len; i++) {
		var tmpCtrl = checks[i];
		tmpCtrl.checked = value.indexOf(tmpCtrl.value) != -1;
	}
}

// 返回Select 控件的值，多选将返回数组
function getSelectValue(selId) {
	var selCtrl = selId;
	if ( typeof (selId) == "string") {
		selCtrl = document.getElementById(selId);
	}
	var opts = selCtrl.options;
	var optCount = opts.length;
	if (selCtrl.multiple) {
		var retValues = [];
		for (var i = 0, j = 0; i < optCount; i++) {
			var tmpOpt = opts[i];
			if (tmpOpt.selected) {
				retValues[j++] = tmpOpt.value;
			}
		}
		return retValues.length > 0 ? retValues : null;
	} else {
		for (var i = 0; i < optCount; i++) {
			var tmpOpt = opts[i];
			if (tmpOpt.selected) {
				return tmpOpt.value;
			}
		}
		return null;
	}
}

function getSelectText(selId) {
	var selCtrl = selId;
	if ( typeof (selId) == "string") {
		selCtrl = document.getElementById(selId);
	}
	var opts = selCtrl.options;
	var optCount = opts.length;
	if (selCtrl.multiple) {
		var retValues = [];
		for (var i = 0, j = 0; i < optCount; i++) {
			var tmpOpt = opts[i];
			if (tmpOpt.selected) {
				retValues[j++] = tmpOpt.text;
			}
		}
		return retValues.length > 0 ? retValues : null;
	} else {
		for (var i = 0; i < optCount; i++) {
			var tmpOpt = opts[i];
			if (tmpOpt.selected) {
				return tmpOpt.text;
			}
		}
		return null;
	}
}

// 设置Select 控件的值，多选将使用数组
function setSelectValue(selId, value) {
	var selCtrl = selId;
	if ( typeof (selId) == "string") {
		selCtrl = document.getElementById(selId);
	}
	var opts = selCtrl.options;
	var optCount = opts.length;
	selCtrl.selectedIndex = -1;
	if (selCtrl.multiple) {
		if (value == null) {
			value = [];
		}
		if (!isArray(value)) {
			var xValue = [];
			xValue.add(value);
			value = xValue;
		}
		for (var i = 0; i < optCount; i++) {
			var tmpOpt = opts[i];
			tmpOpt.selected = value.indexOf(tmpOpt.value) != -1;
		}
	} else {
		if (value == null) {
			return;
		}
		for (var i = 0; i < optCount; i++) {
			var tmpOpt = opts[i];
			if (tmpOpt.value == value) {
				selCtrl.selectedIndex = i;
				return;
			}
		}
	}
}

// 清除给定的select控件列表
function clearSelectData(selId) {
	var selCtrl = selId;
	if ( typeof (selId) == "string") {
		selCtrl = document.getElementById(selId);
	}
	var opts = selCtrl.options;
	var optCount = opts.length;
	for (var i = optCount - 1; i >= 0; i--) {
		var tmpOpt = opts[i];
		tmpOpt.parentNode.removeChild(tmpOpt);
	}
}

//
function __getDefSelectData() {
	return {
		valueField : 'value',
		textField : 'text',
		//
		items : [],
		unSelectedItem : null,
		defaultValue : null
	};
}

// 加载json数据到给定的select控件中
function loadSelectData(selId, jsonData) {
	var jsonData = jsonData || {};
	jsonData = merge(__getDefSelectData(), jsonData);
	//
	var valueField = jsonData.valueField;
	var textField = jsonData.textField;
	//
	var items = jsonData.items || [];
	var unSelectedItem = jsonData.unSelectedItem || null;
	var defaultValue = jsonData.defaultValue || null;
	//
	if (unSelectedItem != null) {
		items.insertAt(unSelectedItem, 0);
	}
	var unSelectedValue = unSelectedItem == null ? null : unSelectedItem[valueField];
	//
	var selCtrl = selId;
	if ( typeof (selId) == "string") {
		selCtrl = document.getElementById(selId);
	}
	//
	clearSelectData(selCtrl);
	//
	var itemCount = items.length;
	var retIndex = -1;
	var unSelectedIndex = -1;
	var opts = selCtrl.options;
	for (var i = 0; i < itemCount; i++) {
		var optData = items[i];
		var txt = optData[textField];
		var val = optData[valueField];
		var newOpt = new Option(txt, val);
		newOpt.title = txt;
		opts[i] = newOpt;
		if (defaultValue == val) {
			retIndex = i;
		} else if (retIndex == -1 && unSelectedValue == val) {
			unSelectedIndex = i;
		}
	}
	if (retIndex == -1 && unSelectedIndex != -1) {
		retIndex = unSelectedIndex;
	}
	selCtrl.selectedIndex = retIndex;
	return retIndex;
}

// 简单的html转换
function escapeHtmlStr(srcStr) {
	if (srcStr == null) {
		return null;
	}
	var htmlStr = "" + srcStr;
	htmlStr = replaceStr(htmlStr, " ", "&nbsp;");
	htmlStr = replaceStr(htmlStr, "<", "&lt;");
	htmlStr = replaceStr(htmlStr, ">", "&gt;");
	htmlStr = replaceStr(htmlStr, "\n", "<br>");
	return htmlStr;
}

//判断给定的文件名是否图片文件
function isImageFile(fileName) {
	if (isNoB(fileName)) {
		return false;
	}
	var idx = fileName.lastIndexOf(".");
	if (idx == -1) {
		return false;
	}
	var suffix = fileName.substring(idx + 1).toLowerCase();
	return suffix.isIn("gif", "png", "jpg", "jpeg", "bmp", ".ico");
}

// 标准化表格（cellPadding, cellSpacing, border, tableLayout, borderCollapse）
function asFixedThinTable(tblId) {
	var tbl = tblId;
	if (tbl == null) {
		return;
	}
	if ( typeof tbl == "string") {
		tbl = document.getElementById(tbl);
	}
	if (tbl == null || tbl.tagName != "TABLE") {
		return;
	}
	tbl.border = "0";
	tbl.cellPadding = "0";
	tbl.cellSpacing = "1";
	tbl.style.tableLayout = "fixed";
	tbl.style.borderCollapse = "separate";
}

/**
 * 正常索引在跨度数组中的位置索引 (5, [1,2,1,3]) --> 3
 */
function indexInMergedArray(normalIndex, mergedArray) {
	var mergedLen = mergedArray.length;
	var coveredIndex = 0;
	for (var i = 0; i < mergedLen; i++) {
		coveredIndex += mergedArray[i];
		if (coveredIndex - 1 >= normalIndex) {
			return i;
		}
	}
	return -1;
}

/**
 * 计算某一正常单元格列索引在某一有合并单元格的行中的索引
 */
function indexOfColInTableRow(normalIndex, theTableRow) {
	if ( typeof (normalIndex) != "number") {
		normalIndex = ParseInt(normalIndex);
	}
	if (!isNum(normalIndex)) {
		return -1;
	}
	if (theTableRow == null || theTableRow.tagName == null || theTableRow.tagName.toUpperCase() != "TR") {
		return -1;
	}
	var cells = theTableRow.cells;
	var cellMergedArray = [];
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		var colspan = 1;
		if (cell.colSpan != null) {
			colspan = ParseInt(cell.colSpan);
			if (!isNum(colspan) || colspan < 1) {
				colspan = 1;
			}
		}
		cellMergedArray[i] = colspan;
	}
	return indexInMergedArray(normalIndex, cellMergedArray);
}

/**
 * var initTrackInfo = { id : "hotspot-1", //初始相对于图片的位置(rect，类似于 image-map) left :
 * 210, top : 1010, width : 236, height : 78, //图片大小信息（像素） refId : "image-1",
 * refWidth :640, refHeight : 1138 }; 自动计算（跟踪）图片中原来的(rect)位置在图片缩放后的新位置
 *
 * @param initTrackInfo
 * @returns {json: {left, top, width, height}}
 */
function calcTrackerDim(initTrackInfo) {
	var xLeft, xTop, xWidth, xHeight;
	var refObj = $("#" + initTrackInfo.refId);
	var left = refObj.offset().left;
	var top = refObj.offset().top;
	var width = refObj.width();
	var height = refObj.height();
	//
	xTop = height / initTrackInfo.refHeight * initTrackInfo.top + top;
	xLeft = width / initTrackInfo.refWidth * initTrackInfo.left + left;
	xWidth = width / initTrackInfo.refWidth * (initTrackInfo.left + initTrackInfo.width) + left - xLeft;
	xHeight = height / initTrackInfo.refHeight * (initTrackInfo.top + initTrackInfo.height) + top - xTop;
	return {
		left : Math.round(xLeft),
		top : Math.round(xTop),
		width : Math.round(xWidth),
		height : Math.round(xHeight)
	};
}