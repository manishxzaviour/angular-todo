package com.todo.factory;

import com.todo.dto.TodoItemCreationDto;
import com.todo.dto.TodoItemDto;
import com.todo.dto.UserRegistrationDto;

public class TestValueFactory {

	public static UserRegistrationDto fillFields(UserRegistrationDto userRegistrationDto) {
		
		userRegistrationDto.setEmail("Test@Test.com");
		userRegistrationDto.setPassword("Test12!");
		
		return userRegistrationDto;
	}
	public static TodoItemCreationDto fillFields(TodoItemCreationDto todoItemCreationDto) {
		
		todoItemCreationDto.setEmail("Test@Test.com");
		
				
		todoItemCreationDto.setTodoItemDto(fillFields(new TodoItemDto()));
		
		return todoItemCreationDto;
	}
	
	public static TodoItemDto fillFields(TodoItemDto todoItemDto) {
		
		todoItemDto.setSubject("subject");
		todoItemDto.setDescription("description");
		todoItemDto.setSetForReminder(true);

		
		return todoItemDto;
	}

}
