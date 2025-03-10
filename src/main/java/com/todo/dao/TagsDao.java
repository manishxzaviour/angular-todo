package com.todo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.model.Tag;

@Repository
public interface TagsDao extends JpaRepository<Tag, Long> {

	Optional<Tag> findByName(String name);

}
