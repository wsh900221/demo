package com.wang.util.algorithmImpl;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;

import info.monitorenter.cpdetector.io.ASCIIDetector;
import info.monitorenter.cpdetector.io.CodepageDetectorProxy;
import info.monitorenter.cpdetector.io.JChardetFacade;
import info.monitorenter.cpdetector.io.ParsingDetector;

public class StringImpl {
	
	/**
	 * 快速比较俩个字符串的相似度
	 * 
	 * @param strA
	 * @param strB
	 * @return
	 */
	public static double SimilarDegree(String strA, String strB) {
		String newStrA = removeSign(strA);
		String newStrB = removeSign(strB);
		int temp = Math.max(newStrA.length(), newStrB.length());
		int temp2 = longestCommonSubstring(newStrA, newStrB).length();
		return temp2 * 1.0D / temp;
	}
	
	private static String longestCommonSubstring(String strA, String strB) {
		char[] chars_strA = strA.toCharArray();
		char[] chars_strB = strB.toCharArray();
		int m = chars_strA.length;
		int n = chars_strB.length;
		int[][] matrix = new int[m + 1][n + 1];
		for (int i = 1; i <= m; i++) {
			for (int j = 1; j <= n; j++) {
				if (chars_strA[(i - 1)] == chars_strB[(j - 1)])
					matrix[i][j] = (matrix[(i - 1)][(j - 1)] + 1);
				else
					matrix[i][j] = Math.max(matrix[i][(j - 1)], matrix[(i - 1)][j]);
			}
		}
		char[] result = new char[matrix[m][n]];
		int currentIndex = result.length - 1;
		while (matrix[m][n] != 0) {
			if (matrix[n] == matrix[(n - 1)]) {
				n--;
			} else if (matrix[m][n] == matrix[(m - 1)][n]) {
				m--;
			} else {
				result[currentIndex] = chars_strA[(m - 1)];
				currentIndex--;
				n--;
				m--;
			}
		}
		return new String(result);
	}
	
	private static boolean charReg(char charValue) {
		return ((charValue >= '一') && (charValue <= 40869)) || ((charValue >= 'a') && (charValue <= 'z')) || ((charValue >= 'A') && (charValue <= 'Z')) || ((charValue >= '0') && (charValue <= '9'));
	}
	
	private static String removeSign(String str) {
		StringBuffer sb = new StringBuffer();
		for (char item : str.toCharArray()) {
			if (charReg(item))
				sb.append(item);
		}
		return sb.toString();
	}
	
	private static int compare(String str, String target) {
		int n = str.length();
		int m = target.length();
		
		if (n == 0) {
			return m;
		}
		if (m == 0) {
			return n;
		}
		int[][] d = new int[n + 1][m + 1];
		for (int i = 0; i <= n; i++) {
			d[i][0] = i;
		}
		
		for (int j = 0; j <= m; j++) {
			d[0][j] = j;
		}
		
		for (int i = 1; i <= n; i++) {
			char ch1 = str.charAt(i - 1);
			
			for (int j = 1; j <= m; j++) {
				char ch2 = target.charAt(j - 1);
				int temp;
				if (ch1 == ch2)
					temp = 0;
				else {
					temp = 1;
				}
				
				d[i][j] = min(d[(i - 1)][j] + 1, d[i][(j - 1)] + 1, d[(i - 1)][(j - 1)] + temp);
			}
		}
		return d[n][m];
	}
	
	private static int min(int one, int two, int three) {
		return (one = one < two ? one : two) < three ? one : three;
	}
	
	public static double SimilarityRatio(String str, String target) {
		return 1.0D - compare(str, target) / Math.max(str.length(), target.length());
	}
	
	/**
	 * 获取编码（只取前3位判断）
	 * @param str
	 * @return
	 */
	public static String encoding(String str) {
		Charset charset = null;
		try {
			InputStream inputStream = new ByteArrayInputStream(str.getBytes());
			CodepageDetectorProxy m_detector = CodepageDetectorProxy.getInstance();
			m_detector.add(new ParsingDetector(true));
			m_detector.add(JChardetFacade.getInstance());
			m_detector.add(ASCIIDetector.getInstance());
			charset = m_detector.detectCodepage(inputStream, 3);
			if (charset != null) {
				return charset.name();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String simpleEncoding(String str) {
		String encode = "GB2312";
		try {
			if (str.equals(new String(str.getBytes(encode), encode)))
				return encode;
		} catch (Exception exception) {
		}
		encode = "ISO-8859-1";
		try {
			if (str.equals(new String(str.getBytes(encode), encode)))
				return encode;
		} catch (Exception exception1) {
		}
		encode = "UTF-8";
		try {
			if (str.equals(new String(str.getBytes(encode), encode)))
				return encode;
		} catch (Exception exception2) {
		}
		encode = "GBK";
		try {
			if (str.equals(new String(str.getBytes(encode), encode)))
				return encode;
		} catch (Exception exception3) {
		}
		return "";
	}
}
