package com.todo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagsDto {
	
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Long id;
	
	@NotEmpty
	String name;
}
