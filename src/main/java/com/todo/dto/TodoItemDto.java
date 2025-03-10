package com.todo.dto;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "subject")
public class TodoItemDto implements Comparable<TodoItemDto>{
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
	Long id;
	
	@NotEmpty
	@Column(unique = true)
	String subject;
	
	@Column(columnDefinition = "TEXT")
	String description;
	
	@OneToMany
	Set<TagsDto> tags = new HashSet<>();
	
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
	Boolean completionStatus;
	
	Boolean setForReminder;
	
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@CreationTimestamp
	LocalDateTime creationTimestamp;
	
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@UpdateTimestamp
	LocalDateTime updationTimestamp;

	@Override
	public int compareTo(TodoItemDto o) {
		return o.updationTimestamp.compareTo(this.updationTimestamp);
	}
}
