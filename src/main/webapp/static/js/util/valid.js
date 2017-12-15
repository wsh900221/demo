var toString = Object.prototype.toString;

// 检测变量类型方法1：偏函数
// 生成偏函数的函数
var isType = function(type) {
	return function(obj) {
		return toString.call(obj) == '[object ' + type + ']';
	}
};
// 生成偏函数
var isString = isType('String');
var isNumber = isType('Number');
var isBoolean = isType('Boolean');
var isUndefined = isType('Undefined');
var isNull = isType('Null');
var isObject = isType('Object');
var isArray = isType('Array');
var isDate = isType('Date');
var isFunction = isType('Function');
var isRegExp = isType('RegExp');
var isError = isType('Error');

// 检测变量类型方法2：传统方法一个一个检测
/**
 * 是否undefined
 * @param v
 * @returns
 */
function isUndef(v) {
	return typeof v === "undefined";
}
/**
 * 是否null（不包括undefined，且是null或“null”）
 * @param v 只匹配null（特殊字符串"null"），不包括undefined
 * @returns
 */
function isNull(v) {
	return !isUndef(v) && (v == null || v == "null");
}

/**
 * 是否Boolean
 * @param v
 * @returns
 */
function isBool(v) {
	return v != null && (typeof v == "boolean" || v instanceof Boolean);
}

//判断v是否原始类型：string、number、boolean 其中的一个
function isPrimitive(v) {
	return (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean');
}
// 判断v是否对象类型
function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

