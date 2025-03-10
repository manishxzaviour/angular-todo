package com.todo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoItemCreationDto {
	
	@NotEmpty(message = "user email cannot be empty")
	String email;
	
	@NotNull(message = "item cannot be empty")
	TodoItemDto todoItemDto;
}
