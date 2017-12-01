package com.wang.util.date;

import java.util.Date;

/**
 * 日期范围
 * 
 * @author Administrator
 *
 */
public class DateRange {
	private Date start;
	private Date end;
	
	public DateRange(Date start, Date end) {
		this.start = start;
		this.end = end;
	}
	
	public Date getStart() {
		return start;
	}
	
	public void setStart(Date start) {
		this.start = start;
	}
	
	public Date getEnd() {
		return end;
	}
	
	public void setEnd(Date end) {
		this.end = end;
	}
}
