package com.todo.dto;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoItemSearchDto {

	@Email
	@NotEmpty
	String email;
	
	String searchQuery;
	
	Set<TagsDto> filterByTags;
}
