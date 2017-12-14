// ******************************************
// **************               *************
// ************** JavaScript 工具 *************
// **************               *************
// ******************************************

// ***************************************** 基本类型判断 Begin *****************************************

var objectPro = Object.prototype;
var toString = objectPro.toString;

/**
 * 判断v是否未定义数据
 * @param v 未定义值undefined
 * @returns
 */
function isDef(v) {alert("1");
	return !isUndef(v);
}
function isUndef(v) {alert("2");
	return typeof v === "undefined";
}
/**
 * 判断v是否为null（未定义、null、“null”）
 * @param v 包括 undefined 和 null，再外加一个特殊字符串值"null"
 * @returns
 */
function isNotNull(v) {
	return !isNull(v);
}
function isNull(v) {
	return isUndef(v) || v == null || v == "null";;
}

// 判断v是否 Booleano 类型
function isBool(v) {
	return v != null && (typeof v == "boolean" || v instanceof Boolean);
}
function isTrue(v) {
	return v === true;
}
function isFalse(v) {
	return v === false;
}

// 判断v是否原始类型：string、number、boolean 其中的一个
function isPrimitive(v) {
	return (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean');
}
// 判断v是否对象类型
function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}
var _toString = Object.prototype.toString;
/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
	return hasOwnProperty.call(obj, key);
}
/**
 * Strict object type check. Only returns true for plain JavaScript objects.
 */
function isPlainObject(obj) {
	return _toString.call(obj) === '[object Object]'
}
function isRegExp(v) {
	return _toString.call(v) === '[object RegExp]'
}
/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
	var n = parseFloat(val);
	return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
	return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert a input value to a number for persistence. If the conversion fails, return original string.
 */
function toNumber(val) {
	var n = parseFloat(val);
	return isNaN(n) ? val : n
}

// 数组操作
/**
 * Remove an item from an array
 */
function remove(arr, item) {
	if (arr.length) {
		var index = arr.indexOf(item);
		if (index > -1) {
			return arr.splice(index, 1)
		}
	}
}

// 缓存
/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}





// ***************************************** 基本类型判断 End

