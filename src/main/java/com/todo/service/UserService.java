package com.todo.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.dao.UserDao;
import com.todo.dto.UserRegistrationDto;
import com.todo.model.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	UserDao userDao;

	
	public Long registerUser(UserRegistrationDto userDto) {		
		User user = modelMapper.map(userDto, User.class);
		
		userDao.save(user);
		
		return user.getId();
	}



}
