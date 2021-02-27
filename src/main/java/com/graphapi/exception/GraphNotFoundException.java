package com.graphapi.exception;

public class GraphNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -2533194229906054487L;
	
	public GraphNotFoundException(String message) {
		super(message);
	}

}
