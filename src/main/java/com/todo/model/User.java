package com.todo.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "users")
@Getter
@Setter
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@Email
	@NotEmpty
	@Column(unique = true)
	String email;
	
	@NotEmpty(message = "user password cannot be empty")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$",
            message = "password must be between 6 to 20 characters and contain at least one capital letter, one special character, and a digit")
    String password;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	Set<TodoItem> items = new HashSet<>();
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	Set<Tag> tags = new HashSet<>();
}
