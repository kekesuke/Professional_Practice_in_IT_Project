package com.graphapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Graph {
	
	
	@Id 
	private String id;
	
	@NotNull
	private Float AvgVol10Day;
	
	@NotNull
	private Float WeekHigh52;
	
	@NotNull
	private Float WeekLow52;
	
	@NotNull
	private String WeekLowDate52;
	
	@NotNull
	private Float WeekPriceReturnDaily52;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Float getAvgVol10Day() {
		return AvgVol10Day;
	}

	public void setAvgVol10Day(Float avgVol10Day) {
		AvgVol10Day = avgVol10Day;
	}

	public Float getWeekHigh52() {
		return WeekHigh52;
	}

	public void setWeekHigh52(Float weekHigh52) {
		WeekHigh52 = weekHigh52;
	}

	public Float getWeekLow52() {
		return WeekLow52;
	}

	public void setWeekLow52(Float weekLow52) {
		WeekLow52 = weekLow52;
	}

	public String getWeekLowDate52() {
		return WeekLowDate52;
	}

	public void setWeekLowDate52(String weekLowDate52) {
		WeekLowDate52 = weekLowDate52;
	}

	public Float getWeekPriceReturnDaily52() {
		return WeekPriceReturnDaily52;
	}

	public void setWeekPriceReturnDaily52(Float weekPriceReturnDaily52) {
		WeekPriceReturnDaily52 = weekPriceReturnDaily52;
	}

	
	

	

}
