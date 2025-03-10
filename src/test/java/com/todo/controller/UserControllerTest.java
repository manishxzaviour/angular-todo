package com.todo.controller;


import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.todo.dto.TodoItemCreationDto;
import com.todo.dto.UserRegistrationDto;
import com.todo.factory.TestValueFactory;
import com.todo.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(MockitoExtension.class)
class UserControllerTest {@InjectMocks
	UserController underTest;
@Mock
UserService userService;
@Test
void testRegister() throws Exception {
	// given
	UserRegistrationDto userDto = TestValueFactory.fillFields(new UserRegistrationDto());
	// when
	ResponseEntity<?> actual=underTest.register(userDto);
	// then
	assertEquals(actual.getStatusCode(), HttpStatusCode.valueOf(201));
}
@Test
void testAddTodoItem() throws Exception {
	// given
	TodoItemCreationDto todoItemDto = TestValueFactory.fillFields(new TodoItemCreationDto());
	// when
	ResponseEntity<?> actual=underTest.addTodoItem(todoItemDto);
	// then
	assertEquals(actual.getStatusCode(), HttpStatusCode.valueOf(201));
}
@Test
void testGetAllTodoItems() throws Exception {
	// given
	String email = "Test@Test.com";
	// when
	ResponseEntity<?> actual=underTest.getAllTodoItems(email);
	// then
	assertEquals(actual.getStatusCode(), HttpStatusCode.valueOf(200));
}

}