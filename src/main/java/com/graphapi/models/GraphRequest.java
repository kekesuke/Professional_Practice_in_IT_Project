package com.graphapi.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GraphRequest {

  private List<Long> t;
  private List<Float> c;
  private List<Float> l;
  

  	
  	public GraphRequest() {
	
  	}

	
	public List<Long> getT() {
		return t;
	}


	public void setT(List<Long> t) {
		this.t = t;
	}


	public List<Float> getC() {
		return c;
	}


	public void setC(List<Float> c) {
		this.c = c;
	}


	public List<Float> getL() {
		return l;
	}


	public void setL(List<Float> l) {
		this.l = l;
	}


	@Override
	public String toString() {
		return "GraphRequest [t=" + t + ", c=" + c + ", l=" + l + "]";
	}
  

}
