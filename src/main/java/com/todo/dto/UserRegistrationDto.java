package com.todo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRegistrationDto {

    @NotEmpty(message = "user email cannot be empty")
    @Email
    String email;
    
    @NotEmpty(message = "user password cannot be empty")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$",
            message = "password must be between 6 to 20 characters and contain at least one capital letter, one special character, and a digit")
    String password;
}