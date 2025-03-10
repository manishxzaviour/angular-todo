package com.todo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity(name="tags")
@Getter
@Setter
@EqualsAndHashCode(of = "name")
public class Tag {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	Long id;
	
	@NotEmpty
	String name;
	
	@ManyToOne
	User user;
}
