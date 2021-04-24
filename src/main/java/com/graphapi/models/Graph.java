package com.graphapi.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Graph {
	
	
	@Id 
	private String id;
	
	@NotNull
	@JsonProperty("t")
	private long date;
	
	@NotNull
	@JsonProperty("c")
	private Float close;
	
	@NotNull
	@JsonProperty("l")
	private Float low;
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}
	
	public Float getLow() {
			return low;
	}
	
	public void setLow(Float low) {
		this.low = low;
	}
	
	public Float getClose() {
		return close;
	}

	public void setClose(Float close) {
		this.close = close;
	}

	

	
	
	

	

}
