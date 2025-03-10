package com.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.dto.ApiResponse;
import com.todo.dto.UserRegistrationDto;
import com.todo.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Validated UserRegistrationDto userDto){		
		Long id = userService.registerUser(userDto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("user registered successfully",id));
	}
	
	
}
