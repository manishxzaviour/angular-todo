package com.todo;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	@Bean
	public static ModelMapper getModelMapper() {
		ModelMapper mapper = new ModelMapper();
		
		mapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT) 					
				.setPropertyCondition(Conditions.isNotNull());
		
		return mapper;
	}

}
