package com.todo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.model.User;

@Repository
public interface UserDao extends JpaRepository<User, Long>{

	Optional<User> getByEmail(String email);

}
