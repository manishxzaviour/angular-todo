package com.todo.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {
	
	String message;
	
	LocalDateTime timestamp;
	
	T data;
	
	public ApiResponse() {
		this.timestamp = LocalDateTime.now();
	}
	
	public ApiResponse(String message, T data) {
		this();
		this.message = message;
		this.data = data;
	}
	
	public ApiResponse(T data) {
		this();
		this.data = data;
	}
}
