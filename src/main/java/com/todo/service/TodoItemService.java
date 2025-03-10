package com.todo.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.dao.ItemsDao;
import com.todo.dao.TagsDao;
import com.todo.dao.UserDao;
import com.todo.dto.TodoItemDto;
import com.todo.dto.TodoItemSearchDto;
import com.todo.model.Tag;
import com.todo.model.TodoItem;
import com.todo.model.User;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotEmpty;

@Service
@Transactional
public class TodoItemService {

	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	ItemsDao itemsDao;
	
	@Autowired
	TagsDao tagsDao;
	

	public Long addItemToUser(String email, TodoItemDto itemDto) {
		
		User user = userDao.getByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
		
		TodoItem item = modelMapper.map(itemDto, TodoItem.class);
		
		item.setUser(user);
		
		user.getItems().add(item);
	
		return item.getId();
	}

	public Set<TodoItemDto> getTodoItemsOf(@NotEmpty String email) {
		User user = userDao.getByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
		
		return user.getItems().stream().map(item->modelMapper.map(item, TodoItemDto.class)).collect(Collectors.toSet());
	}

	public Set<TodoItemDto> getTodoItemsOfBySearchQuery(TodoItemSearchDto todoItemSearchDto) {
				
		String email = todoItemSearchDto.getEmail();
		
		User user = userDao.getByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
		
		List<TodoItem> result = itemsDao.findByUserIdAndSearchQuery(user.getId(), todoItemSearchDto.getSearchQuery());
		
		return result.stream().map(item->modelMapper.map(item, TodoItemDto.class)).collect(Collectors.toSet());
	}

	public Set<TodoItemDto> getTodoItemsOfBySearchFilter(TodoItemSearchDto todoItemSearchDto) {
		String email = todoItemSearchDto.getEmail();
		
		User user = userDao.getByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
		
		List<Tag> filterList = todoItemSearchDto.getFilterByTags().stream().map(tag->modelMapper.map(tag, Tag.class)).toList();
		
		List<TodoItem> result = user.getItems().stream()
				.filter(item->item.getTags().containsAll(filterList)).toList();

		return result.stream().map(item->modelMapper.map(item, TodoItemDto.class)).collect(Collectors.toSet());
	}

	public Set<TodoItemDto> getTodoItemsOfBySearchQueryAndFilter(TodoItemSearchDto todoItemSearchDto) {
		
		Set<TodoItemDto> result1  = getTodoItemsOfBySearchQuery(todoItemSearchDto);
		Set<TodoItemDto> result2  = getTodoItemsOfBySearchFilter(todoItemSearchDto);


		Set<TodoItemDto> result = result1.stream().filter(
				item-> result2.contains(item)
				).collect(Collectors.toSet());
		
		return result;
	}
	
}
