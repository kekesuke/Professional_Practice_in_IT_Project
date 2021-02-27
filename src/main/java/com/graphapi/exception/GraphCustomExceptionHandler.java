package com.graphapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.graphapi.util.MethodUtils;

@ControllerAdvice
public class GraphCustomExceptionHandler {
	
	@ExceptionHandler(value = ApplicationException.class)
	public ResponseEntity<String> applicationException(ApplicationException exception) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		return new ResponseEntity<>(MethodUtils.prepareErrorJSON(status, exception), status);
	}

	@ExceptionHandler(value = GraphNotFoundException.class)
	public ResponseEntity<String> bookNotFoundException(GraphNotFoundException exception) {
		HttpStatus status = HttpStatus.NOT_FOUND;
		return new ResponseEntity<>(MethodUtils.prepareErrorJSON(status, exception), status);
	}
	
}
