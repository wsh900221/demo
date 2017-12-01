package com.wang.util;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.wang.util.algorithmImpl.StringImpl;

public class StrUtil {
	
	public static void main(String[] args) {
		// System.out.println(SimilarityRatio("", ""));
		
		// 判断是否数字
//		System.out.println(isNumeric("123-"));// true
		
		// 判断是否字母
//		System.out.println(isABC("123-"));// false
		
		// 判断是否小数(包含整数)
//		System.out.println(isFloatNumeric("123.."));// true
		
		// 将 List 以指定连接符拼接成字符串
//		List<Integer> idList = new ArrayList<Integer>();
//		idList.add(100);
//		idList.add(50);
//		idList.add(150);
//		idList.add(200);
//		System.out.println(joinString(idList, ","));// 100,50,150,200
//		System.out.println(joinString(idList, "_"));// 100_50_150_200
//		System.out.println(joinString(idList, " "));// 100 50 150 200
		
		// 压缩显示前n个长度，后面的用...代替
//		System.out.println(subStringNotEncode("中华人民共和国人民当家做主了", 5));// 中华人民共...
		
	}
	
	// ****************** 打印 Array、List Begin **********************
	// 逐行输出list内容
	public static void printList(List<?> list) {
		printArray(list.toArray());
	}
	// 逐行输出array内容
	public static void printArray(Object[] objArray) {
		if (objArray == null || objArray.length == 0) {
			System.out.println("array无内容");
			return;
		}
		Object obj = null;
		System.out.println("---------- 输出 Begin ----------");
		for (int i = 0; i < objArray.length; i++) {
			obj = objArray[i];
			if (obj != null) {
				System.out.println(obj.toString());
			}
		}
		System.out.println("---------- 输出 End ----------");
	}
	// ****************** 打印 Array、List End **********************
	
	private static Pattern numericPattern = Pattern.compile("^[0-9\\-]+$");
	private static Pattern numericStringPattern = Pattern.compile("^[0-9\\-\\-]+$");
	private static Pattern floatNumericPattern = Pattern.compile("^[0-9\\-\\.]+$");
	private static Pattern abcPattern = Pattern.compile("^[a-z|A-Z]+$");
	public static final String splitStrPattern = ",|，|;|；|、|\\.|。|-|_|\\(|\\)|\\[|\\]|\\{|\\}|\\\\|/| |　|\"";
	
	/**
	 * 判断是否数字
	 * @param src
	 * @return
	 */
	public static boolean isNumeric(String src) {
		boolean return_value = false;
		if ((src != null) && (src.length() > 0)) {
			Matcher m = numericPattern.matcher(src);
			if (m.find()) {
				return_value = true;
			}
		}
		return return_value;
	}
	
	public static boolean isNumericString(String src) {
		boolean return_value = false;
		if ((src != null) && (src.length() > 0)) {
			Matcher m = numericStringPattern.matcher(src);
			if (m.find()) {
				return_value = true;
			}
		}
		return return_value;
	}
	
	/**
	 * 判断是否字母
	 * @param src
	 * @return
	 */
	public static boolean isABC(String src) {
		boolean return_value = false;
		if ((src != null) && (src.length() > 0)) {
			Matcher m = abcPattern.matcher(src);
			if (m.find()) {
				return_value = true;
			}
		}
		return return_value;
	}
	
	/**
	 * 判断是否小数
	 * @param src
	 * @return
	 */
	public static boolean isFloatNumeric(String src) {
		boolean return_value = false;
		if ((src != null) && (src.length() > 0)) {
			Matcher m = floatNumericPattern.matcher(src);
			if (m.find()) {
				return_value = true;
			}
		}
		return return_value;
	}
	
	/**
	 * 将 List 以指定连接符拼接成字符串
	 * @param array
	 * @param symbol
	 * @return
	 */
	public static String joinString(List<?> array, String symbol) {
		String result = "";
		if (array != null) {
			for (int i = 0; i < array.size(); i++) {
				String temp = array.get(i).toString();
				if ((temp != null) && (temp.trim().length() > 0))
					result += temp + symbol;
			}
			if (result.length() > 1)
				result = result.substring(0, result.length() - 1);
		}
		return result;
	}
	
	public static boolean requals(String str1, String str2) {
		boolean falg = false;
		if ((str1 != null) && (str2 != null)) {
			str2 = str2.replaceAll("\\s*", "");
			String[] arr = str2.split(",");
			for (int i = 0; i < arr.length; i++) {
				if (arr[i].equals(str1.trim())) {
					falg = true;
				}
			}
		}
		return falg;
	}
	
	/**
	 * 压缩显示前n个长度，后面的用...代替
	 * @param subject
	 * @param size
	 * @return
	 */
	public static String subStringNotEncode(String subject, int size) {
		if ((subject != null) && (subject.length() > size)) {
			subject = subject.substring(0, size) + "...";
		}
		return subject;
	}
	
	public static String getLimitLengthString(String str, int len, String symbol) {
		int iLen = len * 2;
		int counterOfDoubleByte = 0;
		String strRet = "";
		try {
			byte[] b;
			if (str != null) {
				b = str.getBytes("GBK");
				if (b.length <= iLen) {
					return str;
				}
				for (int i = 0; i < iLen; i++) {
					if (b[i] < 0) {
						counterOfDoubleByte++;
					}
				}
				if (counterOfDoubleByte % 2 == 0) {
					strRet = new String(b, 0, iLen, "GBK") + symbol;
					return strRet;
				}
				strRet = new String(b, 0, iLen - 1, "GBK") + symbol;
				return strRet;
			}
			
			return "";
		} catch (Exception ex) {
			int i;
			String str2;
			return str.substring(0, len);
		} finally {
			strRet = null;
		}
	}
	
	public static String subStrNotEncode(String subject, int size) {
		if (subject.length() > size) {
			subject = subject.substring(0, size);
		}
		return subject;
	}
	
	public static String joinString(String[] array, String symbol) {
		String result = "";
		if (array != null) {
			for (int i = 0; i < array.length; i++) {
				String temp = array[i];
				if ((temp != null) && (temp.trim().length() > 0))
					result = result + temp + symbol;
			}
			if ((result.length() > 1) && (ValidUtil.isValid(symbol))) {
				result = result.substring(0, result.length() - symbol.length());
			}
		}
		return result;
	}
	
	public static int getStringLen(String SrcStr) {
		int return_value = 0;
		if (SrcStr != null) {
			char[] theChars = SrcStr.toCharArray();
			for (int i = 0; i < theChars.length; i++) {
				return_value += (theChars[i] <= 'ÿ' ? 1 : 2);
			}
		}
		return return_value;
	}
	
	public static String getHideEmailPrefix(String email) {
		if (null != email) {
			int index = email.lastIndexOf(64);
			if (index > 0) {
				email = repeat("*", index).concat(email.substring(index));
			}
		}
		return email;
	}
	
	public static String repeat(String src, int num) {
		StringBuffer s = new StringBuffer();
		for (int i = 0; i < num; i++)
			s.append(src);
		return s.toString();
	}
	
	public static List<String> parseString2ListByCustomerPattern(String pattern, String src) {
		if (src == null)
			return null;
		List list = new ArrayList();
		String[] result = src.split(pattern);
		for (int i = 0; i < result.length; i++) {
			list.add(result[i]);
		}
		return list;
	}
	
	public static String formatFloat(float f, String format) {
		DecimalFormat df = new DecimalFormat(format);
		return df.format(f);
	}
	
	public static boolean isEmpty(String s) {
		if ((s != null) && (!s.equals(""))) {
			return false;
		}
		return true;
	}
	
	public static String listToStringSlipStr(List list, String slipStr) {
		StringBuffer returnStr = new StringBuffer();
		if ((list != null) && (list.size() > 0)) {
			for (int i = 0; i < list.size(); i++) {
				returnStr.append(list.get(i)).append(slipStr);
			}
		}
		if (returnStr.toString().length() > 0) {
			return returnStr.toString().substring(0, returnStr.toString().lastIndexOf(slipStr));
		}
		return "";
	}
	
	public static String html(String content) {
		if (content == null)
			return "";
		String html = content;
		html = html.replaceAll("'", "&apos;");
		html = html.replaceAll("\"", "&quot;");
		html = html.replaceAll("\t", "&nbsp;&nbsp;");
		html = html.replaceAll("<", "&lt;");
		html = html.replaceAll(">", "&gt;");
		return html;
	}
	
	public static boolean isInteger(String str) {
		Pattern pattern = Pattern.compile("^[-\\+]?[\\d]+$");
		return pattern.matcher(str).matches();
	}
	
	public static boolean isEmail(String email) {
		if ((email == null) || (email.length() < 1) || (email.length() > 256)) {
			return false;
		}
		Pattern pattern = Pattern.compile("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
		
		return pattern.matcher(email).matches();
	}
	
	public static String left(String input, int count) {
		if (isEmpty(input)) {
			return "";
		}
		count = count > input.length() ? input.length() : count;
		return input.substring(0, count);
	}
	
	public static String right(String input, int count) {
		if (isEmpty(input)) {
			return "";
		}
		count = count > input.length() ? input.length() : count;
		return input.substring(input.length() - count, input.length());
	}
	
	public static String replaceBracketStr(String str) {
		if ((str != null) && (str.length() > 0)) {
			str = str.replaceAll("（", "(");
			str = str.replaceAll("）", ")");
		}
		return str;
	}
	
	public static String full2Half(String str) {
		if ((str == null) || ("".equals(str)))
			return "";
		StringBuffer sb = new StringBuffer();
		
		for (int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			
			if ((c >= 65281) && (c < 65373))
				sb.append((char) (c - 65248));
			else {
				sb.append(str.charAt(i));
			}
		}
		return sb.toString();
	}
	
	public static String replaceAll(String s, String sf, String sb) {
		int i = 0;
		int j = 0;
		int l = sf.length();
		boolean b = true;
		boolean o = true;
		String str = "";
		do {
			j = i;
			i = s.indexOf(sf, j);
			if (i > j) {
				str = str + s.substring(j, i);
				str = str + sb;
				i += l;
				o = false;
			} else {
				str = str + s.substring(j);
				b = false;
			}
		} while (b);
		if (o) {
			str = s;
		}
		return str;
	}
	
	public static String replaceBlank(String str) {
		if (str != null) {
			Pattern p = Pattern.compile("\\s*|\t|\r|\n");
			Matcher m = p.matcher(str);
			str = m.replaceAll("");
		}
		return str;
	}
	
	public static Map<String, String> parseQuery(String query, char split1, char split2, String dupLink) {
		if ((!isEmpty(query)) && (query.indexOf(split2) > 0)) {
			Map result = new HashMap();
			
			String name = null;
			String value = null;
			String tempValue = "";
			int len = query.length();
			for (int i = 0; i < len; i++) {
				char c = query.charAt(i);
				if (c == split2) {
					value = "";
				} else if (c == split1) {
					if ((!isEmpty(name)) && (value != null)) {
						if (dupLink != null) {
							tempValue = (String) result.get(name);
							if (tempValue != null) {
								value = value + dupLink + tempValue;
							}
						}
						result.put(name, value);
					}
					name = null;
					value = null;
				} else if (value != null) {
					value = value + c;
				} else {
					name = "" + c;
				}
			}
			
			if ((!isEmpty(name)) && (value != null)) {
				if (dupLink != null) {
					tempValue = (String) result.get(name);
					if (tempValue != null) {
						value = value + dupLink + tempValue;
					}
				}
				result.put(name, value);
			}
			
			return result;
		}
		return null;
	}
	
	public static String middle(String input, int index, int count) {
		if (isEmpty(input)) {
			return "";
		}
		count = count > input.length() - index + 1 ? input.length() - index + 1 : count;
		
		return input.substring(index - 1, index + count - 1);
	}
	
	public static String UnicodeToGB(String input) throws UnsupportedEncodingException {
		if (isEmpty(input)) {
			return "";
		}
		
		String s1 = new String(input.getBytes("ISO8859_1"), "GBK");
		return s1;
	}
	
	public static String GBToUnicode(String input) throws UnsupportedEncodingException {
		if (isEmpty(input)) {
			return "";
		}
		
		String s1 = new String(input.getBytes("GBK"), "ISO8859_1");
		return s1;
	}
	
	public static boolean isIn(String substring, String[] source) {
		if ((source == null) || (source.length == 0)) {
			return false;
		}
		for (int i = 0; i < source.length; i++) {
			String aSource = source[i];
			if (aSource.equals(substring)) {
				return true;
			}
		}
		return false;
	}
	
	public static String string2Unicode(String string) {
		StringBuffer unicode = new StringBuffer();
		for (int i = 0; i < string.length(); i++) {
			char c = string.charAt(i);
			unicode.append("\\u" + Integer.toHexString(c));
		}
		return unicode.toString();
	}
	
	public static String unicode2String(String unicode) {
		StringBuffer string = new StringBuffer();
		String[] hex = unicode.split("\\\\u");
		for (int i = 1; i < hex.length; i++) {
			int data = Integer.parseInt(hex[i], 16);
			string.append((char) data);
		}
		return string.toString();
	}
	
	public static boolean isChinese(char c) {
		Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
		if ((ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS) || (ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS) || (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A) || (ub == Character.UnicodeBlock.GENERAL_PUNCTUATION) || (ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION)
				|| (ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS)) {
			return true;
		}
		return false;
	}
	
	public static boolean isMessyCode(String strName) {
		Pattern p = Pattern.compile("\\s*|\t*|\r*|\n*");
		Matcher m = p.matcher(strName);
		String after = m.replaceAll("");
		String temp = after.replaceAll("\\p{P}", "");
		char[] ch = temp.trim().toCharArray();
		float chLength = 0.0F;
		float count = 0.0F;
		for (int i = 0; i < ch.length; i++) {
			char c = ch[i];
			if (!Character.isLetterOrDigit(c)) {
				if (!isChinese(c)) {
					count += 1.0F;
				}
				chLength += 1.0F;
			}
		}
		float result = count / chLength;
		if (result > 0.4D) {
			return true;
		}
		return false;
	}
	
	public static boolean isChinese(String strName) {
		char[] ch = strName.toCharArray();
		for (int i = 0; i < ch.length; i++) {
			char c = ch[i];
			if (isChinese(c)) {
				return true;
			}
		}
		return false;
	}
	
	public static int ChineseLength(String str) {
		Pattern p = Pattern.compile("[一-龥]+");
		Matcher m = p.matcher(str);
		int i = 0;
		while (m.find()) {
			String temp = m.group(0);
			i += temp.length();
		}
		return i;
	}
	
	public static String trimPunct(String str) {
		return str.replaceAll("[\\pP\\p{Punct}]", "");
	}
	
	/**
	 * 字符串相似度比较(速度较快)
	 * 
	 * @param str1
	 * @param str2
	 * @return
	 */
	public static double SimilarityRatio(String str1, String str2) {
		str1 = trimPunct(str1);
		str2 = trimPunct(str2);
		if (str1.length() > str2.length()) {
			return StringImpl.SimilarityRatio(str1, str2);
		}
		return StringImpl.SimilarityRatio(str2, str1);
	}
	
	/**
	 * 字符串相似度比较(速度较快)
	 * 
	 * @param str1
	 * @param str2
	 * @return
	 */
	public static double SimilarDegree(String str1, String str2) {
		str1 = trimPunct(str1);
		str2 = trimPunct(str2);
		if (str1.length() > str2.length()) {
			return StringImpl.SimilarDegree(str1, str2);
		}
		return StringImpl.SimilarDegree(str2, str1);
	}
	
	public String SimpleEncoding(String str) {
		return StringImpl.simpleEncoding(str);
	}
	
	public String cpDetector(String str) {
		return StringImpl.encoding(str);
	}
	
	public static int countSubStr(String string, String str) {
		if ((str == null) || (str.length() == 0) || (string == null) || (string.length() == 0)) {
			return 0;
		}
		int count = 0;
		int index = 0;
		while ((index = string.indexOf(str, index)) != -1) {
			count++;
			index += string.length();
		}
		return count;
	}
	
	public static int countSubStrReg(String string, String reg) {
		Pattern p = Pattern.compile(reg);
		Matcher m = p.matcher(string);
		int i = 0;
		while (m.find()) {
			string = m.group(0);
			i += string.length();
		}
		return i;
	}
}
