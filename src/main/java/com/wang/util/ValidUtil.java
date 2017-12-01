package com.wang.util;

import java.util.Collection;

public class ValidUtil {
	public static boolean isValid(String src) {
		return (src != null) && (!"".equals(src.trim()));
	}
	
	public static boolean isValid(Object obj) {
		return null != obj;
	}
	
	public static boolean isValid(Collection<?> col) {
		return (col != null) && (!col.isEmpty());
	}
	
	public static boolean isValid(Object[] arr) {
		return (arr != null) && (arr.length != 0);
	}
}
