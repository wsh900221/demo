// +---------------------------------------------------
// | 日期正则
// +---------------------------------------------------
// 空白字符
var pattern_blank = /(^\s+|\s+$)/g;
var pattern_date = /\d{4}[-\/]{1}\d{1,2}[-\/]{1}\d{1,2}/g;// 匹配日期类型"yyyy-MM-dd"
var pattern_datetime = /^\d{4}[-\/]{1}\d{1,2}[-\/]{1}\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;// 匹配时间戳类型"yyyy-MM-dd HH:mm:ss"
var pattern_sep = /[-\/ :]/;// 匹配常见的日期分隔符：“-”“/”“ ”“:”

/**
 * 是否有效日期格式
 * @param dateStr 支持"yyyy-MM-dd"、"yyyy-MM-dd HH:mm:ss"两种格式（分隔符可以是：“-”“/”）
 * @returns 1、YYYY-MM/DD(2003-3/21)也是合法日期，数据库会自动转换为YYYY-MM-DD格式；2、虽然语法承认2017-13-14，但这里检查时仍判断为用户非法输入的日期；
 */
function isValidDate(dateStr) {
	if (!dateStr) {
		return false;
	}
	
	// 使用Date的构造器检查日期是否合法
	var date = new Date(dateStr);
	if (isNaN(date)) {
	    return false;
    }
	
	// 过滤某些字段超出其取值范围的，如"2017-13-14"
	var dateArray = dateStr.split(pattern_sep);
	if (pattern_date.test(dateStr)) {
		if (dateArray[0] != date.getFullYear() || dateArray[1] != date.getMonth() + 1 || dateArray[2] != date.getDate()) {
	        return false;
        }
		return true;
    } else if (pattern_datetime.test(dateStr)){
    	if (dateArray[0] != date.getFullYear() || dateArray[1] != date.getMonth() + 1 || dateArray[2] != date.getDate() || dateArray[3] != date.getHours() || dateArray[4] != date.getMinutes() || dateArray[5] != date.getSeconds()) {
	        return false;
        }
		return true;
    }
	return false;
}

// ---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// ---------------------------------------------------
Date.prototype.Format = function(formatStr) {
	var str = formatStr ? formatStr : 'yyyy-MM-dd HH:mm:ss';
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
	
	str = str.replace(/MM/, this.getMonth() > 9 ? this.getMonth().toString() : '0' + this.getMonth());
	str = str.replace(/M/g, this.getMonth());
	
	str = str.replace(/w|W/g, Week[this.getDay()]);
	
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str;
}

/**
 * 看指定日期是星期几
 * @param date 指定日期或时间戳
 * @returns
 */
function getWeekName(date) {
	if (!date || !isValidDate(date)) {
	    return "日期输入有误";
    }
	
	var d = new Date(date);
	var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	return arr[d.getDay()];
}

/**
 * 是否闰年
 * @param year 年份，最好传四位数年份
 * @returns
 */
function isLeapYear(year){
	return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

/**
 * 求两个时间的天数差
 * @param date1 日期1，格式YYYY-MM-dd
 * @param date2 日期2，格式YYYY-MM-dd
 * @returns
 */
function daysBetween(date1, date2) {
	var month1 = date1.substring(5, date1.lastIndexOf('-'));
	var day1 = date1.substring(date1.length, date1.lastIndexOf('-') + 1);
	var year1 = date1.substring(0, date1.indexOf('-'));
	
	var month2 = date2.substring(5, date2.lastIndexOf('-'));
	var day2 = date2.substring(date2.length, date2.lastIndexOf('-') + 1);
	var year2 = date2.substring(0, date2.indexOf('-'));
	
	var cha = ((Date.parse(month1 + '/' + day1 + '/' + year1) - Date.parse(month2 + '/' + day2 + '/' + year2)) / 86400000);
	return Math.abs(cha);
}


// +---------------------------------------------------
// | 日期计算
// +---------------------------------------------------
Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}

// +---------------------------------------------------
// | 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串
// +---------------------------------------------------
Date.prototype.DateDiff = function(strInterval, dtEnd) {
	var dtStart = this;
	// 如果是字符串转换为日期型
	if (typeof dtEnd == 'string') {
		dtEnd = stringToDate(dtEnd);
	}
	switch (strInterval) {
		case 's': return parseInt((dtEnd - dtStart) / 1000);
		case 'n': return parseInt((dtEnd - dtStart) / 60000);
		case 'h': return parseInt((dtEnd - dtStart) / 3600000);
		case 'd': return parseInt((dtEnd - dtStart) / 86400000);
		case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
		case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
		case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
	}
}

// +---------------------------------------------------
// | 日期输出字符串，重载了系统的toString方法
// +---------------------------------------------------
Date.prototype.toString = function(showWeek) {
	var myDate = this;
	var str = myDate.toLocaleDateString();
	if (showWeek) {
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str += ' 星期' + Week[myDate.getDay()];
	}
	var h = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
	var m = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
	var s = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
	str += ' ' + h + ':' + m + ':' + s;
	return str;
}

// +---------------------------------------------------
// | 把日期分割成数组
// +---------------------------------------------------
Date.prototype.toArray = function() {
	var myDate = this;
	var myArray = Array();
	myArray[0] = myDate.getFullYear();
	myArray[1] = myDate.getMonth();
	myArray[2] = myDate.getDate();
	myArray[3] = myDate.getHours();
	myArray[4] = myDate.getMinutes();
	myArray[5] = myDate.getSeconds();
	return myArray;
}

// +---------------------------------------------------
// | 取得日期数据信息
// | 参数 interval 表示数据类型
// | y 年 m月 d日 w星期 ww周 h时 n分 s秒
// +---------------------------------------------------
Date.prototype.DatePart = function(interval) {
	var myDate = this;
	var partStr = '';
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	switch (interval) {
		case 'y' :partStr = myDate.getFullYear(); break;
		case 'm' :partStr = myDate.getMonth()+1; break;
		case 'd' :partStr = myDate.getDate(); break;
		case 'w' :partStr = Week[myDate.getDay()]; break;
		case 'ww' :partStr = myDate.WeekNumOfYear(); break;
		case 'h' :partStr = myDate.getHours(); break;
		case 'n' :partStr = myDate.getMinutes(); break;
		case 's' :partStr = myDate.getSeconds(); break;
	}
	return partStr;
}

// +---------------------------------------------------
// | 取得当前日期所在月的最大天数
// +---------------------------------------------------
Date.prototype.MaxDayOfDate = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var date1 = (new Date(ary[0], ary[1] + 1, 1));
	var date2 = date1.dateAdd(1, 'm', 1);
	var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
	return result;
}

// +---------------------------------------------------
// | 取得当前日期所在周是一年中的第几周
// +---------------------------------------------------
Date.prototype.WeekNumOfYear = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var year = ary[0];
	var month = ary[1] + 1;
	var day = ary[2];
	document.write('< script language=VBScript/> /n');
	document.write('myDate = DateValue(""+month+"-"+day+"-"+year+"") /n');
	document.write('result = DatePart("ww", myDate) /n');
	document.write(' /n');
	return result;
}

// +---------------------------------------------------
// | 字符串转成日期类型
// | 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
// +---------------------------------------------------
function stringToDate(DateStr) {
	var converted = Date.parse(DateStr);
	var myDate = new Date(converted);
	if (isNaN(myDate)) {
		// var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
		var arys = DateStr.split('-');
		myDate = new Date(arys[0], --arys[1], arys[2]);
	}
	return myDate;
}
/**
 * 对 date +/- 对应天数，返回日期：yyyy-MM-dd
 * 
 * @param date
 * @param dayNum
 * @returns
 */
function addDay(date, dayNum) {
	var d;
	if (!date) {
		d = new Date();
	} else {
		var d = new Date(date);
	}

	d.setDate(d.getDate() + dayNum);
	var prevYear = d.getFullYear();
	var prevMonth = d.getMonth() + 1;
	var prevDay = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
	return prevYear + "-" + prevMonth + "-" + prevDay;
}