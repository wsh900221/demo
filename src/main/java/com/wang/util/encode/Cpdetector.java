package com.wang.util.encode;

import java.io.File;
import java.net.URL;

import info.monitorenter.cpdetector.io.ASCIIDetector;
import info.monitorenter.cpdetector.io.ByteOrderMarkDetector;
import info.monitorenter.cpdetector.io.CodepageDetectorProxy;
import info.monitorenter.cpdetector.io.JChardetFacade;
import info.monitorenter.cpdetector.io.ParsingDetector;
import info.monitorenter.cpdetector.io.UnicodeDetector;

/**
 * 自动检测文件内容的编码
 * @author wang
 */
public class Cpdetector {
	private CodepageDetectorProxy detector;
	
	public Cpdetector() {
		/**
		 * detector是探测器，它把探测任务交给具体的探测实现类的实例完成。<br> 
		 * cpDetector内置了一些常用的探测实现类，这些探测实现类的实例可以通过add方法 加进来，如ParsingDetector、 JChardetFacade、ASCIIDetector、UnicodeDetector。<br>
		 * detector按照“谁最先返回非空的探测结果，就以该结果为准”的原则返回探测到的 字符集编码。使用需要用到三个第三方JAR包：antlr.jar、chardet.jar和jargs-1.0.jar<br>
		 * cpDetector是基于统计学原理的，不保证完全正确。
		 */
		detector = CodepageDetectorProxy.getInstance();
		/**
		 * ParsingDetector 可用于检查HTML、XML等文件或字符流的编码,构造方法中的参数用于指示是否显示探测过程的详细信息，为false不显示。
		 */
		detector.add(new ParsingDetector(false));
		detector.add(new ByteOrderMarkDetector());
		/**
		 * JChardetFacade封装了由Mozilla组织提供的JChardet，它可以完成大多数文件的编码 测定。所以，一般有了这个探测器就可满足大多数项目的要求。<br>
		 * 如果你还不放心，可以 再多加几个探测器，比如下面的ASCIIDetector、UnicodeDetector等。<br>
		 *
		 * 用到antlr.jar、chardet.jar
		 */
		detector.add(JChardetFacade.getInstance());
		// ASCIIDetector用于ASCII编码测定
		detector.add(ASCIIDetector.getInstance());
		// UnicodeDetector用于Unicode家族编码的测定
		detector.add(UnicodeDetector.getInstance());
	}
	
	/**
	 * 获取 URL 的编码
	 *
	 * @param urlAddr 网页URL
	 * @return 网页编码
	 */
	public String getUrlEncode(String urlAddr) {
		String res = null;
		try {
			URL url = new URL(urlAddr);
			res = getUrlEncode(url);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return res;
	}
	
	public String getUrlEncode(URL url) {
		java.nio.charset.Charset charset = null;
		try {
			charset = detector.detectCodepage(url);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (charset != null) {
			return charset.name();
		}
		return null;
	}
	
	/**
	 * 获取 File 的编码
	 * @param path
	 * @return
	 */
	public String getFileEncode(String path) {
		String res = null;
		try {
			File f = new File(path);
			res = getUrlEncode(f.toURI().toURL());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return res;
	}
	
	public static void main(String[] args) {
		// 获取 URL 的编码
		String url_UTF8 = "https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6";
		String url_GB2312 = "http://game.sports.sina.com.cn/?sinahome&suda-key=super&suda-value=home:guide";
		Cpdetector cp = new Cpdetector();
		System.out.println(cp.getUrlEncode(url_UTF8));
		System.out.println(cp.getUrlEncode(url_GB2312));
		
		// 获取 File 的编码
		System.out.println(cp.getFileEncode("c:\\debug.log"));
	}
}
