package com.todo.controller;

import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.dto.ApiResponse;
import com.todo.dto.TodoItemCreationDto;
import com.todo.dto.TodoItemDto;
import com.todo.dto.TodoItemSearchDto;
import com.todo.service.TodoItemService;
import com.todo.service.UserService;

import jakarta.validation.constraints.NotEmpty;

@RestController
@RequestMapping("/todo-items")
public class TodoItemController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	TodoItemService itemService;	
	
	//TODO: Implement pagination here
	@PostMapping()
	public ResponseEntity<?> addTodoItem(@RequestBody @Validated TodoItemCreationDto todoItemDto){
		
		String email = todoItemDto.getEmail();
		
		TodoItemDto itemDto = todoItemDto.getTodoItemDto();
		
		Long itemId = itemService.addItemToUser(email, itemDto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("item added successfully",itemId));
	}
	
	@GetMapping()
	public ResponseEntity<?> getAllTodoItems(@RequestParam @Validated @NotEmpty String email){
		Set<TodoItemDto> itemList = itemService.getTodoItemsOf(email);
		
		Set<TodoItemDto> sortedItemList = new TreeSet<>(itemList);
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("items fetched successfully",sortedItemList));
	}
	
	@PostMapping("/search")
	public ResponseEntity<?> getAllTodoItemsMatching(@RequestBody @Validated TodoItemSearchDto todoItemSearchDto){
		
		Set<TodoItemDto> itemList;
		
		boolean queryExists = todoItemSearchDto.getSearchQuery()!=null;
		boolean filterExists = todoItemSearchDto.getFilterByTags()!=null;
	
		if(queryExists && filterExists)
			itemList = itemService.getTodoItemsOfBySearchQueryAndFilter(todoItemSearchDto);
		else if(queryExists)
			itemList = itemService.getTodoItemsOfBySearchQuery(todoItemSearchDto);
		else if(filterExists)
			itemList = itemService.getTodoItemsOfBySearchFilter(todoItemSearchDto);
		else 
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>("provide either a query or filter to search"));
		 
		Set<TodoItemDto> sortedItemList = new TreeSet<>(itemList);

	    return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("items fetched successfully",sortedItemList));
	}
}
