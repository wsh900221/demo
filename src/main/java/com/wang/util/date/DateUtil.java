package com.wang.util.date;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	
	public static void main(String[] args) {
		DateRange currentQuarter = getThisQuarter();
		System.out.println("当前季度的时间范围： " + format(currentQuarter.getStart()) + " - " + format(currentQuarter.getEnd()));
		
		DateRange yesterdayRange = getYesterdayRange();
		System.out.println("昨天的时间范围: " + format(yesterdayRange.getStart()) + " - " + format(yesterdayRange.getEnd()));
		
		DateRange thisMonth = getThisMonth();
		System.out.println("当前月份的时间范围: " + format(thisMonth.getStart()) + " - " + format(thisMonth.getEnd()));
		
		DateRange lastMonth = getLastMonth();
		System.out.println("上个月的时间范围: " + format(lastMonth.getStart()) + " - " + format(lastMonth.getEnd()));
		
		DateRange lastQuarter = getLastQuarter();
		System.out.println("上个季度的时间范围: " + format(lastQuarter.getStart()) + " - " + format(lastQuarter.getEnd()));
	}
	
	// 定义常用模式
	public static final String PATTERN_DATE_TIME = "yyyy-MM-dd HH:mm:ss";
	public static final String PATTERN_DATE_TIME_M = "yyyy-MM-dd HH:mm:ss.SSS";
	public static final String PATTERN_DATE = "yyyy-MM-dd";
	public static final String PATTERN_HOUR_MINUTE_SECOND = "HH:mm:ss";
	public static final String PATTERN_HOUR_MINUTE = "HH:mm";
	public static final String PATTERN_YEAR = "yyyy";
	public static final String PATTERN_MONTH = "MM";
	public static final String PATTERN_DAY = "dd";
	public static final String PATTERN_HOUR = "HH";
	public static final String PATTERN_MINUTE = "mm";
	public static final String PATTERN_SECOND = "ss";
	
	// 使用ThreadLocal以空间换时间解决SimpleDateFormat线程安全问题
	private static final ThreadLocal<SimpleDateFormat> threadLocal = new ThreadLocal<SimpleDateFormat>();
	private static final Object object = new Object();
	
	private static SimpleDateFormat getDateFormat(String pattern) throws RuntimeException {
		SimpleDateFormat dateFormat = threadLocal.get();
		if (dateFormat == null) {
			synchronized (object) {
				if (dateFormat == null) {
					dateFormat = new SimpleDateFormat(pattern);
					dateFormat.setLenient(false);
					threadLocal.set(dateFormat);
				}
			}
		}
		dateFormat.applyPattern(pattern);
		return dateFormat;
	}
	
	/**
	 * 格式化
	 * 
	 * @param date
	 * @return
	 */
	public static String format(Date date) {
		SimpleDateFormat sdf = getDateFormat(PATTERN_DATE_TIME);
		return sdf.format(date);
	}
	
	public static String format(Date date, String pattern) {
		SimpleDateFormat sdf = getDateFormat(pattern);
		return sdf.format(date);
	}
	
	// ************************************** 取偏移指定单位的时间 Begin ****************************************
	/**
	 * 服务器当前时间
	 * 
	 * @return
	 */
	public static Date getCurTime() {
		return new Date();
	}
	
	/**
	 * 昨天
	 * 
	 * @return
	 */
	public static Date getYesterday() {
		return getDateTime(getCurTime(), -1, "day");
	}
	
	/**
	 * 根据传入日期取其偏移单位的时间
	 * 
	 * @param date
	 * @param offset
	 * @param unitStr
	 * @return
	 */
	private static Date getDateTime(Date date, int offset, String unitStr) {
		int unit = 0;
		if ("year".equalsIgnoreCase(unitStr)) {
			unit = Calendar.YEAR;
		} else if ("month".equalsIgnoreCase(unitStr)) {
			unit = Calendar.MONTH;
		} else if ("day".equalsIgnoreCase(unitStr)) {
			unit = Calendar.DATE;
		} else if ("hour".equalsIgnoreCase(unitStr)) {
			unit = Calendar.HOUR_OF_DAY;
		} else if ("minute".equalsIgnoreCase(unitStr)) {
			unit = Calendar.MINUTE;
		} else if ("second".equalsIgnoreCase(unitStr)) {
			unit = Calendar.SECOND;
		} else if ("week".equalsIgnoreCase(unitStr)) {
			unit = Calendar.WEEK_OF_MONTH;
		}
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(unit, offset);
		return calendar.getTime();
	}
	// ************************************** 取偏移指定单位的时间 End ****************************************
	
	/**
	 * 获取date的月份的时间范围
	 * 
	 * @param date
	 * @return
	 */
	public static DateRange getMonthRange(Date date) {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.setTime(date);
		startCalendar.set(Calendar.DAY_OF_MONTH, 1);
		setMaxTime(startCalendar);
		
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.setTime(date);
		endCalendar.set(Calendar.DAY_OF_MONTH, endCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		setMaxTime(endCalendar);
		
		return new DateRange(startCalendar.getTime(), endCalendar.getTime());
	}
	
	/**
	 * 获取当前季度的时间范围
	 * 
	 * @return current quarter
	 */
	public static DateRange getThisQuarter() {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.set(Calendar.MONTH, ((int) startCalendar.get(Calendar.MONTH) / 3) * 3);
		startCalendar.set(Calendar.DAY_OF_MONTH, 1);
		setMinTime(startCalendar);
		
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.set(Calendar.MONTH, ((int) startCalendar.get(Calendar.MONTH) / 3) * 3 + 2);
		endCalendar.set(Calendar.DAY_OF_MONTH, endCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		setMaxTime(endCalendar);
		
		return new DateRange(startCalendar.getTime(), endCalendar.getTime());
	}
	
	/**
	 * 获取昨天的时间范围
	 * 
	 * @return
	 */
	public static DateRange getYesterdayRange() {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.add(Calendar.DAY_OF_MONTH, -1);
		setMinTime(startCalendar);
		
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.add(Calendar.DAY_OF_MONTH, -1);
		setMaxTime(endCalendar);
		
		return new DateRange(startCalendar.getTime(), endCalendar.getTime());
	}
	
	/**
	 * 获取当前月份的时间范围
	 * 
	 * @return
	 */
	public static DateRange getThisMonth() {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.set(Calendar.DAY_OF_MONTH, 1);
		setMinTime(startCalendar);
		
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.set(Calendar.DAY_OF_MONTH, endCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		setMaxTime(endCalendar);
		
		return new DateRange(startCalendar.getTime(), endCalendar.getTime());
	}
	
	/**
	 * 获取上个月的时间范围
	 * 
	 * @return
	 */
	public static DateRange getLastMonth() {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.add(Calendar.MONTH, -1);
		startCalendar.set(Calendar.DAY_OF_MONTH, 1);
		setMinTime(startCalendar);
		
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.add(Calendar.MONTH, -1);
		endCalendar.set(Calendar.DAY_OF_MONTH, endCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		setMaxTime(endCalendar);
		
		return new DateRange(startCalendar.getTime(), endCalendar.getTime());
	}
	
	/**
	 * 获取上个季度的时间范围
	 * 
	 * @return
	 */
	public static DateRange getLastQuarter() {
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.set(Calendar.MONTH, ((int) startCalendar.get(Calendar.MONTH) / 3 - 1) * 3);
		startCalendar.set(Calendar.DAY_OF_MONTH, 1);
		setMinTime(startCalendar);
		
		Calendar endCalendar = Calendar.getInstance();
		endCalendar.set(Calendar.MONTH, ((int) endCalendar.get(Calendar.MONTH) / 3 - 1) * 3 + 2);
		endCalendar.set(Calendar.DAY_OF_MONTH, endCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		setMaxTime(endCalendar);
		
		return new DateRange(startCalendar.getTime(), endCalendar.getTime());
	}
	
	private static void setMinTime(Calendar calendar) {
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
	}
	
	private static void setMaxTime(Calendar calendar) {
		calendar.set(Calendar.HOUR_OF_DAY, calendar.getActualMaximum(Calendar.HOUR_OF_DAY));
		calendar.set(Calendar.MINUTE, calendar.getActualMaximum(Calendar.MINUTE));
		calendar.set(Calendar.SECOND, calendar.getActualMaximum(Calendar.SECOND));
		calendar.set(Calendar.MILLISECOND, calendar.getActualMaximum(Calendar.MILLISECOND));
	}
}
