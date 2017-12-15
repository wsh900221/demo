// JS 工具类（2017-12-14 By Wang Shaohui）

// 判断JS数据类型
var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;// 判断对象是否有某属性

// 生成偏函数的函数
var isType = function(type) {
	return function(obj) {
		return toString.call(obj) == '[object ' + type + ']';
	}
};
// 生成偏函数，判断JS类型
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

/**
 * 是否空对象
 * @param obj
 * @returns
 */
function isEmptyObject(obj) {
	// 遍历对象，只要有一个属性就不是空对象
	var name;
	for (name in obj) {
		return false;
	}
	return true;
}

/**
 * 对象是否有key属性（直接使用Object.prototype.hasOwnProperty也很方便）
 * 
 * @param obj
 * @param key
 * @returns
 */
function hasProperty(obj, key){
	if (!isObject(obj) || !key || isEmptyObject(obj)) {
	    return false;
    }
	
	//return obj.hasOwnProperty(key);
	// 当对象变态到自己有一个属性命名为“hasOwnProperty”时，就要使用该方法
	return hasOwnProperty.call(obj, key);
}

/**
 * 打印参数内容：如果是对象以JSON
 * @param v
 * @returns
 */
function toStr(val) {
	return val == null ? "" : isObject(val) ? JSON.stringify(val, null, 2) : String(val);
}



/**
 * Convert a input value to a number for persistence. If the conversion fails, return original string.
 */
function toNumber(val) {
	var n = parseFloat(val);
	return isNaN(n) ? val : n;
}

// 数组操作
/**
 * Remove an item from an array
 */
function remove(arr, item) {
	if (arr.length) {
		var index = arr.indexOf(item);
		if (index > -1) {
			return arr.splice(index, 1);
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

