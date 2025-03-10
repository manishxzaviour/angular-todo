package com.todo.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "todo_items")
@Getter
@Setter
public class TodoItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@NotEmpty
	@Column(unique = true)
	String subject;
	
	@Lob
	@Column(columnDefinition = "TEXT")
	String description;
	
	@ManyToOne
	@NotNull
	User user;
	
	@OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH})
	Set<Tag> tags = new HashSet<>();
	
	@NotNull
	Boolean completionStatus = false;
	
	@NotNull
	Boolean setForReminder = false;
	
	@CreationTimestamp
	LocalDateTime creationTimestamp;
	
	@UpdateTimestamp
	LocalDateTime updationTimestamp;
}
